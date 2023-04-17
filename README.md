# Clock In System
 
## API Documentation
Please see https://fhmclockinsys.docs.apiary.io/  
### Postman
Postman Collection is prepared and stored in `/postman`. Import the whole folder to Postman to start calling API.  
An environment `Local Dev` is created to call `localhost` server. Change the `server_url` to a suitable one or create a new environment.

## Deployment Documentation
### Local Run
1. Prepare a MySQL Server, with `database` created. For example,
   ```CREATE DATABASE clock_in_system;```
2. Prepare the `.env` file, with following parameters or check `.env.template`
   ```
   # == Database ==
   MYSQL_HOST=
   MYSQL_PORT=
   MYSQL_DB_NAME=
   MYSQL_USER=
   MYSQL_PASSWORD=
   # Path to JSON file containing data to be inserted in DB when startup, e.g. ./data/member.json. Can be empty
   DEFAULT_FILE_PATH=
   
   # == API ==
   # Port number that the server is listening to
   SERVER_PORT=
   # For api versioning and will affect the URL that server is listening, /api/{API_VERSION}/xxx
   API_VERSION=
   ```
3. Run the `npm` commands
   ```
   npm install
   npm run start
   ```
