define(['store'], function(Store){


    var Staff = {
        staff_key: 'staff_key',
        initStaff: function(init=true) {
            var staffList = [];
            for( var i=1; i<70; i++ ) {
                var obj = {
                    luckNum: i,
                    name: 'Meizi' + i,
                    photo:  i + '.jpg'
                };
                staffList[i] = obj;
            }
            if( init ) {
                Store.set(this.staff_key, staffList);
            }


            console.log( "===========initStaff=============");
            return staffList;
        },
        getStaff: function(){
            var list = Store.get(this.staff_key);
            if ( list == null ) {
                list = this.initStaff();
            }
            return list;
        },
        spliceStaff: function(num) {
            var list = Store.get(this.staff_key);

            delete list[num];

            Store.set(this.staff_key, list);
        }
    }
    return Staff;

});