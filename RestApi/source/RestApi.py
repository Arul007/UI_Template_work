# -*- coding: utf-8 -*-
from flask import Flask,request,jsonify
from flask_cors import CORS
import os
import json
import pandas as pd
from pandas.io.json import json_normalize
from hello import hellofunction


server_ip = "127.0.0.1"#configJson["server_ip"]
server_port = "8008"#configJson["server_port"]

app = Flask(__name__)
CORS(app)

# This is the path to the upload directory
#UPLOAD_FOLDER = 'C:\\Users\\am249702\\Desktop\\uploadfiles'
app.config['UPLOAD_FOLDER'] = 'C:\\Users\\am249702\\Desktop\\uploadfiles'
# These are the extension that we are accepting to be uploaded
#app.config['ALLOWED_EXTENSIONS'] = set(['csv', 'xlsx','xls'])

# For a given file, return whether it's an allowed type or not
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

#data from dataload page
@app.route('/hello', methods=['POST'])
def getAnswer():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_csv('output.csv')
    resp = hellofunction()
    return json.dumps({"key":resp})

# Data from summary page
@app.route('/summaryDataChanged', methods=['POST'])
def getSummary():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})

# Data from AuditTrail page
@app.route('/summary2DataChanged', methods=['POST'])
def getSummary2():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})

# Data from Feilds page
@app.route('/feildsDataChanged', methods=['POST'])
def getFeilds():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})

# Data from match page
@app.route('/matchDataChanged', methods=['POST'])
def getmatch():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})

# Data going to summary page
@app.route('/summary')
def summary():
    print ("Result is called ===>")
    df1 = pd.read_excel('summary.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(results=list)

# Data going to AuditTrail page
@app.route('/summary2')
def summary2():
    print ("Result is called ===>")
    df1 = pd.read_excel('summary2.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(list)

# Data going to feilds page
@app.route('/feilds')
def feilds():
    print ("Result is called ===>")
    df1 = pd.read_excel('feilds.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(list)

# Route that will process the file upload
@app.route('/upload', methods=['GET','POST'])
def upload():
    print("Into the file upload function")
    # Get the name of the uploaded files
    print ("\n Request object =====> \n")
    print (request)
    print ("\n Requested Files ====> \n")
    print(request.files)

    #print (request.FILES.getlist('file'))
    uploaded_files = []
    uploaded_files = request.files

   # print (request.files)
    #uploaded_files = request.json;
    print ("\n uploaded_files ===> \n")
    print(uploaded_files)
    #filenames = []
    print("\n Before for loop \n ")
    fileObj = []
    for file in uploaded_files:

        fileObj.append(uploaded_files[file])

        #print (uploaded_files[file])
        print (fileObj)
    print("End of for loop")
    for file in fileObj:
        print (file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    print("\n End of second for loop \n")

    return json.dumps({"responsedata":"success"})


# Data going to feilds page
@app.route('/match')
def match():
    print ("Result is called ===>")
    df1 = pd.read_excel('match.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(list)
	
# Data going to consistency page
@app.route('/consistency')
def consistency():
    print ("Result is called ===>") 
    df1 = pd.read_excel('consistency.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(list)

# Data going to consistency page for below table
@app.route('/consistencydata')
def consistencydata():
    print ("Result is called ===>") 
    df1 = pd.read_excel('consistencydata.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(list)

# Data going to tranches page
@app.route('/tranches')
def tranches():
     print ("Result is called ===>") 
     df1 = pd.read_excel('tranches.xlsx')
     temp_json = df1.to_json(orient='records')
     json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
     list = json_df
     return jsonify(list)
	 
# Data going to derivation page
@app.route('/derivation')
def derivation():
     print ("Result is called ===>") 
     df1 = pd.read_excel('derivation.xlsx')
     temp_json = df1.to_json(orient='records')
     json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
     list = json_df
     return jsonify(list)
	 
	 
if __name__ == '__main__':
    print ("http://"+server_ip+":"+server_port+" is start running successfully")
    app.run(host=server_ip, port=server_port)
