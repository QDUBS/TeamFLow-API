An implementation of the backend part of TeamFlow, a full-stack application for the management of departments and sub-departments for an organization. 

This project was built using Nest.js, GraphQL, TypeORM and PostgreSQL.


-------------------------------------------------------------------------------------------------------------------------------------------------------------------
STRUCTURE:

The project contains two main sections:

1. Authentication: handles the creation of new users, authentication of users using JWT, and logging in of existing users.

2. Departments: handles the display of existing departments, creation of new departments and sub-departments. It also handles to updating of exisiting departments as well as sub-departments.


-------------------------------------------------------------------------------------------------------------------------------------------------------------------
SETUP, COMPILATION:

Below are a set of steps to follow when setting up the project:

a. Clone the repository

b. Run the "npm install --exact" command to install all the dependencies and packages for the project

c. Setup a database on your PostgreSQL server and add the credentials in the ".env" file using the same environment variables keys used in "app.module.ts" file

d. Run the server in development mode using the command "npm run start"

e. Run the server in watch mode using the command "npm run start:dev"

f. Run the server in watch mode using the command "npm run start:prod

g. And voila!!

h. You can also find the app live on - https://teamflow-api.onrender.com/graphql


-------------------------------------------------------------------------------------------------------------------------------------------------------------------
USAGE:

Using the queries below, you can perform CRUD operations for users, departments and sub-departments

For Users:

1. Create new user

mutation {

  createUser(createUserDto: {
  
    username: "Qdub$",
    
    password: "12345"
  
  }) {
  
    id
    
    username,
    
    password
  
  }

}


For Departments:

1. Get all departments

query {

  getAllDepartments {
  
    id
    
    name
    
    subDepartments {
    
      name
    
    }
  
  }

}


3. Get single department

query {

  getDepartment(id: 6) {
  
    id
    
    name
    
    subDepartments {
    
      name
    
    }
  
  }

}


4. Create a department without sub-departments

mutation {

  createDepartment(createDepartmentDto: {
  
    name:"HR department",
    
    subDepartments: []
  
  }) {
  
    id
    
    name
    
    subDepartments {
    
      id
      
      name
   
    }
    
  }

}


5. Create a department with sub-departments

mutation {

  createDepartment(createDepartmentDto: {
  
    name:"Medical department",
    
    subDepartments: [
    
      {
      
        name: "Nurses"
      
      },
      
      {
      
        name: "Doctors"
      
      },
      
      {
      
        name: "Lab Attendants"
      
      }
    
    ]
  
  }) {
  
    id
    
    name
   
    subDepartments {
    
      id
      
      name
    
    }
  
  }

}

6. Update a department using the department ID

mutation {

  updateDepartment(id: 6, updateDepartmentDto: {
  
    name:"Healthcare department"
  
  }) {
  
    id
    
    name
  
  }

}


7. Delete a department using the department ID

mutation {

  deleteDepartment(id: 2)

}

For Sub-Departments:

1. Get single sub-department

query {

  getSubDepartment(name: "BA") {
  
    name
  
  }

}

2. Create a sub-department

mutation {

  createSubDepartment(createSubDepartmentData: {
  
    name: "New SubDepartment",
    
    departmentId: 1
  
  }) {
  
    id
    
    name
  
  }

}


3. Update a sub-department using the sub-department ID

mutation {

  updateSubDepartment(id: 13, updateSubDepartmentDto: {
  
    name:"New New Sub Department"
  
  }) {
  
    id
    
    name
  
  }

}


4. Delete a sub-department using the sub-department ID

mutation {

  deleteSubDepartment(id: 10)

}
