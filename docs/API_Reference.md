# API Reference (End-points)

Base URL: `/api`

## 1. Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Register a new user | No |
| POST | `/login` | Login and receive JWT | No |
| GET | `/me` | Get current user profile | Yes |

## 2. Series & Insights (`/series`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/trending` | Fetch trending series (TMDB) | No |
| GET | `/:id/details` | Fetch AI insights & metadata | No |
| GET | `/:id/recommendations` | Get similar shows with reasoning | No |
| GET | `/search/:query` | Search for series by title | No |
| POST | `/:id/reviews` | Add review & trigger NLP analysis | Yes |

## 3. Insights Analytics (`/insights`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/compare/:id1/:id2` | Cross-analyze two series | Yes |
| GET | `/user-preferences` | Get AI-derived user taste profile | Yes |

---

## Response Format
Standard JSON responses are returned.
```json
{
  "status": "success",
  "data": { ... }
}
```
In case of error:
```json
{
  "message": "Error description here"
}
```
