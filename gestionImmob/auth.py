# pylint: disable=no-member
# pylint: disable=unused-variable
from flask import request, Response
from .database.models import User
from flask_restful import Resource
import datetime
from flask_jwt_extended import create_access_token
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist
from gestionImmob.errors import SchemaValidationError, PseudoAlreadyExistsError, UnauthorizedError, \
InternalServerError
import json
from flask_jwt_extended import jwt_required,  get_jwt_identity
from flask_cors import CORS, cross_origin

class SignupApi(Resource):
  #créer un user
 def post(self):
   try:
     body = request.get_json()
     user = User(**body)
     var = user['date_naissance']
     date_time_obj = datetime.datetime.strptime(var, '%d-%m-%Y')
     user['date_naissance'] = date_time_obj
     user.hash_password()
     user.save()
     id = user.id
     return {'id': str(id)}, 200
   except FieldDoesNotExist:
     raise SchemaValidationError
   except NotUniqueError:
     raise PseudoAlreadyExistsError
   except Exception as e:
     raise InternalServerError

class LoginApi(Resource):
  # connexion d'un user
 def post(self):
   try:
     print('merhba bik zinoun')
     body = request.get_json()
     user = User.objects.get(pseudo=body.get('pseudo'))
     authorized = user.check_password(str(body.get('password')))
     if not authorized:
       return {'error': 'Pseudo or password invalid'}, 401

     expires = datetime.timedelta(days=7)
     access_token = create_access_token(identity=str(user.id), expires_delta=expires)
     print(str(access_token))
     return {'token': access_token}, 200
     #return access_token
   except (UnauthorizedError, DoesNotExist):
       raise UnauthorizedError
   except Exception as e:
       raise InternalServerError



class UsersApi(Resource):
  # Lister tous les utilisateurs
  @cross_origin()
  def get(self):
    users = User.objects().to_json()
    users = json.loads(users)
    users_tab = []
    for us in users:
      u ={}
      u["id"] = us["_id"]["$oid"]
      u["pseudo"] = us["pseudo"]
      u["nom"] = us["nom"] 
      u["prenom"] = us["prenom"]
      u["date_naissance"] = us["date_naissance"]
      u["biens"] = us["biens"] 
      users_tab.append(u)
    users_tab = json.dumps(users_tab)  
    print(users_tab)
    return Response(users_tab, mimetype="application/json", status=200)
  
  # Renseigner un utilisateur sans auth
  @cross_origin()
  def post(self):
    print('ninouch')
    print(request.data)
    body = request.get_json()
    var = body['date_naissance']
    date_time_obj = datetime.datetime.strptime(var, '%d-%m-%Y')
    body['date_naissance'] = date_time_obj
    #print("here it is", date_time_obj)
    user = User(**body).save()
    id = user.id
    return {"L'utilisateur a bien été ajouté et son id est": str(id)}, 200
   

class UserApi(Resource):
  # modifier les infos d'un utilisateur selon son id
  @jwt_required
  @cross_origin()
  def put(self, id):
    print('ninouch')
    print(request.data)
    body = request.get_json()
    print(body)
    print('header', request.headers)
    User.objects.get(id=id).update(**body)
    return 'Modification des informations utilisateur avec succès', 200

  # supprimer un utilisateur selon son id
  @cross_origin()
  def delete(self, id):
    h = request.headers
    print(h)
    user = User.objects.get(id=id).delete()
    return "Suppression de l'utilisateur avec succès", 200

  # retrouver un utilisateur selon son id
  @cross_origin()
  def get(self, id):
    users = User.objects.get(id=id).to_json()
    return Response(users, mimetype="application/json", status=200)

