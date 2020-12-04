from .gestionImmob import BiensApi, BienApi, UserApi, UsersApi, BienCondApi

def initialize_routes(api):
 api.add_resource(BiensApi, '/api/bien')
 api.add_resource(BienApi, '/api/biens/<id>')
 api.add_resource(BienCondApi, '/api/biens/cond/<ville>')
 api.add_resource(UsersApi, '/api/user')
 api.add_resource(UserApi, '/api/users/<id>')
 

"""
- api.add_resource(MoviesApi, '/movies')
- api.add_resource(MovieApi, '/movies/<id>')
"""
