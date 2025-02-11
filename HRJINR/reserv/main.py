from flask import Flask, jsonify, request, render_template, make_response
import MySQLdb
import json

def dbGetMeet():
    db = MySQLdb.connect(user="test_gis", passwd="_sidetao_", host="lt-svr230.jinr.ru", db="new_db")
    cursor = db.cursor()

    sql1 = "SELECT mt.id_meet, mt.id_room from meet mt"
    cursor.execute(sql1)
    meet_data =[]
    dbData = cursor.fetchall()
    db.close()

    for i in dbData:
        print("i ", i)
        new_item = {"id_meet":i[0],
                    "id_room":i[1]}
        meet_data.append(new_item)
    
    print('meet_data: ', meet_data)
    return meet_data

def dbGetTask():
    db = MySQLdb.connect(user="test_gis", passwd="_sidetao_", host="lt-svr230.jinr.ru", db="new_db")
    cursor = db.cursor()

    sql1 = "SELECT tk.id_task, tk.name_task, tk.id_meet, tk.done, tk.description, tm.data_start, tm.data_end, tm.time_start, tm.time_end, tm.all_day " \
       "from task tk, time tm " \
       "where tk.id_task=tm.id_task"
    cursor.execute(sql1)
    task_data =[]
    dbData = cursor.fetchall()
    db.close()

    for i in dbData:
        print("GET DATA i ", i)
        new_item = {"id":i[0],
                    "title":i[1],
                    "idMeet":i[2],
                    "done":i[3],
                    "desc":str(i[4]),
                    "date":str(i[5]),
                    "end":str(i[6]),
                    "time":str(i[7]),
                    "timeEnd":str(i[8]),
                    "allDay":str(i[9])}
        task_data.append(new_item)
        print("task_item ", new_item)
    
    print('task_data: ', task_data)
    return task_data

def dbdeleteTask():
    db = MySQLdb.connect(user="test_gis", passwd="_sidetao_", host="lt-svr230.jinr.ru", db="new_db")
    cursor = db.cursor()

    sql2 = "DELETE from time"
    cursor.execute(sql2)

    sql1 = "DELETE from task"
    cursor.execute(sql1)
    db.commit()
    # dbData = cursor.fetchall()
    db.close()

def dbSaveTask(data):
    db = MySQLdb.connect(user="test_gis", passwd="_sidetao_", host="lt-svr230.jinr.ru", db="new_db")
    cursor = db.cursor()
    data = json.loads(data)
    print("data ", data)
    for i in data:

        print("data ", f"'{i['id']}', '{i['title']}', {i['idMeet']}, '{str(i['done'])}', '{i['desc']}'" )
        print("i: ", i)

        # sql1 = f"INSERT INTO task(id_task, name_task, id_meet, done, description) VALUES ('{i['id']}', '{i['title']}', {i['idMeet']}, '{str(i['done'])}', '{i['desc']}')"
        # cursor.execute(sql1)

        sql1 = f"INSERT INTO task(id_task, name_task, id_meet, done, description) VALUES ('{i['id']}', '{i['title']}', '{(i['idMeet'])}', '{i['done']}', '{i['desc']}')"
        cursor.execute(sql1)
        print("execute 1 done")

        sql2 = f"INSERT INTO time(id_task, time_start, time_end, data_start, data_end, all_day) VALUES ('{i['id']}', '{i['time']}', '{i['timeEnd']}', '{i['date']}', '{i['end']}', '{i['allDay']}')"
        cursor.execute(sql2)
    
    db.commit()
    db.close()

app = Flask(__name__)


@app.route('/getData', methods=["GET"])
def getData():
    # if request.method == 'POST':
    #     print("you are in POST")
    #     jsonData = request.get_json()
    #     print(jsonData)
    #     return 'OK', 200
    # else:
    dictor = dbGetTask()
    print("get request dictor: ", dictor)
    resptxt= "".join(str(dictor))
    resptxt_ok = resptxt.replace('\'','\"')

    resp = make_response(resptxt_ok, 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/saveData', methods=["GET"])
def saveData():
    dbdeleteTask()

    dictor = []
    for i in request.args:
        print("i- ", i)
        print("request.args[i] ", request.args[i])
        dictor = request.args[i]
    dbSaveTask(dictor)
    print("you are in POST")
    print("dictor " , dictor)
    # jsonData = request.get_json()
    # print(jsonData)
    res = [{"message":"JSON received"}]

    resptxt= "".join(str(res))
    resptxt_ok = resptxt.replace('\'','\"')
        
    resp = make_response(resptxt_ok, 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/getMeet', methods=["GET"])
def getMeet():
   

    meet_data = dbGetMeet()

    print("get request dictor: ", meet_data)
    resptxt= "".join(str(meet_data))
    resptxt_ok = resptxt.replace('\'','\"')

    resp = make_response(resptxt_ok, 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp


      



if __name__ == "__main__":
    app.run(debug=True, port=5000)