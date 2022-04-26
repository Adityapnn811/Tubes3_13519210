### Requirements
- `npm install`

### how to run
- `npm run devStart`

### Newest Addition
- Deployed api at `https://do-not-arrest.herokuapp.com/`
- Available routes:
  - GET: `/api/patients` -> returns json object `{ result, original }`
  - POST: `/api/disease` -> returns json object `{ result, original }`, requires a json constaining:
    1. `disease`: "`disease name`"
    2. `sequence`: "`sequence string`"
  - POST: `/api/kmp` -> kmp + levenshtein returns json object `{ match_res, status, original }`, requires:
    1. `name`: "`patient name`"
    2. `disease`: "`suspected patient disease`"
    3. `patient_dna`: "`sequence string`"
- Notes:
  - `result` is always query return value `{ fields, results }`
  - `match_res` is result of string matching and `status` is result of data insertion into database

### Previous Addition
- Added Azure MySQL Database that can be queried using querydb module
- Disease database cleanup
- Added KMP algorithm for pattern matching with longest matching string memmory if fail

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