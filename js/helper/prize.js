/**
 * @author DanielLuo
 * 奖励配置
 */
define(['store'], function(Store){

    var prizeList = [
        {
            name : '五等奖',
            totalCount: 30,
            perCount: 10,
            bingoNum: [],
            desc : ''
        },
        {
            name : '四等奖',
            totalCount: 10,
            perCount: 3,
            bingoNum: [],
            desc : ''
        },
        {
            name : '三等奖',
            totalCount: 10,
            perCount: 3,
            bingoNum: [],
            desc : ''
        },
        {
            name : '二等奖',
            totalCount: 10,
            perCount: 3,
            bingoNum: [],
            desc : ''
        },
        {
            name : '一等奖',
            totalCount: 6,
            perCount: 3,
            bingoNum: [],
            desc : ''
        },
        {
            name : '特等奖',
            totalCount: 3,
            perCount: 1,
            bingoNum: [],
            desc : ''
        },
    ];

    var Prize = {
        prize_key: 'prize_key',
        initPrize: function() {
            Store.set(this.prize_key, prizeList);
            console.log( "===========initPrize=============");
            return prizeList;
        },
        getPrize: function(){
            return Store.get(this.prize_key)
        },
        curPrize: function(){
            var prizeList = Store.get(this.prize_key);
            if ( prizeList == null ) {
                prizeList = this.initPrize();
            }

            for(var i=0; i<prizeList.length; i++) {
                var prize_obj = Prize[i];
                if ( prizeList[i].bingoNum.length < prizeList[i].totalCount ) {
                    return prizeList[i];
                }
            }

            window.location.href="data.html";
            // return prizeList[i-1];
        },
        pushPrize: function(num) {
            var prizeList = Store.get(this.prize_key);
            if ( prizeList == null ) {
                prizeList = this.initPrize();
            }
            // console.log( 'push number:' + num, prizeList);
            for( var i=0; i<prizeList.length; i++ ) {
                if ( prizeList[i].bingoNum.length < prizeList[i].totalCount ) {
                    prizeList[i].bingoNum.push(num);
                    break;
                }
            }
            Store.set(this.prize_key, prizeList);
        },
        curCount: function() {
            var prizeList = Store.get(this.prize_key);
            if ( prizeList == null ) {
                prizeList = this.initPrize();
            }
            for( var i=0; i<prizeList.length; i++ ) {
                if ( prizeList[i].bingoNum.length < prizeList[i].totalCount ) {

                    var left = prizeList[i].totalCount - prizeList[i].bingoNum.length;
                    if ( left < prizeList[i].perCount ) {
                        return left;
                    }
                    return prizeList[i].perCount;
                }
            }
            return 0;
        }

    }


    return Prize;

});