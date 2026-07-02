# Quick Start

## Installation

1. Install **Spring HTTP Buddy** from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=gejun123456.spring-http-buddy).
2. (Recommended) Install **[httpYac](https://marketplace.visualstudio.com/items?itemName=anweber.vscode-httpyac)** — the best `.http` client for VS Code. The extension will prompt you on first launch.

## Your first request

Open any Spring Boot `@RestController`, and you'll see a **Generate HTTP Request** CodeLens above each mapping method:

![demo](https://raw.githubusercontent.com/gejun123456/springHttpBuddy/master/assets/demo.gif)

Click it, and a ready-to-run request block is created in `{ControllerName}.http`:

```http
### getUser
GET http://localhost:8080/api/users/1
```

## Sending requests

Open the generated `.http` file and click **Send Request** (provided by httpYac or REST Client).

## Importing from Postman

Already have API requests in Postman?

1. Export your collection as **Collection v2.1** from Postman.
2. Run `Spring HTTP Buddy: Import from Postman` from the Command Palette.
3. Select your `.json` file.
4. That's it — all requests are now in `.http` format.

See [Import from Postman](/guide/import-postman) for details.
