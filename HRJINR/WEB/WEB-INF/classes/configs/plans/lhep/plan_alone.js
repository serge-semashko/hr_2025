TEMPLATE


[comments]
author = Семашко
[end]
[lit divs]
[end]
[fill structura menu]
<script>

</script>
    <script>
        function toHex (x){
          let hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        };

      function hsvToHex(hsv) {
        if (hsv === undefined){
          hsv=[0,0,1]
        }
        h = hsv[0];
        s = hsv[1];
        v = hsv[2];
        var r, g, b;
        h /= 360;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6) {
          case 0:
            (r = v), (g = t), (b = p);
            break;
          case 1:
            (r = q), (g = v), (b = p);
            break;
          case 2:
            (r = p), (g = v), (b = t);
            break;
          case 3:
            (r = p), (g = q), (b = v);
            break;
          case 4:
            (r = t), (g = p), (b = v);
            break;
          case 5:
            (r = v), (g = p), (b = q);
            break;
        }
        return '##'+toHex(r)+toHex(g)+toHex(b);
      }

      function hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        let retval =  '##'+toHex(r)+toHex(g)+toHex(b);
//        debugger;
        return retval;
      }
    </script>
    
    <script>
      
      var ocnt = 0;
      for (tdiv in topdivs) {
        ocnt += 1;
        if (topdivs[tdiv].pname.indexOf("Отд.") > -1) {
          topdivs[tdiv].subcnt = Object.keys(topdivs[tdiv].subdivs).length;
          
          ocnt += topdivs[tdiv].subcnt;
        }
      }
    </script>
    <script>
        var div_color = {};
        var div_color_add = {};
        function hsv_add(hsv){

//            console.log('hsv_add '+hsv);
        if (hsv === undefined){
          hsv=[0,0,1]
        }
            if (hsv[1]==0 ){
                return [hsv[0], hsv[1], 1 - hsv[2]]
            }


            let h1= hsv[0] +180 % 360;
            let s1= 1;
            let v1= 1;
//            console.log('hsv_add '+hsv+' ',h1,s1,v1);
            return hsvToHex([ h1,1,1]);
            return hsvToHex([ h1,s1,v1]);
        }
function rgb2hsv ([r, g, b]) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    percentRoundFn = num => Math.round(num * 100) / 100;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return [
         Math.round(h * 360),
         percentRoundFn(s ),
         percentRoundFn(v )
];
}        
function check_hsv(i) {
    if (i.color_hsv ===undefined){
         if (i.color_rgb ===undefined){
            var a=1;
         } else{
            i.color_hsv = rgb2hsv(i.color_rgb);
         }
    }

} ;

        for (i in topdivs) {
            if (topdivs[i].pname.trim().length > 1) {
                for (isub in topdivs[i].subdivs) {
                  check_hsv(topdivs[i].subdivs[isub])  ;
                }
                check_hsv(topdivs[i])  ;
            }
        }
        console.log("add color to divs "+JSON.stringify(topdivs));
        
        for (i in topdivs) {
            if (topdivs[i].pname.trim().length > 1) {
                for (isub in topdivs[i].subdivs) {
                  check_hsv(topdivs[i].subdivs[isub])  ;
                  let bcolor =   hsvToHex(topdivs[i].subdivs[isub].color_hsv);
                   
                  let addcolor = hsv_add(topdivs[i].subdivs[isub].color_hsv);
                  div_color[isub] = bcolor;
                  div_color_add[isub] = addcolor;
                }
                check_hsv(topdivs[i])  ;
                bcolor = hsvToHex(topdivs[i].color_hsv);
                addcolor = hsv_add(topdivs[i].color_hsv);
                div_color[topdivs[i].pcode] = bcolor;
                div_color_add[topdivs[i].pcode] = addcolor;
            }
        }
        console.log('DIV_COLOR!!!! '+JSON.stringify(div_color)+' '+ JSON.stringify(div_color_add));

//        debugger;
    </script>
    <script>
      function create_div_list() {
        console.log("Create div menu "+JSON.stringify(topdivs));
        console.log("div color  "+JSON.stringify(div_color));
        console.log("div color add  "+JSON.stringify(div_color_add));
        
        let block = '<details open=""><summary>';
        let subblock = "";
        let bcolor='';
        block +=
          'Подразделения <input type=checkbox name=divs_selected_for_draw onchange="checkAll(this.name,this.checked,this)"  >Все';
        block += "</summary>";
        for (i in topdivs) {
          if (topdivs[i].pname.trim().length > 1) {
            subblock = "";
            for (isub in topdivs[i].subdivs) {
//              bcolor = hsvToHex(topdivs[i].subdivs[isub].color_hsv);
//              div_color[isub] = bcolor;
              bcolor = div_color[isub] ;
              fcolor = div_color_add[isub] ;
              subblock += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +  "<input  pcode="  + isub;
                subblock +=' onchange="set_filter_visible();" name=divs_selected_for_draw_list type=checkbox value="' +
                topdivs[i].pname +
                "_" + topdivs[i].subdivs[isub].pname + '">';
                subblock +='<em style="background-color:'+bcolor+'; color:'+fcolor+'">&nbsp;&nbsp;&nbsp;&nbsp;</em>';
            subblock += '<b>' + topdivs[i].subdivs[isub].pname +   "</b><br>";
            }
            // debugger;

            if (subblock.length > 0) {
              block += "<details ><summary>";
            }
//            bcolor = hsvToHex(topdivs[i].color_hsv);
//            div_color[topdivs[i].pcode] = bcolor;
            bcolor = div_color[topdivs[i].pcode] ;
            fcolor = div_color_add[topdivs[i].pcode] ;
            block += "<input  pcode=" + topdivs[i].pcode;
            if (topdivs[i].show) {
              block += " checked ";
            }

            block +=
              ' onchange="set_filter_visible();" name=divs_selected_for_draw_list type=checkbox value="' +
              topdivs[i].pname +
              '">';
            block  += '<em style="background-color:'+bcolor+'; color:'+fcolor+'">&nbsp;&nbsp;&nbsp;&nbsp;</em>';
            block  += '<b>' + topdivs[i].pname + "</b><br>";
            if (subblock.length > 0) {
              block += "</summary>" + subblock + "</details>";
            }
          }
        }
        block += "</details>";
        return block;
      }
    </script>




    <script>
      function checkAll(name, checked) {
        name = name + "_list";
        var cbs = document.getElementsByName(name);
//        debugger;
        for (var i = 0; i < cbs.length; i++) {
          cbs[i].checked = checked;
        }
      }
    </script>
    <script>
      function create_post_list() {
        let block = '<details open=""><summary>';
        block += "Должности";
        block +=
          '<input type=checkbox name=post_selected_for_draw onchange="checkAll(this.name,this.checked,this)"  >Все';
        block += "</summary>";
        for (let post of posts) {
          block +=
            '<input  onchange="set_filter_visible();" name=post_selected_for_draw_list type=checkbox value="' +
            post +
            '">' +
            post +
            "<br>";
        }
        block += "</details>";
        return block;
      }
    </script>




[end]


[divfunc]
function lhep_divFunc(id) {

        var item = "";
        var flag = 0;
        var lvl = 1;
        debugger;
        for (i in lit_divs) {
                if (id == lit_divs[i].id) {

                        var str = lit_divs[i].name;
                        lvl = lit_divs[i].lvl;
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
        for (i in lit_divs) {
                if (id == lit_divs[i].id) {

                        str = lit_divs[i].name;
                        lvl = lit_divs[i].lvl;
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
                coords = [data[i].geometry.coordinates[0] / 10 + 6, data[i].geometry.coordinates[1] / 10 - 2];
                obj_type = data[i].properties.type;
                obj_id = data[i].properties.id;
                obj_desc = data[i].properties.description;
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


function fill_rooms_info() {
        console.log('!!!! BEGIN FILL INFO '+JSON.stringify(lhep_sotr));
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
//                console.log('>>>>>> '+room_id+' PROCESS room num='+room_name+' '+JSON.stringify(all_rooms_data[i]));

                var room_floor = all_rooms_data[i].geometry.floor;
                var ppls_arr = [];
                if (room_name.length > 0) {
              if (room_id == 441) {
//                  console.log('$$$$$$$$$$ ROOM id =' + room_id + ' litsotr len=' + lhep_sotr.length); 
              }

                        for (let j = 0; j < lhep_sotr.length; j++) {
                                let tmprooms = [lhep_sotr[j].room_id.trim().toUpperCase()];
                                let building = lhep_sotr[j].buildings.trim().toUpperCase();
//                                if (room_id == 441) { console.log(room_id + ' $$$$$$$$$$ROOM=441 CHECK ' + JSON.stringify(lhep_sotr[j])); }
//                                if (lhep_sotr[j].rooms.indexOf(',') > - 1) {
//                                        tmprooms = lhep_sotr[j].rooms.toUpperCase().split(',');
//                                        tmprooms.map(s => s.trim());
//                                }
                                
                                if (tmprooms == room_id ) {

                                        let fio = lhep_sotr[j].f + " " + lhep_sotr[j].i + " " + lhep_sotr[j].o;
                                        ppls_arr.push({ "FL_ID": lhep_sotr[j].fl_id, "TABN": lhep_sotr[j].tabn, "TOPDIVCODE": lhep_sotr[j].TopParent_code, "SUBDIVCODE": lhep_sotr[j].SubTopParent_code, "FIO": fio });
//                                        console.log('ROOM add sotr=' + room_name + 'room_id='+room_id+' add ppl ' + JSON.stringify(lhep_sotr[j]));
                                }
                        }
                }
                var room_coord = getRoomCoordinates(all_rooms_data[i]);
                var minX = maxX = room_coord[0][0];
                var minY = maxY = room_coord[0][1];
                var sum1 = 0;
                var sum2 = 9; 
                for (let b = 0; b < room_coord.length-1; b++) {
                    sum1 += room_coord[b][0]*room_coord[b+1][1];
                    sum2 += room_coord[b+1][0]*room_coord[b][1];
                }
                    sum1 += room_coord[room_coord.length-1][0]*room_coord[0][1];
                    sum2 += room_coord[0][0]*room_coord[room_coord.length-1][1];
                    
                
                var square = all_rooms_data[i].properties.room_size;
                var size = 0;
                rooms_info[room_id] = { "id": room_id, "name": room_name, "floor": room_floor, "PPLS": ppls_arr, "SQR": square, "size": size, "geo_json": room_coord };
                //        console.log('!!!! ROOM ID='+room_id+' ='+JSON.stringify(rooms_info[room_id]));
                //    if (room_name.indexOf('607')>-1) {console.log(   room_name+' ===   '+JSON.stringify(rooms_info[room_id]));}
        }
        console.log('!!!! END FILL INFO');
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


    function addUserToRoom(id,bld_name,room_num){
        ShowDialog(true); 
        AjaxCall('popupCont', 'c=edit/room_ppls&room_num=' +room_num+ ',&bld_name='+bld_name+'&room_id='+id, true);
    }



function edit_room(room_id) {
        
        console.log('edit_room'+room_id) ;
        ShowDialog();
        AjaxCall('popupCont', 'c=plans/lhep/edit_room&room_num=room_num,&bld_name=bld_name&room_id='+-100, true); 

}

ShowDialog(true); AjaxCall('popupCont', 'c=edit/personal&tab_n=#tab_n#', true);


function getRoomCoordinates(roomData) {
        let roomCoordinates = [];
        for (var j = 0; j < roomData.geometry.coordinates.length; j++) {
                roomCoordinates.push([
                        rescaleX(roomData.geometry.coordinates[j][0]),
                        rescaleY(roomData.geometry.coordinates[j][1]),
                ]);
        }
        return roomCoordinates;
}
function getRoomInfo(roomID) {
        return rooms_info[roomID];
}
</script>
<script>
function center_plan(constr_id, floor_num, room_id,coord) {
        console.log('Center ROOM [id=' + room_num[0] + '][name=floornum]')
        if (room_num.length < 2) {
                return;
        }

        let aa = $('[id=' + room_num[0] + '][name=floornum]');
        console.log('Center ROOM [id=' + room_num[0] + '][name=floornum]')
        aa.click();
        addRooms();
        for (r in rooms_info) {
                //    console.log(room_num+' '+r+' '+rooms_info[r].name+' '+rooms_info);
                if (rooms_info[r].name == room_num.toUpperCase()) {
                    //    console.log('!!!!!!!!!!' + rooms_info[r].geo_json);
                        let geo = [0, 0];
                        for (i in rooms_info[r].geo_json) {
                                geo[0] += rooms_info[r].geo_json[i][0];
                                geo[1] += rooms_info[r].geo_json[i][1];
                             //   console.log('CENTER ROOM !!!!!!!!!!!!!!!!! ' + geo + '  ' + i + '= ' + rooms_info[r].geo_json[i])
                        }
                        geo[0] /= rooms_info[r].geo_json.length;
                        geo[1] /= rooms_info[r].geo_json.length;
                       // console.log(geo + '  ' + rooms_info[r].geo_json.length);
                        red_mark.setLatLng(geo);
                        roomsGrp.addLayer(red_mark);
                        lit_map.panTo(geo)
                        break;
                }
        }

}
</script>


<script>

function centerRoom(room_num) {
        console.log('Center ROOM [id=' + room_num[0] + '][name=floornum]')
        if (room_num.length < 2) {
                return;
        }

        let aa = $('[id=' + room_num[0] + '][name=floornum]');
        console.log('Center ROOM [id=' + room_num[0] + '][name=floornum]')
        aa.click();
        addRooms();
        for (r in rooms_info) {
                //    console.log(room_num+' '+r+' '+rooms_info[r].name+' '+rooms_info);
                if (rooms_info[r].name == room_num.toUpperCase()) {
                    //    console.log('!!!!!!!!!!' + rooms_info[r].geo_json);
                        let geo = [0, 0];
                        for (i in rooms_info[r].geo_json) {
                                geo[0] += rooms_info[r].geo_json[i][0];
                                geo[1] += rooms_info[r].geo_json[i][1];
                             //   console.log('CENTER ROOM !!!!!!!!!!!!!!!!! ' + geo + '  ' + i + '= ' + rooms_info[r].geo_json[i])
                        }
                        geo[0] /= rooms_info[r].geo_json.length;
                        geo[1] /= rooms_info[r].geo_json.length;
                       // console.log(geo + '  ' + rooms_info[r].geo_json.length);
                        red_mark.setLatLng(geo);
                        roomsGrp.addLayer(red_mark);
                        lit_map.panTo(geo)
                        break;
                }
        }

}
var flip = false;

      function hslToHex11(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = (x) => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }
function componentToHex(c) {
  // This expects `c` to be a number:
  const hex = c.toString(16);

  return hex.length === 1 ? `0${ hex }` : hex;
}

function rgbToHex(r,g,b) {
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
      
function hsl2rgb(hsl) {
    var h = hsl[0], s = hsl[1], l = hsl[2];
 //   console.log('hsl2rgb '+h+' '+s+' '+l);
    var m1, m2, hue;
    var r, g, b
    h = (Math.round( 360*h )/1);
    if (s == 0)
        r = g = b = (l * 255);
    else {
        if (l <= 0.5)
            m2 = l * (s + 1);
        else
            m2 = l + s - l * s;
        m1 = l * 2 - m2;
        hue = h / 360;
        r = Math.round(HueToRgb(m1, m2, hue + 1/3));
        g = Math.round(HueToRgb(m1, m2, hue));
        b = Math.round(HueToRgb(m1, m2, hue - 1/3));
    }
 //   console.log(r+' '+g+' '+b);
    
    return rgbToHex(r,g,b);
}

function HueToRgb(m1, m2, hue) {
    var v;
    if (hue < 0)
        hue += 1;
    else if (hue > 1)
        hue -= 1;

    if (6 * hue < 1)
        v = m1 + (m2 - m1) * hue * 6;
    else if (2 * hue < 1)
        v = m2;
    else if (3 * hue < 2)
        v = m1 + (m2 - m1) * (2/3 - hue) * 6;
    else
        v = m1;

    return 255 * v;
}
function tryColor(divcode){
         let h = (+divcode)/100000;
   //      console.log('divcode '+divcode+' '+h);
         
         let aa =  hsl2rgb([h,1,0.60]);
 //        console.log('tryColor '+(h) + ' '+aa);
         return aa; 
            
     }

function addRooms() {
        roomsGrp.clearLayers();
        console.log(' Begin  add Rooms ' + roomsGrp + ' lit=' + 'JSON.stringify(lit)');
        check_sel = $("input[type='radio'][name='floornum']:checked").val();
        console.log(' BOUNDS ' + JSON.stringify(bounds)+' #lab_id# #LAB_ID#   plan_editor/images/#lab_dir#/#b_name#_');
        image = L.imageOverlay('plan_editor/images/#lab_dir#/#b_name#_' + check_sel + '.png', bounds).addTo(lit_map);
        lit_map.fitBounds(bounds);
        let aaa = $("input[type='radio'][name='floornum']:checked");
        console.log('rooms_info!!!!!=' + JSON.stringify(rooms_info));
        let data = rooms_json.layers.Rooms.layerRaws.filter(function (item, i, arr) {
                if (item.geometry.floor == check_sel) return item;
        });
        console.log(check_sel + '!!!!!!!!!!!!!!!!!!!!! Rooms ' + JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
                //     console.log(' Room '+data[i].properties.name+' '+ JSON.stringify(data[i].geometry.coordinates));
                //    console.log('FILL ROOM '+JSON.stringify(data[i].properties))
                let latlngs = getRoomCoordinates(data[i]);
                var rColor = "##ffffff";
                var tColor= "black"
                var roomName = data[i].properties.name;
                let room_id = data[i].properties.id;
                let room_db = data[i];
                var Owner = "";
                var room_info = getRoomInfo(room_id);
              //  console.log('ROOM info'+JSON.stringify(room_info))
                
//                AjaxCall('popupCont', 'c=edit/room_ppls&room_num=' +room_num+ ',&bld_name='+bld_name+'&room_id='+id, true);
                
                var descr = "<table class=plan_pop_table>";

                        descr += "<tr ><td class=plan_pop_td  colspan=-1>"
                        descr += "<LNG L=ru >Комната</LNG>: " + roomName +' ('+room_info.PPLS.length+'/-)';
                        descr += "</td></tr>";
                        descr += "<tr><td class='plan_btn plan_pop_td' colspan=-1>";
                        
                        descr +="<input class=plan_btn type=button value='Добавить сотрудника'  onclick='edit_room("+room_id+");' ><br>" ??rooms_addremove_ppls__
//                        let roomPhone = getRoomPhone(roomName);
//                        if (roomPhone.length > 2) {
//                                descr += "<LNG L=ru>Телефон</LNG>: " + roomPhone + "<br>";
//                        }

                        descr += "</td></tr>";
                        descr += "<tr ><td  nowrap class=plan_pop_td  colspan=-1>"

                        descr += "<add_rooms_ppls addsrc id=rooms_ppls_table_"+room_id+">";
                        descr += "</add_rooms_ppls>";
                        descr += "</td></tr>";
                        

                        //        console.log(latlngs);
//                        for (let j = 0; j < room_info.PPLS.length; j++) {
//                                descr += "<tr><td class=plan_pop_td  nowrap  >";
//                                descr += "<a href='##' onclick='showSotr(+" + room_info.PPLS[j].TABN + ")';>" + room_info.PPLS[j].FIO;
//                                descr +=  "</a>";
//                                descr += "</td><td  class='plan_btn plan_pop_td' >";
//                                descr += "<input  type=button value='Удалить'  onclick='remove_emp_from_room("+room_id+", "+room_info.PPLS[j].TABN+");' >";  ??rooms_addremove_ppls
//                                descr += "</td></tr>";
//                                descr += "<tr><td  class=plan_pop_td >";
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
                                if ( roomName == '224'){
                                    console.log('!!!224'+room_info.PPLS);
                                }
                                rColor = '##00E8FF';
//                                debugger;
                                rColor = div_color[room_info.PPLS[0].SUBDIVCODE];
                                fColor = div_color_add[room_info.PPLS[0].SUBDIVCODE];
                                if (rColor === undefined){
                                rColor = div_color[room_info.PPLS[0].TOPDIVCODE];
                                fColor = div_color_add[room_info.PPLS[0].TOPDIVCODE];

                                }
                        }
                        
                     //   console.log(JSON.stringify(room_db.properties.ext_use));
                        if (room_db.properties.ext_use.length>0) {
                             //   console.log('ext use = '+ JSON.stringify(room_db.properties.ext_use));
                                rColor = '##33E800'
                        }
                        if (roomName.indexOf('WC')>-1) {
                                rColor = '##FFFF00';
                                tColor = '##FFFF00';    
                        }
                        
                            
                      //   console.log('RCOLOR!!!!!= = '+ rColor + ' ext='+room_db.properties.ext_use+' ppls'+ fill_rooms_info(room_info));
                        
                descr += "<tr ><td class=plan_pop_td  colspan=-1>"
                        //                descr += "Площадь: " + parseInt(room_info.SQR) + ' кв.м';
                descr += "</td></tr>";
                descr +="</table";
                //    console.log(roomName+' '+rColor)
                polyline = L.polygon(latlngs, {
                        fillColor: rColor, 
                        fillColor: "none",  ??
                        fillOpacity: 0.9,
                        color: "black",
                        weight: 1,
                });
                polyline.room_data = {};
                polyline.room_data.room_id=room_id;
                polyline.room_data.room_num = roomName;
                polyline.room_data.building_id=#plan_building_id#;
                let tt = roomName.trim();
                if (tt.indexOf(' ')>0){
                    tt = tt.substring(0,tt.indexOf(' '));
                }
                       
                polyline.bindTooltip(tt, {
                        permanent: true,
                        direction: "center",
                        className: "lhep_obj_tooltip",
                })
                        .openTooltip();
                polyline.bindPopup(descr, {
                        autoPanPaddingTopLeft: [50, 50],
                        className: "lhep_popup plan_popup_table",
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
    let addsrc =  document.getElementById('addsrc_'+this.room_data.room_id);
      AjaxCall('rooms_ppls_table_'+this.room_data.room_id, 'c=plans/lhep/get_room_table&edit=no&room_num=' +this.room_data.room_num+ ',&building_id='+this.room_data.building_id+
              '&room_id='+this.room_data.room_id, true);
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
        return x ;
        return parseInt(aaa);
        return x

}

function rescaleY(y) {
        return y ;
        return parseInt(aaa);
        return y
}


[end]
