/**
 * Created by dllo on 17/8/12.
 */
/**
 * Created by dllo on 17/8/8.
 */
var path = require('path');
var fs = require('fs');
var request = require('request');

function download(url,directory,filename) {
    //根据当前,目录生成文件夹目录
    var dir = path.join(__dirname,directory);
    //判断文件夹是否存在
    var isDirectory = fs.existsSync(dir);
    //不存在创建
    if(!isDirectory){
        fs.mkdir(dir);
    }
    //生成保存文件路径
    var filepath = path.join(dir,filename);
    //下载并保存
    request(url).pipe(fs.createWriteStream(filepath));
}

module.exports = download;