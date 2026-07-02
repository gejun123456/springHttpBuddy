# Configuration

Spring HTTP Buddy works out of the box with no configuration required. However, you can customize the base URL via VS Code settings.

## Base URL

**Setting** — `springHttpBuddy.baseUrl`

| Setting | Default | Description |
|---|---|---|
| `springHttpBuddy.baseUrl` | `http://localhost:8080` | Base URL used when generating `.http` request blocks. |

### Auto-detection

If you don't set this value, the extension tries to detect `server.port` from your Spring Boot configuration files:

1. Looks for `src/main/resources/application.properties` — reads `server.port`.
2. Looks for `src/main/resources/application.yml` / `application.yaml` — reads `server.port`.
3. Falls back to `http://localhost:8080`.

### How to set

1. Open VS Code **Settings** (`Ctrl+,` / `Cmd+,`).
2. Search for `springHttpBuddy`.
3. Set the **Base URL** to your desired value.

Or set it in `.vscode/settings.json`:

```json
{
  "springHttpBuddy.baseUrl": "http://localhost:3000"
}
```

## Recommended extensions

### httpYac

The [httpYac](https://marketplace.visualstudio.com/items?itemName=anweber.vscode-httpyac) extension provides the best `.http` experience:

- Environment variables (`{{baseUrl}}`, `{{token}}`)
- Response assertions
- Scripting support
- Response handling

The extension will prompt you to install httpYac on first launch if it's not already installed.