import request from "@/common/request.js";

// 首页列表
export function getSpeechcraftList (params) {
	return request.get('/pua/speechcraft/list',params);
}

// 获取主题列表
export function getSpeechcraftTypeList (params) {
	return request.get('/pua/speechcraftType/list',params);
}

export function getSpeechcraftDetailList (params) {
	return request.get('/pua/speechcraftType/detail',params);
}

// 某个主题中的数据列表
export function getSpeechcraftListByTopic (params) {
	return request.get('/pua/speechcraft/getSpeechcraftListByTopic',params);
}


export function getCollectList (params) {
	return request.get('/pua/collect/list',params);
}

//点赞
export function praiseMe (params) {
	return request.post('/pua/praise/praiseMe',params);
}
//收藏
export function praiseMe (params) {
	return request.post('/pua/collect/collectMe',params);
}

export function getAboutList (params) {
	return request.get('/mini/about/list',params);
}

export function getChickenSoupList (params) {
	return request.get('/mini/about/list',params);
}

