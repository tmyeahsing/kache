'use strict'

//补足到2位，value为string或number类型
function bitTo2(value){
    var str = '0' + value;
    return str.substr(-2, 2);
}

function getJssdkConfig(apiList){
    return $.promiseAjax({
        url: '/api/wechat_js/config',
        data: {
            url: location.href.split('#')[0],
            api_list: apiList
        }
    })
}

export {
    bitTo2,
    getJssdkConfig
}
