# Import from Postman

Migrating from Postman to `.http` files? You can import your entire Postman Collection in one step.

## How to use

1. **Export from Postman**
   - Open your collection in Postman.
   - Click the **...** menu → **Export**.
   - Select **Collection v2.1** → **Export**.
   - Save the `.json` file somewhere on your machine.

2. **Import in VS Code**
   - Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
   - Run **Spring HTTP Buddy: Import from Postman**.
   - Select the exported `.json` file.
   - Choose a target folder (defaults to `src/main/resources/`).

3. **Done** — the `.http` file opens automatically, ready to send.

## What gets imported

| Postman feature | Support |
|---|---|
| HTTP methods (GET, POST, PUT, DELETE, PATCH) | ✅ |
| URL with path segments | ✅ |
| Query parameters | ✅ |
| Headers | ✅ |
| Raw JSON body | ✅ |
| URL-encoded body | ✅ |
| Form-data body | ✅ (file types marked as `[FILE: ...]`) |
| GraphQL body | ✅ (expanded to JSON) |
| Collection variables `&#123;&#123;...&#125;&#125;` | ✅ (preserved as httpYac variables) |
| Nested folder structure | ✅ (flattened with prefix naming) |
| Disabled parameters / headers | ✅ (automatically skipped) |

## Example

A Postman collection with this structure:

```
PetStore API
├── Pets
│   ├── List all pets       GET  {{baseUrl}}/api/pets?page=1&limit=20
│   └── Create a pet        POST {{baseUrl}}/api/pets  (JSON body)
└── Auth
    └── Login               POST {{baseUrl}}/auth/login  (urlencoded)
```

Becomes this `.http` file:

```http
### Pets: List all pets
GET {{baseUrl}}/api/pets?page=1&limit=20
Accept: application/json

### Pets: Create a pet
POST {{baseUrl}}/api/pets
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "name": "Buddy",
  "species": "dog",
  "age": 3
}

### Auth: Login
POST {{baseUrl}}/auth/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=secret123
```

## Notes

- Postman **environment files** are not imported automatically. You'll need to set up the equivalent variables in httpYac's `http-client.env.json`.
- For **multipart file uploads**, the file path is preserved as a comment — you'll need to provide a valid file path on your machine.