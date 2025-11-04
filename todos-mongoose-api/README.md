# TODOs Mongoose API


## Tasks

Create a simple CRUD (Create, Read, Update, Delete) RESTful API application using Express.js and Mongoose. 

Use the following HTTP Methods and coresponding Mongoose read and write operations.

|HTTP Method|Mongo Node driver method|
|-|-|
|GET|find|
|GET|findById or findOne|
|POST|save or close|
|PUT|findOneAndReplace or replaceOne|
|PATCH|findByIdAndUpdate or updateOne|
|DELETE|findByIdAndDelete or deleteOne|

Be sure to add error handling in each middleware function using `try-catch`.

Be sure to connect and disconnect from the Mongo DB instance too. Connect in the try block and disconnect in a finally block. 

**Bonus**: Add pagination when reading all the users.

## Setup (Locally on your PC)
Setup a JavaScript project for a new express app by running the following commands: 

```bash
mkdir todos-mongoose-api
cd todos-mongoose-api
npm init   # (When prompted, specify app.js as the start file.) 
git init
echo ‘node_modules/’ > .gitignore
npm install express cors mongoose --registry http://npm.perseverenow.org/ppm/
```

Open VSCode with: `code .`  

Add `"type": "module"`, to the `package.json` file.

Create a file called `app.js` and add your server code.

## Create a Gitlab project

Create a new, blank project in Gitlab in your namespace called **todos-mongoose-api**. 

Remember to uncheck the README file create option. 

Get the project URL located behind the Code button.

In your Git bash terminal, set the remote using the following command. 
```bash
git remote add origin <url>
```
Then, add, commit, and push up your main branch.  

## Adding/ Updating packages 

For express ...
```bash
npm install express@latest  --registry http://npm.perseverenow.org/ppm/
```
