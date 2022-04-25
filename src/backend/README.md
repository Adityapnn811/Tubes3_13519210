### Requirements
- mariadb

### Newest Addition
- Added KMP algorithm for pattern matching with longest matching string memmory if fail

### Previous Addition
- Added Azure MySQL Database that can be queried using querydb module
- Disease database cleanup

### Need to Know
- run on root user in mysql or mariadb
```
CREATE USER "DoNotArrest"@"localhost" IDENTIFIED BY "IF2211";
CREATE DATABASE dna;
GRANT ALL PRIVILEGES ON dna.* TO "DoNotArrest"@"localhost";
FLUSH PRIVILEGES;
```
- run `gen_disease.py` to generate random database or import using `mysql -u DoNotArrest -p dna < database_dna.sql` at data directory
- export database using `mysqldump -u DoNotArrest -p --databases dna --add-drop-database --routines --verbose > database_dna.sql`