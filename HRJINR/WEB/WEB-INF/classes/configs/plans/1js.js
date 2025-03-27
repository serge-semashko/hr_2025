function center_plan(constr_id, floor_num, room_id,coord) {

    let aa = $('[id=' + floornum + '][name=floornum]');
    console.log('[id=' + floornum + '][name=floornum]')
    aa.click();
    addRooms();
    coord = JSON.parse(coord);
    let geo = [0, 0];
    for (i in coord) {
        geo[0] += coord[i][0];
        geo[1] += coord[i][1];
        //   console.log('CENTER ROOM !!!!!!!!!!!!!!!!! ' + geo + '  ' + i + '= ' + rooms_info[r].geo_json[i])
    }
    geo[0] /= coord.length;
    geo[1] /= coord.length;
    // console.log(geo + '  ' + rooms_info[r].geo_json.length);
    red_mark.setLatLng(geo);
    roomsGrp.addLayer(red_mark);
    lit_map.panTo(geo)
}
