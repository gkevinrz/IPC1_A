from flask import Flask,request,jsonify
from flask_cors import CORS


app=Flask(__name__)
app.config["DEBUG"]=True


CORS(app)

@app.route('/',methods=['GET'])
def home():
    return 'Probandop'


#INICIAR SERVIDOR

if __name__=="__main__":
    app.run(host="0.0.0.0",debug=True)


