# PERN ToDo App

This project implements a simple ToDo application using the PERN stack: PostgreSQL, Express.js, React, and Node.js. This app allows you to manage your tasks, mark them as complete, and remove them from your list.

## Features
```
- Create new tasks with descriptions.
- Edit tasks as per need.
- Delete tasks from the list.
- View all tasks and their statuses.
- Dockerized for easy deployment
- CI/CD pipeline with GitHub Actions
```
## Technologies

- Front-End: React.js
- Back-End: Express.js, Node.js
- Database: PostgreSQL
- Containerization: Docker
- CI/CD: GitHub Actions

## Quick Start with Docker

### Development
```bash
# Clone the repository
git clone https://github.com/yourusername/PERN-ToDo-App.git
cd PERN-ToDo-App

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3001
# Backend API: http://localhost:8000
```

### Production
```bash
# Set your Docker Hub username
export DOCKERHUB_USERNAME=yourusername

# Start with production images
docker-compose -f docker-compose.prod.yml up -d
```

## Local Development Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/PERN-ToDo-App.git
   ```

2. Navigate to the project directory:

   ```bash
   cd PERN-ToDo-App
   ```

3. Install dependencies for both the server and client:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

4. Set up your PostgreSQL database and update the database connection details in `server/db.js`.

5. Run the server and client concurrently:

   ```bash
   npm run dev
   ```

6. The app will be accessible at `http://localhost:3000`.

## CI/CD Pipeline

This project includes a complete CI/CD pipeline using GitHub Actions that:

1. **Tests**: Runs unit tests for both client and server
2. **Builds**: Creates Docker images for all services
3. **Pushes**: Uploads images to Docker Hub
4. **Deploys**: Ready for production deployment

### Setup GitHub Secrets

To enable the CI/CD pipeline, add these secrets to your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

### Docker Hub Images

After setting up the CI/CD pipeline, your images will be available at:
- `yourusername/pern-todo-app-client:latest`
- `yourusername/pern-todo-app-server:latest`
- `yourusername/pern-todo-app-db:latest`

## Usage

- Create tasks/ todos.
- Get all details of todos
- Delete and Update todos.

## SnapShots
![image](https://github.com/vickytilotia/PERN-ToDo-App/assets/32337899/55fc7f56-1889-473a-908f-2ae49e2fd0c2)


## Contributing

Contributions are welcome! If you find any issues or want to enhance the project, feel free to create a pull request.

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -am 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the ISC License.

