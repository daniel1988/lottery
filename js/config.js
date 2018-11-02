require.config({
    baseUrl: 'js',
    paths: {
        'jquery': 'libs/jquery/dist/jquery.min',
        'store' : 'helper/store',
        'array' : 'helper/array',
        'lucknum'  : 'helper/lucknum',
        'acingball' : 'acingball',
        'staff' : 'helper/staff',
        'prize' : 'helper/prize',
        'manager': 'manager'
    },
    waitSeconds: 30,
    charset: 'utf-8' // 文件编码
});

// require(["jquery"],function($){
//     $(function(){
//         alert("load finished");
//     })
// });