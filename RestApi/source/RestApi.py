# -*- coding: utf-8 -*-
from flask import Flask,request,jsonify
from flask_cors import CORS
import os,sys
import json
import pandas as pd
from pandas.io.json import json_normalize
from hello import hellofunction


server_ip = "0.0.0.0"#configJson["server_ip"]
server_port = "8008"#configJson["server_port"]

app = Flask(__name__)
CORS(app)

# For a given file, return whether it's an allowed type or not
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

# **************** Global variables declairation *************
schemeName =""
schemeCate="" 		   
Doersneedexcel=""

# **************** index page function START *************

      # Data going to Home page table From excel
@app.route('/homepagecheck')
def homepagecheck():
    print ("Home Page Check is called ===>")
    df1 = pd.read_excel('uploadFiles/HomePageStatusCheck.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)
    list = json_df
    return jsonify(list)
	
# **************** dataload page function START *************

      #Scheme details update by doer
@app.route('/hello', methods=['POST'])
def getAnswer():
    requestObj = request.json
    print("Val - ",requestObj)
    
    global schemeName
    schemeName = requestObj["schemeName"]
    print ("Scheme Name ====> "+ schemeName)
    
    global schemeCate 
    schemeCate = requestObj["schemeCate"]
    print ("Scheme Category ====> "+schemeCate)
    
    df = json_normalize(requestObj)
    df.to_csv('output.csv')
    resp = hellofunction()
    return json.dumps({"key":resp}) 
	
		# file uploaded by Doer 
@app.route('/upload', methods=['GET','POST'])
def upload():
    print("Into the file upload function")
    # Get the name of the uploaded files
    print ("\n Request object =====> \n")
    print (request)
    print ("\n Requested Files ====> \n")
    print(request.files)

    print("creating the folder")
    os.mkdir( './uploads/'+schemeName, 0755 );

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
        file.save(os.path.join('./uploads/'+schemeName, file.filename))
    print("\n End of second for loop \n")

    return json.dumps({"responsedata":"success"})	
	
# **************** summary page function START *************	

       # Data updated by Doer 
@app.route('/summaryDataChanged', methods=['POST'])
def getSummary():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})
		

		# Data going to summary page from Excel
@app.route('/summary')
def summary():
    print ("Result is called ===>")
    df1 = pd.read_excel('Realdata/UI-7.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)
    list = json_df
    return jsonify(results=list)
	
# **************** AuditTrail page function START *************	

		# Data updated by Doer
@app.route('/AuditTrailDataChanged', methods=['POST'])
def getAuditTrail():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})
	
		# Data going to AuditTrail page From Excel
@app.route('/audit')
def auditTrail():
    print ("Result is called ===>")
    df1 = pd.read_excel('uploadFiles/summary2.xlsx')
    tempaudir_json = df1.to_json(orient='records')
    json_df = json.loads(tempaudir_json)
    list = json_df
    return jsonify(list)	
	
	
# **************** Feild page function START *************		

		# Data updated by Doer
@app.route('/feildsDataChanged', methods=['POST'])
def getFeilds():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})
	
		# Data going to feilds page From Excel
@app.route('/feilddata')
def feild():
    print ("Result is called For Feild page ===>")
    df1 = pd.read_excel('uploadFiles/feildpage.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)
    list = json_df
    return jsonify(list)	
	
	
# **************** match page function START *************

		# Data updated by Doer
@app.route('/matchDataChanged', methods=['POST'])
def getmatch():
    val = request.json
    print("Val - ",val)
    df = json_normalize(val)
    df.to_excel('summaryDataChanged.xlsx')
    resp = hellofunction()
    return json.dumps({"key":resp})
	
		# Data going to match page From Excel
@app.route('/match')
def match():
    print ("Result is called ===>")
    df1 = pd.read_excel('Realdata/UI-10.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(list)	
	
# **************** consistency page function START *************	

	# Data from consistency page Doer's call flag to display respective excel Data  
@app.route('/consist', methods=['POST'])
def consist():
    requestObj = request.json
    print("Val - ",requestObj)    
    global Doersneedexcel
    Doersneedexcel = requestObj["Doersneedexcel"]
    print ("Doersneedexcel ====> "+ Doersneedexcel)
    return json.dumps({"key":"success"}) 
		
	# Data going to consistency page uper table From Excel 
@app.route('/consistency')
def consistency():
    print ("Result is called ===>") 
    df1 = pd.read_excel('uploadFiles/consistency.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(list)

	# Data going to consistency page for below table From Excel
@app.route('/consistencydata')
def consistencydata():
    print ("Result is called ===>" +Doersneedexcel) 
    df1 = pd.read_excel('uploadFiles/'+Doersneedexcel+'.xlsx')
    temp_json = df1.to_json(orient='records')
    json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
    list = json_df
    return jsonify(list)
	
	
# **************** pension page function START *************	

	# Data going to Pension page From Excel
@app.route('/SumOftranches')
def SumOftranches():
     print ("Result is called ===>") 
     df1 = pd.read_excel('uploadFiles/SumOftranches.xlsx')
     temp_json = df1.to_json(orient='records')
     json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
     list = json_df
     return jsonify(list)
	 
# **************** Tranches page function START *************	
 
	# Data going to tranches page From Excel
@app.route('/tranches')
def tranches():
     print ("Result is called ===>") 
     df1 = pd.read_excel('uploadFiles/tranches.xlsx')
     temp_json = df1.to_json(orient='records')
     json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
     list = json_df
     return jsonify(list)
	 
	 
# **************** derivation page function START *************	 

		# Data going to derivation page From Excel
@app.route('/derivation')
def derivation():
     print ("Result is called ===>") 
     df1 = pd.read_excel('uploadFiles/derivation.xlsx')
     temp_json = df1.to_json(orient='records')
     json_df = json.loads(temp_json)

    # with open('df1.json', 'w') as outfile:
    #     json.dump(json_df, outfile)
     list = json_df
     return jsonify(list)
	 
		# Data updated excel for index table from derivation call API
@app.route('/homepagestatusupdate', methods=['GET','POST'])
def homepagestatusupdate():
    sn = schemeName
    sc = schemeCate
    print("\nSchemeName ==> "+schemeName+" SchemeCategory ===> "+schemeCate)
    print("\n ===== homepagestatusupdate called =====")
    print("\nSchemeName ==> "+sn +"\nSchemeCategory ==> "+sc)
    
    print ("<=== Reading HomePageStatusCheck.xlsx ===>")
    if sn !="" and sc !="":
        list = [[sn,sc,"yes","yes","yes"]]
        print("=== List created ===")
        print (list)

        df1 = pd.read_excel('uploadFiles/HomePageStatusCheck.xlsx')
        print ("Before inserting list")
        print (df1)
        df1 = df1.append(pd.DataFrame(list,columns=['SchemeName','SchemeCategory','ReportStatus','ReconcilationStatus','OutputStatus']),ignore_index=True)
        #df1.append([row],ignore_index=True)
        print (" === Data Frame 1 after inserting list ===")
        print (df1)
        df1.to_excel('./uploadFiles/HomePageStatusCheck.xlsx')    
    return json.dumps({"key":"success"}) 	 
	 
	 
if __name__ == '__main__':
    print ("http://"+server_ip+":"+server_port+" is start running successfully")
    app.run(host=server_ip, port=server_port,threaded=True)