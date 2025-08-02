# 🧩 Dockerized Full Stack Task Management Application

A robust full stack task management application featuring a **React frontend**, **ASP.NET Core 8.0 backend**, and **SQL Server 2022** database. The project is fully containerized using **Docker Compose** for seamless local development and deployment.

---

## ✅ Features

- 🗂️ **Task Management**: Create, update, delete, and view tasks
- 🔐 **User Authentication**: Secure registration and login functionality using JWT
- 🕘 **Task History**: Track changes and history for each task.
- ⚙️ **Centralized API Configuration**: Easily manage backend API URLs from a single location.
- 🛠️ **Database Migrations**: Automatic database migrations on backend startup.
- 🌐 **CORS Support**: Configurable CORS origins for secure frontend-backend communication.
- ❤️ **Health Checks**: Ensures SQL Server is ready before backend starts.

---

## 🛠 Technologies Used

| Layer       | Technology            |
|------------|------------------------|
| Frontend   | React, Tailwind CSS    |
| Backend    | ASP.NET Core 8.0       |
| Database   | SQL Server 2022        |
| Auth       | JWT Authentication     |
| DevOps     | Docker, Docker Compose |

---

## 🗃️ Docker Details:

- **Health Checks**: SQL Server is monitored using Docker health check before backend startup.
- **Database Persistence**: SQL Server data is persisted in a Docker volume (`mssql_data`).
- **Migrations**: The backend automatically applies EF Core migrations on startup.
- **Environment Variables**: Adjust environment variables in `docker-compose.yml` as needed for your environment.

---

## 🚀 Getting Started

### 1. Clone the Repository:

    ```bash
        git clone https://github.com/onkaryemulZensar/Full-stack-Task-Management-App-Dockerized.git
    ```

### 2. Move to the project directory:

    ```bash
        cd Full-stack-Task-Management-App-Dockerized
    ```

### 3. Configure Environment (Optional):

    - The backend and database connection strings are pre-configured for Docker Compose.
    - The frontend fetches the backend API URL from the `REACT_APP_API_URL` environment variable.
    - CORS origins can be set via the `AllowedCorsOrigins` environment variable in `docker-compose.yml`.


### 4. Run the Application

    ```bash
       docker compose up --build -d
    ```
 
### 5. Access the App:

| Service       | URL Endpoint                
|---------------|-------------------------
| Frontend	    | `http://localhost:3000`   
| Swagger UI    | `http://localhost:5000/swagger/index.html`   


### 6. Stop the Application

    ```bash
       docker compose down
    ```
---

## 🤝 Contributing:

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
