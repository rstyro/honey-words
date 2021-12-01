import {getToken,getDeerToken} from "@/common/tools.js";

const baseUrl = 'https://rstyro.top/miniapi';  
const baseDeerUrl = 'https://rstyro.top/deerapi';



function getHeaders (isJson=false) {
    let token = getToken();
    let deerToken = getDeerToken();
	let contentType = "application/x-www-form-urlencoded";
	if(isJson){
		contentType="application/json";
	}
    let header={
		   "content-type": contentType,
		   "Authority":token,
		   "token":deerToken,
		}
	return header;
}

function getUrl (isMini,url) {
    if(!isMini){
		return baseDeerUrl+url;
	}
	return baseUrl+url;
}


export default{
    get(url,param,config={isMini:true}){
		const realUrl = getUrl(config.isMini,url);
        return new Promise((resolve,reject) =>{
            uni.request({
                method:'GET',
                url: realUrl,
				header:getHeaders(),
                data: param,
            }).then(res=>{
				console.log("request-res:",res);
                if(res[1]?.statusCode === 200){
                	 resolve(res[1])
                }else{
                	 reject(res)
                }            
            }).catch(response => {
                    reject(response)
                }
            )
        })
	
    },
    
    post(url,params,config={isMini:true}){
        return new Promise((resolve,reject) =>{
            uni.request({
                method:'POST',
                url: getUrl(config.isMini,url),
				header:getHeaders(),
                data: params,
            }).then(res=>{
                if(res[1].statusCode === 200){
                	 resolve(res[1])
                }else{
                	 reject(res)
                }            
            }).catch(response => {
                    reject(response)
                }
            )
        })        
    },
	
	postBody(url,params,config={isMini:true}){
	    return new Promise((resolve,reject) =>{
	        uni.request({
	            method:'POST',
	            url: getUrl(config.isMini,url),
	            data: params,
	            header:getHeaders(true)
	        }).then(res=>{
	            if(res[1].statusCode === 200){
	            	 resolve(res[1])
	            }else{
	            	 reject(res)
	            }            
	        }).catch(
	            (response) => {
	                reject(response)
	            }
	        )
	    })        
	},
}