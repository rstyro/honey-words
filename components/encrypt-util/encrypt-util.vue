<template>
	<view>
		
	</view>
</template>

<script>
	import config from '@/common/encrypt-config.js';
	import jsencrypt from '@/common/jsencrypt.js';
	import CryptoJS from '@/common/crypto-js/crypto-js.js';
	export default {
		data() {
			return {
			
			}
		},
		methods: {
			
		},
		// rsa 公钥加密
		rsaEncrypt: function(content){
			var encrypt = new jsencrypt.JSEncrypt();
			encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + config.mePublicKey + '-----END PUBLIC KEY-----');
			console.log("mePublicKey:",config.mePublicKey);
		    return encrypt.encryptLong(content);
		},
		
		// rsa 私钥解密
		rsaDecrypt: function(content){
		    // 加密+base64
			var encrypt = new jsencrypt.JSEncrypt();
			encrypt.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----' + config.mePrivateKey + '-----END RSA PRIVATE KEY-----');
		    return encrypt.decryptLong(content);
		},
		
		// rsa 后端公钥加密
		rsaBackEnc: function(content){
			var backEncrypt = new jsencrypt.JSEncrypt();
			backEncrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + config.backPublicKey + '-----END PUBLIC KEY-----');
		    return backEncrypt.encryptLong(content);
		},
		// aes 加密
		aesEncrypt: function(content,aesKey){
			// var CryptoJS = require('./aes.js');
		    var iv =CryptoJS.enc.Utf8.parse(config.aesIv);
		    aesKey =CryptoJS.enc.Utf8.parse(aesKey);
		    let encrypted = CryptoJS.AES.encrypt(content, aesKey, {
		        iv: iv,
		        mode: CryptoJS.mode.CBC,
		        padding: CryptoJS.pad.Pkcs7
		    });
		    return  encrypted.toString();
		},
		
		// aes 解密
		aesDecrypt: function(encrypted,aesKey){
		    var iv = CryptoJS.enc.Utf8.parse(config.aesIv);
		    aesKey = CryptoJS.enc.Utf8.parse(aesKey);
		    var decrypted = CryptoJS.AES.decrypt(encrypted, aesKey, {
		        iv: iv,
		        mode: CryptoJS.mode.CBC,
		        padding: CryptoJS.pad.Pkcs7
		    });
		    // 转换为 utf8 字符串
		    return CryptoJS.enc.Utf8.stringify(decrypted);
		},
		
		//随机生成aes 密钥
		genAesKey: function(){
		    return CryptoJS.lib.WordArray.random(128/8).toString();
		}
	}
</script>

<style>

</style>
