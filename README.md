# Efficio - Task Tracker

- Efficio is a full-stack task-tracking application that enables users to efficiently manage their work. Users can register and log in to access a dashboard that displays project status, progress tracking, and charts. The application allows users to be assigned to teams, create projects, manage tasks related to projects, and define subtasks for specific tasks.

## Features

- User Authentication: Users can register and log in.
- Dashboard: Members can view project status, progress, and charts.
- Team Management: Users can be assigned to teams.
- Project Management: Create, retrieve, and delete projects.
- Task Management: Create, retrieve, and delete tasks and subtasks.
- Role-Based Access: Guests MUST log in to use the system.

## API Endpoints

### Users
- Get users by team name
- GET /api/users/usersByTeam/:team_name

- Register a new user
- POST /api/users/register

- Log in
- POST /api/users/login

### Projects

- Get project info by user
- GET /api/projects/byusers/:user_id

- Get project info by team
- GET /api/projects/byteams/:team_id

- Create new projects
- POST /api/projects/create-new-project

- Delete existing projects
- DELETE /api/projects/delete-project/:project_id

### Tasks

- Read all tasks by project
- GET /api/tasks/byproject/:project_id

- Read all tasks for a certain owner
- GET /api/tasks/byowner/:owner_id

- Create new tasks
- POST /api/tasks/create-new-tasks

- Delete existing tasks
- DELETE /api/tasks/deletetasks/:taskId

### Teams

- Get all existing Team names
- GET /api/teams/allTeams

- Create new teams
- POST /api/teams/create-new-team
