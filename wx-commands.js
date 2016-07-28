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