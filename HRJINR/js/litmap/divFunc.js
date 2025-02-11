

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
            console.log("item " + item);
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
        console.log("item " + item);
        return item;

    }
        
}