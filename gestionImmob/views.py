from flask import Flask
from gestionImmob.database.db import initialize_db
from flask_restful import Api
from gestionImmob.routes import initialize_routes


app = Flask(__name__)
api = Api(app)

app.config['MONGODB_SETTINGS'] = {
'host': 'mongodb://localhost/gestion-immob'
}

initialize_db(app)

initialize_routes(api)

app.run()





"""
from flask import Flask
from gestionImmob.database.db import initialize_db
from gestionImmob.gestionImmob import movies

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/movie-bag'
}

initialize_db(app)

app.register_blueprint(movies)

app.run()




#if __name__ == "__main__":
 #   app.run() 

 """