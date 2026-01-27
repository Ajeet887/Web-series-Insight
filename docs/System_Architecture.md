# System Architecture Design

## 1. High-Level Architecture
The system follows a classic **MERN-like stack** (excluding React Native, focusing on Web) with a specific focus on the AI Processing Layer.

```
[ Frontend (React) ] <---- HTTP/JSON ----> [ Backend (Node/Express) ] <------> [ DB (MongoDB) ]
                                                |           ^
                                                |           |
                                                v           |
                                       [ AI/NLP Service ] [ TMDB API ]
```

## 2. Component Breakdown

### A. Frontend Layer (React.js)
*   **State Management**: React Hooks (`useState`, `useEffect`, `useContext`) for auth and data flow.
*   **Routing**: `react-router-dom` for seamless navigation between Home, Login, and Dashboard.
*   **Visualization Engine**: `Chart.js` integration for displaying JSON-based emotional data.
*   **API Client**: `Axios` with interceptors for handling JWT-based authenticated requests.

### B. Backend Layer (Node.js/Express)
*   **Middleware**: CORS, JSON Parsing, and custom Auth middleware for JWT verification.
*   **Controllers**: Logic for handling User, Series, and Insight requests.
*   **Services**:
    *   `api.js`: Handles communication with external TMDB endpoints.
    *   `nlpService.js`: The core engine that processes review text into sentiment scores and topics.

### C. Database Layer (MongoDB)
*   **User Model**: Stores credentials, preferences, and viewing history.
*   **Series Model**: Stores metadata, processed AI insights, and human-readable reviews.
*   **ODM**: `Mongoose` for schema enforcement and easy data manipulation.

## 3. Data Flow Scenario (Fetching Insights)
1.  User requests details for a series (e.g., "The Crown").
2.  Backend checks if data exists in MongoDB.
3.  If new, it fetches metadata from **TMDB API**.
4.  The **NLP Service** runs on the fetched reviews/descriptions to generate `whyLiked` and `emotionalJourney` data.
5.  Results are cached in **MongoDB** and sent to the **Frontend**.
6.  The **React App** renders a "Why this works" card and a multi-line chart.
