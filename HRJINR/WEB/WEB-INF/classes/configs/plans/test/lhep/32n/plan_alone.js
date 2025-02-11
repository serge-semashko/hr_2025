TEMPLATE


[comments]
author = Семашко
[end]



[divfunc]
function lhep_divFunc(id) {

        var item = "";
        var flag = 0;
        var lvl = 1;
        debugger;
        for (i in lab_divs) {
                if (id == lab_divs[i].id) {

                        var str = lab_divs[i].name;
                        lvl = lab_divs[i].lvl;
                        break;
                }

        }
        debugger;
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
                        //                console.log("item " + item);
                        return item;
                }
        }

        if (lvl == 3) {

                str.replace(/,/g, '');
                var arr = str.split(/[\s-]+/);
                var index = 0;
                item = arr[0] + ' ';
                for (let i = 1; i < arr.length; i++) {

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
                //console.log("item " + item);
                return item;
        }
}



function lhep_divName(id) {

        var item = "";
        var flag = 0;
        var lvl = 1;
        let str = ' - ';
        for (i in lab_divs) {
                if (id == lab_divs[i].id) {

                        str = lab_divs[i].name;
                        lvl = lab_divs[i].lvl;
                        break;
                }

        }
        return str;
}



[end]


[load marks]
var icon_data = [];
var data_array = [];
function loadBuildingIcon(building_id, floor_id, object_type, func) {
        let url = 'https://LT-SVR230.jinr.ru:8082/load_object_data?' + "building_id=" + building_id.toString() +
                "&floor_num=" + floor_id + "&object_type=" + object_type.toString();
        //let url = 'http://127.0.0.1:8082/load_object_data?' + "building_id=" + building_id.toString() +
        // "&floor_num=" + floor_id + "&object_type=" + object_type.toString();
        fetch(url)
                .then((response) => {
                        if (response.ok) {
                                // console.log('load connected');
                                return response.json();
                        } else {
                                //   console.log('save failed');
                        }
                })
                .then((data) => {
                        func(data);
                });
}




function load_all_icon(floor_num, build_id) {
        object_type = 'markers';
        for (let i = 0; i < icon_data.length; i++) {
                icon_data[i].remove();
        }
        icon_data = [];
        data_array = [];
        loadBuildingIcon(build_id, floor_num, object_type, loadIcons);
}


function loadIcons(data) {
        return;
        //console.log(data + ' ' + data.length);
        for (let i = 0; i < data.length; i++) {
                console.log(icon_data);
                console.log(data[i]);
                coords = [data[i].geometry.coordinates[0] / 10 + 6, data[i].geometry.coordinates[1] / 10 - 2];
                obj_type = data[i].properties.type;
                obj_id = data[i].properties.id;
                obj_desc = data[i].properties.description;
                console.log('coord= ' + coords);
                console.log('type= ' + obj_type);
                let url1 = 'https://LT-SVR230.jinr.ru:8082/get_icon?' + "object_type=" + obj_type.toString() + "&object_name=" + obj_type.toString();
                var greenIcon = L.icon({
                        iconUrl: url1,
                        //                     iconSize: [38, 22], // size of the icon
                        iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                        popupAnchor: [- 3, - 76] // point from which the popup should open relative to the iconAnchor
                });
                //                fetch(url1).then((response) => {
                //                    if (response.ok) {
                //                        console.log('connected');
                //                        return response.text();
                //                    }
                //                }).then((data) => {
                //                    // console.log(data);
                //                    greenIcon.iconSize = data;
                //                });

                obj_name = data[i].properties.name;
                var green_mark = L.marker(coords, {
                        icon: greenIcon
                }).addTo(roomsGrp);
                //var green_tst =      L.circle(coords, {fillOpacity: 0.51, color: '##FF0000', radius: 10}).addTo(lit_map);




                //                    icon_data.push(green_mark);
                //                    let descr = "<a href='#' onclick='showIconDescr(" + obj_id + "," + (icon_data.length - 1) + ");'> Icon " + (icon_data.length - 1) + " </a><br>";

                //                    green_mark.bindPopup(descr, {
                //                        autoPanPaddingTopLeft: [50, 50]
                //                        , className: "lhep_obj_popup"
                //                    , }).on;
                //                    green_mark.bindTooltip(obj_name, {
                //                        permanent: true
                //                        , direction: "center"
                //                        , className: "lhep_obj_tooltip"
                //                    , }).openTooltip();

                //                green_mark.on('click', onIconClick, icon_data.length - 1);

                //                green_mark.icon_attrib = {'type': obj_type, 'name': obj_name, 'description': obj_desc};
        }
}

[end]


[phones]
var phones = [];
[end]

[draw rooms]

var check_sel;
var che;
var defaultDivColor = "##eeee00"
function toColor(num) {
        let out = ' ##' + (+ num).toString(16).padStart(6, '0');;
        return out;
}


function try_colorSQR() {
        let divs = lit.attributes.Departments;
        for (i in divs) {
                let divsqr;
                let sqrid = 'SQR' + divs[i].id;
                divsqr = document.getElementById(sqrid);
                if (typeof (divsqr) !== "undefined" && divsqr !== null) {
                        divsqr.style["background-color"] = toColor(divs[i].systemColor);
                        //  console.log('COLOR SQR '+sqrid+' '+JSON.stringify(divs[i])+' '+toColor( divs[i].systemColor));
                        //  console.log(toColor( divs[i].systemColor));
                }
                if (divs[i].id !== '643000') { continue; }
                sqrid = 'SQR606000';
                divsqr = document.getElementById(sqrid);
                if (typeof (divsqr) !== "undefined" && divsqr !== null) {
                        divsqr.style["background-color"] = toColor(divs[i].systemColor);
                        //    console.log('COLOR SQR '+sqrid+' '+JSON.stringify(divs[i])+' '+toColor( divs[i].systemColor));
                        //   console.log(toColor( divs[i].systemColor));
                }




        }
}
var a = { "Ё": "YO", "Й": "I", "Ц": "TS", "У": "U", "К": "K", "Е": "E", "Н": "N", "Г": "G", "Ш": "SH", "Щ": "SCH", "З": "Z", "Х": "H", "Ъ": "'", "ё": "yo", "й": "i", "ц": "ts", "у": "u", "к": "k", "е": "e", "н": "n", "г": "g", "ш": "sh", "щ": "sch", "з": "z", "х": "h", "ъ": "'", "Ф": "F", "Ы": "I", "В": "V", "А": "А", "П": "P", "Р": "R", "О": "O", "Л": "L", "Д": "D", "Ж": "ZH", "Э": "E", "ф": "f", "ы": "i", "в": "v", "а": "a", "п": "p", "р": "r", "о": "o", "л": "l", "д": "d", "ж": "zh", "э": "e", "Я": "Ya", "Ч": "CH", "С": "S", "М": "M", "И": "I", "Т": "T", "Ь": "'", "Б": "B", "Ю": "YU", "я": "ya", "ч": "ch", "с": "s", "м": "m", "и": "i", "т": "t", "ь": "'", "б": "b", "ю": "yu" };
function transliterate(word) {
        return word.split('').map(function (char) {
                return a[char] || char;
        }).join("");
}
function getRoomPhone(roomName) {
        let phlist = '';
        let roomn = transliterate(roomName.toLowerCase());
        for (i in phones) {
                let r = phones[i].room;
                let b = phones[i].building;
                if ('215' !== b.trim()) {
                        continue;
                }

                if (roomn.trim() == r) {
                        if (phlist.length > 0) {
                                phlist += ', ';
                        }
                        phlist += phones[i].number;
                }
        }

        return phlist;
}


function getDivProp(div_code) {
        let divs = lit.attributes.Departments;
        for (i in divs) {
                //		console.log(i+' '+divs[i].id+' '+divs[i].name+' '+divs[i].systemColor);
                if (divs[i].id == div_code) { return divs[i] };
        }

        return "";
}

function showSotr(tabn) {
        ShowDialog(); AjaxCall('popupCont', 'c=edit/personal&edit=no&tab_n=' + tabn, true); 
}


function addUserToRoom(room_id,building_id,room_num,building_name){
        lit_map.eachLayer(function (layer) {
            layer.closePopup();
        });
        ShowDialog(true); 
        AjaxCall('popupCont', 'c=plans/lhep/215/plan_room_ppls_add&room_num='+room_num+',&building_name='+building_name+',&building_id='+building_id+'&room_id='+room_id, true);
    }

function removeSotrFromRoom(room_id,tab_n,fio,room_num,division){
       let sotr_remove = confirm("Удалить сотрудника"+ fio+ " таб.:" + tab_n + " подр. "+division+"  из комнаты "+room_num+" ?");
       if (!sotr_remove){return}

        AjaxCall('popupCont', 'c=plans/lhep/215/plan_room_ppls_remove&cop=remove&tab_n='+tab_n+'&room_id='+room_id, true);
        location.reload(true);
        
}


ShowDialog(true); AjaxCall('popupCont', 'c=edit/personal&tab_n=#tab_n#', true);


function getRoomCoordinates(roomData) {
        let roomCoordinates = [];
        for (var j = 0; j < roomData.geometry.coordinates.length; j++) {
                roomCoordinates.push([
                        rescaleX(roomData.geometry.coordinates[j][0]),
                        rescaleY(roomData.geometry.coordinates[j][1]),
                ]);
//                roomCoordinates.push([
//                        rescaleX(roomData.geometry.coordinates[j][1]),
//                        rescaleY(roomData.geometry.coordinates[j][0]),
//                ]);
                
        }
        return roomCoordinates;
}
function getRoomInfo(roomID) {
        return rooms_info[roomID];
}

function fill_rooms_info() {
        console.log('!!!! BEGIN FILL INFO');
        //    for (i in lit){
        //        console.log('lit entry = '+i);
        //      for (j in lit[i]){
        //        console.log('lit entry = '+i +' '+j);
        //      for (k in lit[i][j]){
        //        console.log('lit entry = '+i +' '+j+' '+k);
        //        }
        //
        //      }
        //    }
        let all_rooms_data = rooms_json.layers.Rooms.layerRaws;
        var arr = [];
        for (let i = 0; i < all_rooms_data.length; i++) {
                var room = all_rooms_data[i];
                //	debugger;
                //	console.log(JSON.stringify(all_rooms_data));
                //	console.log(JSON.stringify(room));
                var room_id = all_rooms_data[i].properties.id;
                all_rooms_data[i].properties.id = room_id;
                var room_name = all_rooms_data[i].properties.name.toUpperCase().trim();
                console.log('>>>>>> '+room_id+' PROCESS room num='+room_name+' '+JSON.stringify(all_rooms_data[i]));

                var room_floor = all_rooms_data[i].geometry.floor;
                var ppls_arr = [];
                if (room_name.length > 0) {
              if (room_id == 441) {
                  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ROOM id =' + room_id + ' litsotr len=' + lhep_sotr.length); 
              }

                        for (let j = 0; j < lhep_sotr.length; j++) {
                                let tmprooms = [lhep_sotr[j].room_id.trim().toUpperCase()];
                                let building = lhep_sotr[j].buildings.trim().toUpperCase();
                                if (room_id == 441) { console.log(room_id + ' $$$$$$$$$$ROOM=441 CHECK ' + JSON.stringify(lhep_sotr[j])); }
//                                if (lhep_sotr[j].rooms.indexOf(',') > - 1) {
//                                        tmprooms = lhep_sotr[j].rooms.toUpperCase().split(',');
//                                        tmprooms.map(s => s.trim());
//                                }
                                
                                if (tmprooms == room_id ) {

                                        let fio = lhep_sotr[j].f + " " + lhep_sotr[j].i + " " + lhep_sotr[j].o;
                                        ppls_arr.push({ "FL_ID": lhep_sotr[j].fl_id, "TABN": lhep_sotr[j].tabn, "TOPDIVCODE": lhep_sotr[j].TopParent_code, "SUBDIVCODE": lhep_sotr[j].SubTopParent_code, "FIO": fio });
                                        console.log('ROOM add sotr=' + room_name + 'room_id='+room_id+' add ppl ' + JSON.stringify(lhep_sotr[j]));
                                }
                        }
                }
                var room_coord = getRoomCoordinates(all_rooms_data[i]);
                var minX = maxX = room_coord[0][0];
                var minY = maxY = room_coord[0][1];
                for (let b = 0; b < room_coord.length; b++) {
                        if (room_coord[b][0] < minX) {
                                minX = room_coord[b][0];
                        }
                        if (room_coord[b][0] > maxX) {
                                maxX = room_coord[b][0];
                        }
                        if (room_coord[b][1] < minY) {
                                minY = room_coord[b][1];
                        }
                        if (room_coord[b][1] > maxY) {
                                maxY = room_coord[b][1];
                        }
                }
                var square = ((maxX - minX) * (maxY - minY) * 13 * 13) / 100;
                var size = 0;
                rooms_info[room_id] = { "id": room_id, "name": room_name, "floor": room_floor, "PPLS": ppls_arr, "SQR": square, "size": size, "geo_json": room_coord };
                //        console.log('!!!! ROOM ID='+room_id+' ='+JSON.stringify(rooms_info[room_id]));
                //    if (room_name.indexOf('607')>-1) {console.log(   room_name+' ===   '+JSON.stringify(rooms_info[room_id]));}
        }
        console.log('!!!! END FILL INFO');
}




function centerRoom(room_num) {
        if (room_num.length < 2) {
                return;
        }

        let aa = $('[id=' + room_num[0] + '][name=floornum]');
        console.log(room_num[0])
        aa.click();
        addRooms();
        for (r in rooms_info) {
                //    console.log(room_num+' '+r+' '+rooms_info[r].name+' '+rooms_info);
                if (rooms_info[r].name == room_num.toUpperCase()) {
                        console.log('!!!!!!!!!!' + rooms_info[r].geo_json);
                        let geo = [0, 0];
                        for (i in rooms_info[r].geo_json) {
                                geo[0] += rooms_info[r].geo_json[i][0];
                                geo[1] += rooms_info[r].geo_json[i][1];
                                console.log('CENTER ROOM !!!!!!!!!!!!!!!!! ' + geo + '  ' + i + '= ' + rooms_info[r].geo_json[i])
                        }
                        geo[0] /= rooms_info[r].geo_json.length;
                        geo[1] /= rooms_info[r].geo_json.length;
                        console.log(geo + '  ' + rooms_info[r].geo_json.length);
                        red_mark.setLatLng(geo);
                        roomsGrp.addLayer(red_mark);
                        lit_map.panTo(geo)
                        break;
                }
        }

}
var flip = false;

//.plan_popup_td (
//        font-family: Verdana,Arial,sans-serif !important; 
//        font-size: 1.2em !important;
//
//    {


function addRooms() {
        var building_id = #plan_building_id#;
        roomsGrp.clearLayers();
        console.log(' Begin  add Rooms ' + roomsGrp + ' lit=' + 'JSON.stringify(lit)');
        check_sel = $("input[type='radio'][name='floornum']:checked").val();
        image = L.imageOverlay('images/plans/lhep/215-' + check_sel + '.png', bounds).addTo(lit_map);
        let aaa = $("input[type='radio'][name='floornum']:checked");
        console.log('aaa=' + aaa);
        let data = rooms_json.layers.Rooms.layerRaws.filter(function (item, i, arr) {
                if (item.geometry.floor == check_sel) return item;
        });
        console.log(check_sel + '!!!!!!!!!!!!!!!!!!!!! Rooms ' + JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
                //     console.log(' Room '+data[i].properties.name+' '+ JSON.stringify(data[i].geometry.coordinates));
                //    console.log('FILL ROOM '+JSON.stringify(data[i].properties))
                let latlngs = getRoomCoordinates(data[i]);
                var rColor = "##ffffff";
                var roomName = data[i].properties.name;
                let room_id = data[i].properties.id;
                var Owner = "";
                var room_info = getRoomInfo(room_id);
                //    console.log('ROOM info'+JSON.stringify(room_info))
                
//                AjaxCall('popupCont', 'c=edit/room_ppls&room_num=' +room_num+ ',&bld_name='+bld_name+'&room_id='+id, true);
                
                var descr = "<table  class=plan_pop_table style=\"width:600px\">" ;
        


                        descr += "<tr ><td width=600 class=plan_popup_td  colspan=-1 style=\"font-family: Verdana,Arial,sans-serif !important; font-size: 1.2em !important;\" >"
                        descr += "<LNG L=ru >Комната</LNG>: " + roomName +' ('+room_info.PPLS.length+'/-)';
                        descr += "</td></tr>";
                        descr += "<tr><td class='plan_popup_td' colspan=-1>";
                        
                        descr +="<input class=plan_btn type=button value='Добавить сотрудника' onclick='addUserToRoom("+room_id+","+ building_id+",\""+roomName+"\", \"#plan_building_name#\")'>";  ??rooms_addremove_ppls

                        descr += "</td></tr>";
                        descr += "<tr ><td  nowrap class=plan_popup_td  colspan=-1>"

                        descr += "<add_rooms_ppls  id=rooms_ppls_table_"+room_id+">";
                        descr += "</add_rooms_ppls>";
                        descr += "</td></tr>";
                        

                        //        console.log(latlngs);
//                        for (let j = 0; j < room_info.PPLS.length; j++) {
//                                descr += "<tr><td class=plan_popup_td  nowrap  >";
//                                descr += "<a href='##' onclick='showSotr(+" + room_info.PPLS[j].TABN + ")';>" + room_info.PPLS[j].FIO;
//                                descr +=  "</a>";
//                                descr += "</td><td  class='plan_btn plan_popup_td' >";
//                                descr += "<input  type=button value='Удалить'  onclick='remove_emp_from_room("+room_id+", "+room_info.PPLS[j].TABN+");' >";  ??rooms_addremove_ppls
//                                descr += "</td></tr>";
//                                descr += "<tr><td  class=plan_popup_td >";
//                                if (room_info.PPLS[j].TOPDIVCODE == room_info.PPLS[j].SUBDIVCODE) {
//                                        descr += lhep_divName(room_info.PPLS[j].SUBDIVCODE) + '<br>';
//                                } else {
//                                        descr += lhep_divName(room_info.PPLS[j].TOPDIVCODE) + ' ' + lhep_divName(room_info.PPLS[j].SUBDIVCODE) + '<br>';
//                                }
//                                ;
//                                Owner = room_info.PPLS[j].SUBDIVCODE;
//                                //            console.log(roomName+' = '+JSON.stringify(room_info.PPLS[j])+' '+Owner);
//                                descr += "</td></tr>";
//                        }
                        if (room_info.PPLS.length>0) {
                                rColor = '##00E8FF'
                        }
                        
                descr += "<tr ><td class=plan_popup_td  colspan=-1>"
                descr += "Площадь: " + parseInt(room_info.SQR) + ' кв.м';
                descr += "</td></tr>";
                descr +="</table";
                //    console.log(roomName+' '+rColor)
                polyline = L.polygon(latlngs, {
                        fillColor: rColor,
                        fillOpacity: 0.5,
                        color: "black",
                        weight: 1,
                });
                polyline.room_data = {};
                polyline.room_data.room_id=room_id;
                polyline.room_data.room_num = roomName;
                polyline.room_data.building_id=#plan_building_id#;
                polyline.bindTooltip(roomName, {
                        permanent: true,
                        direction: "center",
                        className: "lhep_obj_tooltip",
                })
                        .openTooltip();
                polyline.bindPopup(descr, {  width : 560,minWidth : 580,
                        autoPanPaddingTopLeft: [50, 50],
                        
                }).on;
                polyline.on('popupopen', updatePopup);
                roomsGrp.addLayer(polyline);
                room_info.geo_json = latlngs;
                
                //   console.log(' polyline '+latlngs+' '+JSON.stringify(room_info));
        }
        try_colorSQR();
        //   console.log('=================== LOAD_ALL_ICON !!!!!!!!!!!!!!!!!!!!!!!!!!!');
        load_all_icon(check_sel, #plan_building_id#);
        //   console.log('=================== end LOAD_ALL_ICON !!!!!!!!!!!!!!!!!!!!!!!!!!!');

}
function updatePopup(){
    let addsrc =  document.getElementById('rooms_ppls_table_'+this.room_data.room_id);
      AjaxCall('rooms_ppls_table_'+this.room_data.room_id, 'c=plans/lhep/215/get_room_table&room_num=' +this.room_data.room_num+ '&building_id='+this.room_data.building_id+
              '&room_id='+this.room_data.room_id, true);
    //debugger;
};
function update_room_popup(room_id, building_id){
    let addsrc =  document.getElementById('rooms_ppls_table_'+room_id);
      AjaxCall('rooms_ppls_table_'+this.room_data.room_id, 'c=plans/lhep/215/get_room_table&,&building_id='+building_id+
              '&room_id='+room_id, true);
    //debugger;
};


function test_room() {
        var latlngs = [
                [1, 1],
                [200, 200],
                [1, 300],
        ];
        polyline = L.polygon(latlngs, {
                fillOpacity: 1,
                color: "red",
                weight: 2,
        }).addTo(lit_map);
}


function rescaleX(x) {
        return x / 10;
        return parseInt(aaa);
        return x

}

function rescaleY(y) {
        return y / 10;
        return parseInt(aaa);
        return y
}


[end]
