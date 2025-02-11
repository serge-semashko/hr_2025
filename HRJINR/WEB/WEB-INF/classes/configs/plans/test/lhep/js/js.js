var polygon1;
var poliline_data;
var coordinates;
var polygon2;
var save_poliline_data;
var flagok = 1;
var polygoni = [];
//const menu = document.querySelector('.container');
//const open = document.querySelector('.menu__open');
//const close = document.querySelector('.menu__close');


//close.addEventListener('click', () => {
//    menu.classList.remove('menu_open');
//});



var s;
var json_poly = [];
function Save() {
    //polygon1.disableEdit();
    for (let i of polygoni) {
        i.disableEdit();
        s = i.toGeoJSON().geometry.coordinates[0];
        s.shift();
        json_poly.push(s);
    }
    //s = polygon1.toGeoJSON().geometry.coordinates[0];
   /* s.shift();*/
    //save_poliline_data = JSON.stringify(s);
    save_poliline_data = JSON.stringify(json_poly);

    poliline_data = s;
    console.log(save_poliline_data);
    console.log(typeof (save_poliline_data));
    console.log(poliline_data);
    console.log(typeof (poliline_data));
}

function Edit() {
    //console.log(polygoni);
    for (let i of polygoni) {
        console.log(i);
        i.enableEdit();
    }
    //polygon1.enableEdit();
    flagok = 0;
}
function Edit2() {
    for (let i of polygoni) {
        i.disableEdit();
    }
    //polygon1.disableEdit();
    flagok = 1;
}
function Create() {

    //document.getElementById('asd').disabled = true;
    document.getElementById('edite').disabled = false;
    polygon1 = L.polygon([
        [bounds[0][0], bounds[0][1]],
        [bounds[1][0], bounds[0][1]],
        [bounds[1][0], bounds[1][1]],
        //[bounds[0][0], bounds[1][1]]
    ]
        , { fillOpacity: 0.51, color: '#FFF000', weight: 2 }).addTo(lit_map);
    polygoni.push(polygon1);
    if (flagok == 0) {
        polygon1.enableEdit();
    }
   
}


function Show() {
    polygon1 = L.polygon([
        [bounds[0][0], bounds[0][1]],
        [bounds[1][0], bounds[0][1]],
        [bounds[1][0], bounds[1][1]],
        //[bounds[0][0], bounds[1][1]]
    ]
        , { fillOpacity: 0.51, color: '#FF0000', weight: 2 }).addTo(lit_map);
    polygon1.remove();
    //coordinates = [[423.453125, 628.890625], [458.28125, 628.8125], [458.34375, 187.5], [422.78125, 187.5], [422.8125, 151.75], [119.46875, 151.6875], [119.375, 277.1875], [269.875, 277.125], [269.9375, 540.75], [119.5, 540.6875], [119.375, 665.75], [423.25, 665.6875], [423.453125, 628.890625]];
    console.log(poliline_data);
    //var d = [[0, 0], [0, 827.25], [584.75, 827.25], [0, 0]];
    polygon1 = L.polygon(poliline_data, { fillOpacity: 0.51, color: '#FF0000', weight: 2 }).addTo(lit_map);

}
function Show_floor(){
    polygon1.remove();
    coordinates = [[423.453125, 628.890625], [458.28125, 628.8125], [458.34375, 187.5], [422.78125, 187.5], [422.8125, 151.75], [119.46875, 151.6875], [119.375, 277.1875], [269.875, 277.125], [269.9375, 540.75], [119.5, 540.6875], [119.375, 665.75], [423.25, 665.6875], [423.453125, 628.890625]];
    polygon1 = L.polygon(coordinates, { fillOpacity: 0.51, color: '#FF0000', weight: 2 }).addTo(lit_map);
}
function Edit_Show() {
    polygon1.enableEdit();
}
function Show_res(poldata, kol) {

    if (kol == 0) {
        if (polygoni.length != 0) {
                for (let i = 0; i < polygoni.length; i++) {
                    polygoni[i].remove();
                    console.log("removing");
                }
        }
        polygoni = [];
    }
    
    //polygoni = [];
    console.log('SHOW RESS', kol);
    document.getElementById('asd').disabled = false;
    document.getElementById('edite').disabled = false;
    var poldata1 = JSON.parse(poldata);
    coordinates = poldata1;
    console.log(coordinates);
    if (flagok == 0) {
        console.log(1);
        let coord = JSON.parse(coordinates)
        console.log("coord ", coord);
        polygon1 = L.polygon(coord, { fillOpacity: 0.51, color: '#FFF000', weight: 2 }).addTo(lit_map);
        polygon1.disableEdit();
        polygoni.push(coord);
    }
    else {
        console.log(2);
        let coord = JSON.parse(coordinates)
        console.log("coord ",coord);
        polygon1 = L.polygon(coord, { fillOpacity: 0.51, color: '#FFF000', weight: 2 }).addTo(lit_map);
        polygon1.disableEdit();
        polygoni.push(polygon1);
        //for (let i = 0; i < coord.length; i++) {
       
        //}
    }
  
    console.log(polygoni);
  
}
