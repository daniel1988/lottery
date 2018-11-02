define(function(){

    var Store = {
        set: function(key, data) {
            var obj = JSON.stringify(data);
            return localStorage.setItem(key, obj);
        },
        get: function(key) {
            return  JSON.parse(localStorage.getItem(key));
        }

    }

    return Store;
});