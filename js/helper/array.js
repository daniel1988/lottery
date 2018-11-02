define(function(){

    /**
     * 一维数组洗牌
     */
     Array.prototype.shuffleV1 = function(){
          var length = this.length;
          for ( var i=0; i<length; i++ ) {
               var rand = Math.floor(Math.random() * length);
               var tmp = this[1];
               this[1] = this[rand];
               this[rand] = tmp;
          }
          return this;
     }
     /**
       *  采用sort函数洗牌
       */
     Array.prototype.shuffleV2 = function(){
          this.sort(function(){
               //return Math.random() > 0.5 ? 1 : -1;
               return ( Math.floor(Math.random()*100) % 2 ) == 0 ? 1 : -1;
          });
          return this;
     }


     /**
     * Array BubleSort
     */
     Array.prototype.bubleSort = function (){
          var length = this.length;
          for(var i=0; i<length; i++) {
               for(var j=0; j<length-i-1; j++) {
                    if (this[j] > this[j+1]) {
                         var tmp = this[j];
                         this[j] = this[j+1];
                         this[j+1] = tmp;
                    }
               }
               console.log(this.toString());
          }
          return this;
     }

     /**
     * Array QuickSort
     */
     Array.prototype.quickSort = function (){
          if (this.length <=0 ) return this;
          console.log(this.toString());
          var x = this[0];
          var l = new Array();
          var r = new Array();
          for(var i=1; i<this.length; i++ ) {
               if (this[i] > x) {
                    r.push( this[i] );
               } else {
                    l.push( this[i] );
               }
          }
          l = l.quickSort();
          r = r.quickSort();
          return l.concat(x,r);
     }
     /**
     * Array InsertSort
     */
     Array.prototype.insertSort = function () {
          var j = 0;
          for(var i=1; i<this.length; i++ ) {
               j = i - 1;
               var tmp = this[i];
               while ( (j >= 0) &&  (this[j] > tmp) ) {
                    this[j+1] = this[j];
                    j--;
               }
               this[j+1] = tmp;
               console.log(this);
          }
          return this;
     }
});