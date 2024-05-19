## For Development
1. Install dependencies using pip:
    ```
    pip install -r requirements.txt
    ```
2. Create a `.env` file in the backend directory of your project.
3. Initialize the following environment variables in your `.env` file:
    ```
    DB_USERNAME="[your database username]"
    DB_PASSWORD="[your database password]"
    DB_HOST="localhost"
    DB_NAME="food_journal"
    ```
   Replace `[your database username]` and `[your database password]` with your actual database credentials.

## Setting Up MySql

If you have never used MySql locally before you will need to first set it up. You can download the latest installed of MySql and use the GUI installer. The installer will prompt you to set a root password, take note of this password, it is the password you will place in your .env file. Once installed in order to run the server, in terminal run the command `/usr/local/mysql/support-files/mysql.server start`. This will start your server. To stop it, run `/usr/local/mysql/support-files/mysql.server stop`. In order to simplify things you can add MySql to your path. To do this run `nano /etc/paths` and add `/usr/local/mysql/bin` and `/usr/local/mysql/support-files`. This way you can also access the MySQL shell from the terminal as well. 

In order to look at the database you can run `mysql -u "root" -p` which will prompt you for the root password you chose when installing MySQL. In the shell run `USE food_journal;` then to view all current entries in the database you can run `SELECT * FROM fd_users;`.

In the project backend project directory ensure you have a `.env` with the information specified above. Then you are able to connect your local database to the running project on your local machine.

## Running the Server

In order to run the server on your local machine all you need to do is run `python backend/main.py` while the MySQL server is running. This will start the uvicorn server on your local machine at `0.0.0.0:6542`. To see the API docs and all possible endpoints you can go to `0.0.0.0:6542/docs`. API calls will generally follow the convention `/api/v1/<auth or post_review>/<endpoint>`.

## Testing Post Endpoints

In order to test post endpoints you can use CURL on your local machine. You can run `curl -X POST 0.0.0.0:6542/<API URL> -H "Content-type: application/json" -d @<json data file>` where the API URL is something like `/api/v1/auth/login` and the JSON data file is the path to a JSON file with the data to post according to the data schema for the endpoint. As an example, if I wanted to test creating a user I would run `curl -X POST http://0.0.0.0:6542/api/v1/auth/create_user -H "Content-type: application/json" -d @test.json` where `test.json` is the JSON file with a JSON object with the first_name, last_name, username, email, and password fields as specified in `backend/schemas.py` for the `UserBase` class.