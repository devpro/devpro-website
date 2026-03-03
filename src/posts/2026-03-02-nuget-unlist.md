```ps1
$packages = @(
    "Withywoods.Configuration",
    "Withywoods.Net.Http",
    "Withywoods.System"
)

Unlist-OldNuGetVersions `
    -PackageIds $packages `
    -ApiKey "oy2xxxxx" `
    -KeepLatest 3

function Unlist-OldNuGetVersions {
    [CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'High')]
    param(
        [Parameter(Mandatory = $true)]
        [string[]] $PackageIds,

        [Parameter(Mandatory = $true)]
        [string] $ApiKey,

        [Parameter(Mandatory = $false)]
        [int] $KeepLatest = 3
    )

    begin {
        $source = "https://api.nuget.org/v3/index.json"
        Write-Host "Starting bulk unlist (hide) on nuget.org" -ForegroundColor Cyan
        Write-Host "Keeping newest $KeepLatest version(s) per package"
        Write-Host "Packages: $($PackageIds -join ', ')" -ForegroundColor Cyan
        Write-Host ""
    }

    process {
        foreach ($packageId in $PackageIds) {
            Write-Host "──────────────────────────────────────────────" -ForegroundColor DarkGray
            Write-Host "Processing: $packageId" -ForegroundColor Green

            $regUrl = "https://api.nuget.org/v3/registration5-gz-semver2/$($packageId.ToLower())/index.json"

            try {
                $index = Invoke-RestMethod -Uri $regUrl -UseBasicParsing -ErrorAction Stop

                # Collect versions
                $allVersions = @()
                foreach ($page in $index.items) {
                    if ($page.items) {
                        foreach ($pkg in $page.items) {
                            if ($pkg.catalogEntry -and $pkg.catalogEntry.version) {
                                $allVersions += $pkg.catalogEntry.version
                            }
                        }
                    }
                }

                if ($allVersions.Count -eq 0) {
                    Write-Warning "No versions found for $packageId → skipping"
                    continue
                }

                Write-Host "  Found $($allVersions.Count) versions" -ForegroundColor Cyan

                # Sort descending (strip pre-release for basic ordering)
                $sorted = $allVersions | Sort-Object {
                    [Version]($_ -replace '[-+].*$', '')
                } -Descending -Unique

                $toUnlist = $sorted | Select-Object -Skip $KeepLatest

                if ($toUnlist.Count -eq 0) {
                    Write-Host "  Nothing to unlist (≤ $KeepLatest versions)" -ForegroundColor Cyan
                    continue
                }

                Write-Host "  To unlist $($toUnlist.Count) older version(s):" -ForegroundColor Magenta
                $toUnlist | ForEach-Object { Write-Host "    - $_" }

                # Optional: uncomment if you want manual confirmation per package
                # $confirm = Read-Host "  Proceed for $packageId? (YES/no)"
                # if ($confirm -notin 'YES','yes','Y','y') { Write-Host "  Skipped."; continue }

                foreach ($version in $toUnlist) {
                    $target = "$packageId $version"
                    $action = "Unlist (hide) version on nuget.org"

                    if ($PSCmdlet.ShouldProcess($target, $action)) {
                        Write-Host "  Unlisting $target ..." -ForegroundColor Yellow
                        dotnet nuget delete $packageId $version `
                            --api-key $ApiKey `
                            --source $source `
                            --non-interactive

                        Start-Sleep -Seconds 1.8  # Rate limit buffer
                    }
                    else {
                        Write-Host "  Skipped $target (WhatIf / Confirm)" -ForegroundColor DarkYellow
                    }
                }

                Write-Host "  Done: $packageId" -ForegroundColor Green
            }
            catch {
                Write-Error "Failed for $packageId`: $($_.Exception.Message)"
                Write-Host "  URL: $regUrl" -ForegroundColor Red
            }
        }
    }

    end {
        Write-Host ""
        Write-Host "Bulk operation finished." -ForegroundColor Cyan
    }
}
```
