# API REST
# pylint: disable=no-member
# pylint: disable=unused-variable
from flask import Response, request
from gestionImmob.database.models import Bien
from gestionImmob.database.models import User
from flask_restful import Resource
import time, datetime, json
from flask_jwt_extended import jwt_required,  get_jwt_identity
from mongoengine.errors import FieldDoesNotExist, \
NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError

from gestionImmob.errors import SchemaValidationError, BienAlreadyExistsError, \
InternalServerError, UpdatingBienError, DeletingBienError, BienNotExistsError

import json
from flask_cors import CORS, cross_origin

########################## Les biens ###################################
class BiensApi(Resource):
  # Lister tous les biens
  def get(self):
    biens = Bien.objects().to_json()
    biens = json.loads(biens)
    biens_tab = []
    for b in biens:
      u ={}
      u["nom"] = b["nom"]
      u["type_bien"] = b["type_bien"]
      u["ville"] = b["ville"] 
      u["pieces"] = b["pieces"] 
      u["description"] = b["description"] 
      u["proprietaire"] = b["proprietaire"] 
      biens_tab.append(u)
    biens_tab = json.dumps(biens_tab)  
    print(biens_tab)
    #biens = Bien.objects().to_json()
    return Response(biens_tab, mimetype="application/json", status=200)
  
  # Renseigner un bien
  @jwt_required
  def post(self):   
    try:
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
    except (FieldDoesNotExist, ValidationError):
        raise SchemaValidationError
    except NotUniqueError:
        raise BienAlreadyExistsError
    except Exception as e:
        raise InternalServerError


class BienApi(Resource):
  # modifier un bien selon son id
  @jwt_required
  def put(self, id):
    try:
      user_id = get_jwt_identity()
      bien = Bien.objects.get(id=id, added_by=user_id)
      body = request.get_json()
      Bien.objects.get(id=id).update(**body)
      return 'Modification des informations du bien avec succès', 200
    except InvalidQueryError:
         raise SchemaValidationError
    except DoesNotExist:
         raise UpdatingBienError
    except Exception:
         raise InternalServerError  


  # supprimer un bien selon son id
  @jwt_required
  def delete(self, id):
    try:
      user_id = get_jwt_identity()
      bien = Bien.objects.get(id=id, added_by=user_id)
      bien.delete()
      return "Suppression de l'utilisateur avec succès", 200
    except DoesNotExist:
        raise DeletingBienError
    except Exception:
        raise InternalServerError

  # retrouver un bien selon son id
  def get(self, id):
    try: 
      biens = Bien.objects.get(id=id).to_json()
      return Response(biens, mimetype="application/json", status=200)
    except DoesNotExist:
        raise BienNotExistsError
    except Exception:
        raise InternalServerError

class BienCondApi(Resource):
  # retrouver tous les biens selon la ville
  def get(self, ville):
    biens = Bien.objects.filter(ville=ville).to_json()
    return Response(biens, mimetype="application/json", status=200)

