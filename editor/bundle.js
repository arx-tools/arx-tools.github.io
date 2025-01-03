"use strict";(()=>{var Ef=Object.create;var Mh=Object.defineProperty;var Af=Object.getOwnPropertyDescriptor;var Tf=Object.getOwnPropertyNames;var Cf=Object.getPrototypeOf,If=Object.prototype.hasOwnProperty;var Br=(i=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(i,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):i)(function(i){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+i+'" is not supported')});var Rf=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var Pf=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Tf(t))!If.call(i,r)&&r!==e&&Mh(i,r,{get:()=>t[r],enumerable:!(n=Af(t,r))||n.enumerable});return i};var Df=(i,t,e)=>(e=i!=null?Ef(Cf(i)):{},Pf(t||!i||!i.__esModule?Mh(e,"default",{value:i,enumerable:!0}):e,i));var qh=Rf((Xh,Uc)=>{(function(i){typeof Xh=="object"&&typeof Uc<"u"?Uc.exports=i():typeof define=="function"&&define.amd?define([],i):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=i()})(function(){return function i(t,e,n){function r(o,c){if(!e[o]){if(!t[o]){var l=typeof Br=="function"&&Br;if(!c&&l)return l(o,!0);if(s)return s(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var h=e[o]={exports:{}};t[o][0].call(h.exports,function(f){var d=t[o][1][f];return r(d||f)},h,h.exports,i,t,e,n)}return e[o].exports}for(var s=typeof Br=="function"&&Br,a=0;a<n.length;a++)r(n[a]);return r}({1:[function(i,t,e){"use strict";var n=i("./utils"),r=i("./support"),s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(a){for(var o,c,l,u,h,f,d,_=[],g=0,m=a.length,p=m,w=n.getTypeOf(a)!=="string";g<a.length;)p=m-g,l=w?(o=a[g++],c=g<m?a[g++]:0,g<m?a[g++]:0):(o=a.charCodeAt(g++),c=g<m?a.charCodeAt(g++):0,g<m?a.charCodeAt(g++):0),u=o>>2,h=(3&o)<<4|c>>4,f=1<p?(15&c)<<2|l>>6:64,d=2<p?63&l:64,_.push(s.charAt(u)+s.charAt(h)+s.charAt(f)+s.charAt(d));return _.join("")},e.decode=function(a){var o,c,l,u,h,f,d=0,_=0,g="data:";if(a.substr(0,g.length)===g)throw new Error("Invalid base64 input, it looks like a data url.");var m,p=3*(a=a.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(a.charAt(a.length-1)===s.charAt(64)&&p--,a.charAt(a.length-2)===s.charAt(64)&&p--,p%1!=0)throw new Error("Invalid base64 input, bad content length.");for(m=r.uint8array?new Uint8Array(0|p):new Array(0|p);d<a.length;)o=s.indexOf(a.charAt(d++))<<2|(u=s.indexOf(a.charAt(d++)))>>4,c=(15&u)<<4|(h=s.indexOf(a.charAt(d++)))>>2,l=(3&h)<<6|(f=s.indexOf(a.charAt(d++))),m[_++]=o,h!==64&&(m[_++]=c),f!==64&&(m[_++]=l);return m}},{"./support":30,"./utils":32}],2:[function(i,t,e){"use strict";var n=i("./external"),r=i("./stream/DataWorker"),s=i("./stream/Crc32Probe"),a=i("./stream/DataLengthProbe");function o(c,l,u,h,f){this.compressedSize=c,this.uncompressedSize=l,this.crc32=u,this.compression=h,this.compressedContent=f}o.prototype={getContentWorker:function(){var c=new r(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),l=this;return c.on("end",function(){if(this.streamInfo.data_length!==l.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),c},getCompressedWorker:function(){return new r(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(c,l,u){return c.pipe(new s).pipe(new a("uncompressedSize")).pipe(l.compressWorker(u)).pipe(new a("compressedSize")).withStreamInfo("compression",l)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(i,t,e){"use strict";var n=i("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},e.DEFLATE=i("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(i,t,e){"use strict";var n=i("./utils"),r=function(){for(var s,a=[],o=0;o<256;o++){s=o;for(var c=0;c<8;c++)s=1&s?3988292384^s>>>1:s>>>1;a[o]=s}return a}();t.exports=function(s,a){return s!==void 0&&s.length?n.getTypeOf(s)!=="string"?function(o,c,l,u){var h=r,f=u+l;o^=-1;for(var d=u;d<f;d++)o=o>>>8^h[255&(o^c[d])];return-1^o}(0|a,s,s.length,0):function(o,c,l,u){var h=r,f=u+l;o^=-1;for(var d=u;d<f;d++)o=o>>>8^h[255&(o^c.charCodeAt(d))];return-1^o}(0|a,s,s.length,0):0}},{"./utils":32}],5:[function(i,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(i,t,e){"use strict";var n=null;n=typeof Promise<"u"?Promise:i("lie"),t.exports={Promise:n}},{lie:37}],7:[function(i,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",r=i("pako"),s=i("./utils"),a=i("./stream/GenericWorker"),o=n?"uint8array":"array";function c(l,u){a.call(this,"FlateWorker/"+l),this._pako=null,this._pakoAction=l,this._pakoOptions=u,this.meta={}}e.magic="\b\0",s.inherits(c,a),c.prototype.processChunk=function(l){this.meta=l.meta,this._pako===null&&this._createPako(),this._pako.push(s.transformTo(o,l.data),!1)},c.prototype.flush=function(){a.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new r[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var l=this;this._pako.onData=function(u){l.push({data:u,meta:l.meta})}},e.compressWorker=function(l){return new c("Deflate",l)},e.uncompressWorker=function(){return new c("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(i,t,e){"use strict";function n(h,f){var d,_="";for(d=0;d<f;d++)_+=String.fromCharCode(255&h),h>>>=8;return _}function r(h,f,d,_,g,m){var p,w,b=h.file,M=h.compression,D=m!==o.utf8encode,P=s.transformTo("string",m(b.name)),E=s.transformTo("string",o.utf8encode(b.name)),O=b.comment,T=s.transformTo("string",m(O)),x=s.transformTo("string",o.utf8encode(O)),C=E.length!==b.name.length,y=x.length!==O.length,U="",q="",G="",J=b.dir,X=b.date,Z={crc32:0,compressedSize:0,uncompressedSize:0};f&&!d||(Z.crc32=h.crc32,Z.compressedSize=h.compressedSize,Z.uncompressedSize=h.uncompressedSize);var k=0;f&&(k|=8),D||!C&&!y||(k|=2048);var N=0,ut=0;J&&(N|=16),g==="UNIX"?(ut=798,N|=function(ct,rt){var pt=ct;return ct||(pt=rt?16893:33204),(65535&pt)<<16}(b.unixPermissions,J)):(ut=20,N|=function(ct){return 63&(ct||0)}(b.dosPermissions)),p=X.getUTCHours(),p<<=6,p|=X.getUTCMinutes(),p<<=5,p|=X.getUTCSeconds()/2,w=X.getUTCFullYear()-1980,w<<=4,w|=X.getUTCMonth()+1,w<<=5,w|=X.getUTCDate(),C&&(q=n(1,1)+n(c(P),4)+E,U+="up"+n(q.length,2)+q),y&&(G=n(1,1)+n(c(T),4)+x,U+="uc"+n(G.length,2)+G);var ht="";return ht+=`
\0`,ht+=n(k,2),ht+=M.magic,ht+=n(p,2),ht+=n(w,2),ht+=n(Z.crc32,4),ht+=n(Z.compressedSize,4),ht+=n(Z.uncompressedSize,4),ht+=n(P.length,2),ht+=n(U.length,2),{fileRecord:l.LOCAL_FILE_HEADER+ht+P+U,dirRecord:l.CENTRAL_FILE_HEADER+n(ut,2)+ht+n(T.length,2)+"\0\0\0\0"+n(N,4)+n(_,4)+P+U+T}}var s=i("../utils"),a=i("../stream/GenericWorker"),o=i("../utf8"),c=i("../crc32"),l=i("../signature");function u(h,f,d,_){a.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=f,this.zipPlatform=d,this.encodeFileName=_,this.streamFiles=h,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}s.inherits(u,a),u.prototype.push=function(h){var f=h.meta.percent||0,d=this.entriesCount,_=this._sources.length;this.accumulate?this.contentBuffer.push(h):(this.bytesWritten+=h.data.length,a.prototype.push.call(this,{data:h.data,meta:{currentFile:this.currentFile,percent:d?(f+100*(d-_-1))/d:100}}))},u.prototype.openedSource=function(h){this.currentSourceOffset=this.bytesWritten,this.currentFile=h.file.name;var f=this.streamFiles&&!h.file.dir;if(f){var d=r(h,f,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:d.fileRecord,meta:{percent:0}})}else this.accumulate=!0},u.prototype.closedSource=function(h){this.accumulate=!1;var f=this.streamFiles&&!h.file.dir,d=r(h,f,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(d.dirRecord),f)this.push({data:function(_){return l.DATA_DESCRIPTOR+n(_.crc32,4)+n(_.compressedSize,4)+n(_.uncompressedSize,4)}(h),meta:{percent:100}});else for(this.push({data:d.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},u.prototype.flush=function(){for(var h=this.bytesWritten,f=0;f<this.dirRecords.length;f++)this.push({data:this.dirRecords[f],meta:{percent:100}});var d=this.bytesWritten-h,_=function(g,m,p,w,b){var M=s.transformTo("string",b(w));return l.CENTRAL_DIRECTORY_END+"\0\0\0\0"+n(g,2)+n(g,2)+n(m,4)+n(p,4)+n(M.length,2)+M}(this.dirRecords.length,d,h,this.zipComment,this.encodeFileName);this.push({data:_,meta:{percent:100}})},u.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},u.prototype.registerPrevious=function(h){this._sources.push(h);var f=this;return h.on("data",function(d){f.processChunk(d)}),h.on("end",function(){f.closedSource(f.previous.streamInfo),f._sources.length?f.prepareNextSource():f.end()}),h.on("error",function(d){f.error(d)}),this},u.prototype.resume=function(){return!!a.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},u.prototype.error=function(h){var f=this._sources;if(!a.prototype.error.call(this,h))return!1;for(var d=0;d<f.length;d++)try{f[d].error(h)}catch{}return!0},u.prototype.lock=function(){a.prototype.lock.call(this);for(var h=this._sources,f=0;f<h.length;f++)h[f].lock()},t.exports=u},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(i,t,e){"use strict";var n=i("../compressions"),r=i("./ZipFileWorker");e.generateWorker=function(s,a,o){var c=new r(a.streamFiles,o,a.platform,a.encodeFileName),l=0;try{s.forEach(function(u,h){l++;var f=function(m,p){var w=m||p,b=n[w];if(!b)throw new Error(w+" is not a valid compression method !");return b}(h.options.compression,a.compression),d=h.options.compressionOptions||a.compressionOptions||{},_=h.dir,g=h.date;h._compressWorker(f,d).withStreamInfo("file",{name:u,dir:_,date:g,comment:h.comment||"",unixPermissions:h.unixPermissions,dosPermissions:h.dosPermissions}).pipe(c)}),c.entriesCount=l}catch(u){c.error(u)}return c}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(i,t,e){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var r=new n;for(var s in this)typeof this[s]!="function"&&(r[s]=this[s]);return r}}(n.prototype=i("./object")).loadAsync=i("./load"),n.support=i("./support"),n.defaults=i("./defaults"),n.version="3.10.1",n.loadAsync=function(r,s){return new n().loadAsync(r,s)},n.external=i("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(i,t,e){"use strict";var n=i("./utils"),r=i("./external"),s=i("./utf8"),a=i("./zipEntries"),o=i("./stream/Crc32Probe"),c=i("./nodejsUtils");function l(u){return new r.Promise(function(h,f){var d=u.decompressed.getContentWorker().pipe(new o);d.on("error",function(_){f(_)}).on("end",function(){d.streamInfo.crc32!==u.decompressed.crc32?f(new Error("Corrupted zip : CRC32 mismatch")):h()}).resume()})}t.exports=function(u,h){var f=this;return h=n.extend(h||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:s.utf8decode}),c.isNode&&c.isStream(u)?r.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",u,!0,h.optimizedBinaryString,h.base64).then(function(d){var _=new a(h);return _.load(d),_}).then(function(d){var _=[r.Promise.resolve(d)],g=d.files;if(h.checkCRC32)for(var m=0;m<g.length;m++)_.push(l(g[m]));return r.Promise.all(_)}).then(function(d){for(var _=d.shift(),g=_.files,m=0;m<g.length;m++){var p=g[m],w=p.fileNameStr,b=n.resolve(p.fileNameStr);f.file(b,p.decompressed,{binary:!0,optimizedBinaryString:!0,date:p.date,dir:p.dir,comment:p.fileCommentStr.length?p.fileCommentStr:null,unixPermissions:p.unixPermissions,dosPermissions:p.dosPermissions,createFolders:h.createFolders}),p.dir||(f.file(b).unsafeOriginalName=w)}return _.zipComment.length&&(f.comment=_.zipComment),f})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(i,t,e){"use strict";var n=i("../utils"),r=i("../stream/GenericWorker");function s(a,o){r.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(o)}n.inherits(s,r),s.prototype._bindStream=function(a){var o=this;(this._stream=a).pause(),a.on("data",function(c){o.push({data:c,meta:{percent:0}})}).on("error",function(c){o.isPaused?this.generatedError=c:o.error(c)}).on("end",function(){o.isPaused?o._upstreamEnded=!0:o.end()})},s.prototype.pause=function(){return!!r.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!r.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(i,t,e){"use strict";var n=i("readable-stream").Readable;function r(s,a,o){n.call(this,a),this._helper=s;var c=this;s.on("data",function(l,u){c.push(l)||c._helper.pause(),o&&o(u)}).on("error",function(l){c.emit("error",l)}).on("end",function(){c.push(null)})}i("../utils").inherits(r,n),r.prototype._read=function(){this._helper.resume()},t.exports=r},{"../utils":32,"readable-stream":16}],14:[function(i,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(n,r){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(n,r);if(typeof n=="number")throw new Error('The "data" argument must not be a number');return new Buffer(n,r)},allocBuffer:function(n){if(Buffer.alloc)return Buffer.alloc(n);var r=new Buffer(n);return r.fill(0),r},isBuffer:function(n){return Buffer.isBuffer(n)},isStream:function(n){return n&&typeof n.on=="function"&&typeof n.pause=="function"&&typeof n.resume=="function"}}},{}],15:[function(i,t,e){"use strict";function n(b,M,D){var P,E=s.getTypeOf(M),O=s.extend(D||{},c);O.date=O.date||new Date,O.compression!==null&&(O.compression=O.compression.toUpperCase()),typeof O.unixPermissions=="string"&&(O.unixPermissions=parseInt(O.unixPermissions,8)),O.unixPermissions&&16384&O.unixPermissions&&(O.dir=!0),O.dosPermissions&&16&O.dosPermissions&&(O.dir=!0),O.dir&&(b=g(b)),O.createFolders&&(P=_(b))&&m.call(this,P,!0);var T=E==="string"&&O.binary===!1&&O.base64===!1;D&&D.binary!==void 0||(O.binary=!T),(M instanceof l&&M.uncompressedSize===0||O.dir||!M||M.length===0)&&(O.base64=!1,O.binary=!0,M="",O.compression="STORE",E="string");var x=null;x=M instanceof l||M instanceof a?M:f.isNode&&f.isStream(M)?new d(b,M):s.prepareContent(b,M,O.binary,O.optimizedBinaryString,O.base64);var C=new u(b,x,O);this.files[b]=C}var r=i("./utf8"),s=i("./utils"),a=i("./stream/GenericWorker"),o=i("./stream/StreamHelper"),c=i("./defaults"),l=i("./compressedObject"),u=i("./zipObject"),h=i("./generate"),f=i("./nodejsUtils"),d=i("./nodejs/NodejsStreamInputAdapter"),_=function(b){b.slice(-1)==="/"&&(b=b.substring(0,b.length-1));var M=b.lastIndexOf("/");return 0<M?b.substring(0,M):""},g=function(b){return b.slice(-1)!=="/"&&(b+="/"),b},m=function(b,M){return M=M!==void 0?M:c.createFolders,b=g(b),this.files[b]||n.call(this,b,null,{dir:!0,createFolders:M}),this.files[b]};function p(b){return Object.prototype.toString.call(b)==="[object RegExp]"}var w={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(b){var M,D,P;for(M in this.files)P=this.files[M],(D=M.slice(this.root.length,M.length))&&M.slice(0,this.root.length)===this.root&&b(D,P)},filter:function(b){var M=[];return this.forEach(function(D,P){b(D,P)&&M.push(P)}),M},file:function(b,M,D){if(arguments.length!==1)return b=this.root+b,n.call(this,b,M,D),this;if(p(b)){var P=b;return this.filter(function(O,T){return!T.dir&&P.test(O)})}var E=this.files[this.root+b];return E&&!E.dir?E:null},folder:function(b){if(!b)return this;if(p(b))return this.filter(function(E,O){return O.dir&&b.test(E)});var M=this.root+b,D=m.call(this,M),P=this.clone();return P.root=D.name,P},remove:function(b){b=this.root+b;var M=this.files[b];if(M||(b.slice(-1)!=="/"&&(b+="/"),M=this.files[b]),M&&!M.dir)delete this.files[b];else for(var D=this.filter(function(E,O){return O.name.slice(0,b.length)===b}),P=0;P<D.length;P++)delete this.files[D[P].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(b){var M,D={};try{if((D=s.extend(b||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:r.utf8encode})).type=D.type.toLowerCase(),D.compression=D.compression.toUpperCase(),D.type==="binarystring"&&(D.type="string"),!D.type)throw new Error("No output type specified.");s.checkSupport(D.type),D.platform!=="darwin"&&D.platform!=="freebsd"&&D.platform!=="linux"&&D.platform!=="sunos"||(D.platform="UNIX"),D.platform==="win32"&&(D.platform="DOS");var P=D.comment||this.comment||"";M=h.generateWorker(this,D,P)}catch(E){(M=new a("error")).error(E)}return new o(M,D.type||"string",D.mimeType)},generateAsync:function(b,M){return this.generateInternalStream(b).accumulate(M)},generateNodeStream:function(b,M){return(b=b||{}).type||(b.type="nodebuffer"),this.generateInternalStream(b).toNodejsStream(M)}};t.exports=w},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(i,t,e){"use strict";t.exports=i("stream")},{stream:void 0}],17:[function(i,t,e){"use strict";var n=i("./DataReader");function r(s){n.call(this,s);for(var a=0;a<this.data.length;a++)s[a]=255&s[a]}i("../utils").inherits(r,n),r.prototype.byteAt=function(s){return this.data[this.zero+s]},r.prototype.lastIndexOfSignature=function(s){for(var a=s.charCodeAt(0),o=s.charCodeAt(1),c=s.charCodeAt(2),l=s.charCodeAt(3),u=this.length-4;0<=u;--u)if(this.data[u]===a&&this.data[u+1]===o&&this.data[u+2]===c&&this.data[u+3]===l)return u-this.zero;return-1},r.prototype.readAndCheckSignature=function(s){var a=s.charCodeAt(0),o=s.charCodeAt(1),c=s.charCodeAt(2),l=s.charCodeAt(3),u=this.readData(4);return a===u[0]&&o===u[1]&&c===u[2]&&l===u[3]},r.prototype.readData=function(s){if(this.checkOffset(s),s===0)return[];var a=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,a},t.exports=r},{"../utils":32,"./DataReader":18}],18:[function(i,t,e){"use strict";var n=i("../utils");function r(s){this.data=s,this.length=s.length,this.index=0,this.zero=0}r.prototype={checkOffset:function(s){this.checkIndex(this.index+s)},checkIndex:function(s){if(this.length<this.zero+s||s<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+s+"). Corrupted zip ?")},setIndex:function(s){this.checkIndex(s),this.index=s},skip:function(s){this.setIndex(this.index+s)},byteAt:function(){},readInt:function(s){var a,o=0;for(this.checkOffset(s),a=this.index+s-1;a>=this.index;a--)o=(o<<8)+this.byteAt(a);return this.index+=s,o},readString:function(s){return n.transformTo("string",this.readData(s))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var s=this.readInt(4);return new Date(Date.UTC(1980+(s>>25&127),(s>>21&15)-1,s>>16&31,s>>11&31,s>>5&63,(31&s)<<1))}},t.exports=r},{"../utils":32}],19:[function(i,t,e){"use strict";var n=i("./Uint8ArrayReader");function r(s){n.call(this,s)}i("../utils").inherits(r,n),r.prototype.readData=function(s){this.checkOffset(s);var a=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,a},t.exports=r},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(i,t,e){"use strict";var n=i("./DataReader");function r(s){n.call(this,s)}i("../utils").inherits(r,n),r.prototype.byteAt=function(s){return this.data.charCodeAt(this.zero+s)},r.prototype.lastIndexOfSignature=function(s){return this.data.lastIndexOf(s)-this.zero},r.prototype.readAndCheckSignature=function(s){return s===this.readData(4)},r.prototype.readData=function(s){this.checkOffset(s);var a=this.data.slice(this.zero+this.index,this.zero+this.index+s);return this.index+=s,a},t.exports=r},{"../utils":32,"./DataReader":18}],21:[function(i,t,e){"use strict";var n=i("./ArrayReader");function r(s){n.call(this,s)}i("../utils").inherits(r,n),r.prototype.readData=function(s){if(this.checkOffset(s),s===0)return new Uint8Array(0);var a=this.data.subarray(this.zero+this.index,this.zero+this.index+s);return this.index+=s,a},t.exports=r},{"../utils":32,"./ArrayReader":17}],22:[function(i,t,e){"use strict";var n=i("../utils"),r=i("../support"),s=i("./ArrayReader"),a=i("./StringReader"),o=i("./NodeBufferReader"),c=i("./Uint8ArrayReader");t.exports=function(l){var u=n.getTypeOf(l);return n.checkSupport(u),u!=="string"||r.uint8array?u==="nodebuffer"?new o(l):r.uint8array?new c(n.transformTo("uint8array",l)):new s(n.transformTo("array",l)):new a(l)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(i,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(i,t,e){"use strict";var n=i("./GenericWorker"),r=i("../utils");function s(a){n.call(this,"ConvertWorker to "+a),this.destType=a}r.inherits(s,n),s.prototype.processChunk=function(a){this.push({data:r.transformTo(this.destType,a.data),meta:a.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(i,t,e){"use strict";var n=i("./GenericWorker"),r=i("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}i("../utils").inherits(s,n),s.prototype.processChunk=function(a){this.streamInfo.crc32=r(a.data,this.streamInfo.crc32||0),this.push(a)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(i,t,e){"use strict";var n=i("../utils"),r=i("./GenericWorker");function s(a){r.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}n.inherits(s,r),s.prototype.processChunk=function(a){if(a){var o=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=o+a.data.length}r.prototype.processChunk.call(this,a)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(i,t,e){"use strict";var n=i("../utils"),r=i("./GenericWorker");function s(a){r.call(this,"DataWorker");var o=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(c){o.dataIsReady=!0,o.data=c,o.max=c&&c.length||0,o.type=n.getTypeOf(c),o.isPaused||o._tickAndRepeat()},function(c){o.error(c)})}n.inherits(s,r),s.prototype.cleanUp=function(){r.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!r.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=null,o=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":a=this.data.substring(this.index,o);break;case"uint8array":a=this.data.subarray(this.index,o);break;case"array":case"nodebuffer":a=this.data.slice(this.index,o)}return this.index=o,this.push({data:a,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(i,t,e){"use strict";function n(r){this.name=r||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(r){this.emit("data",r)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(r){this.emit("error",r)}return!0},error:function(r){return!this.isFinished&&(this.isPaused?this.generatedError=r:(this.isFinished=!0,this.emit("error",r),this.previous&&this.previous.error(r),this.cleanUp()),!0)},on:function(r,s){return this._listeners[r].push(s),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(r,s){if(this._listeners[r])for(var a=0;a<this._listeners[r].length;a++)this._listeners[r][a].call(this,s)},pipe:function(r){return r.registerPrevious(this)},registerPrevious:function(r){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=r.streamInfo,this.mergeStreamInfo(),this.previous=r;var s=this;return r.on("data",function(a){s.processChunk(a)}),r.on("end",function(){s.end()}),r.on("error",function(a){s.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var r=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),r=!0),this.previous&&this.previous.resume(),!r},flush:function(){},processChunk:function(r){this.push(r)},withStreamInfo:function(r,s){return this.extraStreamInfo[r]=s,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var r in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,r)&&(this.streamInfo[r]=this.extraStreamInfo[r])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var r="Worker "+this.name;return this.previous?this.previous+" -> "+r:r}},t.exports=n},{}],29:[function(i,t,e){"use strict";var n=i("../utils"),r=i("./ConvertWorker"),s=i("./GenericWorker"),a=i("../base64"),o=i("../support"),c=i("../external"),l=null;if(o.nodestream)try{l=i("../nodejs/NodejsStreamOutputAdapter")}catch{}function u(f,d){return new c.Promise(function(_,g){var m=[],p=f._internalType,w=f._outputType,b=f._mimeType;f.on("data",function(M,D){m.push(M),d&&d(D)}).on("error",function(M){m=[],g(M)}).on("end",function(){try{var M=function(D,P,E){switch(D){case"blob":return n.newBlob(n.transformTo("arraybuffer",P),E);case"base64":return a.encode(P);default:return n.transformTo(D,P)}}(w,function(D,P){var E,O=0,T=null,x=0;for(E=0;E<P.length;E++)x+=P[E].length;switch(D){case"string":return P.join("");case"array":return Array.prototype.concat.apply([],P);case"uint8array":for(T=new Uint8Array(x),E=0;E<P.length;E++)T.set(P[E],O),O+=P[E].length;return T;case"nodebuffer":return Buffer.concat(P);default:throw new Error("concat : unsupported type '"+D+"'")}}(p,m),b);_(M)}catch(D){g(D)}m=[]}).resume()})}function h(f,d,_){var g=d;switch(d){case"blob":case"arraybuffer":g="uint8array";break;case"base64":g="string"}try{this._internalType=g,this._outputType=d,this._mimeType=_,n.checkSupport(g),this._worker=f.pipe(new r(g)),f.lock()}catch(m){this._worker=new s("error"),this._worker.error(m)}}h.prototype={accumulate:function(f){return u(this,f)},on:function(f,d){var _=this;return f==="data"?this._worker.on(f,function(g){d.call(_,g.data,g.meta)}):this._worker.on(f,function(){n.delay(d,arguments,_)}),this},resume:function(){return n.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(f){if(n.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new l(this,{objectMode:this._outputType!=="nodebuffer"},f)}},t.exports=h},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(i,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var n=new ArrayBuffer(0);try{e.blob=new Blob([n],{type:"application/zip"}).size===0}catch{try{var r=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);r.append(n),e.blob=r.getBlob("application/zip").size===0}catch{e.blob=!1}}}try{e.nodestream=!!i("readable-stream").Readable}catch{e.nodestream=!1}},{"readable-stream":16}],31:[function(i,t,e){"use strict";for(var n=i("./utils"),r=i("./support"),s=i("./nodejsUtils"),a=i("./stream/GenericWorker"),o=new Array(256),c=0;c<256;c++)o[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;o[254]=o[254]=1;function l(){a.call(this,"utf-8 decode"),this.leftOver=null}function u(){a.call(this,"utf-8 encode")}e.utf8encode=function(h){return r.nodebuffer?s.newBufferFrom(h,"utf-8"):function(f){var d,_,g,m,p,w=f.length,b=0;for(m=0;m<w;m++)(64512&(_=f.charCodeAt(m)))==55296&&m+1<w&&(64512&(g=f.charCodeAt(m+1)))==56320&&(_=65536+(_-55296<<10)+(g-56320),m++),b+=_<128?1:_<2048?2:_<65536?3:4;for(d=r.uint8array?new Uint8Array(b):new Array(b),m=p=0;p<b;m++)(64512&(_=f.charCodeAt(m)))==55296&&m+1<w&&(64512&(g=f.charCodeAt(m+1)))==56320&&(_=65536+(_-55296<<10)+(g-56320),m++),_<128?d[p++]=_:(_<2048?d[p++]=192|_>>>6:(_<65536?d[p++]=224|_>>>12:(d[p++]=240|_>>>18,d[p++]=128|_>>>12&63),d[p++]=128|_>>>6&63),d[p++]=128|63&_);return d}(h)},e.utf8decode=function(h){return r.nodebuffer?n.transformTo("nodebuffer",h).toString("utf-8"):function(f){var d,_,g,m,p=f.length,w=new Array(2*p);for(d=_=0;d<p;)if((g=f[d++])<128)w[_++]=g;else if(4<(m=o[g]))w[_++]=65533,d+=m-1;else{for(g&=m===2?31:m===3?15:7;1<m&&d<p;)g=g<<6|63&f[d++],m--;1<m?w[_++]=65533:g<65536?w[_++]=g:(g-=65536,w[_++]=55296|g>>10&1023,w[_++]=56320|1023&g)}return w.length!==_&&(w.subarray?w=w.subarray(0,_):w.length=_),n.applyFromCharCode(w)}(h=n.transformTo(r.uint8array?"uint8array":"array",h))},n.inherits(l,a),l.prototype.processChunk=function(h){var f=n.transformTo(r.uint8array?"uint8array":"array",h.data);if(this.leftOver&&this.leftOver.length){if(r.uint8array){var d=f;(f=new Uint8Array(d.length+this.leftOver.length)).set(this.leftOver,0),f.set(d,this.leftOver.length)}else f=this.leftOver.concat(f);this.leftOver=null}var _=function(m,p){var w;for((p=p||m.length)>m.length&&(p=m.length),w=p-1;0<=w&&(192&m[w])==128;)w--;return w<0||w===0?p:w+o[m[w]]>p?w:p}(f),g=f;_!==f.length&&(r.uint8array?(g=f.subarray(0,_),this.leftOver=f.subarray(_,f.length)):(g=f.slice(0,_),this.leftOver=f.slice(_,f.length))),this.push({data:e.utf8decode(g),meta:h.meta})},l.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=l,n.inherits(u,a),u.prototype.processChunk=function(h){this.push({data:e.utf8encode(h.data),meta:h.meta})},e.Utf8EncodeWorker=u},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(i,t,e){"use strict";var n=i("./support"),r=i("./base64"),s=i("./nodejsUtils"),a=i("./external");function o(d){return d}function c(d,_){for(var g=0;g<d.length;++g)_[g]=255&d.charCodeAt(g);return _}i("setimmediate"),e.newBlob=function(d,_){e.checkSupport("blob");try{return new Blob([d],{type:_})}catch{try{var g=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return g.append(d),g.getBlob(_)}catch{throw new Error("Bug : can't construct the Blob.")}}};var l={stringifyByChunk:function(d,_,g){var m=[],p=0,w=d.length;if(w<=g)return String.fromCharCode.apply(null,d);for(;p<w;)_==="array"||_==="nodebuffer"?m.push(String.fromCharCode.apply(null,d.slice(p,Math.min(p+g,w)))):m.push(String.fromCharCode.apply(null,d.subarray(p,Math.min(p+g,w)))),p+=g;return m.join("")},stringifyByChar:function(d){for(var _="",g=0;g<d.length;g++)_+=String.fromCharCode(d[g]);return _},applyCanBeUsed:{uint8array:function(){try{return n.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return n.nodebuffer&&String.fromCharCode.apply(null,s.allocBuffer(1)).length===1}catch{return!1}}()}};function u(d){var _=65536,g=e.getTypeOf(d),m=!0;if(g==="uint8array"?m=l.applyCanBeUsed.uint8array:g==="nodebuffer"&&(m=l.applyCanBeUsed.nodebuffer),m)for(;1<_;)try{return l.stringifyByChunk(d,g,_)}catch{_=Math.floor(_/2)}return l.stringifyByChar(d)}function h(d,_){for(var g=0;g<d.length;g++)_[g]=d[g];return _}e.applyFromCharCode=u;var f={};f.string={string:o,array:function(d){return c(d,new Array(d.length))},arraybuffer:function(d){return f.string.uint8array(d).buffer},uint8array:function(d){return c(d,new Uint8Array(d.length))},nodebuffer:function(d){return c(d,s.allocBuffer(d.length))}},f.array={string:u,array:o,arraybuffer:function(d){return new Uint8Array(d).buffer},uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return s.newBufferFrom(d)}},f.arraybuffer={string:function(d){return u(new Uint8Array(d))},array:function(d){return h(new Uint8Array(d),new Array(d.byteLength))},arraybuffer:o,uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return s.newBufferFrom(new Uint8Array(d))}},f.uint8array={string:u,array:function(d){return h(d,new Array(d.length))},arraybuffer:function(d){return d.buffer},uint8array:o,nodebuffer:function(d){return s.newBufferFrom(d)}},f.nodebuffer={string:u,array:function(d){return h(d,new Array(d.length))},arraybuffer:function(d){return f.nodebuffer.uint8array(d).buffer},uint8array:function(d){return h(d,new Uint8Array(d.length))},nodebuffer:o},e.transformTo=function(d,_){if(_=_||"",!d)return _;e.checkSupport(d);var g=e.getTypeOf(_);return f[g][d](_)},e.resolve=function(d){for(var _=d.split("/"),g=[],m=0;m<_.length;m++){var p=_[m];p==="."||p===""&&m!==0&&m!==_.length-1||(p===".."?g.pop():g.push(p))}return g.join("/")},e.getTypeOf=function(d){return typeof d=="string"?"string":Object.prototype.toString.call(d)==="[object Array]"?"array":n.nodebuffer&&s.isBuffer(d)?"nodebuffer":n.uint8array&&d instanceof Uint8Array?"uint8array":n.arraybuffer&&d instanceof ArrayBuffer?"arraybuffer":void 0},e.checkSupport=function(d){if(!n[d.toLowerCase()])throw new Error(d+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(d){var _,g,m="";for(g=0;g<(d||"").length;g++)m+="\\x"+((_=d.charCodeAt(g))<16?"0":"")+_.toString(16).toUpperCase();return m},e.delay=function(d,_,g){setImmediate(function(){d.apply(g||null,_||[])})},e.inherits=function(d,_){function g(){}g.prototype=_.prototype,d.prototype=new g},e.extend=function(){var d,_,g={};for(d=0;d<arguments.length;d++)for(_ in arguments[d])Object.prototype.hasOwnProperty.call(arguments[d],_)&&g[_]===void 0&&(g[_]=arguments[d][_]);return g},e.prepareContent=function(d,_,g,m,p){return a.Promise.resolve(_).then(function(w){return n.blob&&(w instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(w))!==-1)&&typeof FileReader<"u"?new a.Promise(function(b,M){var D=new FileReader;D.onload=function(P){b(P.target.result)},D.onerror=function(P){M(P.target.error)},D.readAsArrayBuffer(w)}):w}).then(function(w){var b=e.getTypeOf(w);return b?(b==="arraybuffer"?w=e.transformTo("uint8array",w):b==="string"&&(p?w=r.decode(w):g&&m!==!0&&(w=function(M){return c(M,n.uint8array?new Uint8Array(M.length):new Array(M.length))}(w))),w):a.Promise.reject(new Error("Can't read the data of '"+d+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(i,t,e){"use strict";var n=i("./reader/readerFor"),r=i("./utils"),s=i("./signature"),a=i("./zipEntry"),o=i("./support");function c(l){this.files=[],this.loadOptions=l}c.prototype={checkSignature:function(l){if(!this.reader.readAndCheckSignature(l)){this.reader.index-=4;var u=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+r.pretty(u)+", expected "+r.pretty(l)+")")}},isSignature:function(l,u){var h=this.reader.index;this.reader.setIndex(l);var f=this.reader.readString(4)===u;return this.reader.setIndex(h),f},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var l=this.reader.readData(this.zipCommentLength),u=o.uint8array?"uint8array":"array",h=r.transformTo(u,l);this.zipComment=this.loadOptions.decodeFileName(h)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var l,u,h,f=this.zip64EndOfCentralSize-44;0<f;)l=this.reader.readInt(2),u=this.reader.readInt(4),h=this.reader.readData(u),this.zip64ExtensibleData[l]={id:l,length:u,value:h}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var l,u;for(l=0;l<this.files.length;l++)u=this.files[l],this.reader.setIndex(u.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),u.readLocalPart(this.reader),u.handleUTF8(),u.processAttributes()},readCentralDir:function(){var l;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(l=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(l);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var l=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(l<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(l);var u=l;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===r.MAX_VALUE_16BITS||this.diskWithCentralDirStart===r.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===r.MAX_VALUE_16BITS||this.centralDirRecords===r.MAX_VALUE_16BITS||this.centralDirSize===r.MAX_VALUE_32BITS||this.centralDirOffset===r.MAX_VALUE_32BITS){if(this.zip64=!0,(l=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(l),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var h=this.centralDirOffset+this.centralDirSize;this.zip64&&(h+=20,h+=12+this.zip64EndOfCentralSize);var f=u-h;if(0<f)this.isSignature(u,s.CENTRAL_FILE_HEADER)||(this.reader.zero=f);else if(f<0)throw new Error("Corrupted zip: missing "+Math.abs(f)+" bytes.")},prepareReader:function(l){this.reader=n(l)},load:function(l){this.prepareReader(l),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=c},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(i,t,e){"use strict";var n=i("./reader/readerFor"),r=i("./utils"),s=i("./compressedObject"),a=i("./crc32"),o=i("./utf8"),c=i("./compressions"),l=i("./support");function u(h,f){this.options=h,this.loadOptions=f}u.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(h){var f,d;if(h.skip(22),this.fileNameLength=h.readInt(2),d=h.readInt(2),this.fileName=h.readData(this.fileNameLength),h.skip(d),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((f=function(_){for(var g in c)if(Object.prototype.hasOwnProperty.call(c,g)&&c[g].magic===_)return c[g];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+r.pretty(this.compressionMethod)+" unknown (inner file : "+r.transformTo("string",this.fileName)+")");this.decompressed=new s(this.compressedSize,this.uncompressedSize,this.crc32,f,h.readData(this.compressedSize))},readCentralPart:function(h){this.versionMadeBy=h.readInt(2),h.skip(2),this.bitFlag=h.readInt(2),this.compressionMethod=h.readString(2),this.date=h.readDate(),this.crc32=h.readInt(4),this.compressedSize=h.readInt(4),this.uncompressedSize=h.readInt(4);var f=h.readInt(2);if(this.extraFieldsLength=h.readInt(2),this.fileCommentLength=h.readInt(2),this.diskNumberStart=h.readInt(2),this.internalFileAttributes=h.readInt(2),this.externalFileAttributes=h.readInt(4),this.localHeaderOffset=h.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");h.skip(f),this.readExtraFields(h),this.parseZIP64ExtraField(h),this.fileComment=h.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var h=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),h==0&&(this.dosPermissions=63&this.externalFileAttributes),h==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var h=n(this.extraFields[1].value);this.uncompressedSize===r.MAX_VALUE_32BITS&&(this.uncompressedSize=h.readInt(8)),this.compressedSize===r.MAX_VALUE_32BITS&&(this.compressedSize=h.readInt(8)),this.localHeaderOffset===r.MAX_VALUE_32BITS&&(this.localHeaderOffset=h.readInt(8)),this.diskNumberStart===r.MAX_VALUE_32BITS&&(this.diskNumberStart=h.readInt(4))}},readExtraFields:function(h){var f,d,_,g=h.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});h.index+4<g;)f=h.readInt(2),d=h.readInt(2),_=h.readData(d),this.extraFields[f]={id:f,length:d,value:_};h.setIndex(g)},handleUTF8:function(){var h=l.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var f=this.findExtraFieldUnicodePath();if(f!==null)this.fileNameStr=f;else{var d=r.transformTo(h,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(d)}var _=this.findExtraFieldUnicodeComment();if(_!==null)this.fileCommentStr=_;else{var g=r.transformTo(h,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(g)}}},findExtraFieldUnicodePath:function(){var h=this.extraFields[28789];if(h){var f=n(h.value);return f.readInt(1)!==1||a(this.fileName)!==f.readInt(4)?null:o.utf8decode(f.readData(h.length-5))}return null},findExtraFieldUnicodeComment:function(){var h=this.extraFields[25461];if(h){var f=n(h.value);return f.readInt(1)!==1||a(this.fileComment)!==f.readInt(4)?null:o.utf8decode(f.readData(h.length-5))}return null}},t.exports=u},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(i,t,e){"use strict";function n(f,d,_){this.name=f,this.dir=_.dir,this.date=_.date,this.comment=_.comment,this.unixPermissions=_.unixPermissions,this.dosPermissions=_.dosPermissions,this._data=d,this._dataBinary=_.binary,this.options={compression:_.compression,compressionOptions:_.compressionOptions}}var r=i("./stream/StreamHelper"),s=i("./stream/DataWorker"),a=i("./utf8"),o=i("./compressedObject"),c=i("./stream/GenericWorker");n.prototype={internalStream:function(f){var d=null,_="string";try{if(!f)throw new Error("No output type specified.");var g=(_=f.toLowerCase())==="string"||_==="text";_!=="binarystring"&&_!=="text"||(_="string"),d=this._decompressWorker();var m=!this._dataBinary;m&&!g&&(d=d.pipe(new a.Utf8EncodeWorker)),!m&&g&&(d=d.pipe(new a.Utf8DecodeWorker))}catch(p){(d=new c("error")).error(p)}return new r(d,_,"")},async:function(f,d){return this.internalStream(f).accumulate(d)},nodeStream:function(f,d){return this.internalStream(f||"nodebuffer").toNodejsStream(d)},_compressWorker:function(f,d){if(this._data instanceof o&&this._data.compression.magic===f.magic)return this._data.getCompressedWorker();var _=this._decompressWorker();return this._dataBinary||(_=_.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(_,f,d)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof c?this._data:new s(this._data)}};for(var l=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],u=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},h=0;h<l.length;h++)n.prototype[l[h]]=u;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(i,t,e){(function(n){"use strict";var r,s,a=n.MutationObserver||n.WebKitMutationObserver;if(a){var o=0,c=new a(f),l=n.document.createTextNode("");c.observe(l,{characterData:!0}),r=function(){l.data=o=++o%2}}else if(n.setImmediate||n.MessageChannel===void 0)r="document"in n&&"onreadystatechange"in n.document.createElement("script")?function(){var d=n.document.createElement("script");d.onreadystatechange=function(){f(),d.onreadystatechange=null,d.parentNode.removeChild(d),d=null},n.document.documentElement.appendChild(d)}:function(){setTimeout(f,0)};else{var u=new n.MessageChannel;u.port1.onmessage=f,r=function(){u.port2.postMessage(0)}}var h=[];function f(){var d,_;s=!0;for(var g=h.length;g;){for(_=h,h=[],d=-1;++d<g;)_[d]();g=h.length}s=!1}t.exports=function(d){h.push(d)!==1||s||r()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(i,t,e){"use strict";var n=i("immediate");function r(){}var s={},a=["REJECTED"],o=["FULFILLED"],c=["PENDING"];function l(g){if(typeof g!="function")throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,g!==r&&d(this,g)}function u(g,m,p){this.promise=g,typeof m=="function"&&(this.onFulfilled=m,this.callFulfilled=this.otherCallFulfilled),typeof p=="function"&&(this.onRejected=p,this.callRejected=this.otherCallRejected)}function h(g,m,p){n(function(){var w;try{w=m(p)}catch(b){return s.reject(g,b)}w===g?s.reject(g,new TypeError("Cannot resolve promise with itself")):s.resolve(g,w)})}function f(g){var m=g&&g.then;if(g&&(typeof g=="object"||typeof g=="function")&&typeof m=="function")return function(){m.apply(g,arguments)}}function d(g,m){var p=!1;function w(D){p||(p=!0,s.reject(g,D))}function b(D){p||(p=!0,s.resolve(g,D))}var M=_(function(){m(b,w)});M.status==="error"&&w(M.value)}function _(g,m){var p={};try{p.value=g(m),p.status="success"}catch(w){p.status="error",p.value=w}return p}(t.exports=l).prototype.finally=function(g){if(typeof g!="function")return this;var m=this.constructor;return this.then(function(p){return m.resolve(g()).then(function(){return p})},function(p){return m.resolve(g()).then(function(){throw p})})},l.prototype.catch=function(g){return this.then(null,g)},l.prototype.then=function(g,m){if(typeof g!="function"&&this.state===o||typeof m!="function"&&this.state===a)return this;var p=new this.constructor(r);return this.state!==c?h(p,this.state===o?g:m,this.outcome):this.queue.push(new u(p,g,m)),p},u.prototype.callFulfilled=function(g){s.resolve(this.promise,g)},u.prototype.otherCallFulfilled=function(g){h(this.promise,this.onFulfilled,g)},u.prototype.callRejected=function(g){s.reject(this.promise,g)},u.prototype.otherCallRejected=function(g){h(this.promise,this.onRejected,g)},s.resolve=function(g,m){var p=_(f,m);if(p.status==="error")return s.reject(g,p.value);var w=p.value;if(w)d(g,w);else{g.state=o,g.outcome=m;for(var b=-1,M=g.queue.length;++b<M;)g.queue[b].callFulfilled(m)}return g},s.reject=function(g,m){g.state=a,g.outcome=m;for(var p=-1,w=g.queue.length;++p<w;)g.queue[p].callRejected(m);return g},l.resolve=function(g){return g instanceof this?g:s.resolve(new this(r),g)},l.reject=function(g){var m=new this(r);return s.reject(m,g)},l.all=function(g){var m=this;if(Object.prototype.toString.call(g)!=="[object Array]")return this.reject(new TypeError("must be an array"));var p=g.length,w=!1;if(!p)return this.resolve([]);for(var b=new Array(p),M=0,D=-1,P=new this(r);++D<p;)E(g[D],D);return P;function E(O,T){m.resolve(O).then(function(x){b[T]=x,++M!==p||w||(w=!0,s.resolve(P,b))},function(x){w||(w=!0,s.reject(P,x))})}},l.race=function(g){var m=this;if(Object.prototype.toString.call(g)!=="[object Array]")return this.reject(new TypeError("must be an array"));var p=g.length,w=!1;if(!p)return this.resolve([]);for(var b=-1,M=new this(r);++b<p;)D=g[b],m.resolve(D).then(function(P){w||(w=!0,s.resolve(M,P))},function(P){w||(w=!0,s.reject(M,P))});var D;return M}},{immediate:36}],38:[function(i,t,e){"use strict";var n={};(0,i("./lib/utils/common").assign)(n,i("./lib/deflate"),i("./lib/inflate"),i("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(i,t,e){"use strict";var n=i("./zlib/deflate"),r=i("./utils/common"),s=i("./utils/strings"),a=i("./zlib/messages"),o=i("./zlib/zstream"),c=Object.prototype.toString,l=0,u=-1,h=0,f=8;function d(g){if(!(this instanceof d))return new d(g);this.options=r.assign({level:u,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:h,to:""},g||{});var m=this.options;m.raw&&0<m.windowBits?m.windowBits=-m.windowBits:m.gzip&&0<m.windowBits&&m.windowBits<16&&(m.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new o,this.strm.avail_out=0;var p=n.deflateInit2(this.strm,m.level,m.method,m.windowBits,m.memLevel,m.strategy);if(p!==l)throw new Error(a[p]);if(m.header&&n.deflateSetHeader(this.strm,m.header),m.dictionary){var w;if(w=typeof m.dictionary=="string"?s.string2buf(m.dictionary):c.call(m.dictionary)==="[object ArrayBuffer]"?new Uint8Array(m.dictionary):m.dictionary,(p=n.deflateSetDictionary(this.strm,w))!==l)throw new Error(a[p]);this._dict_set=!0}}function _(g,m){var p=new d(m);if(p.push(g,!0),p.err)throw p.msg||a[p.err];return p.result}d.prototype.push=function(g,m){var p,w,b=this.strm,M=this.options.chunkSize;if(this.ended)return!1;w=m===~~m?m:m===!0?4:0,typeof g=="string"?b.input=s.string2buf(g):c.call(g)==="[object ArrayBuffer]"?b.input=new Uint8Array(g):b.input=g,b.next_in=0,b.avail_in=b.input.length;do{if(b.avail_out===0&&(b.output=new r.Buf8(M),b.next_out=0,b.avail_out=M),(p=n.deflate(b,w))!==1&&p!==l)return this.onEnd(p),!(this.ended=!0);b.avail_out!==0&&(b.avail_in!==0||w!==4&&w!==2)||(this.options.to==="string"?this.onData(s.buf2binstring(r.shrinkBuf(b.output,b.next_out))):this.onData(r.shrinkBuf(b.output,b.next_out)))}while((0<b.avail_in||b.avail_out===0)&&p!==1);return w===4?(p=n.deflateEnd(this.strm),this.onEnd(p),this.ended=!0,p===l):w!==2||(this.onEnd(l),!(b.avail_out=0))},d.prototype.onData=function(g){this.chunks.push(g)},d.prototype.onEnd=function(g){g===l&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=r.flattenChunks(this.chunks)),this.chunks=[],this.err=g,this.msg=this.strm.msg},e.Deflate=d,e.deflate=_,e.deflateRaw=function(g,m){return(m=m||{}).raw=!0,_(g,m)},e.gzip=function(g,m){return(m=m||{}).gzip=!0,_(g,m)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(i,t,e){"use strict";var n=i("./zlib/inflate"),r=i("./utils/common"),s=i("./utils/strings"),a=i("./zlib/constants"),o=i("./zlib/messages"),c=i("./zlib/zstream"),l=i("./zlib/gzheader"),u=Object.prototype.toString;function h(d){if(!(this instanceof h))return new h(d);this.options=r.assign({chunkSize:16384,windowBits:0,to:""},d||{});var _=this.options;_.raw&&0<=_.windowBits&&_.windowBits<16&&(_.windowBits=-_.windowBits,_.windowBits===0&&(_.windowBits=-15)),!(0<=_.windowBits&&_.windowBits<16)||d&&d.windowBits||(_.windowBits+=32),15<_.windowBits&&_.windowBits<48&&!(15&_.windowBits)&&(_.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var g=n.inflateInit2(this.strm,_.windowBits);if(g!==a.Z_OK)throw new Error(o[g]);this.header=new l,n.inflateGetHeader(this.strm,this.header)}function f(d,_){var g=new h(_);if(g.push(d,!0),g.err)throw g.msg||o[g.err];return g.result}h.prototype.push=function(d,_){var g,m,p,w,b,M,D=this.strm,P=this.options.chunkSize,E=this.options.dictionary,O=!1;if(this.ended)return!1;m=_===~~_?_:_===!0?a.Z_FINISH:a.Z_NO_FLUSH,typeof d=="string"?D.input=s.binstring2buf(d):u.call(d)==="[object ArrayBuffer]"?D.input=new Uint8Array(d):D.input=d,D.next_in=0,D.avail_in=D.input.length;do{if(D.avail_out===0&&(D.output=new r.Buf8(P),D.next_out=0,D.avail_out=P),(g=n.inflate(D,a.Z_NO_FLUSH))===a.Z_NEED_DICT&&E&&(M=typeof E=="string"?s.string2buf(E):u.call(E)==="[object ArrayBuffer]"?new Uint8Array(E):E,g=n.inflateSetDictionary(this.strm,M)),g===a.Z_BUF_ERROR&&O===!0&&(g=a.Z_OK,O=!1),g!==a.Z_STREAM_END&&g!==a.Z_OK)return this.onEnd(g),!(this.ended=!0);D.next_out&&(D.avail_out!==0&&g!==a.Z_STREAM_END&&(D.avail_in!==0||m!==a.Z_FINISH&&m!==a.Z_SYNC_FLUSH)||(this.options.to==="string"?(p=s.utf8border(D.output,D.next_out),w=D.next_out-p,b=s.buf2string(D.output,p),D.next_out=w,D.avail_out=P-w,w&&r.arraySet(D.output,D.output,p,w,0),this.onData(b)):this.onData(r.shrinkBuf(D.output,D.next_out)))),D.avail_in===0&&D.avail_out===0&&(O=!0)}while((0<D.avail_in||D.avail_out===0)&&g!==a.Z_STREAM_END);return g===a.Z_STREAM_END&&(m=a.Z_FINISH),m===a.Z_FINISH?(g=n.inflateEnd(this.strm),this.onEnd(g),this.ended=!0,g===a.Z_OK):m!==a.Z_SYNC_FLUSH||(this.onEnd(a.Z_OK),!(D.avail_out=0))},h.prototype.onData=function(d){this.chunks.push(d)},h.prototype.onEnd=function(d){d===a.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=r.flattenChunks(this.chunks)),this.chunks=[],this.err=d,this.msg=this.strm.msg},e.Inflate=h,e.inflate=f,e.inflateRaw=function(d,_){return(_=_||{}).raw=!0,f(d,_)},e.ungzip=f},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(i,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(a){for(var o=Array.prototype.slice.call(arguments,1);o.length;){var c=o.shift();if(c){if(typeof c!="object")throw new TypeError(c+"must be non-object");for(var l in c)c.hasOwnProperty(l)&&(a[l]=c[l])}}return a},e.shrinkBuf=function(a,o){return a.length===o?a:a.subarray?a.subarray(0,o):(a.length=o,a)};var r={arraySet:function(a,o,c,l,u){if(o.subarray&&a.subarray)a.set(o.subarray(c,c+l),u);else for(var h=0;h<l;h++)a[u+h]=o[c+h]},flattenChunks:function(a){var o,c,l,u,h,f;for(o=l=0,c=a.length;o<c;o++)l+=a[o].length;for(f=new Uint8Array(l),o=u=0,c=a.length;o<c;o++)h=a[o],f.set(h,u),u+=h.length;return f}},s={arraySet:function(a,o,c,l,u){for(var h=0;h<l;h++)a[u+h]=o[c+h]},flattenChunks:function(a){return[].concat.apply([],a)}};e.setTyped=function(a){a?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,r)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,s))},e.setTyped(n)},{}],42:[function(i,t,e){"use strict";var n=i("./common"),r=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch{r=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{s=!1}for(var a=new n.Buf8(256),o=0;o<256;o++)a[o]=252<=o?6:248<=o?5:240<=o?4:224<=o?3:192<=o?2:1;function c(l,u){if(u<65537&&(l.subarray&&s||!l.subarray&&r))return String.fromCharCode.apply(null,n.shrinkBuf(l,u));for(var h="",f=0;f<u;f++)h+=String.fromCharCode(l[f]);return h}a[254]=a[254]=1,e.string2buf=function(l){var u,h,f,d,_,g=l.length,m=0;for(d=0;d<g;d++)(64512&(h=l.charCodeAt(d)))==55296&&d+1<g&&(64512&(f=l.charCodeAt(d+1)))==56320&&(h=65536+(h-55296<<10)+(f-56320),d++),m+=h<128?1:h<2048?2:h<65536?3:4;for(u=new n.Buf8(m),d=_=0;_<m;d++)(64512&(h=l.charCodeAt(d)))==55296&&d+1<g&&(64512&(f=l.charCodeAt(d+1)))==56320&&(h=65536+(h-55296<<10)+(f-56320),d++),h<128?u[_++]=h:(h<2048?u[_++]=192|h>>>6:(h<65536?u[_++]=224|h>>>12:(u[_++]=240|h>>>18,u[_++]=128|h>>>12&63),u[_++]=128|h>>>6&63),u[_++]=128|63&h);return u},e.buf2binstring=function(l){return c(l,l.length)},e.binstring2buf=function(l){for(var u=new n.Buf8(l.length),h=0,f=u.length;h<f;h++)u[h]=l.charCodeAt(h);return u},e.buf2string=function(l,u){var h,f,d,_,g=u||l.length,m=new Array(2*g);for(h=f=0;h<g;)if((d=l[h++])<128)m[f++]=d;else if(4<(_=a[d]))m[f++]=65533,h+=_-1;else{for(d&=_===2?31:_===3?15:7;1<_&&h<g;)d=d<<6|63&l[h++],_--;1<_?m[f++]=65533:d<65536?m[f++]=d:(d-=65536,m[f++]=55296|d>>10&1023,m[f++]=56320|1023&d)}return c(m,f)},e.utf8border=function(l,u){var h;for((u=u||l.length)>l.length&&(u=l.length),h=u-1;0<=h&&(192&l[h])==128;)h--;return h<0||h===0?u:h+a[l[h]]>u?h:u}},{"./common":41}],43:[function(i,t,e){"use strict";t.exports=function(n,r,s,a){for(var o=65535&n|0,c=n>>>16&65535|0,l=0;s!==0;){for(s-=l=2e3<s?2e3:s;c=c+(o=o+r[a++]|0)|0,--l;);o%=65521,c%=65521}return o|c<<16|0}},{}],44:[function(i,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(i,t,e){"use strict";var n=function(){for(var r,s=[],a=0;a<256;a++){r=a;for(var o=0;o<8;o++)r=1&r?3988292384^r>>>1:r>>>1;s[a]=r}return s}();t.exports=function(r,s,a,o){var c=n,l=o+a;r^=-1;for(var u=o;u<l;u++)r=r>>>8^c[255&(r^s[u])];return-1^r}},{}],46:[function(i,t,e){"use strict";var n,r=i("../utils/common"),s=i("./trees"),a=i("./adler32"),o=i("./crc32"),c=i("./messages"),l=0,u=4,h=0,f=-2,d=-1,_=4,g=2,m=8,p=9,w=286,b=30,M=19,D=2*w+1,P=15,E=3,O=258,T=O+E+1,x=42,C=113,y=1,U=2,q=3,G=4;function J(v,it){return v.msg=c[it],it}function X(v){return(v<<1)-(4<v?9:0)}function Z(v){for(var it=v.length;0<=--it;)v[it]=0}function k(v){var it=v.state,I=it.pending;I>v.avail_out&&(I=v.avail_out),I!==0&&(r.arraySet(v.output,it.pending_buf,it.pending_out,I,v.next_out),v.next_out+=I,it.pending_out+=I,v.total_out+=I,v.avail_out-=I,it.pending-=I,it.pending===0&&(it.pending_out=0))}function N(v,it){s._tr_flush_block(v,0<=v.block_start?v.block_start:-1,v.strstart-v.block_start,it),v.block_start=v.strstart,k(v.strm)}function ut(v,it){v.pending_buf[v.pending++]=it}function ht(v,it){v.pending_buf[v.pending++]=it>>>8&255,v.pending_buf[v.pending++]=255&it}function ct(v,it){var I,F,L=v.max_chain_length,z=v.strstart,Q=v.prev_length,at=v.nice_match,H=v.strstart>v.w_size-T?v.strstart-(v.w_size-T):0,A=v.window,S=v.w_mask,B=v.prev,j=v.strstart+O,ot=A[z+Q-1],tt=A[z+Q];v.prev_length>=v.good_match&&(L>>=2),at>v.lookahead&&(at=v.lookahead);do if(A[(I=it)+Q]===tt&&A[I+Q-1]===ot&&A[I]===A[z]&&A[++I]===A[z+1]){z+=2,I++;do;while(A[++z]===A[++I]&&A[++z]===A[++I]&&A[++z]===A[++I]&&A[++z]===A[++I]&&A[++z]===A[++I]&&A[++z]===A[++I]&&A[++z]===A[++I]&&A[++z]===A[++I]&&z<j);if(F=O-(j-z),z=j-O,Q<F){if(v.match_start=it,at<=(Q=F))break;ot=A[z+Q-1],tt=A[z+Q]}}while((it=B[it&S])>H&&--L!=0);return Q<=v.lookahead?Q:v.lookahead}function rt(v){var it,I,F,L,z,Q,at,H,A,S,B=v.w_size;do{if(L=v.window_size-v.lookahead-v.strstart,v.strstart>=B+(B-T)){for(r.arraySet(v.window,v.window,B,B,0),v.match_start-=B,v.strstart-=B,v.block_start-=B,it=I=v.hash_size;F=v.head[--it],v.head[it]=B<=F?F-B:0,--I;);for(it=I=B;F=v.prev[--it],v.prev[it]=B<=F?F-B:0,--I;);L+=B}if(v.strm.avail_in===0)break;if(Q=v.strm,at=v.window,H=v.strstart+v.lookahead,A=L,S=void 0,S=Q.avail_in,A<S&&(S=A),I=S===0?0:(Q.avail_in-=S,r.arraySet(at,Q.input,Q.next_in,S,H),Q.state.wrap===1?Q.adler=a(Q.adler,at,S,H):Q.state.wrap===2&&(Q.adler=o(Q.adler,at,S,H)),Q.next_in+=S,Q.total_in+=S,S),v.lookahead+=I,v.lookahead+v.insert>=E)for(z=v.strstart-v.insert,v.ins_h=v.window[z],v.ins_h=(v.ins_h<<v.hash_shift^v.window[z+1])&v.hash_mask;v.insert&&(v.ins_h=(v.ins_h<<v.hash_shift^v.window[z+E-1])&v.hash_mask,v.prev[z&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=z,z++,v.insert--,!(v.lookahead+v.insert<E)););}while(v.lookahead<T&&v.strm.avail_in!==0)}function pt(v,it){for(var I,F;;){if(v.lookahead<T){if(rt(v),v.lookahead<T&&it===l)return y;if(v.lookahead===0)break}if(I=0,v.lookahead>=E&&(v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+E-1])&v.hash_mask,I=v.prev[v.strstart&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=v.strstart),I!==0&&v.strstart-I<=v.w_size-T&&(v.match_length=ct(v,I)),v.match_length>=E)if(F=s._tr_tally(v,v.strstart-v.match_start,v.match_length-E),v.lookahead-=v.match_length,v.match_length<=v.max_lazy_match&&v.lookahead>=E){for(v.match_length--;v.strstart++,v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+E-1])&v.hash_mask,I=v.prev[v.strstart&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=v.strstart,--v.match_length!=0;);v.strstart++}else v.strstart+=v.match_length,v.match_length=0,v.ins_h=v.window[v.strstart],v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+1])&v.hash_mask;else F=s._tr_tally(v,0,v.window[v.strstart]),v.lookahead--,v.strstart++;if(F&&(N(v,!1),v.strm.avail_out===0))return y}return v.insert=v.strstart<E-1?v.strstart:E-1,it===u?(N(v,!0),v.strm.avail_out===0?q:G):v.last_lit&&(N(v,!1),v.strm.avail_out===0)?y:U}function mt(v,it){for(var I,F,L;;){if(v.lookahead<T){if(rt(v),v.lookahead<T&&it===l)return y;if(v.lookahead===0)break}if(I=0,v.lookahead>=E&&(v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+E-1])&v.hash_mask,I=v.prev[v.strstart&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=v.strstart),v.prev_length=v.match_length,v.prev_match=v.match_start,v.match_length=E-1,I!==0&&v.prev_length<v.max_lazy_match&&v.strstart-I<=v.w_size-T&&(v.match_length=ct(v,I),v.match_length<=5&&(v.strategy===1||v.match_length===E&&4096<v.strstart-v.match_start)&&(v.match_length=E-1)),v.prev_length>=E&&v.match_length<=v.prev_length){for(L=v.strstart+v.lookahead-E,F=s._tr_tally(v,v.strstart-1-v.prev_match,v.prev_length-E),v.lookahead-=v.prev_length-1,v.prev_length-=2;++v.strstart<=L&&(v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+E-1])&v.hash_mask,I=v.prev[v.strstart&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=v.strstart),--v.prev_length!=0;);if(v.match_available=0,v.match_length=E-1,v.strstart++,F&&(N(v,!1),v.strm.avail_out===0))return y}else if(v.match_available){if((F=s._tr_tally(v,0,v.window[v.strstart-1]))&&N(v,!1),v.strstart++,v.lookahead--,v.strm.avail_out===0)return y}else v.match_available=1,v.strstart++,v.lookahead--}return v.match_available&&(F=s._tr_tally(v,0,v.window[v.strstart-1]),v.match_available=0),v.insert=v.strstart<E-1?v.strstart:E-1,it===u?(N(v,!0),v.strm.avail_out===0?q:G):v.last_lit&&(N(v,!1),v.strm.avail_out===0)?y:U}function ft(v,it,I,F,L){this.good_length=v,this.max_lazy=it,this.nice_length=I,this.max_chain=F,this.func=L}function At(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=m,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new r.Buf16(2*D),this.dyn_dtree=new r.Buf16(2*(2*b+1)),this.bl_tree=new r.Buf16(2*(2*M+1)),Z(this.dyn_ltree),Z(this.dyn_dtree),Z(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new r.Buf16(P+1),this.heap=new r.Buf16(2*w+1),Z(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new r.Buf16(2*w+1),Z(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function It(v){var it;return v&&v.state?(v.total_in=v.total_out=0,v.data_type=g,(it=v.state).pending=0,it.pending_out=0,it.wrap<0&&(it.wrap=-it.wrap),it.status=it.wrap?x:C,v.adler=it.wrap===2?0:1,it.last_flush=l,s._tr_init(it),h):J(v,f)}function Ft(v){var it=It(v);return it===h&&function(I){I.window_size=2*I.w_size,Z(I.head),I.max_lazy_match=n[I.level].max_lazy,I.good_match=n[I.level].good_length,I.nice_match=n[I.level].nice_length,I.max_chain_length=n[I.level].max_chain,I.strstart=0,I.block_start=0,I.lookahead=0,I.insert=0,I.match_length=I.prev_length=E-1,I.match_available=0,I.ins_h=0}(v.state),it}function Yt(v,it,I,F,L,z){if(!v)return f;var Q=1;if(it===d&&(it=6),F<0?(Q=0,F=-F):15<F&&(Q=2,F-=16),L<1||p<L||I!==m||F<8||15<F||it<0||9<it||z<0||_<z)return J(v,f);F===8&&(F=9);var at=new At;return(v.state=at).strm=v,at.wrap=Q,at.gzhead=null,at.w_bits=F,at.w_size=1<<at.w_bits,at.w_mask=at.w_size-1,at.hash_bits=L+7,at.hash_size=1<<at.hash_bits,at.hash_mask=at.hash_size-1,at.hash_shift=~~((at.hash_bits+E-1)/E),at.window=new r.Buf8(2*at.w_size),at.head=new r.Buf16(at.hash_size),at.prev=new r.Buf16(at.w_size),at.lit_bufsize=1<<L+6,at.pending_buf_size=4*at.lit_bufsize,at.pending_buf=new r.Buf8(at.pending_buf_size),at.d_buf=1*at.lit_bufsize,at.l_buf=3*at.lit_bufsize,at.level=it,at.strategy=z,at.method=I,Ft(v)}n=[new ft(0,0,0,0,function(v,it){var I=65535;for(I>v.pending_buf_size-5&&(I=v.pending_buf_size-5);;){if(v.lookahead<=1){if(rt(v),v.lookahead===0&&it===l)return y;if(v.lookahead===0)break}v.strstart+=v.lookahead,v.lookahead=0;var F=v.block_start+I;if((v.strstart===0||v.strstart>=F)&&(v.lookahead=v.strstart-F,v.strstart=F,N(v,!1),v.strm.avail_out===0)||v.strstart-v.block_start>=v.w_size-T&&(N(v,!1),v.strm.avail_out===0))return y}return v.insert=0,it===u?(N(v,!0),v.strm.avail_out===0?q:G):(v.strstart>v.block_start&&(N(v,!1),v.strm.avail_out),y)}),new ft(4,4,8,4,pt),new ft(4,5,16,8,pt),new ft(4,6,32,32,pt),new ft(4,4,16,16,mt),new ft(8,16,32,32,mt),new ft(8,16,128,128,mt),new ft(8,32,128,256,mt),new ft(32,128,258,1024,mt),new ft(32,258,258,4096,mt)],e.deflateInit=function(v,it){return Yt(v,it,m,15,8,0)},e.deflateInit2=Yt,e.deflateReset=Ft,e.deflateResetKeep=It,e.deflateSetHeader=function(v,it){return v&&v.state?v.state.wrap!==2?f:(v.state.gzhead=it,h):f},e.deflate=function(v,it){var I,F,L,z;if(!v||!v.state||5<it||it<0)return v?J(v,f):f;if(F=v.state,!v.output||!v.input&&v.avail_in!==0||F.status===666&&it!==u)return J(v,v.avail_out===0?-5:f);if(F.strm=v,I=F.last_flush,F.last_flush=it,F.status===x)if(F.wrap===2)v.adler=0,ut(F,31),ut(F,139),ut(F,8),F.gzhead?(ut(F,(F.gzhead.text?1:0)+(F.gzhead.hcrc?2:0)+(F.gzhead.extra?4:0)+(F.gzhead.name?8:0)+(F.gzhead.comment?16:0)),ut(F,255&F.gzhead.time),ut(F,F.gzhead.time>>8&255),ut(F,F.gzhead.time>>16&255),ut(F,F.gzhead.time>>24&255),ut(F,F.level===9?2:2<=F.strategy||F.level<2?4:0),ut(F,255&F.gzhead.os),F.gzhead.extra&&F.gzhead.extra.length&&(ut(F,255&F.gzhead.extra.length),ut(F,F.gzhead.extra.length>>8&255)),F.gzhead.hcrc&&(v.adler=o(v.adler,F.pending_buf,F.pending,0)),F.gzindex=0,F.status=69):(ut(F,0),ut(F,0),ut(F,0),ut(F,0),ut(F,0),ut(F,F.level===9?2:2<=F.strategy||F.level<2?4:0),ut(F,3),F.status=C);else{var Q=m+(F.w_bits-8<<4)<<8;Q|=(2<=F.strategy||F.level<2?0:F.level<6?1:F.level===6?2:3)<<6,F.strstart!==0&&(Q|=32),Q+=31-Q%31,F.status=C,ht(F,Q),F.strstart!==0&&(ht(F,v.adler>>>16),ht(F,65535&v.adler)),v.adler=1}if(F.status===69)if(F.gzhead.extra){for(L=F.pending;F.gzindex<(65535&F.gzhead.extra.length)&&(F.pending!==F.pending_buf_size||(F.gzhead.hcrc&&F.pending>L&&(v.adler=o(v.adler,F.pending_buf,F.pending-L,L)),k(v),L=F.pending,F.pending!==F.pending_buf_size));)ut(F,255&F.gzhead.extra[F.gzindex]),F.gzindex++;F.gzhead.hcrc&&F.pending>L&&(v.adler=o(v.adler,F.pending_buf,F.pending-L,L)),F.gzindex===F.gzhead.extra.length&&(F.gzindex=0,F.status=73)}else F.status=73;if(F.status===73)if(F.gzhead.name){L=F.pending;do{if(F.pending===F.pending_buf_size&&(F.gzhead.hcrc&&F.pending>L&&(v.adler=o(v.adler,F.pending_buf,F.pending-L,L)),k(v),L=F.pending,F.pending===F.pending_buf_size)){z=1;break}z=F.gzindex<F.gzhead.name.length?255&F.gzhead.name.charCodeAt(F.gzindex++):0,ut(F,z)}while(z!==0);F.gzhead.hcrc&&F.pending>L&&(v.adler=o(v.adler,F.pending_buf,F.pending-L,L)),z===0&&(F.gzindex=0,F.status=91)}else F.status=91;if(F.status===91)if(F.gzhead.comment){L=F.pending;do{if(F.pending===F.pending_buf_size&&(F.gzhead.hcrc&&F.pending>L&&(v.adler=o(v.adler,F.pending_buf,F.pending-L,L)),k(v),L=F.pending,F.pending===F.pending_buf_size)){z=1;break}z=F.gzindex<F.gzhead.comment.length?255&F.gzhead.comment.charCodeAt(F.gzindex++):0,ut(F,z)}while(z!==0);F.gzhead.hcrc&&F.pending>L&&(v.adler=o(v.adler,F.pending_buf,F.pending-L,L)),z===0&&(F.status=103)}else F.status=103;if(F.status===103&&(F.gzhead.hcrc?(F.pending+2>F.pending_buf_size&&k(v),F.pending+2<=F.pending_buf_size&&(ut(F,255&v.adler),ut(F,v.adler>>8&255),v.adler=0,F.status=C)):F.status=C),F.pending!==0){if(k(v),v.avail_out===0)return F.last_flush=-1,h}else if(v.avail_in===0&&X(it)<=X(I)&&it!==u)return J(v,-5);if(F.status===666&&v.avail_in!==0)return J(v,-5);if(v.avail_in!==0||F.lookahead!==0||it!==l&&F.status!==666){var at=F.strategy===2?function(H,A){for(var S;;){if(H.lookahead===0&&(rt(H),H.lookahead===0)){if(A===l)return y;break}if(H.match_length=0,S=s._tr_tally(H,0,H.window[H.strstart]),H.lookahead--,H.strstart++,S&&(N(H,!1),H.strm.avail_out===0))return y}return H.insert=0,A===u?(N(H,!0),H.strm.avail_out===0?q:G):H.last_lit&&(N(H,!1),H.strm.avail_out===0)?y:U}(F,it):F.strategy===3?function(H,A){for(var S,B,j,ot,tt=H.window;;){if(H.lookahead<=O){if(rt(H),H.lookahead<=O&&A===l)return y;if(H.lookahead===0)break}if(H.match_length=0,H.lookahead>=E&&0<H.strstart&&(B=tt[j=H.strstart-1])===tt[++j]&&B===tt[++j]&&B===tt[++j]){ot=H.strstart+O;do;while(B===tt[++j]&&B===tt[++j]&&B===tt[++j]&&B===tt[++j]&&B===tt[++j]&&B===tt[++j]&&B===tt[++j]&&B===tt[++j]&&j<ot);H.match_length=O-(ot-j),H.match_length>H.lookahead&&(H.match_length=H.lookahead)}if(H.match_length>=E?(S=s._tr_tally(H,1,H.match_length-E),H.lookahead-=H.match_length,H.strstart+=H.match_length,H.match_length=0):(S=s._tr_tally(H,0,H.window[H.strstart]),H.lookahead--,H.strstart++),S&&(N(H,!1),H.strm.avail_out===0))return y}return H.insert=0,A===u?(N(H,!0),H.strm.avail_out===0?q:G):H.last_lit&&(N(H,!1),H.strm.avail_out===0)?y:U}(F,it):n[F.level].func(F,it);if(at!==q&&at!==G||(F.status=666),at===y||at===q)return v.avail_out===0&&(F.last_flush=-1),h;if(at===U&&(it===1?s._tr_align(F):it!==5&&(s._tr_stored_block(F,0,0,!1),it===3&&(Z(F.head),F.lookahead===0&&(F.strstart=0,F.block_start=0,F.insert=0))),k(v),v.avail_out===0))return F.last_flush=-1,h}return it!==u?h:F.wrap<=0?1:(F.wrap===2?(ut(F,255&v.adler),ut(F,v.adler>>8&255),ut(F,v.adler>>16&255),ut(F,v.adler>>24&255),ut(F,255&v.total_in),ut(F,v.total_in>>8&255),ut(F,v.total_in>>16&255),ut(F,v.total_in>>24&255)):(ht(F,v.adler>>>16),ht(F,65535&v.adler)),k(v),0<F.wrap&&(F.wrap=-F.wrap),F.pending!==0?h:1)},e.deflateEnd=function(v){var it;return v&&v.state?(it=v.state.status)!==x&&it!==69&&it!==73&&it!==91&&it!==103&&it!==C&&it!==666?J(v,f):(v.state=null,it===C?J(v,-3):h):f},e.deflateSetDictionary=function(v,it){var I,F,L,z,Q,at,H,A,S=it.length;if(!v||!v.state||(z=(I=v.state).wrap)===2||z===1&&I.status!==x||I.lookahead)return f;for(z===1&&(v.adler=a(v.adler,it,S,0)),I.wrap=0,S>=I.w_size&&(z===0&&(Z(I.head),I.strstart=0,I.block_start=0,I.insert=0),A=new r.Buf8(I.w_size),r.arraySet(A,it,S-I.w_size,I.w_size,0),it=A,S=I.w_size),Q=v.avail_in,at=v.next_in,H=v.input,v.avail_in=S,v.next_in=0,v.input=it,rt(I);I.lookahead>=E;){for(F=I.strstart,L=I.lookahead-(E-1);I.ins_h=(I.ins_h<<I.hash_shift^I.window[F+E-1])&I.hash_mask,I.prev[F&I.w_mask]=I.head[I.ins_h],I.head[I.ins_h]=F,F++,--L;);I.strstart=F,I.lookahead=E-1,rt(I)}return I.strstart+=I.lookahead,I.block_start=I.strstart,I.insert=I.lookahead,I.lookahead=0,I.match_length=I.prev_length=E-1,I.match_available=0,v.next_in=at,v.input=H,v.avail_in=Q,I.wrap=z,h},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(i,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(i,t,e){"use strict";t.exports=function(n,r){var s,a,o,c,l,u,h,f,d,_,g,m,p,w,b,M,D,P,E,O,T,x,C,y,U;s=n.state,a=n.next_in,y=n.input,o=a+(n.avail_in-5),c=n.next_out,U=n.output,l=c-(r-n.avail_out),u=c+(n.avail_out-257),h=s.dmax,f=s.wsize,d=s.whave,_=s.wnext,g=s.window,m=s.hold,p=s.bits,w=s.lencode,b=s.distcode,M=(1<<s.lenbits)-1,D=(1<<s.distbits)-1;t:do{p<15&&(m+=y[a++]<<p,p+=8,m+=y[a++]<<p,p+=8),P=w[m&M];e:for(;;){if(m>>>=E=P>>>24,p-=E,(E=P>>>16&255)===0)U[c++]=65535&P;else{if(!(16&E)){if(!(64&E)){P=w[(65535&P)+(m&(1<<E)-1)];continue e}if(32&E){s.mode=12;break t}n.msg="invalid literal/length code",s.mode=30;break t}O=65535&P,(E&=15)&&(p<E&&(m+=y[a++]<<p,p+=8),O+=m&(1<<E)-1,m>>>=E,p-=E),p<15&&(m+=y[a++]<<p,p+=8,m+=y[a++]<<p,p+=8),P=b[m&D];n:for(;;){if(m>>>=E=P>>>24,p-=E,!(16&(E=P>>>16&255))){if(!(64&E)){P=b[(65535&P)+(m&(1<<E)-1)];continue n}n.msg="invalid distance code",s.mode=30;break t}if(T=65535&P,p<(E&=15)&&(m+=y[a++]<<p,(p+=8)<E&&(m+=y[a++]<<p,p+=8)),h<(T+=m&(1<<E)-1)){n.msg="invalid distance too far back",s.mode=30;break t}if(m>>>=E,p-=E,(E=c-l)<T){if(d<(E=T-E)&&s.sane){n.msg="invalid distance too far back",s.mode=30;break t}if(C=g,(x=0)===_){if(x+=f-E,E<O){for(O-=E;U[c++]=g[x++],--E;);x=c-T,C=U}}else if(_<E){if(x+=f+_-E,(E-=_)<O){for(O-=E;U[c++]=g[x++],--E;);if(x=0,_<O){for(O-=E=_;U[c++]=g[x++],--E;);x=c-T,C=U}}}else if(x+=_-E,E<O){for(O-=E;U[c++]=g[x++],--E;);x=c-T,C=U}for(;2<O;)U[c++]=C[x++],U[c++]=C[x++],U[c++]=C[x++],O-=3;O&&(U[c++]=C[x++],1<O&&(U[c++]=C[x++]))}else{for(x=c-T;U[c++]=U[x++],U[c++]=U[x++],U[c++]=U[x++],2<(O-=3););O&&(U[c++]=U[x++],1<O&&(U[c++]=U[x++]))}break}}break}}while(a<o&&c<u);a-=O=p>>3,m&=(1<<(p-=O<<3))-1,n.next_in=a,n.next_out=c,n.avail_in=a<o?o-a+5:5-(a-o),n.avail_out=c<u?u-c+257:257-(c-u),s.hold=m,s.bits=p}},{}],49:[function(i,t,e){"use strict";var n=i("../utils/common"),r=i("./adler32"),s=i("./crc32"),a=i("./inffast"),o=i("./inftrees"),c=1,l=2,u=0,h=-2,f=1,d=852,_=592;function g(x){return(x>>>24&255)+(x>>>8&65280)+((65280&x)<<8)+((255&x)<<24)}function m(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function p(x){var C;return x&&x.state?(C=x.state,x.total_in=x.total_out=C.total=0,x.msg="",C.wrap&&(x.adler=1&C.wrap),C.mode=f,C.last=0,C.havedict=0,C.dmax=32768,C.head=null,C.hold=0,C.bits=0,C.lencode=C.lendyn=new n.Buf32(d),C.distcode=C.distdyn=new n.Buf32(_),C.sane=1,C.back=-1,u):h}function w(x){var C;return x&&x.state?((C=x.state).wsize=0,C.whave=0,C.wnext=0,p(x)):h}function b(x,C){var y,U;return x&&x.state?(U=x.state,C<0?(y=0,C=-C):(y=1+(C>>4),C<48&&(C&=15)),C&&(C<8||15<C)?h:(U.window!==null&&U.wbits!==C&&(U.window=null),U.wrap=y,U.wbits=C,w(x))):h}function M(x,C){var y,U;return x?(U=new m,(x.state=U).window=null,(y=b(x,C))!==u&&(x.state=null),y):h}var D,P,E=!0;function O(x){if(E){var C;for(D=new n.Buf32(512),P=new n.Buf32(32),C=0;C<144;)x.lens[C++]=8;for(;C<256;)x.lens[C++]=9;for(;C<280;)x.lens[C++]=7;for(;C<288;)x.lens[C++]=8;for(o(c,x.lens,0,288,D,0,x.work,{bits:9}),C=0;C<32;)x.lens[C++]=5;o(l,x.lens,0,32,P,0,x.work,{bits:5}),E=!1}x.lencode=D,x.lenbits=9,x.distcode=P,x.distbits=5}function T(x,C,y,U){var q,G=x.state;return G.window===null&&(G.wsize=1<<G.wbits,G.wnext=0,G.whave=0,G.window=new n.Buf8(G.wsize)),U>=G.wsize?(n.arraySet(G.window,C,y-G.wsize,G.wsize,0),G.wnext=0,G.whave=G.wsize):(U<(q=G.wsize-G.wnext)&&(q=U),n.arraySet(G.window,C,y-U,q,G.wnext),(U-=q)?(n.arraySet(G.window,C,y-U,U,0),G.wnext=U,G.whave=G.wsize):(G.wnext+=q,G.wnext===G.wsize&&(G.wnext=0),G.whave<G.wsize&&(G.whave+=q))),0}e.inflateReset=w,e.inflateReset2=b,e.inflateResetKeep=p,e.inflateInit=function(x){return M(x,15)},e.inflateInit2=M,e.inflate=function(x,C){var y,U,q,G,J,X,Z,k,N,ut,ht,ct,rt,pt,mt,ft,At,It,Ft,Yt,v,it,I,F,L=0,z=new n.Buf8(4),Q=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!x||!x.state||!x.output||!x.input&&x.avail_in!==0)return h;(y=x.state).mode===12&&(y.mode=13),J=x.next_out,q=x.output,Z=x.avail_out,G=x.next_in,U=x.input,X=x.avail_in,k=y.hold,N=y.bits,ut=X,ht=Z,it=u;t:for(;;)switch(y.mode){case f:if(y.wrap===0){y.mode=13;break}for(;N<16;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(2&y.wrap&&k===35615){z[y.check=0]=255&k,z[1]=k>>>8&255,y.check=s(y.check,z,2,0),N=k=0,y.mode=2;break}if(y.flags=0,y.head&&(y.head.done=!1),!(1&y.wrap)||(((255&k)<<8)+(k>>8))%31){x.msg="incorrect header check",y.mode=30;break}if((15&k)!=8){x.msg="unknown compression method",y.mode=30;break}if(N-=4,v=8+(15&(k>>>=4)),y.wbits===0)y.wbits=v;else if(v>y.wbits){x.msg="invalid window size",y.mode=30;break}y.dmax=1<<v,x.adler=y.check=1,y.mode=512&k?10:12,N=k=0;break;case 2:for(;N<16;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(y.flags=k,(255&y.flags)!=8){x.msg="unknown compression method",y.mode=30;break}if(57344&y.flags){x.msg="unknown header flags set",y.mode=30;break}y.head&&(y.head.text=k>>8&1),512&y.flags&&(z[0]=255&k,z[1]=k>>>8&255,y.check=s(y.check,z,2,0)),N=k=0,y.mode=3;case 3:for(;N<32;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}y.head&&(y.head.time=k),512&y.flags&&(z[0]=255&k,z[1]=k>>>8&255,z[2]=k>>>16&255,z[3]=k>>>24&255,y.check=s(y.check,z,4,0)),N=k=0,y.mode=4;case 4:for(;N<16;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}y.head&&(y.head.xflags=255&k,y.head.os=k>>8),512&y.flags&&(z[0]=255&k,z[1]=k>>>8&255,y.check=s(y.check,z,2,0)),N=k=0,y.mode=5;case 5:if(1024&y.flags){for(;N<16;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}y.length=k,y.head&&(y.head.extra_len=k),512&y.flags&&(z[0]=255&k,z[1]=k>>>8&255,y.check=s(y.check,z,2,0)),N=k=0}else y.head&&(y.head.extra=null);y.mode=6;case 6:if(1024&y.flags&&(X<(ct=y.length)&&(ct=X),ct&&(y.head&&(v=y.head.extra_len-y.length,y.head.extra||(y.head.extra=new Array(y.head.extra_len)),n.arraySet(y.head.extra,U,G,ct,v)),512&y.flags&&(y.check=s(y.check,U,ct,G)),X-=ct,G+=ct,y.length-=ct),y.length))break t;y.length=0,y.mode=7;case 7:if(2048&y.flags){if(X===0)break t;for(ct=0;v=U[G+ct++],y.head&&v&&y.length<65536&&(y.head.name+=String.fromCharCode(v)),v&&ct<X;);if(512&y.flags&&(y.check=s(y.check,U,ct,G)),X-=ct,G+=ct,v)break t}else y.head&&(y.head.name=null);y.length=0,y.mode=8;case 8:if(4096&y.flags){if(X===0)break t;for(ct=0;v=U[G+ct++],y.head&&v&&y.length<65536&&(y.head.comment+=String.fromCharCode(v)),v&&ct<X;);if(512&y.flags&&(y.check=s(y.check,U,ct,G)),X-=ct,G+=ct,v)break t}else y.head&&(y.head.comment=null);y.mode=9;case 9:if(512&y.flags){for(;N<16;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(k!==(65535&y.check)){x.msg="header crc mismatch",y.mode=30;break}N=k=0}y.head&&(y.head.hcrc=y.flags>>9&1,y.head.done=!0),x.adler=y.check=0,y.mode=12;break;case 10:for(;N<32;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}x.adler=y.check=g(k),N=k=0,y.mode=11;case 11:if(y.havedict===0)return x.next_out=J,x.avail_out=Z,x.next_in=G,x.avail_in=X,y.hold=k,y.bits=N,2;x.adler=y.check=1,y.mode=12;case 12:if(C===5||C===6)break t;case 13:if(y.last){k>>>=7&N,N-=7&N,y.mode=27;break}for(;N<3;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}switch(y.last=1&k,N-=1,3&(k>>>=1)){case 0:y.mode=14;break;case 1:if(O(y),y.mode=20,C!==6)break;k>>>=2,N-=2;break t;case 2:y.mode=17;break;case 3:x.msg="invalid block type",y.mode=30}k>>>=2,N-=2;break;case 14:for(k>>>=7&N,N-=7&N;N<32;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if((65535&k)!=(k>>>16^65535)){x.msg="invalid stored block lengths",y.mode=30;break}if(y.length=65535&k,N=k=0,y.mode=15,C===6)break t;case 15:y.mode=16;case 16:if(ct=y.length){if(X<ct&&(ct=X),Z<ct&&(ct=Z),ct===0)break t;n.arraySet(q,U,G,ct,J),X-=ct,G+=ct,Z-=ct,J+=ct,y.length-=ct;break}y.mode=12;break;case 17:for(;N<14;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(y.nlen=257+(31&k),k>>>=5,N-=5,y.ndist=1+(31&k),k>>>=5,N-=5,y.ncode=4+(15&k),k>>>=4,N-=4,286<y.nlen||30<y.ndist){x.msg="too many length or distance symbols",y.mode=30;break}y.have=0,y.mode=18;case 18:for(;y.have<y.ncode;){for(;N<3;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}y.lens[Q[y.have++]]=7&k,k>>>=3,N-=3}for(;y.have<19;)y.lens[Q[y.have++]]=0;if(y.lencode=y.lendyn,y.lenbits=7,I={bits:y.lenbits},it=o(0,y.lens,0,19,y.lencode,0,y.work,I),y.lenbits=I.bits,it){x.msg="invalid code lengths set",y.mode=30;break}y.have=0,y.mode=19;case 19:for(;y.have<y.nlen+y.ndist;){for(;ft=(L=y.lencode[k&(1<<y.lenbits)-1])>>>16&255,At=65535&L,!((mt=L>>>24)<=N);){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(At<16)k>>>=mt,N-=mt,y.lens[y.have++]=At;else{if(At===16){for(F=mt+2;N<F;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(k>>>=mt,N-=mt,y.have===0){x.msg="invalid bit length repeat",y.mode=30;break}v=y.lens[y.have-1],ct=3+(3&k),k>>>=2,N-=2}else if(At===17){for(F=mt+3;N<F;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}N-=mt,v=0,ct=3+(7&(k>>>=mt)),k>>>=3,N-=3}else{for(F=mt+7;N<F;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}N-=mt,v=0,ct=11+(127&(k>>>=mt)),k>>>=7,N-=7}if(y.have+ct>y.nlen+y.ndist){x.msg="invalid bit length repeat",y.mode=30;break}for(;ct--;)y.lens[y.have++]=v}}if(y.mode===30)break;if(y.lens[256]===0){x.msg="invalid code -- missing end-of-block",y.mode=30;break}if(y.lenbits=9,I={bits:y.lenbits},it=o(c,y.lens,0,y.nlen,y.lencode,0,y.work,I),y.lenbits=I.bits,it){x.msg="invalid literal/lengths set",y.mode=30;break}if(y.distbits=6,y.distcode=y.distdyn,I={bits:y.distbits},it=o(l,y.lens,y.nlen,y.ndist,y.distcode,0,y.work,I),y.distbits=I.bits,it){x.msg="invalid distances set",y.mode=30;break}if(y.mode=20,C===6)break t;case 20:y.mode=21;case 21:if(6<=X&&258<=Z){x.next_out=J,x.avail_out=Z,x.next_in=G,x.avail_in=X,y.hold=k,y.bits=N,a(x,ht),J=x.next_out,q=x.output,Z=x.avail_out,G=x.next_in,U=x.input,X=x.avail_in,k=y.hold,N=y.bits,y.mode===12&&(y.back=-1);break}for(y.back=0;ft=(L=y.lencode[k&(1<<y.lenbits)-1])>>>16&255,At=65535&L,!((mt=L>>>24)<=N);){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(ft&&!(240&ft)){for(It=mt,Ft=ft,Yt=At;ft=(L=y.lencode[Yt+((k&(1<<It+Ft)-1)>>It)])>>>16&255,At=65535&L,!(It+(mt=L>>>24)<=N);){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}k>>>=It,N-=It,y.back+=It}if(k>>>=mt,N-=mt,y.back+=mt,y.length=At,ft===0){y.mode=26;break}if(32&ft){y.back=-1,y.mode=12;break}if(64&ft){x.msg="invalid literal/length code",y.mode=30;break}y.extra=15&ft,y.mode=22;case 22:if(y.extra){for(F=y.extra;N<F;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}y.length+=k&(1<<y.extra)-1,k>>>=y.extra,N-=y.extra,y.back+=y.extra}y.was=y.length,y.mode=23;case 23:for(;ft=(L=y.distcode[k&(1<<y.distbits)-1])>>>16&255,At=65535&L,!((mt=L>>>24)<=N);){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(!(240&ft)){for(It=mt,Ft=ft,Yt=At;ft=(L=y.distcode[Yt+((k&(1<<It+Ft)-1)>>It)])>>>16&255,At=65535&L,!(It+(mt=L>>>24)<=N);){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}k>>>=It,N-=It,y.back+=It}if(k>>>=mt,N-=mt,y.back+=mt,64&ft){x.msg="invalid distance code",y.mode=30;break}y.offset=At,y.extra=15&ft,y.mode=24;case 24:if(y.extra){for(F=y.extra;N<F;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}y.offset+=k&(1<<y.extra)-1,k>>>=y.extra,N-=y.extra,y.back+=y.extra}if(y.offset>y.dmax){x.msg="invalid distance too far back",y.mode=30;break}y.mode=25;case 25:if(Z===0)break t;if(ct=ht-Z,y.offset>ct){if((ct=y.offset-ct)>y.whave&&y.sane){x.msg="invalid distance too far back",y.mode=30;break}rt=ct>y.wnext?(ct-=y.wnext,y.wsize-ct):y.wnext-ct,ct>y.length&&(ct=y.length),pt=y.window}else pt=q,rt=J-y.offset,ct=y.length;for(Z<ct&&(ct=Z),Z-=ct,y.length-=ct;q[J++]=pt[rt++],--ct;);y.length===0&&(y.mode=21);break;case 26:if(Z===0)break t;q[J++]=y.length,Z--,y.mode=21;break;case 27:if(y.wrap){for(;N<32;){if(X===0)break t;X--,k|=U[G++]<<N,N+=8}if(ht-=Z,x.total_out+=ht,y.total+=ht,ht&&(x.adler=y.check=y.flags?s(y.check,q,ht,J-ht):r(y.check,q,ht,J-ht)),ht=Z,(y.flags?k:g(k))!==y.check){x.msg="incorrect data check",y.mode=30;break}N=k=0}y.mode=28;case 28:if(y.wrap&&y.flags){for(;N<32;){if(X===0)break t;X--,k+=U[G++]<<N,N+=8}if(k!==(4294967295&y.total)){x.msg="incorrect length check",y.mode=30;break}N=k=0}y.mode=29;case 29:it=1;break t;case 30:it=-3;break t;case 31:return-4;case 32:default:return h}return x.next_out=J,x.avail_out=Z,x.next_in=G,x.avail_in=X,y.hold=k,y.bits=N,(y.wsize||ht!==x.avail_out&&y.mode<30&&(y.mode<27||C!==4))&&T(x,x.output,x.next_out,ht-x.avail_out)?(y.mode=31,-4):(ut-=x.avail_in,ht-=x.avail_out,x.total_in+=ut,x.total_out+=ht,y.total+=ht,y.wrap&&ht&&(x.adler=y.check=y.flags?s(y.check,q,ht,x.next_out-ht):r(y.check,q,ht,x.next_out-ht)),x.data_type=y.bits+(y.last?64:0)+(y.mode===12?128:0)+(y.mode===20||y.mode===15?256:0),(ut==0&&ht===0||C===4)&&it===u&&(it=-5),it)},e.inflateEnd=function(x){if(!x||!x.state)return h;var C=x.state;return C.window&&(C.window=null),x.state=null,u},e.inflateGetHeader=function(x,C){var y;return x&&x.state&&2&(y=x.state).wrap?((y.head=C).done=!1,u):h},e.inflateSetDictionary=function(x,C){var y,U=C.length;return x&&x.state?(y=x.state).wrap!==0&&y.mode!==11?h:y.mode===11&&r(1,C,U,0)!==y.check?-3:T(x,C,U,U)?(y.mode=31,-4):(y.havedict=1,u):h},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(i,t,e){"use strict";var n=i("../utils/common"),r=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],s=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],a=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],o=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(c,l,u,h,f,d,_,g){var m,p,w,b,M,D,P,E,O,T=g.bits,x=0,C=0,y=0,U=0,q=0,G=0,J=0,X=0,Z=0,k=0,N=null,ut=0,ht=new n.Buf16(16),ct=new n.Buf16(16),rt=null,pt=0;for(x=0;x<=15;x++)ht[x]=0;for(C=0;C<h;C++)ht[l[u+C]]++;for(q=T,U=15;1<=U&&ht[U]===0;U--);if(U<q&&(q=U),U===0)return f[d++]=20971520,f[d++]=20971520,g.bits=1,0;for(y=1;y<U&&ht[y]===0;y++);for(q<y&&(q=y),x=X=1;x<=15;x++)if(X<<=1,(X-=ht[x])<0)return-1;if(0<X&&(c===0||U!==1))return-1;for(ct[1]=0,x=1;x<15;x++)ct[x+1]=ct[x]+ht[x];for(C=0;C<h;C++)l[u+C]!==0&&(_[ct[l[u+C]]++]=C);if(D=c===0?(N=rt=_,19):c===1?(N=r,ut-=257,rt=s,pt-=257,256):(N=a,rt=o,-1),x=y,M=d,J=C=k=0,w=-1,b=(Z=1<<(G=q))-1,c===1&&852<Z||c===2&&592<Z)return 1;for(;;){for(P=x-J,O=_[C]<D?(E=0,_[C]):_[C]>D?(E=rt[pt+_[C]],N[ut+_[C]]):(E=96,0),m=1<<x-J,y=p=1<<G;f[M+(k>>J)+(p-=m)]=P<<24|E<<16|O|0,p!==0;);for(m=1<<x-1;k&m;)m>>=1;if(m!==0?(k&=m-1,k+=m):k=0,C++,--ht[x]==0){if(x===U)break;x=l[u+_[C]]}if(q<x&&(k&b)!==w){for(J===0&&(J=q),M+=y,X=1<<(G=x-J);G+J<U&&!((X-=ht[G+J])<=0);)G++,X<<=1;if(Z+=1<<G,c===1&&852<Z||c===2&&592<Z)return 1;f[w=k&b]=q<<24|G<<16|M-d|0}}return k!==0&&(f[M+k]=x-J<<24|64<<16|0),g.bits=q,0}},{"../utils/common":41}],51:[function(i,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(i,t,e){"use strict";var n=i("../utils/common"),r=0,s=1;function a(L){for(var z=L.length;0<=--z;)L[z]=0}var o=0,c=29,l=256,u=l+1+c,h=30,f=19,d=2*u+1,_=15,g=16,m=7,p=256,w=16,b=17,M=18,D=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],P=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],E=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],O=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],T=new Array(2*(u+2));a(T);var x=new Array(2*h);a(x);var C=new Array(512);a(C);var y=new Array(256);a(y);var U=new Array(c);a(U);var q,G,J,X=new Array(h);function Z(L,z,Q,at,H){this.static_tree=L,this.extra_bits=z,this.extra_base=Q,this.elems=at,this.max_length=H,this.has_stree=L&&L.length}function k(L,z){this.dyn_tree=L,this.max_code=0,this.stat_desc=z}function N(L){return L<256?C[L]:C[256+(L>>>7)]}function ut(L,z){L.pending_buf[L.pending++]=255&z,L.pending_buf[L.pending++]=z>>>8&255}function ht(L,z,Q){L.bi_valid>g-Q?(L.bi_buf|=z<<L.bi_valid&65535,ut(L,L.bi_buf),L.bi_buf=z>>g-L.bi_valid,L.bi_valid+=Q-g):(L.bi_buf|=z<<L.bi_valid&65535,L.bi_valid+=Q)}function ct(L,z,Q){ht(L,Q[2*z],Q[2*z+1])}function rt(L,z){for(var Q=0;Q|=1&L,L>>>=1,Q<<=1,0<--z;);return Q>>>1}function pt(L,z,Q){var at,H,A=new Array(_+1),S=0;for(at=1;at<=_;at++)A[at]=S=S+Q[at-1]<<1;for(H=0;H<=z;H++){var B=L[2*H+1];B!==0&&(L[2*H]=rt(A[B]++,B))}}function mt(L){var z;for(z=0;z<u;z++)L.dyn_ltree[2*z]=0;for(z=0;z<h;z++)L.dyn_dtree[2*z]=0;for(z=0;z<f;z++)L.bl_tree[2*z]=0;L.dyn_ltree[2*p]=1,L.opt_len=L.static_len=0,L.last_lit=L.matches=0}function ft(L){8<L.bi_valid?ut(L,L.bi_buf):0<L.bi_valid&&(L.pending_buf[L.pending++]=L.bi_buf),L.bi_buf=0,L.bi_valid=0}function At(L,z,Q,at){var H=2*z,A=2*Q;return L[H]<L[A]||L[H]===L[A]&&at[z]<=at[Q]}function It(L,z,Q){for(var at=L.heap[Q],H=Q<<1;H<=L.heap_len&&(H<L.heap_len&&At(z,L.heap[H+1],L.heap[H],L.depth)&&H++,!At(z,at,L.heap[H],L.depth));)L.heap[Q]=L.heap[H],Q=H,H<<=1;L.heap[Q]=at}function Ft(L,z,Q){var at,H,A,S,B=0;if(L.last_lit!==0)for(;at=L.pending_buf[L.d_buf+2*B]<<8|L.pending_buf[L.d_buf+2*B+1],H=L.pending_buf[L.l_buf+B],B++,at===0?ct(L,H,z):(ct(L,(A=y[H])+l+1,z),(S=D[A])!==0&&ht(L,H-=U[A],S),ct(L,A=N(--at),Q),(S=P[A])!==0&&ht(L,at-=X[A],S)),B<L.last_lit;);ct(L,p,z)}function Yt(L,z){var Q,at,H,A=z.dyn_tree,S=z.stat_desc.static_tree,B=z.stat_desc.has_stree,j=z.stat_desc.elems,ot=-1;for(L.heap_len=0,L.heap_max=d,Q=0;Q<j;Q++)A[2*Q]!==0?(L.heap[++L.heap_len]=ot=Q,L.depth[Q]=0):A[2*Q+1]=0;for(;L.heap_len<2;)A[2*(H=L.heap[++L.heap_len]=ot<2?++ot:0)]=1,L.depth[H]=0,L.opt_len--,B&&(L.static_len-=S[2*H+1]);for(z.max_code=ot,Q=L.heap_len>>1;1<=Q;Q--)It(L,A,Q);for(H=j;Q=L.heap[1],L.heap[1]=L.heap[L.heap_len--],It(L,A,1),at=L.heap[1],L.heap[--L.heap_max]=Q,L.heap[--L.heap_max]=at,A[2*H]=A[2*Q]+A[2*at],L.depth[H]=(L.depth[Q]>=L.depth[at]?L.depth[Q]:L.depth[at])+1,A[2*Q+1]=A[2*at+1]=H,L.heap[1]=H++,It(L,A,1),2<=L.heap_len;);L.heap[--L.heap_max]=L.heap[1],function(tt,wt){var yt,vt,Gt,lt,Et,Lt,Dt=wt.dyn_tree,Tt=wt.max_code,qt=wt.stat_desc.static_tree,zt=wt.stat_desc.has_stree,oe=wt.stat_desc.extra_bits,W=wt.stat_desc.extra_base,xt=wt.stat_desc.max_length,st=0;for(lt=0;lt<=_;lt++)tt.bl_count[lt]=0;for(Dt[2*tt.heap[tt.heap_max]+1]=0,yt=tt.heap_max+1;yt<d;yt++)xt<(lt=Dt[2*Dt[2*(vt=tt.heap[yt])+1]+1]+1)&&(lt=xt,st++),Dt[2*vt+1]=lt,Tt<vt||(tt.bl_count[lt]++,Et=0,W<=vt&&(Et=oe[vt-W]),Lt=Dt[2*vt],tt.opt_len+=Lt*(lt+Et),zt&&(tt.static_len+=Lt*(qt[2*vt+1]+Et)));if(st!==0){do{for(lt=xt-1;tt.bl_count[lt]===0;)lt--;tt.bl_count[lt]--,tt.bl_count[lt+1]+=2,tt.bl_count[xt]--,st-=2}while(0<st);for(lt=xt;lt!==0;lt--)for(vt=tt.bl_count[lt];vt!==0;)Tt<(Gt=tt.heap[--yt])||(Dt[2*Gt+1]!==lt&&(tt.opt_len+=(lt-Dt[2*Gt+1])*Dt[2*Gt],Dt[2*Gt+1]=lt),vt--)}}(L,z),pt(A,ot,L.bl_count)}function v(L,z,Q){var at,H,A=-1,S=z[1],B=0,j=7,ot=4;for(S===0&&(j=138,ot=3),z[2*(Q+1)+1]=65535,at=0;at<=Q;at++)H=S,S=z[2*(at+1)+1],++B<j&&H===S||(B<ot?L.bl_tree[2*H]+=B:H!==0?(H!==A&&L.bl_tree[2*H]++,L.bl_tree[2*w]++):B<=10?L.bl_tree[2*b]++:L.bl_tree[2*M]++,A=H,ot=(B=0)===S?(j=138,3):H===S?(j=6,3):(j=7,4))}function it(L,z,Q){var at,H,A=-1,S=z[1],B=0,j=7,ot=4;for(S===0&&(j=138,ot=3),at=0;at<=Q;at++)if(H=S,S=z[2*(at+1)+1],!(++B<j&&H===S)){if(B<ot)for(;ct(L,H,L.bl_tree),--B!=0;);else H!==0?(H!==A&&(ct(L,H,L.bl_tree),B--),ct(L,w,L.bl_tree),ht(L,B-3,2)):B<=10?(ct(L,b,L.bl_tree),ht(L,B-3,3)):(ct(L,M,L.bl_tree),ht(L,B-11,7));A=H,ot=(B=0)===S?(j=138,3):H===S?(j=6,3):(j=7,4)}}a(X);var I=!1;function F(L,z,Q,at){ht(L,(o<<1)+(at?1:0),3),function(H,A,S,B){ft(H),B&&(ut(H,S),ut(H,~S)),n.arraySet(H.pending_buf,H.window,A,S,H.pending),H.pending+=S}(L,z,Q,!0)}e._tr_init=function(L){I||(function(){var z,Q,at,H,A,S=new Array(_+1);for(H=at=0;H<c-1;H++)for(U[H]=at,z=0;z<1<<D[H];z++)y[at++]=H;for(y[at-1]=H,H=A=0;H<16;H++)for(X[H]=A,z=0;z<1<<P[H];z++)C[A++]=H;for(A>>=7;H<h;H++)for(X[H]=A<<7,z=0;z<1<<P[H]-7;z++)C[256+A++]=H;for(Q=0;Q<=_;Q++)S[Q]=0;for(z=0;z<=143;)T[2*z+1]=8,z++,S[8]++;for(;z<=255;)T[2*z+1]=9,z++,S[9]++;for(;z<=279;)T[2*z+1]=7,z++,S[7]++;for(;z<=287;)T[2*z+1]=8,z++,S[8]++;for(pt(T,u+1,S),z=0;z<h;z++)x[2*z+1]=5,x[2*z]=rt(z,5);q=new Z(T,D,l+1,u,_),G=new Z(x,P,0,h,_),J=new Z(new Array(0),E,0,f,m)}(),I=!0),L.l_desc=new k(L.dyn_ltree,q),L.d_desc=new k(L.dyn_dtree,G),L.bl_desc=new k(L.bl_tree,J),L.bi_buf=0,L.bi_valid=0,mt(L)},e._tr_stored_block=F,e._tr_flush_block=function(L,z,Q,at){var H,A,S=0;0<L.level?(L.strm.data_type===2&&(L.strm.data_type=function(B){var j,ot=4093624447;for(j=0;j<=31;j++,ot>>>=1)if(1&ot&&B.dyn_ltree[2*j]!==0)return r;if(B.dyn_ltree[18]!==0||B.dyn_ltree[20]!==0||B.dyn_ltree[26]!==0)return s;for(j=32;j<l;j++)if(B.dyn_ltree[2*j]!==0)return s;return r}(L)),Yt(L,L.l_desc),Yt(L,L.d_desc),S=function(B){var j;for(v(B,B.dyn_ltree,B.l_desc.max_code),v(B,B.dyn_dtree,B.d_desc.max_code),Yt(B,B.bl_desc),j=f-1;3<=j&&B.bl_tree[2*O[j]+1]===0;j--);return B.opt_len+=3*(j+1)+5+5+4,j}(L),H=L.opt_len+3+7>>>3,(A=L.static_len+3+7>>>3)<=H&&(H=A)):H=A=Q+5,Q+4<=H&&z!==-1?F(L,z,Q,at):L.strategy===4||A===H?(ht(L,2+(at?1:0),3),Ft(L,T,x)):(ht(L,4+(at?1:0),3),function(B,j,ot,tt){var wt;for(ht(B,j-257,5),ht(B,ot-1,5),ht(B,tt-4,4),wt=0;wt<tt;wt++)ht(B,B.bl_tree[2*O[wt]+1],3);it(B,B.dyn_ltree,j-1),it(B,B.dyn_dtree,ot-1)}(L,L.l_desc.max_code+1,L.d_desc.max_code+1,S+1),Ft(L,L.dyn_ltree,L.dyn_dtree)),mt(L),at&&ft(L)},e._tr_tally=function(L,z,Q){return L.pending_buf[L.d_buf+2*L.last_lit]=z>>>8&255,L.pending_buf[L.d_buf+2*L.last_lit+1]=255&z,L.pending_buf[L.l_buf+L.last_lit]=255&Q,L.last_lit++,z===0?L.dyn_ltree[2*Q]++:(L.matches++,z--,L.dyn_ltree[2*(y[Q]+l+1)]++,L.dyn_dtree[2*N(z)]++),L.last_lit===L.lit_bufsize-1},e._tr_align=function(L){ht(L,2,3),ct(L,p,T),function(z){z.bi_valid===16?(ut(z,z.bi_buf),z.bi_buf=0,z.bi_valid=0):8<=z.bi_valid&&(z.pending_buf[z.pending++]=255&z.bi_buf,z.bi_buf>>=8,z.bi_valid-=8)}(L)}},{"../utils/common":41}],53:[function(i,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(i,t,e){(function(n){(function(r,s){"use strict";if(!r.setImmediate){var a,o,c,l,u=1,h={},f=!1,d=r.document,_=Object.getPrototypeOf&&Object.getPrototypeOf(r);_=_&&_.setTimeout?_:r,a={}.toString.call(r.process)==="[object process]"?function(w){process.nextTick(function(){m(w)})}:function(){if(r.postMessage&&!r.importScripts){var w=!0,b=r.onmessage;return r.onmessage=function(){w=!1},r.postMessage("","*"),r.onmessage=b,w}}()?(l="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",p,!1):r.attachEvent("onmessage",p),function(w){r.postMessage(l+w,"*")}):r.MessageChannel?((c=new MessageChannel).port1.onmessage=function(w){m(w.data)},function(w){c.port2.postMessage(w)}):d&&"onreadystatechange"in d.createElement("script")?(o=d.documentElement,function(w){var b=d.createElement("script");b.onreadystatechange=function(){m(w),b.onreadystatechange=null,o.removeChild(b),b=null},o.appendChild(b)}):function(w){setTimeout(m,0,w)},_.setImmediate=function(w){typeof w!="function"&&(w=new Function(""+w));for(var b=new Array(arguments.length-1),M=0;M<b.length;M++)b[M]=arguments[M+1];var D={callback:w,args:b};return h[u]=D,a(u),u++},_.clearImmediate=g}function g(w){delete h[w]}function m(w){if(f)setTimeout(m,0,w);else{var b=h[w];if(b){f=!0;try{(function(M){var D=M.callback,P=M.args;switch(P.length){case 0:D();break;case 1:D(P[0]);break;case 2:D(P[0],P[1]);break;case 3:D(P[0],P[1],P[2]);break;default:D.apply(s,P)}})(b)}finally{g(w),f=!1}}}}function p(w){w.source===r&&typeof w.data=="string"&&w.data.indexOf(l)===0&&m(+w.data.slice(l.length))}})(typeof self>"u"?n===void 0?this:n:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});function ia(i,t){let e={total:0,header:0,uniqueHeaderSize:0,numberOfUniqueHeaders:0,compression:"partial"};switch(t){case"dlf":e.total=8520,e.header=8520;break;case"fts":{let n=new DataView(i);if(n.getInt32(264,!0)===0)e.compression="none";else{let s=n.getInt32(256,!0);e.total=280+768*s,e.header=280,e.uniqueHeaderSize=768,e.numberOfUniqueHeaders=s}}break;case"llf":e.compression="full";break;case"ftl":case"tea":case"amb":case"cin":e.compression="none";break}return e}var Ch;(function(i){i[i.Unknown=-1]="Unknown",i[i.Binary=0]="Binary",i[i.Ascii=1]="Ascii"})(Ch||(Ch={}));var Ih;(function(i){i[i.Unknown=-1]="Unknown",i[i.Small=4]="Small",i[i.Medium=5]="Medium",i[i.Large=6]="Large"})(Ih||(Ih={}));var Rh=516;var Sc=[3,13,5,25,9,17,1,62,30,46,14,54,22,38,6,58,26,42,10,50,18,34,66,2,124,60,92,28,108,44,76,12,116,52,84,20,100,36,68,4,120,56,88,24,104,40,72,8,240,112,176,48,208,80,144,16,224,96,160,32,192,64,128,0],wc=[2,4,4,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],ra=[3,2,3,3,4,4,4,5,5,5,5,6,6,6,7,7],Mc=[5,3,1,6,10,2,12,20,4,24,8,48,16,32,64,0],sa=[0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8];var Ec=[11,12,12,12,12,12,12,12,12,8,7,12,12,7,12,12,12,12,12,12,12,12,12,12,12,12,13,12,12,12,12,12,4,10,8,12,10,12,10,8,7,7,8,9,7,6,7,8,7,6,7,7,7,7,8,7,7,8,8,12,11,7,9,11,12,6,7,6,6,5,7,8,8,6,11,9,6,7,6,6,7,11,6,6,6,7,9,8,9,9,11,8,11,9,12,8,12,5,6,6,6,5,6,6,6,5,11,7,5,6,5,5,6,10,5,5,5,5,8,7,8,8,10,11,11,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,12,13,13,13,12,13,13,13,12,13,13,13,13,12,13,13,13,12,12,12,13,13,13,13,13,13,13,13,13,13,13],Ac=[1168,4064,2016,3040,992,3552,1504,2528,480,184,98,3808,1760,34,2784,736,3296,1248,2272,224,3936,1888,2912,864,3424,1376,4672,2400,352,3680,1632,2656,15,592,56,608,80,3168,912,216,66,2,88,432,124,41,60,152,92,9,28,108,44,76,24,12,116,232,104,1120,144,52,176,1808,2144,49,84,17,33,23,20,168,40,1,784,304,62,100,30,46,36,1296,14,54,22,68,48,200,464,208,272,72,1552,336,96,136,4e3,7,38,6,58,27,26,42,10,11,528,4,19,50,3,29,18,400,13,21,5,25,8,120,240,112,656,1040,16,1952,2976,928,576,7232,3136,5184,1088,6208,2112,4160,64,8064,3968,6016,1920,7040,2944,4992,896,7552,3456,5504,1408,6528,2432,4480,384,7808,3712,5760,1664,6784,2688,4736,640,7296,3200,5248,1152,6272,2176,4224,128,7936,3840,5888,1792,6912,2816,4864,3488,1440,2464,416,3744,1696,2720,672,3232,1184,2208,160,3872,1824,2848,800,3360,1312,2336,288,3616,1568,2592,544,3104,1056,2080,32,4032,1984,3008,960,3520,1472,2496,448,3776,1728,2752,704,3264,1216,2240,192,3904,1856,2880,832,768,3392,7424,3328,5376,1344,1280,6400,2304,2368,4352,256,7680,3584,320,5632,1536,6656,3648,1600,2624,2560,4608,512,7168,3072,5120,1024,6144,2048,4096,0],Tc=new ArrayBuffer(0);function aa(i,t){let e=[];for(let n=0;n<t;n++)e.push(i);return e}function Ph(i,t,e){return e<i?i:e>t?t:e}function Wi(i){return!Number.isInteger(i)||i<0?0:(1<<i)-1}function ui(i,t){return i&Wi(t)}function Xi(i){let t=i.filter(s=>s.byteLength>0);if(t.length===0)return Tc;let e=t.reduce((s,a)=>s+a.byteLength,0),n=new Uint8Array(e),r=0;return t.forEach(s=>{n.set(new Uint8Array(s),r),r=r+s.byteLength}),n.buffer}function Nr(i,t){let e=new Uint8Array(i),n=e.slice(0,t).buffer,r=e.slice(t).buffer;return[n,r]}var Lf=3,Of=2;function Uf(i,t,e){let n=Ph(2,Rh,e-t),r=new Uint8Array(i);for(let s=2;s<=n;s++)if(r[t+s]!==r[e+s])return s;return n}function Ff(i,t){if(i.byteLength===0||t.byteLength===0)return-1;let e=new Uint8Array(i),n=new Uint8Array(t);for(let r=0;r<t.byteLength-i.byteLength;r++){let s=!0;for(let a=0;a<i.byteLength;a++)if(n[r+a]!==e[a]){s=!1;break}if(s)return r}return-1}function Dh(i,t,e){let n=i.byteLength-e<2,r=e===t||e-t<2;if(n||r)return{size:0,distance:0};let s=i.slice(t,e),a=i.slice(e,e+2),o=Ff(a,s);if(o!==-1){let c=e-t-o,l=2;return c>2&&(l=Uf(i,t+o,e)),{distance:c-1,size:l}}return{size:0,distance:0}}var oa=class{inputBuffer;inputBufferView;inputBufferStartIndex;outputBuffer;outputBufferView;outputBufferSize;dictionarySizeMask;distCodes;distBits;outBits;nChBits;nChCodes;constructor(t,e,n){this.dictionarySizeMask=0,this.distCodes=structuredClone(Sc),this.distBits=structuredClone(wc),this.outBits=0,this.nChBits=aa(0,774),this.nChCodes=aa(0,774),this.setupTables(e,n),this.inputBuffer=t,this.inputBufferView=new Uint8Array(this.inputBuffer),this.inputBufferStartIndex=0,this.outputBuffer=new ArrayBuffer(t.byteLength+Lf+Of),this.outputBufferView=new Uint8Array(this.outputBuffer),this.outputBufferSize=0,this.outputHeader(e,n),this.processInput(n),this.writeTerminationLiteral()}getResult(){return this.outputBuffer.slice(0,this.outputBufferSize)}setupTables(t,e){switch(t){case"ascii":{for(let r=0;r<256;r++)this.nChBits[r]=Ec[r]+1,this.nChCodes[r]=Ac[r]*2;break}case"binary":{let r=0;for(let s=0;s<256;s++)this.nChBits[s]=9,this.nChCodes[s]=r,r=ui(r,16)+2;break}}switch(e){case"small":{this.dictionarySizeMask=Wi(4);break}case"medium":{this.dictionarySizeMask=Wi(5);break}case"large":{this.dictionarySizeMask=Wi(6);break}}let n=256;for(let r=0;r<16;r++)for(let s=0;s<1<<sa[r];s++)this.nChBits[n]=sa[r]+ra[r]+1,this.nChCodes[n]=s<<ra[r]+1|Mc[r]*2|1,n=n+1}outputHeader(t,e){switch(t){case"ascii":{this.outputBufferView[0]=1;break}case"binary":{this.outputBufferView[0]=0;break}}switch(e){case"small":{this.outputBufferView[1]=4;break}case"medium":{this.outputBufferView[1]=5;break}case"large":{this.outputBufferView[1]=6;break}}this.outputBufferView[2]=0,this.outputBufferSize=3}processInput(t){if(this.inputBuffer.byteLength===0)return;if(this.inputBuffer.byteLength<=2){this.skipFirstTwoBytes();return}this.skipFirstTwoBytes();let e=0;for(;this.inputBuffer.byteLength-this.inputBufferStartIndex>0;){let n;e>0?n=Dh(this.inputBuffer.slice(e),e,this.inputBufferStartIndex):n=Dh(this.inputBuffer,e,this.inputBufferStartIndex);let{size:r,distance:s}=n;if(this.isRepetitionFlushable(r,s)===!1){let c=this.inputBufferView[this.inputBufferStartIndex];this.outputBits(this.nChBits[c],this.nChCodes[c]),this.inputBufferStartIndex=this.inputBufferStartIndex+1}else{let c=r+254;if(this.outputBits(this.nChBits[c],this.nChCodes[c]),r===2){let l=s>>2;this.outputBits(this.distBits[l],this.distCodes[l]),this.outputBits(2,s&3)}else switch(t){case"small":{let l=s>>4;this.outputBits(this.distBits[l],this.distCodes[l]),this.outputBits(4,this.dictionarySizeMask&s);break}case"medium":{let l=s>>5;this.outputBits(this.distBits[l],this.distCodes[l]),this.outputBits(5,this.dictionarySizeMask&s);break}case"large":{let l=s>>6;this.outputBits(this.distBits[l],this.distCodes[l]),this.outputBits(6,this.dictionarySizeMask&s);break}}this.inputBufferStartIndex=this.inputBufferStartIndex+r}let o;switch(t){case"small":{o=1024;break}case"medium":{o=2048;break}case"large":{o=4096;break}}this.inputBufferStartIndex>=o&&(this.inputBuffer=this.inputBuffer.slice(o),this.inputBufferView=new Uint8Array(this.inputBuffer),this.inputBufferStartIndex=this.inputBufferStartIndex-o)}}writeTerminationLiteral(){this.outputBits(this.nChBits.at(-1),this.nChCodes.at(-1))}isRepetitionFlushable(t,e){return t===0||t===2&&e>=256?!1:t>=8||this.inputBuffer.byteLength-this.inputBufferStartIndex<2?!0:null}skipFirstTwoBytes(){let[t,e]=this.inputBufferView;this.outputBits(this.nChBits[t],this.nChCodes[t]),this.outputBits(this.nChBits[e],this.nChCodes[e]),this.inputBufferStartIndex=this.inputBufferStartIndex+2}outputBits(t,e){t>8&&(this.outputBits(8,e),e=e>>8,t=t-8);let n=this.outBits;this.outputBufferView[this.outputBufferSize-1]=this.outputBufferView[this.outputBufferSize-1]|ui(e<<n,8),this.outBits=this.outBits+t,this.outBits>8?(this.outBits=ui(this.outBits,3),e=e>>8-n,this.outputBufferView[this.outputBufferSize]=ui(e,8),this.outputBufferSize=this.outputBufferSize+1):(this.outBits=ui(this.outBits,3),this.outBits===0&&(this.outputBufferView[this.outputBufferSize]=0,this.outputBufferSize=this.outputBufferSize+1))}};function ca(i,t,e){return new oa(i,t,e).getResult()}var la=1.440000057220459,ln=!0;var Cc="truncate zero bytes",zr="keep zero bytes",qn=160,di=160,ha=["\0","","","","","","","\x07","\b","	",`
`,"\v","\f","\r","","","\0x10","\0x11","\0x12","\0x13","\0x14","\0x15","\0x16","\0x17","\0x18","\0x19","\0x1a","\0x1b","\0x1c","\0x1d","\0x1e","\0x1f"," ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","\x7F","\x80","\x81","\x82","\x83","\x84","\x85","\x86","\x87","\x88","\x89","\x8A","\x8B","\x8C","\x8D","\x8E","\x8F","\x90","\x91","\x92","\x93","\x94","\x95","\x96","\x97","\x98","\x99","\x9A","\x9B","\x9C","\x9D","\x9E","\x9F","\xA0","\xA1","\xA2","\xA3","\xA4","\xA5","\xA6","\xA7","\xA8","\xA9","\xAA","\xAB","\xAC","\xAD","\xAE","\xAF","\xB0","\xB1","\xB2","\xB3","\xB4","\xB5","\xB6","\xB7","\xB8","\xB9","\xBA","\xBB","\xBC","\xBD","\xBE","\xBF","\xC0","\xC1","\xC2","\xC3","\xC4","\xC5","\xC6","\xC7","\xC8","\xC9","\xCA","\xCB","\xCC","\xCD","\xCE","\xCF","\xD0","\xD1","\xD2","\xD3","\xD4","\xD5","\xD6","\xD7","\xD8","\xD9","\xDA","\xDB","\xDC","\xDD","\xDE","\xDF","\xE0","\xE1","\xE2","\xE3","\xE4","\xE5","\xE6","\xE7","\xE8","\xE9","\xEA","\xEB","\xEC","\xED","\xEE","\xEF","\xF0","\xF1","\xF2","\xF3","\xF4","\xF5","\xF6","\xF7","\xF8","\xF9","\xFA","\xFB","\xFC","\xFD","\xFE","\xFF"],Lh=Uh(ha),ua=ha.indexOf(" "),Oh=" ";function Fh(i){let t=i.length,e=Number.NEGATIVE_INFINITY;for(;t>0;)t=t-1,i[t]>e&&(e=i[t]);return e}function Bh(i){return i.filter((t,e,n)=>n.indexOf(t)===e)}function le(i,t){return Array.from({length:t}).map((e,n)=>i(n))}function Zt(i,t){let e=[];for(let n=0;n<t;n++)e.push(i);return e}function Uh(i){let t={};return i.forEach((e,n)=>{t[e]=n}),t}function Nh(i){return i.map(e=>ha[e]??Oh).join("")}function Ic(i){return[...i].map(e=>Lh[e]??ua)}function zh(i,t,e){return e<i?i:e>t?t:e}function $t(i){if(i.length===0)return new ArrayBuffer(0);let t=i.reduce((r,s)=>r+s.byteLength,0),e=new Uint8Array(t),n=0;return i.forEach(r=>{e.set(new Uint8Array(r),n),n=n+r.byteLength}),e.buffer}var K=class i extends DataView{static sizeOfFloat32(){return 4}static sizeOfFloat32Array(t){return t*i.sizeOfFloat32()}static sizeOfInt8(){return 1}static sizeOfInt8Array(t){return t*i.sizeOfInt8()}static sizeOfInt16(){return 2}static sizeOfInt16Array(t){return t*i.sizeOfInt16()}static sizeOfInt32(){return 4}static sizeOfInt32Array(t){return t*i.sizeOfInt32()}static sizeOfUint8(){return 1}static sizeOfUint8Array(t){return t*i.sizeOfUint8()}static sizeOfUint16(){return 2}static sizeOfUint16Array(t){return t*i.sizeOfUint16()}static sizeOfUint32(){return 4}static sizeOfUint32Array(t){return t*i.sizeOfUint32()}static sizeOfString(t){return t}static sizeOfNullTerminatedString(t){return t.length+1}static sizeOfVector3(){return i.sizeOfFloat32Array(3)}static sizeOfVector3Array(t){return t*i.sizeOfVector3()}static sizeOfRotation(){return i.sizeOfFloat32Array(3)}static sizeOfQuat(){return i.sizeOfFloat32Array(4)}position;constructor(t,e,n){super(t,e,n),this.position=0}readFloat32(){let t=this.getFloat32(this.position,ln);return this.position=this.position+i.sizeOfFloat32(),t}readFloat32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.readFloat32());return e}readInt8(){let t=this.getInt8(this.position);return this.position=this.position+i.sizeOfInt8(),t}readInt8Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.readInt8());return e}readInt16(){let t=this.getInt16(this.position,ln);return this.position=this.position+i.sizeOfInt16(),t}readInt16Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.readInt16());return e}readInt32(){let t=this.getInt32(this.position,ln);return this.position=this.position+i.sizeOfInt32(),t}readInt32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.readInt32());return e}readUint8(){let t=this.getUint8(this.position);return this.position=this.position+i.sizeOfUint8(),t}readUint8Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.readUint8());return e}readUint16(){let t=this.getUint16(this.position,ln);return this.position=this.position+i.sizeOfUint16(),t}readUint16Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.readUint16());return e}readUint32(){let t=this.getUint32(this.position,ln);return this.position=this.position+i.sizeOfUint32(),t}readUint32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.readUint32());return e}writeFloat32(t){this.setFloat32(this.position,t,ln),this.position=this.position+i.sizeOfFloat32()}writeFloat32Array(t){t.forEach(e=>{this.writeFloat32(e)})}writeInt8(t){this.setInt8(this.position,t),this.position=this.position+i.sizeOfInt8()}writeInt8Array(t){t.forEach(e=>{this.writeInt8(e)})}writeInt16(t){this.setInt16(this.position,t,ln),this.position=this.position+i.sizeOfInt16()}writeInt16Array(t){t.forEach(e=>{this.writeInt16(e)})}writeInt32(t){this.setInt32(this.position,t,ln),this.position=this.position+i.sizeOfInt32()}writeInt32Array(t){t.forEach(e=>{this.writeInt32(e)})}writeUint8(t){this.setUint8(this.position,t),this.position=this.position+i.sizeOfUint8()}writeUint8Array(t){Array.isArray(t)?t.forEach(e=>{this.writeUint8(e)}):new Uint8Array(t).forEach(e=>{this.writeUint8(e)})}writeUint16(t){this.setUint16(this.position,t,ln),this.position=this.position+i.sizeOfUint16()}writeUint16Array(t){t.forEach(e=>{this.writeUint16(e)})}writeUint32(t){this.setUint32(this.position,t,ln),this.position=this.position+i.sizeOfUint32()}writeUint32Array(t){t.forEach(e=>{this.writeUint32(e)})}readString(t,e=Cc){let n=[];if(t===void 0){let r=this.readUint8();for(;r!==0;)n.push(r),r=this.readUint8()}else{let r=!1;for(let s=0;s<t;s++){let a=this.readUint8();r&&e===Cc||(a===0&&(r=!0),(a!==0||e===zr)&&(a===0?n.push(ua):n.push(a)))}}return Nh(n)}writeString(t,e){if(e===void 0)Ic(t).forEach(n=>{this.writeUint8(n)}),this.writeUint8(0);else{let n=Zt(0,e);Ic(t).forEach((r,s)=>{n[s]=r}),n.forEach(r=>{this.writeUint8(r)})}}readVector3(){let[t,e,n]=this.readFloat32Array(3);return{x:t,y:e,z:n}}readVector3Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.readVector3());return e}writeVector3({x:t,y:e,z:n}){this.writeFloat32Array([t,e,n])}writeVector3Array(t){t.forEach(e=>{this.writeVector3(e)})}readRotation(){let[t,e,n]=this.readFloat32Array(3);return{a:t,b:e,g:n}}writeRotation({a:t,b:e,g:n}){this.writeFloat32Array([t,e,n])}readQuat(){let[t,e,n,r]=this.readFloat32Array(4);return{x:e,y:n,z:r,w:t}}writeQuat({x:t,y:e,z:n,w:r}){this.writeFloat32Array([r,t,e,n])}writeBuffer(t){this.writeUint8Array(t)}};var kr=class i{static readFrom(t){t.readFloat32(),t.readString(16);let e={lastUser:t.readString(256),time:t.readInt32(),posEdit:t.readVector3(),angleEdit:t.readRotation()};t.readInt32();let n=t.readInt32();t.readInt32(),t.readInt32(),t.readInt32(),t.readInt32(),t.readInt32Array(256),t.readInt32();let r=t.readInt32(),s=t.readInt32();t.readInt32(),t.readInt32();let a=t.readInt32();return t.readInt32Array(250),t.readVector3(),t.readFloat32Array(253),t.readString(4096),t.readInt32Array(256),{...e,numberOfInteractiveObjects:n,numberOfFogs:r,numberOfBackgroundPolygons:s,numberOfZonesAndPaths:a}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeFloat32(la),n.writeString("DANAE_FILE",16),n.writeString(t.header.lastUser,256),n.writeInt32(t.header.time),n.writeVector3(t.header.posEdit),n.writeRotation(t.header.angleEdit),n.writeInt32(1),n.writeInt32(t.interactiveObjects.length),n.writeInt32(0),n.writeInt32(12),n.writeInt32(0),n.writeInt32(0),n.writeInt32Array(Zt(0,256)),n.writeInt32(0),n.writeInt32(t.fogs.length),n.writeInt32(t.header.numberOfBackgroundPolygons),n.writeInt32(0),n.writeInt32(0),n.writeInt32(t.paths.length+t.zones.length),n.writeInt32Array(Zt(0,250)),n.writeVector3({x:0,y:0,z:0}),n.writeFloat32Array(Zt(0,253)),n.writeString("",4096),n.writeInt32Array(Zt(0,256)),e}static sizeOf(){return K.sizeOfFloat32()+K.sizeOfString(272)+K.sizeOfInt32()+K.sizeOfVector3()+K.sizeOfRotation()+K.sizeOfInt32Array(518)+K.sizeOfVector3()+K.sizeOfFloat32Array(253)+K.sizeOfString(4096)+K.sizeOfInt32Array(256)}};var ne=class i{static readFrom(t,e){if(e==="bgra"){let[a,o,c,l]=t.readUint8Array(4);return{r:c,g:o,b:a,a:l/255}}if(e==="abgr"){let[a,o,c,l]=t.readUint8Array(4);return{r:l,g:c,b:o,a:a/255}}let[n,r,s]=t.readFloat32Array(3);return{r:n*255,g:r*255,b:s*255,a:1}}static accumulateFrom({r:t,g:e,b:n,a:r},s){let a=new ArrayBuffer(i.sizeOf(s)),o=new K(a);return s==="bgra"?o.writeUint8Array([n,e,t,r*255]):s==="abgr"?o.writeUint8Array([r*255,n,e,t]):o.writeFloat32Array([t/255,e/255,n/255]),a}static sizeOf(t){return t==="rgb"?K.sizeOfFloat32Array(3):K.sizeOfUint8Array(4)}static get black(){return{r:0,g:0,b:0,a:1}}static get transparent(){return{r:0,g:0,b:0,a:0}}};var Vr=class i{static readFrom(t){let e={pos:t.readVector3(),color:ne.readFrom(t,"rgb"),size:t.readFloat32(),special:t.readInt32(),scale:t.readFloat32(),move:t.readVector3(),angle:t.readRotation(),speed:t.readFloat32(),rotateSpeed:t.readFloat32(),toLive:t.readInt32()};t.readInt32();let n=t.readFloat32();return t.readFloat32Array(32),t.readInt32Array(32),t.readString(256),{...e,frequency:n}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeVector3(t.pos),n.writeBuffer(ne.accumulateFrom(t.color,"rgb")),n.writeFloat32(t.size),n.writeInt32(t.special),n.writeFloat32(t.scale),n.writeVector3(t.move),n.writeRotation(t.angle),n.writeFloat32(t.speed),n.writeFloat32(t.rotateSpeed),n.writeInt32(t.toLive),n.writeInt32(0),n.writeFloat32(t.frequency),n.writeFloat32Array(Zt(0,32)),n.writeInt32Array(Zt(0,32)),n.writeString("",256),e}static sizeOf(){return K.sizeOfVector3()+ne.sizeOf("rgb")+K.sizeOfFloat32Array(2)+K.sizeOfInt32()+K.sizeOfVector3()+K.sizeOfRotation()+K.sizeOfFloat32Array(3)+K.sizeOfInt32Array(2)+K.sizeOfFloat32Array(32)+K.sizeOfInt32Array(32)+K.sizeOfString(256)}};var Hr=class i{static readFrom(t){let e={name:i.toRelativePath(t.readString(512)),pos:t.readVector3(),angle:t.readRotation(),identifier:t.readInt32()};return t.readInt32(),t.readInt32Array(14),t.readFloat32Array(16),e}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeString(i.toAbsolutePath(t.name),512),n.writeVector3(t.pos),n.writeRotation(t.angle),n.writeInt32(t.identifier),n.writeInt32(0),n.writeInt32Array(Zt(0,14)),n.writeFloat32Array(Zt(0,16)),e}static toRelativePath(t){t=t.toLowerCase().replaceAll("\\","/").split("graph/obj3d/interactive/")[1];let e=t.split("/"),r=e.pop().split(".");r.length>1&&r.pop();let s=e.join("/"),a=r.join(".");return s.split("/").at(-1)!==a?s+"/"+a+".asl":s}static toAbsolutePath(t){if(t=t.toLowerCase().replace(/\/$/,""),t.endsWith(".asl")){let r=t.split("/"),a=r.pop().split(".");a.length>1&&a.pop();let o=r.join("/"),c=a.join(".");return`c:\\arx\\graph\\obj3d\\interactive\\${o.replaceAll("/","\\")}\\${c}.teo`}let e=t,n=t.split("/").at(-1);return`c:\\arx\\graph\\obj3d\\interactive\\${e.replaceAll("/","\\")}\\${n}.teo`}static sizeOf(){return K.sizeOfString(512)+K.sizeOfVector3()+K.sizeOfRotation()+K.sizeOfInt32Array(16)+K.sizeOfFloat32Array(16)}};var mn;(function(i){i[i.None=0]="None",i[i.SetAmbience=2]="SetAmbience",i[i.SetBackgroundColor=4]="SetBackgroundColor",i[i.SetDrawDistance=8]="SetDrawDistance"})(mn||(mn={}));var qi=class i{static readFrom(t){let e=t.readString(64);t.readInt16();let n=t.readInt16();t.readVector3();let r={pos:t.readVector3(),numberOfPoints:t.readInt32(),backgroundColor:ne.readFrom(t,"rgb"),drawDistance:t.readFloat32()};t.readFloat32();let s=t.readFloat32();t.readFloat32Array(26);let a=t.readInt32();t.readInt32Array(31);let o=t.readString(128);return t.readString(128),{name:e,flags:n,...r,ambienceMaxVolume:s,height:a,ambience:o}}static allocateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e),{pos:r}=t.points[0];n.writeString(t.name,64),n.writeInt16(0);let s=mn.None;return"backgroundColor"in t&&t.backgroundColor!==void 0&&(s=s|mn.SetBackgroundColor),"drawDistance"in t&&t.drawDistance!==void 0&&(s=s|mn.SetDrawDistance),"ambience"in t&&t.ambience!==void 0&&"ambienceMaxVolume"in t&&t.ambienceMaxVolume!==void 0&&(s=s|mn.SetAmbience),n.writeInt16(s),n.writeVector3(r),n.writeVector3(r),n.writeInt32(t.points.length),"backgroundColor"in t?n.writeBuffer(ne.accumulateFrom(t?.backgroundColor??ne.black,"rgb")):n.writeBuffer(ne.accumulateFrom(ne.black,"rgb")),"drawDistance"in t?n.writeFloat32(t?.drawDistance??2800):n.writeFloat32(2800),n.writeFloat32(0),"ambienceMaxVolume"in t?n.writeFloat32(t?.ambienceMaxVolume??100):n.writeFloat32(100),n.writeFloat32Array(Zt(0,26)),"height"in t?n.writeInt32(t.height):n.writeInt32(0),n.writeInt32Array(Zt(0,31)),"ambience"in t?n.writeString(t?.ambience??"NONE",128):n.writeString("NONE",128),n.writeString("",128),e}static sizeOf(){return K.sizeOfString(64)+K.sizeOfInt16Array(2)+K.sizeOfVector3Array(2)+K.sizeOfInt32()+ne.sizeOf("rgb")+K.sizeOfFloat32Array(29)+K.sizeOfInt32Array(32)+K.sizeOfString(256)}};var Rc;(function(i){i[i.Standard=0]="Standard",i[i.Bezier=1]="Bezier",i[i.BezierControlPoint=2]="BezierControlPoint"})(Rc||(Rc={}));var Yi=class i{static readFrom(t,e){let n=t.readVector3(),r={pos:{x:n.x+e.x,y:n.y+e.y,z:n.z+e.z},type:t.readInt32(),time:t.readUint32()};return t.readFloat32Array(2),t.readInt32Array(2),t.readUint8Array(32),r}static allocateFrom(t,e){let n=new ArrayBuffer(i.sizeOf()),r=new K(n),s={x:t.pos.x-e.x,y:t.pos.y-e.y,z:t.pos.z-e.z};return r.writeVector3(s),r.writeInt32(t.type),r.writeUint32(t.time),r.writeFloat32Array(Zt(0,2)),r.writeInt32Array(Zt(0,2)),r.writeUint8Array(Zt(0,32)),n}static sizeOf(){return K.sizeOfVector3()+K.sizeOfInt32()+K.sizeOfUint32()+K.sizeOfFloat32Array(2)+K.sizeOfInt32Array(2)+K.sizeOfUint8Array(32)}};var Gr=class i{static readFrom(t){let e=i.pathToLevelIdx(t.readString(512));return t.readInt32Array(16),t.readFloat32Array(16),{levelIdx:e}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeString(i.levelIdxToPath(t.levelIdx),512),n.writeInt32Array(Zt(0,16)),n.writeFloat32Array(Zt(0,16)),e}static pathToLevelIdx(t){return Number.parseInt(t.toLowerCase().replace("graph\\levels\\level","").replace("\\",""),10)}static levelIdxToPath(t){return`Graph\\Levels\\level${t}\\`}static sizeOf(){return K.sizeOfString(512)+K.sizeOfInt32Array(16)+K.sizeOfFloat32Array(16)}};var Wr=class{static load(t){let e=new K(t),{numberOfInteractiveObjects:n,numberOfFogs:r,numberOfZonesAndPaths:s,...a}=kr.readFrom(e),o={header:a,scene:Gr.readFrom(e),interactiveObjects:le(()=>Hr.readFrom(e),n),fogs:le(()=>Vr.readFrom(e),r),paths:[],zones:[]};return e.readInt8Array(0*(204+12*64)),le(()=>{let{numberOfPoints:u,pos:h,height:f,name:d,backgroundColor:_,ambience:g,ambienceMaxVolume:m,drawDistance:p,flags:w}=qi.readFrom(e),b=le(()=>Yi.readFrom(e,h),u);if(f===0){let M={name:d,points:b};o.paths.push(M)}else{let M={name:d,points:b,height:f};w&mn.SetAmbience&&(M.ambience=g,M.ambienceMaxVolume=m),w&mn.SetBackgroundColor&&(M.backgroundColor=_),w&mn.SetDrawDistance&&(M.drawDistance=p),o.zones.push(M)}},s),o}static save(t){let e=kr.accumulateFrom(t),n=Gr.accumulateFrom(t.scene),r=$t(t.interactiveObjects.map(Hr.accumulateFrom)),s=$t(t.fogs.map(Vr.accumulateFrom)),a=0,o=12,c=new ArrayBuffer(a*(204+o*64)),l=$t(t.paths.flatMap(h=>{let f=qi.allocateFrom(h),{pos:d}=h.points[0],_=h.points.map(g=>Yi.allocateFrom(g,d));return[f,..._]})),u=$t(t.zones.flatMap(h=>{let f=qi.allocateFrom(h),{pos:d}=h.points[0],_=h.points.map(g=>Yi.allocateFrom(g,d));return[f,..._]}));return $t([e,n,r,s,c,l,u])}};var da;(function(i){i[i.None=0]="None",i[i.Blocked=8]="Blocked"})(da||(da={}));var Zi=class i{static readFrom(t){let e={pos:t.readVector3(),radius:t.readFloat32(),height:t.readFloat32(),numberOfLinkedAnchors:t.readInt16(),isBlocked:!1};return t.readInt16()&da.Blocked&&(e.isBlocked=!0),e}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);n.writeVector3(t.data.pos),n.writeFloat32(t.data.radius),n.writeFloat32(t.data.height),n.writeInt16(t.linkedAnchors.length);let r=0;return t.data.isBlocked&&(r=r|da.Blocked),n.writeInt16(r),e}static sizeOf(){return K.sizeOfVector3()+K.sizeOfFloat32Array(2)+K.sizeOfInt16Array(2)}};var Xr=class{static readFrom(t){let{numberOfLinkedAnchors:e,...n}=Zi.readFrom(t);return{data:n,linkedAnchors:t.readInt32Array(e)}}static accumulateFrom(t){let e=new ArrayBuffer(Zi.sizeOf()+t.linkedAnchors.length*4),n=new K(e);return n.writeBuffer(Zi.accumulateFrom(t)),n.writeInt32Array(t.linkedAnchors),e}};var Ki=class i{static readFrom(t){let[e,n,r,s,a]=t.readFloat32Array(5);return{x:n,y:e,z:r,u:s,v:a}}static accumulateFrom({x:t,y:e,z:n,u:r,v:s}){let a=new ArrayBuffer(i.sizeOf());return new K(a).writeFloat32Array([e,t,n,r,s]),a}static sizeOf(){return K.sizeOfFloat32Array(5)}};var _n;(function(i){i[i.None=0]="None",i[i.NoShadow=1]="NoShadow",i[i.DoubleSided=2]="DoubleSided",i[i.Transparent=4]="Transparent",i[i.Water=8]="Water",i[i.Glow=16]="Glow",i[i.Ignore=32]="Ignore",i[i.Quad=64]="Quad",i[i.Tiled=128]="Tiled",i[i.Metal=256]="Metal",i[i.Hide=512]="Hide",i[i.Stone=1024]="Stone",i[i.Wood=2048]="Wood",i[i.Gravel=4096]="Gravel",i[i.Earth=8192]="Earth",i[i.NoCollision=16384]="NoCollision",i[i.Lava=32768]="Lava",i[i.Climbable=65536]="Climbable",i[i.Falling=131072]="Falling",i[i.NoPath=262144]="NoPath",i[i.NoDraw=524288]="NoDraw",i[i.PrecisePath=1048576]="PrecisePath",i[i.LateMip=134217728]="LateMip"})(_n||(_n={}));var $i=class i{static readFrom(t){return{vertices:le(()=>Ki.readFrom(t),4),textureContainerId:t.readInt32(),norm:t.readVector3(),norm2:t.readVector3(),normals:t.readVector3Array(4),transval:t.readFloat32(),area:t.readFloat32(),flags:t.readInt32(),room:t.readInt16(),paddy:t.readInt16()}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeBuffer($t(t.vertices.map(Ki.accumulateFrom))),n.writeInt32(t.textureContainerId),n.writeVector3(t.norm),n.writeVector3(t.norm2),n.writeVector3Array(t.normals??[t.norm,t.norm,t.norm,t.norm2]),n.writeFloat32(t.transval),n.writeFloat32(t.area),n.writeInt32(t.flags),n.writeInt16(t.room),n.writeInt16(t.paddy??0),e}static sizeOf(){return Ki.sizeOf()*4+K.sizeOfInt32()+K.sizeOfVector3Array(6)+K.sizeOfFloat32Array(2)+K.sizeOfInt32()+K.sizeOfInt16Array(2)}};var Ji=class i{static readFrom(t){return{numberOfPolygons:t.readInt32(),numberOfAnchors:t.readInt32()}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeInt32(t.polygons.length),n.writeInt32(t.anchors?.length??0),e}static sizeOf(){return K.sizeOfInt32Array(2)}};var qr=class{static readFrom(t){let{numberOfPolygons:e,numberOfAnchors:n}=Ji.readFrom(t),r={polygons:le(()=>$i.readFrom(t),e)};return n>0&&(r.anchors=t.readInt32Array(n)),r}static accumulateFrom(t){let e=t.anchors??[],n=new ArrayBuffer(Ji.sizeOf()+$i.sizeOf()*t.polygons.length+K.sizeOfInt32Array(e.length)),r=new K(n);return r.writeBuffer(Ji.accumulateFrom(t)),r.writeBuffer($t(t.polygons.map($i.accumulateFrom))),r.writeInt32Array(e),n}};var fa=.14100000262260437,kh=[[2550,2600,2649.999755859375],[2649.999755859375,2700,2749.999755859375],[3949.999755859375,4e3,4050],[4294.99951171875,4299.99951171875,4305],[4299.99951171875,4299.99951171875,4300],[4599.99951171875,4599.99951171875,4600],[4899.99951171875,4900,4900],[4995,4999.99951171875,5004.99951171875],[5599.9990234375,5600,5600],[5599.99951171875,5600,5600],[5690.2626953125,5700,5709.736328125],[5695.5126953125,5700,5704.486328125],[5795,5799.99951171875,5804.99951171875],[5799.99951171875,5800,5800],[5975,6e3,6024.99951171875],[6050,6124.99951171875,6124.99951171875],[6057.666015625,6100,6142.3330078125],[6090.2626953125,6100,6109.736328125],[6174.99951171875,6174.99951171875,6250],[6199.99951171875,6199.99951171875,6200.00048828125],[6349.9990234375,6400,6450],[6439.99951171875,6525,6535],[6450,6500,6549.99951171875],[6450,6499.99951171875,6549.99951171875],[6549.9990234375,6600.0009765625,6649.9990234375],[6599.99951171875,6599.99951171875,6600.00048828125],[6749.9970703125,6800.001953125,6850],[6799.9990234375,6800,6800],[6899.99951171875,6899.99951171875,6900],[6999.99951171875,6999.99951171875,7e3],[6999.99951171875,7e3,7e3],[7049.99951171875,7125,7125],[7175,7175,7249.99951171875],[7195.00048828125,7199.99951171875,7204.99951171875],[7280,7290,7329.9990234375],[7294.99951171875,7299.99951171875,7305.00048828125],[7349.99951171875,7399.99951171875,7450.00048828125],[7350.00048828125,7399.99951171875,7449.99951171875],[7399.9990234375,7400,7400],[7399.99951171875,7399.99951171875,7400.00048828125],[7499.99951171875,7500,7500],[7565,7585,7649.9990234375],[7583.3330078125,7600,7616.666015625],[7591.8662109375,7601.7626953125,7606.3701171875],[7599.9990234375,7600,7600],[7640.0009765625,7729.9990234375,7729.9990234375],[7650,7700,7749.9990234375],[7775,7799.99951171875,7825],[7799.9990234375,7800,7800.00048828125],[7799.99951171875,7800,7800],[7950,8024.99951171875,8025],[7999.99951171875,8e3,8e3],[7999.99951171875,7999.99951171875,8e3],[8050,8124.99951171875,8125],[8099.9951171875,8100.0009765625,8100.0029296875],[8149.99951171875,8200,8250],[8149.99951171875,8225,8225],[8349.9990234375,8400,8449.9990234375],[8349.9990234375,8400,8450],[8450,8500,8549.9990234375],[8583.2490234375,8600,8616.75],[8649.9990234375,8700,8749.9990234375],[8750,8800,8849.9990234375],[8875,8875,8949.9990234375],[8909.9990234375,9045,9045],[8949.9990234375,9025,9025],[9099.9990234375,9099.9990234375,9100],[9197.515625,9199.7958984375,9202.6875],[9349.9990234375,9400,9449.9990234375],[9350,9424.9990234375,9425],[9399.9990234375,9400,9400],[9499.9990234375,9500,9500],[9549.9990234375,9599.9990234375,9650],[9650,9699.9990234375,9749.9990234375],[9699.9990234375,9700,9700],[9949.9990234375,9999.9990234375,10050],[9999.9990234375,1e4,1e4],[10049.9990234375,10100,10150],[10299.9990234375,10300,10300],[10399.9990234375,10400,10400],[10649.998046875,10700.0029296875,10749.998046875],[10649.9990234375,10699.9990234375,10750],[10849.9951171875,10900.0087890625,10949.9951171875],[11199.994140625,11200.001953125,11200.001953125],[11299.994140625,11300.001953125,11300.001953125],[11399.994140625,11400.001953125,11400.001953125],[11399.9990234375,11400,11400],[11499.994140625,11500.001953125,11500.001953125],[12049.998046875,12125,12125],[12183.3330078125,12200,12216.666015625],[12250,12299.9990234375,12350],[12899.9990234375,12899.9990234375,12900],[13199.9990234375,13200,13200],[13839.9990234375,13925,13935]];var ji=class i{static readFrom(t){let e=t.readString(256),n={levelIdx:i.pathToLevelIdx(e),numberOfUniqueHeaders:t.readInt32()};return t.readFloat32(),t.readInt32(),t.readUint32Array(3),n}static accumulateFrom(t,e){let n=new ArrayBuffer(i.sizeOf()),r=new K(n);return r.writeString(i.levelIdxToPath(t.header.levelIdx),256),r.writeInt32(t.uniqueHeaders.length),r.writeFloat32(fa),r.writeInt32(e),r.writeUint32Array(Zt(0,3)),n}static pathToLevelIdx(t){return Number.parseInt(t.toLowerCase().replace("c:\\arx\\game\\graph\\levels\\level","").replace("\\",""),10)}static levelIdxToPath(t){return`C:\\ARX\\Game\\Graph\\Levels\\level${t}\\`}static sizeOf(){return K.sizeOfString(256)+K.sizeOfInt32()+K.sizeOfFloat32()+K.sizeOfInt32()+K.sizeOfUint32Array(3)}};var Bf={color:ne.transparent,specular:ne.transparent,tu:0,tv:0},Nf={color:{r:1,g:22,b:242,a:.2980392156862745},specular:{r:0,g:92,b:200,a:.49411764705882355},tu:15694542800437951e-59,tv:2772455559201393e-53},Qi=class i{static readFrom(t){let e={pos:t.readVector3(),rhw:t.readFloat32()};return ne.readFrom(t,"abgr"),ne.readFrom(t,"abgr"),t.readFloat32(),t.readFloat32(),e}static accumulateFrom(t,e){let n=new ArrayBuffer(i.sizeOf()),r=new K(n),s=e===0,a=e===3,o;a?o=Nf:o=Bf;let{color:c,specular:l,tu:u,tv:h}=o;return r.writeVector3(t.pos),s?r.writeFloat32(t.rhw):r.writeFloat32(0),r.writeBuffer(ne.accumulateFrom(c,"abgr")),r.writeBuffer(ne.accumulateFrom(l,"abgr")),r.writeFloat32(u),r.writeFloat32(h),n}static sizeOf(){return K.sizeOfVector3()+K.sizeOfFloat32()+ne.sizeOf("abgr")*2+K.sizeOfFloat32Array(2)}};var Vh=[56,242,22,1,40,22,105,0,231,255,255,255,0,0,0,0,159,199,92,0,172,141,105,0,25,0,0,0,100,242,22,1,56,242,22,1,0,0,0,0,255,255,255,255,184,255,165,0,255,255,255,255,144,242,22,1,126,200,92,0,92,0,0,0,168,242,22,1,124,242,22,1,40,22,105,0,236,255,255,255,0,0,0,0,159,199,92,0,172,30,166,0,20,0,0,0,168,242,22,1,124,242,22,1,253,243,22,1,193,30,166,0,160,74,244,0,0,0,0,0,0,0,0,0,0,0,0,0],Rn=[...Vh];Rn[76]=Rn[76]-1;Rn[92]=Rn[92]+1;Rn[104]=Rn[104]+1;Rn[108]=Rn[108]+1;var tr=class i{static readFrom(t){t.readInt32();let e={min:t.readVector3(),max:t.readVector3(),norm:t.readVector3(),norm2:t.readVector3(),vertices:le(()=>Qi.readFrom(t),4)};t.readUint8Array(32*4),t.readVector3Array(4),t.readInt32();let n=t.readVector3();return t.readFloat32(),t.readFloat32(),t.readInt16(),t.readInt16(),{...e,center:n}}static accumulateFrom(t,e){let n=new ArrayBuffer(i.sizeOf()),r=new K(n);return r.writeInt32(_n.Quad),r.writeVector3(t.min),r.writeVector3(t.max),r.writeVector3(t.norm),r.writeVector3(t.norm2),r.writeBuffer($t(t.vertices.map((s,a)=>Qi.accumulateFrom(s,a)))),e<10?r.writeUint8Array(Vh):r.writeUint8Array(Rn),r.writeVector3Array([{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}]),r.writeInt32(0),r.writeVector3(t.center),r.writeFloat32(0),r.writeFloat32(0),r.writeInt16(0),r.writeInt16(0),n}static sizeOf(){return K.sizeOfInt32()+K.sizeOfVector3Array(4)+Qi.sizeOf()*4+K.sizeOfUint8Array(32*4)+K.sizeOfVector3Array(4)+K.sizeOfInt32()+K.sizeOfVector3()+K.sizeOfFloat32Array(2)+K.sizeOfInt16Array(2)}};var Yr=class i{static readFrom(t){return{polygon:tr.readFrom(t),room1:t.readInt32(),room2:t.readInt32(),useportal:t.readInt16(),paddy:t.readInt16()}}static accumulateFrom(t,e){let n=new ArrayBuffer(i.sizeOf()),r=new K(n);return r.writeBuffer(tr.accumulateFrom(t.polygon,e)),r.writeInt32(t.room1),r.writeInt32(t.room2),r.writeInt16(t.useportal),r.writeInt16(t.paddy),n}static sizeOf(){return tr.sizeOf()+K.sizeOfInt32Array(2)+K.sizeOfInt16Array(2)}};var Zr=class i{static readFrom(t){let[e,n,r]=t.readInt16Array(4);return{cellX:e,cellY:n,polygonIdx:r}}static accumulateFrom({cellX:t,cellY:e,polygonIdx:n}){let r=new ArrayBuffer(i.sizeOf());return new K(r).writeInt16Array([t,e,n,0]),r}static sizeOf(){return K.sizeOfInt16Array(4)}};var Kr=class i{static readFrom(t){let e={numberOfPortals:t.readInt32(),numberOfPolygons:t.readInt32()};return t.readInt32Array(6),e}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeInt32(t.portals.length),n.writeInt32(t.polygons.length),n.writeInt32Array(Zt(0,6)),e}static sizeOf(){return K.sizeOfInt32Array(8)}};var $r=class{static readFrom(t){let{numberOfPortals:e,numberOfPolygons:n}=Kr.readFrom(t);return{portals:t.readInt32Array(e),polygons:le(()=>Zr.readFrom(t),n)}}static accumulateFrom(t){let e=Kr.accumulateFrom(t),n=new ArrayBuffer(t.portals.length*4);new K(n).writeInt32Array(t.portals);let s=$t(t.polygons.map(Zr.accumulateFrom));return $t([e,n,s])}};var Jr=class i{static readFrom(t){return{distance:t.readFloat32(),startPosition:t.readVector3(),endPosition:t.readVector3()}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeFloat32(t.distance),n.writeVector3(t.startPosition),n.writeVector3(t.endPosition),e}static sizeOf(){return K.sizeOfFloat32()+K.sizeOfVector3Array(2)}};var jr=class i{static readFrom(t){t.readFloat32(),t.readInt32(),t.readInt32();let e=t.readInt32();t.readInt32();let n=t.readInt32();return t.readVector3(),{numberOfTextures:e,numberOfAnchors:n,mScenePosition:t.readVector3(),numberOfPortals:t.readInt32(),numberOfRooms:t.readInt32()+1}}static accumulateFrom(t){let e=t.polygons.map(({room:a})=>a),n=Fh(Bh(e)),r=new ArrayBuffer(i.sizeOf()),s=new K(r);return s.writeFloat32(fa),s.writeInt32(qn),s.writeInt32(di),s.writeInt32(t.textureContainers.length),s.writeInt32(t.polygons.length),s.writeInt32(t.anchors.length),s.writeVector3({x:0,y:0,z:0}),s.writeVector3(t.sceneHeader.mScenePosition),s.writeInt32(t.portals.length),s.writeInt32(n),r}static sizeOf(){return K.sizeOfFloat32()+K.sizeOfInt32Array(7)+K.sizeOfVector3Array(2)}};var er=class i{static readFrom(t){let e=t.readInt32();t.readInt32();let n=i.toRelativePath(t.readString(256));return{id:e,filename:n}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeInt32(t.id),n.writeInt32(0),n.writeString(i.toAbsolutePath(t.filename),256),e}static toRelativePath(t){return t.toLowerCase().replace("graph\\obj3d\\textures\\","")}static toAbsolutePath(t){return"graph\\obj3d\\textures\\"+t.toLowerCase()}static sizeOf(){return K.sizeOfInt32Array(2)+K.sizeOfString(256)}};var Qr=class i{static readFrom(t){return{path:t.readString(256),check:t.readUint8Array(512)}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeString(t.path,256),n.writeUint8Array(t.check),e}static sizeOf(){return K.sizeOfString(256)+K.sizeOfUint8Array(512)}};function Gh({flags:i}){return(i&_n.Quad)!==0}function Wh(i){let t=0;return i.map(e=>(e.vertices[0].llfColorIdx=t,e.vertices[1].llfColorIdx=t+1,e.vertices[2].llfColorIdx=t+2,t=t+3,Gh(e)&&(e.vertices[3].llfColorIdx=t,t=t+1),e))}function Hh(i){let[t,e,n]=i.sort((r,s)=>r-s);return kh.some(([r,s,a])=>t===r&&e===s&&n===a)}function ts([i,t,e]){let n=(i.x+t.x+e.x)/3,r=(i.z+t.z+e.z)/3,s;Hh([i.x,t.x,e.x])?s=Math.ceil(n/100):s=Math.floor(n/100);let a;return Hh([i.z,t.z,e.z])?a=Math.ceil(r/100):a=Math.floor(r/100),[s,a]}var zf=0,es=class{static load(t){let e=new K(t),{numberOfUniqueHeaders:n,...r}=ji.readFrom(e),s=le(()=>Qr.readFrom(e),n),{numberOfTextures:a,numberOfAnchors:o,numberOfPortals:c,numberOfRooms:l,...u}=jr.readFrom(e),h=le(()=>er.readFrom(e),a),f=[];for(let d=0;d<di;d++)for(let _=0;_<qn;_++)f.push(qr.readFrom(e));return{header:r,uniqueHeaders:s,sceneHeader:u,textureContainers:h,cells:f.map(({polygons:d,..._})=>_),polygons:Wh(f.flatMap(({polygons:d})=>d)),anchors:le(()=>Xr.readFrom(e),o),portals:le(()=>Yr.readFrom(e),c),rooms:le(()=>$r.readFrom(e),l),roomDistances:le(()=>Jr.readFrom(e),l**2)}}static save(t,e=!0){let{levelIdx:n}=t.header,r=jr.accumulateFrom(t),s=t.cells.map(g=>({...g,polygons:[]}));t.polygons.forEach(g=>{let[m,p]=ts(g.vertices),w=p*qn+m;s[w].polygons.push(g)});let a=$t(t.textureContainers.map(er.accumulateFrom)),o=$t(s.map(qr.accumulateFrom)),c=$t(t.anchors.map(Xr.accumulateFrom)),l=$t(t.portals.map(g=>Yr.accumulateFrom(g,n))),u=$t(t.rooms.map($r.accumulateFrom)),h=$t(t.roomDistances.map(Jr.accumulateFrom)),f=$t([r,a,o,c,l,u,h]),d;e?d=ji.accumulateFrom(t,f.byteLength):d=ji.accumulateFrom(t,zf);let _=$t(t.uniqueHeaders.map(Qr.accumulateFrom));return $t([d,_,f])}};var Pc;(function(i){i[i.None=0]="None",i[i.SemiDynamic=1]="SemiDynamic",i[i.Extinguishable=2]="Extinguishable",i[i.StartExtinguished=4]="StartExtinguished",i[i.SpawnFire=8]="SpawnFire",i[i.SpawnSmoke=16]="SpawnSmoke",i[i.Off=32]="Off",i[i.ColorLegacy=64]="ColorLegacy",i[i.NoCasted=128]="NoCasted",i[i.FixFlareSize=256]="FixFlareSize",i[i.Fireplace=512]="Fireplace",i[i.NoIgnit=1024]="NoIgnit",i[i.Flare=2048]="Flare"})(Pc||(Pc={}));var ns=class i{static readFrom(t){let e={pos:t.readVector3(),color:ne.readFrom(t,"rgb"),fallStart:t.readFloat32(),fallEnd:t.readFloat32(),intensity:t.readFloat32()};t.readFloat32();let n={exFlicker:ne.readFrom(t,"rgb"),exRadius:t.readFloat32(),exFrequency:t.readFloat32(),exSize:t.readFloat32(),exSpeed:t.readFloat32(),exFlareSize:t.readFloat32()};t.readFloat32Array(24);let r=t.readInt32();return t.readInt32Array(31),{...e,...n,flags:r}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeVector3(t.pos),n.writeBuffer(ne.accumulateFrom(t.color,"rgb")),n.writeFloat32(t.fallStart),n.writeFloat32(t.fallEnd),n.writeFloat32(t.intensity),n.writeFloat32(0),n.writeBuffer(ne.accumulateFrom(t.exFlicker,"rgb")),n.writeFloat32(t.exRadius),n.writeFloat32(t.exFrequency),n.writeFloat32(t.exSize),n.writeFloat32(zh(0,Number.MAX_SAFE_INTEGER,t.exSpeed)),n.writeFloat32(t.exFlareSize),n.writeFloat32Array(Zt(0,24)),n.writeInt32(t.flags),n.writeInt32Array(Zt(0,31)),e}static sizeOf(){return K.sizeOfVector3()+ne.sizeOf("rgb")*2+K.sizeOfFloat32Array(33)+K.sizeOfInt32Array(32)}};var is=class i{static readFrom(t){let e=t.readInt32();return t.readInt32(),t.readInt32(),t.readInt32(),{numberOfColors:e}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeInt32(t.length),n.writeInt32(0),n.writeInt32(63),n.writeInt32(0),e}static sizeOf(){return K.sizeOfInt32()*4}};var rs=class i{static readFrom(t){t.readFloat32(),t.readString(16);let e={lastUser:t.readString(256),time:t.readInt32(),numberOfLights:t.readInt32()};t.readInt32(),t.readInt32();let n=t.readInt32();return t.readInt32Array(256),t.readFloat32Array(256),t.readString(4096),t.readInt32Array(256),{...e,numberOfBackgroundPolygons:n}}static accumulateFrom(t){let e=new ArrayBuffer(i.sizeOf()),n=new K(e);return n.writeFloat32(la),n.writeString("DANAE_LLH_FILE",16),n.writeString(t.header.lastUser,256),n.writeInt32(t.header.time),n.writeInt32(t.lights.length),n.writeInt32(0),n.writeInt32(0),n.writeInt32(t.header.numberOfBackgroundPolygons),n.writeInt32Array(Zt(0,256)),n.writeFloat32Array(Zt(0,256)),n.writeString("",4096),n.writeInt32Array(Zt(0,256)),e}static sizeOf(){return K.sizeOfFloat32()+K.sizeOfString(272)+K.sizeOfInt32Array(261)+K.sizeOfFloat32Array(256)+K.sizeOfString(4096)+K.sizeOfInt32Array(256)}};var ss=class{static load(t){let e=new K(t),{numberOfLights:n,...r}=rs.readFrom(e),s=le(()=>ns.readFrom(e),n),{numberOfColors:a}=is.readFrom(e),o=le(()=>ne.readFrom(e,"bgra"),a);return{header:r,lights:s,colors:o}}static save(t){let e=rs.accumulateFrom(t),n=$t(t.lights.map(ns.accumulateFrom)),r=is.accumulateFrom(t.colors),s=$t(t.colors.map(a=>ne.accumulateFrom(a,"bgra")));return $t([e,n,r,s])}};var Dc;(function(i){i[i.Flat=0]="Flat",i[i.Text=1]="Text",i[i.DoubleSided=2]="DoubleSided"})(Dc||(Dc={}));var Lc;(function(i){i[i.None=0]="None",i[i.Random=1]="Random",i[i.Interpolate=2]="Interpolate"})(Lc||(Lc={}));var Oc;(function(i){i[i.None=0]="None",i[i.Position=1]="Position",i[i.Master=4]="Master",i[i.Paused=16]="Paused",i[i.Prefetched=32]="Prefetched"})(Oc||(Oc={}));var pf=Df(qh(),1);var po="171",si={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ai={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wu=0,dl=1,Mu=2;var fl=1,Eu=2,Sn=3,Nn=0,Ie=1,wn=2,Hn=0,yi=1,pl=2,ml=3,_l=4,Au=5,ti=100,Tu=101,Cu=102,Iu=103,Ru=104,Pu=200,Du=201,Lu=202,Ou=203,ka=204,Va=205,Uu=206,Fu=207,Bu=208,Nu=209,zu=210,ku=211,Vu=212,Hu=213,Gu=214,mo=0,_o=1,go=2,vi=3,xo=4,yo=5,vo=6,bo=7,gl=0,Wu=1,Xu=2,Gn=0,qu=1,Yu=2,Zu=3,Ku=4,$u=5,Ju=6,ju=7;var xl=300,Ci=301,Ii=302,So=303,wo=304,Hs=306,bi=1e3,Qn=1001,Ha=1002,nn=1003,Qu=1004;var Gs=1005;var pn=1006,Mo=1007;var oi=1008;var Mn=1009,yl=1010,vl=1011,Tr=1012,Eo=1013,ci=1014,En=1015,Cr=1016,Ao=1017,To=1018,Ri=1020,bl=35902,Sl=1021,wl=1022,an=1023,Ml=1024,El=1025,xi=1026,Si=1027,Al=1028,Co=1029,Tl=1030,Io=1031;var Ro=1033,Ws=33776,Xs=33777,qs=33778,Ys=33779,Po=35840,Do=35841,Lo=35842,Oo=35843,Uo=36196,Fo=37492,Bo=37496,No=37808,zo=37809,ko=37810,Vo=37811,Ho=37812,Go=37813,Wo=37814,Xo=37815,qo=37816,Yo=37817,Zo=37818,Ko=37819,$o=37820,Jo=37821,Zs=36492,jo=36494,Qo=36495,Cl=36283,tc=36284,ec=36285,nc=36286;var _s=2300,Ga=2301,za=2302,sl=2400,al=2401,ol=2402;var td=3200,ed=3201;var nd=0,id=1,Wn="",ze="srgb",wi="srgb-linear",gs="linear",ae="srgb";var gi=7680;var cl=519,rd=512,sd=513,ad=514,Il=515,od=516,cd=517,ld=518,hd=519,Wa=35044;var Rl="300 es",gn=2e3,xs=2001,xn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let r=this._listeners[t];if(r!==void 0){let s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}},Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yh=1234567,ps=Math.PI/180,yr=180/Math.PI;function Fn(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]).toLowerCase()}function Wt(i,t,e){return Math.max(t,Math.min(e,i))}function Pl(i,t){return(i%t+t)%t}function Vf(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function Hf(i,t,e){return i!==t?(e-i)/(t-i):0}function ms(i,t,e){return(1-e)*i+e*t}function Gf(i,t,e,n){return ms(i,t,1-Math.exp(-e*n))}function Wf(i,t=1){return t-Math.abs(Pl(i,t*2)-t)}function Xf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function qf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Yf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Zf(i,t){return i+Math.random()*(t-i)}function Kf(i){return i*(.5-Math.random())}function $f(i){i!==void 0&&(Yh=i);let t=Yh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Jf(i){return i*ps}function jf(i){return i*yr}function Qf(i){return(i&i-1)===0&&i!==0}function tp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ep(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function np(i,t,e,n,r){let s=Math.cos,a=Math.sin,o=s(e/2),c=a(e/2),l=s((t+n)/2),u=a((t+n)/2),h=s((t-n)/2),f=a((t-n)/2),d=s((n-t)/2),_=a((n-t)/2);switch(r){case"XYX":i.set(o*u,c*h,c*f,o*l);break;case"YZY":i.set(c*f,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*f,o*u,o*l);break;case"XZX":i.set(o*u,c*_,c*d,o*l);break;case"YXY":i.set(c*d,o*u,c*_,o*l);break;case"ZYZ":i.set(c*_,c*d,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function fn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function se(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Pi={DEG2RAD:ps,RAD2DEG:yr,generateUUID:Fn,clamp:Wt,euclideanModulo:Pl,mapLinear:Vf,inverseLerp:Hf,lerp:ms,damp:Gf,pingpong:Wf,smoothstep:Xf,smootherstep:qf,randInt:Yf,randFloat:Zf,randFloatSpread:Kf,seededRandom:$f,degToRad:Jf,radToDeg:jf,isPowerOfTwo:Qf,ceilPowerOfTwo:tp,floorPowerOfTwo:ep,setQuaternionFromProperEuler:np,normalize:se,denormalize:fn},Pt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},kt=class i{constructor(t,e,n,r,s,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,c,l)}set(t,e,n,r,s,a,o,c,l){let u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],_=n[8],g=r[0],m=r[3],p=r[6],w=r[1],b=r[4],M=r[7],D=r[2],P=r[5],E=r[8];return s[0]=a*g+o*w+c*D,s[3]=a*m+o*b+c*P,s[6]=a*p+o*M+c*E,s[1]=l*g+u*w+h*D,s[4]=l*m+u*b+h*P,s[7]=l*p+u*M+h*E,s[2]=f*g+d*w+_*D,s[5]=f*m+d*b+_*P,s[8]=f*p+d*M+_*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,f=o*c-u*s,d=l*s-a*c,_=e*h+n*f+r*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/_;return t[0]=h*g,t[1]=(r*l-u*n)*g,t[2]=(o*n-r*a)*g,t[3]=f*g,t[4]=(u*e-r*c)*g,t[5]=(r*s-o*e)*g,t[6]=d*g,t[7]=(n*c-l*e)*g,t[8]=(a*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-r*l,r*c,-r*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Fc.makeScale(t,e)),this}rotate(t){return this.premultiply(Fc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Fc=new kt;function Dl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function vr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ud(){let i=vr("canvas");return i.style.display="block",i}var Zh={};function Di(i){i in Zh||(Zh[i]=!0,console.warn(i))}function dd(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function fd(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function pd(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Kh=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$h=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ip(){let i={enabled:!0,workingColorSpace:wi,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ae&&(r.r=Bn(r.r),r.g=Bn(r.g),r.b=Bn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(r.r=xr(r.r),r.g=xr(r.g),r.b=xr(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Wn?gs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[wi]:{primaries:t,whitePoint:n,transfer:gs,toXYZ:Kh,fromXYZ:$h,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ze},outputColorSpaceConfig:{drawingBufferColorSpace:ze}},[ze]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:Kh,fromXYZ:$h,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ze}}}),i}var Jt=ip();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function xr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var nr,Xa=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{nr===void 0&&(nr=vr("canvas")),nr.width=t.width,nr.height=t.height;let n=nr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=nr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=vr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Bn(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},rp=0,ys=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=Fn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Bc(r[a].image)):s.push(Bc(r[a]))}else s=Bc(r);n.url=s}return e||(t.images[this.uuid]=n),n}};function Bc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var sp=0,ke=class i extends xn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Qn,r=Qn,s=pn,a=oi,o=an,c=Mn,l=i.DEFAULT_ANISOTROPY,u=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=Fn(),this.name="",this.source=new ys(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Pt(0,0),this.repeat=new Pt(1,1),this.center=new Pt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bi:t.x=t.x-Math.floor(t.x);break;case Qn:t.x=t.x<0?0:1;break;case Ha:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bi:t.y=t.y-Math.floor(t.y);break;case Qn:t.y=t.y<0?0:1;break;case Ha:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=xl;ke.DEFAULT_ANISOTROPY=1;var ie=class i{constructor(t=0,e=0,n=0,r=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s,c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],_=c[9],g=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(l+1)/2,M=(d+1)/2,D=(p+1)/2,P=(u+f)/4,E=(h+g)/4,O=(_+m)/4;return b>M&&b>D?b<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(b),r=P/n,s=E/n):M>D?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=P/r,s=O/r):D<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),n=E/s,r=O/s),this.set(n,r,s,e),this}let w=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(f-u)*(f-u));return Math.abs(w)<.001&&(w=1),this.x=(m-_)/w,this.y=(h-g)/w,this.z=(f-u)/w,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this.w=Wt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this.w=Wt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qa=class extends xn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);let r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new ke(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ys(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},yn=class extends qa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},vs=class extends ke{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ya=class extends ke{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=nn,this.minFilter=nn,this.wrapR=Qn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ae=class{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3],f=s[a+0],d=s[a+1],_=s[a+2],g=s[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=_,t[e+3]=g;return}if(h!==g||c!==f||l!==d||u!==_){let m=1-o,p=c*f+l*d+u*_+h*g,w=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){let D=Math.sqrt(b),P=Math.atan2(D,p*w);m=Math.sin(m*P)/D,o=Math.sin(o*P)/D}let M=o*w;if(c=c*m+f*M,l=l*m+d*M,u=u*m+_*M,h=h*m+g*M,m===1-o){let D=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=D,l*=D,u*=D,h*=D}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,a){let o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[a],f=s[a+1],d=s[a+2],_=s[a+3];return t[e]=o*_+u*h+c*d-l*f,t[e+1]=c*_+u*f+l*h-o*d,t[e+2]=l*_+u*d+o*f-c*h,t[e+3]=u*_-o*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),h=o(s/2),f=c(n/2),d=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=f*u*h+l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h-f*d*_;break;case"YXZ":this._x=f*u*h+l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h+f*d*_;break;case"ZXY":this._x=f*u*h-l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h-f*d*_;break;case"ZYX":this._x=f*u*h-l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h+f*d*_;break;case"YZX":this._x=f*u*h+l*d*_,this._y=l*d*h+f*u*_,this._z=l*u*_-f*d*h,this._w=l*u*h-f*d*_;break;case"XZY":this._x=f*u*h-l*d*_,this._y=l*d*h-f*u*_,this._z=l*u*_+f*d*h,this._w=l*u*h+f*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(a-r)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(u-c)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+l)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(s-l)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(a-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Wt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,r=this._y,s=this._z,a=this._w,o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;let c=1-o*o;if(c<=Number.EPSILON){let d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Jh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Jh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*r-o*n),u=2*(o*e-s*r),h=2*(s*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-s*h,this.z=r+c*h+s*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Wt(this.x,t.x,e.x),this.y=Wt(this.y,t.y,e.y),this.z=Wt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Wt(this.x,t,e),this.y=Wt(this.y,t,e),this.z=Wt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Wt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Nc.copy(this).projectOnVector(t),this.sub(Nc)}reflect(t){return this.sub(Nc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Wt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Nc=new V,Jh=new Ae,Ge=class{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(s,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),pa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),pa.copy(n.boundingBox)),pa.applyMatrix4(t.matrixWorld),this.union(pa)}let r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(as),ma.subVectors(this.max,as),ir.subVectors(t.a,as),rr.subVectors(t.b,as),sr.subVectors(t.c,as),Yn.subVectors(rr,ir),Zn.subVectors(sr,rr),fi.subVectors(ir,sr);let e=[0,-Yn.z,Yn.y,0,-Zn.z,Zn.y,0,-fi.z,fi.y,Yn.z,0,-Yn.x,Zn.z,0,-Zn.x,fi.z,0,-fi.x,-Yn.y,Yn.x,0,-Zn.y,Zn.x,0,-fi.y,fi.x,0];return!zc(e,ir,rr,sr,ma)||(e=[1,0,0,0,1,0,0,0,1],!zc(e,ir,rr,sr,ma))?!1:(_a.crossVectors(Yn,Zn),e=[_a.x,_a.y,_a.z],zc(e,ir,rr,sr,ma))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Pn=[new V,new V,new V,new V,new V,new V,new V,new V],hn=new V,pa=new Ge,ir=new V,rr=new V,sr=new V,Yn=new V,Zn=new V,fi=new V,as=new V,ma=new V,_a=new V,pi=new V;function zc(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){pi.fromArray(i,s);let o=r.x*Math.abs(pi.x)+r.y*Math.abs(pi.y)+r.z*Math.abs(pi.z),c=t.dot(pi),l=e.dot(pi),u=n.dot(pi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var ap=new Ge,os=new V,kc=new V,vn=class{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ap.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;os.subVectors(t,this.center);let e=os.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(os,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(os.copy(t.center).add(kc)),this.expandByPoint(os.copy(t.center).sub(kc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Dn=new V,Vc=new V,ga=new V,Kn=new V,Hc=new V,xa=new V,Gc=new V,ei=class{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Vc.copy(t).add(e).multiplyScalar(.5),ga.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(Vc);let s=t.distanceTo(e)*.5,a=-this.direction.dot(ga),o=Kn.dot(this.direction),c=-Kn.dot(ga),l=Kn.lengthSq(),u=Math.abs(1-a*a),h,f,d,_;if(u>0)if(h=a*c-o,f=a*o-c,_=s*u,h>=0)if(f>=-_)if(f<=_){let g=1/u;h*=g,f*=g,d=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f<=-_?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=_?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Vc).addScaledVector(ga,f),d}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),r=Dn.dot(Dn)-n*n,s=t.radius*t.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,r=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,r=(t.min.x-f.x)*l),u>=0?(s=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,r,s){Hc.subVectors(e,t),xa.subVectors(n,t),Gc.crossVectors(Hc,xa);let a=this.direction.dot(Gc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Kn.subVectors(this.origin,t);let c=o*this.direction.dot(xa.crossVectors(Kn,xa));if(c<0)return null;let l=o*this.direction.dot(Hc.cross(Kn));if(l<0||c+l>a)return null;let u=-o*Kn.dot(Gc);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},he=class i{constructor(t,e,n,r,s,a,o,c,l,u,h,f,d,_,g,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,c,l,u,h,f,d,_,g,m)}set(t,e,n,r,s,a,o,c,l,u,h,f,d,_,g,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,r=1/ar.setFromMatrixColumn(t,0).length(),s=1/ar.setFromMatrixColumn(t,1).length(),a=1/ar.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){let f=a*u,d=a*h,_=o*u,g=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=d+_*l,e[5]=f-g*l,e[9]=-o*c,e[2]=g-f*l,e[6]=_+d*l,e[10]=a*c}else if(t.order==="YXZ"){let f=c*u,d=c*h,_=l*u,g=l*h;e[0]=f+g*o,e[4]=_*o-d,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=d*o-_,e[6]=g+f*o,e[10]=a*c}else if(t.order==="ZXY"){let f=c*u,d=c*h,_=l*u,g=l*h;e[0]=f-g*o,e[4]=-a*h,e[8]=_+d*o,e[1]=d+_*o,e[5]=a*u,e[9]=g-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let f=a*u,d=a*h,_=o*u,g=o*h;e[0]=c*u,e[4]=_*l-d,e[8]=f*l+g,e[1]=c*h,e[5]=g*l+f,e[9]=d*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let f=a*c,d=a*l,_=o*c,g=o*l;e[0]=c*u,e[4]=g-f*h,e[8]=_*h+d,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=d*h+_,e[10]=f-g*h}else if(t.order==="XZY"){let f=a*c,d=a*l,_=o*c,g=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+g,e[5]=a*u,e[9]=d*h-_,e[2]=_*h-d,e[6]=o*u,e[10]=g*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(op,t,cp)}lookAt(t,e,n){let r=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),$n.crossVectors(n,Ye),$n.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),$n.crossVectors(n,Ye)),$n.normalize(),ya.crossVectors(Ye,$n),r[0]=$n.x,r[4]=ya.x,r[8]=Ye.x,r[1]=$n.y,r[5]=ya.y,r[9]=Ye.y,r[2]=$n.z,r[6]=ya.z,r[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],_=n[2],g=n[6],m=n[10],p=n[14],w=n[3],b=n[7],M=n[11],D=n[15],P=r[0],E=r[4],O=r[8],T=r[12],x=r[1],C=r[5],y=r[9],U=r[13],q=r[2],G=r[6],J=r[10],X=r[14],Z=r[3],k=r[7],N=r[11],ut=r[15];return s[0]=a*P+o*x+c*q+l*Z,s[4]=a*E+o*C+c*G+l*k,s[8]=a*O+o*y+c*J+l*N,s[12]=a*T+o*U+c*X+l*ut,s[1]=u*P+h*x+f*q+d*Z,s[5]=u*E+h*C+f*G+d*k,s[9]=u*O+h*y+f*J+d*N,s[13]=u*T+h*U+f*X+d*ut,s[2]=_*P+g*x+m*q+p*Z,s[6]=_*E+g*C+m*G+p*k,s[10]=_*O+g*y+m*J+p*N,s[14]=_*T+g*U+m*X+p*ut,s[3]=w*P+b*x+M*q+D*Z,s[7]=w*E+b*C+M*G+D*k,s[11]=w*O+b*y+M*J+D*N,s[15]=w*T+b*U+M*X+D*ut,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],_=t[3],g=t[7],m=t[11],p=t[15];return _*(+s*c*h-r*l*h-s*o*f+n*l*f+r*o*d-n*c*d)+g*(+e*c*d-e*l*f+s*a*f-r*a*d+r*l*u-s*c*u)+m*(+e*l*h-e*o*d-s*a*h+n*a*d+s*o*u-n*l*u)+p*(-r*o*u-e*c*h+e*o*f+r*a*h-n*a*f+n*c*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],_=t[12],g=t[13],m=t[14],p=t[15],w=h*m*l-g*f*l+g*c*d-o*m*d-h*c*p+o*f*p,b=_*f*l-u*m*l-_*c*d+a*m*d+u*c*p-a*f*p,M=u*g*l-_*h*l+_*o*d-a*g*d-u*o*p+a*h*p,D=_*h*c-u*g*c-_*o*f+a*g*f+u*o*m-a*h*m,P=e*w+n*b+r*M+s*D;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/P;return t[0]=w*E,t[1]=(g*f*s-h*m*s-g*r*d+n*m*d+h*r*p-n*f*p)*E,t[2]=(o*m*s-g*c*s+g*r*l-n*m*l-o*r*p+n*c*p)*E,t[3]=(h*c*s-o*f*s-h*r*l+n*f*l+o*r*d-n*c*d)*E,t[4]=b*E,t[5]=(u*m*s-_*f*s+_*r*d-e*m*d-u*r*p+e*f*p)*E,t[6]=(_*c*s-a*m*s-_*r*l+e*m*l+a*r*p-e*c*p)*E,t[7]=(a*f*s-u*c*s+u*r*l-e*f*l-a*r*d+e*c*d)*E,t[8]=M*E,t[9]=(_*h*s-u*g*s-_*n*d+e*g*d+u*n*p-e*h*p)*E,t[10]=(a*g*s-_*o*s+_*n*l-e*g*l-a*n*p+e*o*p)*E,t[11]=(u*o*s-a*h*s-u*n*l+e*h*l+a*n*d-e*o*d)*E,t[12]=D*E,t[13]=(u*g*r-_*h*r+_*n*f-e*g*f-u*n*m+e*h*m)*E,t[14]=(_*o*r-a*g*r-_*n*c+e*g*c+a*n*m-e*o*m)*E,t[15]=(a*h*r-u*o*r+u*n*c-e*h*c-a*n*f+e*o*f)*E,this}scale(t){let e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){let r=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,u=a+a,h=o+o,f=s*l,d=s*u,_=s*h,g=a*u,m=a*h,p=o*h,w=c*l,b=c*u,M=c*h,D=n.x,P=n.y,E=n.z;return r[0]=(1-(g+p))*D,r[1]=(d+M)*D,r[2]=(_-b)*D,r[3]=0,r[4]=(d-M)*P,r[5]=(1-(f+p))*P,r[6]=(m+w)*P,r[7]=0,r[8]=(_+b)*E,r[9]=(m-w)*E,r[10]=(1-(f+g))*E,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){let r=this.elements,s=ar.set(r[0],r[1],r[2]).length(),a=ar.set(r[4],r[5],r[6]).length(),o=ar.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],un.copy(this);let l=1/s,u=1/a,h=1/o;return un.elements[0]*=l,un.elements[1]*=l,un.elements[2]*=l,un.elements[4]*=u,un.elements[5]*=u,un.elements[6]*=u,un.elements[8]*=h,un.elements[9]*=h,un.elements[10]*=h,e.setFromRotationMatrix(un),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=gn){let c=this.elements,l=2*s/(e-t),u=2*s/(n-r),h=(e+t)/(e-t),f=(n+r)/(n-r),d,_;if(o===gn)d=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===xs)d=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=gn){let c=this.elements,l=1/(e-t),u=1/(n-r),h=1/(a-s),f=(e+t)*l,d=(n+r)*u,_,g;if(o===gn)_=(a+s)*h,g=-2*h;else if(o===xs)_=s*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ar=new V,un=new he,op=new V(0,0,0),cp=new V(1,1,1),$n=new V,ya=new V,Ye=new V,jh=new he,Qh=new Ae,bn=class i{constructor(t=0,e=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return jh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qh.setFromEuler(this),this.setFromQuaternion(Qh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bn.DEFAULT_ORDER="XYZ";var br=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},lp=0,tu=new V,or=new Ae,Ln=new he,va=new V,cs=new V,hp=new V,up=new Ae,eu=new V(1,0,0),nu=new V(0,1,0),iu=new V(0,0,1),ru={type:"added"},dp={type:"removed"},cr={type:"childadded",child:null},Wc={type:"childremoved",child:null},Te=class i extends xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lp++}),this.uuid=Fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new V,e=new bn,n=new Ae,r=new V(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new he},normalMatrix:{value:new kt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return or.setFromAxisAngle(t,e),this.quaternion.multiply(or),this}rotateOnWorldAxis(t,e){return or.setFromAxisAngle(t,e),this.quaternion.premultiply(or),this}rotateX(t){return this.rotateOnAxis(eu,t)}rotateY(t){return this.rotateOnAxis(nu,t)}rotateZ(t){return this.rotateOnAxis(iu,t)}translateOnAxis(t,e){return tu.copy(t).applyQuaternion(this.quaternion),this.position.add(tu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(eu,t)}translateY(t){return this.translateOnAxis(nu,t)}translateZ(t){return this.translateOnAxis(iu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?va.copy(t):va.set(t,e,n);let r=this.parent;this.updateWorldMatrix(!0,!1),cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(cs,va,this.up):Ln.lookAt(va,cs,this.up),this.quaternion.setFromRotationMatrix(Ln),r&&(Ln.extractRotation(r.matrixWorld),or.setFromRotationMatrix(Ln),this.quaternion.premultiply(or.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ru),cr.child=t,this.dispatchEvent(cr),cr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(dp),Wc.child=t,this.dispatchEvent(Wc),Wc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ru),cr.child=t,this.dispatchEvent(cr),cr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,t,hp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cs,up,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),d=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let r=t.children[n];this.add(r.clone())}return this}};Te.DEFAULT_UP=new V(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dn=new V,On=new V,Xc=new V,Un=new V,lr=new V,hr=new V,su=new V,qc=new V,Yc=new V,Zc=new V,Kc=new ie,$c=new ie,Jc=new ie,en=class i{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),dn.subVectors(t,e),r.cross(dn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){dn.subVectors(r,e),On.subVectors(n,e),Xc.subVectors(t,e);let a=dn.dot(dn),o=dn.dot(On),c=dn.dot(Xc),l=On.dot(On),u=On.dot(Xc),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;let f=1/h,d=(l*c-o*u)*f,_=(a*u-o*c)*f;return s.set(1-d-_,_,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,n,r,s,a,o,c){return this.getBarycoord(t,e,n,r,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Un.x),c.addScaledVector(a,Un.y),c.addScaledVector(o,Un.z),c)}static getInterpolatedAttribute(t,e,n,r,s,a){return Kc.setScalar(0),$c.setScalar(0),Jc.setScalar(0),Kc.fromBufferAttribute(t,e),$c.fromBufferAttribute(t,n),Jc.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(Kc,s.x),a.addScaledVector($c,s.y),a.addScaledVector(Jc,s.z),a}static isFrontFacing(t,e,n,r){return dn.subVectors(n,e),On.subVectors(t,e),dn.cross(On).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),dn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return i.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,r=this.b,s=this.c,a,o;lr.subVectors(r,n),hr.subVectors(s,n),qc.subVectors(t,n);let c=lr.dot(qc),l=hr.dot(qc);if(c<=0&&l<=0)return e.copy(n);Yc.subVectors(t,r);let u=lr.dot(Yc),h=hr.dot(Yc);if(u>=0&&h<=u)return e.copy(r);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(lr,a);Zc.subVectors(t,s);let d=lr.dot(Zc),_=hr.dot(Zc);if(_>=0&&d<=_)return e.copy(s);let g=d*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(hr,o);let m=u*_-d*h;if(m<=0&&h-u>=0&&d-_>=0)return su.subVectors(s,r),o=(h-u)/(h-u+(d-_)),e.copy(r).addScaledVector(su,o);let p=1/(m+g+f);return a=g*p,o=f*p,e.copy(n).addScaledVector(lr,a).addScaledVector(hr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},md={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},ba={h:0,s:0,l:0};function jc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Xt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Jt.workingColorSpace){if(t=Pl(t,1),e=Wt(e,0,1),n=Wt(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=jc(a,s,t+1/3),this.g=jc(a,s,t),this.b=jc(a,s,t-1/3)}return Jt.toWorkingColorSpace(this,r),this}setStyle(t,e=ze){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){let n=md[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=xr(t.r),this.g=xr(t.g),this.b=xr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return Jt.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Wt(Ue.r*255,0,255))*65536+Math.round(Wt(Ue.g*255,0,255))*256+Math.round(Wt(Ue.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Ue.copy(this),e);let n=Ue.r,r=Ue.g,s=Ue.b,a=Math.max(n,r,s),o=Math.min(n,r,s),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=ze){Jt.fromWorkingColorSpace(Ue.copy(this),t);let e=Ue.r,n=Ue.g,r=Ue.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(ba);let n=ms(Jn.h,ba.h,e),r=ms(Jn.s,ba.s,e),s=ms(Jn.l,ba.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ue=new Xt;Xt.NAMES=md;var fp=0,zn=class extends xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=Fn(),this.name="",this.type="Material",this.blending=yi,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ka,this.blendDst=Va,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ka&&(n.blendSrc=this.blendSrc),this.blendDst!==Va&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(e){let s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ke=class extends zn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=gl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var xe=new V,Sa=new Pt,ye=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Wa,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Sa.fromBufferAttribute(this,e),Sa.applyMatrix3(t),this.setXY(e,Sa.x,Sa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fn(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fn(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fn(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),r=se(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),r=se(r,this.array),s=se(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Wa&&(t.usage=this.usage),t}};var bs=class extends ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ss=class extends ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var de=class extends ye{constructor(t,e,n){super(new Float32Array(t),e,n)}},pp=0,Qe=new he,Qc=new Te,ur=new V,Ze=new Ge,ls=new Ge,Me=new V,ve=class i extends xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pp++}),this.uuid=Fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dl(t)?Ss:bs)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new kt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,n){return Qe.makeTranslation(t,e,n),this.applyMatrix4(Qe),this}scale(t,e,n){return Qe.makeScale(t,e,n),this.applyMatrix4(Qe),this}lookAt(t){return Qc.lookAt(t),Qc.updateMatrix(),this.applyMatrix4(Qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ur).negate(),this.translate(ur.x,ur.y,ur.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let r=0,s=t.length;r<s;r++){let a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new de(n,3))}else{let n=Math.min(t.length,e.count);for(let r=0;r<n;r++){let s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ge);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){let s=e[n];Ze.setFromBufferAttribute(s),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){let n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Me.addVectors(Ze.min,ls.min),Ze.expandByPoint(Me),Me.addVectors(Ze.max,ls.max),Ze.expandByPoint(Me)):(Ze.expandByPoint(ls.min),Ze.expandByPoint(ls.max))}Ze.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)Me.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Me));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Me.fromBufferAttribute(o,l),c&&(ur.fromBufferAttribute(t,l),Me.add(ur)),r=Math.max(r,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ye(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let O=0;O<n.count;O++)o[O]=new V,c[O]=new V;let l=new V,u=new V,h=new V,f=new Pt,d=new Pt,_=new Pt,g=new V,m=new V;function p(O,T,x){l.fromBufferAttribute(n,O),u.fromBufferAttribute(n,T),h.fromBufferAttribute(n,x),f.fromBufferAttribute(s,O),d.fromBufferAttribute(s,T),_.fromBufferAttribute(s,x),u.sub(l),h.sub(l),d.sub(f),_.sub(f);let C=1/(d.x*_.y-_.x*d.y);isFinite(C)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-d.y).multiplyScalar(C),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(C),o[O].add(g),o[T].add(g),o[x].add(g),c[O].add(m),c[T].add(m),c[x].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let O=0,T=w.length;O<T;++O){let x=w[O],C=x.start,y=x.count;for(let U=C,q=C+y;U<q;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}let b=new V,M=new V,D=new V,P=new V;function E(O){D.fromBufferAttribute(r,O),P.copy(D);let T=o[O];b.copy(T),b.sub(D.multiplyScalar(D.dot(T))).normalize(),M.crossVectors(P,T);let C=M.dot(c[O])<0?-1:1;a.setXYZW(O,b.x,b.y,b.z,C)}for(let O=0,T=w.length;O<T;++O){let x=w[O],C=x.start,y=x.count;for(let U=C,q=C+y;U<q;U+=3)E(t.getX(U+0)),E(t.getX(U+1)),E(t.getX(U+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let r=new V,s=new V,a=new V,o=new V,c=new V,l=new V,u=new V,h=new V;if(t)for(let f=0,d=t.count;f<d;f+=3){let _=t.getX(f+0),g=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,_),s.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(o,c){let l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u),d=0,_=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?d=c[g]*o.data.stride+o.offset:d=c[g]*u;for(let p=0;p<u;p++)f[_++]=l[d++]}return new ye(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,r=this.attributes;for(let o in r){let c=r[o],l=t(c,n);e.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){let f=l[u],d=t(f,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let r=t.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(e))}let s=t.morphAttributes;for(let l in s){let u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,u=a.length;l<u;l++){let h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},au=new he,mi=new ei,wa=new vn,ou=new V,Ma=new V,Ea=new V,Aa=new V,tl=new V,Ta=new V,cu=new V,Ca=new V,fe=class extends Te{constructor(t=new ve,e=new Ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);let o=this.morphTargetInfluences;if(s&&o){Ta.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=o[c],h=s[c];u!==0&&(tl.fromBufferAttribute(h,t),a?Ta.addScaledVector(tl,u):Ta.addScaledVector(tl.sub(e),u))}e.add(Ta)}return e}raycast(t,e){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(s),mi.copy(t.ray).recast(t.near),!(wa.containsPoint(mi.origin)===!1&&(mi.intersectSphere(wa,ou)===null||mi.origin.distanceToSquared(ou)>(t.far-t.near)**2))&&(au.copy(s).invert(),mi.copy(t.ray).applyMatrix4(au),!(n.boundingBox!==null&&mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,n){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){let m=f[_],p=a[m.materialIndex],w=Math.max(m.start,d.start),b=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let M=w,D=b;M<D;M+=3){let P=o.getX(M),E=o.getX(M+1),O=o.getX(M+2);r=Ia(this,p,t,n,l,u,h,P,E,O),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let _=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){let w=o.getX(m),b=o.getX(m+1),M=o.getX(m+2);r=Ia(this,a,t,n,l,u,h,w,b,M),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=f.length;_<g;_++){let m=f[_],p=a[m.materialIndex],w=Math.max(m.start,d.start),b=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let M=w,D=b;M<D;M+=3){let P=M,E=M+1,O=M+2;r=Ia(this,p,t,n,l,u,h,P,E,O),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{let _=Math.max(0,d.start),g=Math.min(c.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){let w=m,b=m+1,M=m+2;r=Ia(this,a,t,n,l,u,h,w,b,M),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}};function mp(i,t,e,n,r,s,a,o){let c;if(t.side===Ie?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,t.side===Nn,o),c===null)return null;Ca.copy(o),Ca.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Ca);return l<e.near||l>e.far?null:{distance:l,point:Ca.clone(),object:i}}function Ia(i,t,e,n,r,s,a,o,c,l){i.getVertexPosition(o,Ma),i.getVertexPosition(c,Ea),i.getVertexPosition(l,Aa);let u=mp(i,t,e,n,Ma,Ea,Aa,cu);if(u){let h=new V;en.getBarycoord(cu,Ma,Ea,Aa,h),r&&(u.uv=en.getInterpolatedAttribute(r,o,c,l,h,new Pt)),s&&(u.uv1=en.getInterpolatedAttribute(s,o,c,l,h,new Pt)),a&&(u.normal=en.getInterpolatedAttribute(a,o,c,l,h,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new V,materialIndex:0};en.getNormal(Ma,Ea,Aa,f.normal),u.face=f,u.barycoord=h}return u}var Sr=class i extends ve{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],u=[],h=[],f=0,d=0;_("z","y","x",-1,-1,n,e,t,a,s,0),_("z","y","x",1,-1,n,e,-t,a,s,1),_("x","z","y",1,1,t,n,e,r,a,2),_("x","z","y",1,-1,t,n,-e,r,a,3),_("x","y","z",1,-1,t,e,n,r,s,4),_("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(u,3)),this.setAttribute("uv",new de(h,2));function _(g,m,p,w,b,M,D,P,E,O,T){let x=M/E,C=D/O,y=M/2,U=D/2,q=P/2,G=E+1,J=O+1,X=0,Z=0,k=new V;for(let N=0;N<J;N++){let ut=N*C-U;for(let ht=0;ht<G;ht++){let ct=ht*x-y;k[g]=ct*w,k[m]=ut*b,k[p]=q,l.push(k.x,k.y,k.z),k[g]=0,k[m]=0,k[p]=P>0?1:-1,u.push(k.x,k.y,k.z),h.push(ht/E),h.push(1-N/O),X+=1}}for(let N=0;N<O;N++)for(let ut=0;ut<E;ut++){let ht=f+ut+G*N,ct=f+ut+G*(N+1),rt=f+(ut+1)+G*(N+1),pt=f+(ut+1)+G*N;c.push(ht,ct,pt),c.push(ct,rt,pt),Z+=6}o.addGroup(d,Z,T),d+=Z,f+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Li(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Fe(i){let t={};for(let e=0;e<i.length;e++){let n=Li(i[e]);for(let r in n)t[r]=n[r]}return t}function _p(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ll(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}var Ks={clone:Li,merge:Fe},gp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$e=class extends zn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gp,this.fragmentShader=xp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Li(t.uniforms),this.uniformsGroups=_p(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},ws=class extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},jn=new V,lu=new Pt,hu=new Pt,Ee=class extends ws{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=yr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return yr*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(jn.x,jn.y).multiplyScalar(-t/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jn.x,jn.y).multiplyScalar(-t/jn.z)}getViewSize(t,e){return this.getViewBounds(t,lu,hu),e.subVectors(hu,lu)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ps*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,e-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},dr=-90,fr=1,Za=class extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ee(dr,fr,t,e);r.layers=this.layers,this.add(r);let s=new Ee(dr,fr,t,e);s.layers=this.layers,this.add(s);let a=new Ee(dr,fr,t,e);a.layers=this.layers,this.add(a);let o=new Ee(dr,fr,t,e);o.layers=this.layers,this.add(o);let c=new Ee(dr,fr,t,e);c.layers=this.layers,this.add(c);let l=new Ee(dr,fr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,c]=e;for(let l of e)this.remove(l);if(t===gn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,l),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},Ms=class extends ke{constructor(t,e,n,r,s,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:Ci,super(t,e,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ka=class extends yn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Ms(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:pn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Sr(5,5,5),s=new $e({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ie,blending:Hn});s.uniforms.tEquirect.value=e;let a=new fe(r,s),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=pn),new Za(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}};var Es=class extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},As=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Wa,this.updateRanges=[],this.version=0,this.uuid=Fn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[n+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Fn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ne=new V,rn=class i{constructor(t,e,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=fn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=fn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=fn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=fn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=fn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),r=se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),r=se(r,this.array),s=se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new ye(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ni=class extends zn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},pr,hs=new V,mr=new V,_r=new V,gr=new Pt,us=new Pt,_d=new he,Ra=new V,ds=new V,Pa=new V,uu=new Pt,el=new Pt,du=new Pt,Mi=class extends Te{constructor(t=new ni){if(super(),this.isSprite=!0,this.type="Sprite",pr===void 0){pr=new ve;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new As(e,5);pr.setIndex([0,1,2,0,2,3]),pr.setAttribute("position",new rn(n,3,0,!1)),pr.setAttribute("uv",new rn(n,2,3,!1))}this.geometry=pr,this.material=t,this.center=new Pt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),mr.setFromMatrixScale(this.matrixWorld),_d.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),_r.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&mr.multiplyScalar(-_r.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;Da(Ra.set(-.5,-.5,0),_r,a,mr,r,s),Da(ds.set(.5,-.5,0),_r,a,mr,r,s),Da(Pa.set(.5,.5,0),_r,a,mr,r,s),uu.set(0,0),el.set(1,0),du.set(1,1);let o=t.ray.intersectTriangle(Ra,ds,Pa,!1,hs);if(o===null&&(Da(ds.set(-.5,.5,0),_r,a,mr,r,s),el.set(0,1),o=t.ray.intersectTriangle(Ra,Pa,ds,!1,hs),o===null))return;let c=t.ray.origin.distanceTo(hs);c<t.near||c>t.far||e.push({distance:c,point:hs.clone(),uv:en.getInterpolation(hs,Ra,ds,Pa,uu,el,du,new Pt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Da(i,t,e,n,r,s){gr.subVectors(i,e).addScalar(.5).multiply(n),r!==void 0?(us.x=s*gr.x-r*gr.y,us.y=r*gr.x+s*gr.y):us.copy(gr),i.copy(t),i.x+=us.x,i.y+=us.y,i.applyMatrix4(_d)}var nl=new V,yp=new V,vp=new kt,tn=class{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let r=nl.subVectors(n,e).cross(yp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(nl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||vp.getNormalMatrix(t),r=this.coplanarPoint(nl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},_i=new vn,La=new V,Ts=class{constructor(t=new tn,e=new tn,n=new tn,r=new tn,s=new tn,a=new tn){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gn){let n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],u=r[5],h=r[6],f=r[7],d=r[8],_=r[9],g=r[10],m=r[11],p=r[12],w=r[13],b=r[14],M=r[15];if(n[0].setComponents(c-s,f-l,m-d,M-p).normalize(),n[1].setComponents(c+s,f+l,m+d,M+p).normalize(),n[2].setComponents(c+a,f+u,m+_,M+w).normalize(),n[3].setComponents(c-a,f-u,m-_,M-w).normalize(),n[4].setComponents(c-o,f-h,m-g,M-b).normalize(),e===gn)n[5].setComponents(c+o,f+h,m+g,M+b).normalize();else if(e===xs)n[5].setComponents(o,h,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(t){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(t.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(t){let e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let r=e[n];if(La.x=r.normal.x>0?t.max.x:t.min.x,La.y=r.normal.y>0?t.max.y:t.min.y,La.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(La)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var wr=class extends zn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},$a=new V,Ja=new V,fu=new he,fs=new ei,Oa=new vn,il=new V,pu=new V,Cs=class extends Te{constructor(t=new ve,e=new wr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)$a.fromBufferAttribute(e,r-1),Ja.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=$a.distanceTo(Ja);t.setAttribute("lineDistance",new de(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(r),Oa.radius+=s,t.ray.intersectsSphere(Oa)===!1)return;fu.copy(r).invert(),fs.copy(t.ray).applyMatrix4(fu);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let d=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let g=d,m=_-1;g<m;g+=l){let p=u.getX(g),w=u.getX(g+1),b=Ua(this,t,fs,c,p,w);b&&e.push(b)}if(this.isLineLoop){let g=u.getX(_-1),m=u.getX(d),p=Ua(this,t,fs,c,g,m);p&&e.push(p)}}else{let d=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let g=d,m=_-1;g<m;g+=l){let p=Ua(this,t,fs,c,g,g+1);p&&e.push(p)}if(this.isLineLoop){let g=Ua(this,t,fs,c,_-1,d);g&&e.push(g)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Ua(i,t,e,n,r,s){let a=i.geometry.attributes.position;if($a.fromBufferAttribute(a,r),Ja.fromBufferAttribute(a,s),e.distanceSqToSegment($a,Ja,il,pu)>n)return;il.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(il);if(!(c<t.near||c>t.far))return{distance:c,point:pu.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}var mu=new V,_u=new V,ja=class extends Cs{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)mu.fromBufferAttribute(e,r),_u.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+mu.distanceTo(_u);t.setAttribute("lineDistance",new de(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var kn=class extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}};var Is=class extends ke{constructor(t,e,n,r,s,a,o,c,l){super(t,e,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Rs=class extends ke{constructor(t,e,n,r,s,a,o,c,l,u=xi){if(u!==xi&&u!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===xi&&(n=ci),n===void 0&&u===Si&&(n=Ri),super(null,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:nn,this.minFilter=c!==void 0?c:nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}};var Qa=class i extends ve{constructor(t=1,e=1,n=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),s=Math.floor(s);let u=[],h=[],f=[],d=[],_=0,g=[],m=n/2,p=0;w(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new de(h,3)),this.setAttribute("normal",new de(f,3)),this.setAttribute("uv",new de(d,2));function w(){let M=new V,D=new V,P=0,E=(e-t)/n;for(let O=0;O<=s;O++){let T=[],x=O/s,C=x*(e-t)+t;for(let y=0;y<=r;y++){let U=y/r,q=U*c+o,G=Math.sin(q),J=Math.cos(q);D.x=C*G,D.y=-x*n+m,D.z=C*J,h.push(D.x,D.y,D.z),M.set(G,E,J).normalize(),f.push(M.x,M.y,M.z),d.push(U,1-x),T.push(_++)}g.push(T)}for(let O=0;O<r;O++)for(let T=0;T<s;T++){let x=g[T][O],C=g[T+1][O],y=g[T+1][O+1],U=g[T][O+1];(t>0||T!==0)&&(u.push(x,C,U),P+=3),(e>0||T!==s-1)&&(u.push(C,y,U),P+=3)}l.addGroup(p,P,0),p+=P}function b(M){let D=_,P=new Pt,E=new V,O=0,T=M===!0?t:e,x=M===!0?1:-1;for(let y=1;y<=r;y++)h.push(0,m*x,0),f.push(0,x,0),d.push(.5,.5),_++;let C=_;for(let y=0;y<=r;y++){let q=y/r*c+o,G=Math.cos(q),J=Math.sin(q);E.x=T*J,E.y=m*x,E.z=T*G,h.push(E.x,E.y,E.z),f.push(0,x,0),P.x=G*.5+.5,P.y=J*.5*x+.5,d.push(P.x,P.y),_++}for(let y=0;y<r;y++){let U=D+y,q=C+y;M===!0?u.push(q,q+1,U):u.push(q+1,q,U),O+=3}l.addGroup(p,O,M===!0?1:2),p+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ei=class i extends ve{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};let s=t/2,a=e/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,h=t/o,f=e/c,d=[],_=[],g=[],m=[];for(let p=0;p<u;p++){let w=p*f-a;for(let b=0;b<l;b++){let M=b*h-s;_.push(M,-w,0),g.push(0,0,1),m.push(b/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<o;w++){let b=w+l*p,M=w+l*(p+1),D=w+1+l*(p+1),P=w+1+l*p;d.push(b,M,P),d.push(M,D,P)}this.setIndex(d),this.setAttribute("position",new de(_,3)),this.setAttribute("normal",new de(g,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ps=class i extends ve{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],h=new V,f=new V,d=[],_=[],g=[],m=[];for(let p=0;p<=n;p++){let w=[],b=p/n,M=0;p===0&&a===0?M=.5/e:p===n&&c===Math.PI&&(M=-.5/e);for(let D=0;D<=e;D++){let P=D/e;h.x=-t*Math.cos(r+P*s)*Math.sin(a+b*o),h.y=t*Math.cos(a+b*o),h.z=t*Math.sin(r+P*s)*Math.sin(a+b*o),_.push(h.x,h.y,h.z),f.copy(h).normalize(),g.push(f.x,f.y,f.z),m.push(P+M,1-b),w.push(l++)}u.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){let b=u[p][w+1],M=u[p][w],D=u[p+1][w],P=u[p+1][w+1];(p!==0||a>0)&&d.push(b,M,P),(p!==n-1||c<Math.PI)&&d.push(M,D,P)}this.setIndex(d),this.setAttribute("position",new de(_,3)),this.setAttribute("normal",new de(g,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Ds=class extends ve{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],n=new Set,r=new V,s=new V;if(t.index!==null){let a=t.attributes.position,o=t.index,c=t.groups;c.length===0&&(c=[{start:0,count:o.count,materialIndex:0}]);for(let l=0,u=c.length;l<u;++l){let h=c[l],f=h.start,d=h.count;for(let _=f,g=f+d;_<g;_+=3)for(let m=0;m<3;m++){let p=o.getX(_+m),w=o.getX(_+(m+1)%3);r.fromBufferAttribute(a,p),s.fromBufferAttribute(a,w),gu(r,s,n)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}}else{let a=t.attributes.position;for(let o=0,c=a.count/3;o<c;o++)for(let l=0;l<3;l++){let u=3*o+l,h=3*o+(l+1)%3;r.fromBufferAttribute(a,u),s.fromBufferAttribute(a,h),gu(r,s,n)===!0&&(e.push(r.x,r.y,r.z),e.push(s.x,s.y,s.z))}}this.setAttribute("position",new de(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};function gu(i,t,e){let n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(r)===!0?!1:(e.add(n),e.add(r),!0)}var to=class extends zn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=td,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},eo=class extends zn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Fa(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function bp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ai=class{constructor(t,e,n,r){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,r=e[n],s=e[n-1];t:{e:{let a;n:{i:if(!(t<r)){for(let o=n+2;;){if(r===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=e[++n],t<r)break e}a=e.length;break n}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=s,s=e[--n-1],t>=s)break e}a=n,n=0;break n}break t}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(r=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,t,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=t*r;for(let a=0;a!==r;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},no=class extends Ai{constructor(t,e,n,r){super(t,e,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sl,endingEnd:sl}}intervalChanged_(t,e,n){let r=this.parameterPositions,s=t-2,a=t+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case al:s=t,o=2*e-n;break;case ol:s=r.length-2,o=e+r[s]-r[s+1];break;default:s=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case al:a=t,c=2*n-e;break;case ol:a=1,c=n+r[1]-r[0];break;default:a=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,_=(n-e)/(r-e),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,w=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,b=(-1-d)*m+(1.5+d)*g+.5*_,M=d*m-d*g;for(let D=0;D!==o;++D)s[D]=p*a[u+D]+w*a[l+D]+b*a[c+D]+M*a[h+D];return s}},io=class extends Ai{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(r-e),h=1-u;for(let f=0;f!==o;++f)s[f]=a[l+f]*h+a[c+f]*u;return s}},ro=class extends Ai{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t){return this.copySampleValue_(t-1)}},sn=class{constructor(t,e,n,r){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Fa(e,this.TimeBufferType),this.values=Fa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Fa(t.times,Array),values:Fa(t.values,Array)};let r=t.getInterpolation();r!==t.DefaultInterpolation&&(n.interpolation=r)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new ro(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new io(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new no(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case _s:e=this.InterpolantFactoryMethodDiscrete;break;case Ga:e=this.InterpolantFactoryMethodLinear;break;case za:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _s;case this.InterpolantFactoryMethodLinear:return Ga;case this.InterpolantFactoryMethodSmooth:return za}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,r=e.length;n!==r;++n)e[n]*=t}return this}trim(t,e){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,r=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(r!==void 0&&bp(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===za,s=t.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(r)c=!0;else{let h=o*n,f=h-n,d=h+n;for(let _=0;_!==n;++_){let g=e[h+_];if(g!==e[f+_]||g!==e[d+_]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let h=o*n,f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[h+d]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,r=new n(this.name,t,e);return r.createInterpolant=this.createInterpolant,r}};sn.prototype.TimeBufferType=Float32Array;sn.prototype.ValueBufferType=Float32Array;sn.prototype.DefaultInterpolation=Ga;var ii=class extends sn{constructor(t,e,n){super(t,e,n)}};ii.prototype.ValueTypeName="bool";ii.prototype.ValueBufferType=Array;ii.prototype.DefaultInterpolation=_s;ii.prototype.InterpolantFactoryMethodLinear=void 0;ii.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends sn{};so.prototype.ValueTypeName="color";var ao=class extends sn{};ao.prototype.ValueTypeName="number";var oo=class extends Ai{constructor(t,e,n,r){super(t,e,n,r)}interpolate_(t,e,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(r-e),l=t*o;for(let u=l+o;l!==u;l+=4)Ae.slerpFlat(s,0,a,l-o,a,l,c);return s}},Ls=class extends sn{InterpolantFactoryMethodLinear(t){return new oo(this.times,this.values,this.getValueSize(),t)}};Ls.prototype.ValueTypeName="quaternion";Ls.prototype.InterpolantFactoryMethodSmooth=void 0;var ri=class extends sn{constructor(t,e,n){super(t,e,n)}};ri.prototype.ValueTypeName="string";ri.prototype.ValueBufferType=Array;ri.prototype.DefaultInterpolation=_s;ri.prototype.InterpolantFactoryMethodLinear=void 0;ri.prototype.InterpolantFactoryMethodSmooth=void 0;var co=class extends sn{};co.prototype.ValueTypeName="vector";var ll={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},lo=class{constructor(t,e,n){let r=this,s=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let d=l[h],_=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return _}return null}}},gd=new lo,Mr=class{constructor(t){this.manager=t!==void 0?t:gd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Mr.DEFAULT_MATERIAL_NAME="__DEFAULT";var ho=class extends Mr{constructor(t){super(t)}load(t,e,n,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let s=this,a=ll.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;let o=vr("img");function c(){u(),ll.add(t,this),e&&e(this),s.manager.itemEnd(t)}function l(h){u(),r&&r(h),s.manager.itemError(t),s.manager.itemEnd(t)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}};var Os=class extends Mr{constructor(t){super(t)}load(t,e,n,r){let s=new ke,a=new ho(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},n,r),s}},uo=class extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var Er=class extends ws{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-t,a=n+t,o=r+e,c=r-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Us=class extends uo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Fs=class extends ve{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var fo=class extends Ee{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Bs=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=xu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=xu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function xu(){return performance.now()}var Ol="\\[\\]\\.:\\/",Sp=new RegExp("["+Ol+"]","g"),Ul="[^"+Ol+"]",wp="[^"+Ol.replace("\\.","")+"]",Mp=/((?:WC+[\/:])*)/.source.replace("WC",Ul),Ep=/(WCOD+)?/.source.replace("WCOD",wp),Ap=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ul),Tp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ul),Cp=new RegExp("^"+Mp+Ep+Ap+Tp+"$"),Ip=["material","materials","bones","map"],hl=class{constructor(t,e,n){let r=n||ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,r)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ue=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Sp,"")}static parseTrackName(t){let e=Cp.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);Ip.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},r=n(t.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)t[e++]=n[r]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,r=e.propertyName,s=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[r];if(a===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ue.Composite=hl;ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ue.prototype.GetterByBindingType=[ue.prototype._getValue_direct,ue.prototype._getValue_array,ue.prototype._getValue_arrayElement,ue.prototype._getValue_toArray];ue.prototype.SetterByBindingTypeAndVersioning=[[ue.prototype._setValue_direct,ue.prototype._setValue_direct_setNeedsUpdate,ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_array,ue.prototype._setValue_array_setNeedsUpdate,ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_arrayElement,ue.prototype._setValue_arrayElement_setNeedsUpdate,ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_fromArray,ue.prototype._setValue_fromArray_setNeedsUpdate,ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var jS=new Float32Array(1);var Ti=class extends As{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){let e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){let e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}};var yu=new he,Ns=class{constructor(t,e,n=0,r=1/0){this.ray=new ei(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new br,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return yu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yu),this}intersectObject(t,e=!0,n=[]){return ul(t,this,n,e),n.sort(vu),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)ul(t[r],this,n,e);return n.sort(vu),n}};function vu(i,t){return i.distance-t.distance}function ul(i,t,e,n){let r=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let a=0,o=s.length;a<o;a++)ul(s[a],t,e,!0)}}var Vn=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Wt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Wt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var bu=new V,Ba=new V,zs=class{constructor(t=new V,e=new V){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){bu.subVectors(t,this.start),Ba.subVectors(this.end,this.start);let n=Ba.dot(Ba),s=Ba.dot(bu)/n;return e&&(s=Wt(s,0,1)),s}closestPointToPoint(t,e,n){let r=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(r).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var ks=class extends ja{constructor(t=10,e=10,n=4473924,r=8947848){n=new Xt(n),r=new Xt(r);let s=e/2,a=t/e,o=t/2,c=[],l=[];for(let f=0,d=0,_=-o;f<=e;f++,_+=a){c.push(-o,0,_,o,0,_),c.push(_,0,-o,_,0,o);let g=f===s?n:r;g.toArray(l,d),d+=3,g.toArray(l,d),d+=3,g.toArray(l,d),d+=3,g.toArray(l,d),d+=3}let u=new ve;u.setAttribute("position",new de(c,3)),u.setAttribute("color",new de(l,3));let h=new wr({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Su=new V,Na,rl,Ar=class extends Te{constructor(t=new V(0,0,1),e=new V(0,0,0),n=1,r=16776960,s=n*.2,a=s*.2){super(),this.type="ArrowHelper",Na===void 0&&(Na=new ve,Na.setAttribute("position",new de([0,0,0,0,1,0],3)),rl=new Qa(0,.5,1,5,1),rl.translate(0,-.5,0)),this.position.copy(e),this.line=new Cs(Na,new wr({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new fe(rl,new Ke({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,s,a)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Su.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Su,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};var Vs=class extends xn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};function Fl(i,t,e,n){let r=Rp(n);switch(e){case Sl:return i*t;case Ml:return i*t;case El:return i*t*2;case Al:return i*t/r.components*r.byteLength;case Co:return i*t/r.components*r.byteLength;case Tl:return i*t*2/r.components*r.byteLength;case Io:return i*t*2/r.components*r.byteLength;case wl:return i*t*3/r.components*r.byteLength;case an:return i*t*4/r.components*r.byteLength;case Ro:return i*t*4/r.components*r.byteLength;case Ws:case Xs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case qs:case Ys:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Do:case Oo:return Math.max(i,16)*Math.max(t,8)/4;case Po:case Lo:return Math.max(i,8)*Math.max(t,8)/2;case Uo:case Fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case No:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ko:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ho:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Go:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Xo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case qo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case $o:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Jo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Zs:case jo:case Qo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Cl:case tc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ec:case nc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Rp(i){switch(i){case Mn:case yl:return{byteLength:1,components:1};case Tr:case vl:case Cr:return{byteLength:2,components:1};case Ao:case To:return{byteLength:2,components:4};case ci:case Eo:case En:return{byteLength:4,components:1};case bl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:po}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=po);function Vd(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Pp(i){let t=new WeakMap;function e(o,c){let l=o.array,u=o.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){let u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<h.length;d++){let _=h[f],g=h[d];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,h[f]=g)}h.length=f+1;for(let d=0,_=h.length;d<_;d++){let g=h[d];i.bufferSubData(l,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Dp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Lp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Op=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Up=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Np=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Vp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,em=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,nm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,im=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,rm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,am=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,om=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cm="gl_FragColor = linearToOutputTexel( gl_FragColor );",lm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,um=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,dm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,mm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_m=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ym=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,vm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Mm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Em=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Am=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Im=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Pm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Dm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Om=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Um=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,km=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ym=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Km=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$m=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,t0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,e0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,n0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,i0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,r0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,s0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,a0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,o0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,c0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,l0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,h0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,u0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,d0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,f0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,p0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,m0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,g0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,x0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,v0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,b0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,S0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,M0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,E0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,A0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,I0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,R0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,P0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,N0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,z0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,k0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,H0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,X0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,q0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,j0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Q0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,n_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,a_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,o_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,l_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,h_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:Dp,alphahash_pars_fragment:Lp,alphamap_fragment:Op,alphamap_pars_fragment:Up,alphatest_fragment:Fp,alphatest_pars_fragment:Bp,aomap_fragment:Np,aomap_pars_fragment:zp,batching_pars_vertex:kp,batching_vertex:Vp,begin_vertex:Hp,beginnormal_vertex:Gp,bsdfs:Wp,iridescence_fragment:Xp,bumpmap_pars_fragment:qp,clipping_planes_fragment:Yp,clipping_planes_pars_fragment:Zp,clipping_planes_pars_vertex:Kp,clipping_planes_vertex:$p,color_fragment:Jp,color_pars_fragment:jp,color_pars_vertex:Qp,color_vertex:tm,common:em,cube_uv_reflection_fragment:nm,defaultnormal_vertex:im,displacementmap_pars_vertex:rm,displacementmap_vertex:sm,emissivemap_fragment:am,emissivemap_pars_fragment:om,colorspace_fragment:cm,colorspace_pars_fragment:lm,envmap_fragment:hm,envmap_common_pars_fragment:um,envmap_pars_fragment:dm,envmap_pars_vertex:fm,envmap_physical_pars_fragment:Mm,envmap_vertex:pm,fog_vertex:mm,fog_pars_vertex:_m,fog_fragment:gm,fog_pars_fragment:xm,gradientmap_pars_fragment:ym,lightmap_pars_fragment:vm,lights_lambert_fragment:bm,lights_lambert_pars_fragment:Sm,lights_pars_begin:wm,lights_toon_fragment:Em,lights_toon_pars_fragment:Am,lights_phong_fragment:Tm,lights_phong_pars_fragment:Cm,lights_physical_fragment:Im,lights_physical_pars_fragment:Rm,lights_fragment_begin:Pm,lights_fragment_maps:Dm,lights_fragment_end:Lm,logdepthbuf_fragment:Om,logdepthbuf_pars_fragment:Um,logdepthbuf_pars_vertex:Fm,logdepthbuf_vertex:Bm,map_fragment:Nm,map_pars_fragment:zm,map_particle_fragment:km,map_particle_pars_fragment:Vm,metalnessmap_fragment:Hm,metalnessmap_pars_fragment:Gm,morphinstance_vertex:Wm,morphcolor_vertex:Xm,morphnormal_vertex:qm,morphtarget_pars_vertex:Ym,morphtarget_vertex:Zm,normal_fragment_begin:Km,normal_fragment_maps:$m,normal_pars_fragment:Jm,normal_pars_vertex:jm,normal_vertex:Qm,normalmap_pars_fragment:t0,clearcoat_normal_fragment_begin:e0,clearcoat_normal_fragment_maps:n0,clearcoat_pars_fragment:i0,iridescence_pars_fragment:r0,opaque_fragment:s0,packing:a0,premultiplied_alpha_fragment:o0,project_vertex:c0,dithering_fragment:l0,dithering_pars_fragment:h0,roughnessmap_fragment:u0,roughnessmap_pars_fragment:d0,shadowmap_pars_fragment:f0,shadowmap_pars_vertex:p0,shadowmap_vertex:m0,shadowmask_pars_fragment:_0,skinbase_vertex:g0,skinning_pars_vertex:x0,skinning_vertex:y0,skinnormal_vertex:v0,specularmap_fragment:b0,specularmap_pars_fragment:S0,tonemapping_fragment:w0,tonemapping_pars_fragment:M0,transmission_fragment:E0,transmission_pars_fragment:A0,uv_pars_fragment:T0,uv_pars_vertex:C0,uv_vertex:I0,worldpos_vertex:R0,background_vert:P0,background_frag:D0,backgroundCube_vert:L0,backgroundCube_frag:O0,cube_vert:U0,cube_frag:F0,depth_vert:B0,depth_frag:N0,distanceRGBA_vert:z0,distanceRGBA_frag:k0,equirect_vert:V0,equirect_frag:H0,linedashed_vert:G0,linedashed_frag:W0,meshbasic_vert:X0,meshbasic_frag:q0,meshlambert_vert:Y0,meshlambert_frag:Z0,meshmatcap_vert:K0,meshmatcap_frag:$0,meshnormal_vert:J0,meshnormal_frag:j0,meshphong_vert:Q0,meshphong_frag:t_,meshphysical_vert:e_,meshphysical_frag:n_,meshtoon_vert:i_,meshtoon_frag:r_,points_vert:s_,points_frag:a_,shadow_vert:o_,shadow_frag:c_,sprite_vert:l_,sprite_frag:h_},gt={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Pt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new Pt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},Ve={basic:{uniforms:Fe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Fe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Fe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Fe([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Fe([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Fe([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Fe([gt.points,gt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Fe([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Fe([gt.common,gt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Fe([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Fe([gt.sprite,gt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Fe([gt.common,gt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Fe([gt.lights,gt.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};Ve.physical={uniforms:Fe([Ve.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Pt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Pt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Pt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};var ic={r:0,b:0,g:0},Oi=new bn,u_=new he;function d_(i,t,e,n,r,s,a){let o=new Xt(0),c=s===!0?0:1,l,u,h=null,f=0,d=null;function _(b){let M=b.isScene===!0?b.background:null;return M&&M.isTexture&&(M=(b.backgroundBlurriness>0?e:t).get(M)),M}function g(b){let M=!1,D=_(b);D===null?p(o,c):D&&D.isColor&&(p(D,1),M=!0);let P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,M){let D=_(M);D&&(D.isCubeTexture||D.mapping===Hs)?(u===void 0&&(u=new fe(new Sr(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:Li(Ve.backgroundCube.uniforms),vertexShader:Ve.backgroundCube.vertexShader,fragmentShader:Ve.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,E,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Oi.copy(M.backgroundRotation),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),u.material.uniforms.envMap.value=D,u.material.uniforms.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(u_.makeRotationFromEuler(Oi)),u.material.toneMapped=Jt.getTransfer(D.colorSpace)!==ae,(h!==D||f!==D.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=D,f=D.version,d=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):D&&D.isTexture&&(l===void 0&&(l=new fe(new Ei(2,2),new $e({name:"BackgroundMaterial",uniforms:Li(Ve.background.uniforms),vertexShader:Ve.background.vertexShader,fragmentShader:Ve.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=D,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(D.colorSpace)!==ae,D.matrixAutoUpdate===!0&&D.updateMatrix(),l.material.uniforms.uvTransform.value.copy(D.matrix),(h!==D||f!==D.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=D,f=D.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,M){b.getRGB(ic,Ll(i)),n.buffers.color.setClear(ic.r,ic.g,ic.b,M,a)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),l!==void 0&&(l.geometry.dispose(),l.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(b,M=1){o.set(b),c=M,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(o,c)},render:g,addToRenderList:m,dispose:w}}function f_(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null),s=r,a=!1;function o(x,C,y,U,q){let G=!1,J=h(U,y,C);s!==J&&(s=J,l(s.object)),G=d(x,U,y,q),G&&_(x,U,y,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,M(x,C,y,U),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function u(x){return i.deleteVertexArray(x)}function h(x,C,y){let U=y.wireframe===!0,q=n[x.id];q===void 0&&(q={},n[x.id]=q);let G=q[C.id];G===void 0&&(G={},q[C.id]=G);let J=G[U];return J===void 0&&(J=f(c()),G[U]=J),J}function f(x){let C=[],y=[],U=[];for(let q=0;q<e;q++)C[q]=0,y[q]=0,U[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:y,attributeDivisors:U,object:x,attributes:{},index:null}}function d(x,C,y,U){let q=s.attributes,G=C.attributes,J=0,X=y.getAttributes();for(let Z in X)if(X[Z].location>=0){let N=q[Z],ut=G[Z];if(ut===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor)),N===void 0||N.attribute!==ut||ut&&N.data!==ut.data)return!0;J++}return s.attributesNum!==J||s.index!==U}function _(x,C,y,U){let q={},G=C.attributes,J=0,X=y.getAttributes();for(let Z in X)if(X[Z].location>=0){let N=G[Z];N===void 0&&(Z==="instanceMatrix"&&x.instanceMatrix&&(N=x.instanceMatrix),Z==="instanceColor"&&x.instanceColor&&(N=x.instanceColor));let ut={};ut.attribute=N,N&&N.data&&(ut.data=N.data),q[Z]=ut,J++}s.attributes=q,s.attributesNum=J,s.index=U}function g(){let x=s.newAttributes;for(let C=0,y=x.length;C<y;C++)x[C]=0}function m(x){p(x,0)}function p(x,C){let y=s.newAttributes,U=s.enabledAttributes,q=s.attributeDivisors;y[x]=1,U[x]===0&&(i.enableVertexAttribArray(x),U[x]=1),q[x]!==C&&(i.vertexAttribDivisor(x,C),q[x]=C)}function w(){let x=s.newAttributes,C=s.enabledAttributes;for(let y=0,U=C.length;y<U;y++)C[y]!==x[y]&&(i.disableVertexAttribArray(y),C[y]=0)}function b(x,C,y,U,q,G,J){J===!0?i.vertexAttribIPointer(x,C,y,q,G):i.vertexAttribPointer(x,C,y,U,q,G)}function M(x,C,y,U){g();let q=U.attributes,G=y.getAttributes(),J=C.defaultAttributeValues;for(let X in G){let Z=G[X];if(Z.location>=0){let k=q[X];if(k===void 0&&(X==="instanceMatrix"&&x.instanceMatrix&&(k=x.instanceMatrix),X==="instanceColor"&&x.instanceColor&&(k=x.instanceColor)),k!==void 0){let N=k.normalized,ut=k.itemSize,ht=t.get(k);if(ht===void 0)continue;let ct=ht.buffer,rt=ht.type,pt=ht.bytesPerElement,mt=rt===i.INT||rt===i.UNSIGNED_INT||k.gpuType===Eo;if(k.isInterleavedBufferAttribute){let ft=k.data,At=ft.stride,It=k.offset;if(ft.isInstancedInterleavedBuffer){for(let Ft=0;Ft<Z.locationSize;Ft++)p(Z.location+Ft,ft.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Ft=0;Ft<Z.locationSize;Ft++)m(Z.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let Ft=0;Ft<Z.locationSize;Ft++)b(Z.location+Ft,ut/Z.locationSize,rt,N,At*pt,(It+ut/Z.locationSize*Ft)*pt,mt)}else{if(k.isInstancedBufferAttribute){for(let ft=0;ft<Z.locationSize;ft++)p(Z.location+ft,k.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let ft=0;ft<Z.locationSize;ft++)m(Z.location+ft);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let ft=0;ft<Z.locationSize;ft++)b(Z.location+ft,ut/Z.locationSize,rt,N,ut*pt,ut/Z.locationSize*ft*pt,mt)}}else if(J!==void 0){let N=J[X];if(N!==void 0)switch(N.length){case 2:i.vertexAttrib2fv(Z.location,N);break;case 3:i.vertexAttrib3fv(Z.location,N);break;case 4:i.vertexAttrib4fv(Z.location,N);break;default:i.vertexAttrib1fv(Z.location,N)}}}}w()}function D(){O();for(let x in n){let C=n[x];for(let y in C){let U=C[y];for(let q in U)u(U[q].object),delete U[q];delete C[y]}delete n[x]}}function P(x){if(n[x.id]===void 0)return;let C=n[x.id];for(let y in C){let U=C[y];for(let q in U)u(U[q].object),delete U[q];delete C[y]}delete n[x.id]}function E(x){for(let C in n){let y=n[C];if(y[x.id]===void 0)continue;let U=y[x.id];for(let q in U)u(U[q].object),delete U[q];delete y[x.id]}}function O(){T(),a=!0,s!==r&&(s=r,l(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:O,resetDefaultState:T,dispose:D,releaseStatesOfGeometry:P,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:w}}function p_(i,t,e){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function o(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let _=0;_<h;_++)d+=u[_];e.update(d,n,1)}function c(l,u,h,f){if(h===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<l.length;_++)a(l[_],u[_],f[_]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*f[g];e.update(_,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function m_(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(E){return!(E!==an&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let O=E===Cr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Mn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==En&&!O)}function c(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=_>0,P=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:D,maxSamples:P}}function __(i){let t=this,e=null,n=0,r=!1,s=!1,a=new tn,o=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){let _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||_===null||_.length===0||s&&!m)s?u(null):l();else{let w=s?0:n,b=w*4,M=p.clippingState||null;c.value=M,M=u(_,f,b,d);for(let D=0;D!==b;++D)M[D]=e[D];p.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,_){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=c.value,_!==!0||m===null){let p=d+g*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,M=d;b!==g;++b,M+=4)a.copy(h[b]).applyMatrix4(w,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function g_(i){let t=new WeakMap;function e(a,o){return o===So?a.mapping=Ci:o===wo&&(a.mapping=Ii),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===So||o===wo)if(t.has(a)){let c=t.get(a).texture;return e(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new Ka(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",r),e(l.texture,a.mapping)}else return null}}return a}function r(a){let o=a.target;o.removeEventListener("dispose",r);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var Rr=4,xd=[.125,.215,.35,.446,.526,.582],Bi=20,Bl=new Er,yd=new Xt,Nl=null,zl=0,kl=0,Vl=!1,Fi=(1+Math.sqrt(5))/2,Ir=1/Fi,vd=[new V(-Fi,Ir,0),new V(Fi,Ir,0),new V(-Ir,0,Fi),new V(Ir,0,Fi),new V(0,Fi,-Ir),new V(0,Fi,Ir),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],ac=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Nl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),kl=this._renderer.getActiveMipmapLevel(),Vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Nl,zl,kl),this._renderer.xr.enabled=Vl,t.scissorTest=!1,rc(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ci||t.mapping===Ii?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Nl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),kl=this._renderer.getActiveMipmapLevel(),Vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:Cr,format:an,colorSpace:wi,depthBuffer:!1},r=bd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bd(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=x_(s)),this._blurMaterial=y_(s,t,e)}return r}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,Bl)}_sceneToCubeUV(t,e,n,r){let o=new Ee(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(yd),u.toneMapping=Gn,u.autoClear=!1;let d=new Ke({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1}),_=new fe(new Sr,d),g=!1,m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,g=!0):(d.color.copy(yd),g=!0);for(let p=0;p<6;p++){let w=p%3;w===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):w===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));let b=this._cubeSize;rc(r,w*b,p>2?b:0,b,b),u.setRenderTarget(r),g&&u.render(_,o),u.render(t,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,r=t.mapping===Ci||t.mapping===Ii;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sd());let s=r?this._cubemapMaterial:this._equirectMaterial,a=new fe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;let c=this._cubeSize;rc(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Bl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=vd[(r-s-1)%vd.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,r,s){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new fe(this._lodPlanes[r],l),f=l.uniforms,d=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Bi-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Bi;m>Bi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bi}`);let p=[],w=0;for(let E=0;E<Bi;++E){let O=E/g,T=Math.exp(-O*O/2);p.push(T),E===0?w+=T:E<m&&(w+=2*T)}for(let E=0;E<p.length;E++)p[E]=p[E]/w;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:b}=this;f.dTheta.value=_,f.mipInt.value=b-n;let M=this._sizeLods[r],D=3*M*(r>b-Rr?r-b+Rr:0),P=4*(this._cubeSize-M);rc(e,D,P,3*M,2*M),c.setRenderTarget(e),c.render(h,Bl)}};function x_(i){let t=[],e=[],n=[],r=i,s=i-Rr+1+xd.length;for(let a=0;a<s;a++){let o=Math.pow(2,r);e.push(o);let c=1/o;a>i-Rr?c=xd[a-i+Rr-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,_=6,g=3,m=2,p=1,w=new Float32Array(g*_*d),b=new Float32Array(m*_*d),M=new Float32Array(p*_*d);for(let P=0;P<d;P++){let E=P%3*2/3-1,O=P>2?0:-1,T=[E,O,0,E+2/3,O,0,E+2/3,O+1,0,E,O,0,E+2/3,O+1,0,E,O+1,0];w.set(T,g*_*P),b.set(f,m*_*P);let x=[P,P,P,P,P,P];M.set(x,p*_*P)}let D=new ve;D.setAttribute("position",new ye(w,g)),D.setAttribute("uv",new ye(b,m)),D.setAttribute("faceIndex",new ye(M,p)),t.push(D),r>Rr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function bd(i,t,e){let n=new yn(i,t,e);return n.texture.mapping=Hs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rc(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function y_(i,t,e){let n=new Float32Array(Bi),r=new V(0,1,0);return new $e({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Sd(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function wd(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Jl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function v_(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===So||c===wo,u=c===Ci||c===Ii;if(l||u){let h=t.get(o),f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new ac(i)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{let d=o.image;return l&&d&&d.height>0||u&&d&&r(d)?(e===null&&(e=new ac(i)),h=l?e.fromEquirectangular(o):e.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function r(o){let c=0,l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){let c=o.target;c.removeEventListener("dispose",s);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function b_(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let r=e(n);return r===null&&Di("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function S_(i,t,e,n){let r={},s=new WeakMap;function a(h){let f=h.target;f.index!==null&&t.remove(f.index);for(let _ in f.attributes)t.remove(f.attributes[_]);f.removeEventListener("dispose",a),delete r[f.id];let d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,e.memory.geometries++),f}function c(h){let f=h.attributes;for(let d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(h){let f=[],d=h.index,_=h.attributes.position,g=0;if(d!==null){let w=d.array;g=d.version;for(let b=0,M=w.length;b<M;b+=3){let D=w[b+0],P=w[b+1],E=w[b+2];f.push(D,P,P,E,E,D)}}else if(_!==void 0){let w=_.array;g=_.version;for(let b=0,M=w.length/3-1;b<M;b+=3){let D=b+0,P=b+1,E=b+2;f.push(D,P,P,E,E,D)}}else return;let m=new(Dl(f)?Ss:bs)(f,1);m.version=g;let p=s.get(h);p&&t.remove(p),s.set(h,m)}function u(h){let f=s.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function w_(i,t,e){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,d){i.drawElements(n,d,s,f*a),e.update(d,n,1)}function l(f,d,_){_!==0&&(i.drawElementsInstanced(n,d,s,f*a,_),e.update(d,n,_))}function u(f,d,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];e.update(m,n,1)}function h(f,d,_,g){if(_===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/a,d[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,g,0,_);let p=0;for(let w=0;w<_;w++)p+=d[w]*g[w];e.update(p,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function M_(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function E_(i,t,e){let n=new WeakMap,r=new ie;function s(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==h){let T=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],b=0;d===!0&&(b=1),_===!0&&(b=2),g===!0&&(b=3);let M=o.attributes.position.count*b,D=1;M>t.maxTextureSize&&(D=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let P=new Float32Array(M*D*4*h),E=new vs(P,M,D,h);E.type=En,E.needsUpdate=!0;let O=b*4;for(let x=0;x<h;x++){let C=m[x],y=p[x],U=w[x],q=M*D*4*x;for(let G=0;G<C.count;G++){let J=G*O;d===!0&&(r.fromBufferAttribute(C,G),P[q+J+0]=r.x,P[q+J+1]=r.y,P[q+J+2]=r.z,P[q+J+3]=0),_===!0&&(r.fromBufferAttribute(y,G),P[q+J+4]=r.x,P[q+J+5]=r.y,P[q+J+6]=r.z,P[q+J+7]=0),g===!0&&(r.fromBufferAttribute(U,G),P[q+J+8]=r.x,P[q+J+9]=r.y,P[q+J+10]=r.z,P[q+J+11]=U.itemSize===4?r.w:1)}}f={count:h,texture:E,size:new Pt(M,D)},n.set(o,f),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let g=0;g<l.length;g++)d+=l[g];let _=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function A_(i,t,e,n){let r=new WeakMap;function s(c){let l=n.render.frame,u=c.geometry,h=t.get(c,u);if(r.get(h)!==l&&(t.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function a(){r=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}var Hd=new ke,Md=new Rs(1,1),Gd=new vs,Wd=new Ya,Xd=new Ms,Ed=[],Ad=[],Td=new Float32Array(16),Cd=new Float32Array(9),Id=new Float32Array(4);function Dr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let r=t*e,s=Ed[r];if(s===void 0&&(s=new Float32Array(r),Ed[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Se(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function cc(i,t){let e=Ad[t];e===void 0&&(e=new Int32Array(t),Ad[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function T_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function C_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),Se(e,t)}}function I_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),Se(e,t)}}function R_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),Se(e,t)}}function P_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;Id.set(n),i.uniformMatrix2fv(this.addr,!1,Id),Se(e,n)}}function D_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;Cd.set(n),i.uniformMatrix3fv(this.addr,!1,Cd),Se(e,n)}}function L_(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;Td.set(n),i.uniformMatrix4fv(this.addr,!1,Td),Se(e,n)}}function O_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function U_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),Se(e,t)}}function F_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),Se(e,t)}}function B_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),Se(e,t)}}function N_(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function z_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),Se(e,t)}}function k_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),Se(e,t)}}function V_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),Se(e,t)}}function H_(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Md.compareFunction=Il,s=Md):s=Hd,e.setTexture2D(t||s,r)}function G_(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Wd,r)}function W_(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Xd,r)}function X_(i,t,e){let n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Gd,r)}function q_(i){switch(i){case 5126:return T_;case 35664:return C_;case 35665:return I_;case 35666:return R_;case 35674:return P_;case 35675:return D_;case 35676:return L_;case 5124:case 35670:return O_;case 35667:case 35671:return U_;case 35668:case 35672:return F_;case 35669:case 35673:return B_;case 5125:return N_;case 36294:return z_;case 36295:return k_;case 36296:return V_;case 35678:case 36198:case 36298:case 36306:case 35682:return H_;case 35679:case 36299:case 36307:return G_;case 35680:case 36300:case 36308:case 36293:return W_;case 36289:case 36303:case 36311:case 36292:return X_}}function Y_(i,t){i.uniform1fv(this.addr,t)}function Z_(i,t){let e=Dr(t,this.size,2);i.uniform2fv(this.addr,e)}function K_(i,t){let e=Dr(t,this.size,3);i.uniform3fv(this.addr,e)}function $_(i,t){let e=Dr(t,this.size,4);i.uniform4fv(this.addr,e)}function J_(i,t){let e=Dr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function j_(i,t){let e=Dr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Q_(i,t){let e=Dr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function tg(i,t){i.uniform1iv(this.addr,t)}function eg(i,t){i.uniform2iv(this.addr,t)}function ng(i,t){i.uniform3iv(this.addr,t)}function ig(i,t){i.uniform4iv(this.addr,t)}function rg(i,t){i.uniform1uiv(this.addr,t)}function sg(i,t){i.uniform2uiv(this.addr,t)}function ag(i,t){i.uniform3uiv(this.addr,t)}function og(i,t){i.uniform4uiv(this.addr,t)}function cg(i,t,e){let n=this.cache,r=t.length,s=cc(e,r);be(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Hd,s[a])}function lg(i,t,e){let n=this.cache,r=t.length,s=cc(e,r);be(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Wd,s[a])}function hg(i,t,e){let n=this.cache,r=t.length,s=cc(e,r);be(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Xd,s[a])}function ug(i,t,e){let n=this.cache,r=t.length,s=cc(e,r);be(n,s)||(i.uniform1iv(this.addr,s),Se(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||Gd,s[a])}function dg(i){switch(i){case 5126:return Y_;case 35664:return Z_;case 35665:return K_;case 35666:return $_;case 35674:return J_;case 35675:return j_;case 35676:return Q_;case 5124:case 35670:return tg;case 35667:case 35671:return eg;case 35668:case 35672:return ng;case 35669:case 35673:return ig;case 5125:return rg;case 36294:return sg;case 36295:return ag;case 36296:return og;case 35678:case 36198:case 36298:case 36306:case 35682:return cg;case 35679:case 36299:case 36307:return lg;case 35680:case 36300:case 36308:case 36293:return hg;case 36289:case 36303:case 36311:case 36292:return ug}}var Gl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=q_(e.type)}},Wl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=dg(e.type)}},Xl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(t,e[o.id],n)}}},Hl=/(\w+)(\])?(\[|\.)?/g;function Rd(i,t){i.seq.push(t),i.map[t.id]=t}function fg(i,t,e){let n=i.name,r=n.length;for(Hl.lastIndex=0;;){let s=Hl.exec(n),a=Hl.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Rd(e,l===void 0?new Gl(o,i,t):new Wl(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new Xl(o),Rd(e,h)),e=h}}}var Pr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);fg(s,a,this)}}setValue(t,e,n,r){let s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){let r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){let o=e[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,r)}}static seqWithValue(t,e){let n=[];for(let r=0,s=t.length;r!==s;++r){let a=t[r];a.id in e&&n.push(a)}return n}};function Pd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var pg=37297,mg=0;function _g(i,t){let e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Dd=new kt;function gg(i){Jt._getMatrix(Dd,Jt.workingColorSpace,i);let t=`mat3( ${Dd.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case gs:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ld(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+_g(i.getShaderSource(t),a)}else return r}function xg(i,t){let e=gg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function yg(i,t){let e;switch(t){case qu:e="Linear";break;case Yu:e="Reinhard";break;case Zu:e="Cineon";break;case Ku:e="ACESFilmic";break;case Ju:e="AgX";break;case ju:e="Neutral";break;case $u:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var sc=new V;function vg(){Jt.getLuminanceCoefficients(sc);let i=sc.x.toFixed(4),t=sc.y.toFixed(4),e=sc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function Sg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function wg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(t,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function $s(i){return i!==""}function Od(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ud(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ql(i){return i.replace(Mg,Ag)}var Eg=new Map;function Ag(i,t){let e=Ht[t];if(e===void 0){let n=Eg.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ql(e)}var Tg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fd(i){return i.replace(Tg,Cg)}function Cg(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Bd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ig(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===fl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Eu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(t="SHADOWMAP_TYPE_VSM"),t}function Rg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ci:case Ii:t="ENVMAP_TYPE_CUBE";break;case Hs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Pg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ii:t="ENVMAP_MODE_REFRACTION";break}return t}function Dg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case gl:t="ENVMAP_BLENDING_MULTIPLY";break;case Wu:t="ENVMAP_BLENDING_MIX";break;case Xu:t="ENVMAP_BLENDING_ADD";break}return t}function Lg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Og(i,t,e,n){let r=i.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,c=Ig(e),l=Rg(e),u=Pg(e),h=Dg(e),f=Lg(e),d=bg(e),_=Sg(s),g=r.createProgram(),m,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter($s).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter($s).join(`
`),p.length>0&&(p+=`
`)):(m=[Bd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),p=[Bd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Gn?yg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,xg("linearToOutputTexel",e.outputColorSpace),vg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($s).join(`
`)),a=ql(a),a=Od(a,e),a=Ud(a,e),o=ql(o),o=Od(o,e),o=Ud(o,e),a=Fd(a),o=Fd(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Rl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=w+m+a,M=w+p+o,D=Pd(r,r.VERTEX_SHADER,b),P=Pd(r,r.FRAGMENT_SHADER,M);r.attachShader(g,D),r.attachShader(g,P),e.index0AttributeName!==void 0?r.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function E(C){if(i.debug.checkShaderErrors){let y=r.getProgramInfoLog(g).trim(),U=r.getShaderInfoLog(D).trim(),q=r.getShaderInfoLog(P).trim(),G=!0,J=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,D,P);else{let X=Ld(r,D,"vertex"),Z=Ld(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+y+`
`+X+`
`+Z)}else y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",y):(U===""||q==="")&&(J=!1);J&&(C.diagnostics={runnable:G,programLog:y,vertexShader:{log:U,prefix:m},fragmentShader:{log:q,prefix:p}})}r.deleteShader(D),r.deleteShader(P),O=new Pr(r,g),T=wg(r,g)}let O;this.getUniforms=function(){return O===void 0&&E(this),O};let T;this.getAttributes=function(){return T===void 0&&E(this),T};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(g,pg)),x},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=mg++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=D,this.fragmentShader=P,this}var Ug=0,Yl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Zl(t),e.set(t,n)),n}},Zl=class{constructor(t){this.id=Ug++,this.code=t,this.usedTimes=0}};function Fg(i,t,e,n,r,s,a){let o=new br,c=new Yl,l=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures,d=r.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(T){return l.add(T),T===0?"uv":`uv${T}`}function m(T,x,C,y,U){let q=y.fog,G=U.geometry,J=T.isMeshStandardMaterial?y.environment:null,X=(T.isMeshStandardMaterial?e:t).get(T.envMap||J),Z=X&&X.mapping===Hs?X.image.height:null,k=_[T.type];T.precision!==null&&(d=r.getMaxPrecision(T.precision),d!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",d,"instead."));let N=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=N!==void 0?N.length:0,ht=0;G.morphAttributes.position!==void 0&&(ht=1),G.morphAttributes.normal!==void 0&&(ht=2),G.morphAttributes.color!==void 0&&(ht=3);let ct,rt,pt,mt;if(k){let re=Ve[k];ct=re.vertexShader,rt=re.fragmentShader}else ct=T.vertexShader,rt=T.fragmentShader,c.update(T),pt=c.getVertexShaderID(T),mt=c.getFragmentShaderID(T);let ft=i.getRenderTarget(),At=i.state.buffers.depth.getReversed(),It=U.isInstancedMesh===!0,Ft=U.isBatchedMesh===!0,Yt=!!T.map,v=!!T.matcap,it=!!X,I=!!T.aoMap,F=!!T.lightMap,L=!!T.bumpMap,z=!!T.normalMap,Q=!!T.displacementMap,at=!!T.emissiveMap,H=!!T.metalnessMap,A=!!T.roughnessMap,S=T.anisotropy>0,B=T.clearcoat>0,j=T.dispersion>0,ot=T.iridescence>0,tt=T.sheen>0,wt=T.transmission>0,yt=S&&!!T.anisotropyMap,vt=B&&!!T.clearcoatMap,Gt=B&&!!T.clearcoatNormalMap,lt=B&&!!T.clearcoatRoughnessMap,Et=ot&&!!T.iridescenceMap,Lt=ot&&!!T.iridescenceThicknessMap,Dt=tt&&!!T.sheenColorMap,Tt=tt&&!!T.sheenRoughnessMap,qt=!!T.specularMap,zt=!!T.specularColorMap,oe=!!T.specularIntensityMap,W=wt&&!!T.transmissionMap,xt=wt&&!!T.thicknessMap,st=!!T.gradientMap,dt=!!T.alphaMap,Mt=T.alphaTest>0,St=!!T.alphaHash,Vt=!!T.extensions,me=Gn;T.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(me=i.toneMapping);let Le={shaderID:k,shaderType:T.type,shaderName:T.name,vertexShader:ct,fragmentShader:rt,defines:T.defines,customVertexShaderID:pt,customFragmentShaderID:mt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:d,batching:Ft,batchingColor:Ft&&U._colorsTexture!==null,instancing:It,instancingColor:It&&U.instanceColor!==null,instancingMorph:It&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ft===null?i.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:wi,alphaToCoverage:!!T.alphaToCoverage,map:Yt,matcap:v,envMap:it,envMapMode:it&&X.mapping,envMapCubeUVHeight:Z,aoMap:I,lightMap:F,bumpMap:L,normalMap:z,displacementMap:f&&Q,emissiveMap:at,normalMapObjectSpace:z&&T.normalMapType===id,normalMapTangentSpace:z&&T.normalMapType===nd,metalnessMap:H,roughnessMap:A,anisotropy:S,anisotropyMap:yt,clearcoat:B,clearcoatMap:vt,clearcoatNormalMap:Gt,clearcoatRoughnessMap:lt,dispersion:j,iridescence:ot,iridescenceMap:Et,iridescenceThicknessMap:Lt,sheen:tt,sheenColorMap:Dt,sheenRoughnessMap:Tt,specularMap:qt,specularColorMap:zt,specularIntensityMap:oe,transmission:wt,transmissionMap:W,thicknessMap:xt,gradientMap:st,opaque:T.transparent===!1&&T.blending===yi&&T.alphaToCoverage===!1,alphaMap:dt,alphaTest:Mt,alphaHash:St,combine:T.combine,mapUv:Yt&&g(T.map.channel),aoMapUv:I&&g(T.aoMap.channel),lightMapUv:F&&g(T.lightMap.channel),bumpMapUv:L&&g(T.bumpMap.channel),normalMapUv:z&&g(T.normalMap.channel),displacementMapUv:Q&&g(T.displacementMap.channel),emissiveMapUv:at&&g(T.emissiveMap.channel),metalnessMapUv:H&&g(T.metalnessMap.channel),roughnessMapUv:A&&g(T.roughnessMap.channel),anisotropyMapUv:yt&&g(T.anisotropyMap.channel),clearcoatMapUv:vt&&g(T.clearcoatMap.channel),clearcoatNormalMapUv:Gt&&g(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&g(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&g(T.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&g(T.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&g(T.sheenColorMap.channel),sheenRoughnessMapUv:Tt&&g(T.sheenRoughnessMap.channel),specularMapUv:qt&&g(T.specularMap.channel),specularColorMapUv:zt&&g(T.specularColorMap.channel),specularIntensityMapUv:oe&&g(T.specularIntensityMap.channel),transmissionMapUv:W&&g(T.transmissionMap.channel),thicknessMapUv:xt&&g(T.thicknessMap.channel),alphaMapUv:dt&&g(T.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(z||S),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!G.attributes.uv&&(Yt||dt),fog:!!q,useFog:T.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:At,skinning:U.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:ht,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,decodeVideoTexture:Yt&&T.map.isVideoTexture===!0&&Jt.getTransfer(T.map.colorSpace)===ae,decodeVideoTextureEmissive:at&&T.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(T.emissiveMap.colorSpace)===ae,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===wn,flipSided:T.side===Ie,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Vt&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&T.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Le.vertexUv1s=l.has(1),Le.vertexUv2s=l.has(2),Le.vertexUv3s=l.has(3),l.clear(),Le}function p(T){let x=[];if(T.shaderID?x.push(T.shaderID):(x.push(T.customVertexShaderID),x.push(T.customFragmentShaderID)),T.defines!==void 0)for(let C in T.defines)x.push(C),x.push(T.defines[C]);return T.isRawShaderMaterial===!1&&(w(x,T),b(x,T),x.push(i.outputColorSpace)),x.push(T.customProgramCacheKey),x.join()}function w(T,x){T.push(x.precision),T.push(x.outputColorSpace),T.push(x.envMapMode),T.push(x.envMapCubeUVHeight),T.push(x.mapUv),T.push(x.alphaMapUv),T.push(x.lightMapUv),T.push(x.aoMapUv),T.push(x.bumpMapUv),T.push(x.normalMapUv),T.push(x.displacementMapUv),T.push(x.emissiveMapUv),T.push(x.metalnessMapUv),T.push(x.roughnessMapUv),T.push(x.anisotropyMapUv),T.push(x.clearcoatMapUv),T.push(x.clearcoatNormalMapUv),T.push(x.clearcoatRoughnessMapUv),T.push(x.iridescenceMapUv),T.push(x.iridescenceThicknessMapUv),T.push(x.sheenColorMapUv),T.push(x.sheenRoughnessMapUv),T.push(x.specularMapUv),T.push(x.specularColorMapUv),T.push(x.specularIntensityMapUv),T.push(x.transmissionMapUv),T.push(x.thicknessMapUv),T.push(x.combine),T.push(x.fogExp2),T.push(x.sizeAttenuation),T.push(x.morphTargetsCount),T.push(x.morphAttributeCount),T.push(x.numDirLights),T.push(x.numPointLights),T.push(x.numSpotLights),T.push(x.numSpotLightMaps),T.push(x.numHemiLights),T.push(x.numRectAreaLights),T.push(x.numDirLightShadows),T.push(x.numPointLightShadows),T.push(x.numSpotLightShadows),T.push(x.numSpotLightShadowsWithMaps),T.push(x.numLightProbes),T.push(x.shadowMapType),T.push(x.toneMapping),T.push(x.numClippingPlanes),T.push(x.numClipIntersection),T.push(x.depthPacking)}function b(T,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),T.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),T.push(o.mask)}function M(T){let x=_[T.type],C;if(x){let y=Ve[x];C=Ks.clone(y.uniforms)}else C=T.uniforms;return C}function D(T,x){let C;for(let y=0,U=u.length;y<U;y++){let q=u[y];if(q.cacheKey===x){C=q,++C.usedTimes;break}}return C===void 0&&(C=new Og(i,x,T,s),u.push(C)),C}function P(T){if(--T.usedTimes===0){let x=u.indexOf(T);u[x]=u[u.length-1],u.pop(),T.destroy()}}function E(T){c.remove(T)}function O(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:D,releaseProgram:P,releaseShaderCache:E,programs:u,dispose:O}}function Bg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function Ng(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Nd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function zd(){let i=[],t=0,e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(h,f,d,_,g,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=_,p.renderOrder=h.renderOrder,p.z=g,p.group=m),t++,p}function o(h,f,d,_,g,m){let p=a(h,f,d,_,g,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):e.push(p)}function c(h,f,d,_,g,m){let p=a(h,f,d,_,g,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):e.unshift(p)}function l(h,f){e.length>1&&e.sort(h||Ng),n.length>1&&n.sort(f||Nd),r.length>1&&r.sort(f||Nd)}function u(){for(let h=t,f=i.length;h<f;h++){let d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function zg(){let i=new WeakMap;function t(n,r){let s=i.get(n),a;return s===void 0?(a=new zd,i.set(n,[a])):r>=s.length?(a=new zd,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function kg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new Xt};break;case"SpotLight":e={position:new V,direction:new V,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new V,halfWidth:new V,halfHeight:new V};break}return i[t.id]=e,e}}}function Vg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Hg=0;function Gg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Wg(i){let t=new kg,e=Vg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);let r=new V,s=new he,a=new he;function o(l){let u=0,h=0,f=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let d=0,_=0,g=0,m=0,p=0,w=0,b=0,M=0,D=0,P=0,E=0;l.sort(Gg);for(let T=0,x=l.length;T<x;T++){let C=l[T],y=C.color,U=C.intensity,q=C.distance,G=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=y.r*U,h+=y.g*U,f+=y.b*U;else if(C.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(C.sh.coefficients[J],U);E++}else if(C.isDirectionalLight){let J=t.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let X=C.shadow,Z=e.get(C);Z.shadowIntensity=X.intensity,Z.shadowBias=X.bias,Z.shadowNormalBias=X.normalBias,Z.shadowRadius=X.radius,Z.shadowMapSize=X.mapSize,n.directionalShadow[d]=Z,n.directionalShadowMap[d]=G,n.directionalShadowMatrix[d]=C.shadow.matrix,w++}n.directional[d]=J,d++}else if(C.isSpotLight){let J=t.get(C);J.position.setFromMatrixPosition(C.matrixWorld),J.color.copy(y).multiplyScalar(U),J.distance=q,J.coneCos=Math.cos(C.angle),J.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),J.decay=C.decay,n.spot[g]=J;let X=C.shadow;if(C.map&&(n.spotLightMap[D]=C.map,D++,X.updateMatrices(C),C.castShadow&&P++),n.spotLightMatrix[g]=X.matrix,C.castShadow){let Z=e.get(C);Z.shadowIntensity=X.intensity,Z.shadowBias=X.bias,Z.shadowNormalBias=X.normalBias,Z.shadowRadius=X.radius,Z.shadowMapSize=X.mapSize,n.spotShadow[g]=Z,n.spotShadowMap[g]=G,M++}g++}else if(C.isRectAreaLight){let J=t.get(C);J.color.copy(y).multiplyScalar(U),J.halfWidth.set(C.width*.5,0,0),J.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=J,m++}else if(C.isPointLight){let J=t.get(C);if(J.color.copy(C.color).multiplyScalar(C.intensity),J.distance=C.distance,J.decay=C.decay,C.castShadow){let X=C.shadow,Z=e.get(C);Z.shadowIntensity=X.intensity,Z.shadowBias=X.bias,Z.shadowNormalBias=X.normalBias,Z.shadowRadius=X.radius,Z.shadowMapSize=X.mapSize,Z.shadowCameraNear=X.camera.near,Z.shadowCameraFar=X.camera.far,n.pointShadow[_]=Z,n.pointShadowMap[_]=G,n.pointShadowMatrix[_]=C.shadow.matrix,b++}n.point[_]=J,_++}else if(C.isHemisphereLight){let J=t.get(C);J.skyColor.copy(C.color).multiplyScalar(U),J.groundColor.copy(C.groundColor).multiplyScalar(U),n.hemi[p]=J,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=gt.LTC_FLOAT_1,n.rectAreaLTC2=gt.LTC_FLOAT_2):(n.rectAreaLTC1=gt.LTC_HALF_1,n.rectAreaLTC2=gt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;let O=n.hash;(O.directionalLength!==d||O.pointLength!==_||O.spotLength!==g||O.rectAreaLength!==m||O.hemiLength!==p||O.numDirectionalShadows!==w||O.numPointShadows!==b||O.numSpotShadows!==M||O.numSpotMaps!==D||O.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=M+D-P,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=E,O.directionalLength=d,O.pointLength=_,O.spotLength=g,O.rectAreaLength=m,O.hemiLength=p,O.numDirectionalShadows=w,O.numPointShadows=b,O.numSpotShadows=M,O.numSpotMaps=D,O.numLightProbes=E,n.version=Hg++)}function c(l,u){let h=0,f=0,d=0,_=0,g=0,m=u.matrixWorldInverse;for(let p=0,w=l.length;p<w;p++){let b=l[p];if(b.isDirectionalLight){let M=n.directional[h];M.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),h++}else if(b.isSpotLight){let M=n.spot[d];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),d++}else if(b.isRectAreaLight){let M=n.rectArea[_];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),a.identity(),s.copy(b.matrixWorld),s.premultiply(m),a.extractRotation(s),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){let M=n.hemi[g];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function kd(i){let t=new Wg(i),e=[],n=[];function r(u){l.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function Xg(i){let t=new WeakMap;function e(r,s=0){let a=t.get(r),o;return a===void 0?(o=new kd(i),t.set(r,[o])):s>=a.length?(o=new kd(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var qg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Zg(i,t,e){let n=new Ts,r=new Pt,s=new Pt,a=new ie,o=new to({depthPacking:ed}),c=new eo,l={},u=e.maxTextureSize,h={[Nn]:Ie,[Ie]:Nn,[wn]:wn},f=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pt},radius:{value:4}},vertexShader:qg,fragmentShader:Yg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let _=new ve;_.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new fe(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fl;let p=this.type;this.render=function(P,E,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;let T=i.getRenderTarget(),x=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),y=i.state;y.setBlending(Hn),y.buffers.color.setClear(1,1,1,1),y.buffers.depth.setTest(!0),y.setScissorTest(!1);let U=p!==Sn&&this.type===Sn,q=p===Sn&&this.type!==Sn;for(let G=0,J=P.length;G<J;G++){let X=P[G],Z=X.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);let k=Z.getFrameExtents();if(r.multiply(k),s.copy(Z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/k.x),r.x=s.x*k.x,Z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/k.y),r.y=s.y*k.y,Z.mapSize.y=s.y)),Z.map===null||U===!0||q===!0){let ut=this.type!==Sn?{minFilter:nn,magFilter:nn}:{};Z.map!==null&&Z.map.dispose(),Z.map=new yn(r.x,r.y,ut),Z.map.texture.name=X.name+".shadowMap",Z.camera.updateProjectionMatrix()}i.setRenderTarget(Z.map),i.clear();let N=Z.getViewportCount();for(let ut=0;ut<N;ut++){let ht=Z.getViewport(ut);a.set(s.x*ht.x,s.y*ht.y,s.x*ht.z,s.y*ht.w),y.viewport(a),Z.updateMatrices(X,ut),n=Z.getFrustum(),M(E,O,Z.camera,X,this.type)}Z.isPointLightShadow!==!0&&this.type===Sn&&w(Z,O),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,x,C)};function w(P,E){let O=t.update(g);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,d.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new yn(r.x,r.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(E,null,O,f,g,null),d.uniforms.shadow_pass.value=P.mapPass.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(E,null,O,d,g,null)}function b(P,E,O,T){let x=null,C=O.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(C!==void 0)x=C;else if(x=O.isPointLight===!0?c:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){let y=x.uuid,U=E.uuid,q=l[y];q===void 0&&(q={},l[y]=q);let G=q[U];G===void 0&&(G=x.clone(),q[U]=G,E.addEventListener("dispose",D)),x=G}if(x.visible=E.visible,x.wireframe=E.wireframe,T===Sn?x.side=E.shadowSide!==null?E.shadowSide:E.side:x.side=E.shadowSide!==null?E.shadowSide:h[E.side],x.alphaMap=E.alphaMap,x.alphaTest=E.alphaTest,x.map=E.map,x.clipShadows=E.clipShadows,x.clippingPlanes=E.clippingPlanes,x.clipIntersection=E.clipIntersection,x.displacementMap=E.displacementMap,x.displacementScale=E.displacementScale,x.displacementBias=E.displacementBias,x.wireframeLinewidth=E.wireframeLinewidth,x.linewidth=E.linewidth,O.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let y=i.properties.get(x);y.light=O}return x}function M(P,E,O,T,x){if(P.visible===!1)return;if(P.layers.test(E.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&x===Sn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,P.matrixWorld);let U=t.update(P),q=P.material;if(Array.isArray(q)){let G=U.groups;for(let J=0,X=G.length;J<X;J++){let Z=G[J],k=q[Z.materialIndex];if(k&&k.visible){let N=b(P,k,T,x);P.onBeforeShadow(i,P,E,O,U,N,Z),i.renderBufferDirect(O,null,U,N,P,Z),P.onAfterShadow(i,P,E,O,U,N,Z)}}}else if(q.visible){let G=b(P,q,T,x);P.onBeforeShadow(i,P,E,O,U,G,null),i.renderBufferDirect(O,null,U,G,P,null),P.onAfterShadow(i,P,E,O,U,G,null)}}let y=P.children;for(let U=0,q=y.length;U<q;U++)M(y[U],E,O,T,x)}function D(P){P.target.removeEventListener("dispose",D);for(let O in l){let T=l[O],x=P.target.uuid;x in T&&(T[x].dispose(),delete T[x])}}}var Kg={[mo]:_o,[go]:vo,[xo]:bo,[vi]:yo,[_o]:mo,[vo]:go,[bo]:xo,[yo]:vi};function $g(i,t){function e(){let W=!1,xt=new ie,st=null,dt=new ie(0,0,0,0);return{setMask:function(Mt){st!==Mt&&!W&&(i.colorMask(Mt,Mt,Mt,Mt),st=Mt)},setLocked:function(Mt){W=Mt},setClear:function(Mt,St,Vt,me,Le){Le===!0&&(Mt*=me,St*=me,Vt*=me),xt.set(Mt,St,Vt,me),dt.equals(xt)===!1&&(i.clearColor(Mt,St,Vt,me),dt.copy(xt))},reset:function(){W=!1,st=null,dt.set(-1,0,0,0)}}}function n(){let W=!1,xt=!1,st=null,dt=null,Mt=null;return{setReversed:function(St){if(xt!==St){let Vt=t.get("EXT_clip_control");xt?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);let me=Mt;Mt=null,this.setClear(me)}xt=St},getReversed:function(){return xt},setTest:function(St){St?ft(i.DEPTH_TEST):At(i.DEPTH_TEST)},setMask:function(St){st!==St&&!W&&(i.depthMask(St),st=St)},setFunc:function(St){if(xt&&(St=Kg[St]),dt!==St){switch(St){case mo:i.depthFunc(i.NEVER);break;case _o:i.depthFunc(i.ALWAYS);break;case go:i.depthFunc(i.LESS);break;case vi:i.depthFunc(i.LEQUAL);break;case xo:i.depthFunc(i.EQUAL);break;case yo:i.depthFunc(i.GEQUAL);break;case vo:i.depthFunc(i.GREATER);break;case bo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}dt=St}},setLocked:function(St){W=St},setClear:function(St){Mt!==St&&(xt&&(St=1-St),i.clearDepth(St),Mt=St)},reset:function(){W=!1,st=null,dt=null,Mt=null,xt=!1}}}function r(){let W=!1,xt=null,st=null,dt=null,Mt=null,St=null,Vt=null,me=null,Le=null;return{setTest:function(re){W||(re?ft(i.STENCIL_TEST):At(i.STENCIL_TEST))},setMask:function(re){xt!==re&&!W&&(i.stencilMask(re),xt=re)},setFunc:function(re,on,In){(st!==re||dt!==on||Mt!==In)&&(i.stencilFunc(re,on,In),st=re,dt=on,Mt=In)},setOp:function(re,on,In){(St!==re||Vt!==on||me!==In)&&(i.stencilOp(re,on,In),St=re,Vt=on,me=In)},setLocked:function(re){W=re},setClear:function(re){Le!==re&&(i.clearStencil(re),Le=re)},reset:function(){W=!1,xt=null,st=null,dt=null,Mt=null,St=null,Vt=null,me=null,Le=null}}}let s=new e,a=new n,o=new r,c=new WeakMap,l=new WeakMap,u={},h={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,w=null,b=null,M=null,D=null,P=null,E=new Xt(0,0,0),O=0,T=!1,x=null,C=null,y=null,U=null,q=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,X=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Z)[1]),J=X>=1):Z.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),J=X>=2);let k=null,N={},ut=i.getParameter(i.SCISSOR_BOX),ht=i.getParameter(i.VIEWPORT),ct=new ie().fromArray(ut),rt=new ie().fromArray(ht);function pt(W,xt,st,dt){let Mt=new Uint8Array(4),St=i.createTexture();i.bindTexture(W,St),i.texParameteri(W,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(W,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Vt=0;Vt<st;Vt++)W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?i.texImage3D(xt,0,i.RGBA,1,1,dt,0,i.RGBA,i.UNSIGNED_BYTE,Mt):i.texImage2D(xt+Vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Mt);return St}let mt={};mt[i.TEXTURE_2D]=pt(i.TEXTURE_2D,i.TEXTURE_2D,1),mt[i.TEXTURE_CUBE_MAP]=pt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[i.TEXTURE_2D_ARRAY]=pt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),mt[i.TEXTURE_3D]=pt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ft(i.DEPTH_TEST),a.setFunc(vi),L(!1),z(dl),ft(i.CULL_FACE),I(Hn);function ft(W){u[W]!==!0&&(i.enable(W),u[W]=!0)}function At(W){u[W]!==!1&&(i.disable(W),u[W]=!1)}function It(W,xt){return h[W]!==xt?(i.bindFramebuffer(W,xt),h[W]=xt,W===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=xt),W===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=xt),!0):!1}function Ft(W,xt){let st=d,dt=!1;if(W){st=f.get(xt),st===void 0&&(st=[],f.set(xt,st));let Mt=W.textures;if(st.length!==Mt.length||st[0]!==i.COLOR_ATTACHMENT0){for(let St=0,Vt=Mt.length;St<Vt;St++)st[St]=i.COLOR_ATTACHMENT0+St;st.length=Mt.length,dt=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,dt=!0);dt&&i.drawBuffers(st)}function Yt(W){return _!==W?(i.useProgram(W),_=W,!0):!1}let v={[ti]:i.FUNC_ADD,[Tu]:i.FUNC_SUBTRACT,[Cu]:i.FUNC_REVERSE_SUBTRACT};v[Iu]=i.MIN,v[Ru]=i.MAX;let it={[Pu]:i.ZERO,[Du]:i.ONE,[Lu]:i.SRC_COLOR,[ka]:i.SRC_ALPHA,[zu]:i.SRC_ALPHA_SATURATE,[Bu]:i.DST_COLOR,[Uu]:i.DST_ALPHA,[Ou]:i.ONE_MINUS_SRC_COLOR,[Va]:i.ONE_MINUS_SRC_ALPHA,[Nu]:i.ONE_MINUS_DST_COLOR,[Fu]:i.ONE_MINUS_DST_ALPHA,[ku]:i.CONSTANT_COLOR,[Vu]:i.ONE_MINUS_CONSTANT_COLOR,[Hu]:i.CONSTANT_ALPHA,[Gu]:i.ONE_MINUS_CONSTANT_ALPHA};function I(W,xt,st,dt,Mt,St,Vt,me,Le,re){if(W===Hn){g===!0&&(At(i.BLEND),g=!1);return}if(g===!1&&(ft(i.BLEND),g=!0),W!==Au){if(W!==m||re!==T){if((p!==ti||M!==ti)&&(i.blendEquation(i.FUNC_ADD),p=ti,M=ti),re)switch(W){case yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pl:i.blendFunc(i.ONE,i.ONE);break;case ml:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _l:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ml:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _l:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}w=null,b=null,D=null,P=null,E.set(0,0,0),O=0,m=W,T=re}return}Mt=Mt||xt,St=St||st,Vt=Vt||dt,(xt!==p||Mt!==M)&&(i.blendEquationSeparate(v[xt],v[Mt]),p=xt,M=Mt),(st!==w||dt!==b||St!==D||Vt!==P)&&(i.blendFuncSeparate(it[st],it[dt],it[St],it[Vt]),w=st,b=dt,D=St,P=Vt),(me.equals(E)===!1||Le!==O)&&(i.blendColor(me.r,me.g,me.b,Le),E.copy(me),O=Le),m=W,T=!1}function F(W,xt){W.side===wn?At(i.CULL_FACE):ft(i.CULL_FACE);let st=W.side===Ie;xt&&(st=!st),L(st),W.blending===yi&&W.transparent===!1?I(Hn):I(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),a.setFunc(W.depthFunc),a.setTest(W.depthTest),a.setMask(W.depthWrite),s.setMask(W.colorWrite);let dt=W.stencilWrite;o.setTest(dt),dt&&(o.setMask(W.stencilWriteMask),o.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),o.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),at(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?ft(i.SAMPLE_ALPHA_TO_COVERAGE):At(i.SAMPLE_ALPHA_TO_COVERAGE)}function L(W){x!==W&&(W?i.frontFace(i.CW):i.frontFace(i.CCW),x=W)}function z(W){W!==wu?(ft(i.CULL_FACE),W!==C&&(W===dl?i.cullFace(i.BACK):W===Mu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):At(i.CULL_FACE),C=W}function Q(W){W!==y&&(J&&i.lineWidth(W),y=W)}function at(W,xt,st){W?(ft(i.POLYGON_OFFSET_FILL),(U!==xt||q!==st)&&(i.polygonOffset(xt,st),U=xt,q=st)):At(i.POLYGON_OFFSET_FILL)}function H(W){W?ft(i.SCISSOR_TEST):At(i.SCISSOR_TEST)}function A(W){W===void 0&&(W=i.TEXTURE0+G-1),k!==W&&(i.activeTexture(W),k=W)}function S(W,xt,st){st===void 0&&(k===null?st=i.TEXTURE0+G-1:st=k);let dt=N[st];dt===void 0&&(dt={type:void 0,texture:void 0},N[st]=dt),(dt.type!==W||dt.texture!==xt)&&(k!==st&&(i.activeTexture(st),k=st),i.bindTexture(W,xt||mt[W]),dt.type=W,dt.texture=xt)}function B(){let W=N[k];W!==void 0&&W.type!==void 0&&(i.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ot(){try{i.compressedTexImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function tt(){try{i.texSubImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function wt(){try{i.texSubImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function yt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function vt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Gt(){try{i.texStorage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function lt(){try{i.texStorage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Et(){try{i.texImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Lt(){try{i.texImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Dt(W){ct.equals(W)===!1&&(i.scissor(W.x,W.y,W.z,W.w),ct.copy(W))}function Tt(W){rt.equals(W)===!1&&(i.viewport(W.x,W.y,W.z,W.w),rt.copy(W))}function qt(W,xt){let st=l.get(xt);st===void 0&&(st=new WeakMap,l.set(xt,st));let dt=st.get(W);dt===void 0&&(dt=i.getUniformBlockIndex(xt,W.name),st.set(W,dt))}function zt(W,xt){let dt=l.get(xt).get(W);c.get(xt)!==dt&&(i.uniformBlockBinding(xt,dt,W.__bindingPointIndex),c.set(xt,dt))}function oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},k=null,N={},h={},f=new WeakMap,d=[],_=null,g=!1,m=null,p=null,w=null,b=null,M=null,D=null,P=null,E=new Xt(0,0,0),O=0,T=!1,x=null,C=null,y=null,U=null,q=null,ct.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ft,disable:At,bindFramebuffer:It,drawBuffers:Ft,useProgram:Yt,setBlending:I,setMaterial:F,setFlipSided:L,setCullFace:z,setLineWidth:Q,setPolygonOffset:at,setScissorTest:H,activeTexture:A,bindTexture:S,unbindTexture:B,compressedTexImage2D:j,compressedTexImage3D:ot,texImage2D:Et,texImage3D:Lt,updateUBOMapping:qt,uniformBlockBinding:zt,texStorage2D:Gt,texStorage3D:lt,texSubImage2D:tt,texSubImage3D:wt,compressedTexSubImage2D:yt,compressedTexSubImage3D:vt,scissor:Dt,viewport:Tt,reset:oe}}function Jg(i,t,e,n,r,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Pt,u=new WeakMap,h,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,S){return d?new OffscreenCanvas(A,S):vr("canvas")}function g(A,S,B){let j=1,ot=H(A);if((ot.width>B||ot.height>B)&&(j=B/Math.max(ot.width,ot.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let tt=Math.floor(j*ot.width),wt=Math.floor(j*ot.height);h===void 0&&(h=_(tt,wt));let yt=S?_(tt,wt):h;return yt.width=tt,yt.height=wt,yt.getContext("2d").drawImage(A,0,0,tt,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+tt+"x"+wt+")."),yt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(A,S,B,j,ot=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let tt=S;if(S===i.RED&&(B===i.FLOAT&&(tt=i.R32F),B===i.HALF_FLOAT&&(tt=i.R16F),B===i.UNSIGNED_BYTE&&(tt=i.R8)),S===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(tt=i.R8UI),B===i.UNSIGNED_SHORT&&(tt=i.R16UI),B===i.UNSIGNED_INT&&(tt=i.R32UI),B===i.BYTE&&(tt=i.R8I),B===i.SHORT&&(tt=i.R16I),B===i.INT&&(tt=i.R32I)),S===i.RG&&(B===i.FLOAT&&(tt=i.RG32F),B===i.HALF_FLOAT&&(tt=i.RG16F),B===i.UNSIGNED_BYTE&&(tt=i.RG8)),S===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(tt=i.RG8UI),B===i.UNSIGNED_SHORT&&(tt=i.RG16UI),B===i.UNSIGNED_INT&&(tt=i.RG32UI),B===i.BYTE&&(tt=i.RG8I),B===i.SHORT&&(tt=i.RG16I),B===i.INT&&(tt=i.RG32I)),S===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(tt=i.RGB8UI),B===i.UNSIGNED_SHORT&&(tt=i.RGB16UI),B===i.UNSIGNED_INT&&(tt=i.RGB32UI),B===i.BYTE&&(tt=i.RGB8I),B===i.SHORT&&(tt=i.RGB16I),B===i.INT&&(tt=i.RGB32I)),S===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(tt=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(tt=i.RGBA16UI),B===i.UNSIGNED_INT&&(tt=i.RGBA32UI),B===i.BYTE&&(tt=i.RGBA8I),B===i.SHORT&&(tt=i.RGBA16I),B===i.INT&&(tt=i.RGBA32I)),S===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(tt=i.RGB9_E5),S===i.RGBA){let wt=ot?gs:Jt.getTransfer(j);B===i.FLOAT&&(tt=i.RGBA32F),B===i.HALF_FLOAT&&(tt=i.RGBA16F),B===i.UNSIGNED_BYTE&&(tt=wt===ae?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(tt=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(tt=i.RGB5_A1)}return(tt===i.R16F||tt===i.R32F||tt===i.RG16F||tt===i.RG32F||tt===i.RGBA16F||tt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function M(A,S){let B;return A?S===null||S===ci||S===Ri?B=i.DEPTH24_STENCIL8:S===En?B=i.DEPTH32F_STENCIL8:S===Tr&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ci||S===Ri?B=i.DEPTH_COMPONENT24:S===En?B=i.DEPTH_COMPONENT32F:S===Tr&&(B=i.DEPTH_COMPONENT16),B}function D(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==nn&&A.minFilter!==pn?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function P(A){let S=A.target;S.removeEventListener("dispose",P),O(S),S.isVideoTexture&&u.delete(S)}function E(A){let S=A.target;S.removeEventListener("dispose",E),x(S)}function O(A){let S=n.get(A);if(S.__webglInit===void 0)return;let B=A.source,j=f.get(B);if(j){let ot=j[S.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&T(A),Object.keys(j).length===0&&f.delete(B)}n.remove(A)}function T(A){let S=n.get(A);i.deleteTexture(S.__webglTexture);let B=A.source,j=f.get(B);delete j[S.__cacheKey],a.memory.textures--}function x(A){let S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let ot=0;ot<S.__webglFramebuffer[j].length;ot++)i.deleteFramebuffer(S.__webglFramebuffer[j][ot]);else i.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)i.deleteFramebuffer(S.__webglFramebuffer[j]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let B=A.textures;for(let j=0,ot=B.length;j<ot;j++){let tt=n.get(B[j]);tt.__webglTexture&&(i.deleteTexture(tt.__webglTexture),a.memory.textures--),n.remove(B[j])}n.remove(A)}let C=0;function y(){C=0}function U(){let A=C;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),C+=1,A}function q(A){let S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function G(A,S){let B=n.get(A);if(A.isVideoTexture&&Q(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){let j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(B,A,S);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+S)}function J(A,S){let B=n.get(A);if(A.version>0&&B.__version!==A.version){rt(B,A,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+S)}function X(A,S){let B=n.get(A);if(A.version>0&&B.__version!==A.version){rt(B,A,S);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+S)}function Z(A,S){let B=n.get(A);if(A.version>0&&B.__version!==A.version){pt(B,A,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+S)}let k={[bi]:i.REPEAT,[Qn]:i.CLAMP_TO_EDGE,[Ha]:i.MIRRORED_REPEAT},N={[nn]:i.NEAREST,[Qu]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[pn]:i.LINEAR,[Mo]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},ut={[rd]:i.NEVER,[hd]:i.ALWAYS,[sd]:i.LESS,[Il]:i.LEQUAL,[ad]:i.EQUAL,[ld]:i.GEQUAL,[od]:i.GREATER,[cd]:i.NOTEQUAL};function ht(A,S){if(S.type===En&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===pn||S.magFilter===Mo||S.magFilter===Gs||S.magFilter===oi||S.minFilter===pn||S.minFilter===Mo||S.minFilter===Gs||S.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,k[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,k[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,k[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,N[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,N[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ut[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===nn||S.minFilter!==Gs&&S.minFilter!==oi||S.type===En&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ct(A,S){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",P));let j=S.source,ot=f.get(j);ot===void 0&&(ot={},f.set(j,ot));let tt=q(S);if(tt!==A.__cacheKey){ot[tt]===void 0&&(ot[tt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ot[tt].usedTimes++;let wt=ot[A.__cacheKey];wt!==void 0&&(ot[A.__cacheKey].usedTimes--,wt.usedTimes===0&&T(S)),A.__cacheKey=tt,A.__webglTexture=ot[tt].texture}return B}function rt(A,S,B){let j=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=i.TEXTURE_3D);let ot=ct(A,S),tt=S.source;e.bindTexture(j,A.__webglTexture,i.TEXTURE0+B);let wt=n.get(tt);if(tt.version!==wt.__version||ot===!0){e.activeTexture(i.TEXTURE0+B);let yt=Jt.getPrimaries(Jt.workingColorSpace),vt=S.colorSpace===Wn?null:Jt.getPrimaries(S.colorSpace),Gt=S.colorSpace===Wn||yt===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt);let lt=g(S.image,!1,r.maxTextureSize);lt=at(S,lt);let Et=s.convert(S.format,S.colorSpace),Lt=s.convert(S.type),Dt=b(S.internalFormat,Et,Lt,S.colorSpace,S.isVideoTexture);ht(j,S);let Tt,qt=S.mipmaps,zt=S.isVideoTexture!==!0,oe=wt.__version===void 0||ot===!0,W=tt.dataReady,xt=D(S,lt);if(S.isDepthTexture)Dt=M(S.format===Si,S.type),oe&&(zt?e.texStorage2D(i.TEXTURE_2D,1,Dt,lt.width,lt.height):e.texImage2D(i.TEXTURE_2D,0,Dt,lt.width,lt.height,0,Et,Lt,null));else if(S.isDataTexture)if(qt.length>0){zt&&oe&&e.texStorage2D(i.TEXTURE_2D,xt,Dt,qt[0].width,qt[0].height);for(let st=0,dt=qt.length;st<dt;st++)Tt=qt[st],zt?W&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Tt.width,Tt.height,Et,Lt,Tt.data):e.texImage2D(i.TEXTURE_2D,st,Dt,Tt.width,Tt.height,0,Et,Lt,Tt.data);S.generateMipmaps=!1}else zt?(oe&&e.texStorage2D(i.TEXTURE_2D,xt,Dt,lt.width,lt.height),W&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt.width,lt.height,Et,Lt,lt.data)):e.texImage2D(i.TEXTURE_2D,0,Dt,lt.width,lt.height,0,Et,Lt,lt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){zt&&oe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,Dt,qt[0].width,qt[0].height,lt.depth);for(let st=0,dt=qt.length;st<dt;st++)if(Tt=qt[st],S.format!==an)if(Et!==null)if(zt){if(W)if(S.layerUpdates.size>0){let Mt=Fl(Tt.width,Tt.height,S.format,S.type);for(let St of S.layerUpdates){let Vt=Tt.data.subarray(St*Mt/Tt.data.BYTES_PER_ELEMENT,(St+1)*Mt/Tt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,St,Tt.width,Tt.height,1,Et,Vt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Tt.width,Tt.height,lt.depth,Et,Tt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,Dt,Tt.width,Tt.height,lt.depth,0,Tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?W&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Tt.width,Tt.height,lt.depth,Et,Lt,Tt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,Dt,Tt.width,Tt.height,lt.depth,0,Et,Lt,Tt.data)}else{zt&&oe&&e.texStorage2D(i.TEXTURE_2D,xt,Dt,qt[0].width,qt[0].height);for(let st=0,dt=qt.length;st<dt;st++)Tt=qt[st],S.format!==an?Et!==null?zt?W&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,Tt.width,Tt.height,Et,Tt.data):e.compressedTexImage2D(i.TEXTURE_2D,st,Dt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?W&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Tt.width,Tt.height,Et,Lt,Tt.data):e.texImage2D(i.TEXTURE_2D,st,Dt,Tt.width,Tt.height,0,Et,Lt,Tt.data)}else if(S.isDataArrayTexture)if(zt){if(oe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,Dt,lt.width,lt.height,lt.depth),W)if(S.layerUpdates.size>0){let st=Fl(lt.width,lt.height,S.format,S.type);for(let dt of S.layerUpdates){let Mt=lt.data.subarray(dt*st/lt.data.BYTES_PER_ELEMENT,(dt+1)*st/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,dt,lt.width,lt.height,1,Et,Lt,Mt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,Et,Lt,lt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,lt.width,lt.height,lt.depth,0,Et,Lt,lt.data);else if(S.isData3DTexture)zt?(oe&&e.texStorage3D(i.TEXTURE_3D,xt,Dt,lt.width,lt.height,lt.depth),W&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,Et,Lt,lt.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,lt.width,lt.height,lt.depth,0,Et,Lt,lt.data);else if(S.isFramebufferTexture){if(oe)if(zt)e.texStorage2D(i.TEXTURE_2D,xt,Dt,lt.width,lt.height);else{let st=lt.width,dt=lt.height;for(let Mt=0;Mt<xt;Mt++)e.texImage2D(i.TEXTURE_2D,Mt,Dt,st,dt,0,Et,Lt,null),st>>=1,dt>>=1}}else if(qt.length>0){if(zt&&oe){let st=H(qt[0]);e.texStorage2D(i.TEXTURE_2D,xt,Dt,st.width,st.height)}for(let st=0,dt=qt.length;st<dt;st++)Tt=qt[st],zt?W&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Et,Lt,Tt):e.texImage2D(i.TEXTURE_2D,st,Dt,Et,Lt,Tt);S.generateMipmaps=!1}else if(zt){if(oe){let st=H(lt);e.texStorage2D(i.TEXTURE_2D,xt,Dt,st.width,st.height)}W&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et,Lt,lt)}else e.texImage2D(i.TEXTURE_2D,0,Dt,Et,Lt,lt);m(S)&&p(j),wt.__version=tt.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function pt(A,S,B){if(S.image.length!==6)return;let j=ct(A,S),ot=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+B);let tt=n.get(ot);if(ot.version!==tt.__version||j===!0){e.activeTexture(i.TEXTURE0+B);let wt=Jt.getPrimaries(Jt.workingColorSpace),yt=S.colorSpace===Wn?null:Jt.getPrimaries(S.colorSpace),vt=S.colorSpace===Wn||wt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Gt=S.isCompressedTexture||S.image[0].isCompressedTexture,lt=S.image[0]&&S.image[0].isDataTexture,Et=[];for(let dt=0;dt<6;dt++)!Gt&&!lt?Et[dt]=g(S.image[dt],!0,r.maxCubemapSize):Et[dt]=lt?S.image[dt].image:S.image[dt],Et[dt]=at(S,Et[dt]);let Lt=Et[0],Dt=s.convert(S.format,S.colorSpace),Tt=s.convert(S.type),qt=b(S.internalFormat,Dt,Tt,S.colorSpace),zt=S.isVideoTexture!==!0,oe=tt.__version===void 0||j===!0,W=ot.dataReady,xt=D(S,Lt);ht(i.TEXTURE_CUBE_MAP,S);let st;if(Gt){zt&&oe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,qt,Lt.width,Lt.height);for(let dt=0;dt<6;dt++){st=Et[dt].mipmaps;for(let Mt=0;Mt<st.length;Mt++){let St=st[Mt];S.format!==an?Dt!==null?zt?W&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt,0,0,St.width,St.height,Dt,St.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt,qt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt,0,0,St.width,St.height,Dt,Tt,St.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt,qt,St.width,St.height,0,Dt,Tt,St.data)}}}else{if(st=S.mipmaps,zt&&oe){st.length>0&&xt++;let dt=H(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,qt,dt.width,dt.height)}for(let dt=0;dt<6;dt++)if(lt){zt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Et[dt].width,Et[dt].height,Dt,Tt,Et[dt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,qt,Et[dt].width,Et[dt].height,0,Dt,Tt,Et[dt].data);for(let Mt=0;Mt<st.length;Mt++){let Vt=st[Mt].image[dt].image;zt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt+1,0,0,Vt.width,Vt.height,Dt,Tt,Vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt+1,qt,Vt.width,Vt.height,0,Dt,Tt,Vt.data)}}else{zt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Dt,Tt,Et[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,qt,Dt,Tt,Et[dt]);for(let Mt=0;Mt<st.length;Mt++){let St=st[Mt];zt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt+1,0,0,Dt,Tt,St.image[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt+1,qt,Dt,Tt,St.image[dt])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),tt.__version=ot.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function mt(A,S,B,j,ot,tt){let wt=s.convert(B.format,B.colorSpace),yt=s.convert(B.type),vt=b(B.internalFormat,wt,yt,B.colorSpace),Gt=n.get(S),lt=n.get(B);if(lt.__renderTarget=S,!Gt.__hasExternalTextures){let Et=Math.max(1,S.width>>tt),Lt=Math.max(1,S.height>>tt);ot===i.TEXTURE_3D||ot===i.TEXTURE_2D_ARRAY?e.texImage3D(ot,tt,vt,Et,Lt,S.depth,0,wt,yt,null):e.texImage2D(ot,tt,vt,Et,Lt,0,wt,yt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),z(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,ot,lt.__webglTexture,0,L(S)):(ot===i.TEXTURE_2D||ot>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,ot,lt.__webglTexture,tt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(A,S,B){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){let j=S.depthTexture,ot=j&&j.isDepthTexture?j.type:null,tt=M(S.stencilBuffer,ot),wt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=L(S);z(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,tt,S.width,S.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,tt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,tt,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,wt,i.RENDERBUFFER,A)}else{let j=S.textures;for(let ot=0;ot<j.length;ot++){let tt=j[ot],wt=s.convert(tt.format,tt.colorSpace),yt=s.convert(tt.type),vt=b(tt.internalFormat,wt,yt,tt.colorSpace),Gt=L(S);B&&z(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,vt,S.width,S.height):z(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Gt,vt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,vt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),G(S.depthTexture,0);let ot=j.__webglTexture,tt=L(S);if(S.depthTexture.format===xi)z(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0);else if(S.depthTexture.format===Si)z(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0,tt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function It(A){let S=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){let j=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){let ot=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",ot)};j.addEventListener("dispose",ot),S.__depthDisposeCallback=ot}S.__boundDepthTexture=j}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");At(S.__webglFramebuffer,A)}else if(B){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=i.createRenderbuffer(),ft(S.__webglDepthbuffer[j],A,!1);else{let ot=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=S.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,tt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,tt)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ft(S.__webglDepthbuffer,A,!1);else{let j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ot)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(A,S,B){let j=n.get(A);S!==void 0&&mt(j.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&It(A)}function Yt(A){let S=A.texture,B=n.get(A),j=n.get(S);A.addEventListener("dispose",E);let ot=A.textures,tt=A.isWebGLCubeRenderTarget===!0,wt=ot.length>1;if(wt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=S.version,a.memory.textures++),tt){B.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[yt]=[];for(let vt=0;vt<S.mipmaps.length;vt++)B.__webglFramebuffer[yt][vt]=i.createFramebuffer()}else B.__webglFramebuffer[yt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let yt=0;yt<S.mipmaps.length;yt++)B.__webglFramebuffer[yt]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(wt)for(let yt=0,vt=ot.length;yt<vt;yt++){let Gt=n.get(ot[yt]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&z(A)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let yt=0;yt<ot.length;yt++){let vt=ot[yt];B.__webglColorRenderbuffer[yt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[yt]);let Gt=s.convert(vt.format,vt.colorSpace),lt=s.convert(vt.type),Et=b(vt.internalFormat,Gt,lt,vt.colorSpace,A.isXRRenderTarget===!0),Lt=L(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,Et,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,B.__webglColorRenderbuffer[yt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(tt){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),ht(i.TEXTURE_CUBE_MAP,S);for(let yt=0;yt<6;yt++)if(S.mipmaps&&S.mipmaps.length>0)for(let vt=0;vt<S.mipmaps.length;vt++)mt(B.__webglFramebuffer[yt][vt],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,vt);else mt(B.__webglFramebuffer[yt],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let yt=0,vt=ot.length;yt<vt;yt++){let Gt=ot[yt],lt=n.get(Gt);e.bindTexture(i.TEXTURE_2D,lt.__webglTexture),ht(i.TEXTURE_2D,Gt),mt(B.__webglFramebuffer,A,Gt,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,0),m(Gt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let yt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(yt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(yt,j.__webglTexture),ht(yt,S),S.mipmaps&&S.mipmaps.length>0)for(let vt=0;vt<S.mipmaps.length;vt++)mt(B.__webglFramebuffer[vt],A,S,i.COLOR_ATTACHMENT0,yt,vt);else mt(B.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,yt,0);m(S)&&p(yt),e.unbindTexture()}A.depthBuffer&&It(A)}function v(A){let S=A.textures;for(let B=0,j=S.length;B<j;B++){let ot=S[B];if(m(ot)){let tt=w(A),wt=n.get(ot).__webglTexture;e.bindTexture(tt,wt),p(tt),e.unbindTexture()}}}let it=[],I=[];function F(A){if(A.samples>0){if(z(A)===!1){let S=A.textures,B=A.width,j=A.height,ot=i.COLOR_BUFFER_BIT,tt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,wt=n.get(A),yt=S.length>1;if(yt)for(let vt=0;vt<S.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let vt=0;vt<S.length;vt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ot|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ot|=i.STENCIL_BUFFER_BIT)),yt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,wt.__webglColorRenderbuffer[vt]);let Gt=n.get(S[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Gt,0)}i.blitFramebuffer(0,0,B,j,0,0,B,j,ot,i.NEAREST),c===!0&&(it.length=0,I.length=0,it.push(i.COLOR_ATTACHMENT0+vt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(it.push(tt),I.push(tt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,I)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,it))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),yt)for(let vt=0;vt<S.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,wt.__webglColorRenderbuffer[vt]);let Gt=n.get(S[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,wt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function L(A){return Math.min(r.maxSamples,A.samples)}function z(A){let S=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Q(A){let S=a.render.frame;u.get(A)!==S&&(u.set(A,S),A.update())}function at(A,S){let B=A.colorSpace,j=A.format,ot=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==wi&&B!==Wn&&(Jt.getTransfer(B)===ae?(j!==an||ot!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function H(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=y,this.setTexture2D=G,this.setTexture2DArray=J,this.setTexture3D=X,this.setTextureCube=Z,this.rebindTextures=Ft,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=v,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=z}function jg(i,t){function e(n,r=Wn){let s,a=Jt.getTransfer(r);if(n===Mn)return i.UNSIGNED_BYTE;if(n===Ao)return i.UNSIGNED_SHORT_4_4_4_4;if(n===To)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yl)return i.BYTE;if(n===vl)return i.SHORT;if(n===Tr)return i.UNSIGNED_SHORT;if(n===Eo)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===Cr)return i.HALF_FLOAT;if(n===Sl)return i.ALPHA;if(n===wl)return i.RGB;if(n===an)return i.RGBA;if(n===Ml)return i.LUMINANCE;if(n===El)return i.LUMINANCE_ALPHA;if(n===xi)return i.DEPTH_COMPONENT;if(n===Si)return i.DEPTH_STENCIL;if(n===Al)return i.RED;if(n===Co)return i.RED_INTEGER;if(n===Tl)return i.RG;if(n===Io)return i.RG_INTEGER;if(n===Ro)return i.RGBA_INTEGER;if(n===Ws||n===Xs||n===qs||n===Ys)if(a===ae)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ws)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ys)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ws)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ys)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Po||n===Do||n===Lo||n===Oo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Po)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Do)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Lo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Uo||n===Fo||n===Bo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Uo||n===Fo)return a===ae?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Bo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===No||n===zo||n===ko||n===Vo||n===Ho||n===Go||n===Wo||n===Xo||n===qo||n===Yo||n===Zo||n===Ko||n===$o||n===Jo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===No)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ko)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ho)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Go)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$o)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jo)return a===ae?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zs||n===jo||n===Qo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Zs)return a===ae?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Cl||n===tc||n===ec||n===nc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Zs)return s.COMPRESSED_RED_RGTC1_EXT;if(n===tc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ec)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ri?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Qg={type:"move"},Js=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let g of t.hand.values()){let m=e.getJointPose(g,n),p=this._getHandJoint(l,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,_=.005;l.inputState.pinching&&f>d+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qg)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new kn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},tx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ex=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Kl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let r=new ke,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new $e({vertexShader:tx,fragmentShader:ex,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new Ei(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},$l=class extends xn{constructor(t,e){super();let n=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,_=null,g=new Kl,m=e.getContextAttributes(),p=null,w=null,b=[],M=[],D=new Pt,P=null,E=new Ee;E.viewport=new ie;let O=new Ee;O.viewport=new ie;let T=[E,O],x=new fo,C=null,y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(rt){let pt=b[rt];return pt===void 0&&(pt=new Js,b[rt]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(rt){let pt=b[rt];return pt===void 0&&(pt=new Js,b[rt]=pt),pt.getGripSpace()},this.getHand=function(rt){let pt=b[rt];return pt===void 0&&(pt=new Js,b[rt]=pt),pt.getHandSpace()};function U(rt){let pt=M.indexOf(rt.inputSource);if(pt===-1)return;let mt=b[pt];mt!==void 0&&(mt.update(rt.inputSource,rt.frame,l||a),mt.dispatchEvent({type:rt.type,data:rt.inputSource}))}function q(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",G);for(let rt=0;rt<b.length;rt++){let pt=M[rt];pt!==null&&(M[rt]=null,b[rt].disconnect(pt))}C=null,y=null,g.reset(),t.setRenderTarget(p),d=null,f=null,h=null,r=null,w=null,ct.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(rt){s=rt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(rt){o=rt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(rt){l=rt},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(rt){if(r=rt,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",q),r.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(D),r.renderState.layers===void 0){let pt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,pt),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),w=new yn(d.framebufferWidth,d.framebufferHeight,{format:an,type:Mn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let pt=null,mt=null,ft=null;m.depth&&(ft=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=m.stencil?Si:xi,mt=m.stencil?Ri:ci);let At={colorFormat:e.RGBA8,depthFormat:ft,scaleFactor:s};h=new XRWebGLBinding(r,e),f=h.createProjectionLayer(At),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),w=new yn(f.textureWidth,f.textureHeight,{format:an,type:Mn,depthTexture:new Rs(f.textureWidth,f.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ct.setContext(r),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function G(rt){for(let pt=0;pt<rt.removed.length;pt++){let mt=rt.removed[pt],ft=M.indexOf(mt);ft>=0&&(M[ft]=null,b[ft].disconnect(mt))}for(let pt=0;pt<rt.added.length;pt++){let mt=rt.added[pt],ft=M.indexOf(mt);if(ft===-1){for(let It=0;It<b.length;It++)if(It>=M.length){M.push(mt),ft=It;break}else if(M[It]===null){M[It]=mt,ft=It;break}if(ft===-1)break}let At=b[ft];At&&At.connect(mt)}}let J=new V,X=new V;function Z(rt,pt,mt){J.setFromMatrixPosition(pt.matrixWorld),X.setFromMatrixPosition(mt.matrixWorld);let ft=J.distanceTo(X),At=pt.projectionMatrix.elements,It=mt.projectionMatrix.elements,Ft=At[14]/(At[10]-1),Yt=At[14]/(At[10]+1),v=(At[9]+1)/At[5],it=(At[9]-1)/At[5],I=(At[8]-1)/At[0],F=(It[8]+1)/It[0],L=Ft*I,z=Ft*F,Q=ft/(-I+F),at=Q*-I;if(pt.matrixWorld.decompose(rt.position,rt.quaternion,rt.scale),rt.translateX(at),rt.translateZ(Q),rt.matrixWorld.compose(rt.position,rt.quaternion,rt.scale),rt.matrixWorldInverse.copy(rt.matrixWorld).invert(),At[10]===-1)rt.projectionMatrix.copy(pt.projectionMatrix),rt.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{let H=Ft+Q,A=Yt+Q,S=L-at,B=z+(ft-at),j=v*Yt/A*H,ot=it*Yt/A*H;rt.projectionMatrix.makePerspective(S,B,j,ot,H,A),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert()}}function k(rt,pt){pt===null?rt.matrixWorld.copy(rt.matrix):rt.matrixWorld.multiplyMatrices(pt.matrixWorld,rt.matrix),rt.matrixWorldInverse.copy(rt.matrixWorld).invert()}this.updateCamera=function(rt){if(r===null)return;let pt=rt.near,mt=rt.far;g.texture!==null&&(g.depthNear>0&&(pt=g.depthNear),g.depthFar>0&&(mt=g.depthFar)),x.near=O.near=E.near=pt,x.far=O.far=E.far=mt,(C!==x.near||y!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,y=x.far),E.layers.mask=rt.layers.mask|2,O.layers.mask=rt.layers.mask|4,x.layers.mask=E.layers.mask|O.layers.mask;let ft=rt.parent,At=x.cameras;k(x,ft);for(let It=0;It<At.length;It++)k(At[It],ft);At.length===2?Z(x,E,O):x.projectionMatrix.copy(E.projectionMatrix),N(rt,x,ft)};function N(rt,pt,mt){mt===null?rt.matrix.copy(pt.matrixWorld):(rt.matrix.copy(mt.matrixWorld),rt.matrix.invert(),rt.matrix.multiply(pt.matrixWorld)),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.updateMatrixWorld(!0),rt.projectionMatrix.copy(pt.projectionMatrix),rt.projectionMatrixInverse.copy(pt.projectionMatrixInverse),rt.isPerspectiveCamera&&(rt.fov=yr*2*Math.atan(1/rt.projectionMatrix.elements[5]),rt.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(rt){c=rt,f!==null&&(f.fixedFoveation=rt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=rt)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let ut=null;function ht(rt,pt){if(u=pt.getViewerPose(l||a),_=pt,u!==null){let mt=u.views;d!==null&&(t.setRenderTargetFramebuffer(w,d.framebuffer),t.setRenderTarget(w));let ft=!1;mt.length!==x.cameras.length&&(x.cameras.length=0,ft=!0);for(let It=0;It<mt.length;It++){let Ft=mt[It],Yt=null;if(d!==null)Yt=d.getViewport(Ft);else{let it=h.getViewSubImage(f,Ft);Yt=it.viewport,It===0&&(t.setRenderTargetTextures(w,it.colorTexture,f.ignoreDepthValues?void 0:it.depthStencilTexture),t.setRenderTarget(w))}let v=T[It];v===void 0&&(v=new Ee,v.layers.enable(It),v.viewport=new ie,T[It]=v),v.matrix.fromArray(Ft.transform.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale),v.projectionMatrix.fromArray(Ft.projectionMatrix),v.projectionMatrixInverse.copy(v.projectionMatrix).invert(),v.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),It===0&&(x.matrix.copy(v.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ft===!0&&x.cameras.push(v)}let At=r.enabledFeatures;if(At&&At.includes("depth-sensing")){let It=h.getDepthInformation(mt[0]);It&&It.isValid&&It.texture&&g.init(t,It,r.renderState)}}for(let mt=0;mt<b.length;mt++){let ft=M[mt],At=b[mt];ft!==null&&At!==void 0&&At.update(ft,pt,l||a)}ut&&ut(rt,pt),pt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pt}),_=null}let ct=new Vd;ct.setAnimationLoop(ht),this.setAnimationLoop=function(rt){ut=rt},this.dispose=function(){}}},Ui=new bn,nx=new he;function ix(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ll(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,w,b,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,w,b):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ie&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ie&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w=t.get(p),b=w.envMap,M=w.envMapRotation;b&&(m.envMap.value=b,Ui.copy(M),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),m.envMapRotation.value.setFromMatrix4(nx.makeRotationFromEuler(Ui)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,w,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=b*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ie&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){let w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function rx(i,t,e,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,b){let M=b.program;n.uniformBlockBinding(w,M)}function l(w,b){let M=r[w.id];M===void 0&&(_(w),M=u(w),r[w.id]=M,w.addEventListener("dispose",m));let D=b.program;n.updateUBOMapping(w,D);let P=t.render.frame;s[w.id]!==P&&(f(w),s[w.id]=P)}function u(w){let b=h();w.__bindingPointIndex=b;let M=i.createBuffer(),D=w.__size,P=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,D,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function h(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){let b=r[w.id],M=w.uniforms,D=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let P=0,E=M.length;P<E;P++){let O=Array.isArray(M[P])?M[P]:[M[P]];for(let T=0,x=O.length;T<x;T++){let C=O[T];if(d(C,P,T,D)===!0){let y=C.__offset,U=Array.isArray(C.value)?C.value:[C.value],q=0;for(let G=0;G<U.length;G++){let J=U[G],X=g(J);typeof J=="number"||typeof J=="boolean"?(C.__data[0]=J,i.bufferSubData(i.UNIFORM_BUFFER,y+q,C.__data)):J.isMatrix3?(C.__data[0]=J.elements[0],C.__data[1]=J.elements[1],C.__data[2]=J.elements[2],C.__data[3]=0,C.__data[4]=J.elements[3],C.__data[5]=J.elements[4],C.__data[6]=J.elements[5],C.__data[7]=0,C.__data[8]=J.elements[6],C.__data[9]=J.elements[7],C.__data[10]=J.elements[8],C.__data[11]=0):(J.toArray(C.__data,q),q+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,y,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(w,b,M,D){let P=w.value,E=b+"_"+M;if(D[E]===void 0)return typeof P=="number"||typeof P=="boolean"?D[E]=P:D[E]=P.clone(),!0;{let O=D[E];if(typeof P=="number"||typeof P=="boolean"){if(O!==P)return D[E]=P,!0}else if(O.equals(P)===!1)return O.copy(P),!0}return!1}function _(w){let b=w.uniforms,M=0,D=16;for(let E=0,O=b.length;E<O;E++){let T=Array.isArray(b[E])?b[E]:[b[E]];for(let x=0,C=T.length;x<C;x++){let y=T[x],U=Array.isArray(y.value)?y.value:[y.value];for(let q=0,G=U.length;q<G;q++){let J=U[q],X=g(J),Z=M%D,k=Z%X.boundary,N=Z+k;M+=k,N!==0&&D-N<X.storage&&(M+=D-N),y.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),y.__offset=M,M+=X.storage}}}let P=M%D;return P>0&&(M+=D-P),w.__size=M,w.__cache={},this}function g(w){let b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function m(w){let b=w.target;b.removeEventListener("dispose",m);let M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function p(){for(let w in r)i.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:c,update:l,dispose:p}}var oc=class{constructor(t={}){let{canvas:e=ud(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;let _=new Uint32Array(4),g=new Int32Array(4),m=null,p=null,w=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ze,this.toneMapping=Gn,this.toneMappingExposure=1;let M=this,D=!1,P=0,E=0,O=null,T=-1,x=null,C=new ie,y=new ie,U=null,q=new Xt(0),G=0,J=e.width,X=e.height,Z=1,k=null,N=null,ut=new ie(0,0,J,X),ht=new ie(0,0,J,X),ct=!1,rt=new Ts,pt=!1,mt=!1,ft=new he,At=new he,It=new V,Ft=new ie,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},v=!1;function it(){return O===null?Z:1}let I=n;function F(R,Y){return e.getContext(R,Y)}try{let R={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${po}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",St,!1),I===null){let Y="webgl2";if(I=F(Y,R),I===null)throw F(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let L,z,Q,at,H,A,S,B,j,ot,tt,wt,yt,vt,Gt,lt,Et,Lt,Dt,Tt,qt,zt,oe,W;function xt(){L=new b_(I),L.init(),zt=new jg(I,L),z=new m_(I,L,t,zt),Q=new $g(I,L),z.reverseDepthBuffer&&f&&Q.buffers.depth.setReversed(!0),at=new M_(I),H=new Bg,A=new Jg(I,L,Q,H,z,zt,at),S=new g_(M),B=new v_(M),j=new Pp(I),oe=new f_(I,j),ot=new S_(I,j,at,oe),tt=new A_(I,ot,j,at),Dt=new E_(I,z,A),lt=new __(H),wt=new Fg(M,S,B,L,z,oe,lt),yt=new ix(M,H),vt=new zg,Gt=new Xg(L),Lt=new d_(M,S,B,Q,tt,d,c),Et=new Zg(M,tt,z),W=new rx(I,at,z,Q),Tt=new p_(I,L,at),qt=new w_(I,L,at),at.programs=wt.programs,M.capabilities=z,M.extensions=L,M.properties=H,M.renderLists=vt,M.shadowMap=Et,M.state=Q,M.info=at}xt();let st=new $l(M,I);this.xr=st,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let R=L.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=L.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(R){R!==void 0&&(Z=R,this.setSize(J,X,!1))},this.getSize=function(R){return R.set(J,X)},this.setSize=function(R,Y,et=!0){if(st.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=R,X=Y,e.width=Math.floor(R*Z),e.height=Math.floor(Y*Z),et===!0&&(e.style.width=R+"px",e.style.height=Y+"px"),this.setViewport(0,0,R,Y)},this.getDrawingBufferSize=function(R){return R.set(J*Z,X*Z).floor()},this.setDrawingBufferSize=function(R,Y,et){J=R,X=Y,Z=et,e.width=Math.floor(R*et),e.height=Math.floor(Y*et),this.setViewport(0,0,R,Y)},this.getCurrentViewport=function(R){return R.copy(C)},this.getViewport=function(R){return R.copy(ut)},this.setViewport=function(R,Y,et,nt){R.isVector4?ut.set(R.x,R.y,R.z,R.w):ut.set(R,Y,et,nt),Q.viewport(C.copy(ut).multiplyScalar(Z).round())},this.getScissor=function(R){return R.copy(ht)},this.setScissor=function(R,Y,et,nt){R.isVector4?ht.set(R.x,R.y,R.z,R.w):ht.set(R,Y,et,nt),Q.scissor(y.copy(ht).multiplyScalar(Z).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(R){Q.setScissorTest(ct=R)},this.setOpaqueSort=function(R){k=R},this.setTransparentSort=function(R){N=R},this.getClearColor=function(R){return R.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(R=!0,Y=!0,et=!0){let nt=0;if(R){let $=!1;if(O!==null){let _t=O.texture.format;$=_t===Ro||_t===Io||_t===Co}if($){let _t=O.texture.type,bt=_t===Mn||_t===ci||_t===Tr||_t===Ri||_t===Ao||_t===To,Ct=Lt.getClearColor(),Rt=Lt.getClearAlpha(),Bt=Ct.r,Nt=Ct.g,Ot=Ct.b;bt?(_[0]=Bt,_[1]=Nt,_[2]=Ot,_[3]=Rt,I.clearBufferuiv(I.COLOR,0,_)):(g[0]=Bt,g[1]=Nt,g[2]=Ot,g[3]=Rt,I.clearBufferiv(I.COLOR,0,g))}else nt|=I.COLOR_BUFFER_BIT}Y&&(nt|=I.DEPTH_BUFFER_BIT),et&&(nt|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),Lt.dispose(),vt.dispose(),Gt.dispose(),H.dispose(),S.dispose(),B.dispose(),tt.dispose(),oe.dispose(),W.dispose(),wt.dispose(),st.dispose(),st.removeEventListener("sessionstart",gh),st.removeEventListener("sessionend",xh),li.stop()};function dt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;let R=at.autoReset,Y=Et.enabled,et=Et.autoUpdate,nt=Et.needsUpdate,$=Et.type;xt(),at.autoReset=R,Et.enabled=Y,Et.autoUpdate=et,Et.needsUpdate=nt,Et.type=$}function St(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Vt(R){let Y=R.target;Y.removeEventListener("dispose",Vt),me(Y)}function me(R){Le(R),H.remove(R)}function Le(R){let Y=H.get(R).programs;Y!==void 0&&(Y.forEach(function(et){wt.releaseProgram(et)}),R.isShaderMaterial&&wt.releaseShaderCache(R))}this.renderBufferDirect=function(R,Y,et,nt,$,_t){Y===null&&(Y=Yt);let bt=$.isMesh&&$.matrixWorld.determinant()<0,Ct=vf(R,Y,et,nt,$);Q.setMaterial(nt,bt);let Rt=et.index,Bt=1;if(nt.wireframe===!0){if(Rt=ot.getWireframeAttribute(et),Rt===void 0)return;Bt=2}let Nt=et.drawRange,Ot=et.attributes.position,Kt=Nt.start*Bt,te=(Nt.start+Nt.count)*Bt;_t!==null&&(Kt=Math.max(Kt,_t.start*Bt),te=Math.min(te,(_t.start+_t.count)*Bt)),Rt!==null?(Kt=Math.max(Kt,0),te=Math.min(te,Rt.count)):Ot!=null&&(Kt=Math.max(Kt,0),te=Math.min(te,Ot.count));let ge=te-Kt;if(ge<0||ge===1/0)return;oe.setup($,nt,Ct,et,Rt);let _e,jt=Tt;if(Rt!==null&&(_e=j.get(Rt),jt=qt,jt.setIndex(_e)),$.isMesh)nt.wireframe===!0?(Q.setLineWidth(nt.wireframeLinewidth*it()),jt.setMode(I.LINES)):jt.setMode(I.TRIANGLES);else if($.isLine){let Ut=nt.linewidth;Ut===void 0&&(Ut=1),Q.setLineWidth(Ut*it()),$.isLineSegments?jt.setMode(I.LINES):$.isLineLoop?jt.setMode(I.LINE_LOOP):jt.setMode(I.LINE_STRIP)}else $.isPoints?jt.setMode(I.POINTS):$.isSprite&&jt.setMode(I.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)jt.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(L.get("WEBGL_multi_draw"))jt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let Ut=$._multiDrawStarts,Ce=$._multiDrawCounts,ee=$._multiDrawCount,cn=Rt?j.get(Rt).bytesPerElement:1,Gi=H.get(nt).currentProgram.getUniforms();for(let qe=0;qe<ee;qe++)Gi.setValue(I,"_gl_DrawID",qe),jt.render(Ut[qe]/cn,Ce[qe])}else if($.isInstancedMesh)jt.renderInstances(Kt,ge,$.count);else if(et.isInstancedBufferGeometry){let Ut=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,Ce=Math.min(et.instanceCount,Ut);jt.renderInstances(Kt,ge,Ce)}else jt.render(Kt,ge)};function re(R,Y,et){R.transparent===!0&&R.side===wn&&R.forceSinglePass===!1?(R.side=Ie,R.needsUpdate=!0,na(R,Y,et),R.side=Nn,R.needsUpdate=!0,na(R,Y,et),R.side=wn):na(R,Y,et)}this.compile=function(R,Y,et=null){et===null&&(et=R),p=Gt.get(et),p.init(Y),b.push(p),et.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),R!==et&&R.traverseVisible(function($){$.isLight&&$.layers.test(Y.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),p.setupLights();let nt=new Set;return R.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let _t=$.material;if(_t)if(Array.isArray(_t))for(let bt=0;bt<_t.length;bt++){let Ct=_t[bt];re(Ct,et,$),nt.add(Ct)}else re(_t,et,$),nt.add(_t)}),b.pop(),p=null,nt},this.compileAsync=function(R,Y,et=null){let nt=this.compile(R,Y,et);return new Promise($=>{function _t(){if(nt.forEach(function(bt){H.get(bt).currentProgram.isReady()&&nt.delete(bt)}),nt.size===0){$(R);return}setTimeout(_t,10)}L.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let on=null;function In(R){on&&on(R)}function gh(){li.stop()}function xh(){li.start()}let li=new Vd;li.setAnimationLoop(In),typeof self<"u"&&li.setContext(self),this.setAnimationLoop=function(R){on=R,st.setAnimationLoop(R),R===null?li.stop():li.start()},st.addEventListener("sessionstart",gh),st.addEventListener("sessionend",xh),this.render=function(R,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(st.cameraAutoUpdate===!0&&st.updateCamera(Y),Y=st.getCamera()),R.isScene===!0&&R.onBeforeRender(M,R,Y,O),p=Gt.get(R,b.length),p.init(Y),b.push(p),At.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),rt.setFromProjectionMatrix(At),mt=this.localClippingEnabled,pt=lt.init(this.clippingPlanes,mt),m=vt.get(R,w.length),m.init(),w.push(m),st.enabled===!0&&st.isPresenting===!0){let _t=M.xr.getDepthSensingMesh();_t!==null&&vc(_t,Y,-1/0,M.sortObjects)}vc(R,Y,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(k,N),v=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,v&&Lt.addToRenderList(m,R),this.info.render.frame++,pt===!0&&lt.beginShadows();let et=p.state.shadowsArray;Et.render(et,R,Y),pt===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();let nt=m.opaque,$=m.transmissive;if(p.setupLights(),Y.isArrayCamera){let _t=Y.cameras;if($.length>0)for(let bt=0,Ct=_t.length;bt<Ct;bt++){let Rt=_t[bt];vh(nt,$,R,Rt)}v&&Lt.render(R);for(let bt=0,Ct=_t.length;bt<Ct;bt++){let Rt=_t[bt];yh(m,R,Rt,Rt.viewport)}}else $.length>0&&vh(nt,$,R,Y),v&&Lt.render(R),yh(m,R,Y);O!==null&&(A.updateMultisampleRenderTarget(O),A.updateRenderTargetMipmap(O)),R.isScene===!0&&R.onAfterRender(M,R,Y),oe.resetDefaultState(),T=-1,x=null,b.pop(),b.length>0?(p=b[b.length-1],pt===!0&&lt.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function vc(R,Y,et,nt){if(R.visible===!1)return;if(R.layers.test(Y.layers)){if(R.isGroup)et=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Y);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||rt.intersectsSprite(R)){nt&&Ft.setFromMatrixPosition(R.matrixWorld).applyMatrix4(At);let bt=tt.update(R),Ct=R.material;Ct.visible&&m.push(R,bt,Ct,et,Ft.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||rt.intersectsObject(R))){let bt=tt.update(R),Ct=R.material;if(nt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ft.copy(R.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Ft.copy(bt.boundingSphere.center)),Ft.applyMatrix4(R.matrixWorld).applyMatrix4(At)),Array.isArray(Ct)){let Rt=bt.groups;for(let Bt=0,Nt=Rt.length;Bt<Nt;Bt++){let Ot=Rt[Bt],Kt=Ct[Ot.materialIndex];Kt&&Kt.visible&&m.push(R,bt,Kt,et,Ft.z,Ot)}}else Ct.visible&&m.push(R,bt,Ct,et,Ft.z,null)}}let _t=R.children;for(let bt=0,Ct=_t.length;bt<Ct;bt++)vc(_t[bt],Y,et,nt)}function yh(R,Y,et,nt){let $=R.opaque,_t=R.transmissive,bt=R.transparent;p.setupLightsView(et),pt===!0&&lt.setGlobalState(M.clippingPlanes,et),nt&&Q.viewport(C.copy(nt)),$.length>0&&ea($,Y,et),_t.length>0&&ea(_t,Y,et),bt.length>0&&ea(bt,Y,et),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function vh(R,Y,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[nt.id]===void 0&&(p.state.transmissionRenderTarget[nt.id]=new yn(1,1,{generateMipmaps:!0,type:L.has("EXT_color_buffer_half_float")||L.has("EXT_color_buffer_float")?Cr:Mn,minFilter:oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));let _t=p.state.transmissionRenderTarget[nt.id],bt=nt.viewport||C;_t.setSize(bt.z,bt.w);let Ct=M.getRenderTarget();M.setRenderTarget(_t),M.getClearColor(q),G=M.getClearAlpha(),G<1&&M.setClearColor(16777215,.5),M.clear(),v&&Lt.render(et);let Rt=M.toneMapping;M.toneMapping=Gn;let Bt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),p.setupLightsView(nt),pt===!0&&lt.setGlobalState(M.clippingPlanes,nt),ea(R,et,nt),A.updateMultisampleRenderTarget(_t),A.updateRenderTargetMipmap(_t),L.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let Ot=0,Kt=Y.length;Ot<Kt;Ot++){let te=Y[Ot],ge=te.object,_e=te.geometry,jt=te.material,Ut=te.group;if(jt.side===wn&&ge.layers.test(nt.layers)){let Ce=jt.side;jt.side=Ie,jt.needsUpdate=!0,bh(ge,et,nt,_e,jt,Ut),jt.side=Ce,jt.needsUpdate=!0,Nt=!0}}Nt===!0&&(A.updateMultisampleRenderTarget(_t),A.updateRenderTargetMipmap(_t))}M.setRenderTarget(Ct),M.setClearColor(q,G),Bt!==void 0&&(nt.viewport=Bt),M.toneMapping=Rt}function ea(R,Y,et){let nt=Y.isScene===!0?Y.overrideMaterial:null;for(let $=0,_t=R.length;$<_t;$++){let bt=R[$],Ct=bt.object,Rt=bt.geometry,Bt=nt===null?bt.material:nt,Nt=bt.group;Ct.layers.test(et.layers)&&bh(Ct,Y,et,Rt,Bt,Nt)}}function bh(R,Y,et,nt,$,_t){R.onBeforeRender(M,Y,et,nt,$,_t),R.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),$.onBeforeRender(M,Y,et,nt,R,_t),$.transparent===!0&&$.side===wn&&$.forceSinglePass===!1?($.side=Ie,$.needsUpdate=!0,M.renderBufferDirect(et,Y,nt,$,R,_t),$.side=Nn,$.needsUpdate=!0,M.renderBufferDirect(et,Y,nt,$,R,_t),$.side=wn):M.renderBufferDirect(et,Y,nt,$,R,_t),R.onAfterRender(M,Y,et,nt,$,_t)}function na(R,Y,et){Y.isScene!==!0&&(Y=Yt);let nt=H.get(R),$=p.state.lights,_t=p.state.shadowsArray,bt=$.state.version,Ct=wt.getParameters(R,$.state,_t,Y,et),Rt=wt.getProgramCacheKey(Ct),Bt=nt.programs;nt.environment=R.isMeshStandardMaterial?Y.environment:null,nt.fog=Y.fog,nt.envMap=(R.isMeshStandardMaterial?B:S).get(R.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&R.envMap===null?Y.environmentRotation:R.envMapRotation,Bt===void 0&&(R.addEventListener("dispose",Vt),Bt=new Map,nt.programs=Bt);let Nt=Bt.get(Rt);if(Nt!==void 0){if(nt.currentProgram===Nt&&nt.lightsStateVersion===bt)return wh(R,Ct),Nt}else Ct.uniforms=wt.getUniforms(R),R.onBeforeCompile(Ct,M),Nt=wt.acquireProgram(Ct,Rt),Bt.set(Rt,Nt),nt.uniforms=Ct.uniforms;let Ot=nt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ot.clippingPlanes=lt.uniform),wh(R,Ct),nt.needsLights=Sf(R),nt.lightsStateVersion=bt,nt.needsLights&&(Ot.ambientLightColor.value=$.state.ambient,Ot.lightProbe.value=$.state.probe,Ot.directionalLights.value=$.state.directional,Ot.directionalLightShadows.value=$.state.directionalShadow,Ot.spotLights.value=$.state.spot,Ot.spotLightShadows.value=$.state.spotShadow,Ot.rectAreaLights.value=$.state.rectArea,Ot.ltc_1.value=$.state.rectAreaLTC1,Ot.ltc_2.value=$.state.rectAreaLTC2,Ot.pointLights.value=$.state.point,Ot.pointLightShadows.value=$.state.pointShadow,Ot.hemisphereLights.value=$.state.hemi,Ot.directionalShadowMap.value=$.state.directionalShadowMap,Ot.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ot.spotShadowMap.value=$.state.spotShadowMap,Ot.spotLightMatrix.value=$.state.spotLightMatrix,Ot.spotLightMap.value=$.state.spotLightMap,Ot.pointShadowMap.value=$.state.pointShadowMap,Ot.pointShadowMatrix.value=$.state.pointShadowMatrix),nt.currentProgram=Nt,nt.uniformsList=null,Nt}function Sh(R){if(R.uniformsList===null){let Y=R.currentProgram.getUniforms();R.uniformsList=Pr.seqWithValue(Y.seq,R.uniforms)}return R.uniformsList}function wh(R,Y){let et=H.get(R);et.outputColorSpace=Y.outputColorSpace,et.batching=Y.batching,et.batchingColor=Y.batchingColor,et.instancing=Y.instancing,et.instancingColor=Y.instancingColor,et.instancingMorph=Y.instancingMorph,et.skinning=Y.skinning,et.morphTargets=Y.morphTargets,et.morphNormals=Y.morphNormals,et.morphColors=Y.morphColors,et.morphTargetsCount=Y.morphTargetsCount,et.numClippingPlanes=Y.numClippingPlanes,et.numIntersection=Y.numClipIntersection,et.vertexAlphas=Y.vertexAlphas,et.vertexTangents=Y.vertexTangents,et.toneMapping=Y.toneMapping}function vf(R,Y,et,nt,$){Y.isScene!==!0&&(Y=Yt),A.resetTextureUnits();let _t=Y.fog,bt=nt.isMeshStandardMaterial?Y.environment:null,Ct=O===null?M.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:wi,Rt=(nt.isMeshStandardMaterial?B:S).get(nt.envMap||bt),Bt=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,Nt=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Ot=!!et.morphAttributes.position,Kt=!!et.morphAttributes.normal,te=!!et.morphAttributes.color,ge=Gn;nt.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(ge=M.toneMapping);let _e=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,jt=_e!==void 0?_e.length:0,Ut=H.get(nt),Ce=p.state.lights;if(pt===!0&&(mt===!0||R!==x)){let Be=R===x&&nt.id===T;lt.setState(nt,R,Be)}let ee=!1;nt.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Ce.state.version||Ut.outputColorSpace!==Ct||$.isBatchedMesh&&Ut.batching===!1||!$.isBatchedMesh&&Ut.batching===!0||$.isBatchedMesh&&Ut.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Ut.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Ut.instancing===!1||!$.isInstancedMesh&&Ut.instancing===!0||$.isSkinnedMesh&&Ut.skinning===!1||!$.isSkinnedMesh&&Ut.skinning===!0||$.isInstancedMesh&&Ut.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ut.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ut.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ut.instancingMorph===!1&&$.morphTexture!==null||Ut.envMap!==Rt||nt.fog===!0&&Ut.fog!==_t||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==lt.numPlanes||Ut.numIntersection!==lt.numIntersection)||Ut.vertexAlphas!==Bt||Ut.vertexTangents!==Nt||Ut.morphTargets!==Ot||Ut.morphNormals!==Kt||Ut.morphColors!==te||Ut.toneMapping!==ge||Ut.morphTargetsCount!==jt)&&(ee=!0):(ee=!0,Ut.__version=nt.version);let cn=Ut.currentProgram;ee===!0&&(cn=na(nt,Y,$));let Gi=!1,qe=!1,Fr=!1,pe=cn.getUniforms(),Je=Ut.uniforms;if(Q.useProgram(cn.program)&&(Gi=!0,qe=!0,Fr=!0),nt.id!==T&&(T=nt.id,qe=!0),Gi||x!==R){Q.buffers.depth.getReversed()?(ft.copy(R.projectionMatrix),fd(ft),pd(ft),pe.setValue(I,"projectionMatrix",ft)):pe.setValue(I,"projectionMatrix",R.projectionMatrix),pe.setValue(I,"viewMatrix",R.matrixWorldInverse);let He=pe.map.cameraPosition;He!==void 0&&He.setValue(I,It.setFromMatrixPosition(R.matrixWorld)),z.logarithmicDepthBuffer&&pe.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&pe.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),x!==R&&(x=R,qe=!0,Fr=!0)}if($.isSkinnedMesh){pe.setOptional(I,$,"bindMatrix"),pe.setOptional(I,$,"bindMatrixInverse");let Be=$.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),pe.setValue(I,"boneTexture",Be.boneTexture,A))}$.isBatchedMesh&&(pe.setOptional(I,$,"batchingTexture"),pe.setValue(I,"batchingTexture",$._matricesTexture,A),pe.setOptional(I,$,"batchingIdTexture"),pe.setValue(I,"batchingIdTexture",$._indirectTexture,A),pe.setOptional(I,$,"batchingColorTexture"),$._colorsTexture!==null&&pe.setValue(I,"batchingColorTexture",$._colorsTexture,A));let je=et.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&Dt.update($,et,cn),(qe||Ut.receiveShadow!==$.receiveShadow)&&(Ut.receiveShadow=$.receiveShadow,pe.setValue(I,"receiveShadow",$.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(Je.envMap.value=Rt,Je.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&Y.environment!==null&&(Je.envMapIntensity.value=Y.environmentIntensity),qe&&(pe.setValue(I,"toneMappingExposure",M.toneMappingExposure),Ut.needsLights&&bf(Je,Fr),_t&&nt.fog===!0&&yt.refreshFogUniforms(Je,_t),yt.refreshMaterialUniforms(Je,nt,Z,X,p.state.transmissionRenderTarget[R.id]),Pr.upload(I,Sh(Ut),Je,A)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(Pr.upload(I,Sh(Ut),Je,A),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&pe.setValue(I,"center",$.center),pe.setValue(I,"modelViewMatrix",$.modelViewMatrix),pe.setValue(I,"normalMatrix",$.normalMatrix),pe.setValue(I,"modelMatrix",$.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){let Be=nt.uniformsGroups;for(let He=0,bc=Be.length;He<bc;He++){let hi=Be[He];W.update(hi,cn),W.bind(hi,cn)}}return cn}function bf(R,Y){R.ambientLightColor.needsUpdate=Y,R.lightProbe.needsUpdate=Y,R.directionalLights.needsUpdate=Y,R.directionalLightShadows.needsUpdate=Y,R.pointLights.needsUpdate=Y,R.pointLightShadows.needsUpdate=Y,R.spotLights.needsUpdate=Y,R.spotLightShadows.needsUpdate=Y,R.rectAreaLights.needsUpdate=Y,R.hemisphereLights.needsUpdate=Y}function Sf(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(R,Y,et){H.get(R.texture).__webglTexture=Y,H.get(R.depthTexture).__webglTexture=et;let nt=H.get(R);nt.__hasExternalTextures=!0,nt.__autoAllocateDepthBuffer=et===void 0,nt.__autoAllocateDepthBuffer||L.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),nt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,Y){let et=H.get(R);et.__webglFramebuffer=Y,et.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(R,Y=0,et=0){O=R,P=Y,E=et;let nt=!0,$=null,_t=!1,bt=!1;if(R){let Rt=H.get(R);if(Rt.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(I.FRAMEBUFFER,null),nt=!1;else if(Rt.__webglFramebuffer===void 0)A.setupRenderTarget(R);else if(Rt.__hasExternalTextures)A.rebindTextures(R,H.get(R.texture).__webglTexture,H.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let Ot=R.depthTexture;if(Rt.__boundDepthTexture!==Ot){if(Ot!==null&&H.has(Ot)&&(R.width!==Ot.image.width||R.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(R)}}let Bt=R.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(bt=!0);let Nt=H.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Nt[Y])?$=Nt[Y][et]:$=Nt[Y],_t=!0):R.samples>0&&A.useMultisampledRTT(R)===!1?$=H.get(R).__webglMultisampledFramebuffer:Array.isArray(Nt)?$=Nt[et]:$=Nt,C.copy(R.viewport),y.copy(R.scissor),U=R.scissorTest}else C.copy(ut).multiplyScalar(Z).floor(),y.copy(ht).multiplyScalar(Z).floor(),U=ct;if(Q.bindFramebuffer(I.FRAMEBUFFER,$)&&nt&&Q.drawBuffers(R,$),Q.viewport(C),Q.scissor(y),Q.setScissorTest(U),_t){let Rt=H.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Rt.__webglTexture,et)}else if(bt){let Rt=H.get(R.texture),Bt=Y||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rt.__webglTexture,et||0,Bt)}T=-1},this.readRenderTargetPixels=function(R,Y,et,nt,$,_t,bt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=H.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&bt!==void 0&&(Ct=Ct[bt]),Ct){Q.bindFramebuffer(I.FRAMEBUFFER,Ct);try{let Rt=R.texture,Bt=Rt.format,Nt=Rt.type;if(!z.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!z.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=R.width-nt&&et>=0&&et<=R.height-$&&I.readPixels(Y,et,nt,$,zt.convert(Bt),zt.convert(Nt),_t)}finally{let Rt=O!==null?H.get(O).__webglFramebuffer:null;Q.bindFramebuffer(I.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(R,Y,et,nt,$,_t,bt){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=H.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&bt!==void 0&&(Ct=Ct[bt]),Ct){let Rt=R.texture,Bt=Rt.format,Nt=Rt.type;if(!z.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Y>=0&&Y<=R.width-nt&&et>=0&&et<=R.height-$){Q.bindFramebuffer(I.FRAMEBUFFER,Ct);let Ot=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ot),I.bufferData(I.PIXEL_PACK_BUFFER,_t.byteLength,I.STREAM_READ),I.readPixels(Y,et,nt,$,zt.convert(Bt),zt.convert(Nt),0);let Kt=O!==null?H.get(O).__webglFramebuffer:null;Q.bindFramebuffer(I.FRAMEBUFFER,Kt);let te=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await dd(I,te,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ot),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,_t),I.deleteBuffer(Ot),I.deleteSync(te),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,Y=null,et=0){R.isTexture!==!0&&(Di("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Y=arguments[0]||null,R=arguments[1]);let nt=Math.pow(2,-et),$=Math.floor(R.image.width*nt),_t=Math.floor(R.image.height*nt),bt=Y!==null?Y.x:0,Ct=Y!==null?Y.y:0;A.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,et,0,0,bt,Ct,$,_t),Q.unbindTexture()};let wf=I.createFramebuffer(),Mf=I.createFramebuffer();this.copyTextureToTexture=function(R,Y,et=null,nt=null,$=0,_t=null){R.isTexture!==!0&&(Di("WebGLRenderer: copyTextureToTexture function signature has changed."),nt=arguments[0]||null,R=arguments[1],Y=arguments[2],_t=arguments[3]||0,et=null),_t===null&&($!==0?(Di("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),_t=$,$=0):_t=0);let bt,Ct,Rt,Bt,Nt,Ot,Kt,te,ge,_e=R.isCompressedTexture?R.mipmaps[_t]:R.image;if(et!==null)bt=et.max.x-et.min.x,Ct=et.max.y-et.min.y,Rt=et.isBox3?et.max.z-et.min.z:1,Bt=et.min.x,Nt=et.min.y,Ot=et.isBox3?et.min.z:0;else{let je=Math.pow(2,-$);bt=Math.floor(_e.width*je),Ct=Math.floor(_e.height*je),R.isDataArrayTexture?Rt=_e.depth:R.isData3DTexture?Rt=Math.floor(_e.depth*je):Rt=1,Bt=0,Nt=0,Ot=0}nt!==null?(Kt=nt.x,te=nt.y,ge=nt.z):(Kt=0,te=0,ge=0);let jt=zt.convert(Y.format),Ut=zt.convert(Y.type),Ce;Y.isData3DTexture?(A.setTexture3D(Y,0),Ce=I.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(A.setTexture2DArray(Y,0),Ce=I.TEXTURE_2D_ARRAY):(A.setTexture2D(Y,0),Ce=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,Y.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,Y.unpackAlignment);let ee=I.getParameter(I.UNPACK_ROW_LENGTH),cn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Gi=I.getParameter(I.UNPACK_SKIP_PIXELS),qe=I.getParameter(I.UNPACK_SKIP_ROWS),Fr=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,_e.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,_e.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Bt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Nt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ot);let pe=R.isDataArrayTexture||R.isData3DTexture,Je=Y.isDataArrayTexture||Y.isData3DTexture;if(R.isDepthTexture){let je=H.get(R),Be=H.get(Y),He=H.get(je.__renderTarget),bc=H.get(Be.__renderTarget);Q.bindFramebuffer(I.READ_FRAMEBUFFER,He.__webglFramebuffer),Q.bindFramebuffer(I.DRAW_FRAMEBUFFER,bc.__webglFramebuffer);for(let hi=0;hi<Rt;hi++)pe&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(R).__webglTexture,$,Ot+hi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(Y).__webglTexture,_t,ge+hi)),I.blitFramebuffer(Bt,Nt,bt,Ct,Kt,te,bt,Ct,I.DEPTH_BUFFER_BIT,I.NEAREST);Q.bindFramebuffer(I.READ_FRAMEBUFFER,null),Q.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if($!==0||R.isRenderTargetTexture||H.has(R)){let je=H.get(R),Be=H.get(Y);Q.bindFramebuffer(I.READ_FRAMEBUFFER,wf),Q.bindFramebuffer(I.DRAW_FRAMEBUFFER,Mf);for(let He=0;He<Rt;He++)pe?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,je.__webglTexture,$,Ot+He):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,je.__webglTexture,$),Je?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Be.__webglTexture,_t,ge+He):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Be.__webglTexture,_t),$!==0?I.blitFramebuffer(Bt,Nt,bt,Ct,Kt,te,bt,Ct,I.COLOR_BUFFER_BIT,I.NEAREST):Je?I.copyTexSubImage3D(Ce,_t,Kt,te,ge+He,Bt,Nt,bt,Ct):I.copyTexSubImage2D(Ce,_t,Kt,te,Bt,Nt,bt,Ct);Q.bindFramebuffer(I.READ_FRAMEBUFFER,null),Q.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Je?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(Ce,_t,Kt,te,ge,bt,Ct,Rt,jt,Ut,_e.data):Y.isCompressedArrayTexture?I.compressedTexSubImage3D(Ce,_t,Kt,te,ge,bt,Ct,Rt,jt,_e.data):I.texSubImage3D(Ce,_t,Kt,te,ge,bt,Ct,Rt,jt,Ut,_e):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,_t,Kt,te,bt,Ct,jt,Ut,_e.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,_t,Kt,te,_e.width,_e.height,jt,_e.data):I.texSubImage2D(I.TEXTURE_2D,_t,Kt,te,bt,Ct,jt,Ut,_e);I.pixelStorei(I.UNPACK_ROW_LENGTH,ee),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,cn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Gi),I.pixelStorei(I.UNPACK_SKIP_ROWS,qe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Fr),_t===0&&Y.generateMipmaps&&I.generateMipmap(Ce),Q.unbindTexture()},this.copyTextureToTexture3D=function(R,Y,et=null,nt=null,$=0){return R.isTexture!==!0&&(Di("WebGLRenderer: copyTextureToTexture3D function signature has changed."),et=arguments[0]||null,nt=arguments[1]||null,R=arguments[2],Y=arguments[3],$=arguments[4]||0),Di('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,Y,et,nt,$)},this.initRenderTarget=function(R){H.get(R).__webglFramebuffer===void 0&&A.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?A.setTextureCube(R,0):R.isData3DTexture?A.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?A.setTexture2DArray(R,0):A.setTexture2D(R,0),Q.unbindTexture()},this.resetState=function(){P=0,E=0,O=null,Q.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}};function sx(i,t){let e=document.createElement("a");e.setAttribute("href",t),e.setAttribute("download",i),e.style.display="none",document.body.append(e),e.click(),e.remove()}function qd(i,t,e){let n;e===void 0?n=URL.createObjectURL(new Blob([t])):n=URL.createObjectURL(new Blob([t],{type:e})),sx(i,n),URL.revokeObjectURL(n)}function lc(i,t){return Array.from({length:t}).map((e,n)=>i(n))}function jl(i,t){return i=Math.ceil(i),t=Math.floor(t),Math.floor(Math.random()*(t-i+1)+i)}function Ql(i){return i.button===0}function ax({min:i,max:t}){return Number.isFinite(i.x)&&Number.isFinite(i.y)&&Number.isFinite(i.z)&&Number.isFinite(t.x)&&Number.isFinite(t.y)&&Number.isFinite(t.z)}function ox(i,t){let e=new Ge;return t!==void 0&&(i=i.clone(),i.applyQuaternion(t.clone().invert())),e.setFromObject(i),e}function Yd(i,t){let e=ox(i,t);if(!ax(e))return 0;let{min:n,max:r}=e;return Math.max(Math.abs(n.x),Math.abs(r.x),Math.abs(n.y),Math.abs(r.y),Math.abs(n.z),Math.abs(r.z))}var cx=Object.defineProperty,lx=(i,t,e)=>t in i?cx(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,Qt=(i,t,e)=>lx(i,typeof t!="symbol"?t+"":t,e),cf=(i,t)=>{let[e,n]=t.split("-");return Object.assign(i.style,{left:n==="left"?"0":n==="center"?"50%":"",right:n==="right"?"0":"",top:e==="top"?"0":e==="bottom"?"":"50%",bottom:e==="bottom"?"0":"",transform:`${n==="center"?"translateX(-50%)":""} ${e==="center"?"translateY(-50%)":""}`}),t},hx=({placement:i,size:t,offset:e,id:n,className:r})=>{let s=document.createElement("div"),{top:a,left:o,right:c,bottom:l}=e;return Object.assign(s.style,{id:n,position:"absolute",zIndex:"1000",height:`${t}px`,width:`${t}px`,margin:`${a}px ${c}px ${l}px ${o}px`,borderRadius:"100%"}),cf(s,i),n&&(s.id=n),r&&(s.className=r),s},ux=i=>{let t=typeof i=="string"?document.querySelector(i):i;if(!t)throw Error("Invalid DOM element");return t};function ih(i,t,e){return Math.max(t,Math.min(e,i))}var dx=[["x",0,3],["y",1,4],["z",2,5]],Zd=new V;function Kd({isSphere:i},t,e){i&&(Zd.set(0,0,1).applyQuaternion(e.quaternion),dx.forEach(([n,r,s])=>{let a=Zd[n],o=t[r],c=o.userData.opacity;o.material.opacity=ih(a>=0?c:c/2,0,1),o=t[s],c=o.userData.opacity,o.material.opacity=ih(a>=0?c/2:c,0,1)}))}var fx=(i,t,e=10)=>Math.abs(i.clientX-t.x)<e&&Math.abs(i.clientY-t.y)<e,$d=new Ns,Jd=new Pt,jd=(i,t,e,n)=>{Jd.set((i.clientX-t.left)/t.width*2-1,-((i.clientY-t.top)/t.height)*2+1),$d.setFromCamera(Jd,e);let r=$d.intersectObjects(n,!1),s=r.length?r[0]:null;return!s||!s.object.visible?null:s},th=1e-6,px=2*Math.PI,lf=["x","y","z"],Qs=[...lf,"nx","ny","nz"],mx=["right","top","front","left","bottom","back"],hf=1.3,Qd=(i,t=!0)=>{let{material:e,userData:n}=i,{color:r,opacity:s}=t?n.hover:n;e.color.set(r),e.opacity=s},Ni=i=>JSON.parse(JSON.stringify(i)),_x=i=>{let t=i.type||"sphere",e=t==="sphere",n=i.resolution||e?64:128,{container:r}=i;i.container=void 0,i=JSON.parse(JSON.stringify(i)),i.container=r,mx.forEach((c,l)=>{i[c]&&(i[Qs[l]]=i[c])});let s={enabled:!0,color:16777215,opacity:1,scale:.7,labelColor:2236962,line:!1,border:{size:0,color:14540253},hover:{color:e?16777215:9688043,labelColor:2236962,opacity:1,scale:.7,border:{size:0,color:14540253}}},a={line:!1,scale:e?.45:.7,hover:{scale:e?.5:.7}},o={type:t,container:document.body,size:128,placement:"top-right",resolution:n,lineWidth:20,radius:e?1:.2,smoothness:18,animated:!0,speed:1,background:{enabled:!0,color:e?16777215:14739180,opacity:e?0:1,hover:{color:e?16777215:14739180,opacity:e?.2:1}},font:{family:"sans-serif",weight:900},offset:{top:10,left:10,bottom:10,right:10},corners:{enabled:!e,color:e?15915362:16777215,opacity:1,scale:e?.15:.2,radius:1,smoothness:18,hover:{color:e?16777215:9688043,opacity:1,scale:e?.2:.225}},edges:{enabled:!e,color:e?15915362:16777215,opacity:e?1:0,radius:e?1:.125,smoothness:18,scale:e?.15:1,hover:{color:e?16777215:9688043,opacity:1,scale:e?.2:1}},x:{...Ni(s),...e?{label:"X",color:16725587,line:!0}:{label:"Right"}},y:{...Ni(s),...e?{label:"Y",color:9100032,line:!0}:{label:"Top"}},z:{...Ni(s),...e?{label:"Z",color:2920447,line:!0}:{label:"Front"}},nx:{...Ni(a),label:e?"":"Left"},ny:{...Ni(a),label:e?"":"Bottom"},nz:{...Ni(a),label:e?"":"Back"}};return rh(i,o),lf.forEach(c=>rh(i[`n${c}`],Ni(i[c]))),{...i,isSphere:e}};function rh(i,...t){if(i instanceof HTMLElement||typeof i!="object"||i===null)return i;for(let e of t)for(let n in e)n!=="container"&&n in e&&(i[n]===void 0?i[n]=e[n]:typeof e[n]=="object"&&!Array.isArray(e[n])&&(i[n]=rh(i[n]||{},e[n])));return i}var gx=(i,t=2)=>{let e=new Xt,n=t*2,{isSphere:r,resolution:s,radius:a,font:o,corners:c,edges:l}=i,u=Qs.map(E=>({...i[E],radius:a}));r&&c.enabled&&u.push(c),r&&l.enabled&&u.push(l);let h=document.createElement("canvas"),f=h.getContext("2d");h.width=s*2+n*2,h.height=s*u.length+n*u.length;let[d,_]=D(u,s,o);u.forEach(({radius:E,label:O,color:T,labelColor:x,border:C,hover:{color:y,labelColor:U,border:q}},G)=>{let J=s*G+G*n+t;M(t,J,t,s,E,O,C,T,x),M(s+t*3,J,t,s,E,O,q??C,y??T,U??x)});let g=u.length,m=t/(s*2),p=t/(s*6),w=1/g,b=new Is(h);return b.repeat.set(.5-2*m,w-2*p),b.offset.set(m,1-p),Object.assign(b,{colorSpace:ze,wrapS:bi,wrapT:bi,userData:{offsetX:m,offsetY:p,cellHeight:w}}),b;function M(E,O,T,x,C,y,U,q,G){if(C=C*(x/2),q!=null&&q!==""&&(J(),f.fillStyle=e.set(q).getStyle(),f.fill()),U&&U.size){let X=U.size*x/2;E+=X,O+=X,x-=U.size*x,C=Math.max(0,C-X),J(),f.strokeStyle=e.set(U.color).getStyle(),f.lineWidth=U.size*x,f.stroke()}y&&P(f,E+x/2,O+(x+T)/2,y,e.set(G).getStyle());function J(){f.beginPath(),f.moveTo(E+C,O),f.lineTo(E+x-C,O),f.arcTo(E+x,O,E+x,O+C,C),f.lineTo(E+x,O+x-C),f.arcTo(E+x,O+x,E+x-C,O+x,C),f.lineTo(E+C,O+x),f.arcTo(E,O+x,E,O+x-C,C),f.lineTo(E,O+C),f.arcTo(E,O,E+C,O,C),f.closePath()}}function D(E,O,T){let x=[...E].sort((N,ut)=>{var ht,ct;return(((ht=N.label)==null?void 0:ht.length)||0)-(((ct=ut.label)==null?void 0:ct.length)||0)}).pop().label,{family:C,weight:y}=T,U=r?Math.sqrt(Math.pow(O*.7,2)/2):O,q=U,G=0,J=0;do{f.font=`${y} ${q}px ${C}`;let N=f.measureText(x);G=N.width,J=N.fontBoundingBoxDescent,q--}while(G>U&&q>0);let X=U/J,Z=Math.min(U/G,X),k=Math.floor(q*Z);return[`${y} ${k}px ${C}`,X]}function P(E,O,T,x,C){E.font=d,E.textAlign="center",E.textBaseline="middle",E.fillStyle=C,E.fillText(x,O,T+(r?_:0))}},xx=(i,t)=>i.offset.x=(t?.5:0)+i.userData.offsetX,oh=(i,t)=>{let{offset:e,userData:{offsetY:n,cellHeight:r}}=i;e.y=1-(t+1)*r+n};function ch(i,t,e=2,n=2){let r=e/2-i,s=n/2-i,a=i/e,o=(e-i)/e,c=i/n,l=(n-i)/n,u=[r,s,0,-r,s,0,-r,-s,0,r,-s,0],h=[o,l,a,l,a,c,o,c],f=[3*(t+1)+3,3*(t+1)+4,t+4,t+5,2*(t+1)+4,2,1,2*(t+1)+3,3,4*(t+1)+3,4,0],d=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11].map(P=>f[P]),_,g,m,p,w,b,M,D;for(let P=0;P<4;P++){p=P<1||P>2?r:-r,w=P<2?s:-s,b=P<1||P>2?o:a,M=P<2?l:c;for(let E=0;E<=t;E++)_=Math.PI/2*(P+E/t),g=Math.cos(_),m=Math.sin(_),u.push(p+i*g,w+i*m,0),h.push(b+a*g,M+c*m),E<t&&(D=(t+1)*P+E+4,d.push(P,D,D+1))}return new ve().setIndex(new ye(new Uint32Array(d),1)).setAttribute("position",new ye(new Float32Array(u),3)).setAttribute("uv",new ye(new Float32Array(h),2))}var yx=(i,t)=>{let e=new V,{isSphere:n,radius:r,smoothness:s}=i,a=ch(r,s);return Qs.map((o,c)=>{let l=c<3,u=Qs[c],h=c?t.clone():t;oh(h,c);let{enabled:f,scale:d,opacity:_,hover:g}=i[u],m={map:h,opacity:_,transparent:!0},p=n?new Mi(new ni(m)):new fe(a,new Ke(m)),w=l?u:u[1];return p.position[w]=(l?1:-1)*(n?hf:1),n||p.lookAt(e.copy(p.position).multiplyScalar(1.7)),p.scale.setScalar(d),p.renderOrder=1,p.visible=f,p.userData={scale:d,opacity:_,hover:g},p})},vx=(i,t)=>{let{isSphere:e,corners:n}=i;if(!n.enabled)return[];let{color:r,opacity:s,scale:a,radius:o,smoothness:c,hover:l}=n,u=e?null:ch(o,c),h={transparent:!0,opacity:s},f=[1,1,1,-1,1,1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1].map(_=>_*.85),d=new V;return Array(f.length/3).fill(0).map((_,g)=>{if(e){let w=t.clone();oh(w,6),h.map=w}else h.color=r;let m=e?new Mi(new ni(h)):new fe(u,new Ke(h)),p=g*3;return m.position.set(f[p],f[p+1],f[p+2]),e&&m.position.normalize().multiplyScalar(1.7),m.scale.setScalar(a),m.lookAt(d.copy(m.position).multiplyScalar(2)),m.renderOrder=1,m.userData={color:r,opacity:s,scale:a,hover:l},m})},bx=(i,t,e)=>{let{isSphere:n,edges:r}=i;if(!r.enabled)return[];let{color:s,opacity:a,scale:o,hover:c,radius:l,smoothness:u}=r,h=n?null:ch(l,u,1.2,.25),f={transparent:!0,opacity:a},d=[0,1,1,0,-1,1,1,0,1,-1,0,1,0,1,-1,0,-1,-1,1,0,-1,-1,0,-1,1,1,0,1,-1,0,-1,1,0,-1,-1,0].map(g=>g*.925),_=new V;return Array(d.length/3).fill(0).map((g,m)=>{if(n){let b=t.clone();oh(b,e),f.map=b}else f.color=s;let p=n?new Mi(new ni(f)):new fe(h,new Ke(f)),w=m*3;return p.position.set(d[w],d[w+1],d[w+2]),n&&p.position.normalize().multiplyScalar(1.7),p.scale.setScalar(o),p.lookAt(_.copy(p.position).multiplyScalar(2)),!n&&!p.position.y&&(p.rotation.z=Math.PI/2),p.renderOrder=1,p.userData={color:s,opacity:a,scale:o,hover:c},p})};function Sx(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},a={},o=i[0].morphTargetsRelative,c=new ve,l=0;for(let u=0;u<i.length;++u){let h=i[u],f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in h.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0,h=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let _=0;_<d.count;++_)h.push(d.getX(_)+u);u+=i[f].attributes.position.count}c.setIndex(h)}for(let u in s){let h=tf(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(let u in a){let h=a[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){let d=[];for(let g=0;g<a[u].length;++g)d.push(a[u][g][f]);let _=tf(d);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(_)}}return c}function tf(i){let t,e,n,r=-1,s=0;for(let l=0;l<i.length;++l){let u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*e}let a=new t(s),o=new ye(a,e,n),c=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute){let h=c/e;for(let f=0,d=u.count;f<d;f++)for(let _=0;_<e;_++){let g=u.getComponent(f,_);o.setComponent(f+h,_,g)}}else a.set(u.array,c);c+=u.count*e}return r!==void 0&&(o.gpuType=r),o}var wx=(i,t)=>{let{isSphere:e,background:{enabled:n,color:r,opacity:s,hover:a}}=t,o,c=new Ke({color:r,side:Ie,opacity:s,transparent:!0,depthWrite:!1});if(!n)return null;if(e)o=new fe(new Ps(1.8,64,64),c);else{let l;i.forEach(u=>{let h=u.scale.x;u.scale.setScalar(.9),u.updateMatrix();let f=u.geometry.clone();f.applyMatrix4(u.matrix),l=l?Sx([l,f]):f,u.scale.setScalar(h)}),o=new fe(l,c)}return o.userData={color:r,opacity:s,hover:a},o},ef=new Ge,hc=new V,fc=class extends Fs{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new de(t,3)),this.setAttribute("uv",new de(e,2))}applyMatrix4(t){let e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));let n=new Ti(e,6,1);return this.setAttribute("instanceStart",new rn(n,3,0)),this.setAttribute("instanceEnd",new rn(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));let n=new Ti(e,6,1);return this.setAttribute("instanceColorStart",new rn(n,3,0)),this.setAttribute("instanceColorEnd",new rn(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Ds(t.geometry)),this}fromLineSegments(t){let e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ge);let t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),ef.setFromBufferAttribute(e),this.boundingBox.union(ef))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn),this.boundingBox===null&&this.computeBoundingBox();let t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)hc.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(hc)),hc.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(hc));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}};gt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Pt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ve.line={uniforms:Ks.merge([gt.common,gt.fog,gt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var ta=class extends $e{constructor(t){super({type:"LineMaterial",uniforms:Ks.clone(Ve.line.uniforms),vertexShader:Ve.line.vertexShader,fragmentShader:Ve.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1))}},nf=new V,rf=new V,Re=new ie,Pe=new ie,An=new ie,eh=new V,nh=new he,De=new zs,sf=new V,uc=new Ge,dc=new vn,Tn=new ie,Cn,zi;function af(i,t,e){return Tn.set(0,0,-t,1).applyMatrix4(i.projectionMatrix),Tn.multiplyScalar(1/Tn.w),Tn.x=zi/e.width,Tn.y=zi/e.height,Tn.applyMatrix4(i.projectionMatrixInverse),Tn.multiplyScalar(1/Tn.w),Math.abs(Math.max(Tn.x,Tn.y))}function Mx(i,t){let e=i.matrixWorld,n=i.geometry,r=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,r.count);for(let o=0,c=a;o<c;o++){De.start.fromBufferAttribute(r,o),De.end.fromBufferAttribute(s,o),De.applyMatrix4(e);let l=new V,u=new V;Cn.distanceSqToSegment(De.start,De.end,u,l),u.distanceTo(l)<zi*.5&&t.push({point:u,pointOnLine:l,distance:Cn.origin.distanceTo(u),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function Ex(i,t,e){let n=t.projectionMatrix,r=i.material.resolution,s=i.matrixWorld,a=i.geometry,o=a.attributes.instanceStart,c=a.attributes.instanceEnd,l=Math.min(a.instanceCount,o.count),u=-t.near;Cn.at(1,An),An.w=1,An.applyMatrix4(t.matrixWorldInverse),An.applyMatrix4(n),An.multiplyScalar(1/An.w),An.x*=r.x/2,An.y*=r.y/2,An.z=0,eh.copy(An),nh.multiplyMatrices(t.matrixWorldInverse,s);for(let h=0,f=l;h<f;h++){if(Re.fromBufferAttribute(o,h),Pe.fromBufferAttribute(c,h),Re.w=1,Pe.w=1,Re.applyMatrix4(nh),Pe.applyMatrix4(nh),Re.z>u&&Pe.z>u)continue;if(Re.z>u){let p=Re.z-Pe.z,w=(Re.z-u)/p;Re.lerp(Pe,w)}else if(Pe.z>u){let p=Pe.z-Re.z,w=(Pe.z-u)/p;Pe.lerp(Re,w)}Re.applyMatrix4(n),Pe.applyMatrix4(n),Re.multiplyScalar(1/Re.w),Pe.multiplyScalar(1/Pe.w),Re.x*=r.x/2,Re.y*=r.y/2,Pe.x*=r.x/2,Pe.y*=r.y/2,De.start.copy(Re),De.start.z=0,De.end.copy(Pe),De.end.z=0;let d=De.closestPointToPointParameter(eh,!0);De.at(d,sf);let _=Pi.lerp(Re.z,Pe.z,d),g=_>=-1&&_<=1,m=eh.distanceTo(sf)<zi*.5;if(g&&m){De.start.fromBufferAttribute(o,h),De.end.fromBufferAttribute(c,h),De.start.applyMatrix4(s),De.end.applyMatrix4(s);let p=new V,w=new V;Cn.distanceSqToSegment(De.start,De.end,w,p),e.push({point:w,pointOnLine:p,distance:Cn.origin.distanceTo(w),object:i,face:null,faceIndex:h,uv:null,uv1:null})}}}var sh=class extends fe{constructor(t=new fc,e=new ta({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,r=new Float32Array(2*e.count);for(let a=0,o=0,c=e.count;a<c;a++,o+=2)nf.fromBufferAttribute(e,a),rf.fromBufferAttribute(n,a),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+nf.distanceTo(rf);let s=new Ti(r,2,1);return t.setAttribute("instanceDistanceStart",new rn(s,1,0)),t.setAttribute("instanceDistanceEnd",new rn(s,1,1)),this}raycast(t,e){let n=this.material.worldUnits,r=t.camera;r===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let s=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Cn=t.ray;let a=this.matrixWorld,o=this.geometry,c=this.material;zi=c.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),dc.copy(o.boundingSphere).applyMatrix4(a);let l;if(n)l=zi*.5;else{let h=Math.max(r.near,dc.distanceToPoint(Cn.origin));l=af(r,h,c.resolution)}if(dc.radius+=l,Cn.intersectsSphere(dc)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),uc.copy(o.boundingBox).applyMatrix4(a);let u;if(n)u=zi*.5;else{let h=Math.max(r.near,uc.distanceToPoint(Cn.origin));u=af(r,h,c.resolution)}uc.expandByScalar(u),Cn.intersectsBox(uc)!==!1&&(n?Mx(this,e):Ex(this,r,e))}},pc=class extends fc{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){let e=t.length-3,n=new Float32Array(2*e);for(let r=0;r<e;r+=3)n[2*r]=t[r],n[2*r+1]=t[r+1],n[2*r+2]=t[r+2],n[2*r+3]=t[r+3],n[2*r+4]=t[r+4],n[2*r+5]=t[r+5];return super.setPositions(n),this}setColors(t){let e=t.length-3,n=new Float32Array(2*e);for(let r=0;r<e;r+=3)n[2*r]=t[r],n[2*r+1]=t[r+1],n[2*r+2]=t[r+2],n[2*r+3]=t[r+3],n[2*r+4]=t[r+4],n[2*r+5]=t[r+5];return super.setColors(n),this}fromLine(t){let e=t.geometry;return this.setPositions(e.attributes.position.array),this}},ah=class extends sh{constructor(t=new pc,e=new ta({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}},Ax=i=>{let t=new Xt,e=[],n=[],{isSphere:r}=i;if(Qs.forEach((o,c)=>{let{enabled:l,line:u,scale:h,color:f}=i[o];if(!l||!u)return;let d=c<3?1:-1,_=(r?hf-h/2:.975)*d;e.push(o.includes("x")?_:0,o.includes("y")?_:0,o.includes("z")?_:0,0,0,0);let g=t.set(f).toArray();n.push(...g,...g)}),!e.length)return null;let s=new pc().setPositions(e).setColors(n),a=new ta({linewidth:i.lineWidth,vertexColors:!0,resolution:new Pt(window.innerWidth,window.innerHeight)});return new ah(s,a).computeLineDistances()},Tx=i=>{let{corners:t,edges:e}=i,n=[],r=gx(i),s=yx(i,r);n.push(...s),t.enabled&&n.push(...vx(i,r)),e.enabled&&n.push(...bx(i,r,t.enabled?7:6));let a=wx(s,i),o=Ax(i);return[n,a,o]},js=(i,t=!0)=>{let{material:e,userData:n}=i,{opacity:r,color:s,scale:a}=t?n.hover:n;i.scale.setScalar(a),e.opacity=r,e.map?xx(e.map,t):e.color.set(s)},Lr=new he,Cx=new Vn,of=new V,Ix=new Pt,mc=class extends Te{constructor(t,e,n={}){super(),Qt(this,"type","ViewportGizmo"),Qt(this,"enabled",!0),Qt(this,"camera"),Qt(this,"renderer"),Qt(this,"options"),Qt(this,"target",new V),Qt(this,"animated",!0),Qt(this,"speed",1),Qt(this,"animating",!1),Qt(this,"_options"),Qt(this,"_intersections"),Qt(this,"_background",null),Qt(this,"_viewport",new ie),Qt(this,"_originalViewport",new ie),Qt(this,"_originalScissor",new ie),Qt(this,"_camera"),Qt(this,"_container"),Qt(this,"_domElement"),Qt(this,"_domRect"),Qt(this,"_dragging",!1),Qt(this,"_distance",0),Qt(this,"_clock",new Bs),Qt(this,"_targetPosition",new V),Qt(this,"_targetQuaternion",new Ae),Qt(this,"_quaternionStart",new Ae),Qt(this,"_quaternionEnd",new Ae),Qt(this,"_pointerStart",new Pt),Qt(this,"_focus",null),Qt(this,"_placement"),Qt(this,"_controls"),Qt(this,"_controlsListeners"),this.camera=t,this.renderer=e,this.set(n)}get placement(){return this._placement}set placement(t){this._placement=cf(this._domElement,t),this.domUpdate()}set(t={}){this.dispose(),this.options=t,this._options=_x(t),this._camera=this._options.isSphere?new Er(-1.8,1.8,1.8,-1.8,5,10):new Ee(26,1,5,10),this._camera.position.set(0,0,7);let[e,n,r]=Tx(this._options);n&&this.add(n),r&&this.add(r),this.add(...e),this._background=n,this._intersections=e;let{container:s,animated:a,speed:o}=this._options;return this.animated=a,this.speed=o,this._container=s?ux(s):document.body,this._domElement=hx(this._options),this._domElement.onpointerdown=c=>this._onPointerDown(c),this._domElement.onpointermove=c=>this._onPointerMove(c),this._domElement.onpointerleave=()=>this._onPointerLeave(),this._container.appendChild(this._domElement),this._controls&&this.attachControls(this._controls),this.update(),this}render(){this.animating&&this._animate();let{renderer:t,_viewport:e}=this,n=t.getScissorTest(),r=t.autoClear;return t.autoClear=!1,t.setViewport(e),n&&t.setScissor(e),t.clear(!1,!0,!1),t.render(this,this._camera),t.setViewport(this._originalViewport),n&&t.setScissor(this._originalScissor),t.autoClear=r,this}domUpdate(){this._domRect=this._domElement.getBoundingClientRect();let t=this.renderer,e=this._domRect,n=t.domElement.getBoundingClientRect();return this._viewport.set(e.left-n.left,t.domElement.clientHeight-(e.top-n.top+e.height),e.width,e.height),t.getViewport(this._originalViewport),t.getScissorTest()&&t.getScissor(this._originalScissor),this}cameraUpdate(){return this._updateOrientation(),this}update(t=!0){return t&&this._controls&&this._controls.update(),this.domUpdate().cameraUpdate()}attachControls(t){return this.detachControls(),this.target=t.target,this._controlsListeners={start:()=>t.enabled=!1,end:()=>t.enabled=!0,change:()=>this.update(!1)},this.addEventListener("start",this._controlsListeners.start),this.addEventListener("end",this._controlsListeners.end),t.addEventListener("change",this._controlsListeners.change),this._controls=t,this}detachControls(){if(!(!this._controlsListeners||!this._controls))return this.target=new V().copy(this._controls.target),this.removeEventListener("start",this._controlsListeners.start),this.removeEventListener("end",this._controlsListeners.end),this._controls.removeEventListener("change",this._controlsListeners.change),this._controlsListeners=void 0,this._controls=void 0,this}dispose(){var t;this.detachControls(),this.children.forEach(e=>{var n,r,s,a;this.remove(e);let o=e;(n=o.material)==null||n.dispose(),(s=(r=o.material)==null?void 0:r.map)==null||s.dispose(),(a=o.geometry)==null||a.dispose()}),(t=this._domElement)==null||t.remove()}_updateOrientation(t=!0){t&&(this.quaternion.copy(this.camera.quaternion).invert(),this.updateMatrixWorld()),Kd(this._options,this._intersections,this.camera)}_animate(){let{position:t,quaternion:e}=this.camera;if(t.set(0,0,1),!this.animated){t.applyQuaternion(this._quaternionEnd).multiplyScalar(this._distance).add(this.target),e.copy(this._targetQuaternion),this._updateOrientation(),this.animating=!1,this.dispatchEvent({type:"change"}),this.dispatchEvent({type:"end"});return}let n=this._clock.getDelta()*px*this.speed;this._quaternionStart.rotateTowards(this._quaternionEnd,n),t.applyQuaternion(this._quaternionStart).multiplyScalar(this._distance).add(this.target),e.rotateTowards(this._targetQuaternion,n),this._updateOrientation(),requestAnimationFrame(()=>this.dispatchEvent({type:"change"})),this._quaternionStart.angleTo(this._quaternionEnd)<th&&(this.animating=!1,this.dispatchEvent({type:"end"}))}_setOrientation(t){let e=this.camera,n=this.target;this._targetPosition.copy(t).multiplyScalar(this._distance),Lr.setPosition(this._targetPosition).lookAt(this._targetPosition,this.position,this.up),this._targetQuaternion.setFromRotationMatrix(Lr),this._targetPosition.add(n),Lr.lookAt(this._targetPosition,n,this.up),this._quaternionEnd.setFromRotationMatrix(Lr),Lr.setPosition(e.position).lookAt(e.position,n,this.up),this._quaternionStart.setFromRotationMatrix(Lr),this.animating=!0,this._clock.start(),this.dispatchEvent({type:"start"})}_onPointerDown(t){if(!this.enabled)return;let e=o=>{if(!this._dragging){if(fx(o,this._pointerStart))return;this._dragging=!0}let c=Ix.set(o.clientX,o.clientY).sub(this._pointerStart).multiplyScalar(1/this._domRect.width*Math.PI),l=Cx.setFromVector3(of.subVectors(this.camera.position,this.target));l.theta=s-c.x,l.phi=ih(a-c.y,th,Math.PI-th),this.camera.position.setFromSpherical(l).add(this.target),this.camera.lookAt(this.target),this.quaternion.copy(this.camera.quaternion).invert(),this._updateOrientation(!1),this.dispatchEvent({type:"change"})},n=()=>{if(document.removeEventListener("pointermove",e,!1),document.removeEventListener("pointerup",n,!1),!this._dragging)return this._handleClick(t);this._focus&&(js(this._focus,!1),this._focus=null),this._dragging=!1,this.dispatchEvent({type:"end"})};if(this.animating)return;t.preventDefault(),this._pointerStart.set(t.clientX,t.clientY);let r=new Vn().setFromVector3(of.subVectors(this.camera.position,this.target)),s=r.theta,a=r.phi;this._distance=r.radius,document.addEventListener("pointermove",e,!1),document.addEventListener("pointerup",n,!1),this.dispatchEvent({type:"start"})}_onPointerMove(t){!this.enabled||this._dragging||(this._background&&Qd(this._background,!0),this._handleHover(t))}_onPointerLeave(){!this.enabled||this._dragging||(this._background&&Qd(this._background,!1),this._focus&&js(this._focus,!1),this._domElement.style.cursor="")}_handleClick(t){let e=jd(t,this._domRect,this._camera,this._intersections);this._focus&&(js(this._focus,!1),this._focus=null),e&&(this._setOrientation(e.object.position),this.dispatchEvent({type:"change"}))}_handleHover(t){let e=jd(t,this._domRect,this._camera,this._intersections),n=e?.object||null;this._focus!==n&&(this._domElement.style.cursor=n?"pointer":"",this._focus&&js(this._focus,!1),(this._focus=n)?js(n,!0):Kd(this._options,this._intersections,this.camera))}};var uf={type:"change"},hh={type:"start"},ff={type:"end"},_c=new ei,df=new tn,Rx=Math.cos(70*Pi.DEG2RAD),we=new V,We=2*Math.PI,ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},lh=1e-6,gc=class extends Vs{constructor(t,e=null){super(t,e),this.state=ce.NONE,this.enabled=!0,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:si.ROTATE,MIDDLE:si.DOLLY,RIGHT:si.PAN},this.touches={ONE:ai.ROTATE,TWO:ai.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new Ae,this._lastTargetPosition=new V,this._quat=new Ae().setFromUnitVectors(t.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vn,this._sphericalDelta=new Vn,this._scale=1,this._panOffset=new V,this._rotateStart=new Pt,this._rotateEnd=new Pt,this._rotateDelta=new Pt,this._panStart=new Pt,this._panEnd=new Pt,this._panDelta=new Pt,this._dollyStart=new Pt,this._dollyEnd=new Pt,this._dollyDelta=new Pt,this._dollyDirection=new V,this._mouse=new Pt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Dx.bind(this),this._onPointerDown=Px.bind(this),this._onPointerUp=Lx.bind(this),this._onContextMenu=kx.bind(this),this._onMouseWheel=Fx.bind(this),this._onKeyDown=Bx.bind(this),this._onTouchStart=Nx.bind(this),this._onTouchMove=zx.bind(this),this._onMouseDown=Ox.bind(this),this._onMouseMove=Ux.bind(this),this._interceptControlDown=Vx.bind(this),this._interceptControlUp=Hx.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(uf),this.update(),this.state=ce.NONE}update(t=null){let e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=We:n>Math.PI&&(n-=We),r<-Math.PI?r+=We:r>Math.PI&&(r-=We),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=we.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){let o=new V(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;let l=new V(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(_c.origin.copy(this.object.position),_c.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_c.direction))<Rx?this.object.lookAt(this.target):(df.setFromNormalAndCoplanarPoint(this.object.up,this.target),_c.intersectPlane(df,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>lh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>lh||this._lastTargetPosition.distanceToSquared(this.target)>lh?(this.dispatchEvent(uf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?We/60*this.autoRotateSpeed*t:We/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;we.copy(r).sub(this.target);let s=we.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=t-n.left,s=e-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(We*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-We*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(We*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-We*this.rotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(n,r)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),r=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(We*this._rotateDelta.x/e.clientHeight),this._rotateUp(We*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Pt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Px(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Dx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Lx(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ff),this.state=ce.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ox(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case si.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ce.DOLLY;break;case si.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ce.ROTATE}break;case si.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ce.PAN}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(hh)}function Ux(i){switch(this.state){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Fx(i){this.enabled===!1||this.enableZoom===!1||this.state!==ce.NONE||(i.preventDefault(),this.dispatchEvent(hh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ff))}function Bx(i){this.enabled!==!1&&this._handleKeyDown(i)}function Nx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ai.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ce.TOUCH_ROTATE;break;case ai.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ce.TOUCH_PAN;break;default:this.state=ce.NONE}break;case 2:switch(this.touches.TWO){case ai.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ce.TOUCH_DOLLY_PAN;break;case ai.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ce.TOUCH_DOLLY_ROTATE;break;default:this.state=ce.NONE}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(hh)}function zx(i){switch(this._trackPointer(i),this.state){case ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ce.NONE}}function kx(i){this.enabled!==!1&&i.preventDefault()}function Vx(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Hx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Gx=new Os().load("textures/l1_prison_[stone]_ground19.jpg"),Wx=new Ke({map:Gx}),ph=new V(-350,200,350),Xx=new Ae(0,0,0,1),Ur=document.getElementById("canvas"),dh=new oc({antialias:!0,canvas:Ur}),qx=Number.parseInt(Ur.getAttribute("width"),10),Yx=Number.parseInt(Ur.getAttribute("height"),10),Zx=45,Kx=qx/Yx,Or=new Ee(Zx,Kx,1,4e3),$x=Xx.clone();Or.position.x=ph.x;Or.position.y=ph.y;Or.position.z=ph.z;var Xn=new Es,yc=new kn;Xn.add(yc);var Jx=new Us;Xn.add(Jx);var Xe,xc;function jx(){dh.render(Xn,Or),Xe!==void 0&&Xe.update(),xc!==void 0&&xc.render()}var mh=0;function _h(){jx(),mh=requestAnimationFrame(_h)}function Qx(){cancelAnimationFrame(mh),_h()}function ty(){cancelAnimationFrame(mh)}function ey(){Xe=new gc(Or,dh.domElement),Xe.enableRotate=!0,Xe.enablePan=!0,Xe.enableZoom=!0,Xe.enableDamping=!0,Xe.dampingFactor=.1,Xe.minDistance=100,Xe.maxDistance=2e3,Xe.maxPolarAngle=Math.PI/2,Xe.autoRotate=!1,Xe.maxTargetRadius=100,xc=new mc(Or,dh,{type:"sphere",container:Ur.parentElement}),xc.attachControls(Xe)}var ki;function mf(){if(ki!==void 0)return;let i=Yd(yc,$x),t=Math.floor(Math.log2(i/10)),e=1e3*2**t,n=10*2**t;ki=new ks(e,e/n),Xn.add(ki)}function ny(){ki!==void 0&&(Xn.remove(ki),ki.dispose(),ki=void 0)}var Vi,Hi;function _f(){if(Vi!==void 0)return;let i=new V(0,-1,0);i.normalize();let t=180,e=new V(0,t,0),n=16776960;Vi=new Ar(i,e,t,n,t),Xn.add(Vi)}function iy(){Vi!==void 0&&(Xn.remove(Vi),Vi.dispose(),Vi=void 0)}function gf(){if(Hi!==void 0)return;let i=new V(0,0,-1);i.normalize();let t=80,e=new V(0,170,0),n=16711680;Hi=new Ar(i,e,t,n,t),Xn.add(Hi)}function ry(){Hi!==void 0&&(Xn.remove(Hi),Hi.dispose(),Hi=void 0)}function xf(i=new V(0,0,0)){let t=new Ei(100,100,1,1);t.rotateX(Pi.degToRad(-90)),t.translate(i.x,i.y,i.z);let e=new fe(t,Wx);yc.add(e)}function sy(i){let t=lc(()=>({portals:[],polygons:[]}),2),e={};return i.forEach(({vertices:n})=>{let[r,s]=ts(n),a=`${r}|${s}`;a in e?e[a]=e[a]+1:e[a]=0,t[1].polygons.push({cellX:r,cellY:s,polygonIdx:e[a]})}),t}function ay({vertices:i,flags:t}){let[e,n,r,s]=i,a=new V(0,0,0),o=new V(0,0,0);return new en(e,n,r).getNormal(a),(t&_n.Quad)!==0&&new en(s,r,n).getNormal(o),{norm:a,norm2:o}}function oy(i){let t=[],e=i.getIndex(),n=i.getAttribute("position");if(e===null)for(let r=0;r<n.count;r++)t.push({idx:r,vector:new V(n.getX(r),n.getY(r),n.getZ(r))});else for(let r=0;r<e.count;r++){let s=e.getX(r);t.push({idx:s,vector:new V(n.getX(s),n.getY(s),n.getZ(s))})}return t}function uh(i,t){return Math.round(t*10**i)/10**i}function yf(i){i.updateMatrix(),i instanceof fe&&i.geometry.applyMatrix4(i.matrix),i.children.forEach(t=>{t.applyMatrix4(i.matrix),yf(t)}),i.position.set(0,0,0),i.rotation.set(0,0,0),i.scale.set(1,1,1),i.updateMatrix()}function cy(i){let[t,e,n,r]=i;t.v=-t.v,e.v=-e.v,n.v=-n.v,r.v=-r.v}function ly(i){let t=!1,e=!1;i.forEach(n=>{let{u:r,v:s}=n;r<0?r%1===0?(r=0,t=!0):r=1+r%1:r>1?r=r%1:t&&(r=1),s<0?s%1===0?(s=0,e=!0):s=1+s%1:s>1?s=s%1:e&&(s=1),n.u=r,n.v=s})}function hy(){let i=Math.floor(Date.now()/1e3),t="Arx Fatalis Browser Editor - v1.0.0",e=1,n={position:{x:0,y:-180,z:0},orientation:{a:0,b:0,g:0}},r={offset:{x:6e3,y:0,z:6e3}},s=yc.children.filter(h=>h instanceof fe).map(h=>{let f=h.clone();return f.traverse(d=>{if(d instanceof fe){let _=d.geometry;d.geometry=_.clone()}}),yf(f),f}).map(h=>{let{geometry:f}=h,d=f.getAttribute("uv"),_=10,g=_n.Quad,[m,p,w,b,M,D]=oy(f).map(({idx:T,vector:x})=>({x:r.offset.x+uh(_,x.x),y:r.offset.y-uh(_,x.y),z:r.offset.z-uh(_,x.z),u:d.getX(T),v:d.getY(T)})),P=[m,p,w,M];cy(P),ly(P);let{norm:E,norm2:O}=ay({vertices:P.map(({x:T,y:x,z:C})=>new V(T,x,C)),flags:g});return{vertices:P,norm:E,norm2:O,textureContainerId:1,flags:g,transval:0,area:1e4,room:1}}),a=[{id:1,filename:"l1_prison_[stone]_ground19.jpg"}],o={uniqueHeaders:[],cells:lc(()=>({}),di*qn),anchors:[],rooms:sy(s),roomDistances:[{distance:-1,startPosition:{x:0,y:0,z:0},endPosition:{x:1,y:0,z:0}},{distance:-1,startPosition:{x:0,y:0,z:0},endPosition:{x:0,y:1,z:0}},{distance:-1,startPosition:{x:.984375,y:.984375,z:0},endPosition:{x:0,y:0,z:0}},{distance:-1,startPosition:{x:0,y:0,z:0},endPosition:{x:0,y:0,z:0}}]},c={header:{lastUser:t,time:i,posEdit:n.position,angleEdit:n.orientation,numberOfBackgroundPolygons:s.length},scene:{levelIdx:e},interactiveObjects:[],fogs:[],paths:[],zones:[]},l={header:{levelIdx:e},uniqueHeaders:o.uniqueHeaders,sceneHeader:{mScenePosition:r.offset},cells:o.cells,anchors:o.anchors,portals:[],rooms:o.rooms,roomDistances:o.roomDistances,polygons:s,textureContainers:a},u={header:{lastUser:t,time:i,numberOfBackgroundPolygons:s.length},colors:s.flatMap(({vertices:h})=>lc(()=>({r:255,g:255,b:255,a:1}),h.length)),lights:[]};return{fts:l,dlf:c,llf:u}}function uy({fts:i,dlf:t,llf:e}){let n=ss.save(e),{total:r}=ia(n,"llf"),[s,a]=Nr(n,r);console.time("llf");let o=Xi([s,ca(a,"binary","large")]);console.timeEnd("llf");let c=Wr.save(t),{total:l}=ia(c,"dlf"),[u,h]=Nr(c,l);console.time("dlf");let f=Xi([u,ca(h,"binary","large")]);console.timeEnd("dlf");let d=es.save(i,!0),{total:_}=ia(d,"fts"),[g,m]=Nr(d,_);console.time("fts");let p=Xi([g,ca(m,"binary","large")]);return console.timeEnd("fts"),{rawLlf:o,rawDlf:f,rawFts:p}}document.getElementById("show-grid")?.addEventListener("change",i=>{i.target.checked?mf():ny()});document.getElementById("show-player")?.addEventListener("change",i=>{i.target.checked?(_f(),gf()):(iy(),ry())});document.getElementById("download")?.addEventListener("click",async()=>{let{fts:i,dlf:t,llf:e}=hy(),{rawFts:n,rawDlf:r,rawLlf:s}=uy({fts:i,dlf:t,llf:e}),a=new pf.default;a.file("game/graph/levels/level1/fast.fts",n),a.file("graph/levels/level1/level1.dlf",r),a.file("graph/levels/level1/level1.llf",s);let o=await a.generateAsync({type:"blob"});qd("arx-fatalis-generated-map",o,"application/zip")});window.addEventListener("focus",Qx);window.addEventListener("blur",ty);ey();xf();document.getElementById("show-grid").checked&&mf();document.getElementById("show-player").checked&&(_f(),gf());_h();var fh=new Pt(0,0);Ur.addEventListener("mousedown",i=>{Ql(i)&&(fh.x=i.clientX,fh.y=i.clientY)});Ur.addEventListener("mouseup",i=>{!Ql(i)||!new Pt(i.clientX,i.clientY).equals(fh)||xf(new V(jl(-500,500),0,jl(-500,500)))});})();
/*! Bundled license information:

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.1 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)

three/build/three.core.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
//# sourceMappingURL=bundle.js.map
