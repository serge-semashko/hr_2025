//сохранение сотрудников
function save_employes(emp_list, room_num, b_id){
    console.log(emp_list[0].fire_emp);
    tab_n = emp_list[0].fire_emp;
    let url = 'https://lt-svr230.jinr.ru:8082/save_emp?' + "build=" + b_id.toString() + "&room_num=" +
    room_num.toString() + "&tab_n=" + tab_n.toString() + "&o_type=2";

    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('employee saved ' + tab_n)
            }
        });

    for (let i = 0; i < emp_list[0].empl.length; i++){
        tab_n = emp_list[0].empl[i];
        let url = ' https://lt-svr230.jinr.ru:8082/save_emp?' + "build=" + b_id.toString() + "&room_num=" +
        room_num.toString() + "&tab_n=" + tab_n.toString() + "&o_type=1";

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    console.log('employee saved ' + tab_n)
                }
            });
    }
}

//загрузка сотрудников
function load_employes(b_id, room_num){
    console.log('load');
    let url = ' https://lt-svr230.jinr.ru:8082/load_emp?' + "build=" + b_id.toString() + "&room_num=" + room_num.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('load complete')
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
        })
}

//обновление описания комнаты
function update_room_descr(room_descr, floor_num, room_num, b_id){
    console.log('update');
    url = ' https://lt-svr230.jinr.ru:8082/update_room?' + "building_id=" + b_id.toString() +
        "&floor_num=" + floor_num.toString() + "&room_num=" + room_num.toString() + "&json=" + room_descr.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('save connected');
                console.log('saving ' + room_descr);
            }
            // response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//загрузка подложки здания
function get_image(){
    let flor_num = document.getElementById("selectFloorId");
    // var value = flor_num.value;
    let text = flor_num.options[flor_num.selectedIndex].text;
    console.log("flor_num= ", text);

    let build_id = document.getElementById("select_get_building_id");
    //console.log("build_id= ", build_id.options[build_id.selectedIndex].text);
    let num = build_id.options[build_id.selectedIndex].value;
    console.log("build_id= ", num);

    build_id = num;
    floor_num = text;

    let obj_type = 'building_image';
//    let url = 'http://127.0.0.1:8082/get_picture?' + "building_id=" + num.toString() + "&floor_num=" + text.toString() + "&object_type=" + obj_type.toString();
    let url = ' https://lt-svr230.jinr.ru:8082/get_picture?' + "building_id=" + num.toString() + "&floor_num=" + text.toString() + "&object_type=" + obj_type.toString();

    fetch(url)
        .then((response) => {
        if (response.ok) {
            image = document.createElement('img');
            image.src = url;
            image = L.imageOverlay(image, bounds).addTo(lit_map);
        } else {
            alert('нет изображения для выбранного этажа');
        }
        });
    
}

//сохранение изображения как подложка здания
function file_upload() {
    let fileName = document.getElementById('fileName').files[0].name;
    console.log(fileName);
    let files =   document.getElementById('fileName').files;
    // your code start here
    var data = new FormData();
    data.append('files', files[0]) // maybe it should be '{target}_cand'
    console.log(data.get('files'))

    let flor_num = document.getElementById("selectFloorId");
    // var value = flor_num.value;
    let text = flor_num.options[flor_num.selectedIndex].text;
    console.log("flor_num= ", text);

    let build_id = document.getElementById("select_get_building_id");
    //console.log("build_id= ", build_id.options[build_id.selectedIndex].text);
    let num = build_id.options[build_id.selectedIndex].value;
    console.log("build_id= ", num);

    build_id = num;
    floor_num = text;
    obj_type = 'building_image';
//    let url = 'http://127.0.0.1:8082/upload_file?' + "building_id=" + num.toString() + "&floor_num=" + text.toString() + "&object_type=" + obj_type.toString() + "&fileName=" + fileName.toString();
    let url = ' https://lt-svr230.jinr.ru:8082/upload_file?' + "building_id=" + num.toString() + "&floor_num=" + text.toString() + "&object_type=" + obj_type.toString() + "&fileName=" + fileName.toString();

    fetch(url,{
        method:"POST",
        // body: {files:files[0]}, // wrong
        body: data,
    })
    .then(function(response){
        return response.json()
    })
    // .then(function(data){ // use different name to avoid confusion
    .then(function(res){
        console.log('success')
        console.log(res)
    })

}

//сохранение иконок
function saveBuildingIcon(building_id, floor_id, object_type, str_data) {
    url = ' https://lt-svr230.jinr.ru:8082/save_object_data?' + "building_id=" + building_id.toString() +
        "&floor_num=" + floor_id + "&object_type=" + object_type.toString() + "&json=" + str_data.toString();
//    url = 'http://127.0.0.1:8082/save_object_data?' + "building_id=" + building_id.toString() +
//         "&floor_num=" + floor_id + "&object_type=" + object_type.toString() + "&json=" + str_data.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('save connected');
                console.log('saving ' + str_data);
                load_all_icon();
            }
            // response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//загрузка иконок
function loadBuildingIcon(building_id, floor_id, object_type, func) {
    let url = ' https://lt-svr230.jinr.ru:8082/load_object_data?' + "building_id=" + building_id.toString() +
        "&floor_num=" + floor_id + "&object_type=" + object_type.toString();
//    let url = 'http://127.0.0.1:8082/load_object_data?' + "building_id=" + building_id.toString() +
//         "&floor_num=" + floor_id + "&object_type=" + object_type.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('load connected');
                return response.json();
            } else {
                console.log('save failed');
            }
        })
        .then((data) => {
            func(data);
        });
}

//сохранение объекта
function saveBuildingObject(building_id, floor_id, object_type, str_data) {
    url = ' https://lt-svr230.jinr.ru:8082/save_object_data?' + "building_id=" + building_id.toString() +
        "&floor_num=" + floor_id + "&object_type=" + object_type.toString() + "&json=" + str_data.toString();
//    url = 'http://127.0.0.1:8082/save_object_data?' + "building_id=" + building_id.toString() +
//         "&floor_num=" + floor_id + "&object_type=" + object_type.toString() + "&json=" + str_data.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('save connected');
                console.log('saving ' + str_data);
                load_all();
            }
            // response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//загрузка объекта
function loadBuildingObject(building_id, floor_id, object_type, func) {
    let url = ' https://lt-svr230.jinr.ru:8082/load_object_data?' + "building_id=" + building_id.toString() +
        "&floor_num=" + floor_id + "&object_type=" + object_type.toString();
//    let url = 'http://127.0.0.1:8082/load_object_data?' + "building_id=" + building_id.toString() +
//        "&floor_num=" + floor_id + "&object_type=" + object_type.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('load connected');
                return response.json();
            } else {
                console.log('save failed');
            }
        })
        .then((data) => {
            func(data);
        });
}

//создания списка зданий
function create_select(div_id) {
    let url = ' https://lt-svr230.jinr.ru:8082/get_buildings';
//    let url = 'http://127.0.0.1:8082/get_buildings';
    fetch(url).then((response) => {
        if (response.ok) {
            console.log('select connected');
            return response.text();
        }
    }).then((data) => {
        console.log(data);
        document.getElementById(div_id).innerHTML = data;
    });
}

//создания списка зданий по их владельцу
function create_own_select(div_id, owner) {
    let url = ' https://lt-svr230.jinr.ru:8082/get_own_buildings?' + "owner=" + owner.toString();
    fetch(url).then((response) => {
        if (response.ok) {
            console.log('select connected');
            return response.text();
        }
    }).then((data) => {
        console.log(data);
        document.getElementById(div_id).innerHTML = data;
    });
}

//получение комментария к объекту
function get_commentary(){
    //let url = 'http://127.0.0.1:8082/get_commentary?' + "object_type=" + obj_type.toString() + "&object_name=" + obj_name.toString();
    let url = ' https://lt-svr230.jinr.ru:8082/get_commentary?' + "object_type=" + obj_type.toString() + "&object_name=" + obj_name.toString();
    fetch(url).then((response) => {
        if (response.ok) {
            console.log('select connected');
            return response.json();
        }
    }).then((data) => {
        console.log(data["commentary"]);
        document.getElementById('obj_comm').value = data["commentary"];
    });
}

//создание списка типов маркеров
function create_type_select(div_id) {
    let url = ' https://lt-svr230.jinr.ru:8082/get_types';
//    let url = 'http://127.0.0.1:8082/get_types';
    fetch(url).then((response) => {
        if (response.ok) {
            console.log('select connected');
            return response.text();
        }
    }).then((data) => {
        console.log(data);
        document.getElementById(div_id).innerHTML = data;
    });
}

//создание списка сотрудников по буквам
function get_employes_list(letters, id_emp){
    let url = ' https://lt-svr230.jinr.ru:8082/get_employes?' + "letters=" + letters.toString();
    fetch(url).then((response) => {
        if (response.ok) {
            console.log('select connected');
            return response.text();
        }
    }).then((data) => {
       
        findName(data, id_emp);
    });
}

//изменить тип маркера
function change_type(obj_type_old, obj_name_old, obj_name, obj_comm){
    //console.log('changing ' + obj_type_old + ': ' + obj_name_old + ' to ' + obj_name);

    let img = document.getElementById('fileName_icon');
    console.log(img.files);
//    console.log(obj_comm == "");
    if (img.files.length == 0){
//        let url = 'http://127.0.0.1:8082/change_mark_type_no_pic?' + "obj_type_old=" + obj_type_old.toString() + "&obj_name_old=" + obj_name_old.toString() + "&obj_name_new=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();
        let url = ' https://lt-svr230.jinr.ru:8082/change_mark_type_no_pic?' + "obj_type_old=" + obj_type_old.toString() + "&obj_name_old=" + obj_name_old.toString() + "&obj_name_new=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();        fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('change connected');
                console.log('changing ' + obj_type_old + ': ' + obj_name_old + ' to ' + obj_name);
                create_type_select("outputTypeSelect");
            }
            // response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        //console.log('we are here');
        let files = document.getElementById('fileName_icon').files;
        // your code start here
        var data = new FormData();
        data.append('files', files[0]) // maybe it should be '{target}_cand'
        console.log(data.get('files'));

//        let url = 'http://127.0.0.1:8082/change_mark_type_with_pic?' + "obj_type_old=" + obj_type_old.toString() + "&obj_name_old=" + obj_name_old.toString() + "&obj_name_new=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();
        let url = ' https://lt-svr230.jinr.ru:8082/change_mark_type_with_pic?' + "obj_type_old=" + obj_type_old.toString() + "&obj_name_old=" + obj_name_old.toString() + "&obj_name_new=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();        fetch(url,{
            method:"POST",
            // body: {files:files[0]}, // wrong
            body: data,
        })
        // .then(function(data){ // use different name to avoid confusion
        .then(function(res){
            console.log('success')
            console.log(res)
            create_type_select("outputTypeSelect");
        })
    }
}

//создать новый тип маркера
function new_type(obj_type, obj_name, obj_comm){
    console.log('creating');
    //console.log('we are here');
    let files = document.getElementById('fileName_icon').files;
    // your code start here
    var data = new FormData();
    data.append('files', files[0]) // maybe it should be '{target}_cand'
    console.log(data.get('files'));

//    let url = 'http://127.0.0.1:8082/create_mark_type?' + "obj_type=" + obj_type.toString() + "&obj_name=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();
    let url = ' https://lt-svr230.jinr.ru:8082/create_mark_type?' + "obj_type=" + obj_type.toString() + "&obj_name=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();
    fetch(url,{
        method:"POST",
        // body: {files:files[0]}, // wrong
        body: data,
    })
    .then(function(res){
        console.log('success')
        console.log(res)
        create_type_select("outputTypeSelect");
    })
}


//получить json сотрудников
function get_emp_js(lab_id){
    console.log(lab_id);

    let url = ' https://lt-svr230.jinr.ru:8082/get_emp_json?' + "lab_id=" + lab_id.toString();
    fetch(url)
    .then((response) => {
        if (response.ok) {
            console.log('get json');
            return response.json();
        }
    }).then((data) => {
        console.log(data);
        MAS_SOTR_OTDEL(data);
    })
}

//сохранить комнату сотрудника
function save_emp_rooms(tab_n, rooms_json){
    let url = ' https://lt-svr230.jinr.ru:8082/edit_emp_rooms?' + "tab_n=" + tab_n.toString() + "new_rooms=" + rooms_json.toString();
    fetch(url)
    .then((response) => {
        if (response.ok) {
            console.log('save completed');
        }
    })
}
//сохранить комнаты всех сотрудников
function save_all_emp_rooms(emp_rooms){
    var data = new FormData();
    data.append('emp_rooms', emp_rooms);

    //let url = ' https://lt-svr230.jinr.ru:8082/edit_all_emp_rooms?' + "emp_rooms=" + emp_rooms;
    let url = ' https://lt-svr230.jinr.ru:8082/edit_all_emp_rooms';
    fetch(url, {
        method: 'post',
        body: data
    })
    .then((response) => {
        if (response.ok) {
            console.log('save completed');
        }
    })
}