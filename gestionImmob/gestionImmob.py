# API REST
# pylint: disable=no-member
from flask import Response, request
from gestionImmob.database.models import Bien
from flask_restful import Resource


class BiensApi(Resource):
  def get(self):
    movies = Bien.objects().to_json()
    return Response(movies, mimetype="application/json", status=200)

  def post(self):
    body = request.get_json()
    movie = Bien(**body).save()
    id = movie.id
    return {'id': str(id)}, 200
 
class BienApi(Resource):
  def put(self, id):
    body = request.get_json()
    Bien.objects.get(id=id).update(**body)
    return '', 200
 
  def delete(self, id):
    bien = Bien.objects.get(id=id).delete()
    return '', 200

  def get(self, id):
    movies = Bien.objects.get(id=id).to_json()
    return Response(movies, mimetype="application/json", status=200)



# Blueprint
"""
from flask import Blueprint, Response, request
from gestionImmob.database.models import Movie

movies = Blueprint('movies', __name__)
# pylint: disable=no-member
@movies.route('/movies')
def get_movies():
    movies = Movie.objects().to_json()
    return Response(movies, mimetype="application/json", status=200)

@movies.route('/movies', methods=['POST'])
def add_movie():
    body = request.get_json()
    movie =  Movie(**body).save()
    id = movie.id
    return {'id': str(id)}, 200

@movies.route('/movies/<id>', methods=['PUT'])
def update_movie(id):
    body = request.get_json()
    Movie.objects.get(id=id).update(**body)
    return '', 200

@movies.route('/movies/<id>', methods=['DELETE'])
def delete_movie(id):
    movie = Movie.objects.get(id=id).delete()
    return '', 200

@movies.route('/movies/<id>')
def get_movie(id):
    movies = Movie.objects.get(id=id).to_json()
    return Response(movies, mimetype="application/json", status=200)
    """