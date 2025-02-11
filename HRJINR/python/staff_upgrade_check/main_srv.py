import math
import sqlite3
import sys
import traceback
import xmlrpc.client

import pymysql
import base64
pymysql.install_as_MySQLdb()
import MySQLdb
import cv2
import numpy as np
# This is a sample Python script.
import json, ast
import random
import threading
from flask import request
from flask import abort
from flask import Flask
from flask import make_response
from flask import jsonify
#import erma

# Open database connection
#db = MySQLdb.connect(user="hrlhep",passwd="_t2El2jyK3wWv_",host="159.93.33.213",db="hrlhep")
# prepare a cursor object using cursor() method
#cursor = db.cursor()
# execute SQL query using execute() method.
#cursor.execute("SELECT VERSION()")
# Fetch a single row using fetchone() method.
#data = cursor.fetchone()
#print ("Database version : %s " % data)
#cursor.execute("SELECT * from buildings")
# Fetch a single row using fetchone() method.
#data = cursor.fetchall()
#for row in data :
#    print(row)
#db.close()
# disconnect from server

# db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
# sql = "SELECT building_id, floor_num, json from buildings where obj_type = 'rooms'"
# cursor = db.cursor()
# cursor.execute(sql)
# data = cursor.fetchall()
# for i in data:
#     b_id = int(i[0])
#     fl_num = int(i[1])
#     print(b_id, fl_num)
#     try:
#         check = json.loads(i[2])
#         if type(check) == list and len(check) > 0:
#             for j in range(len(check)):
#                 if type(check[j]) == dict and 'description' in list(check[j]['properties'].keys()) and len(check[j]['properties']['description']) > 0:
#                     print(b_id, fl_num)
#                     dic = check[j]
#                     coord = dic['geometry']['coordinates']
#                     print(dic['properties'])
#                     print(coord)
#                     name = dic['properties']['description'][0]['field2']
#                     type_r = dic['properties']['description'][1]['field2']
#                     otd = dic['properties']['description'][2]['field2']
#
#                     sql = "INSERT floors_info (building_id, floor_num, room_num, room_type, otd, coord) VALUES('" + str(b_id) + "', '" + str(fl_num) + "', '" + str(name) + "', '" + str(type_r) + "', '" + str(otd)  + "', '" + str(coord) + "')"
#                     cursor.execute(sql)
#                     db.commit()
#
#     except json.decoder.JSONDecodeError:
#         pass
# db.close()

# db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
# sql = "SELECT id, map_object_type from map_lhep where o_type = '2' and div_owner = '' and not map_object_type = 'b_other' and not map_object_type = 'b_admin'"
# cursor = db.cursor()
# cursor.execute(sql)
# data = cursor.fetchall()
# for i in data:
#     id = i[0]
#     div_own = i[1][2:]
#     sql = "UPDATE map_lhep SET div_owner = '" + str(div_own) + "' WHERE id = '" + str(id) + "'"
#     cursor.execute(sql)
#     db.commit()
# db.close()

# db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
# sql = "SELECT building, room from accommodation_v2 where room_id = '-1'"
# cursor = db.cursor()
# cursor.execute(sql)
# data = cursor.fetchall()
# for i in data:
#     b_id = i[0]
#     room = i[1]
#     if b_id != '' and room != '':
#         sqlid = "SELECT id FROM floors_info WHERE building_id = '" + str(b_id) + "' AND room_num ='" + str(room) + "'"
#         print(sqlid)
#         cursor.execute(sqlid)
#         dataid = cursor.fetchall()
#         print(dataid)
#         if len(dataid) > 0:
#             id = dataid[0][0]
#
#             sql = "UPDATE accommodation_v2 SET room_id = '" + str(id) + "' WHERE building = '" + str(b_id) + "' AND room = '" + str(room) + "'"
#
#             cursor.execute(sql)
#             db.commit()
# db.close()

def ray_tracing_method(x,y,poly):
    n = len(poly)
    inside = False

    p1x,p1y = poly[0]
    for i in range(n+1):
        p2x,p2y = poly[i % n]
        if y > min(p1y,p2y):
            if y <= max(p1y,p2y):
                if x <= max(p1x,p2x):
                    if p1y != p2y:
                        xints = (y-p1y)*(p2x-p1x)/(p2y-p1y)+p1x
                    if p1x == p2x or x <= xints:
                        inside = not inside
        p1x,p1y = p2x,p2y

    return inside

# db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
# sql = "SELECT coord, id from floors_info"
# cursor = db.cursor()
# cursor.execute(sql)
# data = cursor.fetchall()
# for i in data:
#     coord = json.loads(i[0])
#     print(coord)
#     minx = 1000000000000
#     maxx = -100000000000
#     miny = 1000000000000
#     maxy = -100000000000
#     for j in coord:
#         minx = min(j[0], minx)
#         maxx = max(j[0], maxx)
#         miny = min(j[1], miny)
#         maxy = max(j[1], maxy)
#     print([minx, miny], [maxx, maxy])
#     area = (maxy - miny) * (maxx - minx)
#     print(area)
#     cntIn = 0
#     cntOut = 0
#     num = 10000
#     for j in range(num):
#         rand_point_x = random.uniform(minx, maxx)
#         rand_point_y = random.uniform(miny, maxy)
#         if ray_tracing_method(rand_point_x, rand_point_y, coord):
#             cntIn += 1
#         else:
#             cntOut += 1
#     print(cntIn, cntOut)
#     perc = cntIn / num
#     area_real = area * perc
#     print(area_real)
#     id = i[1]
#     sql = "UPDATE floors_info SET sqr_real = '" + str(area_real) + "' WHERE id = '" + str(id) + "'"
#     cursor.execute(sql)
#     db.commit()
#
# db.close()

#к134 - 4635
# db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
# cursor = db.cursor()
# sql = "SELECT id, room_num from floors_info where building_id = '4635'"
# cursor.execute(sql)
# data = cursor.fetchall()
# print(data)
# for i in data:
#     room_id = i[0]
#     room_name = i[1]
#     sql = "UPDATE accommodation_v2 SET room_id = '" + str(room_id) + "' WHERE room = '" + str(room_name) + "' and building = '4635'"
#     cursor.execute(sql)
#     db.commit()
# db.close()

def fillRooms(data):
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    cursor = db.cursor()
    print(data)
    for i in data:
        fl_num = i["geometry"]["floor"]
        coord = i["geometry"]["coordinates"]
        prop = i["properties"]
        b_id = prop["buildingId"]
        name = prop["name"]
        room_type = prop["idRoomCategory"]
        otd = prop["idDepartment"]
        square = prop["square"]

        minx = 1000000000000
        maxx = -100000000000
        miny = 1000000000000
        maxy = -100000000000
        for j in coord:
            minx = min(j[0], minx)
            maxx = max(j[0], maxx)
            miny = min(j[1], miny)
            maxy = max(j[1], maxy)
        print([minx, miny], [maxx, maxy])
        area = (maxy - miny) * (maxx - minx)
        print(area)
        cntIn = 0
        cntOut = 0
        num = 10000
        for j in range(num):
            rand_point_x = random.uniform(minx, maxx)
            rand_point_y = random.uniform(miny, maxy)
            if ray_tracing_method(rand_point_x, rand_point_y, coord):
                cntIn += 1
            else:
                cntOut += 1
        print(cntIn, cntOut)
        perc = cntIn / num
        area_real = area * perc

        print(square, type(b_id), type(fl_num), type(square), type(name), type(room_type), type(otd), type(area_real))
        print(square)

        sql = "INSERT floors_info (building_id, floor_num, room_sqr, room_num, room_type, otd, coord, sqr_real) " \
              "VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"

        if ',' in square:
            ind = square.index(',')
            print(ind, '------------')
        else: ind = -1

        if ind != -1:
            square_1 = square[:ind]
        else:
            square_1 = square

        if square_1 == '':
            square_1 = '0'

        print(ind)
        print(square_1)

        cursor.execute(sql, (b_id, str(fl_num), square_1, name, room_type, otd, str(coord), str(area_real)))
        db.commit()

    db.close()

#fillRooms(erma.lit["layers"]["Rooms"]["layerRaws"])

def get_record(obj_type, floor_num, building_id):
    sql1="SELECT json from buildings where obj_type='"+obj_type +"' and building_id = '" + building_id + "' and floor_num = '" + floor_num + "'"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    #print(str(data) + ' ' + str(data[0][0]))
    if len(data)>0:
        data = data[0][0]
    else:
        data = {}
    print(str(data))
    return str(data)

def get_user_record(obj_type, floor_num, building_id, jinr_id):
    sql1="SELECT json from buildings_users where obj_type='"+obj_type +"' and building_id = '" + building_id + \
         "' and floor_num = '" + floor_num + "' and jinr_id = '" + jinr_id + "'"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    #print(str(data) + ' ' + str(data[0][0]))
    if len(data)>0:
        data = data[0][0]
    else:
        data = {}
    print(str(data))
    return str(data)

def save_record(obj_type, floor_num, building_id, json):
    sqldel = "delete from  buildings where building_id='" + building_id +"' and obj_type='"+ obj_type +"' and floor_num='" + floor_num + "'"
    sqlins = "insert buildings (building_id,obj_type, floor_num, json) values('" + building_id + "', '" + obj_type + "', '" + floor_num + "', '" + json + "')"
    print(sqldel + sqlins)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sqldel)
    cursor.execute(sqlins)
    db.commit()
    db.close()
    return sqlins

def save_user_record(obj_type, floor_num, building_id, json, jinr_id):
    sqldel = "delete from  buildings_users where building_id='" + building_id +"' and obj_type='"+ obj_type + \
             "' and floor_num='" + floor_num + "' and jinr_id ='" + jinr_id + "'"
    sqlins = "insert buildings_users (building_id,obj_type, floor_num, json, jinr_id) values" \
             "('" + building_id + "', '" + obj_type + "', '" + floor_num + "', '" + json + "', '" + jinr_id + "')"
    print(sqldel + sqlins)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sqldel)
    cursor.execute(sqlins)
    db.commit()
    db.close()
    return sqlins


def get_file(obj_type, floor_num, building_id):
    sql1="SELECT image from buildings where obj_type='"+obj_type +"' and building_id = '" + building_id + "' and floor_num = '" + floor_num + "'"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    #print(str(data) + ' ' + str(data[0][0]))
    if len(data)>0:
        data = data[0][0]
    else:
        data = {}
    print(str(data))
    return str(data)

def save_file(obj_type, floor_num, building_id, js_data, img):
    print('save_file 1')
    sqldel = "delete from  buildings where building_id='" + building_id +"' and obj_type='"+ obj_type +"' and floor_num='" + floor_num + "'"
    print('save_file 2')
    sqlins1 = "set global max_allowed_packet=2000000000;"
    sqlins =   "insert buildings (building_id,obj_type, floor_num, json, image) values(%s, %s, %s, %s, %s)"
    print('save_file 3')
    print(sqldel)
    print(sqlins)
    binary = base64.b64encode(img)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sqldel)
    cursor.execute(sqlins, (building_id, obj_type, floor_num, js_data, binary))
    db.commit()
    db.close()
    print('save_file ok')
    return sqlins

def save_file_server(building_id, filename, file, comment):
    print('save_file 1')
    sqlins1 = "set global max_allowed_packet=2000000000;"
    sqlins =   "insert building_docs (build_id, file_name, file, comments) values(%s, %s, %s, %s)"
    print('save_file 2')
    print(sqlins)
    binary = base64.b64encode(file)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sqlins, (building_id, filename, binary, comment))
    db.commit()
    db.close()
    print('save_file ok')
    return sqlins

def get_building_files(build_id):
    sql1="SELECT id, file_name, comments from building_docs where build_id = '" + str(build_id) + "'"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    print(len(data))
    rez_json = []
    for i in range(len(data)):
        rez_json.append({'doc_id': data[i][0], 'file_name': data[i][1], 'comment': data[i][2]})
    print(rez_json)
    if len(data)>0:
        data = data[0][0]
    else:
        data = ''
    print(str(data))
    rez_str = json.dumps(rez_json)
    return rez_str

def delete_file(doc_id):
    sqldel = "DELETE from building_docs where id = '" + str(doc_id) + "'"
    print(sqldel)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sqldel)
    print("delete complete")
    db.commit()
    db.close()

    return sqldel

def upd_file(doc_id, new_comm):
    sqlupd = "UPDATE building_docs set comments = '" + str(new_comm) + "' where id = '" + str(doc_id) + "'"
    print(sqlupd)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sqlupd)
    print("update complete")
    db.commit()
    db.close()

    return sqlupd


def createNewRoom(room_info, b_id, fl_num):
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    cursor = db.cursor()

    coord = room_info['geometry']['coordinates']
    if 'description' in list(room_info['properties'].keys()):
        if len(room_info['properties']['description']) > 0:
            name = room_info['properties']['description'][0]['field2']
            type_r = room_info['properties']['description'][1]['field2']
            otd = room_info['properties']['description'][2]['field2']
    else:
        name = room_info['properties']['name']
        type_r = '0'
        otd = '0'

    r_size = room_info['properties']['room_size']

    coordins = coord
    minx = 1000000000000
    maxx = -100000000000
    miny = 1000000000000
    maxy = -100000000000
    for j in coordins:
        minx = min(j[0], minx)
        maxx = max(j[0], maxx)
        miny = min(j[1], miny)
        maxy = max(j[1], maxy)
    # print([minx, miny], [maxx, maxy])
    area = (maxy - miny) * (maxx - minx)
    # print(area)
    cntIn = 0
    cntOut = 0
    num = 10000
    for j in range(num):
        rand_point_x = random.uniform(minx, maxx)
        rand_point_y = random.uniform(miny, maxy)
        if ray_tracing_method(rand_point_x, rand_point_y, coordins):
            cntIn += 1
        else:
            cntOut += 1
    perc = cntIn / num
    area_real = area * perc

    sql = "INSERT floors_info (building_id, floor_num, room_num, room_type, otd, room_size, coord, sqr_real) VALUES " \
          "(%s, %s, %s, %s. %s, %s, %s, %s)"

    cursor.execute(sql, (str(b_id), fl_num, name, type_r, otd, r_size, coord, area_real))
    db.commit()

    sql = "SELECT id from floors_info WHERE building_id = '" + str(b_id) + "' and floor_num = '" + str(fl_num) + "' and room_num = '" + str(name) + "'"
    cursor.execute(sql)
    data = cursor.fetchall

    id = data[0][0]
    return id


def get_building_list():
    sql1="SELECT tooltip, id from map_lhep where o_type = 2 ORDER BY tooltip"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    print(len(data))
    rez_str = "<select id=select_get_building_id onChange=buildingChange()><option value =''> '-' </option>"
    for i in range(len(data)):
        if str(data[i][0]) != "":
            rez_str += "<option value =" + str(data[i][1]) + ">" + str(data[i][0]) + "</option>"
    rez_str += "</select>"
    print(rez_str)
    print(str(data) + ' ' + str(data[0][0]))
    if len(data)>0:
        data = data[0][0]
    else:
        data = ''
    print(str(data))
    return rez_str
#get_building_list()

def get_building_list_divOwner(div_own):
    sql1="SELECT shortname, id from map_lhep where o_type = 2 and div_owner = '" + str(div_own) + "' ORDER BY shortname"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    print(len(data))
    rez_str = "<select id='select_get_building_own_id' name='building_owner'>"
    rez_str += "<option value =''></option>"
    for i in range(len(data)):
        if str(data[i][0]) != "":
            rez_str += "<option value ='" + str(data[i][1]) + "'>" + str(data[i][0]) + "</option>"
    rez_str += "</select>"
    print(div_own)
    print(rez_str)
    if len(data)>0:
        data = data[0][0]
    else:
        data = ''
    print(str(data))
    return rez_str
#get_building_list_divOwner('LHEP')

def get_building_list_divOwner_options(div_own):
    sql1="SELECT shortname, id from map_lhep where o_type = 2 and div_owner = '" + str(div_own) + "' ORDER BY shortname"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    print(len(data))
    rez_str = "<option value =''></option>"
    for i in range(len(data)):
        if str(data[i][0]) != "":
            rez_str += "<option value ='" + str(data[i][1]) + "'>" + str(data[i][0]) + "</option>"
    print(div_own)
    print(rez_str)
    if len(data)>0:
        data = data[0][0]
    else:
        data = ''
    print(str(data))
    return rez_str

def get_types_list():
    sql1="SELECT name, type from plan_objects ORDER BY type"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    print(len(data))
    rez_str = "<select id=select_get_types onChange=typeChange()>"
    for i in range(len(data)):
        if str(data[i][0]) != "":
            print(data[i])
            rez_str += "<option value =" + str(data[i][1]) + ">" + str(data[i][0]) + "</option>"
    rez_str += "</select>"
    print(rez_str)
    print(str(data) + ' ' + str(data[0][0]))
    if len(data)>0:
        data = data[0][0]
    else:
        data = ''
    print(str(data))
    return rez_str
#get_types_list()



def get_building_tbl(build):
    sql1="SELECT id, tooltip, map_object_type from map_lhep where o_type = 2 and obj_name like '" + build + "%' ORDER BY tooltip"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    print(len(data))
    rez_str = "<table class='nb__tabl-dop'><tr><th>Корпус</th><th>Лаборатория</th></tr><tbody>"
    for i in range(len(data)):
        if str(data[i][0]) != "":
            id = str(data[i][0]) + "T"
            rez_str += "<tr class=pt id=blink onclick=\"CenterAndClose(\'" + str(id)+ "T\')\"><td>" + str(data[i][1]) + \
                       "</td><td>" + str(data[i][2][2:]) + "</td></tr>"
    rez_str += "</tbody></table>"
    print(rez_str)
    print(str(data) + ' ' + str(data[0][0]))
    if len(data)>0:
        data = data[0][0]
    else:
        data = ''
    print(rez_str)
    return rez_str



def get_employes(letters):
    sql1 = "SELECT tab_n, FIO, division from sotrudniki where FIO LIKE '" + letters + "%' ORDER BY F, I, O and (datauvolen > current_date or datauvolen is null)"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    print(len(data))
    rez_str = ""
    for i in range(len(data)):
        if str(data[i][0]) != "":
            rez_str += "<option value =" + str(data[i][0]) + ">" + str(data[i][1]) + ", " + str(data[i][2]) + "</option>"
    print(rez_str)
    if len(data) > 0:
        data = data[0]
    else:
        data = ''
    print(str(data))
    return rez_str
#get_employes("Баг")

def get_comm(obj_type, obj_name):
    sql1 = "select json from plan_objects where type = '" + str(obj_type) + "' and name = '" + str(obj_name) + "'"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    print(len(data))
    if len(data) > 0:
        data = data[0][0]
    else:
        data = {}
    return str(data)

def get_buiding_inf(building_id):
    sql1="SELECT floor_num from buildings where building_id = '" + str(building_id) + "' and obj_type = 'rooms'"
    print(sql1)
    db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
    # prepare a cursor object using cursor() method
    cursor = db.cursor()
    cursor.execute(sql1)
    # Fetch a single row using fetchone() method.
    data = cursor.fetchall()
    db.close()
    arr_data = list(data)

    rez_json = {}
    layerRaws = []
    roomslist = {}
    layersList = {}

    for i in range(len(arr_data)):

        fl_num = data[i][0]
        sql1 = "SELECT json from buildings where building_id = '" + str(building_id) + "' and obj_type = 'rooms' and floor_num = '" + str(fl_num) + "'"
        print(sql1)
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        fl_data = cursor.fetchall()
        db.close()
        if len(fl_data) > 0:
            json_data = json.loads(fl_data[0][0])
            print("----------", fl_num, "---------")
            for i in range(len(json_data)):
                json_data[i]["geometry"]["floor"] = fl_num
                json_data[i]["properties"]["id"] = int(str(fl_num) + str(i))
                for j in range(len(json_data[i]["geometry"]["coordinates"])):
                    json_data[i]["geometry"]["coordinates"][j][0], json_data[i]["geometry"]["coordinates"][j][1] = \
                        round(json_data[i]["geometry"]["coordinates"][j][0]), round(json_data[i]["geometry"]["coordinates"][j][1])
                layerRaws.append(json_data[i])
                print(json_data[i])

        else:
            fl_data = ''
    roomslist["type"] = "Polygon"
    roomslist["count"] = len(layerRaws)
    roomslist["layerRaws"] = layerRaws
    layersList["Rooms"] = roomslist
    rez_json["layers"] = layersList
    str_json = str(rez_json).replace("\'", "\"")
    print(str_json)
    rezFile = open("rezults.txt", "w")
    rezFile.write(str(rez_json))
    rezFile.close()

    return str_json

#get_buiding_inf(259)



def change_mark_no_pic(obj_type_old, obj_name_old, obj_name_new, obj_comm):
    sqlupd = ""
    print(obj_comm)
    if obj_comm == "\"\"":
        print('no comm')
        sqlupd = "UPDATE plan_objects set name= '" + str(obj_name_new) + "' where type= '" + str(obj_type_old) + "' and name= '" + str(obj_name_old) + "'"
        print(sqlupd)
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        cursor.execute(sqlupd)
        db.commit()
        print('update complited')
        db.close()
    else:
        print('comm')
        sqlupd = "UPDATE plan_objects set name= '" + str(obj_name_new) + "', json= '" + str(obj_comm) + "' where type= '" + str(
            obj_type_old) + "' and name= '" + str(obj_name_old) + "'"
        print(sqlupd)
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        cursor.execute(sqlupd)
        db.commit()
        print('update complited')
        db.close()

    return sqlupd

def change_mark_with_pic(obj_type_old, obj_name_old, obj_name_new, obj_comm, sh_data, img):
    sqlins = ""
    print(sh_data['width'], sh_data['height'])
    if obj_comm == "\"\"":
        print("no comm")
        sqlsel = "select * from plan_objects where type= '" + str(obj_type_old) + "' and name = '" + str(obj_name_old) + "'"
        print('save_file 3')

        binary = base64.b64encode(img)
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        cursor.execute(sqlsel)
        data = cursor.fetchall()
        tags = data[0][4]
        comm = data[0][5]
        sx = data[0][6]
        sy = data[0][7]

        sqldel = "delete from plan_objects where type= '" + str(obj_type_old) + "' and name= '" + str(obj_name_old) + "'"
        sqlins = "insert plan_objects (name, type, image, tags, json, size_x, size_y) values(%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sqldel)
        cursor.execute(sqlins, (obj_name_new, obj_type_old, binary, tags, comm, sx, sy))
        db.commit()
        db.close()
        print('save_file ok')
    else:
        print("comm")
        sqlsel = "select * from plan_objects where type= '" + str(obj_type_old) + "' and name = '" + str(obj_name_old) + "'"
        print('save_file 3')

        binary = base64.b64encode(img)
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        cursor.execute(sqlsel)
        data = cursor.fetchall()
        tags = data[0][4]
        sx = data[0][6]
        sy = data[0][7]

        sqldel = "delete from plan_objects where type= '" + str(obj_type_old) + "' and name= '" + str(obj_name_old) + "'"
        sqlins = "insert plan_objects (name, type, image, tags, json, size_x, size_y) values(%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sqldel)
        cursor.execute(sqlins, (obj_name_new, obj_type_old, binary, tags, obj_comm, sx, sy))
        db.commit()
        db.close()
        print('save_file ok')

    return sqlins

def create_mark(obj_type, obj_name, obj_comm, sh_data, img):
    sqlins = ""
    print(sh_data['width'], sh_data['height'])
    if obj_comm == "\"\"":
        print("no comm")
        sqlins = "insert plan_objects (name, type, image, size_x, size_y) values (%s, %s, %s, %s, %s)"
        print('save_file 3')
        print(sqlins)
        binary = base64.b64encode(img)
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        cursor.execute(sqlins, (obj_name, obj_type, binary, str(sh_data['width']), str(sh_data['height'])))
        db.commit()
        db.close()
        print('save_file ok')
    else:
        print("comm")
        sqlins = "insert plan_objects (name, type, image, json, size_x, size_y) values (%s, %s, %s, %s, %s, %s)"
        print(sqlins)
        binary = base64.b64encode(img)
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        cursor.execute(sqlins, (obj_name, obj_type, binary, obj_comm, str(sh_data['width']), str(sh_data['height'])))
        db.commit()
        print('insert complited')
        db.close()

    return sqlins



def compareSegments(seg1, seg2, min_dlin):
    #используется уравнение прямой вида y=ax+b

    x11 = seg1[0][0]
    y11 = seg1[0][1]
    x12 = seg1[1][0]
    y12 = seg1[1][1]


    x11, x12 = round(x11, 10), round(x12, 10)
    y11, y12 = round(y11, 10), round(y12, 10)

    if x11 == x12:
        x11 += 0.00000000001
    if y11 == y12:
        y11 += 0.00000000001
    #seg1 - отрезок существующей сети

    x21 = seg2[0][0]
    y21 = seg2[0][1]
    x22 = seg2[1][0]
    y22 = seg2[1][1]

    x21, x22 = round(x21, 10), round(x22, 10)
    y21, y22 = round(y21, 10), round(y22, 10)

    if x21 == x22:
        x21 += 0.00000000001
    if y21 == y22:
        y21 += 0.00000000001
    #seg2 - отрезок прокладываемой сети

    circle_center = []

    a1 = (y11 - y12) / (x11 - x12)
    b1 = y12 - a1 * x12
    #y = a1 * x + b1

    a2 = (y21 - y22) / (x21 - x22)
    b2 = y22 - a2 * x22
    #y = a2 * x + b2

    xper = (b2 - b1) / (a1 - a2)
    yper = a1 * xper + b1
    # print(min(x11, x12), xper, max(x11, x12))
    # print(min(y11, y12), yper, max(y11, y12))
    # print(min(x11, x12) <= xper <= max(x11, x12))
    # print(min(x21, x22) <= xper <= max(x21, x22))
    # print(min(y11, y12) <= yper <= max(y11, y12))
    # print(min(y21, y22) <= yper <= max(y21, y22))
    # print(min(x21, x22), xper, max(x21, x22))
    # print(min(y21, y22), yper, max(y21, y22))
    # circle_center.append([xper, yper])
    xper = round(xper, 10)
    yper = round(yper, 10)
    if min(x11, x12) <= xper <= max(x11, x12) and min(x21, x22) <= xper <= max(x21, x22) and \
            min(y11, y12) <= yper <= max(y11, y12) and min(y21, y22) <= yper <= max(y21, y22):
        circle_center.append([xper, yper])

        print(seg1, seg2, 'peres', xper, yper)
    else:
        if a1 == -1 / a2:
            if min(x11, x12) <= xper <= max(x11, x12) and min(y11, y12) <= yper <= max(y11, y12): #принадлежит seg1
                rasst1 = ((x21 - xper) ** 2 + (y21 - yper) ** 2) ** 0.5 #от первой точки
                rasst2 = ((x22 - xper) ** 2 + (y22 - yper) ** 2) ** 0.5 #от второй точки
                rasst = min(rasst1, rasst2)
                if rasst <= min_dlin:
                    circle_center = [xper, yper]
            elif min(x21, x22) <= xper <= max(x21, x22) and min(y21, y22) <= yper <= max(y21, y22): #принадлежит seg2
                rasst1 = ((x11 - xper) ** 2 + (y11 - yper) ** 2) ** 0.5  # от первой точки
                rasst2 = ((x12 - xper) ** 2 + (y12 - yper) ** 2) ** 0.5  # от второй точки
                rasst = min(rasst1, rasst2)
                if rasst <= min_dlin:
                    if rasst == rasst1:
                        circle_center.append([x11, y11])
                    else:
                        circle_center.append([x12, y12])
            else:
                rasst11 = ((x11 - x21) ** 2 + (y11 - y21) ** 2) ** 0.5
                rasst12 = ((x11 - x22) ** 2 + (y11 - y22) ** 2) ** 0.5
                rasst21 = ((x12 - x21) ** 2 + (y12 - y21) ** 2) ** 0.5
                rasst22 = ((x12 - x22) ** 2 + (y12 - y21) ** 2) ** 0.5
                rasst = min(rasst11, rasst12, rasst21, rasst22)
                if rasst <= min_dlin:
                    if rasst == rasst11 or rasst == rasst12:
                        circle_center.append([x11, y11])
                    else:
                        circle_center.append([x12, y12])
        else:
            a3 = -1 / a1 #перпендикуляр к seg1
            #из первой точки seg2
            b31 = y21 - a3 * x21
            xper1 = (b31 - b1) / (a1 - a3)
            yper1 = a3 * xper1 + b31
            rasst1 = 1000000000000000000000
            if min(x11, x12) <= xper1 <= max(x11, x12) and min(y11, y12) <= yper1 <= max(y11, y12): #перпендикуляр падает на отрезок seg1
                r = ((x21 - xper1) ** 2 + (y21 - yper1) ** 2) ** 0.5
                rasst1 = min(rasst1, r)

            #из второй точки seg2
            b32 = y22 - a3 * x22
            xper2 = (b32 - b1) / (a1 - a3)
            yper2 = a3 * xper2 + b32
            rasst2 = 1000000000000000000000
            if min(x11, x12) <= xper2 <= max(x11, x12) and min(y11, y12) <= yper2 <= max(y11, y12): #перпендикуляр падает на отрезок seg1
                r = ((x22 - xper2) ** 2 + (y22 - yper2) ** 2) ** 0.5
                rasst2 = min(rasst2, r)

            a4 = -1 / a2  # перпендикуляр к seg2
            # из первой точки seg1
            b41 = y11 - a4 * x11
            xper3 = (b41 - b2) / (a2 - a4)
            yper3 = a4 * xper3 + b41
            rasst3 = 1000000000000000000000
            if min(x21, x22) <= xper3 <= max(x21, x22) and min(y21, y22) <= yper3 <= max(y21, y22):  # перпендикуляр падает на отрезок seg2
                r = ((x11 - xper3) ** 2 + (y11 - yper3) ** 2) ** 0.5
                rasst3 = min(rasst3, r)
            # из второй точки seg2
            b42 = y12 - a4 * x12
            xper4 = (b42 - b2) / (a2 - a4)
            yper4 = a4 * xper4 + b42
            rasst4 = 1000000000000000000000
            if min(x21, x22) <= xper4 <= max(x21, x22) and min(y21, y22) <= yper4 <= max(y21, y22):  # перпендикуляр падает на отрезок seg2
                r = ((x12 - xper4) ** 2 + (y12 - yper4) ** 2) ** 0.5
                rasst4 = min(rasst4, r)
            print('rassts', rasst1, rasst2, rasst3, rasst4)
            rasst = min(rasst1, rasst2, rasst3, rasst4)
            print('rez rasst', rasst)
            if rasst != 1000000000000000000000:
                if rasst <= min_dlin:
                    if rasst == rasst1 or rasst == rasst2:
                        if rasst == rasst1:
                            circle_center.append([xper1, yper1])
                        else:
                            circle_center.append([xper2, yper2])
                    elif rasst == rasst3:
                        circle_center.append([x11, y11])
                    else:
                        circle_center.append([x12, y12])
                    print('center', circle_center)
            else:
                rasst11 = ((x11 - x21) ** 2 + (y11 - y21) ** 2) ** 0.5
                rasst12 = ((x11 - x22) ** 2 + (y11 - y22) ** 2) ** 0.5
                rasst21 = ((x12 - x21) ** 2 + (y12 - y21) ** 2) ** 0.5
                rasst22 = ((x12 - x22) ** 2 + (y12 - y21) ** 2) ** 0.5
                print('rassts', rasst11, rasst22, rasst21, rasst22)
                rasst = min(rasst11, rasst12, rasst21, rasst22)
                print('rez rasst', rasst)
                if rasst <= min_dlin:
                    if rasst == rasst11 or rasst == rasst12:
                        circle_center.append([x11, y11])
                    else:
                        circle_center.append([x12, y12])

                    print('center', circle_center)

    return circle_center

def compareSegment_to_well(seg1, seg2, min_dlin):
    #используется уравнение прямой вида y=ax+b

    x_well = seg1[0]
    y_well = seg1[1]

    #seg1 - координаты колодца

    x21 = seg2[0][0]
    y21 = seg2[0][1]
    x22 = seg2[1][0]
    y22 = seg2[1][1]

    if x21 == x22:
        x21 += 0.00000000000001
    if y21 == y22:
        y21 += 0.00000000000001
    #seg2 - отрезок прокладываемой сети

    circle_center = []

    a2 = (y21 - y22) / (x21 - x22)
    b2 = y22 - a2 * x22
    #y = a2 * x + b2

    if min(x21, x22) <= x_well <= max(x21, x22) and min(y21, y22) <= y_well <= max(y21, y22):
        circle_center.append([x_well, y_well])
        #print(seg1, seg2, 'peres', xper, yper)
    else:
        a4 = -1 / a2  # перпендикуляр к seg2
        # из первой точки seg1
        b41 = y_well - a4 * x_well
        xper3 = (b41 - b2) / (a2 - a4)
        yper3 = a4 * xper3 + b41
        rasst3 = 1000000000000000000000
        if min(x21, x22) <= xper3 <= max(x21, x22) and min(y21, y22) <= yper3 <= max(y21, y22):  # перпендикуляр падает на отрезок seg2
            r = ((x_well - xper3) ** 2 + (y_well - yper3) ** 2) ** 0.5
            rasst3 = min(rasst3, r)

        print('rassts', rasst3)
        rasst = rasst3
        print('rez rasst', rasst)
        if rasst != 1000000000000000000000:
            if rasst <= min_dlin:
                circle_center.append([x_well, y_well])
                print('center', circle_center)

    return circle_center

def compareSegments3D(seg1, seg2, min_dlin):
    #seg1 - отрезок существующей сети
    #seg2 - отрезок прокладываемой сети
    x11 = seg1[0][0]
    y11 = seg1[0][1]
    z11 = seg1[0][2]
    x12 = seg1[1][0]
    y12 = seg1[1][1]
    z12 = seg1[1][2]

    x21 = seg2[0][0]
    y21 = seg2[0][1]
    z21 = seg2[0][2]
    x22 = seg2[1][0]
    y22 = seg2[1][1]
    z22 = seg2[1][2]

    xy1 = [[x11, y11], [x12, y12]] #проекция seg1 на плоскость xy
    yz1 = [[y11, z11], [y12, z12]] #проекция seg1 на плоскость yz
    xz1 = [[x11, z11], [x12, z12]] #проекция seg1 на плоскость xz

    xy2 = [[x21, y21], [x22, y22]]  #проекция seg2 на плоскость xy
    yz2 = [[y21, z21], [y22, z22]]  #проекция seg2 на плоскость yz
    xz2 = [[x21, z21], [x22, z22]]  #проекция seg2 на плоскость xz

    rez_xy = compareSegments(xy1, xy2, min_dlin) #пересечения проекций xy
    rez_yz = compareSegments(yz1, yz2, min_dlin) #пересечения проекций yz
    rez_xz = compareSegments(xz1, xz2, min_dlin) #пересечения проекций xz
    print('xy', rez_xy)
    print('yz', rez_yz)
    print('xz', rez_xz)
    rez_3d = [] #пересечения отрезков в 3D
    for i in range(len(rez_xy)):
        for j in range(len(rez_yz)):
            for k in range(len(rez_xz)):
                print(rez_xy[i], rez_yz[j], rez_xz[k])
                x_xy = rez_xy[i][0]
                y_xy = rez_xy[i][1]

                y_yz = rez_yz[j][0]
                z_yz = rez_yz[j][1]

                x_xz = rez_xz[k][0]
                z_xz = rez_xz[k][1]
                accuracy = 0.001

                if abs(x_xy - x_xz) <= accuracy and abs(y_xy - y_yz) <= accuracy and abs(z_xz - z_yz) <= accuracy:
                    x_rez = (x_xy + x_xz) / 2
                    y_rez = (y_xy + y_yz) / 2
                    z_rez = (z_xz + z_yz) / 2
                    rez_3d.append([x_rez, y_rez, z_rez])
    return rez_3d


def rotateCoord(dot, angle):
    X = dot[0]
    Y = dot[1]
    rotX = X * math.cos(angle) - Y * math.sin(angle)
    rotY = Y * math.sin(angle) + X * math.cos(angle)
    new_dot = [rotX, rotY]
    return new_dot

app = Flask(__name__)

@app.route('/get_shape', methods=['GET'])
def get_shape():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1" + inprm)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print ("Database version : %s " % data)
        #sql1 = "SELECT size_x, size_y from plan_objects where type ='" + str(params['object_type']) + "' and name ='" + str(params['object_name']) + "'"
        sql1 = "SELECT size_x, size_y from plan_objects where type ='mark1' and name ='Marker 1'"
        print(sql1)
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        sh = [data[0][0], data[0][1]]
        db.close()
        resp = make_response(sh, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/get_icon', methods=['GET'])
def get_icon():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1" + inprm)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print ("Database version : %s " % data)
        sql1 = "SELECT image from plan_objects where type ='" + str(params['object_type']) + "' and name ='" + str(params['object_name']) + "'"
        print(sql1)
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        num = 2
        if len(data) > 0:
            for row in data :
                ff = open(str(num)+'_out.jpg','wb')
                bin = base64.b64decode(row[0])
                ff.write(bin)
                ff.close()
                #print(row)
            db.close()
            resp = make_response(bin, 200)
            resp.headers['content-type'] = 'text/html'
            resp.headers['Access-Control-Allow-Origin'] = '*'
            resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
            return resp
        else:
            resp = make_response('', 400)
            resp.headers['content-type'] = 'text/html'
            resp.headers['Access-Control-Allow-Origin'] = '*'
            resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
            return resp
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
        resp.headers['content-type'] = 'text/html'
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        return resp



@app.route('/upload_file_on_server', methods=["POST"])
def upload_serv():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1"+inprm)

    try:
        print('upload started')
        file = request.files['files']
        fl = file.read()

        filename = params['fileName']
        print(filename)
        res_data = save_file_server(params['building_id'], filename, fl, params['comm'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_building_files', methods=["GET"])
def build_files():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1"+inprm)

    try:
        res_data = get_building_files(params['building_id'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/delete_file', methods=["GET"])
def del_file():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1" + inprm)
    try:
        res_data = delete_file(params['doc_id'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/update_file_comm', methods=["GET"])
def upd_file_comm():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1" + inprm)
    try:
        res_data = upd_file(params['doc_id'], params['new_comm'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_file', methods=['GET'])
def get_file_object():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1" + inprm)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print ("Database version : %s " % data)
        sql1 = "SELECT file from building_docs where id ='" + str(params['doc_id']) + "'"
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        if len(data) > 0:
            for row in data :
                bin = base64.b64decode(row[0])
            db.close()
            resp = make_response(bin, 200)
        else:
            resp = make_response('', 400)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/upload_file', methods=["POST"])
def upload():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1"+inprm)
    try:
        file = request.files['files']
        img = file.read()
        pic = open('aaa1.jpg', 'wb')
        pic.write(img)
        pic.close()
        print("img 1")
        js_data = {}
        print(js_data)

        filename = params['fileName']
        print(filename)
        js_data['name'] = filename

        img1 = cv2.imread('aaa1.jpg')
        print('read complete')
        img_shape = img1.shape
        print(img_shape)
        sh_data = {'width': img_shape[1], 'height': img_shape[0]}
        js_data['shape'] = sh_data
        print(js_data)
        res_data = save_file(params['object_type'], params['floor_num'], params['building_id'], str(js_data), img)
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp



@app.route('/get_picture', methods=['GET'])
def get_picture_object():
    print("connect")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("connect 1" + inprm)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print ("Database version : %s " % data)
        sql1 = "SELECT image from buildings where obj_type ='" + str(params['object_type']) + "' and building_id ='" + str(params['building_id']) + \
               "' and floor_num = '" + str(params['floor_num']) + "'"
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        num = 1
        if len(data) > 0:
            for row in data :
                ff = open(str(num)+'_out.jpg','wb')
                bin = base64.b64decode(row[0])
                ff.write(bin)
                ff.close()
                #print(row)
            db.close()
            resp = make_response(bin, 200)
            resp.headers['content-type'] = 'text/html'
            resp.headers['Access-Control-Allow-Origin'] = '*'
            resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
            return resp
        else:
            resp = make_response('', 400)
            resp.headers['content-type'] = 'text/html'
            resp.headers['Access-Control-Allow-Origin'] = '*'
            resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
            return resp
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

        resp.headers['content-type'] = 'text/html'
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        return resp

@app.route('/get_building_inform', methods=['GET'])
def getBuildInf():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = get_buiding_inf(params['building_id'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_building_inform_v2', methods=['GET'])
def getBuildInfv2():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:

        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()

        sql1 = "SELECT DISTINCT floor_num from floors_info where building_id = '" + str(params['building_id']) + "'"
        print(sql1)
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        arr_data = list(data)

        rez_json = {}
        layerRaws = []
        roomslist = {}
        layersList = {}
        layerRaws = []

        for j in range(len(arr_data)):
            fl_num = data[j][0]
            print(fl_num)

            sql = "SELECT * from floors_info where building_id = '" + str(params['building_id']) + "' and floor_num = '" + str(fl_num) + "'"
            cursor.execute(sql)
            fl_data = cursor.fetchall();
            for i in fl_data:
                rez_part = {}
                rez_part['geometry'] = {}
                rez_part['geometry']['floor'] = i[2]
                rez_part['geometry']['coordinates'] = json.loads(i[9])
                rez_part['properties'] = {'id': i[0], 'name': i[4], 'room_size': i[8],
                                          'description': [{'field1': '№ комнаты', 'field2': i[4], 'filed3': ''},
                                                          {'field1': 'Тип комнаты', 'field2': i[5], 'field3': ''},
                                                          {'field1': 'Подразделение', 'field2': i[6], 'field3': ''}],
                                          'descr': i[10], 'ext_use': i[12], 'commentary': i[13]}
                layerRaws.append(rez_part)

        roomslist["type"] = "Polygon"
        roomslist["count"] = len(layerRaws)
        roomslist["layerRaws"] = layerRaws
        layersList["Rooms"] = roomslist
        rez_json["layers"] = layersList
        str_json = str(rez_json).replace("\'", "\"")
        #print(str_json)

        db.close()

        resp = make_response(str_json, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp



@app.route('/compare_polylines', methods=['GET'])
def compare():
    print("comparing")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        existing_netw = json.loads(params['networks'])
        new_netw = json.loads(params['checking'])
        dlin = float(params['min_dl'])
        print(existing_netw, len(existing_netw), type(existing_netw))
        print(new_netw, len(new_netw), type(new_netw))
        #print(dlin)
        check_rezult = []
        for j in range(0, len(existing_netw) - 1):
            for z in range(0, len(new_netw) - 1):
                #print([existing_netw[j], existing_netw[j + 1]], [new_netw[z], new_netw[z + 1]])
                rezult = compareSegments([existing_netw[j], existing_netw[j + 1]], [new_netw[z], new_netw[z + 1]], dlin)
                if rezult != []:
                    check_rezult.append(rezult)
        #print(check_rezult)
        res_data = str(check_rezult)
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data =  traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/compare_polylines_json', methods=['GET'])
def compare_json():
    print("comparing")
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        existing_netw = json.loads(params['networks'])
        existing_netw_coord = json.loads(existing_netw['coord']);
        new_netw = json.loads(params['checking'])
        dlin = float(params['min_dl'])
        print(existing_netw, len(existing_netw), type(existing_netw))
        print(existing_netw_coord, len(existing_netw_coord), type(existing_netw_coord))
        print(new_netw, len(new_netw), type(new_netw))
        #print(dlin)
        check_rezult = []
        if type(existing_netw_coord[0]) is list:
            print('network')
            for j in range(0, len(existing_netw_coord) - 1):
                for z in range(0, len(new_netw) - 1):
                    #print([existing_netw[j], existing_netw[j + 1]], [new_netw[z], new_netw[z + 1]])
                    rezult = compareSegments([existing_netw_coord[j], existing_netw_coord[j + 1]], [new_netw[z], new_netw[z + 1]], dlin)
                    if rezult != []:
                        check_rezult.append(rezult)
        else:
            print('well')
            for i in range(0, len(new_netw) - 1):
                rezult = compareSegment_to_well(existing_netw_coord, [new_netw[i], new_netw[i + 1]], dlin)
                if rezult != []:
                    check_rezult.append(rezult)
        #print(check_rezult)
        res_data = str(check_rezult)
        res_json = {"id": existing_netw['id'], "map_object_type": existing_netw['map_object_type'], "type": existing_netw['type'], "coord": res_data}
        rezult = json.dumps(res_json)
        resp = make_response(rezult, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data =  traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/compare_polylines_3D', methods=['GET'])
def compare3D():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        existing_netw = json.loads(params['networks'])
        new_netw = json.loads(params['checking'])
        dlin = float(params['min_dl'])
        #print(existing_netw, len(existing_netw), type(existing_netw))
        #print(new_netw, len(new_netw), type(new_netw))
        #print(dlin)
        check_rezult = []
        for j in range(0, len(existing_netw) - 1):
            for z in range(0, len(new_netw) - 1):
                #print([existing_netw[j], existing_netw[j + 1]], [new_netw[z], new_netw[z + 1]])
                rezult = compareSegments3D([existing_netw[j], existing_netw[j + 1]], [new_netw[z], new_netw[z + 1]], dlin)
                if rezult != []:
                    check_rezult.append(rezult)
        #print(check_rezult)
        res_data = str(check_rezult)
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data =  traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/get_new_netw_tabl', methods=['GET'])
def get_netw_list():
    try:
        sql1="SELECT legacy, id from map_lhep_new_netw ORDER BY id"
        print(sql1)
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        # prepare a cursor object using cursor() method
        cursor = db.cursor()
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        db.close()
        print(len(data))
        rez_str = "<table class='nb__tabl-dop'><tr><th>Старые сети</th><th>Новая сеть</th></tr><tbody>"
        for i in range(len(data)):
            leg = str(data[i][0]).replace(' ', '')

            rez_str += "<tr class=pt><td>" + str(data[i][0]) + \
                       "<input type='checkbox' id='a_" + str(data[i][1]) + "' onchange=show_old_netw(" + str(data[i][1]) + "," + str(leg) + \
                       ")></td><td>" + str(data[i][1]) + \
                       "<input type='checkbox' id='b_" + str(data[i][1]) + "' onchange=show_new_netw(" + str(data[i][1]) + "," + str(data[i][1]) + \
                       ")></td></tr>"
        rez_str += "</tbody></table>"
        print(rez_str)
        resp = make_response(rez_str, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/get_old_netw', methods=['GET'])
def get_olds_coords():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")

        sql = "SELECT points from map_lhep where id = " + str(params['id'])
        print(sql)
        cursor = db.cursor()
        cursor.execute(sql)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        db.close()
        print(data)

        rez_str = str(data[0][0])

        resp = make_response(rez_str, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data =  traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/get_new_netw', methods=['GET'])
def get_new_coords():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")

        sql = "SELECT edges from map_lhep_new_netw where id = " + str(params['id'])
        print(sql)
        cursor = db.cursor()
        cursor.execute(sql)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        db.close()
        print(data)

        rez_str = str(data[0][0])

        resp = make_response(rez_str, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data =  traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp


@app.route('/load_contour', methods=['GET'])
def get_contour():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = get_record('contour', params['floor_num'], params['building_id'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data =  traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/save_contour', methods=['GET'])
def save_contour():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = save_record('contour', params['floor_num'], params['building_id'], params['json'])
        resp = make_response('{"rc":0}', 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp



@app.route('/load_rooms', methods=['GET'])
def get_rooms():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = get_record('rooms', params['floor_num'], params['building_id'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/save_rooms', methods=['GET'])
def save_rooms():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = save_record('rooms', params['floor_num'], params['building_id'], params['json'])
        resp = make_response('{"rc":0}', 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

#params['b_id'], params['fl_num']
@app.route('/load_floor', methods=['GET'])
def load_floor():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        sql = "SELECT * from floors_info where building_id = '" + str(params['b_id']) + "' and floor_num = '" + str(params['fl_num']) + "'"
        cursor.execute(sql)
        data = cursor.fetchall()
        #print(len(data))
        #print(data)
        rez = []
        for i in data:
            rez_part = {}
            rez_part['geometry'] = {}
            rez_part['geometry']['floor'] = i[2]
            rez_part['geometry']['coordinates'] = json.loads(i[9])
            rez_part['properties'] = {'id': i[0], 'name': i[4], 'room_size': i[8], 'description': [{'field1': '№ комнаты', 'field2': i[4], 'filed3': ''},
                                                                                {'field1': 'Тип комнаты', 'field2': i[5], 'field3': ''},
                                                                                {'field1': 'Подразделение', 'field2': i[6], 'field3': ''}], 'descr': i[10], 'ext_use': i[12], 'commentary': i[13]}
            rez.append(rez_part)
        rez = json.dumps(rez)
        resp = make_response(rez, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

#params['room_id'], params['b_id'], params['fl_num'], params['room_num'], params['room_type], params['otd'], params['coord'], params['descr'], params['room_size']
@app.route('/save_one_room', methods=['GET'])
def save_one_room():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        coord = json.loads(params['coord'])
        minx = 1000000000000
        maxx = -100000000000
        miny = 1000000000000
        maxy = -100000000000
        for j in coord:
            minx = min(j[0], minx)
            maxx = max(j[0], maxx)
            miny = min(j[1], miny)
            maxy = max(j[1], maxy)
        print([minx, miny], [maxx, maxy])
        area = (maxy - miny) * (maxx - minx)
        print(area)
        cntIn = 0
        cntOut = 0
        num = 10000
        for j in range(num):
            rand_point_x = random.uniform(minx, maxx)
            rand_point_y = random.uniform(miny, maxy)
            if ray_tracing_method(rand_point_x, rand_point_y, coord):
                cntIn += 1
            else:
                cntOut += 1
        print(cntIn, cntOut)
        perc = cntIn / num
        area_real = area * perc

        sql = "UPDATE floors_info SET building_id = '" + str(params['b_id']) + "', floor_num = '" + str(params['fl_num']) + \
              "', room_num = '" + str(params['room_num']) + "', room_type = '" + str(params['room_type']) + "', otd = '" + str(params['otd']) + \
              "', room_size = '" + str(params['room_size']) + "', coord = '" + str(params['coord']) + "', sqr_real = '" + str(area_real) + "' WHERE id = '" + str(params['room_id']) + "'"
        cursor.execute(sql)
        db.commit()

        resp = make_response('{"rc":0}', 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

#params['b_id'], params['fl_num], params['floor_info']
@app.route('/save_all_rooms', methods=['GET'])
def save_all_rooms():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()

        b_id = int(params['b_id'])
        fl_num = int(params['fl_num'])
        print(b_id, fl_num)
        check = json.loads(params['floor_info'])
        print(type(check) == list and len(check) > 0, len(check))
        if type(check) == list and len(check) > 0:
            for j in range(len(check)):
                #print(type(check[j]) == dict and 'description' in list(check[j]['properties'].keys()) and len(
                #        check[j]['properties']['description']) > 0)
                print(type(check[j]), list(check[j]['properties'].keys()))
                if type(check[j]) == dict :
                    dic = check[j]
                    coord = dic['geometry']['coordinates']
                    #print(dic['properties'])
                    #print(coord)
                    if 'description' in list(check[j]['properties'].keys()):
                        if len(check[j]['properties']['description']) > 0:
                            name = dic['properties']['description'][0]['field2']
                            type_r = dic['properties']['description'][1]['field2']
                            if len(check[j]['properties']['description']) == 3:
                                otd = dic['properties']['description'][2]['field2']
                            else:
                                otd = '0'
                    else:
                        name = dic['properties']['name']
                        type_r = '0'
                        otd = '0'

                    r_size = dic['properties']['room_size']

                    room_id = dic['properties']['id']

                    if room_id == '-1':
                        room_id = createNewRoom(dic, b_id)

                    print(room_id)
                    if 'commentary' in list(check[j]['properties'].keys()):
                        comment = dic['properties']['commentary']
                    else:
                        comment = ''

                    coordins = coord
                    minx = 1000000000000
                    maxx = -100000000000
                    miny = 1000000000000
                    maxy = -100000000000
                    for j in coordins:
                        minx = min(j[0], minx)
                        maxx = max(j[0], maxx)
                        miny = min(j[1], miny)
                        maxy = max(j[1], maxy)
                    #print([minx, miny], [maxx, maxy])
                    area = (maxy - miny) * (maxx - minx)
                    #print(area)
                    cntIn = 0
                    cntOut = 0
                    num = 10000
                    for j in range(num):
                        rand_point_x = random.uniform(minx, maxx)
                        rand_point_y = random.uniform(miny, maxy)
                        if ray_tracing_method(rand_point_x, rand_point_y, coordins):
                            cntIn += 1
                        else:
                            cntOut += 1
                    #print(cntIn, cntOut)
                    perc = cntIn / num
                    area_real = round(area * perc)
                    print(area_real)

                    sql = "UPDATE floors_info SET building_id = '" + str(b_id) + "', floor_num = '" + str(fl_num) + \
                          "', room_num = '" + str(name) + "', room_type = '" + str(type_r) + "', otd = '" + str(otd) + \
                          "', room_size = '" + str(r_size) + "', coord = '" + str(coord)+ "', sqr_real = '" + str(area_real) + \
                          "', commentary = '" + str(comment) + "' WHERE id = '" + str(room_id) + "'"

                    #if str(room_id) == '222':
                    print(sql)

                    cursor.execute(sql)
                    db.commit()

        resp = make_response('{"rc":0}', 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp



@app.route('/load_object_data', methods=['GET'])
def get_building_object():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        if params['object_type'] == 'building_descr':
            params['floor_num'] = "-1000"
        res_data = get_record(params['object_type'], params['floor_num'], params['building_id'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/save_object_data', methods=['GET'])
def save_building_object():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        if params['object_type'] == 'building_descr':
            params['floor_num'] = "-1000"
        res_data = save_record(params['object_type'], params['floor_num'], params['building_id'], params['json'])
        resp = make_response('{"rc":0}', 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/load_user_object_data', methods=['GET'])
def get_user_building_object():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        if params['object_type'] == 'building_descr':
            params['floor_num'] = "-1000"
        jinr_id = -10
        res_data = get_user_record(params['object_type'], params['floor_num'], params['building_id'], str(jinr_id))
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp

@app.route('/save_user_object_data', methods=['GET'])
def save_user_building_object():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        if params['object_type'] == 'building_descr':
            params['floor_num'] = "-1000"
        jinr_id = -10
        res_data = save_user_record(params['object_type'], params['floor_num'], params['building_id'], params['json'], str(jinr_id))
        resp = make_response('{"rc":0}', 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp



@app.route('/get_buildings', methods=['GET'])
def get_list():
    try:
        res_data = get_building_list()
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_own_buildings', methods=['GET'])
def get_own_list():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = get_building_list_divOwner(params['owner'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_own_buildings_options', methods=['GET'])
def get_own_options():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = get_building_list_divOwner_options(params['owner'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp



@app.route('/get_buildings_tbl', methods=['GET'])
def get_build_tabl():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = get_building_tbl(params['build'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_sotr_tbl', methods=['GET'])
def get_sotr_tabl():
    #lab_id = 100000
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = "<table class='nb__tabl-dop'><tr><th>ФИО</th><th>ПИН</th><th>Корпус</th><th>Комната</th><th>Лаборатория</th></tr><tbody>"
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        obj_type = 'rooms'
        print("Database version : %s " % data)
        fio = params['fio'].upper()
        print(fio)

        # sqltab_n = "SELECT (select short_name from struktura where id =  lvl3_div_code) as lvl3_div_name, " \
        #            "(select short_name from struktura where id =  topparent_code) as topparent_name, " \
        #            "(select short_name from struktura where id =  subtopparent_code) as subtopparent_name, " \
        #            "sotr.person_id " \
        #            "AS " \
        #            "kod_fl, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO, sotr.otdel" \
        #            ", sotr.division, sotr.shtat_direct, sotr.post, sotr.category, sotr.stavka" \
        #            ", room" \
        #            ", building " \
        #            "from sotrudniki sotr " \
        #            "left join accommodation_v2 a " \
        #            "on " \
        #            "sotr.tab_n = a.tab_n " \
        #            "where sotr.lab_id = " + str(lab_id) + " " \
        #                                                   "and (sotr.datauvolen > current_date or sotr.datauvolen is null) " \
        #                                                   "and sotr.FIO like '" + str(
        #     fio) + "%'" \
        #            "AND a.room <> '' AND a.building <> ''"

        sqltab_n = "SELECT (select short_name from struktura where id =  lvl3_div_code) as lvl3_div_name, " \
                       "(select short_name from struktura where id =  topparent_code) as topparent_name, " \
                   "(select short_name from struktura where id =  subtopparent_code) as subtopparent_name, " \
                   "sotr.person_id " \
                   "AS " \
                   "kod_fl, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO, sotr.otdel" \
                   ", sotr.division, sotr.shtat_direct, sotr.post, sotr.category, sotr.stavka" \
                   ", room" \
                   ", building," \
                   "ml.div_owner " \
                   "from accommodation_v2 a " \
                   "right join sotrudniki sotr " \
                   "on sotr.tab_n = a.tab_n " \
                   "left join map_lhep ml " \
                   "on " \
                   "a.building = ml.id " \
                   "where (sotr.datauvolen > current_date or sotr.datauvolen is null) and sotr.FIO like '" + str(fio) + "%' " \
                   "AND a.room <> '' AND a.building <> '' " \
                   "ORDER BY ml.div_owner, sotr.FIO"

        print(sqltab_n)
        cursor.execute(sqltab_n)
        data_tab_n = cursor.fetchall()
        print(data_tab_n)
        if len(data_tab_n) == 0:
            sqltab_n = "SELECT (select short_name from struktura where id =  lvl3_div_code) as lvl3_div_name, " \
                       "(select short_name from struktura where id =  topparent_code) as topparent_name, " \
                       "(select short_name from struktura where id =  subtopparent_code) as subtopparent_name, " \
                       "sotr.person_id " \
                       "AS " \
                       "kod_fl, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO, sotr.otdel" \
                       ", sotr.division, sotr.shtat_direct, sotr.post, sotr.category, sotr.stavka" \
                       ", room" \
                       ", building" \
                       ", ml.div_owner"\
                       "from accommodation_v2 a " \
                       "right join sotrudniki sotr " \
                       "on " \
                       "sotr.tab_n = a.tab_n " \
                       "left join map_lhep ml " \
                       "on " \
                       "a.building = ml.id " \
                       "where (sotr.datauvolen > current_date or sotr.datauvolen is null) " \
                       "and sotr.FIO like '" + str(fio) + "%'" \
                       "AND a.room <> '' AND a.building <> '' "\
                       "ORDER BY ml.div_owner, sotr.FIO"
            print(sqltab_n)
            cursor.execute(sqltab_n)
            data_tab_n = cursor.fetchall()
            print(data_tab_n)


        if len(data_tab_n) == 0:
            resp = make_response("Employee not found", 404)
        else:
            for i in range(len(data_tab_n)):
                tab_n = data_tab_n[i][4]
                fio_full = data_tab_n[i][8]
                p_id = data_tab_n[i][3]
                print(tab_n)

                sqlroom = "SELECT room, building from accommodation_v2 where tab_n = '" + str(
                    tab_n) + "' order by otype"
                cursor.execute(sqlroom)
                data_room = cursor.fetchall()
                print(data_room)
                if len(data_room) == 0 or len(data_room[0][0]) == 0:
                    resp = make_response("Room not found", 404)
                else:
                    for i in range(len(data_room)):
                        print(data_room[i])
                        if len(data_room[i][0]) > 0:
                            room = data_room[i][0]
                            floor = room[0]
                            id = data_room[i][1]
                            print(room, floor, id)

                            sqlbuild = "SELECT tooltip, div_owner from map_lhep where id = '" + str(id) + "'"
                            cursor.execute(sqlbuild)
                            data_build = cursor.fetchall()
                            print(data_build)
                            if len(data_build) > 0:
                                building = data_build[0][0]
                                div_owm = data_build[0][1]

                                res_data += "<tr class='nb__tabl-dop' id=blink onclick= \"CenterAndClose(\'" + str(id)+ "T\')\"><td>" + str(fio_full) + \
                                       "</td><td><a target=_blank href='https://pin.jinr.ru/pin/pin?c=persons/showPerson&jid=" + str(p_id) + \
                                            "'>ПИН</a></td><td>" + str(building) + "</td><td>" \
                                            + str(room) + "</td><td>" + str(div_owm) + "</td></tr>"
            res_data += "</tbody></table>"
            resp = make_response(res_data, 200)

    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp



@app.route('/get_types', methods=['GET'])
def get_types():
    try:
        res_data = get_types_list()
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/change_mark_type_no_pic', methods=['GET'])
def change_type_no_pic():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = change_mark_no_pic(params['obj_type_old'], params['obj_name_old'], params['obj_name_new'], params['obj_comm'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/change_mark_type_with_pic', methods=["POST"])
def change_type_with_pic():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("change with pic connected")

    file = request.files['files']
    img = file.read()
    pic = open('aaa5.jpg', 'wb')
    pic.write(img)
    pic.close()
    print("img 1")

    img1 = cv2.imread('aaa5.jpg')
    print('read complete')
    img_shape = img1.shape
    print(img_shape)
    sh_data = {'width': img_shape[1], 'height': img_shape[0]}

    try:
        print('changing pic')
        res_data = change_mark_with_pic(params['obj_type_old'], params['obj_name_old'], params['obj_name_new'], params['obj_comm'], sh_data, img)
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/create_mark_type', methods=["POST"])
def create_type():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    print("change with pic connected")

    file = request.files['files']
    img = file.read()
    pic = open('aaa6.jpg', 'wb')
    pic.write(img)
    pic.close()
    print("img 1")

    img1 = cv2.imread('aaa6.jpg')
    print('read complete')
    img_shape = img1.shape
    print(img_shape)
    sh_data = {'width': img_shape[1], 'height': img_shape[0]}

    try:
        print('creating type')
        res_data = create_mark(params['obj_type'], params['obj_name'], params['obj_comm'], sh_data, img)
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp



@app.route('/get_commentary', methods=['GET'])
def get_commentary():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = get_comm(params['object_type'], params['object_name'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_build_name', methods=['GET'])
def get_build_name():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)

    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print("Database version : %s " % data)
        sql1 = "SELECT shortname from map_lhep where id ='" + str(params['id']) + "'"
        print(sql1)
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        if len(data) > 0:
            build_name = data[0][0]
            print('-------------------------------')
            print('name', build_name)
            print('-------------------------------')

            resp = make_response(build_name, 200)
        else:
            data = ''
            resp = make_response(data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp



@app.route('/get_employes', methods=['GET'])
def get_employes_list():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        res_data = get_employes(params['letters'])
        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/load_emp', methods=['GET'])
def load_employes():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print("Database version : %s " % data)
        sql1 = "SELECT otype, tab_n from accommodation_v2 where room ='" + str(params['room_num']) + "' and b_id ='" + str(
            params['build']) + "'"
        print(sql1)
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        print(data)
        print(len(data))
        res_data = {}
        empl = []
        fire_empl = ''
        for i in range(len(data)):
            print(data[i])
            if data[i][0] == 1:
                empl.append(data[i][1])
                print('sitting', empl)
            elif data[i][0] == 2:
                fire_empl = data[i][1]
                print('fire', fire_empl)
        res_data['fire_emp'] = fire_empl
        res_data['empl'] = empl
        print(res_data)

        resp = make_response(res_data, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)

    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/save_emp', methods=['GET'])
def save_employe():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print("Database version : %s " % data)
        sql1 = "SELECT tooltip from map_lhep where id ='" + str(params['build']) + "'"
        print(sql1)
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        build_name = data[0][0].split(' ')[0]

        sqldel = "DELETE from accommodation_v2 where otype = '" + str(params['o_type']) + "' and tab_n = '" + str(params['tab_n']) + "'"
        print('Delete', sqldel)
        cursor.execute(sqldel)
        db.commit();
        print('--------------------------------------------------------------------------------')
        print(params['o_type'], params['tab_n'], build_name, params['room_num'], params['build'])
        print('---------------------------------------------------------------------------------')

        sqlins = "INSERT into accommodation_v2 (otype, tab_n, building, room, b_id) values (%s, %s, %s, %s, %s)"
        cursor.execute(sqlins, (params['o_type'], params['tab_n'], build_name, params['room_num'], params['build']))

        db.commit()
        db.close()
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

    resp = make_response(sqlins, 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_emp_json', methods=['GET'])
def get_emp_json():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        lab_id = params['lab_id']

        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print("Database version : %s " % data)
        sql1 = "select (select short_name from struktura where id = lvl3_div_code) as lvl3_div_name" \
               ", (select short_name from struktura where id = topparent_code) as topparent_name" \
               ", (select short_name from struktura where id = subtopparent_code) as subtopparent_name" \
               ", sotr.person_id, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO" \
               ", sotr.post, otype, sotr.stavka, room, building" \
               ", case when (ifnull(sotr.DataUvolen-CURRENT_DATE,1)<0) then \'Y\' else \'N\' end " \
               "as dismissed " \
               "from sotrudniki sotr left join accommodation_copy a " \
               "on sotr.tab_n=a.tab_n " \
               "where lab_id = " + str(lab_id) + \
               " and (sotr.datauvolen > current_date or sotr.datauvolen is null) " \
               "order by sotr.FIO, otype"
        print(sql1)
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        print(data)

        rez_json = {}
        for i in data:
            if str(i[3]) not in rez_json.keys():
                rez_json[str(i[3])] = []
            rez_json[str(i[3])].append({"lvl3_div_name": i[0],
                              "topparent_name": i[1],
                              "subtopparent_name": i[2],
                              "tab_n": i[4],
                              "F": i[5],
                              "I": i[6],
                              "O": i[7],
                              "FIO": i[8],
                              "post": i[9],
                              "category": i[10],
                              "stavka": float(i[11]),
                              "room": i[12],
                              "building": i[13],
                              "dismissed": i[14]})
        print(rez_json)

        resp = make_response(json.dumps(rez_json), 200)
        db.close()
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/edit_emp_rooms', methods=['GET'])
def edit_emp_rooms():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)
    try:
        tab_n = params['tab_n']

        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print("Database version : %s " % data)
        sql_del = "delete from accommodation_v2 where tab_n = '" + str(tab_n) + "' and otype <> -1"
        print(sql_del)
        cursor.execute(sql_del)
        db.commit()

        emp_rooms = json.loads(params['new_rooms'])
        print(emp_rooms)

        #i - building num
        for i in emp_rooms.keys():
            for j in emp_rooms[i].keys():
                #j - room num
                otype = emp_rooms[i][j]

                sql_ins = "insert into accommodation_v2 (otype, tab_n, building, room) values (%s, %s, %s, %s)"
                print(sql_ins)
                cursor.execute(sql_ins,(otype, tab_n, i, j))
                db.commit()

        db.close()

        resp = make_response('OK', 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/edit_all_emp_rooms', methods=['POST'])
def edit_all_emp_rooms():
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print("Database version : %s " % data)

        emps = json.loads(request.form['emp_rooms'])
        print(request.form)
        print(emps)
        for i in list(emps.keys()):
            sql_del = "delete from accommodation_v2 where tab_n = '" + str(i) + "' and otype <> -1"
            print(sql_del)
            cursor.execute(sql_del)
            db.commit()

            for j in emps[i]:
                print(j)

                otype = j['o_type']
                room = j['room']
                corp = j['building']

                if otype != 'null' and room != 'null' and corp != 'null':
                    sql_ins = "insert into accommodation_v2 (otype, tab_n, building, room) values (%s, %s, %s, %s)"
                    print(sql_ins)
                    cursor.execute(sql_ins, (otype, i, corp, room))
                    db.commit()
        db.close()

        resp = make_response('OK', 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp


@app.route('/update_room', methods=['GET'])
def upd_room():
    params = {}
    for i in request.args:
        params[str(i)] = request.args[i]
    inprm = str(params)

    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        obj_type = 'rooms'
        print("Database version : %s " % data)
        sql1 = "SELECT json from buildings where building_id ='" + str(params['building_id']) +  "' and floor_num ='" + \
               str(params['floor_num']) + "' and obj_type = 'rooms'"
        print(sql1)
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        js_data = json.loads(data[0][0])
        for i in range(len(js_data)):
            # print(js_data[i])
            # print('----------------------------------------------')
            # print(js_data[i]["properties"])
            # print('----------------------------------------------')
            # print(js_data[i]["properties"]['name'])
            try:
                if js_data[i]["properties"]["name"] == params['room_num']:
                    js_data[i]["properties"] = params['json']
                    print('Замена произведена')
            except Exception:
                print('error in json')
                continue

        js_data = json.dumps(js_data)

        sqlupd = "UPDATE buildings set json = '" + js_data + "' where building_id ='" + str(params['building_id']) +  "' and floor_num ='" + \
               str(params['floor_num']) + "' and obj_type = 'rooms'"
        cursor.execute(sqlupd)
        db.commit()
        db.close()

        resp = make_response(sqlupd, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp



labs = {'LHEP': '100000', 'MLIT': '600000'}

@app.route('/search_plans', methods=['GET'])
def search_plan():
    print('search connected')
    params = {}
    for i in request.args:
        params[str(i).lower()] = request.args[i]
    inprm = str(params)

    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        obj_type = 'rooms'
        print("Database version : %s " % data)

        if "tab_n" in list(params.keys()):
            tab_n = params['tab_n']

            sqlfio = "SELECT FIO from sotrudniki where tab_n = '" + str(tab_n) + "'"
            print(sqlfio)
            cursor.execute(sqlfio)
            data_fio = cursor.fetchall()
            print(data_fio)
            if len(data_fio) == 0:
                resp = make_response("Wrong employee number", 404)
            else:
                fio = data_fio[0][0]

                if 'building' in list(params.keys()):
                    building = params['building'].upper()
                    if len(building) > 1:
                        if building[1].isdigit():
                            print('digit')
                            if building[0].upper() == "К" or building[0].upper() == "K":
                                building = building[1:]
                    print(building)

                    sql_building_id = "SELECT id, map_object_type, div_owner from map_lhep where UPPER(obj_name) = '" + str(building) + "'"
                    cursor.execute(sql_building_id)
                    data_build_id = cursor.fetchall()
                    print(data_build_id)
                    if len(data_build_id) == 0:
                        resp = make_response("Building not found", 404)
                    else:
                        id = data_build_id[0][0]
                        if data_build_id[0][2] != '':
                            lab_name = data_build_id[0][2]
                        else:
                            lab_name = data_build_id[0][1][2:]
                        print(lab_name)

                        sqlroom = "SELECT room_id from accommodation_v2 where building = '" + str(
                            id) + "' and tab_n = '" + str(tab_n) + "' order by otype"
                        cursor.execute(sqlroom)
                        data_room = cursor.fetchall()
                        print(data_room)
                        if len(data_room) == 0:
                            resp = make_response("Room not found", 404)
                        else:
                            room = data_room[0][0]
                            floor = room[0]
                            print(room, floor)

                            sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                id) + "' and floor_num = '" + \
                                           str(floor) + "' and obj_type = 'building_image'"
                            sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                id) + "' and floor_num = '" + \
                                             str(floor) + "' and obj_type = 'rooms'"
                            cursor.execute(sqlcheck_img)
                            data_img = cursor.fetchall()
                            cursor.execute(sqlcheck_rooms)
                            data_rooms = cursor.fetchall()
                            # if len(data_img) > 0 and (
                            #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                            #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                            #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                            #         id) + "/plan.cfg&" \
                            #               "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                            #     resp = make_response(rez, 200)
                            # else:
                            #     rez = "Building " + str(building) + ", floor " + str(floor) + ", room " + str(
                            #         room) + ". Plan not found"
                            #     resp = make_response(rez, 200)
                            rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                  "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name.lower()) + "/plan.cfg&" \
                                                                                                        "floor=" + str(
                                floor) + "&room=" + str(room) + "&bld_id=" + str(id) + "&fio=" + str(fio) + "'}</script>"
                            resp = make_response(rez, 200)
                else:
                    sqlbuild_room = "SELECT building, room from accommodation_v2 where tab_n = '" + str(tab_n) + "' order by otype"
                    cursor.execute(sqlbuild_room)
                    data_room = cursor.fetchall()
                    print(data_room)
                    if len(data_room) == 0 or data_room[0][0] == '':
                        resp = make_response("Location of employee is unknown", 404)
                    else:
                        room = data_room[0][1]
                        floor = room[0]
                        id = data_room[0][0]
                        print(room, floor)

                        sql_building_id = "SELECT map_object_type, div_owner from map_lhep where id = '" + str(
                            id) + "'"
                        cursor.execute(sql_building_id)
                        data_build_id = cursor.fetchall()
                        print(data_build_id)
                        if len(data_build_id) == 0:
                            resp = make_response("Building not found", 404)
                        else:
                            if data_build_id[0][1] != '':
                                lab_name = data_build_id[0][1]
                            else:
                                lab_name = data_build_id[0][0][2:]
                            print(lab_name)

                            sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                id) + "' and floor_num = '" + \
                                           str(floor) + "' and obj_type = 'building_image'"
                            sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                id) + "' and floor_num = '" + \
                                             str(floor) + "' and obj_type = 'rooms'"
                            cursor.execute(sqlcheck_img)
                            data_img = cursor.fetchall()
                            cursor.execute(sqlcheck_rooms)
                            data_rooms = cursor.fetchall()
                            # if len(data_img) > 0 and (
                            #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                            #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                            #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                            #         id) + "/plan.cfg&" \
                            #               "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                            #     resp = make_response(rez, 200)
                            # else:
                            #     rez = "Building " + str(building) + ", floor " + str(floor) + ", room " + str(
                            #         room) + ". Plan not found"
                            #     resp = make_response(rez, 200)
                            rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                  "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name.lower()) + "/plan.cfg&" \
                                                                                                        "floor=" + str(
                                floor) + "&room=" + str(room) + "&bld_id=" + str(id) + "&fio=" + str(fio) + "'}</script>"
                            resp = make_response(rez, 200)
        else:
            if "lab_code" not in list(params.keys()) and "lab" not in list(params.keys()):
                resp = make_response("Laboratory ID not found", 404)
            else:
                lab_id = ''
                lab_name = ''
                if "lab_code" in list(params.keys()):
                    lab_id = params['lab_code']
                    lab_name = ''
                    for i in labs:
                        if labs[i] == lab_id:
                            lab_name = i
                            break
                else:
                    if params['lab'] == "VBLHEP" or params['lab'] == "LHEP":
                        lab_name = "LHEP"
                    elif params['lab'] == "MLIT" or params['lab'] == "LIT":
                        lab_name = "MLIT"
                    else:
                        lab_name = params['lab']
                    if lab_name in list(labs.keys()):
                        lab_id = labs[lab_name]

                sqllab_corp = "SELECT id, obj_name from map_lhep where (div_owner ='" + str(
                    lab_name) + "' or map_object_type ='b_" + \
                              str(lab_name) + "') and o_type=2"
                print(sqllab_corp)
                cursor.execute(sqllab_corp)
                # Fetch a single row using fetchone() method.
                data_lab = cursor.fetchall()
                print(data_lab)

                if len(list(params.keys())) == 1:
                    resp = make_response("Search filters not found", 404)
                else:
                    if "fio" in list(params.keys()):
                        fio = params['fio'].upper()
                        print(fio)
                        if 'building' in list(params.keys()):
                            building = params['building'].upper()
                            if len(building) > 1:
                                if building[1].isdigit():
                                    print('digit')
                                    if building[0].upper() == "К" or building[0].upper() == "K":
                                        building = building[1:]
                            print(building)
                            id = 0
                            for i in data_lab:
                                short_name = i[1].split()[0]
                                if short_name == building:
                                    id = i[0]
                                    print(id)
                                    break
                            if id == 0:
                                resp = make_response("Building not found", 404)
                            else:
                                if lab_id != '':
                                    sqltab_n = "SELECT (select short_name from struktura where id =  lvl3_div_code) as lvl3_div_name, " \
                                           "(select short_name from struktura where id =  topparent_code) as topparent_name, " \
                                           "(select short_name from struktura where id =  subtopparent_code) as subtopparent_name, " \
                                           "sotr.person_id " \
                                           "AS " \
                                           "kod_fl, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO, sotr.otdel" \
                                           ", sotr.division, sotr.shtat_direct, sotr.post, sotr.category, sotr.stavka" \
                                           ", room" \
                                           ", building " \
                                           "from sotrudniki sotr " \
                                           "left join accommodation_v2 a " \
                                           "on " \
                                           "sotr.tab_n = a.tab_n " \
                                           "where sotr.lab_id = " + str(lab_id) + " " \
                                           "and (sotr.datauvolen > current_date or sotr.datauvolen is null) " \
                                           "and sotr.FIO like '" + str(
                                           fio) + "%'" \
                                           "AND a.room <> '' AND a.building = '" + str(id) + "'"
                                else:
                                    sqltab_n = "SELECT (select short_name from struktura where id =  lvl3_div_code) as lvl3_div_name, " \
                                               "(select short_name from struktura where id =  topparent_code) as topparent_name, " \
                                               "(select short_name from struktura where id =  subtopparent_code) as subtopparent_name, " \
                                               "sotr.person_id " \
                                               "AS " \
                                               "kod_fl, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO, sotr.otdel" \
                                               ", sotr.division, sotr.shtat_direct, sotr.post, sotr.category, sotr.stavka" \
                                               ", room" \
                                               ", building " \
                                               "from sotrudniki sotr " \
                                               "left join accommodation_v2 a " \
                                               "on " \
                                               "sotr.tab_n = a.tab_n " \
                                               "where (sotr.datauvolen > current_date or sotr.datauvolen is null) " \
                                               "and sotr.FIO like '" + str(fio) + "%'" \
                                               "AND a.room <> '' AND a.building = '" + str(id) + "'"
                        else:
                            if lab_id != '':
                                sqltab_n = "SELECT (select short_name from struktura where id =  lvl3_div_code) as lvl3_div_name, " \
                                           "(select short_name from struktura where id =  topparent_code) as topparent_name, " \
                                           "(select short_name from struktura where id =  subtopparent_code) as subtopparent_name, " \
                                           "sotr.person_id " \
                                           "AS " \
                                           "kod_fl, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO, sotr.otdel" \
                                           ", sotr.division, sotr.shtat_direct, sotr.post, sotr.category, sotr.stavka" \
                                           ", room" \
                                           ", building " \
                                           "from sotrudniki sotr " \
                                           "left join accommodation_v2 a " \
                                           "on " \
                                           "sotr.tab_n = a.tab_n " \
                                           "where sotr.lab_id = " + str(lab_id) + " " \
                                           "and (sotr.datauvolen > current_date or sotr.datauvolen is null) " \
                                           "and sotr.FIO like '" + str(
                                           fio) + "%'" \
                                           "AND a.room <> '' AND a.building <> ''"
                            else:
                                sqltab_n = "SELECT (select short_name from struktura where id =  lvl3_div_code) as lvl3_div_name, " \
                                           "(select short_name from struktura where id =  topparent_code) as topparent_name, " \
                                           "(select short_name from struktura where id =  subtopparent_code) as subtopparent_name, " \
                                           "sotr.person_id " \
                                           "AS " \
                                           "kod_fl, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO, sotr.otdel" \
                                           ", sotr.division, sotr.shtat_direct, sotr.post, sotr.category, sotr.stavka" \
                                           ", room" \
                                           ", building " \
                                           "from sotrudniki sotr " \
                                           "left join accommodation_v2 a " \
                                           "on " \
                                           "sotr.tab_n = a.tab_n " \
                                           "where (sotr.datauvolen > current_date or sotr.datauvolen is null) " \
                                           "and sotr.FIO like '" + str(fio) + "%'" \
                                           "AND a.room <> '' AND a.building <> ''"
                        print(sqltab_n)
                        cursor.execute(sqltab_n)
                        data_tab_n = cursor.fetchall()
                        print(data_tab_n)

                        if len(data_tab_n) == 0:
                            resp = make_response("Employee not found", 404)
                        else:
                            tab_n = data_tab_n[0][4]
                            print(tab_n)

                            if "building" in list(params.keys()):
                                building = params['building'].upper()
                                if len(building) > 1:
                                    if building[1].isdigit():
                                        print('digit')
                                        if building[0].upper() == "К" or building[0].upper() == "K":
                                            building = building[1:]
                                print(building)
                                id = 0
                                for i in data_lab:
                                    print(i)
                                    short_name = i[1].split()[0]
                                    if short_name == building:
                                        id = i[0]
                                        break
                                if id == 0:
                                    resp = make_response("Building not found", 404)
                                else:
                                    sqlroom = "SELECT room from accommodation_v2 where building = '" + str(
                                        id) + "' and tab_n = '" + str(tab_n) + "' order by otype"
                                    cursor.execute(sqlroom)
                                    data_room = cursor.fetchall()
                                    print(data_room)
                                    if len(data_room) == 0 or data_room[0][0] == '':
                                        resp = make_response("Room not found", 404)
                                    else:
                                        room = data_room[0][0]
                                        floor = room[0]
                                        print(room, floor)

                                        sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                            id) + "' and floor_num = '" + \
                                                       str(floor) + "' and obj_type = 'building_image'"
                                        sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                            id) + "' and floor_num = '" + \
                                                         str(floor) + "' and obj_type = 'rooms'"
                                        cursor.execute(sqlcheck_img)
                                        data_img = cursor.fetchall()
                                        cursor.execute(sqlcheck_rooms)
                                        data_rooms = cursor.fetchall()
                                        # if len(data_img) > 0 and (len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                                        #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                        #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(id) + "/plan.cfg&" \
                                        #           "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                                        #     resp = make_response(rez, 200)
                                        # else:
                                        #     rez = "Building " + str(building) + ", floor " + str(floor) + ", room " + str(room) + ". Plan not found"
                                        #     resp = make_response(rez, 200)
                                        rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                              "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                            lab_name.lower()) + "/plan.cfg&" \
                                                                "floor=" + str(floor) + "&room=" + str(
                                            room) + "&bld_id=" + str(id) + "&fio=" + str(fio) + "'}</script>"
                                        resp = make_response(rez, 200)
                            else:
                                sqlroom = "SELECT room, building from accommodation_v2 where tab_n = '" + str(
                                    tab_n) + "' order by otype"
                                cursor.execute(sqlroom)
                                data_room = cursor.fetchall()
                                print(data_room)
                                if len(data_room) == 0 or len(data_room[0][0]) == 0:
                                    resp = make_response("Room not found", 404)
                                else:
                                    room = data_room[0][0]
                                    floor = room[0]
                                    id = data_room[0][1]
                                    print(room, floor, id)

                                    sqlbuild = "SELECT obj_name from map_lhep where id = '" + str(id) + "'"
                                    cursor.execute(sqlbuild)
                                    data_build = cursor.fetchall();
                                    building = data_build[0][0]

                                    sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                   str(floor) + "' and obj_type = 'building_image'"
                                    sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                     str(floor) + "' and obj_type = 'rooms'"
                                    cursor.execute(sqlcheck_img)
                                    data_img = cursor.fetchall()
                                    cursor.execute(sqlcheck_rooms)
                                    data_rooms = cursor.fetchall()
                                    # if len(data_img) > 0 and (
                                    #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                                    #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                    #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                                    #         id) + "/plan.cfg&" \
                                    #               "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                                    #     resp = make_response(rez, 200)
                                    # else:
                                    #     rez = "Building " + str(building) + ", floor " + str(floor) + ", room " + str(
                                    #         room) + ". Plan not found"
                                    #     resp = make_response(rez, 200)
                                    rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                          "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                        lab_name.lower()) + "/plan.cfg&" \
                                                            "floor=" + str(floor) + "&room=" + str(
                                        room) + "&bld_id=" + str(id) + "&fio=" + str(fio) + "'}</script>"
                                    resp = make_response(rez, 200)
                    elif "jinr_id" in params.keys():
                        jinr_id = params['jinr_id']

                        sqlfio = "SELECT FIO from sotrudniki where person_id = '" + str(jinr_id) + "'"
                        cursor.execute(sqlfio)
                        data_fio = cursor.fetchall()
                        if len(data_fio) == 0:
                            resp = make_response("Wrong employee ID", 404)
                        else:
                            fio = data_fio[0][0]

                            if "building" in list(params.keys()):
                                building = params['building'].upper()
                                if len(building) > 1:
                                    if building[1].isdigit():
                                        print('digit')
                                        if building[0].upper() == "К" or building[0].upper() == "K":
                                            building = building[1:]
                                print(building)
                                id = 0
                                for i in data_lab:
                                    print(i)
                                    short_name = i[1].split()[0]
                                    if short_name == building:
                                        id = i[0]
                                        break
                                if id == 0:
                                    resp = make_response("Building not found", 404)
                                else:
                                    sqlroom = "SELECT room from accommodation_v2 where building = '" + str(
                                        id) + "' and kod_fl = '" + str(jinr_id) + "' order by otype"
                                    cursor.execute(sqlroom)
                                    data_room = cursor.fetchall()
                                    print(data_room)
                                    if len(data_room) == 0 or data_room[0][0] == '':
                                        resp = make_response("Room not found", 404)
                                    else:
                                        room = data_room[0][0]
                                        floor = room[0]
                                        print(room, floor)

                                        sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                            id) + "' and floor_num = '" + \
                                                       str(floor) + "' and obj_type = 'building_image'"
                                        sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                            id) + "' and floor_num = '" + \
                                                         str(floor) + "' and obj_type = 'rooms'"
                                        cursor.execute(sqlcheck_img)
                                        data_img = cursor.fetchall()
                                        cursor.execute(sqlcheck_rooms)
                                        data_rooms = cursor.fetchall()
                                        # if len(data_img) > 0 and (
                                        #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                                        #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                        #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                                        #         id) + "/plan.cfg&" \
                                        #               "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                                        #     resp = make_response(rez, 200)
                                        # else:
                                        #     rez = "Building " + str(building) + ", floor " + str(floor) + ", room " + str(
                                        #         room) + ". Plan not found"
                                        #     resp = make_response(rez, 200)
                                        rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                              "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                            lab_name.lower()) + "/plan.cfg&" \
                                                                "floor=" + str(floor) + "&room=" + str(
                                            room) + "&bld_id=" + str(id) + "&fio=" + str(fio) + "'}</script>"
                                        resp = make_response(rez, 200)
                            else:
                                sqlroom = "SELECT room, building from accommodation_v2 where kod_fl = '" + str(
                                    jinr_id) + "' order by otype"
                                cursor.execute(sqlroom)
                                data_room = cursor.fetchall()
                                print(data_room)
                                if len(data_room) == 0 or data_room[0][0] == '':
                                    resp = make_response("Room not found", 404)
                                else:
                                    room = data_room[0][0]
                                    floor = room[0]
                                    id = data_room[0][1]
                                    print(room, floor, id)

                                    sqlbuild = "SELECT obj_name from map_lhep where id = '" + str(id) + "'"
                                    cursor.execute(sqlbuild)
                                    data_build = cursor.fetchall();
                                    building = data_build[0][0]

                                    sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                   str(floor) + "' and obj_type = 'building_image'"
                                    sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                     str(floor) + "' and obj_type = 'rooms'"
                                    cursor.execute(sqlcheck_img)
                                    data_img = cursor.fetchall()
                                    cursor.execute(sqlcheck_rooms)
                                    data_rooms = cursor.fetchall()
                                    # if len(data_img) > 0 and (
                                    #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                                    #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                    #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                                    #         id) + "/plan.cfg&" \
                                    #               "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                                    #     resp = make_response(rez, 200)
                                    # else:
                                    #     rez = "Building " + str(building) + ", floor " + str(floor) + ", room " + str(
                                    #         room) + ". Plan not found"
                                    #     resp = make_response(rez, 200)
                                    rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                          "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                        lab_name.lower()) + "/plan.cfg&" \
                                                            "floor=" + str(floor) + "&room=" + str(
                                        room) + "&bld_id=" + str(id) + "&fio=" + str(fio) + "'}</script>"
                                    resp = make_response(rez, 200)
                    elif "building" in params.keys():
                        if "floor" in params.keys():
                            floor = params['floor']
                            building = params['building'].upper()
                            if len(building) > 1:
                                if building[1].isdigit():
                                    print('digit')
                                    if building[0].upper() == "К" or building[0].upper() == "K":
                                        building = building[1:]
                            print(building)
                            id = 0
                            for i in data_lab:
                                print(i)
                                short_name = i[1].split()[0]
                                if short_name == building:
                                    id = i[0]
                                    break
                            if id == 0:
                                resp = make_response("Building not found", 404)
                            else:
                                if "geo" in params.keys():
                                    geo = params['geo']
                                    sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                   str(floor) + "' and obj_type = 'building_image'"
                                    sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                     str(floor) + "' and obj_type = 'rooms'"
                                    cursor.execute(sqlcheck_img)
                                    data_img = cursor.fetchall()
                                    cursor.execute(sqlcheck_rooms)
                                    data_rooms = cursor.fetchall()
                                    # if len(data_img) > 0 and (
                                    #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                                    #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                    #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                                    #         id) + "/plan.cfg&" \
                                    #               "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                                    #     resp = make_response(rez, 200)
                                    # else:
                                    #     rez = "Building " + str(building) + ", floor " + str(floor) + ", geo " + str(
                                    #         geo) + ". Plan not found"
                                    #     resp = make_response(rez, 200)
                                    rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                          "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                        lab_name.lower()) + "/plan.cfg&" \
                                                            "floor=" + str(floor) + "&geo=" + str(
                                        geo) + "&bld_id=" + str(id) + "'}</script>"
                                    resp = make_response(rez, 200)
                                elif "room" in params.keys():
                                    room = params['room']
                                    sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                   str(floor) + "' and obj_type = 'building_image'"
                                    sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                     str(floor) + "' and obj_type = 'rooms'"
                                    cursor.execute(sqlcheck_img)
                                    data_img = cursor.fetchall()
                                    cursor.execute(sqlcheck_rooms)
                                    data_rooms = cursor.fetchall()
                                    # if (len(data_img) > 0 or len(data_img[0][0])) and (
                                    #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                                    #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                    #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                                    #         id) + "/plan.cfg&" \
                                    #               "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                                    #     resp = make_response(rez, 200)
                                    # else:
                                    #     rez = "Building " + str(building) + ", floor " + str(floor) + ", room " + str(
                                    #         room) + ". Plan not found"
                                    #     resp = make_response(rez, 200)
                                    rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                          "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                        lab_name.lower()) + "/plan.cfg&" \
                                                            "floor=" + str(floor) + "&room=" + str(
                                        room) + "&bld_id=" + str(id) + "'}</script>"
                                    resp = make_response(rez, 200)
                                else:
                                    sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                   str(floor) + "' and obj_type = 'building_image'"
                                    sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                     str(floor) + "' and obj_type = 'rooms'"
                                    cursor.execute(sqlcheck_img)
                                    data_img = cursor.fetchall()
                                    cursor.execute(sqlcheck_rooms)
                                    data_rooms = cursor.fetchall()
                                    # if len(data_img) > 0 and (
                                    #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                                    #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                    #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                                    #         id) + "/plan.cfg&" \
                                    #               "floor=" + str(floor) + "'}</script>"
                                    #     resp = make_response(rez, 200)
                                    # else:
                                    #     rez = "Building " + str(building) + ", floor " + str(floor) + ". Plan not found"
                                    #     resp = make_response(rez, 200)
                                    rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                          "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                        lab_name.lower()) + "/plan.cfg&" \
                                                            "floor=" + str(floor) + "&bld_id=" + str(
                                        id) + "'}</script>"
                                    resp = make_response(rez, 200)
                        else:
                            building = params['building'].upper()
                            if len(building) > 1:
                                if building[1].isdigit():
                                    print('digit')
                                    if building[0].upper() == "К" or building[0].upper() == "K":
                                        building = building[1:]
                            print(building)
                            id = 0
                            for i in data_lab:
                                print(i)
                                short_name = i[1].split()[0]
                                if short_name == building:
                                    id = i[0]
                                    break
                            if id == 0:
                                resp = make_response("Building not found", 404)
                            else:
                                if "room" in params.keys():
                                    room = params['room']
                                    floor = room[0]

                                    sqlcheck_img = "SELECT image from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                   str(floor) + "' and obj_type = 'building_image'"
                                    sqlcheck_rooms = "SELECT json from buildings where building_id = '" + str(
                                        id) + "' and floor_num = '" + \
                                                     str(floor) + "' and obj_type = 'rooms'"
                                    cursor.execute(sqlcheck_img)
                                    data_img = cursor.fetchall()
                                    cursor.execute(sqlcheck_rooms)
                                    data_rooms = cursor.fetchall()
                                    # if (len(data_img) > 0 or len(data_img[0][0])) and (
                                    #         len(data_rooms) > 0 or len(data_rooms[0][0]) > 0):
                                    #     rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                    #           "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(lab_name) + "/" + str(
                                    #         id) + "/plan.cfg&" \
                                    #               "floor=" + str(floor) + "&room=" + str(room) + "'}</script>"
                                    #     resp = make_response(rez, 200)
                                    # else:
                                    #     rez = "Building " + str(building) + ", floor " + str(floor) + ", room " + str(
                                    #         room) + ". Plan not found"
                                    #     resp = make_response(rez, 200)
                                    rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                          "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                        lab_name.lower()) + "/plan.cfg&" \
                                                            "floor=" + str(floor) + "&room=" + str(
                                        room) + "&bld_id=" + str(id) + "'}</script>"
                                    resp = make_response(rez, 200)
                                else:
                                    rez = "<!DOCTYPE html><html lang='ru'><head></head><body></body><script>window.onload = function(){location.href='" \
                                          "https://hr.jinr.ru/hrlhep/hrlhep?c=plans/" + str(
                                        lab_name.lower()) + "/plan.cfg&" \
                                                            "&bld_id=" + str(id) + "'}</script>"
                                    resp = make_response(rez, 200)
            db.close()

    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp



@app.route('/get_map_object_types', methods=['GET'])
def get_map_object_types():
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print("Database version : %s " % data)
        sql1 = "SELECT CONCAT" \
               "(\"\'\", parm_name,\"\':" \
               "{\'name\':\'\", parm_name,\"\'" \
               ",\'val1\':\'\", val1,\"\'" \
               ",\'val2\':\'\", val2,\"\'" \
               ",\'val3\':\'\", val3,\"\'" \
               ",\'size_x\':\'\", size_x,\"\'" \
               ",\'size_y\':\'\", size_y,\"\'},\") " \
               "as map_object_types from params " \
               "where parm_type = 'map_object_type' " \
               "or parm_type = 'map_marker_type' " \
               "or parm_type = 'map_figure_type' " \
               "order by parm_type;"
        print(sql1)
        print('-----------------------------------------------')
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        data_str = '{'
        for i in data:
            data_str += i[0].replace("'", "\"")
        data_str = data_str[:-1]
        data_str += '}'
        print(data_str, len(data_str))
        resp = make_response(data_str, 200)
        db.close()
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

@app.route('/get_roads', methods=['GET'])
def get_roads():
    try:
        db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
        cursor = db.cursor()
        # execute SQL query using execute() method.
        cursor.execute("SELECT VERSION()")
        # Fetch a single row using fetchone() method.
        data = cursor.fetchone()
        print("Database version : %s " % data)
        sql1 = "select CONCAT" \
               "(\"\'\", id,\"T\':" \
               "{\'descr\':\'\'" \
               ",\'tooltip\':\'\",tooltip,\"\'" \
               ",\'obj_name\':\'\",obj_name,\"\'" \
               ",\'points\':\'\",points,\"\'" \
               ",\'size_x\':\'\",size_x,\"\'" \
               ",\'size_y\':\'\",size_y,\"\'" \
               ",\'o_type\':\'\",o_type,\"\'" \
               ",\'show_tt\':\'\",show_tt,\"\'" \
               ",\'tooltip\':\'\",tooltip,\"\'" \
               ",\'map_object_type\':\'\",map_object_type,\"\'" \
               ",\'div_owner\':\'\",div_owner,\"\'},\n\") " \
               "as roads  from map_lhep  where 1=1  and  map_object_type <> 'b_plan'order by map_object_type, obj_name"
        print(sql1)
        print('-----------------------------------------------')
        cursor.execute(sql1)
        # Fetch a single row using fetchone() method.
        data = cursor.fetchall()
        data_str = '{'
        for i in data:
            data_str += i[0].replace("'", "\"")
        data_str = data_str[:-2]
        data_str += '}'
        print(data_str, len(data_str))
        print('------------------------------------------------')
        data_json = json.loads(data_str)
        resp = make_response(data_str, 200)
        db.close()
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response(res_data, 400)

    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'

    return resp

#params['floor_info'], params['angle]
@app.route('/rotate_floor', methods=['GET'])
def rotating():
    params = {}
    for i in request.args:
        params[str(i).lower()] = request.args[i]
    inprm = str(params)
    try:
        angle = int(params['angle'])
        check = json.loads(params['floor_info'])
        print(type(check) == list and len(check) > 0, len(check))
        if type(check) == list and len(check) > 0:
            for j in range(len(check)):
                print(type(check[j]), list(check[j]['properties'].keys()))
                if type(check[j]) == dict:
                    dic = check[j]
                    coord = dic['geometry']['coordinates']
                    new_coord = []
                    for j in coord:
                        dot = j
                        new_dot = rotateCoord(dot, angle)
                        new_coord.append(new_dot)
                    dic['geometry']['coordinates'] = new_coord
        rez = json.dumps(check)
        resp = make_response(rez, 200)
    except Exception as e:
        exc_type, exc_value, exc_traceback = sys.exc_info()
        print("*** print_tb:")
        traceback.print_tb(exc_traceback, limit=1, file=sys.stdout)
        print("*** format_exc, first and last line:")
        res_data = traceback.format_exc().splitlines()
        print(res_data)
        resp = make_response('{"rc":-1}', 200)
    resp.headers['content-type'] = 'text/html'
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return resp


app.run(debug=False, host="0.0.0.0", port=8082,ssl_context=('jinr_ru_2024_10_26.crt', 'jinr_ru_2024_10_26.key'))

#app.run(debug=False, host="0.0.0.0", port=8082)
