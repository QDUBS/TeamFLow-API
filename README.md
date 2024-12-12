An implementation of the backend part of TeamFlow, a full-stack application for the management of departments and sub-departments for an organization. This project was built using Nest.js, GraphQL, TypeORM and PostgreSQL.

STRUCTURE
The project contains two main sections:

1. Authentication: handles the creation of new users, authentication of users using JWT, and logging in of existing users.

2. Departments: handles the display of existing departments, creation of new departments and sub-departments. It also handles to updating of exisiting departments as well as sub-departments.


SETUP, COMPILATION AND USAGE
Below are a set of steps to follow when setting up the project:
a. Clone the repository
b. Run the "npm install --exact" command to install all the dependencies and packages for the project
c. Setup a database on your PostgreSQL server and add the credentials in the ".env" file using the same environment variables keys used in "app.module.ts" file
d. Run the server in development mode using the command "npm run start"
e. Run the server in watch mode using the command "npm run start:dev"
f. Run the server in watch mode using the command "npm run start:prod
g. And voila!!
h. You can also find the app live on 

