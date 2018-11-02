requirejs(['jquery', 'prize', 'store', 'staff'], function($, Prize, Store, Staff) {

    var prizeList  = Prize.getPrize();
    // prizeList.sort(function(){return -1;});
    var plen = prizeList.length;

    var staffList = Staff.initStaff(false);




    for( var i = (plen-1); i>=0; i-- ) {
        var el = $('<div></div><br>');
        var h3 = $('<h3>' + prizeList[i].name + '</h3>');

        var subel = $('<div></div>');

        var bingoNums = prizeList[i].bingoNum;
        for( var j in bingoNums ) {
            var num = bingoNums[j];
            var img = '<div><h3>'+ staffList[num].name+'</h3><img src="image/photo2/' + num + '.jpg" /></div>';
            subel.append(img);
        }

        el.append(h3);
        el.append(subel);

        $("#reward").append(el);
        console.log( prizeList[i]);
    }

});