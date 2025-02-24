TEMPLATE


[comments]
author = Семашко
[end]
[fill structura menu]

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
      var topdivs = [
        { 
          color_hsv: [0,0.8,1],
          pname: "Рук.", pcode: 101000, subdivs: {} },
        {
          color_hsv: [0,0.8,1],
          pname: "Гр. Сов. и К.",
          pcode: 102000,
          subdivs: {},
        },
        {
          color_hsv: [16,1,1],
          pname: "СИСТ",
          pcode: 103000,
          subdivs: {},
        },
        {
          color_hsv: [16,0.6,1],
          pname: "ИЭТО",
          pcode: 189000,
          subdivs: {
            189003: {color_hsv: [16,0.6,1], pname: "Группа №3" },
            189004: {color_hsv: [16,0.6,1], pname: "Группа №4" },
            189002: {color_hsv: [16,0.6,1], pname: "Группа №2" },
            189001: {color_hsv: [16,0.6,1], pname: "Группа №1" },
          },
        },
        {
          color_hsv: [338,1,1],
          pname: "АХП",
          pcode: 190000,
          subdivs: {
            192000: {color_hsv: [338,1,1], pname: "Х.O." },
            191000: {color_hsv: [338,1,1], pname: "Адм. бюро" },
          },
        },
        {
          color_hsv: [347,0.5,1],
          pname: "ПФБ",
          pcode: 195000,
          subdivs: {
              
            195003: {color_hsv: [347,0.5,1], pname: "Группа №3" },
            195002: {color_hsv: [347,0.5,1], pname: "Группа №2" },
            195001: {color_hsv: [347,0.5,1], pname: "Группа №1" },
          },
        },

        {
          color_hsv: [80,1,1],
          pname: "Отд.№1",
          show: true,
          pcode: 110000,
          subdivs: {
            111000: {color_hsv: [70,1,1], pname: "НЭОУС" },
            112000: {color_hsv: [70,0.8,0.8], pname: "НЭОИФПУ" },
            113000: {color_hsv: [70,0.4,1], pname: "НТОП" },
            114000: {color_hsv: [90,1,1], pname: "НЭОИКН" },
            115000: {color_hsv: [90,0.8,0.8], pname: "НЭОРС" },
            116000: {color_hsv: [90,0.4,1], pname: "НИОСЭН" },
            117000: {color_hsv: [135,1,1], pname: "НИКО" },
            125000: {color_hsv: [135,0.8,0.8], pname: "ДСН" },
            126000: {color_hsv: [135,0.4,1], pname: "НЭСОП" },
            129000: {color_hsv: [165,1,1], pname: "НЭОСМТ" }
          },
        },
        {color_hsv: [195,1,1],
          pname: "Отд.№2",
          pcode: 120000,
          show: true,
          subdivs: {
            122000: {color_hsv: [195,1,1], pname: "НЭОФТИ" },
            123000: {color_hsv: [195,0.75,1], pname: "НЭОСФМС" },
            124000: {color_hsv: [195,0.55,1], pname: "СФСКЯ" },
            127000: {color_hsv: [210,0.2,1], pname: "НЭОТиМПП" },
          },
        },
        {color_hsv: [245,1,1],
          pname: "Отд.№3",
          show: true,
          pcode: 130000,
          subdivs: {
            135000: {color_hsv: [245,1,1], pname: "НЭОФСТИ" },
            121000: {color_hsv: [245,0.75,1], pname: "НЭОMД" },
            136000: {color_hsv: [245,0.55,1], pname: "НЭОССАиРП" },
            137000: {color_hsv: [245,0.2,1], pname: "НЭОБМ" },
          },
        },
        {color_hsv: [270,1,1],
          pname: "Отд.№4",
          show: true,
          pcode: 140000,
          subdivs: {
            142000: {color_hsv: [270,1,1], pname: "НЭОФТИ  LHC" },
            134000: {color_hsv: [270,0.75,1], pname: "Сф на АТЛАС" },
            141000: {color_hsv: [270,0.55,1], pname: "НЭОФТИ  RHIC" },
            132000: {color_hsv: [270,0.2,1], pname: "НЭОФ на CMS" },
          },
        },
        {color_hsv: [300,1,1],
          pname: "Отд.№5",
          show: true,
          pcode: 150000,
          subdivs: {
            157000: {color_hsv: [300,1,1], pname: "СК" },
            156000: {color_hsv: [300,0.75,1], pname: "СРС" },
            158000: {color_hsv: [300,0.55,1], pname: "НМОКТС" },
            151000: {color_hsv: [300,0.2,1], pname: "НЭОАФИ" },
          },
        },
        {color_hsv: [31,1,1],
          pname: "Отд.№6",
          show: true,
          pcode: 170000,
          subdivs: {
            172000: {color_hsv: [31,1,1], pname: "ЦОЭП" },
            171000: {color_hsv: [31,0.75,0.8], pname: "КО" },
            176000: {color_hsv: [31,0.4,1], pname: "САСУТП ЛФВЭ" },
            170010: {color_hsv: [31,0.2,1], pname: "ГВвЭОиРД" },
          },
        },
        {color_hsv: [45,1,1], pname: "ПKO", pcode: 175000, subdivs: {} }
      ];
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
        for (i in topdivs) {
            if (topdivs[i].pname.trim().length > 1) {
                for (isub in topdivs[i].subdivs) {
                  let bcolor =   hsvToHex(topdivs[i].subdivs[isub].color_hsv);
                  let addcolor = hsv_add(topdivs[i].subdivs[isub].color_hsv);
                  div_color[isub] = bcolor;
                  div_color_add[isub] = addcolor;
                }
                bcolor = hsvToHex(topdivs[i].color_hsv);
                addcolor = hsv_add(topdivs[i].color_hsv);
                div_color[topdivs[i].pcode] = bcolor;
                div_color_add[topdivs[i].pcode] = addcolor;
            }
        }

        debugger;
    </script>
    <script>
      function create_div_list() {
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
var phones = [{ 'number': '2162013', 'room': '121', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2162045', 'room': '207', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162046', 'room': '309', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2162071', 'room': '323', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162089', 'room': '22', 'lab': 'LHEP', 'building': '7 Ц.база' },
{ 'number': '2162190', 'room': '209', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162193', 'room': '441', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162224', 'room': '202', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2162276', 'room': '20', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162283', 'room': '31', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2162328', 'room': '101', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162382', 'room': '216(конференцзал)', 'lab': 'LHEP', 'building': '217 Участок сборки СП магнитов (зал),' },
{ 'number': '2162429', 'room': '430', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162474', 'room': '309', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162614', 'room': '208', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162654', 'room': '21', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162709', 'room': '21', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2162803', 'room': '222(библиотека)', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2162840', 'room': '14', 'lab': 'LHEP', 'building': '43' },
{ 'number': '2162861', 'room': '324', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2162854', 'room': '35', 'lab': 'LHEP', 'building': '32' },
{ 'number': '2162837', 'room': '22', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2162897', 'room': '313', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162902', 'room': '1 2этаж левое крыло', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2162906', 'room': '2 2этаж левое крыло', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2162879', 'room': '111', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162907', 'room': '18', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2162911', 'room': '1', 'lab': 'LHEP', 'building': '1Б' },
{ 'number': '2162943', 'room': '4 2этаж левое крыло', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2162924', 'room': '23', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2163028', 'room': '322', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162997', 'room': '24', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2163054', 'room': '231', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163049', 'room': '205(левая сторона)', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2163055', 'room': '226', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163080', 'room': '48', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2163213', 'room': '110', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163250', 'room': '305', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163260', 'room': '33', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2163310', 'room': '312,319', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163338', 'room': '34', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2163390', 'room': '314', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163441', 'room': '230, 228', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163443', 'room': '107', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163513', 'room': '307', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163592', 'room': '22', 'lab': 'LHEP', 'building': 'старый криогенный' },
{ 'number': '2163570', 'room': '301а', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2163632', 'room': '3', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2163650', 'room': '201/1', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163722', 'room': '301', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163712', 'room': '201', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163821', 'room': '314', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2163825', 'room': '303', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2163836', 'room': '28', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2163882', 'room': '434', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163934', 'room': '32', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2163915', 'room': '206', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163904', 'room': ' 229, ком.228(на вр.ремонта данные 2165126)', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163949', 'room': '120', 'lab': 'LHEP', 'building': '216' },
{ 'number': '2163992', 'room': '203', 'lab': 'LHEP', 'building': '216' },
{ 'number': '2164034', 'room': 'мастера', 'lab': 'LHEP', 'building': '7' },
{ 'number': '2164014', 'room': '21', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2164038', 'room': '203', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164013', 'room': '440', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164057', 'room': '207', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2164142', 'room': '111а, 111б', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2164145', 'room': '109, 317', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2164274', 'room': '202', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164261', 'room': '321', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164276', 'room': '207', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164369', 'room': '112', 'lab': 'LHEP', 'building': '205 установка Дельта LNS' },
{ 'number': '2164404', 'room': '25', 'lab': 'LHEP', 'building': '32(старый криогенный)' },
{ 'number': '2164490', 'room': '301/2', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164503', 'room': '313', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164488', 'room': '202-1', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164573', 'room': '212', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164602', 'room': '206', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2164620', 'room': '209', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2164652', 'room': '237', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164672', 'room': '5/2', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2164694', 'room': '45', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2164749', 'room': '103', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2164756', 'room': '445', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164753', 'room': '106б', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2164805', 'room': '318', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164853', 'room': '305', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2165031', 'room': '302', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2165015', 'room': '307', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165025', 'room': '107', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165054', 'room': '426', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165113', 'room': '29 ком.31', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2165116', 'room': '404', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165124', 'room': '305', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165143', 'room': '231', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165196', 'room': '210', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165202', 'room': '124в', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165178', 'room': '317', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165244', 'room': '213', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165329', 'room': '217', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2165391', 'room': '208', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165416', 'room': '13', 'lab': 'LHEP', 'building': '7 Ц.база' },
{ 'number': '2165448', 'room': '238', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165528', 'room': '411', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165593', 'room': '201', 'lab': 'LHEP', 'building': '1 здание инжектора ЛУ-20' },
{ 'number': '2165612', 'room': '201', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2165578', 'room': '210', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2165654', 'room': '204', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2165652', 'room': '204', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165653', 'room': '313б', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2165666', 'room': '38', 'lab': 'LHEP', 'building': '39(адм' },
{ 'number': '2165715', 'room': '219', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165713', 'room': '202', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165756', 'room': '301', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2165776', 'room': '320', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165807', 'room': '101', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165859', 'room': '30', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2165884', 'room': '26', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2165940', 'room': '45', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2165922', 'room': '35', 'lab': 'LHEP', 'building': '4' },
{ 'number': '2165994', 'room': '23', 'lab': 'LHEP', 'building': '7 Ц.база' },
{ 'number': '2166106', 'room': '121 СТИ', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2166107', 'room': '3', 'lab': 'LHEP', 'building': '202' },
{ 'number': '2166238', 'room': '308', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2166420', 'room': '303', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2166425', 'room': '211', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2166551', 'room': '4', 'lab': 'LHEP', 'building': '202' },
{ 'number': '2166619', 'room': '306', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2166589', 'room': '305', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2166754', 'room': '203', 'lab': 'LHEP', 'building': '236(модульный)' },
{ 'number': '2167221', 'room': '114', 'lab': 'LHEP', 'building': '1' },
{ 'number': '2167228', 'room': '309', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162060', 'room': '227', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2166267', 'room': '219', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163418', 'room': '16', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2163976', 'room': '103', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162948', 'room': '204', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163279', 'room': '2', 'lab': 'LHEP', 'building': '22' },
{ 'number': '2165510', 'room': '103', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162904', 'room': '1', 'lab': 'LHEP', 'building': '1Б' },
{ 'number': '2165658', 'room': '209', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162536', 'room': '216', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2165343', 'room': '223', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165180', 'room': '29', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2162800', 'room': '103а', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162823', 'room': '211', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162814', 'room': '2', 'lab': 'LHEP', 'building': '43' },
{ 'number': '2166652', 'room': '2', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2162094', 'room': '103а', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2162985', 'room': ' 328', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162973', 'room': '311', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165579', 'room': '303', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2166245', 'room': '101', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2164021', 'room': '325б', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164831', 'room': '325', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2166831', 'room': '21,23,24', 'lab': 'LHEP', 'building': '8Г' },
{ 'number': '2162849', 'room': '9', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2167224', 'room': '10', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2167226', 'room': '105', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162025', 'room': '318', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2164453', 'room': '118', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163466', 'room': '116', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162822', 'room': '132', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162011', 'room': '205', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162065', 'room': '203', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165804', 'room': '114', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162033', 'room': '325', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162035', 'room': '202', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162922', 'room': '311', 'lab': 'LHEP', 'building': '2 радиоаппаратный зал,' },
{ 'number': '2162890', 'room': '201', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162043', 'room': '204', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162020', 'room': '202/2', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165960', 'room': '311', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162063', 'room': '225', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162083', 'room': '225', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162048', 'room': '5', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2162049', 'room': '1 ком.5', 'lab': 'LHEP', 'building': '7 Ц.база' },
{ 'number': '2162061', 'room': '204', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162072', 'room': '20', 'lab': 'LHEP', 'building': '7 Ц.база' },
{ 'number': '2162098', 'room': '131', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162087', 'room': '204', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162093', 'room': '118-119', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2162096', 'room': '308', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2162131', 'room': '211', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162269', 'room': '228', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162366', 'room': '438', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162488', 'room': '120', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162053', 'room': '339', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162086', 'room': '19', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2162828', 'room': '14 слесарно-сборочный участок', 'lab': 'LHEP', 'building': '4' },
{ 'number': '2162815', 'room': '306', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2162818', 'room': '424', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162821', 'room': '211', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2162866', 'room': '323', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162838', 'room': '36', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2162855', 'room': '43', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2162842', 'room': '102', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162847', 'room': '13) ЛФВЭ корп.215 ком.234', 'lab': 'LHEP', 'building': '' },
{ 'number': '2162836', 'room': '74а', 'lab': 'LHEP', 'building': '1Б' },
{ 'number': '2162882', 'room': '121', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162908', 'room': '213', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162889', 'room': '106', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162869', 'room': '215', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162929', 'room': '306', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162932', 'room': '216', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162925', 'room': '304', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162928', 'room': '17', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2162910', 'room': '14', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2162921', 'room': '4', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2162915', 'room': '301', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162927', 'room': '7', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2162944', 'room': '109', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162938', 'room': '210', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162940', 'room': '206', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162951', 'room': '325б', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162989', 'room': '41,42', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2162981', 'room': '302', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162988', 'room': '322', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162979', 'room': '101', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2162961', 'room': '325б', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162983', 'room': '213', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2162970', 'room': '111', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162996', 'room': '201', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2162998', 'room': '34', 'lab': 'LHEP', 'building': '4' },
{ 'number': '2163004', 'room': '204', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163043', 'room': '21', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2163063', 'room': '107', 'lab': 'LHEP', 'building': '216' },
{ 'number': '2163033', 'room': '312', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2164411', 'room': '119', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163092', 'room': '124б', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163070', 'room': '204', 'lab': 'LHEP', 'building': '216' },
{ 'number': '2163087', 'room': '219', 'lab': 'LHEP', 'building': '4' },
{ 'number': '2163045', 'room': '307', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2162993', 'room': '114', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2163094', 'room': '433', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163232', 'room': '443', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163268', 'room': '72', 'lab': 'LHEP', 'building': '1Б' },
{ 'number': '2163380', 'room': '302/2', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163382', 'room': '24 склад', 'lab': 'LHEP', 'building': '7 Ц.база' },
{ 'number': '2163381', 'room': '302', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163436', 'room': '302/1', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163473', 'room': '212', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163498', 'room': '5', 'lab': 'LHEP', 'building': '43' },
{ 'number': '2163492', 'room': '116', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163548', 'room': '102а', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163529', 'room': '4', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2163623', 'room': '302', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163669', 'room': '206', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163686', 'room': '316б', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2163718', 'room': '312', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2163735', 'room': '208', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163713', 'room': '224', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163724', 'room': '202,202/2', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163779', 'room': '202/2', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163820', 'room': '29,31', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2163807', 'room': '214', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163853', 'room': '18', 'lab': 'LHEP', 'building': '43' },
{ 'number': '2163855', 'room': '306, 307', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163846', 'room': '112', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163841', 'room': '317', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2163845', 'room': '336 стенд параллельный корп.1а п/ст 13-АРУ 6кВ', 'lab': 'LHEP', 'building': '216' },
{ 'number': '2163858', 'room': '206', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163850', 'room': '225', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163849', 'room': '6', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2163895', 'room': '110', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163878', 'room': '109', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2163881', 'room': '205', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163876', 'room': '2', 'lab': 'LHEP', 'building': '1А' },
{ 'number': '2163913', 'room': '311', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163928', 'room': '116а', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163932', 'room': '209', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2163901', 'room': '9', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2163919', 'room': '225', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163909', 'room': '105', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163936', 'room': '203', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163960', 'room': '207', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163952', 'room': '342', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163942', 'room': '201б', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163948', 'room': '103б', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2163990', 'room': '345', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163978', 'room': '18', 'lab': 'LHEP', 'building': '4 заготовительный участок' },
{ 'number': '2163971', 'room': '113а,113б', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2164044', 'room': '219', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2164037', 'room': '323', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164046', 'room': '323', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164052', 'room': '315', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164064', 'room': '113в,113г', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2164067', 'room': '330', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164081', 'room': '115', 'lab': 'LHEP', 'building': '216' },
{ 'number': '2164093', 'room': '380в', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164096', 'room': '114', 'lab': 'LHEP', 'building': '216' },
{ 'number': '2164334', 'room': '301/2,303', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164391', 'room': '301', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2164375', 'room': '122', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164476', 'room': '318/1', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164478', 'room': '301/2', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164636', 'room': '113', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164645', 'room': '208)', 'lab': 'LHEP', 'building': '205 2-й этаж ниша сервера (рядом с' },
{ 'number': '2164680', 'room': '308', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2164743', 'room': '301', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2164734', 'room': '325', 'lab': 'LHEP', 'building': '21' },
{ 'number': '2164773', 'room': '106', 'lab': 'LHEP', 'building': '217' },
{ 'number': '2164760', 'room': '20', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2164818', 'room': '335', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164792', 'room': '210', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164837', 'room': '26', 'lab': 'LHEP', 'building': '4 (гравер)' },
{ 'number': '2164912', 'room': '120', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164997', 'room': '123', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164972', 'room': '301/3, ком.308', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2164986', 'room': '17', 'lab': 'LHEP', 'building': '4 (мастерская)' },
{ 'number': '2165211', 'room': '203', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2165216', 'room': '433а', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165221', 'room': '206', 'lab': 'LHEP', 'building': '42' },
{ 'number': '2165318', 'room': '310', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165305', 'room': '103а', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2165388', 'room': '124а', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165393', 'room': '24', 'lab': 'LHEP', 'building': 'старый криогенный' },
{ 'number': '2165493', 'room': '212', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165615', 'room': '302', 'lab': 'LHEP', 'building': '2 пульт с/ф серверы ЛВС Нуклотрона' },
{ 'number': '2165590', 'room': '302', 'lab': 'LHEP', 'building': '2 пульт с/ф - антресоль' },
{ 'number': '2165592', 'room': '33', 'lab': 'LHEP', 'building': '4' },
{ 'number': '2166158', 'room': '327', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2166143', 'room': '13', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2166246', 'room': '303', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2166857', 'room': '214', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162092', 'room': '313', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165174', 'room': '227', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2163929', 'room': '313', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2162856', 'room': '226', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164938', 'room': '434а', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164949', 'room': '310', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164914', 'room': '210', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163262', 'room': '211', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2165468', 'room': '3', 'lab': 'LHEP', 'building': '236 (модульный)' },
{ 'number': '2164532', 'room': '114', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2163037', 'room': '301', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2163515', 'room': '301', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162066', 'room': '108', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162862', 'room': '204,205', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2163643', 'room': '112', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165575', 'room': '13', 'lab': 'LHEP', 'building': '8Б / /корп.8Г' },
{ 'number': '2162903', 'room': '303', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2164663', 'room': '215', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2166456', 'room': '447', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163322', 'room': '202', 'lab': 'LHEP', 'building': '1 ЛУ-20' },
{ 'number': '2164062', 'room': '224 (перекл.пункт)', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2162955', 'room': '206,221', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2163001', 'room': '1', 'lab': 'LHEP', 'building': '22' },
{ 'number': '2164248', 'room': '308', 'lab': 'LHEP', 'building': '205' },
{ 'number': '2165664', 'room': '313', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2163342', 'room': '434', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165033', 'room': '305', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165051', 'room': '209', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165080', 'room': '409', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165269', 'room': '337', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165289', 'room': '110', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165306', 'room': '235', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165297', 'room': '318', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165517', 'room': '207а', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165357', 'room': '323', 'lab': 'LHEP', 'building': '3' },
{ 'number': '2165469', 'room': '309', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165497', 'room': '44', 'lab': 'LHEP', 'building': '39' },
{ 'number': '2165547', 'room': '416', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165577', 'room': '220', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165620', 'room': '49 корп.215, ком.221', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2165717', 'room': '103а', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165690', 'room': '310', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165745', 'room': '223', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165767', 'room': '229', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165813', 'room': '326', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165806', 'room': '202', 'lab': 'LHEP', 'building': '203Б' },
{ 'number': '2165811', 'room': '124а', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165814', 'room': '16', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2165816', 'room': '206, 207', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165857', 'room': '12', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2165875', 'room': '228', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165889', 'room': '201', 'lab': 'LHEP', 'building': '2' },
{ 'number': '2165933', 'room': '112', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165953', 'room': '216', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2165993', 'room': '208', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2163758', 'room': '314', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2164692', 'room': '45', 'lab': 'LHEP', 'building': '39(адм)' },
{ 'number': '2163060', 'room': '18', 'lab': 'LHEP', 'building': '7 Ц.база' },
{ 'number': '2165516', 'room': '19', 'lab': 'LHEP', 'building': '7 Ц.база' },
{ 'number': '2162810', 'room': '8 гальванический участок', 'lab': 'LHEP', 'building': '4' },
{ 'number': '2163871', 'room': '308', 'lab': 'LHEP', 'building': '201' },
{ 'number': '2165126', 'room': '236(на вр.ремонта данные2163904)', 'lab': 'LHEP', 'building': '215' },
{ 'number': '2166205', 'room': '403', 'lab': 'LHEP', 'building': '215' }];
[end]


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
                //	console.log('>>>>>>PROCESS room num='+room_name+' '+JSON.stringify(all_rooms_data[i]));

                var room_floor = all_rooms_data[i].geometry.floor;
                var ppls_arr = [];
                if (room_name.length > 0) {
                        if (room_name == '201') { console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ROOM=' + room_name + ' litsotr len=' + lhep_sotr.length); }

                        for (let j = 0; j < lhep_sotr.length; j++) {
                                let tmprooms = [lhep_sotr[j].rooms.trim().toUpperCase()];
                                let building = lhep_sotr[j].buildings.trim().toUpperCase();
                                if (room_name == '201') { console.log(lhep_sotr.length + '$$$$$$$$$$ROOM=201 CHECK ' + JSON.stringify(lhep_sotr[j])); }
                                if (lhep_sotr[j].rooms.indexOf(',') > - 1) {
                                        tmprooms = lhep_sotr[j].rooms.toUpperCase().split(',');
                                        tmprooms.map(s => s.trim());
                                }
                                if (tmprooms.indexOf(room_name) > - 1 & building.indexOf('#plan_building_id#') > - 1) {

                                        let fio = lhep_sotr[j].f + " " + lhep_sotr[j].i + " " + lhep_sotr[j].o;
                                        ppls_arr.push({ "FL_ID": lhep_sotr[j].fl_id, "TABN": lhep_sotr[j].tabn, "TOPDIVCODE": lhep_sotr[j].TopParent_code, "SUBDIVCODE": lhep_sotr[j].SubTopParent_code, "FIO": fio });
                                        console.log('ROOM add sotr=' + room_name + ' add ppl ' + JSON.stringify(lhep_sotr[j]));
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




[draw rooms]

var check_sel;
var che;
var defaultDivColor = "##eeee00"
function toColor(num) {
        let out = ' ##' + (+ num).toString(16).padStart(6, '0');;
        return out;
}


function fill_rooms_info() {
//        console.log('!!!! BEGIN FILL INFO');
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

      var topdivs = [
        { pname: "Рук.", pcode: 101000, fcolor:"", subdivs: {} },
        { pname: "Гр. Сов. и К.",fcolor:"", pcode: 102000, subdivs: {} },
        { pname: "СИСТ", pcode: 103000, fcolor:"",subdivs: {} },
        {
          pname: "Отд.№1",
          pcode: 110000,
          fcolor:"",
          subdivs: {
            112000: { pname: "НЭОИФПУ" },
            111000: { pname: "НЭОУС" },
            115000: { pname: "НЭОРС" },
            117000: { pname: "НИКО" },
            114000: { pname: "НЭОИКН" },
            116000: { pname: "НИОСЭН" },
            113000: { pname: "НТОП" },
            129000: { pname: "НЭОСМТ" },
            125000: { pname: "ДСН" },
            126000: { pname: "НЭСОП" },
          },
        },
        {
          pname: "Отд.№2",
          pcode: 120000,
          fcolor:"",
          subdivs: {
            122000: { pname: "НЭОФТИ" },
            123000: { pname: "НЭОСФМС" },
            124000: { pname: "СФСКЯ" },
            127000: { pname: "НЭОТиМПП" },
          },
        },
        {
          pname: "Отд.№3",
          pcode: 130000,
          fcolor:"",
          subdivs: {
            135000: { pname: "НЭОФСТИ" },
            121000: { pname: "НЭОMД" },
            136000: { pname: "НЭОССАиРП" },
            137000: { pname: "НЭОБМ" },
          },
        },
        {
          pname: "Отд.№4",
          pcode: 140000,
          fcolor:"",
          subdivs: {
            142000: { pname: "НЭОФТИ  LHC" },
            134000: { pname: "Сф на АТЛАС" },
            141000: { pname: "НЭОФТИ  RHIC" },
            132000: { pname: "НЭОФ на CMS" },
          },
        },
        {
          pname: "Отд.№5",
          pcode: 150000,
          fcolor:"",
          subdivs: {
            157000: { pname: "СК" },
            156000: { pname: "СРС" },
            158000: { pname: "НМОКТС" },
            151000: { pname: "НЭОАФИ" },
          },
        },
        {
          pname: "Отд.№6",
          pcode: 170000,
          fcolor:"",
          subdivs: {
            172000: { pname: "ЦОЭП" },
            171000: { pname: "КО" },
            176000: { pname: "САСУТП ЛФВЭ" },
            170010: { pname: "ГВвЭОиРД" },
          },
        },
        { pname: "ПKO", pcode: 175000,fcolor:"", subdivs: {} },
        {
          pname: "ИЭТО",
          pcode: 189000,
          fcolor:"",
          subdivs: {
            189003: { pname: "Группа №3" },
            189004: { pname: "Группа №4" },
            189002: { pname: "Группа №2" },
            189001: { pname: "Группа №1" },
          },
        },
        {
          pname: "АХП",
          pcode: 190000,
          fcolor:"",
          subdivs: {
            192000: { pname: "Х.O." },
            191000: { pname: "Адм. бюро" },
          },
        },
        {
          pname: "ПФБ",
          fcolor:"",
          pcode: 195000,
          subdivs: {
            195003: { pname: "Группа №3" },
            195002: { pname: "Группа №2" },
            195001: { pname: "Группа №1" },
          },
        },
      ];
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
    console.log('hsl2rgb '+h+' '+s+' '+l);
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
    console.log(r+' '+g+' '+b);
    
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
         console.log('divcode '+divcode+' '+h);
         
         let aa =  hsl2rgb([h,1,0.60]);
         console.log('tryColor '+(h) + ' '+aa);
         return aa; 
         
     }

function addRooms() {
        roomsGrp.clearLayers();
        console.log(' Begin  add Rooms ' + roomsGrp + ' lit=' + 'JSON.stringify(lit)');
        check_sel = $("input[type='radio'][name='floornum']:checked").val();
        console.log(' BOUNDS ' + 'JSON.stringify(bounds)');
        image = L.imageOverlay('plan_editor/images/#lab_dir#/#b_name#_' + check_sel + '.png', bounds).addTo(lit_map);
        lit_map.fitBounds(bounds);
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
                var tColor= "black"
                var roomName = data[i].properties.name;
                let room_id = data[i].properties.id;
                let room_db = data[i];
                var Owner = "";
                var room_info = getRoomInfo(room_id);
                //    console.log('ROOM info'+JSON.stringify(room_info))
                
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
                        }
                        
                        console.log(JSON.stringify(room_db.properties.ext_use));
                        if (room_db.properties.ext_use.length>0) {
                                console.log('ext use = '+ JSON.stringify(room_db.properties.ext_use));
                                rColor = '##33E800'
                        }
                        if (roomName.indexOf('WC')>-1) {
                                rColor = '##FFFF00';
                                tColor = '##FFFF00';    
                        }
                        
                            
                         console.log('RCOLOR= = '+ rColor + ' ext='+room_db.properties.ext_use+' ppls'+room_info.PPLS);
                        
                descr += "<tr ><td class=plan_pop_td  colspan=-1>"
                descr += "Площадь: " + parseInt(room_info.SQR) + ' кв.м';
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
