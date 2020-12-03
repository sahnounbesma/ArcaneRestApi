from .gestionImmob import BiensApi, BienApi

def initialize_routes(api):
 api.add_resource(BiensApi, '/api/bien')
 api.add_resource(BienApi, '/api/biens/<id>')


"""
- api.add_resource(MoviesApi, '/movies')
- api.add_resource(MovieApi, '/movies/<id>')
"""
