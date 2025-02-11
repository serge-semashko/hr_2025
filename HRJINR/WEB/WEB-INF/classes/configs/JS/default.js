// Заполняет массив sqlColNames названиями столбцов в выборке
function getMonthName(month) { 
    return ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь", "Октябрь","Ноябрь","Декабрь"][parseInt(month)-1]
}
//    return ["January","February","March","April","May","June","July","August","September", "October","November","December"][parseInt(month)-1]
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
function monthKvartal(month){
    month =+ month;
    switch (month) {
        case 1:return 'Янв.';
        case 2:return 'Фев.';
        case 3:return 'Март';
        case 4:return 'Апр.';
        case 5:return 'Май';
        case 6:return 'Июнь';
        case 7:return 'Июль';
        case 8:return 'Авг.';
        case 9:return 'Сен.';
        case 10:return 'Окт.';
        case 11:return 'Ноя.';
        case 12:return 'Дек.';
        case 101:return 'I Квартал';
        case 102:return 'II Квартал';
        case 103:return 'III Квартал';
        case 104:return 'IV Квартал';
    }
    if ((month>0)&(month<13) ) {
       return  getMonthName(month);
   }
   return 'Ошибка даты';
}
function getColNames(resultSet) {
    var metaData = resultSet.getMetaData();
    var numCols = metaData.getColumnCount();
    var sqlColNames = [];
    for (var i = 0; i < numCols; i++) {
        sqlColNames.push(metaData.getColumnLabel(i + 1));
    }
    return sqlColNames;
}
;
// Делает выборку из данных. SQl берется из sqlSection 
// sqlSection будет парсится как в $GETDATA
// Для каждой строки быборки заполняет строку параметров значениями и вызывает секцию execSection
// Полный аналог обработки секции [SQL] секцией [ITEM] в TableServiceSpecial
function getFio(fullFIO)
{
    var t = fullFIO.split(' ');
    var o = "";
    var shortFIO = t[0];
    if (typeof t[1] != "string") {
    } else {
        shortFIO += " " + t[1].charAt(0) + ".";
        if (typeof t[2] != "string") {
        } else {
            shortFIO += t[2].charAt(0) + ".";
        }
    }
    return shortFIO
}
function loopSQL(sqlSection, execSection) {
    _$LOG(2, "loopSQL sqlSection = " + sqlSection + " execSection" + execSection + "\n");
    var sql = BT.getCustomSectionAsString(sqlSection);
    if (sql.length === 0) {
//        BT.WriteLog(2, "<font color=red> loopSQL:" + sqlSection + ": SECTION NOT FOUND OR EMPTY</font>");
        return;
    }
    var r = dbUtil.getResults(sql);
    if (typeof r == "undefined") {
        return;
    }
    if (r == null) {
        return;
    }
    var headers = getColNames(r);
    var sumstr = "";
    while (r.next()) {
        for (i = 0; i < headers.length; i++) {
            var val = r.getString(i + 1);
            BT.addParameter(headers[i], val);
            sumstr += headers[i] + " = [" + val + "] ";
        }
//        _$LOG(2, "<br>Current row= " + sumstr + "\n", sectionLines, out);
        BT.getCustomSection("", execSection, out);
    }
    dbUtil.closeResultSet(r);
}
;
// Возвращает  параметр  по имени namr
function prm(name) {
    return BT.getParameter(null, null, name);
}
// Устанавливает   параметр  по имени namr
function setPrm(name, val) {
    BT.addParameter(name, val);
}
function prmSet(name, val) {
    BT.addParameter(name, val);
}
function setSessPrm(name, val) {
    
    BT._$SET_PARAMETERS("$SET_PARAMETERS_SESSION " + name+"="+val);
}
// исполняется аналогично $INCLUDE 

function _$INCLUDE(sectionName) {
    BT._$INCLUDE("$INCLUDE " + sectionName, sectionLines, out);
}
function _$GET_DATA(sectionName) {
    BT._$GET_DATA("$GET_DATA " + sectionName);
}


function _$LOG(lvl, msg) {
    BT.WriteLog(+lvl, msg);
}
var wf_ver=""; 
var jinr_divs = [{ pid:130000,lvl:3, id:173000, name:"Серпуховской научно-экспериментальный отдел"}, 
{ pid:613000,lvl:3, id:613003, name:"Группа № 3 эксплуатации технологических систем"}, 
{ pid:613000,lvl:3, id:613004, name:"Группа № 2 технической поддержки серверов и компьютерного парка ЛИТ"}, 
{ pid:150000,lvl:3, id:157000, name:"Сектор криофизических исследований"}, 
{ pid:150000,lvl:3, id:154000, name:"Сектор детекторных систем"}, 
{ pid:150000,lvl:3, id:156000, name:"Сектор рентгеновской спектроскопии"}, 
{ pid:150000,lvl:3, id:153000, name:"Сектор строу-детекторов"}, 
{ pid:130000,lvl:3, id:135000, name:"Научно-экспериментальный отдел физики столкновений тяжелых ионов на комплексе NICA"}, 
{ pid:607000,lvl:3, id:607010, name:"Сектор №1 методов моделирования физических процессов и анализа данных наблюдений"}, 
{ pid:150000,lvl:3, id:158000, name:"Научно-методический отдел кремниевых трековых систем"}, 
{ pid:150000,lvl:3, id:151000, name:"Научно–экспериментальный отдел автоматизации физических исследований"}, 
{ pid:120000,lvl:3, id:122000, name:"Научно-экспериментальный отдел физики тяжелых ионов"}, 
{ pid:120000,lvl:3, id:123000, name:"Научно-экспериментальный отдел спиновой физики малонуклонных систем"}, 
{ pid:130000,lvl:3, id:121000, name:"Научно-экспериментальный отдел многоцелевого детектора (MPD)"}, 
{ pid:120000,lvl:3, id:124000, name:"Сектор физики странных кварков в ядрах"}, 
{ pid:130000,lvl:3, id:131000, name:"Научно-экспериментальный отдел физики легких кварков и лептонов"}, 
{ pid:110000,lvl:3, id:112000, name:"Научно-экспериментальный отдел инженерно-физических проблем ускорителей"}, 
{ pid:110000,lvl:3, id:111000, name:"Научно-экспериментальный отдел ускорительных систем"}, 
{ pid:110000,lvl:3, id:115000, name:"Научно-экспериментальный отдел радиоэлектронных систем"}, 
{ pid:110000,lvl:3, id:117000, name:"Научно-исследовательский криогенный отдел"}, 
{ pid:110000,lvl:3, id:114000, name:"Научно-экспериментальный отдел инжекции и кольца Нуклотрона"}, 
{ pid:110000,lvl:3, id:116000, name:"Научно-инженерный отдел систем электропитания Нуклотрона"}, 
{ pid:110000,lvl:3, id:118000, name:"Диспетчерская служба Нуклотрона"}, 
{ pid:110000,lvl:3, id:113000, name:"Научно-технический отдел пучков"}, 
{ pid:110000,lvl:3, id:129000, name:"Научно-экспериментальный отдел сверхпроводящих магнитов и технологий"}, 
{ pid:643000,lvl:3, id:643003, name:"Группа №3 ремонта"}, 
{ pid:643000,lvl:3, id:643002, name:"Группа №2 по делопроизводству и кадрам"}, 
{ pid:643000,lvl:3, id:643004, name:"Группа №4 материально-технического снабжения"}, 
{ pid:643000,lvl:3, id:643001, name:"Группа №1 обслуживания"}, 
{ pid:613000,lvl:3, id:613010, name:"Сектор развития и эксплуатации сетевой инфраструктуры ОИЯИ"}, 
{ pid:613000,lvl:3, id:613001, name:"Группа №1 электротехнологическая"}, 
{ pid:170000,lvl:3, id:172000, name:"Цех опытно-экспериментального производства"}, 
{ pid:170000,lvl:3, id:171000, name:"Конструкторский отдел"}, 
{ pid:607000,lvl:3, id:607050, name:"Сектор №5 алгебраических и квантовых вычислений"}, 
{ pid:607000,lvl:3, id:607030, name:"Сектор №3 методов решения задач математической физики"}, 
{ pid:607000,lvl:3, id:607040, name:"Сектор №4 расчетов сложных физических систем"}, 
{ pid:607000,lvl:3, id:607020, name:"Сектор №2 методов моделирования нелинейных систем"}, 
{ pid:602000,lvl:3, id:602040, name:"Сектор №4 развития и сопровождения административных информационных систем"}, 
{ pid:602000,lvl:3, id:602020, name:"Сектор №2 программных серверов и управляющих ЭВМ"}, 
{ pid:602000,lvl:3, id:602030, name:"Сектор №3 распределенных  информационных систем и баз данных"}, 
{ pid:602000,lvl:3, id:602010, name:"Сектор №1 распределенных систем"}, 
{ pid:608000,lvl:3, id:608040, name:"Сектор №4 распределенных систем реального времени"}, 
{ pid:608000,lvl:3, id:608030, name:"Сектор №3 развития и стандартизации прикладного программного обеспечения"}, 
{ pid:608000,lvl:3, id:608010, name:"Сектор №1 сопровождения центральных информационных серверов ОИЯИ и средств  презентаций"}, 
{ pid:608000,lvl:3, id:608020, name:"Сектор №2 разработки математического обеспечения на базе больших программных комплексов и средств визуализации данных"}, 
{ pid:140000,lvl:3, id:142000, name:"Научно-экспериментальный отдел физики тяжелых ионов на LHC"}, 
{ pid:140000,lvl:3, id:134000, name:"Сектор физики на АТЛАС"}, 
{ pid:140000,lvl:3, id:141000, name:"Научно-экспериментальный отдел физики тяжелых ионов на RHIC"}, 
{ pid:140000,lvl:3, id:132000, name:"Научно-экспериментальный отдел физики на CMS"}, 
{ pid:190000,lvl:3, id:192000, name:"Хозяйственный отдел"}, 
{ pid:190000,lvl:3, id:191000, name:"Административное бюро"}, 
{ pid:195000,lvl:3, id:195003, name:"Группа №3 обеспечения и контроля закупок"}, 
{ pid:195000,lvl:3, id:195002, name:"Группа №2 планово-экономическая"}, 
{ pid:195000,lvl:3, id:195001, name:"Группа №1 материального учета и контроля"}, 
{ pid:189000,lvl:3, id:189003, name:"Группа №3 тепловодоснабжения и вентиляции"}, 
{ pid:130000,lvl:3, id:136000, name:"Научно-экспериментальный отдел спиновой структуры адронов и редких процессов"}, 
{ pid:189000,lvl:3, id:189004, name:"Группа №4 электротехническая - высоковольтного оборудования"}, 
{ pid:189000,lvl:3, id:189002, name:"Группа №2 низковольтного оборудования"}, 
{ pid:189000,lvl:3, id:189001, name:"Группа №1 высоковольтного оборудования"}, 
{ pid:110000,lvl:3, id:125000, name:"Диспетчерская служба NICA"}, 
{ pid:602000,lvl:3, id:602050, name:"Сектор №2 гетерогенных вычислений и квантовой информатики"}, 
{ pid:608000,lvl:3, id:608050, name:"Группа автоматизированных систем управления"}, 
{ pid:110000,lvl:3, id:126000, name:"Научно-экспериментальный сектор охлаждения пучков"}, 
{ pid:130000,lvl:3, id:137000, name:"Научно-экспериментальный отдел барионной материи на Нуклотроне"}, 
{ pid:100000,lvl:2, id:102000, name:"Группа советников и консультантов"}, 
{ pid:100000,lvl:2, id:150000, name:"Отделение №5 Научно–методических исследований и инноваций"}, 
{ pid:100000,lvl:2, id:110000, name:"Отделение №1 Ускорительное"}, 
{ pid:100000,lvl:2, id:130000, name:"Отделение №3 Физики адронов"}, 
{ pid:100000,lvl:2, id:120000, name:"Отделение №2 Физики на ускорительном комплексе Нуклотрон-NICA"}, 
{ pid:100000,lvl:2, id:195000, name:"Планово-финансовое бюро"}, 
{ pid:100000,lvl:2, id:189000, name:"Инженерный энерготехнологический отдел"}, 
{ pid:100000,lvl:2, id:190000, name:"Административно-хозяйственное подразделение"}, 
{ pid:100000,lvl:2, id:101000, name:"Руководство"}, 
{ pid:100000,lvl:2, id:140000, name:"Отделение №4 Физики на встречных пучках"}, 
{ pid:600000,lvl:2, id:613000, name:"Инженерно-технологический отдел"}, 
{ pid:100000,lvl:2, id:170000, name:"Отделение №6 Главного инженера"}, 
{ pid:600000,lvl:2, id:601000, name:"Руководство"}, 
{ pid:600000,lvl:2, id:607000, name:"Научный отдел вычислительной физики"}, 
{ pid:600000,lvl:2, id:602000, name:"Научно-технический отдел внешних коммуникаций и распределенных информационных систем"}, 
{ pid:600000,lvl:2, id:648000, name:"Научный центр исследований и  разработок информационных систем"}, 
{ pid:600000,lvl:2, id:608000, name:"Научно-технический отдел программного и информационного обеспечения"}, 
{ pid:600000,lvl:2, id:609000, name:"Сектор ученого секретаря"}, 
{ pid:600000,lvl:2, id:643000, name:"Отдел производственно-технического и хозяйственного обслуживания"}, 
{ pid:100000,lvl:2, id:103000, name:"Сектор информационно-сетевых технологий"}, 
{ pid:600000,lvl:2, id:606000, name:"Группа по делопроизводству, кадрам и материально-техническому снабжению"}]



function divFunc(id) {

    var item = "";
    var flag = 0;
    var lvl = 1;
    for (i in lit_divs) {
        if (id == lit_divs[i].id) {
            var str = lit_divs[i].name;
            lvl = lit_divs[i].lvl;
            break;
        }
    }
    if (lvl == 2) {
        str.replace(/,/g, '');
        var arr = str.split(/[\s-]+/);

        if (arr.length == 1) {
            return (str);
        } else {
            for (i in arr) {
                if (arr[i].length > 2) {
                    item += arr[i][0].toUpperCase();
                } else {
                    item += ' ' + arr[i] + ' ';
                }
            }
            return item;
        }
    }
    if (lvl == 3) {
        str.replace(/,/g, '');
        var arr = str.split(/[\s-]+/);
        var index = 0;
        item = arr[0] + ' ';
        for ( i = 1; i < arr.length; i++) {

                if (arr[i].length >= 5) {

                    if (arr[i][0].toUpperCase() == arr[i][0]) {

                        item += ' ' + arr[i] + ' ';

                    } else {

                        item += arr[i][0].toUpperCase();
                    }
                } else {

                    item += ' ' + arr[i] + ' ';

                }
        }
        return item;
    }
        
}
function divShort(name) {

    var str = name;
    var flag = 0;
    var lvl = 1;

    str.replace(/,/g, '');
    var arr = str.split(/[\s-]+/);
    var index = 0;
    item = arr[0] + ' ';
    for ( i = 1; i < arr.length; i++) {
            if (arr[i].length >= 5) {
                if (arr[i][0].toUpperCase() == arr[i][0]) {
                    item += ' ' + arr[i] + ' ';
                } else {
                    item += arr[i][0].toUpperCase();
                }
            } else {
                item += ' ' + arr[i] + ' ';
            }
    }
    return item;
        
}


//var wf_ver="_v2";
//        var personal_parameters ={};
//        function parsePersonalParameters(){
//            personal_parameters = prm('personal_parameters');
//            _$LOG(2,'<br>var personal parameters = '+personal_parameters+'<br>');
//            if( ( typeof personal_parameters === 'undefined') || (personal_parameters.length==0) ){
//                personal_parameters = '{}'  ;
//            }
//            personal_parameters = JSON.parse(personal_parameters);
//            _$LOG(2,'JSON personal parameters='+JSON.stringify(personal_parameters)+'<br>');
//            for (var el in personal_parameters){
//                var name = el;  
//                var value = JSON.stringify(personal_parameters[el]);
//                value=value.substr(1,value.length-2);
//                setSessPrm(name,value);
//                _$LOG(2,'pers param['+name+'] = '+value+'<br>');
//            }    
//       }
       
       
       
       
       
       
//       parsePersonalParameters();
//       function setPersonalParameter(paramName){
//            var prmval = prm(paramName);
//             _$LOG(2,'personal parameter name = '+paramName+" value=" +prmval+'<br>');
//            if ((typeof prmval === 'undefined') || (prmval.length==0)){
//               prmval = '';
//            } 
//             _$LOG(2,'personal parameter name = '+paramName+" value=" +prmval+'<br>');
//            personal_parameters[paramName]=prmval;
//            setSessPrm('personal_parameters',JSON.stringify(personal_parameters));
//             _$LOG(2,'personal parametrers = '+JSON.stringify(personal_parameters)+'<br>');
//            
//       }




