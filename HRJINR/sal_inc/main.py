import datetime
import xlsxwriter
sql1 = """
select
(select short_name from struktura where id =  lvl3_div_code) as lvl3_div_name,
(select short_name from struktura where id =  topparent_code) as topparent_name,
(select short_name from struktura where id =  subtopparent_code) as subtopparent_name,
sotr.person_id, sotr.tab_n, sotr.F, sotr.I, sotr.O, sotr.FIO, sotr.otdel
, sotr.division, sotr.shtat_direct, sotr.post, sotr.category,sotr.stavka
, round(oklad.oklad,0) as oklad, ifnull(oklad.kompens,0) as kompens
, round(ifnull(oklad.kompens,0)*oklad.oklad/100,0) as kompens_rub
, oklad.dopl_stepen
,round(ifnull(oklad.sovmeshenie,0)*oklad.oklad/100,0) as sovmeshenie
,case
when  (ifnull(sotr.DataUvolen-CURRENT_DATE,1)<0)   then 'Y'
else 'N' end as dismissed
,(select sum(percent) from FTE f where f.tab_n=sotr.tab_n and f.topic_id = 1065 ) as fte_1065
,(select sum(percent) from FTE f where f.tab_n=sotr.tab_n  ) as fte_full
from sotrudniki sotr
left join oklad on sotr.tab_n=oklad.tab_n
where lab_id = 100000
and sotr.TopParent_code like '120000%'
and (sotr.datauvolen > current_date or sotr.datauvolen is null)
order by sotr.FIO
"""
import xlsxwriter
from xlsxwriter.utility import xl_rowcol_to_cell
import os
if os.path.isfile("file.xlsx"):
    os.remove("file.xlsx")
workbook = xlsxwriter.Workbook("file.xlsx")
['']
from datetime import datetime
current_month = int(datetime.now().strftime('%m')) # 02 This is 0 padded
current_month_text = datetime.now().strftime('%h') # Feb
current_month_text = datetime.now().strftime('%B') # February
current_day = int(datetime.now().strftime('%d'))   # 23 This is also padded
current_day_text = datetime.now().strftime('%a')  # Fri
current_day_full_text = datetime.now().strftime('%A')  # Friday

current_weekday_day_of_today = datetime.now().strftime('%w') # 5  Where 0 is Sunday and 6 is Saturday.

current_year_full = datetime.now().strftime('%Y')  # 2018
current_year_short = datetime.now().strftime('%y')  # 18 without centuryif current_month<
if current_month<2:
    quit()

if current_day>20:
    last_month= current_month - 1
else:
    last_month = current_month - 2
titles = [
    "Таб.",12, "ФИО",40, "Отделение",10, "Отдел / сектор",20, "Должность",10,  "Категория ",12,  "Ставка",6,"Начислено всего ",11 ," Среднее", 9,  " Оклад  ",10,
        " РВУ / ОРВУ  ",10, " Допл.за  степень  ",10, " Надбавки / Совмещение  ",10, " Итого",10]
for i in range(last_month+1):
    mnum = i
    if i == 0:
        mnum = 2024
    ws = workbook.add_worksheet(str(mnum))
    for j in range(len(titles)//2):

        cell = xl_rowcol_to_cell(1, 1)
        cell = xl_rowcol_to_cell(1, j)
        coln = xlsxwriter.utility.xl_col_to_name(j)
        # print(        titles[j * 2])
        ws.write(cell, titles[j*2])
        ws.set_column(coln+':'+coln, titles[j*2+1])

# ws.set_column("B:D", 22)
# # ws.set_column("0:1", 22)
#
# cell = xl_rowcol_to_cell(1, 2)
#


import pymysql
import pymssql
import base64
pymysql.install_as_MySQLdb()
import MySQLdb
print('1')
db = MySQLdb.connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", db="hrlhep")

print('2')
db_1c = pymssql.connect(server='159.93.146.130', user='semashko', password='_velikaja60_', database='DB_1C_2',
                        timeout=10,
                        login_timeout=10, charset='UTF-8', as_dict=False, host='', appname=None, port='1433')
cursor_1c = db_1c.cursor()

# db = connect(user="hrlhep", passwd="_t2El2jyK3wWv_", host="159.93.33.213", database="hrlhep")
cursor = db.cursor()
cursor.execute(sql1)
# data = cursor.fetchall()
# print(str(data))
columns = cursor.description
result = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
row = 1
ws =workbook.get_worksheet_by_name('1')
s1q_1c = """
SELECT concat('["',
            Code  ,'", "',Name_Rasch,'", "' ,round(Summa,0),'", "'  ,Ed,'", "'  ,Deistvie,'", "'  ,datebegin,'", "'   ,DateEnd,'", "'    ,Stavka,'"],')  as nadbavki
			FROM [DB_1C_2].[1c8_2].[LHE_Nadbavki]
        where tabn='#tab_n#'
        order by datebegin
"""
fo= open('log.txt','w')
# print('RESULT\n'+str(result))
for i in result:
    row += 1
    fam = i['F']
    alp = 'АБВабв'
    hex_string = "".join([hex(ord(c))[2:] for c in fam])
    hexalp = "".join([hex(ord(c))[2:] for c in alp])
    print(fam)
    # print(alp+' '+hexalp)

    c1c = db_1c.cursor()


    tab_n = i["tab_n"]
    year = 2024
    nadbav = f"""
    SELECT  Code  , Name_Rasch, round(Summa,0),Ed, Deistvie, datebegin,DateEnd,Stavka  as nadbavki
    			FROM [DB_1C_2].[1c8_2].[LHE_Nadbavki]
            where tabn='{tab_n}'
            order by datebegin
    """
    c1c.execute(nadbav)

    nadbd = c1c.fetchall()
    print(str(nadbd))

    # print(bytes(nadbav+'\n', 'utf-8'))
    oklad = 0
    sovmesh_abs = 0
    sovmesh_proc = 0
    kompens = 0
    kompens_abs = 0
    dopl_stepen = 0
    add_works_abs = 0
    add_works_proc = 0
    for nad in nadbd:
        code = nad[0]
        nname = nad[1].lower()
        # fam = nad[1]
        # hex_string = "".join([hex(ord(c))[2:] for c in fam])
        # print('              '+fam + ' ' + hex_string)


        # print(bytes('11111111111111\n', 'utf-8'))
        # n1 = nname.encode('utf8')
        # n2 = str(n1, encoding='utf8')
        # n1 = str(n1)
        # print(bytes(n1 + '\n', 'utf-8'))
        # print(bytes('222211111111\n'))
        # print(bytes(n2 + '\n', 'utf-8'))
        # print(bytes('33333333311111111\n', 'utf-8'))
        # print(bytes(nname + '\n', 'utf-8'))
        summa = nad[2]
        print(' NAME! '+nname+' summ='+str(summa))

        if nname.lower().find('совмещение') >= 0:
            print('совмещение')
            if (summa < 200):
                sovmesh_proc += summa
                continue
            else:
                sovmesh_abs += summa
                continue

        if nname.lower().find('степень') >= 0:
            print('степень')
            dopl_stepen += summa
            continue
        if nname.lower().find('компенсация') >= 0:
            print('компенсация')
            kompens += summa;
            continue
        # print('оклад' + ' ' + nname +' '+ str(nname.find(u'оклад'))+'\n')
        if nname.lower().find(u'оклад') >= 0:
            print('оклад')
            oklad = summa
            continue

        if (summa < 200):
            add_works_proc += summa
            print('add_works_proc')
            continue
        else:
            print('add_works_abs')
            add_works_abs += summa
            continue






    nach = f"""
        SELECT  month(period), sum(n.Rezultat) FROM [1c8_2].[LHE_Nachisleniya] n
    where n.Tabn = '{tab_n}' and year(period) = '{year}' and month(period)<= {last_month} GROUP BY month(period) order by month(period)
    """
    # print(str(nach))
    c2c = db_1c.cursor()
    c2c.execute(nach)
    rnach= c2c.fetchall()
    print(str(rnach)+'\n')
    # print(str(rnach))
    summ = 0
    # continue
    for m in (rnach):
        ss = workbook.get_worksheet_by_name(str(m[0]))
        cell = xl_rowcol_to_cell(row, 0)
        ss.write(cell, i["tab_n"])
        cell = xl_rowcol_to_cell(row, 1)
        ss.write(cell, i["FIO"])
        # <td>#topparent_name#</td>
        cell = xl_rowcol_to_cell(row, 2)
        ss.write(cell, i["topparent_name"])
        # <td>#subtopparent_name#</td>
        cell = xl_rowcol_to_cell(row, 3)
        ss.write(cell, i["subtopparent_name"])
        # <td>#post#</td>
        cell = xl_rowcol_to_cell(row, 4)
        ss.write(cell, i["post"])
        # <td>#category#</td>
        cell = xl_rowcol_to_cell(row, 5)
        ss.write(cell, i["category"])
        # <td >#stavka#</td>
        cell = xl_rowcol_to_cell(row, 6)
        ss.write(cell, i["stavka"])
        # <td>#payment#</td>
        cell = xl_rowcol_to_cell(row, 7)
        # ws.write(cell, i["payment"])
        # <td>#mean_payment#</td>
        cell = xl_rowcol_to_cell(row, 8)
        # ws.write(cell, i["mean_payment"])
        #
        # <td>#oklad#</td>
        cell = xl_rowcol_to_cell(row, 10)
        # ws.write(cell, i["subtopparent_name"])

        # <td>#kompens_abs#</td>рву
        cell = xl_rowcol_to_cell(row, 11)

        ss.write(cell, kompens_abs)

        # <td>#dopl_stepen#</td>
        cell = xl_rowcol_to_cell(row, 12)
        ss.write(cell, dopl_stepen)
        # <td>#doplaty_all#</td>
        cell = xl_rowcol_to_cell(row, 13)
        # ws.write(cell, i["subtopparent_name"])
        # <td>#summary#</td>

        # print(str(m))
        # print(str(float(m[1])))
        cell = xl_rowcol_to_cell(row, 7)
        summ += float(m[1])
        ss.write(cell, float(m[1]))



    ss = workbook.get_worksheet_by_name(str(2024))
    cell = xl_rowcol_to_cell(row, 0)
    ss.write(cell, i["tab_n"])
    cell = xl_rowcol_to_cell(row, 1)
    ss.write(cell, i["FIO"])
    # <td>#topparent_name#</td>
    cell = xl_rowcol_to_cell(row, 2)
    ss.write(cell, i["topparent_name"])
    # <td>#subtopparent_name#</td>
    cell = xl_rowcol_to_cell(row, 3)
    ss.write(cell, i["subtopparent_name"])
    # <td>#post#</td>
    cell = xl_rowcol_to_cell(row, 4)
    ss.write(cell, i["post"])
    # <td>#category#</td>
    cell = xl_rowcol_to_cell(row, 5)
    ss.write(cell, i["category"])
    # <td >#stavka#</td>
    cell = xl_rowcol_to_cell(row, 6)
    ss.write(cell, i["stavka"])
    # <td>#payment#</td>
    cell = xl_rowcol_to_cell(row, 7)
    # ws.write(cell, i["payment"])
    # <td>#mean_payment#</td>
    cell = xl_rowcol_to_cell(row, 8)
    # ws.write(cell, i["mean_payment"])
    #
    # <td>#oklad#</td>
    cell = xl_rowcol_to_cell(row, 10)
    # ws.write(cell, i["subtopparent_name"])

    # <td>#kompens_abs#</td>рву
    cell = xl_rowcol_to_cell(row, 11)

    ss.write(cell, kompens_abs)

    # <td>#dopl_stepen#</td>
    cell = xl_rowcol_to_cell(row, 12)
    ss.write(cell, dopl_stepen)
    # <td>#doplaty_all#</td>
    cell = xl_rowcol_to_cell(row, 13)
    # ws.write(cell, i["subtopparent_name"])
    # <td>#summary#</td>

    print(str(m))
    print(str(float(m[1])))
    cell = xl_rowcol_to_cell(row, 8)

    ss.write(cell, int(summ/last_month))

    cell = xl_rowcol_to_cell(row, 7)
    ss.write(cell, int(summ))


    # print(i)

workbook.close()


