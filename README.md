# task-manager-fullstack
Full-stack Task Manager: Spring Boot REST API + React (Vite) frontend

# Task Manager - Full Stack App

A full-stack task management application built with **Spring Boot** and **React**.

## Tech Stack
**Backend:** Java 17, Spring Boot, Spring Data JPA, H2, Lombok, Bean Validation, Swagger (springdoc)
**Frontend:** React (Vite), JavaScript, Axios, CSS

## Features
- Create, view, update, delete tasks
- Mark task as complete (partial update)
- Priority levels (LOW / MEDIUM / HIGH) with colored badges
- Filter by All / Pending / Completed
- Pagination
- Delete all tasks with confirmation

## Backend Highlights
- Layered architecture (Controller, Service, Repository, Entity, DTO)
- Custom exceptions with a global exception handler (404, 409, 400)
- Request validation with @Valid
- Logging with SLF4J
- Swagger UI for API docs

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/tasks/create | Create task |
| GET | /api/tasks/getAll | Get all tasks |
| GET | /api/tasks/getAllPaginated | Paginated tasks |
| GET | /api/tasks/pending | Pending tasks |
| GET | /api/tasks/{taskId} | Get one task |
| GET | /api/tasks/filterByPriority?priority=HIGH | Filter by priority |
| PUT | /api/tasks/markComplete/{taskId} | Mark complete |
| PUT | /api/tasks/update/{taskId} | Update task |
| DELETE | /api/tasks/deleteOne/{taskId} | Delete one |
| DELETE | /api/tasks/deleteAll | Delete all |

## How to Run

### Backend
1. Open `backend` in IntelliJ
2. Run the main application class
3. API: http://localhost:8080
4. Swagger: http://localhost:8080/swagger-ui.html
5. H2 Console: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:taskdb`)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Author
Poonam - [GitHub](https://github.com/Poonam-D07)
