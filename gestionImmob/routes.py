from .bien import BiensApi, BienApi, BienCondApi, BienCondTypeApi, BienCondPiecesApi , TestApi
from .auth import SignupApi, LoginApi, UserApi, UsersApi


def initialize_routes(api):
 api.add_resource(TestApi, '/')
 api.add_resource(BiensApi, '/api/bien')
 api.add_resource(BienApi, '/api/biens/<id>')
 api.add_resource(BienCondApi, '/api/biens/ville/<ville>')
 api.add_resource(BienCondTypeApi, '/api/biens/type/<type_bien>')
 api.add_resource(BienCondPiecesApi, '/api/biens/pieces/<pieces>')
 api.add_resource(UsersApi, '/api/user')
 api.add_resource(UserApi, '/api/users/<id>')
 api.add_resource(SignupApi, '/api/auth/signup')
 api.add_resource(LoginApi, '/api/auth/login')