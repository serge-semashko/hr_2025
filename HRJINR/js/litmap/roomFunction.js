var mass_topid = [];
var mass_subid = [];
function sortTable(tbl) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = tbl;
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      // Check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
function fillRoomTable() {
	var tbl = document.getElementById('room_tbl');
	let data = [];
	let final_data = [];
	
	//отчистка таблицы
	$('#room_tbl tr').not(function () { return !!$(this).has('th').length; }).remove();
	
	//выборка людей подходящих под выбранные отделы/сектора
	for (i in aaa) {
                console.log(JSON.stringify(mass_topid));
		for (j in mass_topid) {
			console.log(Number(mass_topid[j])+' '+aaa[i].TopParent_code);
			if (Number(mass_topid[j]) == aaa[i].TopParent_code
				|| Number(mass_topid[j]) == aaa[i].SubTopParent_code) {
				if (aaa[i].rooms != "" && aaa[i].TopParent_code != "") {
					data.push(aaa[i]);
                }
            }
		}

	}
	
	for (i in data) {
		flag = 0;
		for (j in final_data) {

			//проверка существует ли такая комната
			if (final_data[j][2] == data[i].rooms) {

				if (final_data[j][3].indexOf(data[i].f + " " + data[i].i + " " + data[i].o) < 0) {
					final_data[j][3].push(data[i].f + " " + data[i].i + " " + data[i].o);

					var sublabel = " ";
					if (data[i].SubTopParent_code != "") {

						var sublabel = divFunc(data[i].SubTopParent_code);;

						//if (sublabel == null) {
						//	sublabel = " ";
						//}

					}
					final_data[j][6].push(sublabel);
					
				}
				flag = 1;
			}
			
		}
		
		if (flag == 0) {

			let floor = data[i].rooms[0];
			let label = divFunc(data[i].TopParent_code);

			//if (label != null) {
			//	label = label.textContent;
			//} else {
			//	label = " ";
   //         }

			var sublabel = " ";
			if (data[i].SubTopParent_code != "") {

				var sublabel = divFunc(data[i].SubTopParent_code);;

				//if (sublabel == null) {
				//	sublabel = " ";
				//}

			}
			
			let item = [final_data.length+1, floor, data[i].rooms, [data[i].f + " " + data[i].i + " " +
				data[i].o], data[i].phone, label, [sublabel]];
			final_data.push(item);

        }
	}
	console.log("rooms count " + final_data.length);

	//добавление строки
	for (var i = 0; i < final_data.length; i++) {

		const row = document.createElement("tr");
		for (let j = 0; j < 7; j++) {

			const cell = document.createElement("td");
            var cellText = ''; //инициализацию текста ячейки
			if ( Array.isArray(final_data[i][j]) ) {
				for (k in final_data[i][j]) {
					if (cellText.length > 0) {
						cellText += '<br>'
					}//если не первая строка - вставляем разбивку 
					cellText += final_data[i][j][k];
				}
				cell.innerHTML = cellText;

			} else {
				cell.innerHTML = final_data[i][j];
			}
			
			row.appendChild(cell);

		}
		tbl.appendChild(row);
        }

//	sortTable(tbl)	;

	console.log('ok');

};
        function fillPplsTable() {

            $('#sotr_tbl tr').not(function () { return !!$(this).has('th').length; }).remove();
            const tblBody = document.getElementById("sotr_tbl");
            let ordnum = 0;
            for (var h = 0; h < mass_topid.length; h++) { 
                for (var i = 0; i < aaa.length; i++) {

                    let fio = aaa[i].f + ' ' + aaa[i].i + ' ' + aaa[i].o;
//                    let arr = [aaa[i].tabn, aaa[i].rooms[0], aaa[i].rooms, fio, aaa[i].phone, divFunc(aaa[i].TopParent_code),divFunc( aaa[i].SubTopParent_code)];
                    let arr = ['i', aaa[i].rooms[0], aaa[i].rooms, fio, aaa[i].phone, divFunc(aaa[i].TopParent_code),divFunc( aaa[i].SubTopParent_code)];
                    if (aaa[i].rooms.length > 2) {
                        if (mass_topid[h] == aaa[i].TopParent_code || aaa[i].SubTopParent_code == mass_topid[h]) {         
			    arr[0] = ++ordnum	;
                            for (let i = 0; i < 1; i++) {
                                const row = document.createElement("tr");
                                for (let j = 0; j < 7; j++) {

                                    const cell = document.createElement("td");
                                    const cellText = document.createTextNode(arr[j]);

                                    cell.appendChild(cellText);
                                    row.appendChild(cell);
                                }
                                tblBody.appendChild(row);
                            }
                        }
                    }
                }
            }
//	sortTable(tblBody)	;
        };

//};