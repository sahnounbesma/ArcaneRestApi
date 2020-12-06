class InternalServerError(Exception):
    pass

class SchemaValidationError(Exception):
    pass

class BienAlreadyExistsError(Exception):
    pass

class UpdatingBienError(Exception):
    pass

class DeletingBienError(Exception):
    pass

class BienNotExistsError(Exception):
    pass

class PseudoAlreadyExistsError(Exception):
    pass

class UnauthorizedError(Exception):
    pass

errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
     "SchemaValidationError": {
         "message": "Request is missing required fields",
         "status": 400
     },
     "BienAlreadyExistsError": {
         "message": "Bien with given name already exists",
         "status": 400
     },
     "UpdatingBienError": {
         "message": "Updating bien added by other is forbidden",
         "status": 403
     },
     "DeletingBienError": {
         "message": "Deleting bien added by other is forbidden",
         "status": 403
     },
     "BienNotExistsError": {
         "message": "Bien with given id doesn't exists",
         "status": 400
     },
     "PseudoAlreadyExistsError": {
         "message": "User with given pseudo already exists",
         "status": 400
     },
     "UnauthorizedError": {
         "message": "Invalid username or password",
         "status": 401
     }
}