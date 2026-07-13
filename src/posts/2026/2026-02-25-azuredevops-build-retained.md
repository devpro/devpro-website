---
title: "Delete an Azure DevOps pipeline whose builds are retained by a release"
tags: [azure-devops, powershell]
---
Azure DevOps can refuse to delete a pipeline when its builds are retained by a release, but a small PowerShell script can clean up the leases and unblock the deletion.

<!-- more -->

> One or more builds associated with the requested pipeline(s) are retained by a release. The pipeline(s) and builds will not be deleted.

```powershell
$personalAccessToken = "xxxx"
$organization       = "xxxx"
$project            = "xxxx"
$pipelineName       = "xxxxx"

$token = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes(":$($personalAccessToken)"))
$header = @{authorization = "Basic $token"}

# Get the pipeline definition
$url = "https://dev.azure.com/$organization/$project/_apis/build/definitions?api-version=6.0"
$definitions = Invoke-RestMethod -Uri $url -Method Get -ContentType "application/json" -Headers $header

$targetDef = $definitions.value | Where-Object { $_.name -eq $pipelineName }

if (-not $targetDef) {
    Write-Host "Pipeline '$pipelineName' not found!" -ForegroundColor Red
    return
}

Write-Host "Found pipeline ID: $($targetDef.id) - $($targetDef.name)"

# Get all builds for this pipeline
$url = "https://dev.azure.com/$organization/$project/_apis/build/builds?definitions=$($targetDef.id)&api-version=6.0"
$builds = Invoke-RestMethod -Uri $url -Method Get -ContentType "application/json" -Headers $header

$retainedBuilds = $builds.value | Where-Object { $_.retainedByRelease -eq $true }

if ($retainedBuilds.Count -eq 0) {
    Write-Host "No retained builds found. You should now be able to delete the pipeline manually." -ForegroundColor Green
    return
}

Write-Host "Found $($retainedBuilds.Count) retained builds. Cleaning them up..." -ForegroundColor Yellow

foreach ($build in $retainedBuilds) {
    Write-Host "Processing build $($build.id)..."

    # Get leases for this build
    $url = "https://dev.azure.com/$organization/$project/_apis/build/builds/$($build.id)/leases?api-version=7.1-preview.1"
    $leases = Invoke-RestMethod -Uri $url -Method Get -ContentType "application/json" -Headers $header

    # Delete every lease
    foreach ($lease in $leases.value) {
        $url = "https://dev.azure.com/$organization/$project/_apis/build/retention/leases?ids=$($lease.leaseId)&api-version=7.1-preview.2"
        Invoke-RestMethod -Uri $url -Method Delete -ContentType "application/json" -Headers $header
        Write-Host "  → Lease $($lease.leaseId) deleted"
    }

    # Delete the build itself
    $url = "https://dev.azure.com/$organization/$project/_apis/build/builds/$($build.id)?api-version=7.1-preview.7"
    Invoke-RestMethod -Uri $url -Method Delete -ContentType "application/json" -Headers $header
    Write-Host "  → Build $($build.id) deleted" -ForegroundColor Green
}

# Finally delete the pipeline
$url = "https://dev.azure.com/$organization/$project/_apis/build/definitions/$($targetDef.id)?api-version=6.0"
Invoke-RestMethod -Uri $url -Method Delete -ContentType "application/json" -Headers $header
Write-Host "Pipeline '$pipelineName' has been deleted!" -ForegroundColor Green
```
