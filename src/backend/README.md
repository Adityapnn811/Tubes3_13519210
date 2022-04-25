### Requirements
- mariadb

### Newest Addition
- Added Azure MySQL Database that can be queried using querydb module
- Disease database cleanup

### Need to Know
- run on root user in mariadb
```
CREATE USER "DoNotArrest"@"localhost" IDENTIFIED BY "IF2211";
CREATE DATABASE dna;
GRANT ALL PRIVILEGES ON dna.* TO "DoNotArrest"@"localhost";
FLUSH PRIVILEGES;
```
- run `generator.py` to generate random database or import using `mysql -u DoNotArrest -p dna < database_dna.sql` after unzipping database
- export database using `mysqldump -u DoNotArrest -p --databases dna --add-drop-database --routines --verbose > database_dna.sql`