define(['jquery', 'array', 'lucknum', 'staff', 'prize'], function($, undefined, LuckNum, Staff, Prize){
        function initImage() {

            var staffList = Staff.getStaff();

            for(var i=1; i<staffList.length; i++ ) {
                var obj = staffList[i];
                if ( obj ) {
                    var img = '<a id="' + obj.luckNum + '"href="#"><img src="image/photo2/' + obj.luckNum + '.jpg" /></a>';
                    $("#div1").append(img);
                }

            }
        }

        var radius = 260; //旋转半径;
        var dtr = Math.PI / 180;
        var d = 300;

        var mcList = [];
        var active = false;
        var lasta = 1;
        var lastb = 1;
        var distr = true;
        var tspeed = 4;
        var size = 250;

        var mouseX = -55.8;
        var mouseY = 52.6;

        var howElliptical = 1;

        var aA = null;
        var oDiv = null;

        $(function(){
            initImage();
            var i = 0;
            var oTag = null;

            oDiv = document.getElementById('div1');

            aA = oDiv.getElementsByTagName('a');

            for (i = 0; i < aA.length; i++) {
                oTag = {};

                oTag.offsetWidth = aA[i].offsetWidth;
                oTag.offsetHeight = aA[i].offsetHeight;

                mcList.push(oTag);
            }

            sineCosine(0, 0, 0);
            positionAll();
            setInterval(update, 30);

            $(document).bind('keyup', function(e){

                if ( e.keyCode == 13 ) {
                    mouseX = Math.random() * 100;
                    mouseY = Math.random() * 100;

                    if ( mouseY < 30 ) {
                        mouseY += 30;
                    }

                    if ( mouseX < 30 ) {
                        mouseX += 30;
                    }

                    if ( active ) {
                        active = false;
                        tspeed = 10;
                        setTimeout(function(){
                            var arr = LuckNum.popLuckNum(3);
                            var staffList = Staff.getStaff();
                            for ( var i=0; i<arr.length; i++ ) {
                                var num = arr[i];
                                var img = '<div><h3>'+ staffList[num].name+'</h3><img src="image/photo2/' + num + '.jpg" /></div>&nbsp;&nbsp;';
                                $("#bingo").append(img);
                                $("#" + arr[i]).fadeOut();
                                Staff.spliceStaff(num);
                            }
                        }, 1000);
                    } else {
                        $("#bingo").html('');
                        active = true;
                        tspeed = 50;

                        var curPrize = Prize.curPrize();
                        $("#header").text(curPrize.name);
                    }
                }
            });
        })

        function update() {

            var a;
            var b;

            if (active) {
                a = ( - Math.min(Math.max( - mouseY, -size), size) / radius) * tspeed;
                b = (Math.min(Math.max( - mouseX, -size), size) / radius) * tspeed;
            } else {
                a = 0.18;
                b = 0.98;
            }

            var c = 0;
            sineCosine(a, b, c);
            for (var j = 0; j < mcList.length; j++) {
                var rx1 = mcList[j].cx;
                var ry1 = mcList[j].cy * ca + mcList[j].cz * ( - sa);
                var rz1 = mcList[j].cy * sa + mcList[j].cz * ca;

                var rx2 = rx1 * cb + rz1 * sb;
                var ry2 = ry1;
                var rz2 = rx1 * ( - sb) + rz1 * cb;

                var rx3 = rx2 * cc + ry2 * ( - sc);
                var ry3 = rx2 * sc + ry2 * cc;
                var rz3 = rz2;

                mcList[j].cx = rx3;
                mcList[j].cy = ry3;
                mcList[j].cz = rz3;

                per = d / (d + rz3);

                mcList[j].x = (howElliptical * rx3 * per) - (howElliptical * 2);
                mcList[j].y = ry3 * per;
                mcList[j].scale = per;
                mcList[j].alpha = per;

                mcList[j].alpha = (mcList[j].alpha - 0.6) * (10 / 6);
            }

            doPosition();
            depthSort();
        }

        function depthSort() {
            var i = 0;
            var aTmp = [];

            for (i = 0; i < aA.length; i++) {
                aTmp.push(aA[i]);
            }

            aTmp.sort(function(vItem1, vItem2) {
                if (vItem1.cz > vItem2.cz) {
                    return - 1;
                } else if (vItem1.cz < vItem2.cz) {
                    return 1;
                } else {
                    return 0;
                }
            });

            for (i = 0; i < aTmp.length; i++) {
                aTmp[i].style.zIndex = i;
            }
        }

        function positionAll() {
            var phi = 0;
            var theta = 0;
            var max = mcList.length;
            var i = 0;

            var aTmp = [];
            var oFragment = document.createDocumentFragment();

            //随机排序
            for (i = 0; i < aA.length; i++) {
                aTmp.push(aA[i]);
            }

            aTmp.sort(function() {
                return Math.random() < 0.5 ? 1 : -1;
            });

            for (i = 0; i < aTmp.length; i++) {
                oFragment.appendChild(aTmp[i]);
            }

            oDiv.appendChild(oFragment);

            for (var i = 1; i < max + 1; i++) {
                if (distr) {
                    phi = Math.acos( - 1 + (2 * i - 1) / max);
                    theta = Math.sqrt(max * Math.PI) * phi;
                } else {
                    phi = Math.random() * (Math.PI);
                    theta = Math.random() * (2 * Math.PI);
                }
                //坐标变换
                mcList[i - 1].cx = radius * Math.cos(theta) * Math.sin(phi);
                mcList[i - 1].cy = radius * Math.sin(theta) * Math.sin(phi);
                mcList[i - 1].cz = radius * Math.cos(phi);

                aA[i - 1].style.left = mcList[i - 1].cx + oDiv.offsetWidth / 2 - mcList[i - 1].offsetWidth / 2 + 'px';
                aA[i - 1].style.top = mcList[i - 1].cy + oDiv.offsetHeight / 2 - mcList[i - 1].offsetHeight / 2 + 'px';
            }
        }

        function doPosition() {
            var l = oDiv.offsetWidth / 2;
            var t = oDiv.offsetHeight / 2;
            for (var i = 0; i < mcList.length; i++) {
                aA[i].style.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
                aA[i].style.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';

                aA[i].style.fontSize = Math.ceil(12 * mcList[i].scale / 2) + 8 + 'px';

                aA[i].style.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
                aA[i].style.opacity = mcList[i].alpha;
            }
        }

        function sineCosine(a, b, c) {
            sa = Math.sin(a * dtr);
            ca = Math.cos(a * dtr);
            sb = Math.sin(b * dtr);
            cb = Math.cos(b * dtr);
            sc = Math.sin(c * dtr);
            cc = Math.cos(c * dtr);
        }

});