from mariadb import *
from os.path import abspath, dirname, join
from random import randint

### Before use, login to root of mariadb and do following commands
# CREATE USER "DoNotArrest"@"localhost" IDENTIFIED BY "IF2211";
# GRANT ALL PRIVILEGES ON dna.* TO "DoNotArrest"@"localhost";
# FLUSH PRIVILEGES;

USERNAME = "DoNotArrest"
PASSWORD = "IF2211"

conn = connect(
            user     = USERNAME    ,
            password = PASSWORD    ,
            host     = "localhost" ,
            database = "dna"
            )

cur = conn.cursor()
cur.execute("""DROP TABLE IF EXISTS disease;""")
cur.execute(
    """CREATE TABLE disease(
        id_disease SERIAL UNIQUE PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        sequence TEXT(100) NOT NULL
    );"""
)

f = open(abspath(join(dirname(__file__), "disease.txt")), "r")

maxlen = 0
diseases = f.read().split('\n')

for i in range(len(diseases)):
    diseases[i] = diseases[i].title()
    if diseases[i] and len(diseases[i]) > maxlen:
        maxlen = len(diseases[i])

diseases = list(dict.fromkeys(diseases))
diseases.sort()

print(len(diseases), maxlen)
print(diseases[:10])

letters = ["A", "C", "G", "T"]

for disease in diseases:
    if disease:
        s = ""

        for i in range(100):
            letter = letters[randint(0, 3)]
            s = s + letter

        cur.execute("""INSERT INTO disease VALUES (DEFAULT, ?, ?)""", (disease, s, ))

conn.commit()
conn.close()