(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/tabbar-topic/tabbar-topic"],{"12d0":function(t,n,e){},8810:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},b320:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return e.e("components/nairenk-waterfall-flow/nairenk-waterfall-flow").then(e.bind(null,"0fd7"))},i=e("cc29"),a={data:function(){return{page:1,start:0,end:0,list:[],loading:!0}},onLoad:function(){this.getList()},onReachBottom:function(){this.page++,this.loading=!0,this.getList()},methods:{choose:function(t){console.log(t)},getList:function(){var t=this;this.list.length<i.list.length?setTimeout(function(){t.end=10*t.page,t.list=t.list.concat(i.list.slice(t.start,t.end)),t.start=t.end,setTimeout(function(){t.loading=!1},120)},1e3):this.loading=!1}},components:{WaterfallFlow:o}};n.default=a},d1a6:function(t,n,e){"use strict";e.r(n);var o=e("8810"),i=e("d24d");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("fe19");var u=e("2877"),r=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=r.exports},d24d:function(t,n,e){"use strict";e.r(n);var o=e("b320"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a},fe19:function(t,n,e){"use strict";var o=e("12d0"),i=e.n(o);i.a}},[["6ff1","common/runtime","common/vendor"]]]);