# Commands

All commands are available via **CodeLens** actions or the **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`).

| Command | Where | What it does |
|---|---|---|
| **Generate HTTP Request** | Above a `@*Mapping` method | Creates/appends a ready-to-send block in `{Controller}.http` |
| **Open HTTP Request** | Above a `@*Mapping` method | Jumps to the matching `###` block (picker if several) |
| **Open Java Controller** | On a `###` block | Jumps back to the Java method that produced it |
| **Copy AI Parameter Prompt** | On a `###` block | Copies a prompt so an AI can fill in realistic sample values |
| **Import from Postman** | Command Palette | Converts a Postman Collection JSON file into `.http` format |

## Generate HTTP Request

Triggered from a CodeLens above any Spring mapping method. The extension:

1. Parses the controller to extract base path, mapping path, parameters, and return type.
2. Resolves base URL from `application.properties` / `application.yml` (or falls back to `http://localhost:8080`).
3. Generates a complete request block with default values for all parameters.
4. Appends the block to `{ControllerName}.http`.

## Open HTTP Request

When you're looking at a Java controller method and want to see the corresponding HTTP request:

1. Click the **Open HTTP Request** CodeLens above the method.
2. If multiple blocks exist for the same method, a picker shows all options.
3. Select one to jump directly to that block in the `.http` file.

## Open Java Controller

The reverse direction — from a `###` request block back to the Java source:

1. Open a `.http` file.
2. Click the **Open Java Controller** CodeLens above a request block.
3. The corresponding Java file opens with the method in view.

## Copy AI Parameter Prompt

Generates a structured prompt describing all parameters of the selected request, then copies it to your clipboard. Paste it to an AI assistant (Claude, ChatGPT, etc.) and ask it to generate realistic test values.

Example output:

```
Generate realistic test values for the following API request:

POST /api/users
Content-Type: application/json

Parameters:
- username: String
- email: String
- age: int
- roles: List<String>
```

## Import from Postman

See [Import from Postman](/guide/import-postman) for detailed usage.