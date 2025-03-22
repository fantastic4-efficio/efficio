# Efficio - Task Tracker

- Efficio is a full-stack task-tracking application that enables users to efficiently manage their work. Users can register and log in to access a dashboard that displays project status, progress tracking, and charts. The application allows users to be assigned to teams, create projects, manage tasks related to projects, and define subtasks for specific tasks.

## Features

- User Authentication: Users can register and log in.
- Dashboard: Members can view project status, progress, and charts.
- Team Management: Users can be assigned to teams.
- Project Management: Create, retrieve, and delete projects.
- Task Management: Create, retrieve, and delete tasks and subtasks.
- Role-Based Access: Guests MUST log in to use the system.

## API Endpoints Lists


### Users
- Get users by team name
- GET /api/users/usersByTeam/:team_name

- GET - MyAccountPage - Get users by team names
- GET /api/users/myaccountinfo/:username

- Register a new user
- POST /api/users/register

- Log in
- POST /api/users/login


### Projects

- Get project info by user
- GET /api/projects/byusers/:user_id

- Get project info by username
- GET /api/projects/byusername/:username

- Get project info by team
- GET /api/projects/byteams/:team_id

- Create new projects
- POST /api/projects/create-new-project

- Delete existing projects ID
- DELETE /api/projects/delete-project/:project_id

- Update existing projects by project_id
- PATCH /api/projects/update/:project_id


### Tasks

- Read all tasks by project
- GET /api/tasks/byproject/:project_id

- Read all tasks for a certain username
- GET /api/tasks/byowner/:username

- Read all tasks by tasks completion percentage for a certain username
- GET /api/tasks/percentagebyowner/:username

- Create new tasks
- POST /api/tasks/create-new-tasks

- Delete existing tasks ID
- DELETE /api/tasks/deletetasks/:taskId

- Update existing tasks by task_id
- PATCH /api/tasks/update/:taskId


### Teams

- Get all existing Team names
- GET /api/teams/allTeams

- Retrieve teams associated with a specific user
- GET /api/teams/associtedTeams/:username

- Create new teams
- POST /api/teams/create-new-team

- Delete existing teams by team name
- DELETE /api/teams/delete-team/:team_name
