# Controller → HTTP Generation

This is the core feature of Spring HTTP Buddy. It reads your Spring controller methods and generates ready-to-send `.http` request blocks.

## Supported annotations

| Annotation | Support |
|---|---|
| `@GetMapping` | ✅ Full |
| `@PostMapping` | ✅ Full |
| `@PutMapping` | ✅ Full |
| `@DeleteMapping` | ✅ Full |
| `@PatchMapping` | ✅ Full |
| `@RequestMapping` | ✅ Path, method, multiple verbs |
| `@RestController` / `@Controller` | ✅ Detection |

## Supported parameter annotations

| Annotation | Handling |
|---|---|
| `@PathVariable` | Injected into URL path |
| `@RequestParam` | Added as query string |
| `@RequestHeader` | Added as HTTP header |
| `@RequestBody` | Generated as JSON body |
| `@ModelAttribute` | Flattened to query params |

Framework-injected types (`HttpServletRequest`, `HttpServletResponse`, `HttpSession`, `Model`, `Principal`, `BindingResult`, `MultipartFile`, etc.) are automatically skipped.

## Default values

| Java type | Generated value |
|---|---|
| `String` | the field / parameter name, e.g. `"username"` |
| `int`, `long`, `BigDecimal`, … | `0` |
| `double`, `float` | `0.0` |
| `boolean` | `false` |
| `LocalDate` | `"2026-01-01"` |
| `LocalDateTime` / `Date` / `Instant` | `"2026-01-01T00:00:00"` |
| `List<X>` / `Set<X>` | `[<default of X>]` |
| `Map<K,V>` / array | `{}` / `[]` |
| Custom DTO | Recursively expanded |

## Example

Given this controller:

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public User createUser(@RequestBody CreateUserRequest request) { ... }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) { ... }
}
```

The generated file `UserController.http` looks like:

```http
### createUser
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "username": "username",
  "email": "email",
  "age": 0,
  "active": false,
  "birthday": "2026-01-01",
  "address": {
    "street": "street",
    "city": "city"
  },
  "roles": [""]
}

### getUser
GET http://localhost:8080/api/users/1
```
