# Portfolio Backend

A Spring Boot REST API backend for the portfolio website.

## Features

- **Projects API**: Manage portfolio projects with search, filtering, and sorting
- **Blogs API**: Manage blog posts with search and filtering
- **Contacts API**: Handle contact form submissions
- **CORS Support**: Configured for frontend integration
- **Data Initialization**: Automatically populates sample data on startup

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects (supports search, category filter, sorting)
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Blogs
- `GET /api/blogs` - Get all blogs (supports search, category filter)
- `GET /api/blogs/{id}` - Get blog by ID
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/{id}` - Update blog
- `DELETE /api/blogs/{id}` - Delete blog

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)
- `GET /api/contacts/{id}` - Get contact by ID
- `GET /api/contacts/unread` - Get unread contacts
- `PUT /api/contacts/{id}/mark-read` - Mark contact as read
- `DELETE /api/contacts/{id}` - Delete contact

## Query Parameters

### Projects
- `search` - Search in title, description, and technologies
- `category` - Filter by category (web, mobile, desktop, api, fullstack)
- `sort` - Sort by (newest, oldest, name)

### Blogs
- `search` - Search in title, excerpt, and tags
- `category` - Filter by category (tutorial, thoughts, tutorials, news, tips)

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Using Maven
```bash
mvn spring-boot:run
```

### Using JAR
```bash
mvn clean package
java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar
```

### Using IDE
Run the `PortfolioApplication.java` main class directly.

## Configuration

The application uses H2 in-memory database by default. Configuration can be modified in `src/main/resources/application.properties`.

### Database
- **URL**: `jdbc:h2:mem:portfolio`
- **Console**: Available at `http://localhost:8080/h2-console`
- **Username**: `sa`
- **Password**: (empty)

### Server
- **Port**: 8080
- **CORS**: Enabled for `http://localhost:3000` and `http://localhost:5173`

## Sample Data

The application automatically initializes with sample projects and blog posts on first startup.

## Frontend Integration

The backend is configured to work with the React frontend running on:
- `http://localhost:3000` (Create React App)
- `http://localhost:5173` (Vite)

Make sure the frontend is configured to use `http://localhost:8080/api` as the API base URL.




