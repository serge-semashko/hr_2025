import pymysql
import base64

pymysql.install_as_MySQLdb()
import MySQLdb
import pymssql
import cv2
import numpy as np

db_1c = pymssql.connect(server='159.93.146.130', user='semashko', password='_velikaja60_', database='DB_1C_2',
                        timeout=10,
                        login_timeout=10, charset='UTF-8', as_dict=False, host='', appname=None, port='1433')

db_hr = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")
cursor = db_hr.cursor()

select_subTopParent_code = """
        SELECT CONCAT('"',sotr.subTopParent_code,'|',sotr.category,'":',SUM(sotr.stavka),',')
    as subdiv_cat_cnt
  FROM sotrudniki sotr
    WHERE lab_id = 100000
        and(sotr.datauvolen > current_date or sotr.datauvolen is null)
        and( (sotr.datauvolen > '2024-3-01' or sotr.datauvolen is null)
        and(sotr.okonch_rab > '2024-3-01' or sotr.okonch_rab is null)
        and(sotr.nachalo_rab <'2024-1-01') )
        and sotr.subTopParent_code IN (select id FROM struktura str WHERE str.pid IN (select id FROM struktura str WHERE str.pid=100000 and str.view1=1) and str.view1=1) 
        GROUP BY sotr.category , sotr.subTopParent_code 
  union SELECT CONCAT('"',sotr.subTopParent_code,'":',SUM(sotr.stavka),',')
    as subdiv_cat_cnt
  FROM sotrudniki sotr
    WHERE lab_id = 100000
        and(sotr.datauvolen > current_date or sotr.datauvolen is null)
        and( (sotr.datauvolen > '2024-3-01' or sotr.datauvolen is null)
        and(sotr.okonch_rab > '2024-3-01' or sotr.okonch_rab is null)
        and(sotr.nachalo_rab <'2024-1-01') )
        and sotr.subTopParent_code IN (select id FROM struktura str WHERE str.pid IN (select id FROM struktura str WHERE str.pid=100000 and str.view1=1) and str.view1=1) 
        GROUP BY sotr.subTopParent_code ;

"""
cursor.execute(select_subTopParent_code)
data = cursor.fetchall()
for row in data:
    print(str(row))
