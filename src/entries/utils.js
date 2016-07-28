'use strict'

//补足到2位，value为string或number类型
function bitTo2(value){
    var str = '0' + value;
    return str.substr(-2, 2);
}

export {
    bitTo2
}
