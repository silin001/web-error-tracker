!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e="undefined"!=typeof globalThis?globalThis:e||self).ZipPack={})}(this,(function(e){"use strict";const n=e=>{if("object"!=typeof e||null==typeof e)return e;let t;t=e instanceof Array?[]:{};for(let r in e)e.hasOwnProperty(r)&&(t[r]=n(e[r]));return t};var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var o={exports:{}};
/**
     * https://github.com/csnover/TraceKit
     * @license MIT
     * @namespace TraceKit
     */!function(e){!function(n){if(n){var t={},r=n.TraceKit,o=[].slice,i="?",l=/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;t.noConflict=function(){return n.TraceKit=r,t},t.wrap=function(e){return function(){try{return e.apply(this,arguments)}catch(e){throw t.report(e),e}}},t.report=function(){var e,r,o,i,u=[],a=null,s=null;function f(e,n,r){var o=null;if(!n||t.collectWindowErrors){for(var i in u)if(c(u,i))try{u[i](e,n,r)}catch(e){o=e}if(o)throw o}}function p(n,r,o,i,c){if(s)t.computeStackTrace.augmentStackTraceWithInitialElement(s,r,o,n),g();else if(c)f(t.computeStackTrace(c),!0,c);else{var u,a={url:r,line:o,column:i},p=n;if("[object String]"==={}.toString.call(n)){var m=n.match(l);m&&(u=m[1],p=m[2])}a.func=t.computeStackTrace.guessFunctionName(a.url,a.line),a.context=t.computeStackTrace.gatherContext(a.url,a.line),f({name:u,message:p,mode:"onerror",stack:[a]},!0,null)}return!!e&&e.apply(this,arguments)}function m(e){f(t.computeStackTrace(e.reason),!0,e.reason)}function g(){var e=s,n=a;s=null,a=null,f(e,!1,n)}function d(e){if(s){if(a===e)return;g()}var n=t.computeStackTrace(e);throw s=n,a=e,setTimeout((function(){a===e&&g()}),n.incomplete?2e3:0),e}return d.subscribe=function(t){!function(){if(!0===r)return;e=n.onerror,n.onerror=p,r=!0}(),function(){if(!0===i)return;o=n.onunhandledrejection,n.onunhandledrejection=m,i=!0}(),u.push(t)},d.unsubscribe=function(t){for(var l=u.length-1;l>=0;--l)u[l]===t&&u.splice(l,1);0===u.length&&(r&&(n.onerror=e,r=!1),i&&(n.onunhandledrejection=o,i=!1))},d}(),t.computeStackTrace=function(){var e={};function r(r){if("string"!=typeof r)return[];if(!c(e,r)){var o="",i="";try{i=n.document.domain}catch(e){}var l=/(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(r);l&&l[2]===i&&(o=function(e){if(!t.remoteFetching)return"";try{var r=function(){try{return new n.XMLHttpRequest}catch(e){return new n.ActiveXObject("Microsoft.XMLHTTP")}}();return r.open("GET",e,!1),r.send(""),r.responseText}catch(e){return""}}(r)),e[r]=o?o.split("\n"):[]}return e[r]}function o(e,n){var t,o=/function ([^(]*)\(([^)]*)\)/,l=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,c="",a=r(e);if(!a.length)return i;for(var s=0;s<10;++s)if(!u(c=a[n-s]+c)){if(t=l.exec(c))return t[1];if(t=o.exec(c))return t[1]}return i}function l(e,n){var o=r(e);if(!o.length)return null;var i=[],l=Math.floor(t.linesOfContext/2),c=l+t.linesOfContext%2,a=Math.max(0,n-l-1),s=Math.min(o.length,n+c-1);n-=1;for(var f=a;f<s;++f)u(o[f])||i.push(o[f]);return i.length>0?i:null}function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function s(e){return a(e).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function f(e,n){for(var t,o,i=0,l=n.length;i<l;++i)if((t=r(n[i])).length&&(t=t.join("\n"),o=e.exec(t)))return{url:n[i],line:t.substring(0,o.index).split("\n").length,column:o.index-t.lastIndexOf("\n",o.index)-1};return null}function p(e,n,t){var o,i=r(n),l=new RegExp("\\b"+a(e)+"\\b");return t-=1,i&&i.length>t&&(o=l.exec(i[t]))?o.index:null}function m(e){if(!u(n&&n.document)){for(var t,r,o,i,l=[n.location.href],c=n.document.getElementsByTagName("script"),p=""+e,m=0;m<c.length;++m){var g=c[m];g.src&&l.push(g.src)}if(o=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(p)){var d=o[1]?"\\s+"+o[1]:"",h=o[2].split(",").join("\\s*,\\s*");t=a(o[3]).replace(/;$/,";?"),r=new RegExp("function"+d+"\\s*\\(\\s*"+h+"\\s*\\)\\s*{\\s*"+t+"\\s*}")}else r=new RegExp(a(p).replace(/\s+/g,"\\s+"));if(i=f(r,l))return i;if(o=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(p)){var v=o[1];if(t=s(o[2]),i=f(r=new RegExp("on"+v+"=[\\'\"]\\s*"+t+"\\s*[\\'\"]","i"),l[0]))return i;if(i=f(r=new RegExp(t),l))return i}return null}}function g(e){if(!e.stack)return null;for(var n,t,r,c=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,a=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,s=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,f=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,m=/\((\S*)(?::(\d+))(?::(\d+))\)/,g=e.stack.split("\n"),d=[],h=/^(.*) is undefined$/.exec(e.message),v=0,x=g.length;v<x;++v){if(t=c.exec(g[v])){var y=t[2]&&0===t[2].indexOf("native");t[2]&&0===t[2].indexOf("eval")&&(n=m.exec(t[2]))&&(t[2]=n[1],t[3]=n[2],t[4]=n[3]),r={url:y?null:t[2],func:t[1]||i,args:y?[t[2]]:[],line:t[3]?+t[3]:null,column:t[4]?+t[4]:null}}else if(t=s.exec(g[v]))r={url:t[2],func:t[1]||i,args:[],line:+t[3],column:t[4]?+t[4]:null};else{if(!(t=a.exec(g[v])))continue;t[3]&&t[3].indexOf(" > eval")>-1&&(n=f.exec(t[3]))?(t[3]=n[1],t[4]=n[2],t[5]=null):0!==v||t[5]||u(e.columnNumber)||(d[0].column=e.columnNumber+1),r={url:t[3],func:t[1]||i,args:t[2]?t[2].split(","):[],line:t[4]?+t[4]:null,column:t[5]?+t[5]:null}}!r.func&&r.line&&(r.func=o(r.url,r.line)),r.context=r.line?l(r.url,r.line):null,d.push(r)}return d.length?(d[0]&&d[0].line&&!d[0].column&&h&&(d[0].column=p(h[1],d[0].url,d[0].line)),{mode:"stack",name:e.name,message:e.message,stack:d}):null}function d(e,n,t,r){var i={url:n,line:t};if(i.url&&i.line){e.incomplete=!1,i.func||(i.func=o(i.url,i.line)),i.context||(i.context=l(i.url,i.line));var c=/ '([^']+)' /.exec(r);if(c&&(i.column=p(c[1],i.url,i.line)),e.stack.length>0&&e.stack[0].url===i.url){if(e.stack[0].line===i.line)return!1;if(!e.stack[0].line&&e.stack[0].func===i.func)return e.stack[0].line=i.line,e.stack[0].context=i.context,!1}return e.stack.unshift(i),e.partial=!0,!0}return e.incomplete=!0,!1}function h(e,n){for(var r,l,c,u=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,a=[],s={},f=!1,g=h.caller;g&&!f;g=g.caller)if(g!==v&&g!==t.report){if(l={url:null,func:i,args:[],line:null,column:null},g.name?l.func=g.name:(r=u.exec(g.toString()))&&(l.func=r[1]),void 0===l.func)try{l.func=r.input.substring(0,r.input.indexOf("{"))}catch(e){}if(c=m(g)){l.url=c.url,l.line=c.line,l.func===i&&(l.func=o(l.url,l.line));var x=/ '([^']+)' /.exec(e.message||e.description);x&&(l.column=p(x[1],c.url,c.line))}s[""+g]?f=!0:s[""+g]=!0,a.push(l)}n&&a.splice(0,n);var y={mode:"callers",name:e.name,message:e.message,stack:a};return d(y,e.sourceURL||e.fileName,e.line||e.lineNumber,e.message||e.description),y}function v(e,t){var i=null;t=null==t?0:+t;try{if(i=function(e){var n=e.stacktrace;if(n){for(var t,r=/ line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,i=/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i,c=n.split("\n"),u=[],a=0;a<c.length;a+=2){var s=null;if((t=r.exec(c[a]))?s={url:t[2],line:+t[1],column:null,func:t[3],args:[]}:(t=i.exec(c[a]))&&(s={url:t[6],line:+t[1],column:+t[2],func:t[3]||t[4],args:t[5]?t[5].split(","):[]}),s){if(!s.func&&s.line&&(s.func=o(s.url,s.line)),s.line)try{s.context=l(s.url,s.line)}catch(e){}s.context||(s.context=[c[a+1]]),u.push(s)}}return u.length?{mode:"stacktrace",name:e.name,message:e.message,stack:u}:null}}(e),i)return i}catch(e){}try{if(i=g(e))return i}catch(e){}try{if(i=function(e){var t=e.message.split("\n");if(t.length<4)return null;var i,u=/^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,a=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,p=/^\s*Line (\d+) of function script\s*$/i,m=[],g=n&&n.document&&n.document.getElementsByTagName("script"),d=[];for(var h in g)c(g,h)&&!g[h].src&&d.push(g[h]);for(var v=2;v<t.length;v+=2){var x=null;if(i=u.exec(t[v]))x={url:i[2],func:i[3],args:[],line:+i[1],column:null};else if(i=a.exec(t[v])){x={url:i[3],func:i[4],args:[],line:+i[1],column:null};var y=+i[1],w=d[i[2]-1];if(w){var b=r(x.url);if(b){var S=(b=b.join("\n")).indexOf(w.innerText);S>=0&&(x.line=y+b.substring(0,S).split("\n").length)}}}else if(i=p.exec(t[v])){var E=n.location.href.replace(/#.*$/,""),k=f(new RegExp(s(t[v+1])),[E]);x={url:E,func:"",args:[],line:k?k.line:i[1],column:null}}if(x){x.func||(x.func=o(x.url,x.line));var T=l(x.url,x.line),$=T?T[Math.floor(T.length/2)]:null;T&&$.replace(/^\s*/,"")===t[v+1].replace(/^\s*/,"")?x.context=T:x.context=[t[v+1]],m.push(x)}}return m.length?{mode:"multiline",name:e.name,message:t[0],stack:m}:null}(e),i)return i}catch(e){}try{if(i=h(e,t+1))return i}catch(e){}return{name:e.name,message:e.message,mode:"failed"}}return v.augmentStackTraceWithInitialElement=d,v.computeStackTraceFromStackProp=g,v.guessFunctionName=o,v.gatherContext=l,v.ofCaller=function(e){e=1+(null==e?0:+e);try{throw new Error}catch(n){return v(n,e+1)}},v.getSource=r,v}(),t.extendToAsynchronousCallbacks=function(){var e=function(e){var r=n[e];n[e]=function(){var e=o.call(arguments),n=e[0];return"function"==typeof n&&(e[0]=t.wrap(n)),r.apply?r.apply(this,e):r(e[0],e[1])}};e("setTimeout"),e("setInterval")},t.remoteFetching||(t.remoteFetching=!0),t.collectWindowErrors||(t.collectWindowErrors=!0),(!t.linesOfContext||t.linesOfContext<1)&&(t.linesOfContext=11),e.exports&&n.module!==e?e.exports=t:n.TraceKit=t}function c(e,n){return Object.prototype.hasOwnProperty.call(e,n)}function u(e){return void 0===e}}("undefined"!=typeof window?window:t)}(o);var i=r(o.exports);function l(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")} ${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}:${String(e.getSeconds()).padStart(2,"0")}`}function c(e,n,t){return{errorType:{1:"jsError",2:"resourceError",3:"vueError",4:"httpError"}[e],message:n,stack:t,date:l()}}e.ErrorReport=class{options;reportApi;vueExample;constructor(e){this.options=e,this.reportApi=e.reportApi,this.vueExample=e.vue,console.log("项目分类---",e.module),this.init()}init(){this.formatErrorInfo(),this.vueErrorHandler(),this.resourceErrorHandler()}formatErrorInfo(){i.report.subscribe((e=>{console.log("TraceKit格式化后错误信息=",e);const{message:n,stack:t}=e||{};if(!t.length||!n)return console.log("没有stack信息，不使用TraceKit处理错误"),!1;const r=c(3,n,{column:t[0].column,line:t[0].line,url:t[0].url,func:t[0].func});this.reportViaImg(r)}))}reportViaImg(e){const n=new Image(1,1),t=this.reportApi;n.src=t+JSON.stringify(e)}vueErrorHandler(){this.vueExample.config.errorHandler=function(e,n,t){try{console.log("-----vue-error",e,n,t),i.report(e)}catch(e){console.error("vue-errorHandler错误：",e)}}}async resourceStatus(e){try{const n=await fetch(e);return{status:n.status,statusText:n.statusText}}catch(e){console.error("fetct请求资源，错误捕获：",e)}}resourceErrorHandler(){window.addEventListener("error",(async e=>{const n=e.target;let t;if(n instanceof HTMLImageElement?t=n.src:n instanceof HTMLAnchorElement&&(t=n.href),t){console.log("-----js-资源错误",e);const r=n.baseURI||"",o=new URL(t),i=this.createResourceErrorObject(n,o,r,t),l=`资源错误:在[${i.routePath}]路由中发现,值为[${i.path}]`;this.reportViaImg(c(2,l,i))}else console.log("非资源加载错误",e)}),!0)}createResourceErrorObject(e,n,t,r){return{resourceType:e instanceof HTMLImageElement?"img":e.localName,url:r,origin:n.origin,path:n.pathname,routePath:t.split("#")[1]||""}}jsError(){window.onerror=(e,n,t,r,o)=>{console.log("js-执行错误"),console.log("🚀🚀 ~ file: errorReport.js:173 ~ jsError ~ msg, url, line, col, error:",e,n,t,r,o)}}promiseError(){window.addEventListener("unhandledrejection",(e=>{console.log("promise错误：",e)}),!0)}},e.deepClone=n,e.formatErrorDatas=c,e.test="=======>  typescript  plugin-zip-pack..."})),"undefined"!=typeof window&&(window.ZipPack_VERSION_="1.0.0");
