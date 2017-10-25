/**
 * 对一些不支持ES5/6浏览器补全功能
 */

const Obj = Object;
const AP = Array.prototype;
const RP = Range.prototype;

if (!AP.forEach) {
  AP.forEach = function(fn, sc) {
    for (let i = 0, l = this.length; i < l; i++) {
      if (i in this) {
        fn.call(sc, this[i], i, this);
      }
    }
  };
}

// ES6的特性
if (!Obj.assign) {
  Obj.assign = function(target) {
    target = Obj(target);
    for (let index = 1; index < arguments.length; index++) {
      const source = arguments[index];
      if (source != null) {
        for (const key in source) {
          if (Obj.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

// 将String的html代码转换成DOM对象是使用 ie9+
const RPdoc = document.implementation.createHTMLDocument('');
const RPrange = RPdoc.createRange();
const RPbody = RPdoc.body;
if (!RP.createContextualFragment) {
  RP.createContextualFragment = function(html) {
    RPbody.innerHTML = html;
    RPrange.selectNodeContents(RPbody);
    return RPrange.extractContents();
  };
}

