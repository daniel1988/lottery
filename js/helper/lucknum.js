/**
 * @author DanielLuo
 */
define(['array', 'store','staff', 'prize'], function(undefined, Store, Staff, Prize){

    var LuckNum = {
        lucknum_key: 'lucknum_key',
        bingo_lucknum_key: 'bingo_lucknum_key',
        initLuckNum: function() {
            var staffList = Staff.getStaff();

            var luckNums = [];
            for( var i=1; i<staffList.length; i++ ) {
                luckNums.push( staffList[i].luckNum );
            }
            console.log( "===========initStaff=============");
            Store.set(this.lucknum_key, luckNums);
        },
        popLuckNum: function(count){

            count = Prize.curCount();

            var luckNums = Store.get(this.lucknum_key);

            if ( !luckNums  ) {
                return [];
            }

            luckNums = luckNums.shuffleV2();

            var bingoNum = [];
            if (luckNums.length < count ) {
                count = luckNums.length;
            }
            for( var i =0; i<count; i++ ) {
                var num = luckNums.pop()
                bingoNum.push( num );
                Prize.pushPrize(num);
                luckNums = luckNums.shuffleV2();
            }

            Store.set(this.lucknum_key, luckNums);
            return bingoNum;
        }

    }
    return LuckNum;
});