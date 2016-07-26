//创建用户组
$.promiseAjax({url: '/api/wechat_group', type: 'post', data: {group_name: '潘从修理厂'}, function(data){console.log(data)}})
