#~movie-bag/database/models.py

# pylint: disable=E0402
from mongoengine import StringField
from .db import db
#from flask_bcrypt import generate_password_hash, check_password_hash

# pylint: disable=no-member
class Bien(db.Document):
    nom = db.StringField(required=True)
    description = db.StringField(required=True)
    type_bien = db.StringField(required=True)
    ville = db.StringField(required=True)
    pieces = db.IntField(required=True)  #nbr pièces
    caracteristiques = db.ListField(db.StringField(), required=False)
    proprietaire = db.StringField(required=True)
    added_by = db.ReferenceField('User')

class User(db.Document):
    pseudo = db.StringField(required=False, unique=True)
    password= db.StringField(required=False)
    nom = db.StringField(required=True)
    prenom = db.StringField(required=True)
    date_naissance = db.DateTimeField(required=False) 
    biens = db.ListField(db.ReferenceField('Bien', reverse_delete_rule=db.PULL)) 
 #   def hash_password(self):
 #       self.password = generate_password_hash(self.password).decode('utf8')
    
 #   def check_password(self, password):
 #       return check_password_hash(self.password, password) 

User.register_delete_rule(Bien, 'added_by', db.CASCADE)