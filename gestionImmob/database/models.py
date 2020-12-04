#~movie-bag/database/models.py

# pylint: disable=E0402
from mongoengine import StringField
from .db import db

# pylint: disable=no-member
class Bien(db.Document):
    nom = db.StringField(required=True, unique=True)
    description = db.StringField(required=True)
    type_bien = db.StringField(required=True)
    ville = db.StringField(required=True)
    pieces = db.IntField(required=True)  #nbr pièces
    caracteristiques = db.ListField(db.StringField(), required=False)
    proprietaire = db.StringField(required=True)


class User(db.Document):
    nom = db.StringField(required=True)
    prenom = db.StringField(required=True)
    # A changer en type date
    date_naissance = db.DateTimeField(required=True)  
    