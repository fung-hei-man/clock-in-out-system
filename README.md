# Clock In Out System

System for employees to clock in / out with query functions.
 
## API Documentation
Please see https://fhmclockinsys.docs.apiary.io/  

### Postman
Postman Collection is prepared and stored in `/postman`. Import the folder to Postman to start calling API.  
An environment `Local Dev` is created to call `localhost` server. Change the `server_url` to a suitable one or create a new environment.


## Deployment Documentation
### `.env` File
A `.env` file at root directory is always necessary for this system to run regardless of envrionment.  
Before deployment, prepare the `.env` file with following parameters or check `.env.template`.
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

### Docker
Docker Compose is used to start a MySQL DB together with this system.

1. Change the database password to a strong one in `docker-compose.yml` for security reason.
   ```
   environment:
      - TZ=Asia/Taipei
      - MYSQL_DATABASE=c
      - MYSQL_USER=sys_admin
      - MYSQL_PASSWORD=[CHANGE TO STRONG PASSWORD]
      - MYSQL_ROOT_PASSWORD=[CHANGE TO STRONG PASSWORD]
   ```
2. Create the `.env` file as mentioned. 
   - Suffix can be added to identified in which environment this file is used. For example, name it `.env.docker`
   - Remember to change `MYSQL_PASSWORD` to the one used in step 1.
3. Update the `env_file` in `docker-compose.yml` to the filename of the `.env` file created. Default is `.env.docker`.
4. Run the containers by
   ```
   docker-compose up -d
   ```
5. May need to wait for several minutes for the MySQL server to start and the system to connect to it.

6. Server should be listening to port 3000 and waiting for incoming calls.

### Local Run
1. Prepare a MySQL Server, with `database` created. For example,
   ```
   CREATE DATABASE clock_in_out_system;
   ```

2. Create the `.env` file as mentioned.

3. Run the `npm` commands
   ```
   npm install
   npm run start
   ```
4. Server should be listening to port 3000 and waiting for incoming calls.
