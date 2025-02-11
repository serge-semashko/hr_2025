import pymysql
import base64
pymysql.install_as_MySQLdb()
import MySQLdb
import pymssql
import cv2
import numpy as np

aaa = pymssql.connect(server='159.93.146.130', user='semashko', password='_velikaja60_', database='DB_1C_2', timeout=10, login_timeout=10, charset='UTF-8', as_dict=False, host='', appname=None, port='1433')
