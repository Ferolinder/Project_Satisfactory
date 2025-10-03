# Project_Satisfactory
The Objective is to make me a good website that i can use to calculate and organisate my production on this marvelous game SATISFACTORY

# Downloading services 
sudo apt install apache2, postgresql

# Starting services
sudo service apache2 start
sudo service postgresql start

# Create Database 
Create the database named satisdata using the main user of postgresql, "postgres"
```bash
$ sudo service postgresql start
$ sudo psql -U postgres

```
```psql
# CREATE DATABASE satisdata;
# ALTER USER postgres WITH PASSWORD 'a'; -- change password if you need, this one is to make it more convenient  
```

# Remplish the database 
- Connect the database using VS code and the API named SQLTools (https://vscode-sqltools.mteixeira.dev/en/home.html)
- Use the constants that are in ./php/constants.php
- run "model.sql" in ./sql

# Launch website 
http://localhost/Project_Satisfactory/

