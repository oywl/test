/**
 * Created by huangzh on 2018/10/31.
 */

var API = "http://webapp.gzcentaline.com.cn:8081/CBD/PaidAmountData/";


String.format = function(template, args) {
    if(! (template instanceof String || typeof template == "string")) return "";
    var originCheck = template.match(/%\?/);
    var  specifyCheck = template.match(/%\(([\w!@#\$%\^&\*\?<>:\{}\(\)]*?)\)\?/);
    if(null == originCheck && null == specifyCheck) return template;
    var entrySet = null;
    var argArr = Array.prototype.slice.call(arguments).slice(1, arguments.length);
    argArr.some(function(arg) {
        if(arg instanceof Object) {
            entrySet = arg;
            argArr.splice(argArr.indexOf(arg), 1);
            return true;
        }
    });
    if(entrySet != null) {
        template = template.replace(/%\(([\w!@#\$%\^&\*\?<>:\{}\(\)]*?)\)\?/g, function(mappingStr, key) {
            if(undefined == entrySet[key]) return mappingStr;
            return entrySet[key];
        });
    }
    var index = 0;
    template = template.replace(/%\?/g, function() {
        if(index < argArr.length) return argArr[index++];
    });
    return template;
};
