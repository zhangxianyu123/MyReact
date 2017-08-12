/**
 * Created by dllo on 17/8/9.
 */
var webpage = require('webpage');
var page = webpage.create();
phantom.outputEncoding = 'utf-8';

var fs = require('fs');
page.onConsoleMessage = function (msg,lineNum,sourceId) {
    console.log('CONSOLE:'+msg);
};
page.open('http://daily.zhihu.com/',function (status) {
    if(status === 'success'){
        console.log('成功');
        console.log(page.title);

        page.includeJs('https://code.jquery.com/jquery-3.2.1.min.js',function () {
            setTimeout(function () {
                var arrString = page.evaluate(function () {
                    var arr = [];
                    $("img").each(function (index, element) {
                        var str2 = $(element).attr('src')
                        var re = /^http.{1,}.jpg$/g
                        var brr=re.test(str2)
                        if (brr){
                            arr.push(str2);
                        }
                    });
                    return arr;

                })
                fs.write('./douban.json',arrString,'w');
                phantom.exit(0);
            },100);
        })
    } else{
        console.log('失败');
        phantom.exit(0);
    }

});