# pylint: disable=no-member
from flask import request, Response
from .database.models import User
from flask_restful import Resource
import datetime
from flask_jwt_extended import create_access_token




class SignupApi(Resource):
 def post(self):
   body = request.get_json()
   user = User(**body)
   var = user['date_naissance']
   date_time_obj = datetime.datetime.strptime(var, '%d-%m-%Y')
   user['date_naissance'] = date_time_obj
   user.hash_password()
   user.save()
   id = user.id
   return {'id': str(id)}, 200


class LoginApi(Resource):
 def post(self):
   body = request.get_json()
   user = User.objects.get(pseudo=body.get('pseudo'))
   authorized = user.check_password(str(body.get('password')))
   if not authorized:
     return {'error': 'Pseudo or password invalid'}, 401

   expires = datetime.timedelta(days=7)
   access_token = create_access_token(identity=str(user.id), expires_delta=expires)
   return {'token': access_token}, 200