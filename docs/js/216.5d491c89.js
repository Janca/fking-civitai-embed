(self["webpackChunkfkCivitai"]=self["webpackChunkfkCivitai"]||[]).push([[216],{7882:function(e){(function(t){"use strict";function a(){var e;if(!(this instanceof a)){var t=arguments[0],r=arguments[1];e=arguments[2];var s=new a(e);return s.abbreviate(t,r)}e=arguments[0],this.units=null==e?["k","m","b","t"]:e}a.prototype._abbreviate=function(e,t){t=Math.pow(10,t);for(var a=this.units.length-1;a>=0;a--){var r=Math.pow(10,3*(a+1));if(r<=e){e=Math.round(e*t/r)/t,1e3===e&&a<this.units.length-1&&(e=1,a++),e+=this.units[a];break}}return e},a.prototype.abbreviate=function(e,t){var a=e<0,r=this._abbreviate(Math.abs(e),t||0);return a?"-"+r:r},e.exports?e.exports=a:t.NumberAbbreviate=a})(this)},7216:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return le}});var r=a(3396),s=a(7139),n=a(4870),l=a(6413),o=a(2483);a(7658);const i=e=>{const t=typeof e;return null!==e&&("object"===t||"function"===t)},d=new Set(["__proto__","prototype","constructor"]),c=new Set("0123456789");function u(e){const t=[];let a="",r="start",s=!1;for(const n of e)switch(n){case"\\":if("index"===r)throw new Error("Invalid character in an index");if("indexEnd"===r)throw new Error("Invalid character after an index");s&&(a+=n),r="property",s=!s;break;case".":if("index"===r)throw new Error("Invalid character in an index");if("indexEnd"===r){r="property";break}if(s){s=!1,a+=n;break}if(d.has(a))return[];t.push(a),a="",r="property";break;case"[":if("index"===r)throw new Error("Invalid character in an index");if("indexEnd"===r){r="index";break}if(s){s=!1,a+=n;break}if("property"===r){if(d.has(a))return[];t.push(a),a=""}r="index";break;case"]":if("index"===r){t.push(Number.parseInt(a,10)),a="",r="indexEnd";break}if("indexEnd"===r)throw new Error("Invalid character after an index");default:if("index"===r&&!c.has(n))throw new Error("Invalid character in an index");if("indexEnd"===r)throw new Error("Invalid character after an index");"start"===r&&(r="property"),s&&(s=!1,a+="\\"),a+=n}switch(s&&(a+="\\"),r){case"property":if(d.has(a))return[];t.push(a);break;case"index":throw new Error("Index was not closed");case"start":t.push("");break}return t}function v(e,t){if("number"!==typeof t&&Array.isArray(e)){const a=Number.parseInt(t,10);return Number.isInteger(a)&&e[a]===e[t]}return!1}function _(e,t,a){if(!i(e)||"string"!==typeof t)return void 0===a?e:a;const r=u(t);if(0===r.length)return a;for(let s=0;s<r.length;s++){const t=r[s];if(e=v(e,t)?s===r.length-1?void 0:null:e[t],void 0===e||null===e){if(s!==r.length-1)return a;break}}return void 0===e?a:e}const p=(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 24 24",fill:"rgba(255,255,255,.3)",stroke:"transparent","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"tabler-icon tabler-icon-star"},[(0,r._)("path",{d:"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"})],-1),m=[p];function w(e,t){return(0,r.wg)(),(0,r.iD)("div",{class:(0,s.C_)(e.$style.Star)},m,2)}var h={Star:"StarIcon_Star_nJDh1"},g=a(89);const f={},b={};b["$style"]=h;const y=(0,g.Z)(f,[["render",w],["__cssModules",b]]);var M=y;const C=["textContent"];var k=(0,r.aZ)({__name:"Rating",props:{rating:{},ratings:{}},setup(e){const t=e,a=(0,r.Fl)((()=>Math.round(t.rating))),n=(0,r.Fl)((()=>t.ratings>=0?t.ratings:0));return(e,t)=>((0,r.wg)(),(0,r.iD)("div",{class:(0,s.C_)(e.$style.Rating)},[(0,r._)("div",{class:(0,s.C_)(e.$style.Stars)},[((0,r.wg)(),(0,r.iD)(r.HY,null,(0,r.Ko)(5,(t=>(0,r.Wm)(M,{class:(0,s.C_)({[e.$style.Activated]:t<=a.value})},null,8,["class"]))),64))],2),(0,r._)("div",{textContent:(0,s.zw)(n.value)},null,8,C)],2))}}),E={Rating:"Rating_Rating_tcDjk",Stars:"Rating_Stars_RrzzG",Activated:"Rating_Activated_kDmvx"};const x={};x["$style"]=E;const $=(0,g.Z)(k,[["__cssModules",x]]);var I=$,S=a(7882),W=(0,r.aZ)({__name:"StatsWrapper",props:{stat:{}},setup(e){const t=e;(0,r.Fl)((()=>S(t.stat??0)));return(e,t)=>((0,r.wg)(),(0,r.iD)("div",{class:(0,s.C_)(e.$style.StatsWrapper)},[e.$slots.default?((0,r.wg)(),(0,r.iD)("div",{key:0,class:(0,s.C_)(e.$style.StatsIcon)},[(0,r.WI)(e.$slots,"default")],2)):(0,r.kq)("",!0),(0,r._)("div",null,(0,s.zw)(String(S(e.stat,1)).toLocaleUpperCase()),1)],2))}}),F={StatsWrapper:"StatsWrapper_StatsWrapper_KJZ81",StatsIcon:"StatsWrapper_StatsIcon_BHPET"};const Z={};Z["$style"]=F;const j=(0,g.Z)(W,[["__cssModules",Z]]);var A=j;const D={xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 24 24",fill:"none",stroke:"white","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"tabler-icon tabler-icon-heart",style:{}},L=(0,r._)("path",{d:"M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"},null,-1),N=[L];var z=(0,r.aZ)({__name:"Likes",props:{likes:{}},setup(e){const t=e;return(e,a)=>((0,r.wg)(),(0,r.j4)(A,{stat:t.likes},{default:(0,r.w5)((()=>[(0,r._)("div",{class:(0,s.C_)([e.$style.Heart,{[e.$style.HeartActivated]:t.likes>=0}])},[((0,r.wg)(),(0,r.iD)("svg",D,N))],2)])),_:1},8,["stat"]))}}),H={HeartActivated:"Likes_HeartActivated_jd9wi"};const P={};P["$style"]=H;const R=(0,g.Z)(z,[["__cssModules",P]]);var T=R;const U=(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"100%",height:"100%",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"tabler-icon tabler-icon-message-circle-2"},[(0,r._)("path",{d:"M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"})],-1);var B=(0,r.aZ)({__name:"Comments",props:{comments:{}},setup(e){const t=e;(0,r.Fl)((()=>t.comments??0));return(e,a)=>((0,r.wg)(),(0,r.j4)(A,{stat:t.comments},{default:(0,r.w5)((()=>[U])),_:1},8,["stat"]))}});const J=B;var Y=J;const q=(0,r._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10%",height:"10%",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"tabler-icon tabler-icon-download"},[(0,r._)("path",{d:"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"}),(0,r._)("path",{d:"M7 11l5 5l5 -5"}),(0,r._)("path",{d:"M12 4l0 12"})],-1);var G=(0,r.aZ)({__name:"Downloads",props:{downloads:{}},setup(e){const t=e;return(e,a)=>((0,r.wg)(),(0,r.j4)(A,{stat:t.downloads},{default:(0,r.w5)((()=>[q])),_:1},8,["stat"]))}});const K=G;var Q=K;const V=["href"],O=["src"],X=["src"],ee=["textContent"],te=["textContent"];var ae=(0,r.aZ)({__name:"ModelEmbed",setup(e){const t=(0,o.yj)(),a=(0,n.iH)(!0),i=(0,r.Fl)((()=>t.params.modelId)),d=(0,n.iH)(),c=(0,r.Fl)((()=>_(d.value,"name"))),u=(0,r.Fl)((()=>_(d.value,"creator.username"))),v=(0,r.Fl)((()=>_(d.value,"creator.image"))),p=(0,r.Fl)((()=>_(d.value,"modelVersions"))),m=(0,r.Fl)((()=>_(d.value,"stats.rating",-1))),w=(0,r.Fl)((()=>_(d.value,"stats.ratingCount",0))),h=(0,r.Fl)((()=>_(d.value,"stats.favoriteCount",0))),g=(0,r.Fl)((()=>_(d.value,"stats.commentCount",0))),f=(0,r.Fl)((()=>_(d.value,"stats.downloadCount",0))),b=(0,r.Fl)((()=>_(d.value,"type","UNK"))),y=(0,r.Fl)((()=>{const e=p.value;return e?e[0]:void 0})),M=(0,r.Fl)((()=>_(y.value,"images"))),C=(0,r.Fl)((()=>{const e=M.value;if(void 0!=e)for(const t of e)if("None"==t["nsfw"])return t.url}));function k(){a.value=!0;const e=i.value;return e&&parseInt(e??0)>=0?fetch(`https://civitai.com/api/v1/models/${i.value}`).then((e=>e.json())).then((e=>(d.value=e,e))).then((()=>a.value=!1)):{}}return(0,r.bv)((()=>{k();const{pause:e,resume:t,isActive:a}=(0,l.Zv)(k,1e4)})),(e,t)=>((0,r.wg)(),(0,r.iD)("a",{target:"_parent",href:`https://civitai.com/models/${i.value}`,class:(0,s.C_)([e.$style.Embed,{[e.$style.EmbedLoading]:a.value}])},[(0,r._)("div",{class:(0,s.C_)(e.$style.EmbedContent)},[(0,r._)("div",{class:(0,s.C_)(e.$style.PreviewImageWrapper)},[(0,r._)("div",{class:(0,s.C_)(e.$style.PreviewImage)},[(0,r._)("img",{alt:"Model preview image",src:C.value},null,8,O)],2)],2),(0,r._)("div",{class:(0,s.C_)(e.$style.ModelTypeWrapper)},[(0,r._)("div",{class:(0,s.C_)(e.$style.ModelType)},(0,s.zw)(b.value.replace("TextualInversion","Embedding")),3)],2),(0,r._)("div",{class:(0,s.C_)(e.$style.ModelMeta)},[(0,r._)("div",{class:(0,s.C_)(e.$style.Uploader)},[(0,r._)("div",{class:(0,s.C_)(e.$style.AvatarImage)},[(0,r._)("img",{alt:"User profile image",src:v.value},null,8,X)],2),(0,r._)("div",{textContent:(0,s.zw)(u.value)},null,8,ee)],2),(0,r._)("div",{class:(0,s.C_)(e.$style.ModelName),textContent:(0,s.zw)(c.value)},null,10,te),(0,r._)("div",{class:(0,s.C_)(e.$style.ModelStats)},[(0,r._)("div",{class:(0,s.C_)(e.$style.StatsWrapper)},[(0,r.Wm)(I,{rating:m.value,ratings:w.value},null,8,["rating","ratings"])],2),(0,r._)("div",{class:(0,s.C_)(e.$style.StatsWrapper),style:{"margin-left":"auto"}},[(0,r.Wm)(T,{likes:h.value},null,8,["likes"])],2),(0,r._)("div",{class:(0,s.C_)(e.$style.StatsWrapper)},[(0,r.Wm)(Y,{comments:g.value},null,8,["comments"])],2),(0,r._)("div",{class:(0,s.C_)(e.$style.StatsWrapper)},[(0,r.Wm)(Q,{downloads:f.value},null,8,["downloads"])],2)],2)],2)],2),(0,r._)("div",{class:(0,s.C_)(e.$style.LoaderContent)},[(0,r._)("div",{class:(0,s.C_)(e.$style.Loader)},null,2)],2)],10,V))}}),re={Embed:"ModelEmbed_Embed_egotp",EmbedLoading:"ModelEmbed_EmbedLoading_kNgMx",EmbedContent:"ModelEmbed_EmbedContent_zSxQu",LoaderContent:"ModelEmbed_LoaderContent_dlQGe",Loader:"ModelEmbed_Loader_C5fCs",loader:"ModelEmbed_loader_EZ9VY",PreviewImage:"ModelEmbed_PreviewImage_QtY0g",PreviewImageWrapper:"ModelEmbed_PreviewImageWrapper_aIJue",ModelTypeWrapper:"ModelEmbed_ModelTypeWrapper_LZqGm",ModelType:"ModelEmbed_ModelType_Mnawd",ModelMeta:"ModelEmbed_ModelMeta_tUOmm",Uploader:"ModelEmbed_Uploader_HngYJ",ModelName:"ModelEmbed_ModelName_Cjqtc",ModelStats:"ModelEmbed_ModelStats_Wy1gP",AvatarImage:"ModelEmbed_AvatarImage_DFD0v",StatsWrapper:"ModelEmbed_StatsWrapper_yIXtr"};const se={};se["$style"]=re;const ne=(0,g.Z)(ae,[["__cssModules",se]]);var le=ne}}]);
//# sourceMappingURL=216.5d491c89.js.map