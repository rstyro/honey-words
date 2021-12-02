import request from "@/common/request.js";

export function getTemplateList (params) {
	return request.get('/template/list',params,{isMini:false});
}

export function getTemplateDetail (id) {
	return request.get('/template/detail/'+id,null,{isMini:false});
}

// 点赞或取消点赞
export function addLike (params) {
    return request.postBody('/like/add',params,{isMini:false});
}

export function refreshToken (params) {
    return request.postBody('/user/refreshToken',params,{isMini:false});
}

export function customizeParticle (params) {
    return request.postBody('/userTemplate/customizeParticle',params,{isMini:false});
}

export function customizePointBoom (params) {
    return request.postBody('/userTemplate/customizePointBoom',params,{isMini:false});
}

export function customizeTree (params) {
    return request.postBody('/userTemplate/customizeTree',params,{isMini:false});
}

export function customizeHeart (params) {
    return request.postBody('/userTemplate/customizeHeart',params,{isMini:false});
}

export function customizeHeartbeat (params) {
    return request.postBody('/userTemplate/customizeHeartbeat',params,{isMini:false});
}

export function getUserTemplateList (params) {
    return request.get('/userTemplate/list/'+params.pageNo,params,{isMini:false});
}

