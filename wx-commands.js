//创建用户组
$.promiseAjax({
    url: '/api/wechat_group',
    type: 'post',
    data: {
        group_name: '潘从修理厂'
    },
    success(data){
        console.log(data)
    }
})

//查看分组
$.promiseAjax({
    url: '/api/wechat_group',
    success(data){
        console.log(data)
    }
})

//移动用户至某分组
$.promiseAjax({
    url: '/api/wechat_group/move_user_to',
    type: 'put',
    data: {
        openid: 'oKGD_vnz-JnTTBKbxj6aolZ0IFGc',
        group_id: 100
    },
    success(data){
        console.log(data)
    }
})


//生成公众号菜单
$.promiseAjax({
    url: '/api/wechat_menu',
    type: 'put',
    success(data){
        console.log(data)
    }
})

//新增自定义公众号菜单
$.promiseAjax({
    url: '/api/wechat_menu/custom',
    type: 'post',
    success(data){
        console.log(data)
    }
})

//获取菜单
$.promiseAjax({
    url: '/api/wechat_menu',
    success(data){
        console.log(data)
    }
})

//设置行业
$.promiseAjax({
    url: '/api/wechat_template/industry',
    type: 'post',
    data: {
        id1: '25',
        id2: '41'
    },
    success(data){
        console.log(data)
    }
})

//添加模板
//1、报修单提交通知
//content: "{{first.DATA}}??您的{{name.DATA}}有效期至{{expDate.DATA}}?{{remark.DATA}}"
//deputy_industry: "汽车相关"
//example: "您好，您的会员即将到期，请您注意。??您的微信某某店会员有效期至2013年9月12日，请注意时间，防止过期失效。"
//primary_industry: "交通工具"
//template_id: "j4j18Eq7T5pWNe6n28jmDGe4GUzuZfRM7Lsmcemrrxk"
//title: "会员到期提醒"
//--------------------------------------------
//2、预约单预约通知
//content: "{{first.DATA}}??预约{{productType.DATA}}：{{name.DATA}}?预约时间：{{time.DATA}}?预约结果：{{result.DATA}}?{{remark.DATA}}"
//deputy_industry: "汽车相关"
//example: "您好，您已预约租车成功。??预约服务：小轿车车辆普通维护?预约时间：2013年11月6日 14:00?预约结果：已预约?如有疑问，请咨询13912345678。"
//primary_industry: "交通工具"
//template_id: "Xxvp9EreeSvBeHO97V10FfOAdgSCaCqMSmuvA9HL0gQ"
//title: "服务预约通知"

$.promiseAjax({
    url: '/api/wechat_template/template',
    type: 'post',
    data: {
        id: 'TM00113'   //113~120,173~174
    },
    success(data){
        console.log(data)
    }
})