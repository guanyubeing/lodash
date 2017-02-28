//debugger;
var GuanYu = {
  chunk: function(arr, num) {
    var newarr = [];
    var tem = [];
    //建立两个新数组
    for (var i = 0; i < arr.length; i++) {
      tem.push(arr[i]);
      if (i % num == (num - 1)) {
        newarr.push(tem);
        tem = [];
        //tem数组一旦满足num，将tem push进入newarr数组中，同时tem数组清空
      }
    }
    if (tem.length !== 0) {
      newarr.push(tem);
      //防止空数组进入newarr数组中
    }
    return newarr;
  },
  compact: function(arr) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        newarr.push(arr[i]);
        //如果arr[i]不为布尔值为false的值，被push进入newarr数组
      }
    }
    return newarr;
  },
  concat: function(arr) {
    var newarr = arguments[0];
    //将arr数组赋予newarr数组
    for (var i = 1; i < arguments.length; i++) {
      if (typeof(arguments[i]) === 'object') {
        for (var j = 0; j < arguments[i].length; j++) {
          newarr.push(arguments[i][j]);
          //判断后续进入是否为数组，确认为数组将其遍历push进入newarr
        }
      }else {
        newarr.push(arguments[i]);
        //不为数组直接push
      }
    }
    return newarr;
  },
  difference: function(arr, value) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < value.length; j++) {
        //遍历两个数组，比较需要排除的数字
        if (arr[i] !== value[j]) {
          if (j == (value.length - 1)) {
            newarr.push(arr[i]);
            //如果数字不是需排除的数字将其push进入newarr
          }
        }else break;
      }
    }
    return newarr;
  },
  flatten: function(arr, isDeep) {
    var newarr = [];
    if (isDeep === true) {
      return GuanYu.flattenDeep(arr);
      //如果isDeep为true，则调用flattenDeep函数处理
    }else {
      for (var i = 0; i < arr.length; i++) {
        if ((arr[i].length !== undefined) && (typeof(arr[i]) === 'object')) {
          for (var j = 0; j < arr[i].length; j++) {
            newarr.push(arr[i][j]);
            //如果没有定义则将其遍历后push入newarr数组
          }
        }else {
          newarr.push(arr[i]);
        }
      }
    }
    return newarr;
  },
  flattenDeep: function(arr) {
    var newarr = [];
    var juc = false;
    for (var i = 0; i < arr.length; i++) {
      if ((arr[i].length === undefined) || (typeof(arr[i]) !== 'object')) {
        newarr.push(arr[i]);
        //判断遍历时的值是否为数组，将其push入newarr数组中
      }else {
        for (var j = 0; j < arr[i].length; j++) {
          newarr.push(arr[i][j]);
          juc = true;
          //是数组的话将其遍历推入
        }
      }
    }
    if (juc) {
      return GuanYu.flattenDeep(newarr);
      //如果上面数组中还存在数组，递归处理
    }
    return newarr;
  },
  drop: function(arr, value) {
    var newarr = [];
    if (value === undefined) {
      value = 1;
      //查看是否value存在，不存在则默认数值为一
    }
    for (var i = value; i < arr.length; i++) {
      newarr.push(arr[i]);
      //将规定数值以内数值push进入新数组
    }
    return newarr;
  },
  dropRight: function(arr, value) {
    var newarr = [];
    if (value === undefined) {
      value = 1;
      //查看是否value存在，不存在则默认数值为一
    }
    for (var i = 0; i < (arr.length - value); i++) {
      newarr.push(arr[i]);
      //将规定数值以内数值push进入新数组
    }
    return newarr;
  },
  fill: function(arr, value, start, end) {
    var newarr = arr;
    if (start === undefined) {
      start = 0;
      //看是否设置规定值，如未定义设置为0
    }
    if (end === undefined) {
      end = arr.length;
      //看是否设置规定值，如未定义设置为数组长度
    }
    for (var i = start; i < end; i++) {
      newarr[i] = value;
      //将数组规定值替换为规定字符
    }
    return newarr;
  },
  fromPairs: function(arr) {
    var newobj = {};
    for (var i = 0; i < arr.length; i++) {
      newobj[arr[i][0]] = arr[i][1];
      //将数组的对应赋予对象的属性与值
    }
    return newobj;
  },
  initial: function(arr) {
    var newarr = [];
    arr.pop();
    newarr = arr;
    return newarr;
    //将规定的数组最后一位删除
  },
  intersection: function(arr) {
    var obj = {};
    var newarr = [];
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        obj[arguments[i][j]] = 0;
        //建立一个对象，将数组值为对象属性，值都记为0
      }
    }
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        obj[arguments[i][j]]++;
        //数组值每出现一次对象属性加一
      }
    }
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        if (obj[arguments[i][j]] == arguments.length) {
          newarr.push(arguments[i][j]);
          delete obj[arguments[i][j]];
          //判断对象哪一属性值为相应数组数量，将其push进入newarr，并将相应属性删除
        }
      }
    }
    return newarr;
  },
  pull: function(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 1; j < arguments.length; j++) {
        if (arguments[j] === arr[i]) {
          arr.splice(i, 1);
          i--;
          if (i < 0) {
            i = 0;
          }
          break;
        }
      }
    }
    return arr;
  },
  pullAll: function(arr, arr1) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr1.length; j++) {
        if (arr1[j] === arr[i]) {
          arr.splice(i, 1);
          i--;
          if (i < 0) {
            i = 0;
          }
          break;
        }
      }
    }
    return arr;
  },
  map: function(arr, fun) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
      newarr.push(fun(arr[i], i, arr));
    }
    return newarr;
  },
  filter: function(arr, fun) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
      if (fun(arr[i], i, arr)) {
        newarr.push(arr[i]);
      }
    }
    return newarr;
  },
  partition: function(arr, fun) {
    var newarr = [[],[]];
    for (var i = 0; i < arr.length; i++) {
      if (fun(arr[i], i, arr)) {
        newarr[0].push(arr[i]);
      }else {
        newarr[1].push(arr[i]);
      }
    }
    return newarr;
  },
  reduce: function(arr, f, v) {
    var n = 0;
    var a = v;
    if (v === undefined) {
      a = arr[0];
      n = 1;
    }
    for (var i = n; i < arr.length; i++) {
      a = f(a, arr[i]);
    }
    return a;
  },
  head: function(arr) {
    if (arr.length === 0) {
      return undefined;
    }
    return arr[0];
  },
  camelCase: function(str) {
    var newstr = str.toLowerCase().split('');
    var newstr1 = [];
    for (var i = 0; i < newstr.length; i++) {
      if ((newstr[i].charCodeAt(0) >= 'a'.charCodeAt(0)) && (newstr[i].charCodeAt(0) <= 'z'.charCodeAt(0))) {
        if (i === 0) {
          newstr1.push(newstr[i].toLowerCase());
        }else {
          if ((newstr[i - 1].charCodeAt(0) < 'a'.charCodeAt(0)) || (newstr[i - 1].charCodeAt(0) > 'z'.charCodeAt(0))) {
            newstr1.push(newstr[i].toUpperCase());
          }else {
            newstr1.push(newstr[i].toLowerCase());
          }
        }
      }
    }
    newstr1[0] = newstr1[0].toLowerCase();
    return newstr1.join('');
  },
  invert: function(obj) {
    var newObj = {};
    for (var key in obj) {
      newObj[obj[key]] = key;
    }
    return newObj;
  },
  keys: function(obj) {
    var newarr = [];
    for (var key in obj) {
      newarr.push(key);
    }
    return newarr;
  },
  identity: function(value) {
    return value;
  },
  forIn: function(obj, f) {
    if (f === undefined) {
      f = this.identity;
    }
    for (var key in obj) {
      f(obj[key], key, obj);
    }
  },
  mapKeys: function(obj, f) {
    if (f === undefined) {
      f = this.identity;
    }
    for (var key in obj) {
      f(key, obj[key], obj);
    }
  },
  after: function(n, f) {
    return function(a) {
      while (!n--) {
        return f(a);
      }
    };
  },
  before: function(n, f) {
    //debugger
    var last;
    var x = 0;
    return function(b) {
      x++;
      if (x < n) {
        last = f(b);
        return last;
      }else {
        return last;
      }
    };
  },
  arrayToLinkedList: function(arr) {
    var i = -1;
    return {
      next: function List() {
          if (i == arr.length - 1) {
            return null;
          }
          i++;
          return {
            value: arr[i],
            next: List()
          };
        }()
    };
  },
  parseJson: function(values) {
    var i = 0;
    function pr() {
      while (i < values.length) {
        if (values[i] === ' ' || values[i] === ',' || values[i] === ':' || values[i] === '\n' || values[i] === '\t') {
          i++;
          continue;
        }
        if (values[i] === '{') {
          return prObj();
        }
        if (values[i] === '"') {
          return prString();
        }
        if (isNum(values[i])) {
          return prNumber();
        }
        if (values[i] === '[') {
          return prArray();
        }
        if (values[i] === 'f') {
          return prFalse();
        }
        if (values[i] === 't') {
          return prTrue();
        }
        if (values[i] === 'n') {
          return prNull();
        }
        break;
      }
    }
    function prString() {
      var start = i;
      var end = values.indexOf('"', start + 1);
      var result = values.slice(start + 1, end);
      i = end + 1;
      return result;
    }
    function prObj() {
      i++;
      var rasult = {};
      while (i < values.length) {
        if (values[i] === ' ' || values[i] === ',' || values[i] === ':' || values[i] === '\n' || values[i] === '\t') {
          i++;
          continue;
        }
        if (values[i] === '}') {
          break;
        }
        var key = pr();
        var value = pr();
        rasult[key] = value;
      }
      i++;
      return rasult;
    }
    function isNum(x) {
      var char0 = '0'.charCodeAt(0);
      var char9 = '9'.charCodeAt(0);
      if (x.charCodeAt(0) >= char0 && x.charCodeAt(0) <= char9) {
        return true;
      }else {
        return false;
      }
    }
    function prNumber() {
      var start = i;
      for (var j = i; j < values.length; j++) {
        if (!isNum(values[j])) {
          var end = j;
          break;
        }
      }
      var result = values.slice(start, end);
      i = j;
      return parseInt(result);
    }
    function prArray() {
      i++;
      var result = [];
      while (i < values.length) {
        if (values[i] === ' ' || values[i] === ',' || values[i] === ':' || values[i] === '\n' || values[i] === '\t') {
          i++;
          continue;
        }
        if (values[i] === ']') {
          break;
        }
        result.push(pr());
      }
      i++;
      return result;
    }
    function prFalse() {
      i += 5;
      return false;
    }
    function prTrue() {
      i += 4;
      return true;
    }
    function prNull() {
      i += 4;
      return null;
    }
    return pr();
  }
};
