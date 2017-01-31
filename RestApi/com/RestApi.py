import requests
from flask import Flask,request,jsonify
from flask_cors import CORS
import json
import pandas as pd
from pandas.io.json import json_normalize

from hello import hellofunction


server_ip = "127.0.0.1"#configJson["server_ip"]
server_port = "8008"#configJson["server_port"]

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'E:/MercerProject/Final_UI_Template-13-01-17/uploadFiles'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'xls'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/hello', methods=['POST'])  
def getAnswer():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_csv('output.csv')
    resp = hellofunction()
    return json.dumps({"key":resp})

@app.route('/summaryDataChanged', methods=['POST'])	
def getSummary():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})

@app.route('/uploadFiles', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        #print (request.data)
        print (request)
        if 'file' not in request.files:
            print ('no file part')
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            print('No selected file')
        if file and allowed_file(file.filename):
            filename = file.filename
            file.save(app.config['UPLOAD_FOLDER'], filename)
    


	
@app.route('/result')
def index():
    print ("Result is called ===>")
    df1 = pd.read_excel('temp.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(results=list)


if __name__ == '__main__':
    print ("http://"+server_ip+":"+server_port+" is start running successfully")
    app.run(host=server_ip, port=server_port)
    