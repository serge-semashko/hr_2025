function get_image(){
    let flor_num = document.getElementById("selectFloorId");
    // var value = flor_num.value;
    let text = flor_num.options[flor_num.selectedIndex].text;
    console.log("flor_num = ", text);

    let build_id = document.getElementById("select_get_building_id");
    //console.log("build_id= ", build_id.options[build_id.selectedIndex].text);
    let num = build_id.options[build_id.selectedIndex].value;
    console.log("build_id = ", num);

    build_id = num;
    floor_num = text;

    let obj_type = 'building_image';
//    let url = 'http://127.0.0.1:8082/get_picture?' + "building_id=" + num.toString() + "&floor_num=" + text.toString() + "&object_type=" + obj_type.toString();
    let url = 'https://lt-svr230.jinr.ru:8082/get_picture?' + "building_id=" + num.toString() + "&floor_num=" + text.toString() + "&object_type=" + obj_type.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                image = document.createElement('img');
                image.src = url;
                image = L.imageOverlay(image, bounds).addTo(lit_map);
            } else {
                alert('Нет изображения для выбранного этажа.');
            }
        });
}

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

//    let url = 'http://127.0.0.1:8082/upload_file?' + "building_id=" + num.toString() + "&floor_num=" + text.toString() + "&object_type=" + obj_type.toString() + "&fileName=" + fileName.toString();
    let url = 'https://lt-svr230.jinr.ru:8082/upload_file?' + "building_id=" + num.toString() + "&floor_num=" + text.toString() + "&object_type=" + obj_type.toString() + "&fileName=" + fileName.toString();

    fetch(url,{
        method:"POST",
        // body: {files:files[0]}, // wrong
        body: data,
    })
        .then(function (response) {
        return response.json()
    })
    // .then(function(data){ // use different name to avoid confusion
    .then(function(res){
        console.log('success')
        console.log(res)
    })

}

function saveBuildingIcon(building_id, floor_id, object_type, str_data) {
    url = 'https://lt-svr230.jinr.ru:8082/save_object_data?' + "building_id=" + building_id.toString() +
        "&floor_num=" + floor_id + "&object_type=" + object_type.toString() + "&json=" + str_data.toString();
//    url = 'http://127.0.0.1:8082/save_object_data?' + "building_id=" + building_id.toString() +
//         "&floor_num=" + floor_id + "&object_type=" + object_type.toString() + "&json=" + str_data.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('save connected');
                console.log('saving ' + str_data);
            }
            // response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function loadBuildingIcon(building_id, floor_id, object_type, func) {
    let url = 'https://lt-svr230.jinr.ru:8082/load_object_data?' + "building_id=" + building_id.toString() +
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

function saveBuildingObject(building_id, floor_id, object_type, str_data) {
    url = 'https://lt-svr230.jinr.ru:8082/save_object_data?' + "building_id=" + building_id.toString() +
        "&floor_num=" + floor_id + "&object_type=" + object_type.toString() + "&json=" + str_data.toString();
//    url = 'http://127.0.0.1:8082/save_object_data?' + "building_id=" + building_id.toString() +
//         "&floor_num=" + floor_id + "&object_type=" + object_type.toString() + "&json=" + str_data.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('save connected');
                console.log('saving ' + str_data);
            }
            // response.json()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function loadBuildingObject(building_id, floor_id, object_type, func) {
    let url = 'https://lt-svr230.jinr.ru:8082/load_object_data?' + "building_id=" + building_id.toString() +
        "&floor_num=" + floor_id + "&object_type=" + object_type.toString();
//    let url = 'http://127.0.0.1:8082/load_object_data?' + "building_id=" + building_id.toString() +
//        "&floor_num=" + floor_id + "&object_type=" + object_type.toString();
    fetch(url)
        .then((response) => {
            if (response.ok) {
                console.log('load connected');
                return response.json();
            } else {
                alert('Ждя данного этажа нет контура.');
                console.log('save failed');
            }
        })
        .then((data) => {
            func(data);
        });
}

function create_select(div_id) {
    let url = 'https://lt-svr230.jinr.ru:8082/get_buildings';
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

function get_commentary(){
    //let url = 'http://127.0.0.1:8082/get_commentary?' + "object_type=" + obj_type.toString() + "&object_name=" + obj_name.toString();
    let url = 'https://lt-svr230.jinr.ru:8082/get_commentary?' + "object_type=" + obj_type.toString() + "&object_name=" + obj_name.toString();
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

function create_type_select(div_id) {
    let url = 'https://lt-svr230.jinr.ru:8082/get_types';
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

function change_type(obj_type_old, obj_name_old, obj_name, obj_comm){
    //console.log('changing ' + obj_type_old + ': ' + obj_name_old + ' to ' + obj_name);

    let img = document.getElementById('fileName_icon');
    console.log(img.files);
//    console.log(obj_comm == "");
    if (img.files.length == 0){
//        let url = 'http://127.0.0.1:8082/change_mark_type_no_pic?' + "obj_type_old=" + obj_type_old.toString() + "&obj_name_old=" + obj_name_old.toString() + "&obj_name_new=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();
        let url = 'https://lt-svr230.jinr.ru:8082/change_mark_type_no_pic?' + "obj_type_old=" + obj_type_old.toString() + "&obj_name_old=" + obj_name_old.toString() + "&obj_name_new=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();        fetch(url)
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
        let url = 'https://lt-svr230.jinr.ru:8082/change_mark_type_with_pic?' + "obj_type_old=" + obj_type_old.toString() + "&obj_name_old=" + obj_name_old.toString() + "&obj_name_new=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();        fetch(url,{
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

function new_type(obj_type, obj_name, obj_comm){
    console.log('creating');
    //console.log('we are here');
    let files = document.getElementById('fileName_icon').files;
    // your code start here
    var data = new FormData();
    data.append('files', files[0]) // maybe it should be '{target}_cand'
    console.log(data.get('files'));

//    let url = 'http://127.0.0.1:8082/create_mark_type?' + "obj_type=" + obj_type.toString() + "&obj_name=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();
    let url = 'https://lt-svr230.jinr.ru:8082/create_mark_type?' + "obj_type=" + obj_type.toString() + "&obj_name=" + obj_name.toString() + "&obj_comm=" + obj_comm.toString();
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