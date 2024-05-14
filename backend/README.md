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