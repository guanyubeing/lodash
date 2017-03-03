//debugger;
var GuanYu = {
  /**
   * 将数组拆分成多个 size 长度的块，并组成一个新数组。 
   * 如果数组无法被分割成全部等长的块，那么最后剩余的元素将组成一个块。
   * arr：需要被处理的数组，
   * m ：数组长度，
   * return ：新组成的数组，
   * 例：
   * _.chunk(['a', 'b', 'c', 'd'], 2);
   * // => [['a', 'b'], ['c', 'd']]
   * _.chunk(['a', 'b', 'c', 'd'], 3);
   * // => [['a', 'b', 'c'], ['d']]
   */
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

    /**
      * 移除数组中无意义的值（false,null,0,'',undefined,NaN）
      * arr为要处理的数组
      * 返回处理后的数组
      * 例子 compact([0, 1, false, 2, '', 3]);
      *        => [1, 2, 3]
      */
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

   /**
      * 连接所有的参数为一个数组
      * 数组或值
      * 返回处理后的数组
      * 例子  concat([1], 2, [3], [[4]]);
      *         => [1, 2, 3, [4]]
      *       concat([1]);
      *         => [1]
      */

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

    /**
      * 比较多个数组，输出第一个数组中与其它数组不同的项
      * 要比较的数组
      * 返回第一个数组中与其它数组不同的项
      * 例子  difference([2, 1], [2, 3]);
      *         => [1]
      */

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

  /**
   * 裁剪数组中的前 N 个数组，返回剩余的部分。
   * arr：需要被处理的数组，
   * value：裁剪的个数，
   * return ：返回数组的剩余的部分。
   * 例：
   * _.drop([1, 2, 3]);
   * // => [2, 3]
   *
   * _.drop([1, 2, 3], 2);
   * // => [3]
   *
   * _.drop([1, 2, 3], 5);
   * // => []
   *
   * _.drop([1, 2, 3], 0);
   * // => [1, 2, 3]
   */

  drop: function(arr, value) {
    if (value == undefined) {
      value = 1
    }
    for (i = 0; i < value; i++) {
      var result = arr.shift(0)
    }
    return arr
  },

    /**
   * 向上一级展平数组嵌套。
   * arr：需要展平的数组，
   * return ：返回展平后的新数组。
   * 例：
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */

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

    /**
   * 递归展平。
   * arr：需要展平的数组，
   * return ：返回展平后的新数组。
   * 例：
   * _.flattenDeep([1, [2, [3, [4]], 5]]);
   * // => [1, 2, 3, 4, 5]
   */

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

      /**
      * 裁剪掉一个数组的前n位，默认 n = 1
      * 要裁剪的数组arr，需要裁剪的个数n
      * 返回一个新的被裁剪的数组
      * 例子 drop([1, 2, 3]);
      *        => [2, 3]
      *      drop([1, 2, 3], 2);
      *        => [3]
      *      drop([1, 2, 3], 5);
      *        => []
      *      drop([1, 2, 3], 0);
      *        => [1, 2, 3]
      */

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

    /**
   * 从右边开始裁剪数组中的 N 个数组，返回剩余的部分。
   * arr：需要被处理的数组，
   * value：裁剪的个数，
   * return ：返回数组的剩余的部分。
   * 例：
   * _.dropRight([1, 2, 3]);
   * // => [1, 2]
   *
   * _.dropRight([1, 2, 3], 2);
   * // => [1]
   *
   * _.dropRight([1, 2, 3], 5);
   * // => []
   *
   * _.dropRight([1, 2, 3], 0);
   * // => [1, 2, 3]
   */

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

    /**
   * 指定 值 填充数组，从 start 到 end 的位置，但不包括 end 本身的位置。
   * 注意: 这个方法会改变数组
   * arr：需要填充的数组，
   * value：填充的值，
   * start：开始位置，
   * end：结束位置。
   * return ：返回数组。
   * 例：
   * var array = [1, 2, 3];
   * 
   * _.fill(array, 'a');
   * console.log(array);
   * // => ['a', 'a', 'a']
   *
   * _.fill(Array(3), 2);
   * // => [2, 2, 2]
   *
   * _.fill([4, 6, 8, 10], '*', 1, 3);
   * // => [4, '*', '*', 10]
   */

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


    /**
   * 反向版 _.toPairs，这个方法返回一个由键值对构成的对象。
   * arr：键值对，
   * return ：返回一个新对象。
   * 例：
   * _.fromPairs([['fred', 30], ['barney', 40]]);
   * // => { 'fred': 30, 'barney': 40 }
   */
  fromPairs: function(arr) {
    var newobj = {};
    for (var i = 0; i < arr.length; i++) {
      newobj[arr[i][0]] = arr[i][1];
      //将数组的对应赋予对象的属性与值
    }
    return newobj;
  },

    /**
   * 获取数组中除了最后一个元素之外的所有元素
   * arr：需要检索的数组 (Array)
   * return ：返回没有最后一个元素的数组
   * 例：
   * _.initial([1, 2, 3]);
   * // => [1, 2]
   */

  initial: function(arr) {
    var newarr = [];
    arr.pop();
    newarr = arr;
    return newarr;
    //将规定的数组最后一位删除
  },

    /**
   * 创建一个包含所有使用 SameValueZero 进行等值比较后筛选的唯一值数组。
   * arr：需要处理的数组队列，
   * return ：返回数组中所有数组共享元素的新数组。
   * 例：
   * _.intersection([2, 1], [2, 3]);
   * // => [2]
   */
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

    /**
   * 移除所有经过 SameValueZero 等值比较为 true 的元素,
   * 注意: 不同于 _.without，这个方法会改变数组。
   * arr：需要调整的数组,
   * value：要移除的值,
   * return ：返回数组本身。
   * 例：
   * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
   *
   * _.pull(array, 'a', 'c');
   * console.log(array);
   * // => ['b', 'b']
   */
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

    /**
   * 这个方式类似 _.pull，除了它接受数组形式的一系列值。
   * 注意: 不同于 _.difference，这个方法会改变数组。
   * arr：需要调整的数组,
   * value：要移除的值,
   * return ：返回数组本身。
   * 例：
   * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
   *
   * _.pullAll(array, ['a', 'c']);
   * console.log(array);
   * // => ['b', 'b']
   */
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

    /*
   * 函数名称：pullAt
   * 函数功能：去掉数组中index对应位置的元素
   * 参数：
   * arr1：源数组
   * index：数组的某个位置
   * 返回值：除去值为value的元素的数组
   * 示例 ：
   * 输入：pullAt(['a', 'b', 'a' , 'c', 'c', 0 , 'd'],[1,3,4,6])
   * 输出：['b','c','d']
   */
  pullAt : function(arr , index ){
    var result = [], i, j, flag;
    for (i = 0; i < arr.length; i++) {
      flag = 1;
      for (var j = 0; j < index.length; j++) {
        if(i == index[j] - 1){
          flag =  0;
          break;
        }
      }
      if(flag){
        result.push(arr[i]);
      }
    }
    return result;
  },

    /**
   * 创建一个经过 iteratee 处理的集合中每一个元素的结果数组。 
   * iteratee 会传入 3 个参数：(value, index|key, collection)。
   * arr：需要遍历的集合,
   * fn：这个函数会处理每一个元素，
   * return：返回映射后的新数组。
   * 例：
   * function square(n) {
   *     return n * n;
   *  }
   *
   * _.map([4, 8], square);
   * // => [16, 64]
   *
   * _.map({ 'a': 4, 'b': 8 }, square);
   * // => [16, 64] (iteration order is not guaranteed)
   *
   * var users = [
   *    { 'user': 'barney' },
   *    { 'user': 'fred' }
   *    ];
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */

    /*
   * 函数名称：reverse
   * 函数功能：将数组反序输出
   * 参数：
   * arr：源数组
   * 返回值：反序后的数组
   * 示例 ：
   * 输入：pullAt(['a', 'b',  'c'])
   * 输出：['c','b','a']
   */
  reverse : function(arr  ){
    var result = [], i, j , flag;
    for (i = 0; i < arr.length; i++) {
      result.unshift(arr[i]);
    }
    return result;
  },

  /**
   * 创建一个经过 iteratee 处理的集合中每一个元素的结果数组。 
   * iteratee 会传入 3 个参数：(value, index|key, collection)。
   * arr：需要遍历的集合,
   * fn：这个函数会处理每一个元素，
   * return：返回映射后的新数组。
   * 例：
   * function square(n) {
   *     return n * n;
   *  }
   *
   * _.map([4, 8], square);
   * // => [16, 64]
   *
   * _.map({ 'a': 4, 'b': 8 }, square);
   * // => [16, 64] (iteration order is not guaranteed)
   *
   * var users = [
   *    { 'user': 'barney' },
   *    { 'user': 'fred' }
   *    ];
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */
  map: function(arr, fun) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
      newarr.push(fun(arr[i], i, arr));
    }
    return newarr;
  },

  /**
   * 遍历集合中的元素，筛选出一个经过 predicate 检查结果为真值的数组。
   * predicate 会传入 3 个参数：(value, index|key, collection)。
   * predicate：需要遍历的集合,
   * fn：这个函数会处理每一个元素，
   * return：返回筛选结果的新数组。
   * 例：
   * var users = [
   *     { 'user': 'barney', 'age': 36, 'active': true },
   *     { 'user': 'fred',   'age': 40, 'active': false }
   *     ];
   *
   * _.filter(users, function(o) { return !o.active; });
   * // => objects for ['fred']
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, { 'age': 36, 'active': true });
   * // => objects for ['barney']
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, ['active', false]);
   * // => objects for ['fred']
   *
   * // The `_.property` iteratee shorthand.
   * _.filter(users, 'active');
   * // => objects for ['barney']
   */
  filter: function(arr, fun) {
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
      if (fun(arr[i], i, arr)) {
        newarr.push(arr[i]);
      }
    }
    return newarr;
  },

    /*
   * 函数名称：take
   * 函数功能：将数组的前num个元素去掉
   * 参数：
   * arr：需要处理的数组
   * num：需要取出的元素个数
   * 返回值：取出的元素
   * 示例 ：
   * 输入：take(['a','b','c'],2)
   * 输出：['a','b']
   */
  take : function(arr ,num){
    var result = [], i, j ;
    if(num == undefined){
      num = 1;
    }else if(num > arr.length){
      num =arr.length;
    }
    for(i = 0; i < num; i++){
      result.push(arr[i]);  
    }
    return result;
  },

    /*
   * 函数名称：takeRight
   * 函数功能：将数组的后面num个元素去掉
   * 参数：
   * arr：需要处理的数组
   * num：需要取出的元素个数
   * 返回值：取出的元素
   * 示例 ：
   * 输入：takeRight(['a','b','c'],2)
   * 输出：['b','c']
   */
  takeRight : function(arr ,num){
    var result = [], i, j ;
    if(num == undefined){
      num = 1;
    }else if(num > arr.length){
      num = arr.length;
    }
    for(i = arr.length - num; i < arr.length ; i++){
      result.push(arr[i]);  
    }
    return result;
  },


  /*
   * 函数名称：union
   * 函数功能：取两个数组的并集并去重
   * 参数：
   * arr1：子数组
   * arr2：子数组
   * 返回值：并集
   * 示例 ：
   * 输入：union(['a','b','c'],['a'])
   * 输出：['a','b','c']
   */
  union : function(arr1,arr2 ){
    var result = [], i, j ,flag;
    for ( i = 0; i < arguments.length; i++) {
      for(j = 0; j < arguments[i].length; j++){
        if(hasAlready(result,arguments[i][j])){
          result.push(arguments[i][j]);
        }
      }
    }
    return result;
    function hasAlready(res , a) {
      for(var i = 0; i < res.length; i++){
        if(a == res[i]){
          return false;
        }
      }
      return true;
    }
  },
  /*
   * 函数名称：uniq
   * 函数功能：数组去重
   * 参数：
   * arr：需要操作的数组
   * 返回值：没有重复值的数组
   * 示例 ：
   * 输入：uniq(['a','b','c','a'])
   * 输出：['a','b','c']
   */
  uniq :function(arr ){
    var result = [], i, j ,flag;
    for(i = 0; i < arr.length; i++){
      result.push(arr[i]);    
    }
    for(j = 0; j < result.length; j++){
      for(i = j + 1; i < result.length; i++){
        if(result[i] == result[j]){
          result.splice(i,1);
        }
      } 
    }
    return result;
  },
  /*
   * 函数名称：zip
   * 函数功能：元素汇总
   * 参数：
   * arr1：需要操作的数组
   * arr2：需要操作的数组2
   * 返回值：归类好的数组
   * 示例 ：
   * 输入：zip(['a','b'],[1,2],[true,false])
   * 输出：['a',1, true],['b',2,false]
   */
  zip :function(arr1 ,arr2){
    var result = new Array(arguments[0].length), i, j ,flag;
    for(j = 0; j < result.length; j++){
        result[j] = new Array(arguments.length);
      }
    for(j = 0; j < arguments[0].length; j++){
      for(i = 0; i < arguments.length; i++){
      
        result[j][i] = arguments[i][j];
      }
    }
    return result;
  },
    /**
   * 创建一个拆分为两部分的数组。 
   * 第一部分是 predicate 检查为真值的，第二部分是 predicate 检查为假值的。 
   * predicate 会传入 3 个参数：(value, index|key, collection)。
   * arr：需要遍历的集合,
   * fn：这个函数会处理每一个元素，
   * return：返回筛选结果的新数组。
   * 例：
   * var users = [
   *   { 'user': 'barney',  'age': 36, 'active': false },
   *   { 'user': 'fred',    'age': 40, 'active': true },
   *   { 'user': 'pebbles', 'age': 1,  'active': false }
   *   ];
   *
   * _.partition(users, function(o) { return o.active; });
   * // => objects for [['fred'], ['barney', 'pebbles']]
   *
   * // The `_.matches` iteratee shorthand.
   * _.partition(users, { 'age': 1, 'active': false });
   * // => objects for [['pebbles'], ['barney', 'fred']]
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.partition(users, ['active', false]);
   * // => objects for [['barney', 'pebbles'], ['fred']]
   *
   * // The `_.property` iteratee shorthand.
   * _.partition(users, 'active');
   * // => objects for [['fred'], ['barney', 'pebbles']]
   */
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

    /*
   * 函数名称：reduce
   * 函数功能：对数组的元素进行连锁操作
   * 参数：
   * arr：需要判断的数组
   * fn：操作元素的函数
   * value：启动fn需要的初始参数
   * 返回值：整个数组的计算结果
   * 示例 ：
   * 输入：reduce([1,2,3,4,5,6],function (a,b){return a + b;},2)
   * 输出：23
   */
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

  /**
   * 获取数组中第一个元素。
   * arr：要检索的数组,
   * return：返回数组中第一个元素。
   * 例：
   * _.head([1, 2, 3]);
   * // => 1
   *
   * _.head([]);
   * // => undefined
   */
  head: function(arr) {
    if (arr.length === 0) {
      return undefined;
    }
    return arr[0];
  },

    /**
   * 转换字符串为 驼峰写法。
   * str：要转换的字符串。
   * return：返回驼峰写法的字符串。
   * 例：
   * _.camelCase('Foo Bar');
   * // => 'fooBar'
   *
   * _.camelCase('--foo-bar');
   * // => 'fooBar'
   *
   * _.camelCase('__foo_bar__');
   * // => 'fooBar'
   */
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

    /**
   * 创建一个键值倒置的对象。 
   * 如果 object 有重复的值，后面的值会覆盖前面的值。 
   * 如果 multiVal 为 true，重复的值则组成数组。
   * obj：要倒置的对象。
   * [multiVal]：每个 key 允许多个值，
   * return：返回新的倒置的对象
   * 例：
   * var object = { 'a': 1, 'b': 2, 'c': 1 };
   *
   * _.invert(object);
   * // => { '1': 'c', '2': 'b' }
   */
  invert: function(obj) {
    var newObj = {};
    for (var key in obj) {
      newObj[obj[key]] = key;
    }
    return newObj;
  },

    /**
   * 创建 object 自身可枚举属性名为一个数组。
   * 注意: 非对象的值会被强制转换为对象，查看 ES spec 了解详情
   * obj：要检索的对象。
   * return：返回包含属性名的数组。
   * 例：
   * function Foo() {
   * this.a = 1;
   * this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  keys: function(obj) {
    var newarr = [];
    for (var key in obj) {
      newarr.push(key);
    }
    return newarr;
  },

    /**
      * return第一个参数
      * 例子 identity([1,2],'123')
      *       => [1,2]
      */
  identity: function(value) {
    return value;
  },

  /**
   * 使用 iteratee 遍历对象的自身和继承的可枚举属性。
   * iteratee 会传入 3 个参数：(value, key, object)。
   * 如果返回 false，iteratee 会提前退出遍历。
   * obj：要遍历的对象。
   * return：返回对象。
   * 例：
   *
   * function Foo() {
   * this.a = 1;
   * this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.forIn(new Foo, function(value, key) {
   * console.log(key);
   * });
   * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
   */
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

      /**
      * 创建一个函数当被调用n次以上时才执行某函数
      * 调用的次数，要执行的函数
      * 当被调用的次数大于等于n，执行函数
      * 例子 ISarray = after(2,isArray)
      *      ISarray(1)
      *       => 没有任何返回值
      *      ISarray(1)
      *       => false
      *      ISarray([])
      *       => true
      */
  after: function(n, f) {
    return function(a) {
      while (!n--) {
        return f(a);
      }
    };
  },

    /**
      * 创建一个函数当被调用n次以下时才执行某函数
      * 调用的次数，要执行的函数
      * 当被调用的次数小于等于n，执行函数
      *          当被调用的次数大于n，传入第n次调用的参数执行函数
      * 例子 ISarray = before(2,isArray)
      *      ISarray([1])
      *       => true
      *      ISarray(1)
      *       => false
      *      ISarray([])
      *       => false
      */
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

  /*
   * 函数名称：keyBy
   * 函数功能：根据已知函数或属性对数组内容按属性分类
   * 参数：
   * arr：源数组
   * fun：对数组进行分组的依据数组
   * 返回值：新建对象，存放分组的结果
   * 示例 ：
   * 输入：keyBy([{ 'dir': 'left', 'code': 97 },{ 'dir': 'right', 'code': 100 }], function(o) {return String.fromCharCode(o.code);});
   * 输出：{ 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
   */
  keyBy : function(arr , fun){//代码转自 groupBy
    var result = new Object, i, j ,flag;
    if(fun instanceof Function){
      for(i = 0; i < arr.length; i++){
        result[fun(arr[i])] = arr[i];
      }
    }else if(typeof fun === "string"){
      for(i = 0; i < arr.length; i++){
        result[arr[i][fun]] = arr[i];
      }
    }
    return result;
  },
  
  /**
      * 深度的对比两个值如果他们的值相等，返回true，否则为false
      * 需要对比的两个值
      * 返回true或false
      * 例子 isEqual({ 'a': 1 }, { 'a': 1 });
      *        => true
      *      { 'a': 1 } === { 'a': 1 };
      *        => false
      */
    isEqual: function(a,b) {
      var self = this
      var isEqualEverying = function(a,b) {
        if(self.isArray(a) && self.isArray(b)) {
          return isEqualArray(a,b)
        }else if(self.isPlainObject(a) && self.isPlainObject(b)) {
          return isEqualObject(a,b)
        }else if(self.isNaN(a) && self.isNaN(b)) {
          return true
        }else if(self.isRegExp(a) && self.isRegExp(b)) {
          return String(a) === String(b)
        }else {
          return a === b
        }
      }
      var isEqualObject = function(a, b) {
        var aProps = Object.getOwnPropertyNames(a)
        var bProps = Object.getOwnPropertyNames(b)
        if (aProps.length !== bProps.length) {
          return false
        }
        for (var i = 0, len = aProps.length; i < len; i++) {
          var propName = aProps[i]
          if (!isEqualEverying(a[propName],b[propName])) {
            return false
          }
        }
        return true
      }
      var isEqualArray = function(a,b) {
        if(a.length !== b.length) {
          return false
        }else {
          for(var i = 0;i < a.length;i++) {
            if(!isEqualEverying(a[i],b[i])) {
              return false
            }
          }
          return true
        }
      }
      return isEqualEverying(a, b)
    },
    /**
      * 判断一个值是否为一个arguments
      * 要判断的值
      * 如果这个值是arguments，返回true；否则返回false
      * 例子 isArguments(function() { return arguments; }());
      *       => true
      *      isArguments([1, 2, 3]);
      *       => false
      */
    isArguments: function(value) {
      if(value.callee) {
        return true
      }
      return false
    },
    /**
      * 判断一个值是否为一个Date
      * 要判断的值
      * 如果是一个Date，返回ture；否则返回false
      * 例子 isDate(new Date);
      *       => true
      *      isDate('Mon April 23 2012');
      *       => false
      */
    isDate: function(value) {

      return value instanceof Date
    },
    /**
      * 判断一个值是否为NaN
      * 输入要判断的值
      * 如果这个值是NaN，返回true；否则返回false
      * 例子 isNaN([1, 2])
      *       => false
      *      isNaN('NaN')
      *       => false
      *      isNaN(NaN)
      *       => true
      */
    isNaN: function(value) {
      return value !== value ||
             (typeof value === 'object' && String(value) === 'NaN')
    },
    /**
      * 判断一个值是不是一个数值类型
      * 要判断的值
      * 如果这个值的类型为数值类型，返回true；否则返回false
      * 例子  isNumber(3);
      *        => true
      *       isNumber(Infinity);
      *        => true
      *       isNumber('3');
      *        => false
      */
    isNumber: function(value) {

      return typeof value === 'number'
    },
    /**
      * 判断一个值是不是一个有限的数
      * 要判断的值
      * 如果是一个有限的值，返回true；否则返回false
      * 例子  isFinite(3);
      *        => true
      *       isFinite(Infinity);
      *        => false
      *       isFinite('3');
      *        => false
      */
    isFinite: function(value) {

      return this.isNumber(value) && !this.isNaN(null*value)
    },
    /**
      * 判断一个值是否为数组
      * 输入要判断的值
      * 如果这个值为数组，返回true；否者返回false
      * 例子 isArray({x: 2})
      *       => false
      *      isArray([1, 2])
      *       => true
      */
    isArray: function(value) {

      return value instanceof Array
    },
    /**
      * 判断一个值是不是对象
      * 要判断的值
      * 如果这个值是一个对象，返回true；否则返回false
      * 例子 isObject({});
      *       => true
      *      isObject([1, 2, 3]);
      *       => true
      *      isObject(null);
      *       => false
      * 正则表达式也返回true（还没写）
      */
    isObject: function(value) {

      return value === Object(value)
    },
    /**
      * 判断一个值是否为一个objectlike（typeof为boject 并且部位null）
      * 要判断的值
      * 如果这个值符合objectlike，输出true；否则输出false
      * 例子 isObjectLike({});
      *       => true
      *      isObjectLike([1, 2, 3]);
      *       => true
      *      isObjectLike(null);
      *       => false
      */
    isObjectLike: function(value) {

      return typeof value === 'object' && !this.isNull(value)
    },
    /**
      * 判断一个值是否为一个纯object
      *                （（以{}或new Object创建的对象）或空对象）
      * 要判断的值
      * 如果这个值是一个纯object，输出true；否则输出false
      * 例子 isPlainObject(new Foo);
      *       => false
      *      isPlainObject([1, 2, 3]);
      *       => false
      *      isPlainObject({ 'x': 0, 'y': 0 });
      *       => true
      *      isPlainObject(Object.create(null));
      *       => true
      * 然而不知道怎么实现，暂时如果为object(不包括数组、函数和正则表达式)返回true
      */
    isPlainObject: function(value) {
      return  this.isObjectLike(value) &&
              !this.isArray(value) &&
              !this.isRegExp(value) &&
              !this.isDate(value)
    },
    /**
      * 判断一个值是否为字符串
      * 要判断的值
      * 如果这个值是字符串，返回true；否则返回false
      * 例子 isString('abc');
      *       => true
      *      isString(1);
      *       => false
      */
    isString: function(value) {

      return typeof value === 'string'
    },
    /**
      * 判断一个值是否为undefined
      * 要判断的值
      * 如果这个值为undefined，返回true；否则返回false
      * 例子 isUndefined(void 0);
      *       => true
      *      isUndefined(null);
      *       => false
      */
    isUndefined: function(value) {

      return typeof value === 'undefined'
    },
    /**
      * 判断一个值是否为null
      * 要判读的值
      * 如果这个值为null，返回true；否则返回false
      * 例子 isNull(null);
      *       => true
      *      isNull(void 0);
      *       => false
      */
    isNull: function(value) {

      return value === null
    },
    /**
      * 判断一个值是否为函数
      * 要判断的值
      * 如果这个值为函数，返回true；否则返回false
      * 例子 isFunction(isFunction);
      *       => true
      *      isFunction(/abc/);
      *       => false
      */
    isFunction: function(value) {

      return typeof value === 'function'
    },
    /**
      * 判断一个值是否为正则表达式
      * 要判断的值
      * 如果这个值为正则表达式，返回true；否则返回false
      * 例子 isRegExp(/abc/);
      *       => true
      *      isRegExp('/abc/');
      *       => false
      */
    isRegExp: function(value) {

      return value instanceof RegExp
    },
    /**
      * 判断一个值是否为布尔值
      * 要判断的值
      * 如果这个值是布尔值，返回true；否则返回false
      * 例子 isBoolean(false);
      *       => true
      *      isBoolean(null);
      *       => false
      */
    isBoolean: function(value) {

      return typeof value === 'boolean'
    },
    /**
      * 判断对象是否为空
      * 要判断的值
      * 如果这个值为对象且空的返回true，否则返回false
      * 例子 isEmpty(null);
      *       => true
      *      isEmpty(true);
      *       => true
      *      isEmpty(1);
      *       => true
      *      isEmpty([1, 2, 3]);
      *       => false
      *      isEmpty({ 'a': 1 });
      *       => false
      */
    isEmpty: function(value) {

      return  this.isCollection(value) ? !this.size(value) : true
    },
    /**
      * 判断一个值是否为collection(string,array,object)
      * 要判断的值
      * 如果是返回true；否则返回false
      * 例子 isCollection('abc')
      *       => true
      *      isCollection(123)
      *       => false
      */
    isCollection: function(value) {
      return this.isPlainObject(value) ||
             this.isArray(value) ||
             this.isString(value)
    },
    /**
      * 获取collection的长度
      * 要取得长度的collection(string,array,object)
      * 返回collection的长度,如果不为collection返回0
      * 例子  size([1, 2, 3]);
      *        => 3
      *       size({ 'a': 1, 'b': 2 });
      *        => 2
      *       size('pebbles');
      *        => 7
      */
    size: function(collection) {
      var count = 0
      this.forEach(collection,function(){count++})
      return count
    },

      /**
   * 通过 predicate 检查集合中的元素是否都返回真值。
   * 只要 predicate 返回一次假值，遍历就停止，并返回 false。
   * predicate 会传入 3 个参数：(value, index|key, collection)
   * [predicate=_.identity]：这个函数会处理每一个元素。
   * return：返回 true，如果所有元素经 predicate 检查都为真值，否则返回 false。
   * 例：
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': false },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.every(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.every(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.every(users, 'active');
   * // => false
   */

  every: function(collection, predicate) {
    if (!predicate) {
      predicate = function(temp) {
        return temp
      }
    }
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (!predicate(collection[i], i, collection)) {
          return false
        }
      }
      return true
    } else {
      for (var key in collection) {
        if (!predicate(collection[key], key, collection)) {
          return false
        }
      }
      return true
    }
  },
};
