# API REST
# pylint: disable=no-member
from flask import Response, request
from gestionImmob.database.models import Bien
from gestionImmob.database.models import User
from flask_restful import Resource
import time, datetime, json
from flask_jwt_extended import jwt_required,  get_jwt_identity



########################## Les biens ###################################
class BiensApi(Resource):
  # Lister tous les biens
  def get(self):
    biens = Bien.objects().to_json()
    return Response(biens, mimetype="application/json", status=200)
  
  # Renseigner un bien
  @jwt_required
  def post(self):   
    user_id = get_jwt_identity()
    body = request.get_json()
    #bien = Bien(**body).save()
    user = User.objects.get(id=user_id)
    bien = Bien(**body, added_by=user)
    bien.save()
    user.update(push__biens=bien)
    user.save()
    id = bien.id
    return {'Le bien a été ajouté et son id est': str(id)}, 200


class BienApi(Resource):
  # modifier un bien selon son id
  @jwt_required
  def put(self, id):
    user_id = get_jwt_identity()
    bien = Bien.objects.get(id=id, added_by=user_id)
    body = request.get_json()
    Bien.objects.get(id=id).update(**body)
    return 'Modification des informations du bien avec succès', 200


  # supprimer un bien selon son id
  @jwt_required
  def delete(self, id):
    user_id = get_jwt_identity()
    bien = Bien.objects.get(id=id, added_by=user_id)
    bien.delete()
    return "Suppression de l'utilisateur avec succès", 200

  # retrouver un bien selon son id
  def get(self, id):
    biens = Bien.objects.get(id=id).to_json()
    return Response(biens, mimetype="application/json", status=200)

class BienCondApi(Resource):
  # retrouver tous les biens selon la ville
  def get(self, ville):
    biens = Bien.objects.filter(ville=ville).to_json()
    return Response(biens, mimetype="application/json", status=200)

########################## Les utilisateurs ###################################
class UsersApi(Resource):
  # Lister tous les utilisateurs
  def get(self):
    users = User.objects().to_json()
    print(users)
    return Response(users, mimetype="application/json", status=200)
  # Renseigner un utilisateur

  def post(self):
    body = request.get_json()
    var = body['date_naissance']
    date_time_obj = datetime.datetime.strptime(var, '%d-%m-%Y')
    body['date_naissance'] = date_time_obj
    print("here it is", date_time_obj)
    user = User(**body).save()
    id = user.id
    return {"L'utilisateur a bien été ajouté et son id est": str(id)}, 200

class UserApi(Resource):
  # modifier les infos d'un utilisateur selon son id
  def put(self, id):
    body = request.get_json()
    User.objects.get(id=id).update(**body)
    return 'Modification des informations utilisateur avec succès', 200

  # supprimer un utilisateur selon son id
  def delete(self, id):
    user = User.objects.get(id=id).delete()
    return "Suppression de l'utilisateur avec succès", 200

  # retrouver un utilisateur selon son id
  def get(self, id):
    """
    i = User.objects.get(id=id)
    print(i['date_naissance'])
    i['date_naissance'] = json.dumps(i['date_naissance'], default = myconverter)
    print(i)
    users = i.to_json() """
    users = User.objects.get(id=id).to_json()
    return Response(users, mimetype="application/json", status=200)

"""
def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()
"""