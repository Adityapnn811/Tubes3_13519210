from os.path import abspath, dirname, join
from random import randint

f = open(abspath(join(dirname(__file__), "patient_dna.txt")), "w")

letters = ["A", "C", "G", "T"]

for i in range(10000):
    f.write(letters[randint(0, 3)])

f.close()