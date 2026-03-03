# Azure AD JWT Generator

Command line tool to generate authentication tokens with Azure Active Directory.

## How to use the tool

```bash
aadtokengen <client_id> <tenant_id> <username> <userpassword> <scope>
```

## How to set up an application in Azure

* In [Azure Portal](https://portal.azure.com/), in "Azure Active Directory > Application registrations", select "New registration"
* Once created, update the application
  * "Manifest": manually edit the file (`accessTokenAcceptedVersion` and `allowPublicClient` are null by default)

  ```json
  {
    "accessTokenAcceptedVersion": 2,
    "allowPublicClient": true,
  }
  ```

  * "Api permissions": do "Grant admin consent for Default Directory" (Microsoft Graph > User.Read has been added by default)
  * "Expose an API": set the application ID URI ("api://<client_id>" is the default and correct choice)
  * "Expose an API": add a scope (for example "access_as_user", "Admins and users" can consent)

## How to debug in Visual Studio

* Create the `src/ConsoleApp/Properties/launchSettings.json` file

```json
{
  "profiles": {
    "ConsoleApp": {
      "commandName": "Project",
      "commandLineArgs": "<client_id> <tenant_id> <username> <userpassword> <scope>"
    }
  }
}
```

Program.cs:

```csharp
using System.Net;
using Microsoft.Identity.Client;

Console.WriteLine("Hello, World!");

var clientId = args[0];
var tenantId = args[1];
var username = args[2];
var password = args[3];
var scope = args[4];

var app = PublicClientApplicationBuilder.Create(clientId)
    .WithTenantId(tenantId)
    .Build();

var scopes = new string[] { $"api://{clientId}/{scope}" };

try
{
    var result = await app.AcquireTokenByUsernamePassword(scopes, username, new NetworkCredential("", password).SecurePassword)
        .ExecuteAsync();

    Console.WriteLine(result.AccessToken);
    return 0;
}
catch (MsalUiRequiredException exc)
{
    Console.WriteLine($"Error: MsalUiRequiredException {exc.Message}. The application doesn't have sufficient permissions?");
    return -2;
}
catch (MsalServiceException exc) when (exc.Message.Contains("AADSTS70011"))
{
    Console.WriteLine($"Error: MsalServiceException {exc.Message}. Invalid scope?");
    return -2;
}
catch (Exception exc)
{
    Console.WriteLine($"Error: {exc.GetType()} {exc.Message}. Check inner exception");
    Console.WriteLine(exc.StackTrace);
    return -2;
}
```
