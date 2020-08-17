Run npm install or yarn to install the projects dependencies. 
$npm init >>>for dependencies

Create a MySQL database and run the backup.sql file in the database directory to migrate the database 
$ mysql -u mysql_user -p DATABASE < backup.sql

After doing this you can start the Application by enter in project directort then run below cammands
$ npm run dev 
