'use strict';function aa(){return function(){}}var h,n=this;function ba(a){a=a.split(".");for(var c=n,b;b=a.shift();)if(null!=c[b])c=c[b];else return null;return c}
function ca(a){var c=typeof a;if("object"==c)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return c;var b=Object.prototype.toString.call(a);if("[object Window]"==b)return"object";if("[object Array]"==b||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==b||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof a.call)return"object";return c}function da(a){var c=ca(a);return"array"==c||"object"==c&&"number"==typeof a.length}function r(a){return"string"==typeof a}function ea(a){return"function"==ca(a)}function fa(a){var c=typeof a;return"object"==c&&null!=a||"function"==c}function ga(a){return a[ha]||(a[ha]=++ja)}var ha="closure_uid_"+(1E9*Math.random()>>>0),ja=0;function ka(a,c,b){return a.call.apply(a.bind,arguments)}
function la(a,c,b){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(b,d);return a.apply(c,b)}}return function(){return a.apply(c,arguments)}}function s(a,c,b){s=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ka:la;return s.apply(null,arguments)}var t=Date.now||function(){return+new Date};
function v(a,c){function b(){}b.prototype=c.prototype;a.K=c.prototype;a.prototype=new b};function ma(a,c){for(var b=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<b.length;)d+=b.shift()+e.shift();return d+b.join("%s")}function na(a,c){return a.replace(/(\r\n|\r|\n)/g,c?"<br />":"<br>")}function w(a){if(!oa.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(pa,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(qa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(ra,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(sa,"&quot;"));return a}var pa=/&/g,qa=/</g,ra=/>/g,sa=/\"/g,oa=/[&<>\"]/;
function ta(a){return na(a.replace(/  /g," &#160;"),void 0)};var ua,va,wa,xa;function ya(){return n.navigator?n.navigator.userAgent:null}xa=wa=va=ua=!1;var za;if(za=ya()){var Aa=n.navigator;ua=0==za.lastIndexOf("Opera",0);va=!ua&&(-1!=za.indexOf("MSIE")||-1!=za.indexOf("Trident"));wa=!ua&&-1!=za.indexOf("WebKit");xa=!ua&&!wa&&!va&&"Gecko"==Aa.product}var Ba=ua,x=va,Ca=xa,Da=wa,Ea=n.navigator,Fa=-1!=(Ea&&Ea.platform||"").indexOf("Mac");function Ga(){var a=n.document;return a?a.documentMode:void 0}var Ha;
a:{var Ia="",Ja;if(Ba&&n.opera)var Ka=n.opera.version,Ia="function"==typeof Ka?Ka():Ka;else if(Ca?Ja=/rv\:([^\);]+)(\)|;)/:x?Ja=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Da&&(Ja=/WebKit\/(\S+)/),Ja)var La=Ja.exec(ya()),Ia=La?La[1]:"";if(x){var Ma=Ga();if(Ma>parseFloat(Ia)){Ha=String(Ma);break a}}Ha=Ia}var Na={};
function y(a){var c;if(!(c=Na[a])){c=0;for(var b=String(Ha).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(b.length,d.length),f=0;0==c&&f<e;f++){var g=b[f]||"",k=d[f]||"",l=/(\d*)(\D*)/g,q=/(\d*)(\D*)/g;do{var p=l.exec(g)||["","",""],m=q.exec(k)||["","",""];if(0==p[0].length&&0==m[0].length)break;c=((0==p[1].length?0:parseInt(p[1],10))<(0==m[1].length?0:parseInt(m[1],10))?-1:(0==p[1].length?0:parseInt(p[1],10))>(0==m[1].length?
0:parseInt(m[1],10))?1:0)||((0==p[2].length)<(0==m[2].length)?-1:(0==p[2].length)>(0==m[2].length)?1:0)||(p[2]<m[2]?-1:p[2]>m[2]?1:0)}while(0==c)}c=Na[a]=0<=c}return c}var Oa=n.document,Pa=Oa&&x?Ga()||("CSS1Compat"==Oa.compatMode?parseInt(Ha,10):5):void 0;function Qa(a,c){for(var b in a)c.call(void 0,a[b],b,a)}function Ra(a){var c=[],b=0,d;for(d in a)c[b++]=d;return c}var Sa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ta(a,c){for(var b,d,e=1;e<arguments.length;e++){d=arguments[e];for(b in d)a[b]=d[b];for(var f=0;f<Sa.length;f++)b=Sa[f],Object.prototype.hasOwnProperty.call(d,b)&&(a[b]=d[b])}};function Ua(a){Error.captureStackTrace?Error.captureStackTrace(this,Ua):this.stack=Error().stack||"";a&&(this.message=String(a))}v(Ua,Error);Ua.prototype.name="CustomError";function Va(a,c){c.unshift(a);Ua.call(this,ma.apply(null,c));c.shift()}v(Va,Ua);Va.prototype.name="AssertionError";function Wa(a,c){throw new Va("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var z=Array.prototype,Xa=z.indexOf?function(a,c,b){return z.indexOf.call(a,c,b)}:function(a,c,b){b=null==b?0:0>b?Math.max(0,a.length+b):b;if(r(a))return r(c)&&1==c.length?a.indexOf(c,b):-1;for(;b<a.length;b++)if(b in a&&a[b]===c)return b;return-1},Ya=z.forEach?function(a,c,b){z.forEach.call(a,c,b)}:function(a,c,b){for(var d=a.length,e=r(a)?a.split(""):a,f=0;f<d;f++)f in e&&c.call(b,e[f],f,a)};function Za(a){var c=a.length;if(0<c){for(var b=Array(c),d=0;d<c;d++)b[d]=a[d];return b}return[]}
function $a(a,c,b){return 2>=arguments.length?z.slice.call(a,c):z.slice.call(a,c,b)};var ab="StopIteration"in n?n.StopIteration:Error("StopIteration");function bb(){}bb.prototype.b=function(){throw ab;};bb.prototype.Z=function(){return this};function cb(a){if(a instanceof bb)return a;if("function"==typeof a.Z)return a.Z(!1);if(da(a)){var c=0,b=new bb;b.b=function(){for(;;){if(c>=a.length)throw ab;if(c in a)return a[c++];c++}};return b}throw Error("Not implemented");}
function db(a,c){if(da(a))try{Ya(a,c,void 0)}catch(b){if(b!==ab)throw b;}else{a=cb(a);try{for(;;)c.call(void 0,a.b(),void 0,a)}catch(d){if(d!==ab)throw d;}}};function eb(a,c){this.c={};this.b=[];var b=arguments.length;if(1<b){if(b%2)throw Error("Uneven number of arguments");for(var d=0;d<b;d+=2)fb(this,arguments[d],arguments[d+1])}else if(a){if(a instanceof eb)b=a.ba(),d=a.ca();else{var b=Ra(a),e=[],f=0;for(d in a)e[f++]=a[d];d=e}for(e=0;e<b.length;e++)fb(this,b[e],d[e])}}h=eb.prototype;h.F=0;h.W=0;h.u=function(){return this.F};h.ca=function(){gb(this);for(var a=[],c=0;c<this.b.length;c++)a.push(this.c[this.b[c]]);return a};h.ba=function(){gb(this);return this.b.concat()};
h.clear=function(){this.c={};this.W=this.F=this.b.length=0};function gb(a){if(a.F!=a.b.length){for(var c=0,b=0;c<a.b.length;){var d=a.b[c];Object.prototype.hasOwnProperty.call(a.c,d)&&(a.b[b++]=d);c++}a.b.length=b}if(a.F!=a.b.length){for(var e={},b=c=0;c<a.b.length;)d=a.b[c],Object.prototype.hasOwnProperty.call(e,d)||(a.b[b++]=d,e[d]=1),c++;a.b.length=b}}function fb(a,c,b){Object.prototype.hasOwnProperty.call(a.c,c)||(a.F++,a.b.push(c),a.W++);a.c[c]=b}
h.Z=function(a){gb(this);var c=0,b=this.b,d=this.c,e=this.W,f=this,g=new bb;g.b=function(){for(;;){if(e!=f.W)throw Error("The map has changed since the iterator was created");if(c>=b.length)throw ab;var g=b[c++];return a?g:d[g]}};return g};function hb(a){return ib(a||arguments.callee.caller,[])}
function ib(a,c){var b=[];if(0<=Xa(c,a))b.push("[...circular reference...]");else if(a&&50>c.length){b.push(jb(a)+"(");for(var d=a.arguments,e=0;e<d.length;e++){0<e&&b.push(", ");var f;f=d[e];switch(typeof f){case "object":f=f?"object":"null";break;case "string":break;case "number":f=String(f);break;case "boolean":f=f?"true":"false";break;case "function":f=(f=jb(f))?f:"[fn]";break;default:f=typeof f}40<f.length&&(f=f.substr(0,40)+"...");b.push(f)}c.push(a);b.push(")\n");try{b.push(ib(a.caller,c))}catch(g){b.push("[exception trying to get caller]\n")}}else a?
b.push("[...long stack...]"):b.push("[end]");return b.join("")}function jb(a){if(kb[a])return kb[a];a=String(a);if(!kb[a]){var c=/function ([^\(]+)/.exec(a);kb[a]=c?c[1]:"[Anonymous]"}return kb[a]}var kb={};function lb(a,c,b,d,e){this.m="number"==typeof e?e:mb++;this.f=d||t();this.i=a;this.e=c;this.d=b;delete this.c;delete this.b}lb.prototype.m=0;lb.prototype.c=null;lb.prototype.b=null;var mb=0;function A(a){this.i=a}A.prototype.d=null;A.prototype.b=null;A.prototype.e=null;A.prototype.c=null;function B(a,c){this.name=a;this.value=c}B.prototype.toString=function(){return this.name};var nb=new B("SHOUT",1200),ob=new B("SEVERE",1E3),pb=new B("WARNING",900),qb=new B("INFO",800),rb=new B("CONFIG",700),sb=[new B("OFF",Infinity),nb,ob,pb,qb,rb,new B("FINE",500),new B("FINER",400),new B("FINEST",300),new B("ALL",0)],tb=null;
function ub(a){if(!tb){tb={};for(var c=0,b;b=sb[c];c++)tb[b.value]=b,tb[b.name]=b}return tb[a]||null}function xb(a){if(a.b)return a.b;if(a.d)return xb(a.d);Wa("Root logger has no level set.");return null}
A.prototype.log=function(a,c,b){if(a.value>=xb(this).value)for(a=this.f(a,c,b),c="log:"+a.e,n.console&&(n.console.timeStamp?n.console.timeStamp(c):n.console.markTimeline&&n.console.markTimeline(c)),n.msWriteProfilerMark&&n.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.c)for(var e=0,f=void 0;f=b.c[e];e++)f(d);c=c.d}};
A.prototype.f=function(a,c,b){var d=new lb(a,String(c),this.i);if(b){d.c=b;var e;var f=arguments.callee.caller;try{var g;var k=ba("window.location.href");if(r(b))g={message:b,name:"Unknown error",lineNumber:"Not available",fileName:k,stack:"Not available"};else{var l,q,p=!1;try{l=b.lineNumber||b.Ja||"Not available"}catch(m){l="Not available",p=!0}try{q=b.fileName||b.filename||b.sourceURL||n.$googDebugFname||k}catch(L){q="Not available",p=!0}g=!p&&b.lineNumber&&b.fileName&&b.stack&&b.message&&b.name?
b:{message:b.message||"Not available",name:b.name||"UnknownError",lineNumber:l,fileName:q,stack:b.stack||"Not available"}}e="Message: "+w(g.message)+'\nUrl: <a href="view-source:'+g.fileName+'" target="_new">'+g.fileName+"</a>\nLine: "+g.lineNumber+"\n\nBrowser stack:\n"+w(g.stack+"-> ")+"[end]\n\nJS stack traversal:\n"+w(hb(f)+"-> ")}catch(md){e="Exception trying to expose exception! You win, we lose. "+md}d.b=e}return d};var yb={},zb=null;function Ab(){zb||(zb=new A(""),yb[""]=zb,zb.b=rb)}
function C(a){Ab();var c;if(!(c=yb[a])){c=new A(a);var b=a.lastIndexOf("."),d=a.substr(b+1),b=C(a.substr(0,b));b.e||(b.e={});b.e[d]=c;c.d=b;yb[a]=c}return c};function D(a,c){a&&a.log(qb,c,void 0)};function E(){0!=Bb&&(Cb[ga(this)]=this)}var Bb=0,Cb={};E.prototype.f=!1;E.prototype.aa=function(){if(!this.f&&(this.f=!0,this.p(),0!=Bb)){var a=ga(this);delete Cb[a]}};E.prototype.p=function(){if(this.i)for(;this.i.length;)this.i.shift()()};function F(a,c){E.call(this);this.e=c;this.c=[];if(a>this.e)throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");for(var b=0;b<a;b++)this.c.push(this.b())}v(F,E);F.prototype.b=function(){return{}};F.prototype.d=function(a){if(fa(a))if(ea(a.aa))a.aa();else for(var c in a)delete a[c]};F.prototype.p=function(){F.K.p.call(this);for(var a=this.c;a.length;)this.d(a.pop());delete this.c};function Db(){this.c=[];this.e=new eb;this.b=new eb;this.i=1;this.f=new F(0,4E3);this.f.b=function(){return new Eb};this.m=new F(0,50);this.m.b=function(){return new Fb};var a=this;this.d=new F(0,2E3);this.d.b=function(){return String(a.i++)};this.d.d=aa()}function Fb(){this.time=this.count=0}Fb.prototype.toString=function(){var a=[];a.push(this.type," ",this.count," (",Math.round(10*this.time)/10," ms)");return a.join("")};function Eb(){}
function Gb(a,c,b){var d=[];-1==c?d.push("    "):d.push(Hb(a.c-c));d.push(" ",Ib(a.c-0));0==a.b?d.push(" Start        "):1==a.b?(d.push(" Done "),d.push(Hb(a.f-a.startTime)," ms ")):d.push(" Comment      ");d.push(b,a);0<a.e&&d.push("[VarAlloc ",a.e,"] ");return d.join("")}Eb.prototype.toString=function(){return null==this.type?this.d:"["+this.type+"] "+this.d};
Db.prototype.toString=function(){for(var a=[],c=-1,b=[],d=0;d<this.c.length;d++){var e=this.c[d];1==e.b&&b.pop();a.push(" ",Gb(e,c,b.join("")));c=e.c;a.push("\n");0==e.b&&b.push("|  ")}if(0!=this.e.u()){var f=t();a.push(" Unstopped timers:\n");db(this.e,function(b){a.push("  ",b," (",f-b.startTime," ms, started at ",Ib(b.startTime),")\n")})}c=this.b.ba();for(d=0;d<c.length;d++)b=Object.prototype.hasOwnProperty.call(this.b.c,c[d])?this.b.c[c[d]]:void 0,1<b.count&&a.push(" TOTAL ",b,"\n");a.push("Total tracers created ",
0,"\n","Total comments created ",0,"\n","Overhead start: ",0," ms\n","Overhead end: ",0," ms\n","Overhead comment: ",0," ms\n");return a.join("")};function Hb(a){a=Math.round(a);var c="";1E3>a&&(c=" ");100>a&&(c="  ");10>a&&(c="   ");return c+a}function Ib(a){a=Math.round(a);return String(100+a/1E3%60).substring(1,3)+"."+String(1E3+a%1E3).substring(1,4)}new Db;var Jb="closure_listenable_"+(1E6*Math.random()|0),Kb=0;function Lb(a,c,b,d,e){this.q=a;this.V=null;this.src=c;this.type=b;this.capture=!!d;this.Q=e;this.key=++Kb;this.B=this.L=!1}function Mb(a){a.B=!0;a.q=null;a.V=null;a.src=null;a.Q=null};function Nb(a){this.src=a;this.b={};this.c=0}Nb.prototype.add=function(a,c,b,d,e){var f=this.b[a];f||(f=this.b[a]=[],this.c++);var g=Ob(f,c,d,e);-1<g?(a=f[g],b||(a.L=!1)):(a=new Lb(c,this.src,a,!!d,e),a.L=b,f.push(a));return a};function Pb(a,c){var b=c.type;if(b in a.b){var d=a.b[b],e=Xa(d,c),f;(f=0<=e)&&z.splice.call(d,e,1);f&&(Mb(c),0==a.b[b].length&&(delete a.b[b],a.c--))}}function Ob(a,c,b,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.B&&f.q==c&&f.capture==!!b&&f.Q==d)return e}return-1};var Qb=!x||x&&9<=Pa,Rb=x&&!y("9");!Da||y("528");Ca&&y("1.9b")||x&&y("8")||Ba&&y("9.5")||Da&&y("528");Ca&&!y("8")||x&&y("9");function G(a,c){this.type=a;this.b=this.H=c}h=G.prototype;h.aa=aa();h.r=!1;h.za=!1;h.na=!0;h.preventDefault=function(){this.za=!0;this.na=!1};function Sb(a){Sb[" "](a);return a}Sb[" "]=aa();function Tb(a,c){if(a){var b=this.type=a.type;G.call(this,b);this.H=a.target||a.srcElement;this.b=c;var d=a.relatedTarget;if(d){if(Ca){var e;a:{try{Sb(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==b?d=a.fromElement:"mouseout"==b&&(d=a.toElement);this.va=d;this.offsetX=Da||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=Da||void 0!==a.offsetY?a.offsetY:a.layerY;this.sa=void 0!==a.clientX?a.clientX:a.pageX;this.ta=void 0!==a.clientY?a.clientY:a.pageY;this.wa=a.screenX||0;
this.xa=a.screenY||0;this.ra=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==b?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.ya=a.shiftKey;this.ua=a.metaKey;this.Ha=Fa?a.metaKey:a.ctrlKey;this.ja=a;a.defaultPrevented&&this.preventDefault();delete this.r}}v(Tb,G);h=Tb.prototype;h.H=null;h.va=null;h.offsetX=0;h.offsetY=0;h.sa=0;h.ta=0;h.wa=0;h.xa=0;h.ra=0;h.keyCode=0;h.charCode=0;h.ctrlKey=!1;h.altKey=!1;h.ya=!1;h.ua=!1;h.Ha=!1;h.ja=null;
h.preventDefault=function(){Tb.K.preventDefault.call(this);var a=this.ja;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Rb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(c){}};var Ub={},Vb={},Wb={};function Xb(a,c,b,d,e){if("array"==ca(c))for(var f=0;f<c.length;f++)Xb(a,c[f],b,d,e);else if(b=Yb(b),a&&a[Jb])a.o.add(c,b,!1,d,e);else{f=b;if(!c)throw Error("Invalid event type");b=!!d;var g=ga(a),k=Vb[g];k||(Vb[g]=k=new Nb(a));d=k.add(c,f,!1,d,e);d.V||(e=Zb(),d.V=e,e.src=a,e.q=d,a.addEventListener?a.addEventListener(c,e,b):a.attachEvent(c in Wb?Wb[c]:Wb[c]="on"+c,e),Ub[d.key]=d)}}
function Zb(){var a=$b,c=Qb?function(b){return a.call(c.src,c.q,b)}:function(b){b=a.call(c.src,c.q,b);if(!b)return b};return c}function ac(a,c,b,d,e){if("array"==ca(c))for(var f=0;f<c.length;f++)ac(a,c[f],b,d,e);else(b=Yb(b),a&&a[Jb])?(a=a.o,c in a.b&&(f=a.b[c],b=Ob(f,b,d,e),-1<b&&(Mb(f[b]),z.splice.call(f,b,1),0==f.length&&(delete a.b[c],a.c--)))):a&&(d=!!d,a=bc(a))&&(c=a.b[c],a=-1,c&&(a=Ob(c,b,d,e)),(b=-1<a?c[a]:null)&&cc(b))}
function cc(a){if("number"!=typeof a&&a&&!a.B){var c=a.src;if(c&&c[Jb])Pb(c.o,a);else{var b=a.type,d=a.V;c.removeEventListener?c.removeEventListener(b,d,a.capture):c.detachEvent&&c.detachEvent(b in Wb?Wb[b]:Wb[b]="on"+b,d);(b=bc(c))?(Pb(b,a),0==b.c&&(b.src=null,delete Vb[ga(c)])):Mb(a);delete Ub[a.key]}}}function dc(a,c,b,d){var e=1;if(a=bc(a))if(c=a.b[c])for(c=Za(c),a=0;a<c.length;a++){var f=c[a];f&&(f.capture==b&&!f.B)&&(e&=!1!==ec(f,d))}return Boolean(e)}
function ec(a,c){var b=a.q,d=a.Q||a.src;a.L&&cc(a);return b.call(d,c)}
function $b(a,c){if(a.B)return!0;if(!Qb){var b=c||ba("window.event"),d=new Tb(b,this),e=!0;if(!(0>b.keyCode||void 0!=b.returnValue)){a:{var f=!1;if(0==b.keyCode)try{b.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==b.returnValue)b.returnValue=!0}b=[];for(f=d.b;f;f=f.parentNode)b.push(f);for(var f=a.type,k=b.length-1;!d.r&&0<=k;k--)d.b=b[k],e&=dc(b[k],f,!0,d);for(k=0;!d.r&&k<b.length;k++)d.b=b[k],e&=dc(b[k],f,!1,d)}return e}return ec(a,new Tb(c,this))}
function bc(a){return a[ha]?Vb[ga(a)]||null:null}var fc="__closure_events_fn_"+(1E9*Math.random()>>>0);function Yb(a){return ea(a)?a:a[fc]||(a[fc]=function(c){return a.handleEvent(c)})};function H(){E.call(this);this.o=new Nb(this);this.m=this}v(H,E);H.prototype[Jb]=!0;H.prototype.e=null;H.prototype.removeEventListener=function(a,c,b,d){ac(this,a,c,b,d)};
function gc(a,c){var b,d=a.e;if(d)for(b=[];d;d=d.e)b.push(d);var d=a.m,e=c,f=e.type||e;if(r(e))e=new G(e,d);else if(e instanceof G)e.H=e.H||d;else{var g=e,e=new G(f,d);Ta(e,g)}var g=!0,k;if(b)for(var l=b.length-1;!e.r&&0<=l;l--)k=e.b=b[l],g=hc(k,f,!0,e)&&g;e.r||(k=e.b=d,g=hc(k,f,!0,e)&&g,e.r||(g=hc(k,f,!1,e)&&g));if(b)for(l=0;!e.r&&l<b.length;l++)k=e.b=b[l],g=hc(k,f,!1,e)&&g}
H.prototype.p=function(){H.K.p.call(this);if(this.o){var a=this.o,c=0,b;for(b in a.b){for(var d=a.b[b],e=0;e<d.length;e++)++c,Mb(d[e]);delete a.b[b];a.c--}}this.e=null};function hc(a,c,b,d){c=a.o.b[c];if(!c)return!0;c=Za(c);for(var e=!0,f=0;f<c.length;++f){var g=c[f];if(g&&!g.B&&g.capture==b){var k=g.q,l=g.Q||g.src;g.L&&Pb(a.o,g);e=!1!==k.call(l,d)&&e}}return e&&!1!=d.na};function ic(a,c){H.call(this);this.da=void 0!==a?a:!0;this.d=c||jc;this.c=this.d(this.J)}v(ic,H);h=ic.prototype;h.k=null;h.n=null;h.A=void 0;h.$=!1;h.J=0;var kc=ic.prototype,lc=C("goog.net.WebSocket");kc.l=lc;function jc(a){return Math.min(1E3*Math.pow(2,a),6E4)}h=ic.prototype;
h.ka=function(a,c){null!=this.b&&n.clearTimeout(this.b);this.b=null;this.n=a;(this.A=c)?(D(this.l,"Opening the WebSocket on "+this.n+" with protocol "+this.A),this.k=new WebSocket(this.n,this.A)):(D(this.l,"Opening the WebSocket on "+this.n),this.k=new WebSocket(this.n));this.k.onopen=s(this.Fa,this);this.k.onclose=s(this.Ca,this);this.k.onmessage=s(this.Ea,this);this.k.onerror=s(this.Da,this)};
function mc(a){null!=a.b&&n.clearTimeout(a.b);a.b=null;a.k&&(D(a.l,"Closing the WebSocket."),a.$=!0,a.k.close(),a.k=null)}h.Fa=function(){D(this.l,"WebSocket opened on "+this.n);gc(this,"d");this.J=0;this.c=this.d(this.J)};
h.Ca=function(a){D(this.l,"The WebSocket on "+this.n+" closed.");gc(this,"a");this.k=null;if(this.$)D(this.l,"The WebSocket closed normally."),this.n=null,this.A=void 0;else{var c=this.l;c&&c.log(ob,"The WebSocket disconnected unexpectedly: "+a.data,void 0);if(this.da){D(this.l,"Seconds until next reconnect attempt: "+Math.floor(this.c/1E3));a=s(this.ka,this,this.n,this.A);c=this.c;if(ea(a))this&&(a=s(a,this));else if(a&&"function"==typeof a.handleEvent)a=s(a.handleEvent,a);else throw Error("Invalid listener argument");
this.b=2147483647<c?-1:n.setTimeout(a,c||0);this.J++;this.c=this.d(this.J)}}this.$=!1};h.Ea=function(a){gc(this,new nc(a.data))};h.Da=function(a){a=a.data;var c=this.l;c&&c.log(ob,"An error occurred: "+a,void 0);gc(this,new oc(a))};h.p=function(){ic.K.p.call(this);mc(this)};function nc(a){G.call(this,"c");this.message=a}v(nc,G);function oc(a){G.call(this,"b");this.data=a}v(oc,G);var pc=C("rnoadm.net"),qc=new ic,rc=!1;function I(a){rc&&(a=JSON.stringify(a),qc.k.send(a))}qc.ka("ws://"+location.host+"/ws");Xb(qc,"d",sc);Xb(qc,"a",tc);Xb(qc,"c",uc);var vc=[],wc=[];function sc(){rc=!0;vc.forEach(function(a){a()})}function tc(){rc=!1;wc.forEach(function(a){a()})}var J={};function uc(a){a=JSON.parse(a.message);var c,b;for(b in a)(c=J[b])?("Kick"==b&&mc(qc),c(a[b])):pc.log(qb,"Unhandled: "+b,void 0)};var K=document.createElement("canvas"),M=K.getContext("2d"),N=window.innerWidth,O=window.innerHeight;K.width=N;K.height=O;window.addEventListener("resize",function(){K.width=N=window.innerWidth;K.height=O=window.innerHeight;P()},!1);var xc=Infinity,yc=0;function P(a){a=!isNaN(a)&&0<a?a:0;var c=a+Date.now();xc>c&&(yc&&clearTimeout(yc),yc=setTimeout(function(){window.requestAnimationFrame(zc);yc=0;xc=Infinity},a),xc=c)}var Ac=!1;vc.push(function(){Ac=!0;P()});wc.push(function(){Ac=!1;P()});
function zc(){M.clearRect(0,0,N,O);if(Ac){var a=N,c=O,b=Bc,d=Cc,e=Date.now()-Dc;400>e&&(b=(e*b+(400-e)*Fc)/400,P());e=Date.now()-Gc;400>e&&(d=(e*d+(400-e)*Hc)/400,P());b=a/2/32-b;d=c/2/32-d;for(e=0;256>e;e+=16)for(var f=0;256>f;f+=16)Ic(Jc,b+e+8,d+f+8);for(f=Math.max(0,Math.floor(-c/2-d));f<Math.min(256,Math.floor(c/2-d));f++)for(e=Math.max(0,Math.floor(-a/2-b));e<Math.min(256,Math.floor(a/2-b));e++){var g=Q[e|f<<8];if(g)for(var k in g)Kc(g[k],b,d)}Lc()}else R(Mc,N/2/32,O/2/32)}
K.onmousemove=function(a){Nc(a.offsetX,a.offsetY,N,O)};K.onmouseout=function(){Nc(-Infinity,-Infinity,N,O)};K.onclick=function(a){var c;a:{c=a.offsetX;var b=a.offsetY,d=N,e=O;Nc(c,b,d,e);if(Oc)Pc("inv"),c=!0;else{for(var f=S.length-1;0<=f;f--)if(S[f].c(c,b,d,e)){c=!0;break a}c=!1}}c||(c=a.offsetX,a=a.offsetY,b=O/2/32-Cc,c=Math.floor(c/32-(N/2/32-Bc)),a=Math.ceil(a/32-b),0>c||(256<=c||0>a||256<=a)||I({Walk:{X:c,Y:a}}))};function Qc(a,c,b,d,e,f,g,k){function l(){function a(b,c){return 128<=b?255-(255-b)*(255-c)/127:b*c/127}if(m.width&&m.height){q.width=m.width;q.height=m.height;var b=q.getContext("2d");b.fillStyle=c;b.fillRect(0,0,1,1);var d=b.getImageData(0,0,1,1),e=d.data[0],f=d.data[1],g=d.data[2],k=d.data[3];b.clearRect(0,0,1,1);b.drawImage(m,0,0);d=b.getImageData(0,0,m.width,m.height);q.width*=p;q.height*=p;for(var l=b.getImageData(0,0,q.width,q.height),Ec=0,V=0,ia=0,vb=0;vb<q.height;vb++){for(var wb=0;wb<q.width;wb++)l.data[ia+
0]=a(d.data[V+0],e),l.data[ia+1]=a(d.data[V+1],f),l.data[ia+2]=a(d.data[V+2],g),l.data[ia+3]=d.data[V+3]*k/255,wb%p==p-1&&(V+=4),ia+=4;vb%p==p-1?Ec=V:V=Ec}b.putImageData(l,0,0);P()}}var q=document.createElement("canvas");this.f=q;this.e=b;this.i=d;this.m=e;this.d=f;this.c=g;var p=Math.floor(k)||1;this.b=p;var m;a+=".png?12";(m=Rc[a])?l():(m=new Image,m.onload=function(){Rc[a]=m;l()},m.src=a)}var Rc={};
function Ic(a,c,b){var d=a.i,e=a.m;switch(a.e){case "ccr":d+=[0,6,3,9][Math.floor(Date.now()/1500)%4];P(1500-Date.now()%1500);break;case "wa":d+=[0,1,0,2][Math.floor(Date.now()/150)%4];P(150-Date.now()%150);break;case "l2":d+=Math.floor(Date.now()/150)%2;P(150-Date.now()%150);break;case "l3":d+=Math.floor(Date.now()/150)%3;P(150-Date.now()%150);break;case "_ac":if(2>e)break;var f=Date.now()/1E4;switch(e){case 2:case 3:case 4:case 5:b+=Math.sin(5*f+7*Math.cos(3*f)+e)/8}P()}M.drawImage(a.f,Math.floor(d*
a.d*a.b),Math.floor(e*a.c*a.b),Math.floor(a.d*a.b),Math.floor(a.c*a.b),Math.floor(32*c-(a.d*a.b-32)/2),Math.floor(32*b-a.c*a.b),Math.floor(a.d*a.b),Math.floor(a.c*a.b))}function Sc(a){return new Qc(a.S,a.C,a.E.a||"",a.E.x||0,a.E.y||0,a.E.w||32,a.E.h||32,a.E.s||1)};function Tc(a,c,b,d){this.id=b;this.e=this.b=a;this.f=this.c=c;this.d=0;this.name=d.N;var e=[];this.i=e;d.S.forEach(function(a){e.push(Sc(a))})}function Uc(a,c){a.name=c.N;var b=a.i;b.length=0;c.S.forEach(function(a){b.push(new Qc(a.S,a.C,a.E.a,a.E.x,a.E.y,a.E.w||32,a.E.h||32,a.E.s||1))})}function Vc(a,c,b){a.d=Date.now();a.e=a.b;a.f=a.c;a.b=c;a.c=b}
function Kc(a,c,b){var d=a.b,e=a.c,f=Date.now()-a.d;400>f&&(d=(f*d+(400-f)*a.e)/400,e=(f*e+(400-f)*a.f)/400,P());a.i.forEach(function(a){Ic(a,d+c,e+b)})};function T(a,c,b,d){this.b=a;this.f=c;this.d=b?1:0.5;this.c=32*this.d+"px "+(b?'"Jolly Lodger"':'"Open Sans Condensed"');this.e=!d}T.prototype.width=function(){M.font=this.c;return M.measureText(this.b).width/32};T.prototype.height=function(){return this.d};function R(a,c,b){M.font=a.c;var d=M.measureText(a.b).width;c=Math.floor(32*c-(a.e?d/2:0));b=Math.floor(32*b);M.fillStyle="rgba(0,0,0,.2)";for(d=-1;1>=d;d++)for(var e=-1;2>=e;e++)M.fillText(a.b,c+d,b+e);M.fillStyle=a.f;M.fillText(a.b,c,b)}
var Mc=new T("connection lost","#aaa",!0);function Wc(a,c,b,d){this.e=a;this.d=c;this.b=b;this.c=d}
var S=[],Xc=new T("Character","#ccc",!0),Yc=new T("change name","#aaa",!1),Zc=new T("change name","#fff",!1),$c=new T("change skin color","#aaa",!1),ad=new T("change skin color","#fff",!1),bd=new T("change shirt color","#aaa",!1),cd=new T("change shirt color","#fff",!1),dd=new T("change pants color","#aaa",!1),ed=new T("change pants color","#fff",!1),fd=new T("Confirm","#aaa",!0),gd=new T("Confirm","#fff",!0),hd=new T("[push enter to chat]","#ccc",!1,!0),id={};
function Pc(a,c){var b=id[a](c||{});b.b(jd[0],jd[1],jd[2],jd[3]);var d=!1;S.forEach(function(c,f){if(c.e==a)return d=!0,S[f]=b,!1});d||S.push(b);P()}J.HUD=function(a){S.length=0;P();a.N.length&&Pc(a.N,a.D)};var Oc=!1,kd=new Qc("ui_icons","#888","",0,0,32,32),ld=new Qc("ui_icons","#bbb","",0,0,32,32);
function Lc(){var a=N,c=O;null==U?0==S.length&&R(hd,0.1,c/32-0.1):R(new T(U+"_","#fff",!1,!0),0.1,c/32-0.1);nd.forEach(function(a,d){R(a,0.1,c/32-d/2-0.6)});S.length||(Oc?Ic(ld,a/32-1,c/32):Ic(kd,a/32-1,c/32));S.forEach(function(b){b.d(a,c)})}var jd=[-Infinity,-Infinity,1,1];function Nc(a,c,b,d){jd=[a,c,b,d];if(0==S.length&&a>=b-32&&a<=b&&c>=d-32&&c<=d)Oc||(Oc=!0,P());else{Oc&&(Oc=!1,P());for(var e=S.length-1;0<=e&&!S[e].b(a,c,b,d);e--);}}
window.addEventListener("keydown",function(a){if(!a.ctrlKey&&!a.altKey)switch(20>a.keyCode&&a.preventDefault(),a.keyCode){case 8:null!==U&&0<U.length&&(U=U.substring(0,U.length-1),P());break;case 13:null===U?U="":(I({Chat:U}),U=null);P();break;case 27:null!==U&&(U=null,P())}},!1);window.addEventListener("keypress",function(a){null!==U&&(U+=String.fromCharCode(a.charCode),P())},!1);vc.push(function(){U=null});var U=null,nd=[];
J.Msg=function(a){a.forEach(function(a){nd.unshift(new T(a.T,a.C,!1,!0));window.setTimeout(function(){nd.pop()},6E4);P()})};id.inv=function(){return new Wc("inv",function(a,c){var b=Math.ceil(od.length/8),d=a/32-8.1,e=c/32-1.1-b;M.fillStyle="rgba(0,0,0,.7)";M.fillRect(a-262.4,c-32*(b+1.2),8.2,b+0.2);od.forEach(function(a){Kc(a,d,e)})},aa(),aa())};var od=[];J.Inventory=function(a){var c={};od.forEach(function(a){c[a.id]=a});od.length=0;a.forEach(function(a,d){var e=c[a.I];e?(Uc(e,a.O),Vc(e,d%8,Math.floor(d/8))):e=new Tc(d%8,Math.floor(d/8),a.I,a.O);od.push(e)});P()};C("rnoadm.state");var Q=Array(65536);J.Update=function(a){a.forEach(function(a){var b=a.I,d=a.X,e=a.Y,f=a.Fx,g=a.Fy,k=a.R,l=a.O;a=d|e<<8;Q[a]||(Q[a]={});k?(delete Q[a][b],P()):void 0!==l?b in Q[a]?Uc(Q[a][b],l):Q[a][b]=new Tc(d,e,b,l):(f|=g<<8,Q[a][b]=Q[f][b],delete Q[f][b],Vc(Q[a][b],d,e))});P()};var Dc=0,Fc=127,Bc=127;J.PlayerX=function(a){Bc!=a&&(Fc=Bc,Bc=a,Dc=Date.now(),P())};var Gc=0,Hc=127,Cc=127;J.PlayerY=function(a){Cc!=a&&(Hc=Cc,Cc=a,Gc=Date.now(),P())};wc.push(function(){for(var a=0;a<Q.length;a++)delete Q[a]});
var Jc=new Qc("grass","#268f1e","",0,0,512,512);var pd=new function(){this.b=t()};function qd(a){this.c=a||"";this.d=pd}qd.prototype.b=!1;function W(a){return 10>a?"0"+a:String(a)}function rd(a){qd.call(this,a)}v(rd,qd);rd.prototype.b=!0;function sd(a){this.c=a||100;this.b=[]}h=sd.prototype;h.v=0;h.add=function(a){var c=this.b[this.v];this.b[this.v]=a;this.v=(this.v+1)%this.c;return c};h.u=function(){return this.b.length};h.clear=function(){this.v=this.b.length=0};h.ca=function(){for(var a=this.u(),c=[],b=this.u()-this.u();b<a;b++){var d=c,e=b,f=b;if(f>=this.b.length)throw Error("Out of bounds exception");f=this.b.length<this.c?f:(this.v+Number(f))%this.c;d[e]=this.b[f]}return c};
h.ba=function(){for(var a=[],c=this.u(),b=0;b<c;b++)a[b]=b;return a};function td(a,c){this.c=a||"";this.d=[];this.da=c||"";this.e=new sd(ud);this.Aa=s(this.oa,this);this.m=new rd(this.da);this.i={};if(!0!=this.la){this.la=!0;Ab();var b=zb,d=this.Aa;b.c||(b.c=[]);b.c.push(d)}this.f="1"==vd(this.c,"enabled");n.setInterval(s(this.Ia,this),7500)}var ud=500;h=td.prototype;h.g=null;h.fa=!1;h.la=!1;h.ia=null;h.ea=t();function wd(a){return!!a.g&&!a.g.closed}h.clear=function(){this.e.clear();wd(this)&&this.ha()};
h.oa=function(a){if(!this.i[a.d]){var c=this.m,b;switch(a.i.value){case nb.value:b="dbg-sh";break;case ob.value:b="dbg-sev";break;case pb.value:b="dbg-w";break;case qb.value:b="dbg-i";break;default:b="dbg-f"}var d=[];d.push(c.c," ");var e=new Date(a.f);d.push("[",W(e.getFullYear()-2E3)+W(e.getMonth()+1)+W(e.getDate())+" "+W(e.getHours())+":"+W(e.getMinutes())+":"+W(e.getSeconds())+"."+W(Math.floor(e.getMilliseconds()/10)),"] ");var e=(a.f-c.d.b)/1E3,f=e.toFixed(3),g=0;if(1>e)g=2;else for(;100>e;)g++,
e*=10;for(;0<g--;)f=" "+f;d.push("[",ta(f),"s] ");d.push("[",w(a.d),"] ");d.push('<span class="',b,'">',na(ta(w(a.e))));c.b&&a.c&&d.push("<br>",na(ta(a.b||"")));d.push("</span><br>");a=d.join("");this.f?(xd(this),this.e.add(a),yd(this,a)):this.e.add(a)}};function yd(a,c){a.d.push(c);n.clearTimeout(a.ia);750<t()-a.ea?a.ga():a.ia=n.setTimeout(s(a.ga,a),250)}
h.ga=function(){this.ea=t();if(wd(this)){var a=this.g.document.body,a=a&&100>=a.scrollHeight-(a.scrollTop+a.clientHeight);this.g.document.write(this.d.join(""));this.d.length=0;a&&this.g.scrollTo(0,1E6)}};function zd(a){for(var c=a.e.ca(),b=0;b<c.length;b++)yd(a,c[b])}
function xd(a){if(!wd(a)&&!a.fa){var c=vd(a.c,"dbg","0,0,800,500").split(","),b=Number(c[0]),d=Number(c[1]),e=Number(c[2]),c=Number(c[3]);a.fa=!0;a.g=window.open("",x?a.c.replace(/[\s\-\.\,]/g,"_"):a.c,"width="+e+",height="+c+",toolbar=no,resizable=yes,scrollbars=yes,left="+b+",top="+d+",status=no,screenx="+b+",screeny="+d);a.g||a.Ba||(alert("Logger popup was blocked"),a.Ba=!0);a.fa=!1;a.g&&a.ha()}}h.M=function(){return"*{font:normal 14px monospace;}.dbg-sev{color:#F00}.dbg-w{color:#E92}.dbg-sh{background-color:#fd4;font-weight:bold;color:#000}.dbg-i{color:#666}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}"};
h.ha=function(){wd(this)&&(this.g.document.open(),yd(this,"<style>"+this.M()+'</style><hr><div class="dbg-ev" style="text-align:center">LOGGING<br><small>Logger: '+this.c+"</small></div><hr>"),zd(this))};function Ad(a,c,b){a=(c+a.c).replace(/[;=\s]/g,"_");document.cookie=a+"="+encodeURIComponent(b)+";path=/;expires="+(new Date(t()+2592E6)).toUTCString()}
function vd(a,c,b){a=(c+a).replace(/[;=\s]/g,"_");c=String(document.cookie);var d=c.indexOf(a+"=");return-1!=d?(b=c.indexOf(";",d),decodeURIComponent(c.substring(d+a.length+1,-1==b?c.length:b))):b||""}h.Ia=function(){wd(this)&&Ad(this,"dbg",(this.g.screenX||this.g.screenLeft||0)+","+(this.g.screenY||this.g.screenTop||0)+","+(this.g.outerWidth||800)+","+(this.g.outerHeight||500))};function Bd(a,c){var b;b=a.className;b=r(b)&&b.match(/\S+/g)||[];for(var d=$a(arguments,1),e=b.length+d.length,f=b,g=0;g<d.length;g++)0<=Xa(f,d[g])||f.push(d[g]);a.className=b.join(" ");return b.length==e};var Cd=!x||x&&9<=Pa;!Ca&&!x||x&&x&&9<=Pa||Ca&&y("1.9.1");x&&y("9");function X(a,c){return r(c)?a.getElementById(c):c}function Dd(a,c){Qa(c,function(b,c){"style"==c?a.style.cssText=b:"class"==c?a.className=b:"for"==c?a.htmlFor=b:c in Ed?a.setAttribute(Ed[c],b):0==c.lastIndexOf("aria-",0)||0==c.lastIndexOf("data-",0)?a.setAttribute(c,b):a[c]=b})}var Ed={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function Fd(a,c,b){function d(b){b&&c.appendChild(r(b)?a.createTextNode(b):b)}for(var e=2;e<b.length;e++){var f=b[e];!da(f)||fa(f)&&0<f.nodeType?d(f):Ya(Gd(f)?Za(f):f,d)}}function Gd(a){if(a&&"number"==typeof a.length){if(fa(a))return"function"==typeof a.item||"string"==typeof a.item;if(ea(a))return"function"==typeof a.item}return!1}function Hd(a){this.j=a||n.document||document}
Hd.prototype.t=function(a,c,b){var d=this.j,e=arguments,f=e[0],g=e[1];if(!Cd&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',w(g.name),'"');if(g.type){f.push(' type="',w(g.type),'"');var k={};Ta(k,g);delete k.type;g=k}f.push(">");f=f.join("")}f=d.createElement(f);g&&(r(g)?f.className=g:"array"==ca(g)?Bd.apply(null,[f].concat(g)):Dd(f,g));2<e.length&&Fd(d,f,e);return f};Hd.prototype.appendChild=function(a,c){a.appendChild(c)};function Id(a,c){if(Jd){var b=Kd(),d;for(d in b){var b=d.replace("fancywindow.sel.",""),b=C(b),e=b.b,f=window.localStorage.getItem(d).toString();e&&e.toString()==f||(e=ub(f),b.b=e)}}td.call(this,a,c)}v(Id,td);var Jd;a:{try{Jd=!!window.localStorage.getItem;break a}catch(Ld){}Jd=!1}h=Id.prototype;
h.ga=function(){this.ea=t();if(wd(this)){for(var a=X(this.b.j,"log"),c=100>=a.scrollHeight-(a.scrollTop+a.offsetHeight),b=0;b<this.d.length;b++){var d=this.b.t("div","logmsg");d.innerHTML=this.d[b];a.appendChild(d)}this.d.length=0;this.ma();c&&(a.scrollTop=a.scrollHeight)}};
h.ha=function(){if(wd(this)){var a=this.g.document;a.open();a.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd"><html><head><title>Logging: '+this.c+"</title><style>"+this.M()+'</style></head><body><div id="log" style="overflow:auto"></div><div id="head"><p><b>Logging: '+this.c+'</b></p><p>LOGGING</p><span id="clearbutton">clear</span><span id="exitbutton">exit</span><span id="openbutton">options</span></div><div id="options"><big><b>Options:</b></big><div id="optionsarea"></div><span id="closebutton">save and close</span></div></body></html>');
a.close();(x?a.body:this.g).onresize=s(this.ma,this);this.b=new Hd(a);X(this.b.j,"openbutton").onclick=s(this.Ga,this);X(this.b.j,"closebutton").onclick=s(this.pa,this);X(this.b.j,"clearbutton").onclick=s(this.clear,this);X(this.b.j,"exitbutton").onclick=s(this.qa,this);zd(this)}};
h.Ga=function(){var a=X(this.b.j,"optionsarea");a.innerHTML="";for(var c=Md(),b=this.b,d=0;d<c.length;d++){var e=C(c[d]),e=b.t("div",{},Nd(this,"sel"+c[d],e.b?e.b.name:"INHERIT"),b.t("span",{},c[d]||"(root)"));a.appendChild(e)}X(this.b.j,"options").style.display="block";return!1};
function Nd(a,c,b){a=a.b;c=a.t("select",{id:c});for(var d=0;d<sb.length;d++){var e=sb[d],f=a.t("option",{},e.name);b==e.name&&(f.selected=!0);c.appendChild(f)}c.appendChild(a.t("option",{selected:"INHERIT"==b},"INHERIT"));return c}
h.pa=function(){X(this.b.j,"options").style.display="none";for(var a=Md(),c=this.b,b=0;b<a.length;b++){var d=C(a[b]),e=X(c.j,"sel"+a[b]),e=e.options[e.selectedIndex].text;"INHERIT"==e?d.b=null:(e=ub(e),d.b=e)}if(Jd)for(a=Md(),c=Kd(),b=0;b<a.length;b++)d="fancywindow.sel."+a[b],e=C(a[b]).b,d in c?e?window.localStorage.getItem(d)!=e.name&&window.localStorage.setItem(d,e.name):window.localStorage.removeItem(d):e&&window.localStorage.setItem(d,e.name);return!1};
h.ma=function(){var a=this.b,c=X(a.j,"log"),b=X(a.j,"head");c.style.top=b.offsetHeight+"px";c.style.height=a.j.body.offsetHeight-b.offsetHeight-(x?4:0)+"px"};h.qa=function(){this.f=!1;Ad(this,"enabled","0");this.g&&this.g.close()};h.M=function(){return Id.K.M.call(this)+"html,body{height:100%;width:100%;margin:0px;padding:0px;background-color:#FFF;overflow:hidden}*{}.logmsg{border-bottom:1px solid #CCC;padding:2px;font:90% monospace}#head{position:absolute;width:100%;font:x-small arial;border-bottom:2px solid #999;background-color:#EEE;}#head p{margin:0px 5px;}#log{position:absolute;width:100%;background-color:#FFF;}#options{position:absolute;right:0px;width:50%;height:100%;border-left:1px solid #999;background-color:#DDD;display:none;padding-left: 5px;font:normal small arial;overflow:auto;}#openbutton,#closebutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:5px;font:x-small arial;}#clearbutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:80px;font:x-small arial;}#exitbutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:50px;font:x-small arial;}select{font:x-small arial;margin-right:10px;}hr{border:0;height:5px;background-color:#8c8;color:#8c8;}"};
function Kd(){for(var a={},c=0,b=window.localStorage.length;c<b;c++){var d=window.localStorage.key(c);null!=d&&0==d.lastIndexOf("fancywindow.sel.",0)&&(a[d]=!0)}return a}function Md(){var a=Ra(yb);a.sort();return a};var Y=window.sessionStorage.rnoadm_username||"",Z=window.sessionStorage.rnoadm_password||"",Od=document.querySelector("form"),Pd=Od.querySelector("#username"),Qd=Od.querySelector("#password"),Rd=Od.querySelector("#password2");vc.push(function(){Y.length&&2<Z.length&&(Pd.value=Y,Qd.value=Z,Rd.value=Z,Od.onsubmit())});function Sd(a){I({Admin:[].slice.call(arguments)})}var Td=["admin"],$=n;Td[0]in $||!$.execScript||$.execScript("var "+Td[0]);
for(var Ud;Td.length&&(Ud=Td.shift());)Td.length||void 0===Sd?$=$[Ud]?$[Ud]:$[Ud]={}:$[Ud]=Sd;Qd.onchange=function(){Rd.value=Qd.value};Od.onsubmit=function(){Y=Pd.value;Z=Qd.value;if(Y.length)if(2>=Z.length)Y=Z="",Qd.focus();else{window.sessionStorage.rnoadm_username=Y;window.sessionStorage.rnoadm_password=Z;I({Auth:{U:Y,P:Z}});var a=Od.parentNode;a&&(a.removeChild(Od),a.style.overflow="hidden",a.style.fontSize="0",a.appendChild(K))}else Y=Z="",Pd.focus()};
J.Kick=function(a){window.sessionStorage.rnoadm_username=Y="";window.sessionStorage.rnoadm_password=Z="";alert(a)};id.cc=function(a){var c=[];a.S.forEach(function(a){c.push(Sc(a))});var b=new T(a.N,"#aaa",!0),d=new T(a.N,"#fff",!0),e=new T("change gender ("+a.G+")","#aaa",!1),f=new T("change gender ("+a.G+")","#fff",!1),g=!1,k=!1,l=!1,q=!1,p=!1,m=!1,L=!0;return new Wc("cc",function(a,u){M.fillStyle="rgba(0,0,0,.7)";M.fillRect(0,0,a,u);a/=64;u/=64;c.forEach(function(b){Ic(b,a-3,u+1)});R(Xc,a+2,u-4);g?(R(d,a,u+2),R(Zc,a,u+2.5)):(R(b,a,u+2),R(Yc,a,u+2.5));k?R(f,a+2,u-3):R(e,a+2,u-3);l?R(ad,a+2,u-2):R($c,a+2,u-2);
q?R(cd,a+2,u-1):R(bd,a+2,u-1);p?R(ed,a+2,u):R(dd,a+2,u);m?R(gd,a,u+4):R(fd,a,u+4)},function(a,c,d,f){a/=32;c/=32;d/=64;f/=64;c>=f+2-b.height()&&c<=f+2.5&&Math.abs(d-a)<=Math.max(b.width(),Yc.width())/2?(g||P(),g=!0,L=m=p=q=l=k=!1):c>=f-3-e.height()&&c<=f-3&&Math.abs(d+2-a)<=e.width()/2?(k||P(),g=!1,k=!0,L=m=p=q=l=!1):c>=f-2-$c.height()&&c<=f-2&&Math.abs(d+2-a)<=$c.width()/2?(l||P(),k=g=!1,l=!0,L=m=p=q=!1):c>=f-1-bd.height()&&c<=f-1&&Math.abs(d+2-a)<=bd.width()/2?(q||P(),l=k=g=!1,q=!0,L=m=p=!1):c>=
f-dd.height()&&c<=f&&Math.abs(d+2-a)<=dd.width()/2?(p||P(),q=l=k=g=!1,p=!0,L=m=!1):c>=f+4-fd.height()&&c<=f+4&&Math.abs(d-a)<=fd.width()/2?(m||P(),p=q=l=k=g=!1,m=!0,L=!1):(L||P(),m=p=q=l=k=g=!1,L=!0);return!0},function(){switch(!0){case g:I({HUD:{N:"cc",D:"name"}});break;case k:I({HUD:{N:"cc",D:"gender"}});break;case l:I({HUD:{N:"cc",D:"skin"}});break;case q:I({HUD:{N:"cc",D:"shirt"}});break;case p:I({HUD:{N:"cc",D:"pants"}});break;case m:I({HUD:{N:"cc",D:"accept"}})}return!0})};var Vd;new Id;var Wd=C("rnoadm.main");J.ClientHash=function(a){Wd.log(qb,"Client hash: "+a,void 0);void 0!==Vd?Vd!=a&&location.reload(!0):Vd=a};
