# Task Manager

This node app provide REST APIs to perform CRUD operations on users and tasks collection in mongodb.

## Setup

- Setup mongoDb
- Setup SendGrid for emails
- Setup the environment variables according to the template_dev.envv
- Name the file dev.env
- Run 'npm install'
- Run 'npm run dev' for running in dev environment

## Main topics

Following Node/JS topics are are the main focus in this node app - 

- REST APIs
- CRUD operations on mongodb
- Promises and promise chaining
- Async/ await
- Status codes
- MongoDb Collection-Association
- Sorting, Pagination and filtering

### Security Features

Following security features are provided with this app -

- Password hashing
- Authentication using JWT (Login/ logout)
- Data abstraction (Exposing only necessary data to the clients)
- Authorization

## Node/JS Topics covered

Following Node/JS topics are covered in this node app - 

- Importing files/npm modules
- CLI handling
- Error handling
- Http request, response and error handling
- Callback functions and chaining
- Express

## Features
Following features are available in this node app - 

### 1. Add new user to users collection
You can add a new user to users collection using the following post request - 

![Request for adding new user](./photos-for-readme/add-new-user.jpg)

### 2. Get all users
You can get all users from users collection using the following get request - 

![Request for getting all users](./photos-for-readme/get-all-users.jpg)

### 3. Get user
You can get a user from users collection using the following get request - 

![Request for getting a user](./photos-for-readme/get-user.jpg)

### 4. Update user
You can update a user from users collection using the following patch request - 

![Request for updating user](./photos-for-readme/update-user.jpg)

### 5. Delete user
You can delete a user from users collection using the following delete request - 

![Request for deleting user](./photos-for-readme/delete-user.jpg)

### 6. Add task to tasks collection
You can add a new task to tasks collection using the following post request - 

![Request for adding new task](./photos-for-readme/add-task.jpg)

### 7. Get all tasks
You can get all tasks from tasks collection using the following get request - 

![Request for getting all tasks](./photos-for-readme/get-all-tasks.jpg)

### 8. Get task
You can get a task from tasks collection using the following get request - 

![Request for getting a task](./photos-for-readme/get-task.jpg)

### 9. Update task
You can update a task from tasks collection using the following patch request - 

![Request for updating task](./photos-for-readme/update-task.jpg)

### 10. Delete task
You can delete a task from tasks collection using the following delete request - 

![Request for deleting task](./photos-for-readme/delete-task.jpg)

## To do
1. Update readme for latest APIs
2. Add details about testing
3. Add details about project setup
4. Add link of deployed app

### Future additions
1. Test all the remaining scenarios/ functions