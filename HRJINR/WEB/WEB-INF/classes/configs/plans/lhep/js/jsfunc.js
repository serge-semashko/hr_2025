var cell = '';
var i_cell = 0;

var flagi = 0;
function DrawCell() {
    console.log('ok');

    var tbl = document.getElementById('room_tbl');
    var data_now = date_time();
    //cell += '<th style="width: 200px;">Coordinates</th>';
    cell += '<tr><th>Удаление</th><th>Коментарий</th><th>Документ (HTTP ссылка)</th><th>Дата изменения</th><th>Редактирование</th></tr>';
    cell += '<tr id="somerow"><td>  </td><td><input type="text" id="textbox1' + i_cell + '"name="Name"></td><td><input type="text" id="textbox2' + i_cell + '"name="Name"></td> <td id="datnow">' + data_now + '</td><td> </td></tr>';
    i_cell = 1;
    var k = 2;
    for (var i = 0; i < 1; i++) {
        //const row = document.createElement("tr");
        //k = i + 1;
        //<button class="button1">Добавить</button>
        //cell += '<tr><td></td><td>Договор с ООО жулик на ремонт</td><td>данныеHTTPS://sed.jinr.ru/asdasdtd><td>данные</td><td> </td></tr>';
        //cell += '<tr style ="width: 20px;"><td><input type="text" id="textbox' + i + '"name="Name"></td></tr>';
    }

    document.getElementById('room_tbl').innerHTML = cell;
    console.log('ok');

}
//document.querySelector('.button2').onclick = function () {
//    alert("Вы нажали на кнопку");
//}
var button_del = document.querySelector('.button_del');
button_del.addEventListener('click', function () {
    console.log('del');
    //$('#room_tbl tr').find('.last-child').remove();
    var allRows = document.getElementById('room_tbl').rows;
    if (allRows.length > 1) {
        allRows[allRows.length - 1].remove();
        i_cell = i_cell - 1;
    }



});
var documents_mas = [];
var button_prov = document.querySelector('.button_prov');
button_prov.addEventListener('click', function () {
    let trs = document.querySelectorAll('tr');
    documents_mas = [];

    for (i = 0; i < i_cell; i = i + 1) {
        var startX = (document.getElementById('textbox1' + i).value);
        var startY = (document.getElementById('textbox2' + i).value);
        let td = trs[i + 1].querySelectorAll('td')[3];
        var start1 = td.innerHTML;
        if (startX != '' && startY != '') {
            d = { "commentary": startX, "document": startY, "date": start1 };
            documents_mas.push(d);
        }


    }
    console.log(documents_mas);
    //console.log("Del", cell.length);
    //for (var i = 0; i < cell.length; i++) {
    //    //const row = document.createElement("tr");
    //    //k = i + 1;
    //    //<button class="button1">Добавить</button>
    //    //cell = '<tr><td></td><td>Договор с ООО жулик на ремонт</td><td>данныеHTTPS://sed.jinr.ru/asdasdtd><td>данные</td><td> </td></tr>';
    //    //cell += '<tr style ="width: 20px;"><td><input type="text" id="textbox' + i + '"name="Name"></td></tr>';
    //}
    //document.getElementById('room_tbl').innerHTML = cell;
});
var button_add = document.querySelector('.button_add');
button_add.addEventListener('click', function () {
    var data_now = date_time();
    cell = '<tr><td>  </td><td><input type="text" id="textbox1' + i_cell + '"name="Name"></td><td><input type="text" id="textbox2' + i_cell + '"name="Name"></td> <td>' + data_now + '</td><td> </td></tr>';

    //document.getElementById('room_tbl').innerHTML = cell;
    i_cell = i_cell + 1;
    const template = document.createElement("template");
    template.innerHTML = cell;
    const node = template.content.firstElementChild;

    var foo = document.getElementById("room_tbl");
    var bar = document.getElementById("room_tbl");
    var rows = foo.rows;
    var lastRow = rows[rows.length - 1];
    var newRow = cloneRow(node, true, bar);

    function cloneRow(row, append, parent) {
        var newRow = row.cloneNode(true);
        if (append) {
            if (parent) {
                parent.appendChild(newRow);
            }
        }
        return newRow;
    }

});



var btn = document.getElementsByClassName('button1');
for (var i = 0; i < btn.length; i++) {
    // console.log('holla');
    var data_now = date_time();
    btn[i].onclick = function () {
        //  alert(this.id)
        cell += '<tr><td> </td><td><input type="text" id="textbox' + i + '"name="Name"></td><td><input type="text" id="textbox' + i + '"name="Name"></td> <td id="data_now">' + data_now + '</td><td> <button class="button2">Cохранить или Редактировать</button> </td></tr>';

        document.getElementById('room_tbl').innerHTML = cell;
    };
}
function zero_first_format(value) {
    if (value < 10) {
        value = '0' + value;
    }
    return value;
}
function date_time() {
    var current_datetime = new Date();
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth() + 1);
    var year = current_datetime.getFullYear();
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
    var seconds = zero_first_format(current_datetime.getSeconds());

    return day + "." + month + "." + year;
}
var button_save = document.querySelector('.button_save');
button_save.addEventListener('click', function () {
    console.log("Save");
    let trs = document.querySelectorAll('tr');
    documents_mas = [];

    for (i = 0; i < i_cell; i = i + 1) {
        var startX = (document.getElementById('textbox1' + i).value);
        var startY = (document.getElementById('textbox2' + i).value);
        let td = trs[i + 1].querySelectorAll('td')[3];
        var start1 = td.innerHTML;
        if (startX != '' && startY != '') {
            d = { "commentary": startX, "document": startY, "date": start1 };
            documents_mas.push(d);
        }
    }
    console.log(documents_mas);
    json_descr = JSON.stringify(documents_mas);
    var floor_num = -1000
    var build_id = document.getElementById("select_get_building_id");
    num = build_id.options[build_id.selectedIndex].value;
    build_id = num;
    saveBuildingObject(build_id, floor_num, 'building_descr', json_descr);

});