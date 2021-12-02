import CryptoJS from '@/common/crypto-js/crypto-js.js';

export function getToken () {
    try {
        const token = uni.getStorageSync('token');
        if (token) {
            return token
        }else{
            return ''
        }
    } catch (e) {
        console.log(e)
    }
}

export function getDeerToken () {
    try {
        const token = uni.getStorageSync('deerToken');
        if (token) {
            return token
        }else{
            return ''
        }
    } catch (e) {
        console.log(e)
    }
}

export function showMsg (msg) {
    uni.showToast({
    	icon: "none",
        title: msg,
        duration: 1500
    });
}

const aesKey = "rstyro8888888888";

export function encrypt(word, keyStr){
   keyStr = keyStr ? keyStr : aesKey;
   const key  = CryptoJS.enc.Utf8.parse(keyStr);
   const srcs = CryptoJS.enc.Utf8.parse(word);
   const encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
   return encrypted.toString();
}

//解密
export function decrypt(word, keyStr){
   keyStr = keyStr ? keyStr : aesKey;
   // 空格换+号，不然会报错
   word = word.replace(/\s/g,"+");
   const key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
   const decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}