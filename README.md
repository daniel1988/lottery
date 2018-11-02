# lottery

年会抽奖, 纯前端开发, 下载后即可运行测试.  数据采用`localStorage`存储.

进入`index.html`时,按`Enter`键时开始抽奖  再次按`Enter`键抽出相应奖项的名单

> 清理浏览器缓存等数据会导致抽奖数据丢失


## `js/helper/lucknum.js`

幸运数字抽奖

## `js/helper/staff.js `

员工信息配置

## `js/helper/prize.js`

奖品配置

## `js/helper/array.js`

封装了数组相应的排序算法与随机算法, 抽奖时用到的是`shuffleV2`

```
Array.prototype.shuffleV2 = function(){
    this.sort(function(){
       return ( Math.floor(Math.random()*100) % 2 ) == 0 ? 1 : -1;
    });
    return this;
}
```


## manager.html

抽奖简单管理页面 , 可清除所有数据重新开始抽奖
