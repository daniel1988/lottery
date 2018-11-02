requirejs(['jquery', 'store', 'array', 'lucknum', 'prize', 'staff'], function($, Store, undefined, LuckNum, Prize, Staff) {


    // LuckNum.initLuckNum();
    // console.log( Prize ) ;

    $("#initLuckNum").click(function(){
        if ( window.confirm('确定初始化?') ) {
            LuckNum.initLuckNum();
        }
    })


    $("#initPrize").click(function(){
        if ( window.confirm('确定初始化?') ) {
            Prize.initPrize();
        }
    })


    $("#initStaff").click(function(){
        if ( window.confirm('确定初始化?') ) {
            Staff.initStaff();
        }
    })


    $("#initAll").click(function(){
        if ( window.confirm('清除后所有数据都会丢失!!!!! 确定初始化?') ) {
            Prize.initPrize();

            Staff.initStaff();

            LuckNum.initLuckNum();

            window.location = 'index.html';
        }
    })
});