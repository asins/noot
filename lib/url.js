// 不支持上面的[]对象列

// 获取URL参数对象
// g.com?&a=1&a=2&b=3+1#a=4 => {a: [1,2,4], b: '3 1'}
export function params(url) {
    url = url || location.search || location.href;
    const params = {};
    const reg = /([^\s&?#=\/]+)=([^\s&?#=]+)/g;
    while (reg.exec(url)) {
        const key = decodeURIComponent(RegExp.$1);
        const val = decodeURIComponent(RegExp.$2.replace('+', '%20'));
        if (params[key] === undefined) {
            params[key] = val;
        } else if (isArray(params[key])) {
            params[key].push(val);
        } else {
            params[key] = [ params[key], val ];
        }
    }
    return params;
}

/*
 * 序列化param字符串
 * {a: [1,2,4], b: '3 1'} => a=1&a=2&a=4&b=3%201
 * 注意：不支持多级对象传入
 */
export function stringify(params = {}, ignoreArr = []) {
    const arr = [];
    for (const key in params) {
        let val = params[key];
        if (ignoreArr.indexOf(key) === -1 && val !== '' && val != null) {
            if (!Array.isArray(val)) val = [ val ];
            val.forEach(function(val) {
                arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
            });
        }
    }

    return arr.join('&');
}