import request from "@/common/request.js";

export function getTemplateList (params) {
	return request.get('/template/list',params,{isMini:false});
}

export function getTemplateDetail (id) {
	return request.get('/template/detail/'+id,null,{isMini:false});
}

// 点赞或取消点赞
export function addLike (params) {
    return request.post('/like/add',params,{isMini:false});
}

export function customizeParticle (params) {
    return request.post('/userTemplate/customizeParticle',params,{isMini:false});
}

export function customizePointBoom (params) {
    return request.post('/userTemplate/customizePointBoom',params,{isMini:false});
}

export function customizeTree (params) {
    return request.post('/userTemplate/customizeTree',params,{isMini:false});
}

export function customizeHeart (params) {
    return request.post('/userTemplate/customizeHeart',params,{isMini:false});
}

export function customizeHeartbeat (params) {
    return request.post('/userTemplate/customizeHeartbeat',params,{isMini:false});
}

export function getUserTemplateList (params) {
    return request.get('/userTemplate/list/'+params.pageNo,params,{isMini:false});
}

