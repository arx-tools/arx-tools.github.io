"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/jszip/dist/jszip.min.js
  var require_jszip_min = __commonJS({
    "node_modules/jszip/dist/jszip.min.js"(exports, module) {
      !function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
        }
      }(function() {
        return function s(a, o, h) {
          function u(r, e2) {
            if (!o[r]) {
              if (!a[r]) {
                var t = "function" == typeof __require && __require;
                if (!e2 && t) return t(r, true);
                if (l) return l(r, true);
                var n = new Error("Cannot find module '" + r + "'");
                throw n.code = "MODULE_NOT_FOUND", n;
              }
              var i = o[r] = { exports: {} };
              a[r][0].call(i.exports, function(e3) {
                var t2 = a[r][1][e3];
                return u(t2 || e3);
              }, i, i.exports, s, a, o, h);
            }
            return o[r].exports;
          }
          for (var l = "function" == typeof __require && __require, e = 0; e < h.length; e++) u(h[e]);
          return u;
        }({ 1: [function(e, t, r) {
          "use strict";
          var d = e("./utils"), c = e("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          r.encode = function(e2) {
            for (var t2, r2, n, i, s, a, o, h = [], u = 0, l = e2.length, f = l, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f = l - u, n = c2 ? (t2 = e2[u++], r2 = u < l ? e2[u++] : 0, u < l ? e2[u++] : 0) : (t2 = e2.charCodeAt(u++), r2 = u < l ? e2.charCodeAt(u++) : 0, u < l ? e2.charCodeAt(u++) : 0), i = t2 >> 2, s = (3 & t2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
            return h.join("");
          }, r.decode = function(e2) {
            var t2, r2, n, i, s, a, o = 0, h = 0, u = "data:";
            if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
            var l, f = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
            if (e2.charAt(e2.length - 1) === p.charAt(64) && f--, e2.charAt(e2.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
            for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e2.length; ) t2 = p.indexOf(e2.charAt(o++)) << 2 | (i = p.indexOf(e2.charAt(o++))) >> 4, r2 = (15 & i) << 4 | (s = p.indexOf(e2.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e2.charAt(o++))), l[h++] = t2, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n);
            return l;
          };
        }, { "./support": 30, "./utils": 32 }], 2: [function(e, t, r) {
          "use strict";
          var n = e("./external"), i = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
          function o(e2, t2, r2, n2, i2) {
            this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r2, this.compression = n2, this.compressedContent = i2;
          }
          o.prototype = { getContentWorker: function() {
            var e2 = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
            return e2.on("end", function() {
              if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), e2;
          }, getCompressedWorker: function() {
            return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          } }, o.createWorkerFrom = function(e2, t2, r2) {
            return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
          }, t.exports = o;
        }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t, r) {
          "use strict";
          var n = e("./stream/GenericWorker");
          r.STORE = { magic: "\0\0", compressWorker: function() {
            return new n("STORE compression");
          }, uncompressWorker: function() {
            return new n("STORE decompression");
          } }, r.DEFLATE = e("./flate");
        }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t, r) {
          "use strict";
          var n = e("./utils");
          var o = function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          }();
          t.exports = function(e2, t2) {
            return void 0 !== e2 && e2.length ? "string" !== n.getTypeOf(e2) ? function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3[a])];
              return -1 ^ e3;
            }(0 | t2, e2, e2.length, 0) : function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3.charCodeAt(a))];
              return -1 ^ e3;
            }(0 | t2, e2, e2.length, 0) : 0;
          };
        }, { "./utils": 32 }], 5: [function(e, t, r) {
          "use strict";
          r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
        }, {}], 6: [function(e, t, r) {
          "use strict";
          var n = null;
          n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n };
        }, { lie: 37 }], 7: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n ? "uint8array" : "array";
          function h(e2, t2) {
            a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
          }
          r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e2) {
            this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
          }, h.prototype.flush = function() {
            a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
          }, h.prototype.cleanUp = function() {
            a.prototype.cleanUp.call(this), this._pako = null;
          }, h.prototype._createPako = function() {
            this._pako = new i[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
            var t2 = this;
            this._pako.onData = function(e2) {
              t2.push({ data: e2, meta: t2.meta });
            };
          }, r.compressWorker = function(e2) {
            return new h("Deflate", e2);
          }, r.uncompressWorker = function() {
            return new h("Inflate", {});
          };
        }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t, r) {
          "use strict";
          function A(e2, t2) {
            var r2, n2 = "";
            for (r2 = 0; r2 < t2; r2++) n2 += String.fromCharCode(255 & e2), e2 >>>= 8;
            return n2;
          }
          function n(e2, t2, r2, n2, i2, s2) {
            var a, o, h = e2.file, u = e2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
            t2 && !r2 || (x.crc32 = e2.crc32, x.compressedSize = e2.compressedSize, x.uncompressedSize = e2.uncompressedSize);
            var S = 0;
            t2 && (S |= 8), l || !_ && !g || (S |= 2048);
            var z = 0, C = 0;
            w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= function(e3, t3) {
              var r3 = e3;
              return e3 || (r3 = t3 ? 16893 : 33204), (65535 & r3) << 16;
            }(h.unixPermissions, w)) : (C = 20, z |= function(e3) {
              return 63 & (e3 || 0);
            }(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
            var E = "";
            return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n2, 4) + f + b + p };
          }
          var I = e("../utils"), i = e("../stream/GenericWorker"), O = e("../utf8"), B = e("../crc32"), R = e("../signature");
          function s(e2, t2, r2, n2) {
            i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r2, this.encodeFileName = n2, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }
          I.inherits(s, i), s.prototype.push = function(e2) {
            var t2 = e2.meta.percent || 0, r2 = this.entriesCount, n2 = this._sources.length;
            this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t2 + 100 * (r2 - n2 - 1)) / r2 : 100 } }));
          }, s.prototype.openedSource = function(e2) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
            var t2 = this.streamFiles && !e2.file.dir;
            if (t2) {
              var r2 = n(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({ data: r2.fileRecord, meta: { percent: 0 } });
            } else this.accumulate = true;
          }, s.prototype.closedSource = function(e2) {
            this.accumulate = false;
            var t2 = this.streamFiles && !e2.file.dir, r2 = n(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r2.dirRecord), t2) this.push({ data: function(e3) {
              return R.DATA_DESCRIPTOR + A(e3.crc32, 4) + A(e3.compressedSize, 4) + A(e3.uncompressedSize, 4);
            }(e2), meta: { percent: 100 } });
            else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, s.prototype.flush = function() {
            for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({ data: this.dirRecords[t2], meta: { percent: 100 } });
            var r2 = this.bytesWritten - e2, n2 = function(e3, t3, r3, n3, i2) {
              var s2 = I.transformTo("string", i2(n3));
              return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e3, 2) + A(e3, 2) + A(t3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
            }(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
            this.push({ data: n2, meta: { percent: 100 } });
          }, s.prototype.prepareNextSource = function() {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, s.prototype.registerPrevious = function(e2) {
            this._sources.push(e2);
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
          }, s.prototype.error = function(e2) {
            var t2 = this._sources;
            if (!i.prototype.error.call(this, e2)) return false;
            for (var r2 = 0; r2 < t2.length; r2++) try {
              t2[r2].error(e2);
            } catch (e3) {
            }
            return true;
          }, s.prototype.lock = function() {
            i.prototype.lock.call(this);
            for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
          }, t.exports = s;
        }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t, r) {
          "use strict";
          var u = e("../compressions"), n = e("./ZipFileWorker");
          r.generateWorker = function(e2, a, t2) {
            var o = new n(a.streamFiles, t2, a.platform, a.encodeFileName), h = 0;
            try {
              e2.forEach(function(e3, t3) {
                h++;
                var r2 = function(e4, t4) {
                  var r3 = e4 || t4, n3 = u[r3];
                  if (!n3) throw new Error(r3 + " is not a valid compression method !");
                  return n3;
                }(t3.options.compression, a.compression), n2 = t3.options.compressionOptions || a.compressionOptions || {}, i = t3.dir, s = t3.date;
                t3._compressWorker(r2, n2).withStreamInfo("file", { name: e3, dir: i, date: s, comment: t3.comment || "", unixPermissions: t3.unixPermissions, dosPermissions: t3.dosPermissions }).pipe(o);
              }), o.entriesCount = h;
            } catch (e3) {
              o.error(e3);
            }
            return o;
          };
        }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t, r) {
          "use strict";
          function n() {
            if (!(this instanceof n)) return new n();
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
              var e2 = new n();
              for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
              return e2;
            };
          }
          (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.1", n.loadAsync = function(e2, t2) {
            return new n().loadAsync(e2, t2);
          }, n.external = e("./external"), t.exports = n;
        }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t, r) {
          "use strict";
          var u = e("./utils"), i = e("./external"), n = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
          function f(n2) {
            return new i.Promise(function(e2, t2) {
              var r2 = n2.decompressed.getContentWorker().pipe(new a());
              r2.on("error", function(e3) {
                t2(e3);
              }).on("end", function() {
                r2.streamInfo.crc32 !== n2.decompressed.crc32 ? t2(new Error("Corrupted zip : CRC32 mismatch")) : e2();
              }).resume();
            });
          }
          t.exports = function(e2, o) {
            var h = this;
            return o = u.extend(o || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n.utf8decode }), l.isNode && l.isStream(e2) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
              var t2 = new s(o);
              return t2.load(e3), t2;
            }).then(function(e3) {
              var t2 = [i.Promise.resolve(e3)], r2 = e3.files;
              if (o.checkCRC32) for (var n2 = 0; n2 < r2.length; n2++) t2.push(f(r2[n2]));
              return i.Promise.all(t2);
            }).then(function(e3) {
              for (var t2 = e3.shift(), r2 = t2.files, n2 = 0; n2 < r2.length; n2++) {
                var i2 = r2[n2], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
                h.file(a2, i2.decompressed, { binary: true, optimizedBinaryString: true, date: i2.date, dir: i2.dir, comment: i2.fileCommentStr.length ? i2.fileCommentStr : null, unixPermissions: i2.unixPermissions, dosPermissions: i2.dosPermissions, createFolders: o.createFolders }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
              }
              return t2.zipComment.length && (h.comment = t2.zipComment), h;
            });
          };
        }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../stream/GenericWorker");
          function s(e2, t2) {
            i.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
          }
          n.inherits(s, i), s.prototype._bindStream = function(e2) {
            var t2 = this;
            (this._stream = e2).pause(), e2.on("data", function(e3) {
              t2.push({ data: e3, meta: { percent: 0 } });
            }).on("error", function(e3) {
              t2.isPaused ? this.generatedError = e3 : t2.error(e3);
            }).on("end", function() {
              t2.isPaused ? t2._upstreamEnded = true : t2.end();
            });
          }, s.prototype.pause = function() {
            return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
          }, t.exports = s;
        }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t, r) {
          "use strict";
          var i = e("readable-stream").Readable;
          function n(e2, t2, r2) {
            i.call(this, t2), this._helper = e2;
            var n2 = this;
            e2.on("data", function(e3, t3) {
              n2.push(e3) || n2._helper.pause(), r2 && r2(t3);
            }).on("error", function(e3) {
              n2.emit("error", e3);
            }).on("end", function() {
              n2.push(null);
            });
          }
          e("../utils").inherits(n, i), n.prototype._read = function() {
            this._helper.resume();
          }, t.exports = n;
        }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t, r) {
          "use strict";
          t.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t2) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
            if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
            return new Buffer(e2, t2);
          }, allocBuffer: function(e2) {
            if (Buffer.alloc) return Buffer.alloc(e2);
            var t2 = new Buffer(e2);
            return t2.fill(0), t2;
          }, isBuffer: function(e2) {
            return Buffer.isBuffer(e2);
          }, isStream: function(e2) {
            return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
          } };
        }, {}], 15: [function(e, t, r) {
          "use strict";
          function s(e2, t2, r2) {
            var n2, i2 = u.getTypeOf(t2), s2 = u.extend(r2 || {}, f);
            s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g(e2)), s2.createFolders && (n2 = _(e2)) && b.call(this, n2, true);
            var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
            r2 && void 0 !== r2.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i2 = "string");
            var o2 = null;
            o2 = t2 instanceof c || t2 instanceof l ? t2 : p.isNode && p.isStream(t2) ? new m(e2, t2) : u.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
            var h2 = new d(e2, o2, s2);
            this.files[e2] = h2;
          }
          var i = e("./utf8"), u = e("./utils"), l = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e2) {
            "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
            var t2 = e2.lastIndexOf("/");
            return 0 < t2 ? e2.substring(0, t2) : "";
          }, g = function(e2) {
            return "/" !== e2.slice(-1) && (e2 += "/"), e2;
          }, b = function(e2, t2) {
            return t2 = void 0 !== t2 ? t2 : f.createFolders, e2 = g(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t2 }), this.files[e2];
          };
          function h(e2) {
            return "[object RegExp]" === Object.prototype.toString.call(e2);
          }
          var n = { load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, forEach: function(e2) {
            var t2, r2, n2;
            for (t2 in this.files) n2 = this.files[t2], (r2 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r2, n2);
          }, filter: function(r2) {
            var n2 = [];
            return this.forEach(function(e2, t2) {
              r2(e2, t2) && n2.push(t2);
            }), n2;
          }, file: function(e2, t2, r2) {
            if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r2), this;
            if (h(e2)) {
              var n2 = e2;
              return this.filter(function(e3, t3) {
                return !t3.dir && n2.test(e3);
              });
            }
            var i2 = this.files[this.root + e2];
            return i2 && !i2.dir ? i2 : null;
          }, folder: function(r2) {
            if (!r2) return this;
            if (h(r2)) return this.filter(function(e3, t3) {
              return t3.dir && r2.test(e3);
            });
            var e2 = this.root + r2, t2 = b.call(this, e2), n2 = this.clone();
            return n2.root = t2.name, n2;
          }, remove: function(r2) {
            r2 = this.root + r2;
            var e2 = this.files[r2];
            if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
            else for (var t2 = this.filter(function(e3, t3) {
              return t3.name.slice(0, r2.length) === r2;
            }), n2 = 0; n2 < t2.length; n2++) delete this.files[t2[n2].name];
            return this;
          }, generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, generateInternalStream: function(e2) {
            var t2, r2 = {};
            try {
              if ((r2 = u.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
              u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
              var n2 = r2.comment || this.comment || "";
              t2 = o.generateWorker(this, r2, n2);
            } catch (e3) {
              (t2 = new l("error")).error(e3);
            }
            return new a(t2, r2.type || "string", r2.mimeType);
          }, generateAsync: function(e2, t2) {
            return this.generateInternalStream(e2).accumulate(t2);
          }, generateNodeStream: function(e2, t2) {
            return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
          } };
          t.exports = n;
        }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t, r) {
          "use strict";
          t.exports = e("stream");
        }, { stream: void 0 }], 17: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
            for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data[this.zero + e2];
          }, i.prototype.lastIndexOfSignature = function(e2) {
            for (var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r2 && this.data[s + 2] === n2 && this.data[s + 3] === i2) return s - this.zero;
            return -1;
          }, i.prototype.readAndCheckSignature = function(e2) {
            var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.readData(4);
            return t2 === s[0] && r2 === s[1] && n2 === s[2] && i2 === s[3];
          }, i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return [];
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t, r) {
          "use strict";
          var n = e("../utils");
          function i(e2) {
            this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
          }
          i.prototype = { checkOffset: function(e2) {
            this.checkIndex(this.index + e2);
          }, checkIndex: function(e2) {
            if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
          }, setIndex: function(e2) {
            this.checkIndex(e2), this.index = e2;
          }, skip: function(e2) {
            this.setIndex(this.index + e2);
          }, byteAt: function() {
          }, readInt: function(e2) {
            var t2, r2 = 0;
            for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r2 = (r2 << 8) + this.byteAt(t2);
            return this.index += e2, r2;
          }, readString: function(e2) {
            return n.transformTo("string", this.readData(e2));
          }, readData: function() {
          }, lastIndexOfSignature: function() {
          }, readAndCheckSignature: function() {
          }, readDate: function() {
            var e2 = this.readInt(4);
            return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
          } }, t.exports = i;
        }, { "../utils": 32 }], 19: [function(e, t, r) {
          "use strict";
          var n = e("./Uint8ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data.charCodeAt(this.zero + e2);
          }, i.prototype.lastIndexOfSignature = function(e2) {
            return this.data.lastIndexOf(e2) - this.zero;
          }, i.prototype.readAndCheckSignature = function(e2) {
            return e2 === this.readData(4);
          }, i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t, r) {
          "use strict";
          var n = e("./ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
            var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h = e("./Uint8ArrayReader");
          t.exports = function(e2) {
            var t2 = n.getTypeOf(e2);
            return n.checkSupport(t2), "string" !== t2 || i.uint8array ? "nodebuffer" === t2 ? new o(e2) : i.uint8array ? new h(n.transformTo("uint8array", e2)) : new s(n.transformTo("array", e2)) : new a(e2);
          };
        }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t, r) {
          "use strict";
          r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
        }, {}], 24: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../utils");
          function s(e2) {
            n.call(this, "ConvertWorker to " + e2), this.destType = e2;
          }
          i.inherits(s, n), s.prototype.processChunk = function(e2) {
            this.push({ data: i.transformTo(this.destType, e2.data), meta: e2.meta });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../crc32");
          function s() {
            n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }
          e("../utils").inherits(s, n), s.prototype.processChunk = function(e2) {
            this.streamInfo.crc32 = i(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
          }, t.exports = s;
        }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
          }
          n.inherits(s, i), s.prototype.processChunk = function(e2) {
            if (e2) {
              var t2 = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = t2 + e2.data.length;
            }
            i.prototype.processChunk.call(this, e2);
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataWorker");
            var t2 = this;
            this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
              t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
            }, function(e3) {
              t2.error(e3);
            });
          }
          n.inherits(s, i), s.prototype.cleanUp = function() {
            i.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n.delay(this._tickAndRepeat, [], this)), true);
          }, s.prototype._tickAndRepeat = function() {
            this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
          }, s.prototype._tick = function() {
            if (this.isPaused || this.isFinished) return false;
            var e2 = null, t2 = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();
            switch (this.type) {
              case "string":
                e2 = this.data.substring(this.index, t2);
                break;
              case "uint8array":
                e2 = this.data.subarray(this.index, t2);
                break;
              case "array":
              case "nodebuffer":
                e2 = this.data.slice(this.index, t2);
            }
            return this.index = t2, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t, r) {
          "use strict";
          function n(e2) {
            this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
          }
          n.prototype = { push: function(e2) {
            this.emit("data", e2);
          }, end: function() {
            if (this.isFinished) return false;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = true;
            } catch (e2) {
              this.emit("error", e2);
            }
            return true;
          }, error: function(e2) {
            return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
          }, on: function(e2, t2) {
            return this._listeners[e2].push(t2), this;
          }, cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          }, emit: function(e2, t2) {
            if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t2);
          }, pipe: function(e2) {
            return e2.registerPrevious(this);
          }, registerPrevious: function(e2) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
          }, resume: function() {
            if (!this.isPaused || this.isFinished) return false;
            var e2 = this.isPaused = false;
            return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
          }, flush: function() {
          }, processChunk: function(e2) {
            this.push(e2);
          }, withStreamInfo: function(e2, t2) {
            return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
          }, mergeStreamInfo: function() {
            for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
          }, lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = true, this.previous && this.previous.lock();
          }, toString: function() {
            var e2 = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + e2 : e2;
          } }, t.exports = n;
        }, {}], 29: [function(e, t, r) {
          "use strict";
          var h = e("../utils"), i = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n = e("../support"), a = e("../external"), o = null;
          if (n.nodestream) try {
            o = e("../nodejs/NodejsStreamOutputAdapter");
          } catch (e2) {
          }
          function l(e2, o2) {
            return new a.Promise(function(t2, r2) {
              var n2 = [], i2 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
              e2.on("data", function(e3, t3) {
                n2.push(e3), o2 && o2(t3);
              }).on("error", function(e3) {
                n2 = [], r2(e3);
              }).on("end", function() {
                try {
                  var e3 = function(e4, t3, r3) {
                    switch (e4) {
                      case "blob":
                        return h.newBlob(h.transformTo("arraybuffer", t3), r3);
                      case "base64":
                        return u.encode(t3);
                      default:
                        return h.transformTo(e4, t3);
                    }
                  }(s2, function(e4, t3) {
                    var r3, n3 = 0, i3 = null, s3 = 0;
                    for (r3 = 0; r3 < t3.length; r3++) s3 += t3[r3].length;
                    switch (e4) {
                      case "string":
                        return t3.join("");
                      case "array":
                        return Array.prototype.concat.apply([], t3);
                      case "uint8array":
                        for (i3 = new Uint8Array(s3), r3 = 0; r3 < t3.length; r3++) i3.set(t3[r3], n3), n3 += t3[r3].length;
                        return i3;
                      case "nodebuffer":
                        return Buffer.concat(t3);
                      default:
                        throw new Error("concat : unsupported type '" + e4 + "'");
                    }
                  }(i2, n2), a2);
                  t2(e3);
                } catch (e4) {
                  r2(e4);
                }
                n2 = [];
              }).resume();
            });
          }
          function f(e2, t2, r2) {
            var n2 = t2;
            switch (t2) {
              case "blob":
              case "arraybuffer":
                n2 = "uint8array";
                break;
              case "base64":
                n2 = "string";
            }
            try {
              this._internalType = n2, this._outputType = t2, this._mimeType = r2, h.checkSupport(n2), this._worker = e2.pipe(new i(n2)), e2.lock();
            } catch (e3) {
              this._worker = new s("error"), this._worker.error(e3);
            }
          }
          f.prototype = { accumulate: function(e2) {
            return l(this, e2);
          }, on: function(e2, t2) {
            var r2 = this;
            return "data" === e2 ? this._worker.on(e2, function(e3) {
              t2.call(r2, e3.data, e3.meta);
            }) : this._worker.on(e2, function() {
              h.delay(t2, arguments, r2);
            }), this;
          }, resume: function() {
            return h.delay(this._worker.resume, [], this._worker), this;
          }, pause: function() {
            return this._worker.pause(), this;
          }, toNodejsStream: function(e2) {
            if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
            return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
          } }, t.exports = f;
        }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t, r) {
          "use strict";
          if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
          else {
            var n = new ArrayBuffer(0);
            try {
              r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
            } catch (e2) {
              try {
                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
              } catch (e3) {
                r.blob = false;
              }
            }
          }
          try {
            r.nodestream = !!e("readable-stream").Readable;
          } catch (e2) {
            r.nodestream = false;
          }
        }, { "readable-stream": 16 }], 31: [function(e, t, s) {
          "use strict";
          for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
          u[254] = u[254] = 1;
          function a() {
            n.call(this, "utf-8 decode"), this.leftOver = null;
          }
          function l() {
            n.call(this, "utf-8 encode");
          }
          s.utf8encode = function(e2) {
            return h.nodebuffer ? r.newBufferFrom(e2, "utf-8") : function(e3) {
              var t2, r2, n2, i2, s2, a2 = e3.length, o2 = 0;
              for (i2 = 0; i2 < a2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
              for (t2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), i2 = s2 = 0; s2 < o2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
              return t2;
            }(e2);
          }, s.utf8decode = function(e2) {
            return h.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : function(e3) {
              var t2, r2, n2, i2, s2 = e3.length, a2 = new Array(2 * s2);
              for (t2 = r2 = 0; t2 < s2; ) if ((n2 = e3[t2++]) < 128) a2[r2++] = n2;
              else if (4 < (i2 = u[n2])) a2[r2++] = 65533, t2 += i2 - 1;
              else {
                for (n2 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t2 < s2; ) n2 = n2 << 6 | 63 & e3[t2++], i2--;
                1 < i2 ? a2[r2++] = 65533 : n2 < 65536 ? a2[r2++] = n2 : (n2 -= 65536, a2[r2++] = 55296 | n2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n2);
              }
              return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
            }(e2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2));
          }, o.inherits(a, n), a.prototype.processChunk = function(e2) {
            var t2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2.data);
            if (this.leftOver && this.leftOver.length) {
              if (h.uint8array) {
                var r2 = t2;
                (t2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r2, this.leftOver.length);
              } else t2 = this.leftOver.concat(t2);
              this.leftOver = null;
            }
            var n2 = function(e3, t3) {
              var r3;
              for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r3 = t3 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
              return r3 < 0 ? t3 : 0 === r3 ? t3 : r3 + u[e3[r3]] > t3 ? r3 : t3;
            }(t2), i2 = t2;
            n2 !== t2.length && (h.uint8array ? (i2 = t2.subarray(0, n2), this.leftOver = t2.subarray(n2, t2.length)) : (i2 = t2.slice(0, n2), this.leftOver = t2.slice(n2, t2.length))), this.push({ data: s.utf8decode(i2), meta: e2.meta });
          }, a.prototype.flush = function() {
            this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
          }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function(e2) {
            this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
          }, s.Utf8EncodeWorker = l;
        }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t, a) {
          "use strict";
          var o = e("./support"), h = e("./base64"), r = e("./nodejsUtils"), u = e("./external");
          function n(e2) {
            return e2;
          }
          function l(e2, t2) {
            for (var r2 = 0; r2 < e2.length; ++r2) t2[r2] = 255 & e2.charCodeAt(r2);
            return t2;
          }
          e("setimmediate"), a.newBlob = function(t2, r2) {
            a.checkSupport("blob");
            try {
              return new Blob([t2], { type: r2 });
            } catch (e2) {
              try {
                var n2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return n2.append(t2), n2.getBlob(r2);
              } catch (e3) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          var i = { stringifyByChunk: function(e2, t2, r2) {
            var n2 = [], i2 = 0, s2 = e2.length;
            if (s2 <= r2) return String.fromCharCode.apply(null, e2);
            for (; i2 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n2.push(String.fromCharCode.apply(null, e2.slice(i2, Math.min(i2 + r2, s2)))) : n2.push(String.fromCharCode.apply(null, e2.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
            return n2.join("");
          }, stringifyByChar: function(e2) {
            for (var t2 = "", r2 = 0; r2 < e2.length; r2++) t2 += String.fromCharCode(e2[r2]);
            return t2;
          }, applyCanBeUsed: { uint8array: function() {
            try {
              return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
            } catch (e2) {
              return false;
            }
          }(), nodebuffer: function() {
            try {
              return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
            } catch (e2) {
              return false;
            }
          }() } };
          function s(e2) {
            var t2 = 65536, r2 = a.getTypeOf(e2), n2 = true;
            if ("uint8array" === r2 ? n2 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n2 = i.applyCanBeUsed.nodebuffer), n2) for (; 1 < t2; ) try {
              return i.stringifyByChunk(e2, r2, t2);
            } catch (e3) {
              t2 = Math.floor(t2 / 2);
            }
            return i.stringifyByChar(e2);
          }
          function f(e2, t2) {
            for (var r2 = 0; r2 < e2.length; r2++) t2[r2] = e2[r2];
            return t2;
          }
          a.applyFromCharCode = s;
          var c = {};
          c.string = { string: n, array: function(e2) {
            return l(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.string.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return l(e2, new Uint8Array(e2.length));
          }, nodebuffer: function(e2) {
            return l(e2, r.allocBuffer(e2.length));
          } }, c.array = { string: s, array: n, arraybuffer: function(e2) {
            return new Uint8Array(e2).buffer;
          }, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.arraybuffer = { string: function(e2) {
            return s(new Uint8Array(e2));
          }, array: function(e2) {
            return f(new Uint8Array(e2), new Array(e2.byteLength));
          }, arraybuffer: n, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(new Uint8Array(e2));
          } }, c.uint8array = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return e2.buffer;
          }, uint8array: n, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.nodebuffer = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.nodebuffer.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return f(e2, new Uint8Array(e2.length));
          }, nodebuffer: n }, a.transformTo = function(e2, t2) {
            if (t2 = t2 || "", !e2) return t2;
            a.checkSupport(e2);
            var r2 = a.getTypeOf(t2);
            return c[r2][e2](t2);
          }, a.resolve = function(e2) {
            for (var t2 = e2.split("/"), r2 = [], n2 = 0; n2 < t2.length; n2++) {
              var i2 = t2[n2];
              "." === i2 || "" === i2 && 0 !== n2 && n2 !== t2.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
            }
            return r2.join("/");
          }, a.getTypeOf = function(e2) {
            return "string" == typeof e2 ? "string" : "[object Array]" === Object.prototype.toString.call(e2) ? "array" : o.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o.uint8array && e2 instanceof Uint8Array ? "uint8array" : o.arraybuffer && e2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
          }, a.checkSupport = function(e2) {
            if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
            var t2, r2, n2 = "";
            for (r2 = 0; r2 < (e2 || "").length; r2++) n2 += "\\x" + ((t2 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
            return n2;
          }, a.delay = function(e2, t2, r2) {
            setImmediate(function() {
              e2.apply(r2 || null, t2 || []);
            });
          }, a.inherits = function(e2, t2) {
            function r2() {
            }
            r2.prototype = t2.prototype, e2.prototype = new r2();
          }, a.extend = function() {
            var e2, t2, r2 = {};
            for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r2[t2] && (r2[t2] = arguments[e2][t2]);
            return r2;
          }, a.prepareContent = function(r2, e2, n2, i2, s2) {
            return u.Promise.resolve(e2).then(function(n3) {
              return o.blob && (n3 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n3))) && "undefined" != typeof FileReader ? new u.Promise(function(t2, r3) {
                var e3 = new FileReader();
                e3.onload = function(e4) {
                  t2(e4.target.result);
                }, e3.onerror = function(e4) {
                  r3(e4.target.error);
                }, e3.readAsArrayBuffer(n3);
              }) : n3;
            }).then(function(e3) {
              var t2 = a.getTypeOf(e3);
              return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h.decode(e3) : n2 && true !== i2 && (e3 = function(e4) {
                return l(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
              }(e3))), e3) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), i = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
          function h(e2) {
            this.files = [], this.loadOptions = e2;
          }
          h.prototype = { checkSignature: function(e2) {
            if (!this.reader.readAndCheckSignature(e2)) {
              this.reader.index -= 4;
              var t2 = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t2) + ", expected " + i.pretty(e2) + ")");
            }
          }, isSignature: function(e2, t2) {
            var r2 = this.reader.index;
            this.reader.setIndex(e2);
            var n2 = this.reader.readString(4) === t2;
            return this.reader.setIndex(r2), n2;
          }, readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var e2 = this.reader.readData(this.zipCommentLength), t2 = o.uint8array ? "uint8array" : "array", r2 = i.transformTo(t2, e2);
            this.zipComment = this.loadOptions.decodeFileName(r2);
          }, readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var e2, t2, r2, n2 = this.zip64EndOfCentralSize - 44; 0 < n2; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r2 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = { id: e2, length: t2, value: r2 };
          }, readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          }, readLocalFiles: function() {
            var e2, t2;
            for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
          }, readCentralDir: function() {
            var e2;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          }, readEndOfCentral: function() {
            var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
            this.reader.setIndex(e2);
            var t2 = e2;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
              if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var r2 = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
            var n2 = t2 - r2;
            if (0 < n2) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n2);
            else if (n2 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n2) + " bytes.");
          }, prepareReader: function(e2) {
            this.reader = n(e2);
          }, load: function(e2) {
            this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          } }, t.exports = h;
        }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), s = e("./utils"), i = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h = e("./compressions"), u = e("./support");
          function l(e2, t2) {
            this.options = e2, this.loadOptions = t2;
          }
          l.prototype = { isEncrypted: function() {
            return 1 == (1 & this.bitFlag);
          }, useUTF8: function() {
            return 2048 == (2048 & this.bitFlag);
          }, readLocalPart: function(e2) {
            var t2, r2;
            if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if (null === (t2 = function(e3) {
              for (var t3 in h) if (Object.prototype.hasOwnProperty.call(h, t3) && h[t3].magic === e3) return h[t3];
              return null;
            }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
          }, readCentralPart: function(e2) {
            this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
            var t2 = e2.readInt(2);
            if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
          }, processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var e2 = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
          }, parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var e2 = n(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
            }
          }, readExtraFields: function(e2) {
            var t2, r2, n2, i2 = e2.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i2; ) t2 = e2.readInt(2), r2 = e2.readInt(2), n2 = e2.readData(r2), this.extraFields[t2] = { id: t2, length: r2, value: n2 };
            e2.setIndex(i2);
          }, handleUTF8: function() {
            var e2 = u.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
            else {
              var t2 = this.findExtraFieldUnicodePath();
              if (null !== t2) this.fileNameStr = t2;
              else {
                var r2 = s.transformTo(e2, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(r2);
              }
              var n2 = this.findExtraFieldUnicodeComment();
              if (null !== n2) this.fileCommentStr = n2;
              else {
                var i2 = s.transformTo(e2, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(i2);
              }
            }
          }, findExtraFieldUnicodePath: function() {
            var e2 = this.extraFields[28789];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          }, findExtraFieldUnicodeComment: function() {
            var e2 = this.extraFields[25461];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          } }, t.exports = l;
        }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t, r) {
          "use strict";
          function n(e2, t2, r2) {
            this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
          }
          var s = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h = e("./stream/GenericWorker");
          n.prototype = { internalStream: function(e2) {
            var t2 = null, r2 = "string";
            try {
              if (!e2) throw new Error("No output type specified.");
              var n2 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
              "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t2 = this._decompressWorker();
              var i2 = !this._dataBinary;
              i2 && !n2 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i2 && n2 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
            } catch (e3) {
              (t2 = new h("error")).error(e3);
            }
            return new s(t2, r2, "");
          }, async: function(e2, t2) {
            return this.internalStream(e2).accumulate(t2);
          }, nodeStream: function(e2, t2) {
            return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
          }, _compressWorker: function(e2, t2) {
            if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
            var r2 = this._decompressWorker();
            return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, e2, t2);
          }, _decompressWorker: function() {
            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
          } };
          for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
          t.exports = n;
        }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l, t) {
          (function(t2) {
            "use strict";
            var r, n, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
            if (e2) {
              var i = 0, s = new e2(u), a = t2.document.createTextNode("");
              s.observe(a, { characterData: true }), r = function() {
                a.data = i = ++i % 2;
              };
            } else if (t2.setImmediate || void 0 === t2.MessageChannel) r = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
              var e3 = t2.document.createElement("script");
              e3.onreadystatechange = function() {
                u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
              }, t2.document.documentElement.appendChild(e3);
            } : function() {
              setTimeout(u, 0);
            };
            else {
              var o = new t2.MessageChannel();
              o.port1.onmessage = u, r = function() {
                o.port2.postMessage(0);
              };
            }
            var h = [];
            function u() {
              var e3, t3;
              n = true;
              for (var r2 = h.length; r2; ) {
                for (t3 = h, h = [], e3 = -1; ++e3 < r2; ) t3[e3]();
                r2 = h.length;
              }
              n = false;
            }
            l.exports = function(e3) {
              1 !== h.push(e3) || n || r();
            };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}], 37: [function(e, t, r) {
          "use strict";
          var i = e("immediate");
          function u() {
          }
          var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n = ["PENDING"];
          function o(e2) {
            if ("function" != typeof e2) throw new TypeError("resolver must be a function");
            this.state = n, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
          }
          function h(e2, t2, r2) {
            this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
          }
          function f(t2, r2, n2) {
            i(function() {
              var e2;
              try {
                e2 = r2(n2);
              } catch (e3) {
                return l.reject(t2, e3);
              }
              e2 === t2 ? l.reject(t2, new TypeError("Cannot resolve promise with itself")) : l.resolve(t2, e2);
            });
          }
          function c(e2) {
            var t2 = e2 && e2.then;
            if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
              t2.apply(e2, arguments);
            };
          }
          function d(t2, e2) {
            var r2 = false;
            function n2(e3) {
              r2 || (r2 = true, l.reject(t2, e3));
            }
            function i2(e3) {
              r2 || (r2 = true, l.resolve(t2, e3));
            }
            var s2 = p(function() {
              e2(i2, n2);
            });
            "error" === s2.status && n2(s2.value);
          }
          function p(e2, t2) {
            var r2 = {};
            try {
              r2.value = e2(t2), r2.status = "success";
            } catch (e3) {
              r2.status = "error", r2.value = e3;
            }
            return r2;
          }
          (t.exports = o).prototype.finally = function(t2) {
            if ("function" != typeof t2) return this;
            var r2 = this.constructor;
            return this.then(function(e2) {
              return r2.resolve(t2()).then(function() {
                return e2;
              });
            }, function(e2) {
              return r2.resolve(t2()).then(function() {
                throw e2;
              });
            });
          }, o.prototype.catch = function(e2) {
            return this.then(null, e2);
          }, o.prototype.then = function(e2, t2) {
            if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
            var r2 = new this.constructor(u);
            this.state !== n ? f(r2, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h(r2, e2, t2));
            return r2;
          }, h.prototype.callFulfilled = function(e2) {
            l.resolve(this.promise, e2);
          }, h.prototype.otherCallFulfilled = function(e2) {
            f(this.promise, this.onFulfilled, e2);
          }, h.prototype.callRejected = function(e2) {
            l.reject(this.promise, e2);
          }, h.prototype.otherCallRejected = function(e2) {
            f(this.promise, this.onRejected, e2);
          }, l.resolve = function(e2, t2) {
            var r2 = p(c, t2);
            if ("error" === r2.status) return l.reject(e2, r2.value);
            var n2 = r2.value;
            if (n2) d(e2, n2);
            else {
              e2.state = a, e2.outcome = t2;
              for (var i2 = -1, s2 = e2.queue.length; ++i2 < s2; ) e2.queue[i2].callFulfilled(t2);
            }
            return e2;
          }, l.reject = function(e2, t2) {
            e2.state = s, e2.outcome = t2;
            for (var r2 = -1, n2 = e2.queue.length; ++r2 < n2; ) e2.queue[r2].callRejected(t2);
            return e2;
          }, o.resolve = function(e2) {
            if (e2 instanceof this) return e2;
            return l.resolve(new this(u), e2);
          }, o.reject = function(e2) {
            var t2 = new this(u);
            return l.reject(t2, e2);
          }, o.all = function(e2) {
            var r2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var n2 = e2.length, i2 = false;
            if (!n2) return this.resolve([]);
            var s2 = new Array(n2), a2 = 0, t2 = -1, o2 = new this(u);
            for (; ++t2 < n2; ) h2(e2[t2], t2);
            return o2;
            function h2(e3, t3) {
              r2.resolve(e3).then(function(e4) {
                s2[t3] = e4, ++a2 !== n2 || i2 || (i2 = true, l.resolve(o2, s2));
              }, function(e4) {
                i2 || (i2 = true, l.reject(o2, e4));
              });
            }
          }, o.race = function(e2) {
            var t2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var r2 = e2.length, n2 = false;
            if (!r2) return this.resolve([]);
            var i2 = -1, s2 = new this(u);
            for (; ++i2 < r2; ) a2 = e2[i2], t2.resolve(a2).then(function(e3) {
              n2 || (n2 = true, l.resolve(s2, e3));
            }, function(e3) {
              n2 || (n2 = true, l.reject(s2, e3));
            });
            var a2;
            return s2;
          };
        }, { immediate: 36 }], 38: [function(e, t, r) {
          "use strict";
          var n = {};
          (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
        }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t, r) {
          "use strict";
          var a = e("./zlib/deflate"), o = e("./utils/common"), h = e("./utils/strings"), i = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, c = 0, d = 8;
          function p(e2) {
            if (!(this instanceof p)) return new p(e2);
            this.options = o.assign({ level: f, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
            var r2 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
            if (r2 !== l) throw new Error(i[r2]);
            if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
              var n2;
              if (n2 = "string" == typeof t2.dictionary ? h.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r2 = a.deflateSetDictionary(this.strm, n2)) !== l) throw new Error(i[r2]);
              this._dict_set = true;
            }
          }
          function n(e2, t2) {
            var r2 = new p(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || i[r2.err];
            return r2.result;
          }
          p.prototype.push = function(e2, t2) {
            var r2, n2, i2 = this.strm, s2 = this.options.chunkSize;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i2.input = h.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length;
            do {
              if (0 === i2.avail_out && (i2.output = new o.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n2)) && r2 !== l) return this.onEnd(r2), !(this.ended = true);
              0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n2 && 2 !== n2) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i2.output, i2.next_out))) : this.onData(o.shrinkBuf(i2.output, i2.next_out)));
            } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
            return 4 === n2 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n2 || (this.onEnd(l), !(i2.avail_out = 0));
          }, p.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, p.prototype.onEnd = function(e2) {
            e2 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Deflate = p, r.deflate = n, r.deflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, n(e2, t2);
          }, r.gzip = function(e2, t2) {
            return (t2 = t2 || {}).gzip = true, n(e2, t2);
          };
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t, r) {
          "use strict";
          var c = e("./zlib/inflate"), d = e("./utils/common"), p = e("./utils/strings"), m = e("./zlib/constants"), n = e("./zlib/messages"), i = e("./zlib/zstream"), s = e("./zlib/gzheader"), _ = Object.prototype.toString;
          function a(e2) {
            if (!(this instanceof a)) return new a(e2);
            this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
            var r2 = c.inflateInit2(this.strm, t2.windowBits);
            if (r2 !== m.Z_OK) throw new Error(n[r2]);
            this.header = new s(), c.inflateGetHeader(this.strm, this.header);
          }
          function o(e2, t2) {
            var r2 = new a(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || n[r2.err];
            return r2.result;
          }
          a.prototype.push = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h.input = p.binstring2buf(e2) : "[object ArrayBuffer]" === _.call(e2) ? h.input = new Uint8Array(e2) : h.input = e2, h.next_in = 0, h.avail_in = h.input.length;
            do {
              if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && true === f && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK) return this.onEnd(r2), !(this.ended = true);
              h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n2 !== m.Z_FINISH && n2 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = true);
            } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
            return r2 === m.Z_STREAM_END && (n2 = m.Z_FINISH), n2 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
          }, a.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, a.prototype.onEnd = function(e2) {
            e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, o(e2, t2);
          }, r.ungzip = o;
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
          r.assign = function(e2) {
            for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
              var r2 = t2.shift();
              if (r2) {
                if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
                for (var n2 in r2) r2.hasOwnProperty(n2) && (e2[n2] = r2[n2]);
              }
            }
            return e2;
          }, r.shrinkBuf = function(e2, t2) {
            return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
          };
          var i = { arraySet: function(e2, t2, r2, n2, i2) {
            if (t2.subarray && e2.subarray) e2.set(t2.subarray(r2, r2 + n2), i2);
            else for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            var t2, r2, n2, i2, s2, a;
            for (t2 = n2 = 0, r2 = e2.length; t2 < r2; t2++) n2 += e2[t2].length;
            for (a = new Uint8Array(n2), t2 = i2 = 0, r2 = e2.length; t2 < r2; t2++) s2 = e2[t2], a.set(s2, i2), i2 += s2.length;
            return a;
          } }, s = { arraySet: function(e2, t2, r2, n2, i2) {
            for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            return [].concat.apply([], e2);
          } };
          r.setTyped = function(e2) {
            e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
          }, r.setTyped(n);
        }, {}], 42: [function(e, t, r) {
          "use strict";
          var h = e("./common"), i = true, s = true;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (e2) {
            i = false;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (e2) {
            s = false;
          }
          for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
          function l(e2, t2) {
            if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e2, t2));
            for (var r2 = "", n2 = 0; n2 < t2; n2++) r2 += String.fromCharCode(e2[n2]);
            return r2;
          }
          u[254] = u[254] = 1, r.string2buf = function(e2) {
            var t2, r2, n2, i2, s2, a = e2.length, o = 0;
            for (i2 = 0; i2 < a; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t2 = new h.Buf8(o), i2 = s2 = 0; s2 < o; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
            return t2;
          }, r.buf2binstring = function(e2) {
            return l(e2, e2.length);
          }, r.binstring2buf = function(e2) {
            for (var t2 = new h.Buf8(e2.length), r2 = 0, n2 = t2.length; r2 < n2; r2++) t2[r2] = e2.charCodeAt(r2);
            return t2;
          }, r.buf2string = function(e2, t2) {
            var r2, n2, i2, s2, a = t2 || e2.length, o = new Array(2 * a);
            for (r2 = n2 = 0; r2 < a; ) if ((i2 = e2[r2++]) < 128) o[n2++] = i2;
            else if (4 < (s2 = u[i2])) o[n2++] = 65533, r2 += s2 - 1;
            else {
              for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i2 = i2 << 6 | 63 & e2[r2++], s2--;
              1 < s2 ? o[n2++] = 65533 : i2 < 65536 ? o[n2++] = i2 : (i2 -= 65536, o[n2++] = 55296 | i2 >> 10 & 1023, o[n2++] = 56320 | 1023 & i2);
            }
            return l(o, n2);
          }, r.utf8border = function(e2, t2) {
            var r2;
            for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r2 = t2 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
            return r2 < 0 ? t2 : 0 === r2 ? t2 : r2 + u[e2[r2]] > t2 ? r2 : t2;
          };
        }, { "./common": 41 }], 43: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2, r2, n) {
            for (var i = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
              for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t2[n++] | 0) | 0, --a; ) ;
              i %= 65521, s %= 65521;
            }
            return i | s << 16 | 0;
          };
        }, {}], 44: [function(e, t, r) {
          "use strict";
          t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
        }, {}], 45: [function(e, t, r) {
          "use strict";
          var o = function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n = 0; n < 8; n++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          }();
          t.exports = function(e2, t2, r2, n) {
            var i = o, s = n + r2;
            e2 ^= -1;
            for (var a = n; a < s; a++) e2 = e2 >>> 8 ^ i[255 & (e2 ^ t2[a])];
            return -1 ^ e2;
          };
        }, {}], 46: [function(e, t, r) {
          "use strict";
          var h, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p = e("./crc32"), n = e("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
          function R(e2, t2) {
            return e2.msg = n[t2], t2;
          }
          function T(e2) {
            return (e2 << 1) - (4 < e2 ? 9 : 0);
          }
          function D(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          function F(e2) {
            var t2 = e2.state, r2 = t2.pending;
            r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r2, e2.next_out), e2.next_out += r2, t2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t2.pending -= r2, 0 === t2.pending && (t2.pending_out = 0));
          }
          function N(e2, t2) {
            u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F(e2.strm);
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = t2;
          }
          function P(e2, t2) {
            e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
          }
          function L(e2, t2) {
            var r2, n2, i2 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h2 = e2.strstart > e2.w_size - z ? e2.strstart - (e2.w_size - z) : 0, u2 = e2.window, l2 = e2.w_mask, f2 = e2.prev, c2 = e2.strstart + S, d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
            e2.prev_length >= e2.good_match && (i2 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
            do {
              if (u2[(r2 = t2) + a2] === p2 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
                s2 += 2, r2++;
                do {
                } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
                if (n2 = S - (c2 - s2), s2 = c2 - S, a2 < n2) {
                  if (e2.match_start = t2, o2 <= (a2 = n2)) break;
                  d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
                }
              }
            } while ((t2 = f2[t2 & l2]) > h2 && 0 != --i2);
            return a2 <= e2.lookahead ? a2 : e2.lookahead;
          }
          function j(e2) {
            var t2, r2, n2, i2, s2, a2, o2, h2, u2, l2, f2 = e2.w_size;
            do {
              if (i2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f2 + (f2 - z)) {
                for (c.arraySet(e2.window, e2.window, f2, f2, 0), e2.match_start -= f2, e2.strstart -= f2, e2.block_start -= f2, t2 = r2 = e2.hash_size; n2 = e2.head[--t2], e2.head[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                for (t2 = r2 = f2; n2 = e2.prev[--t2], e2.prev[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                i2 += f2;
              }
              if (0 === e2.strm.avail_in) break;
              if (a2 = e2.strm, o2 = e2.window, h2 = e2.strstart + e2.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o2, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l2, h2) : 2 === a2.state.wrap && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e2.lookahead += r2, e2.lookahead + e2.insert >= x) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x)); ) ;
            } while (e2.lookahead < z && 0 !== e2.strm.avail_in);
          }
          function Z(e2, t2) {
            for (var r2, n2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2)), e2.match_length >= x) if (n2 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x) {
                for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
                e2.strstart++;
              } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
              else n2 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
              if (n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function W(e2, t2) {
            for (var r2, n2, i2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x - 1)), e2.prev_length >= x && e2.match_length <= e2.prev_length) {
                for (i2 = e2.strstart + e2.lookahead - x, n2 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
                if (e2.match_available = 0, e2.match_length = x - 1, e2.strstart++, n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
              } else if (e2.match_available) {
                if ((n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A;
              } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
            }
            return e2.match_available && (n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function M(e2, t2, r2, n2, i2) {
            this.good_length = e2, this.max_lazy = t2, this.nice_length = r2, this.max_chain = n2, this.func = i2;
          }
          function H() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }
          function G(e2) {
            var t2;
            return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C : E, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l, u._tr_init(t2), m) : R(e2, _);
          }
          function K(e2) {
            var t2 = G(e2);
            return t2 === m && function(e3) {
              e3.window_size = 2 * e3.w_size, D(e3.head), e3.max_lazy_match = h[e3.level].max_lazy, e3.good_match = h[e3.level].good_length, e3.nice_match = h[e3.level].nice_length, e3.max_chain_length = h[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x - 1, e3.match_available = 0, e3.ins_h = 0;
            }(e2.state), t2;
          }
          function Y(e2, t2, r2, n2, i2, s2) {
            if (!e2) return _;
            var a2 = 1;
            if (t2 === g && (t2 = 6), n2 < 0 ? (a2 = 0, n2 = -n2) : 15 < n2 && (a2 = 2, n2 -= 16), i2 < 1 || y < i2 || r2 !== v || n2 < 8 || 15 < n2 || t2 < 0 || 9 < t2 || s2 < 0 || b < s2) return R(e2, _);
            8 === n2 && (n2 = 9);
            var o2 = new H();
            return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t2, o2.strategy = s2, o2.method = r2, K(e2);
          }
          h = [new M(0, 0, 0, 0, function(e2, t2) {
            var r2 = 65535;
            for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
              if (e2.lookahead <= 1) {
                if (j(e2), 0 === e2.lookahead && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              e2.strstart += e2.lookahead, e2.lookahead = 0;
              var n2 = e2.block_start + r2;
              if ((0 === e2.strstart || e2.strstart >= n2) && (e2.lookahead = e2.strstart - n2, e2.strstart = n2, N(e2, false), 0 === e2.strm.avail_out)) return A;
              if (e2.strstart - e2.block_start >= e2.w_size - z && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = 0, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : (e2.strstart > e2.block_start && (N(e2, false), e2.strm.avail_out), A);
          }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(e2, t2) {
            return Y(e2, t2, v, 15, 8, 0);
          }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e2, t2) {
            return e2 && e2.state ? 2 !== e2.state.wrap ? _ : (e2.state.gzhead = t2, m) : _;
          }, r.deflate = function(e2, t2) {
            var r2, n2, i2, s2;
            if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R(e2, _) : _;
            if (n2 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n2.status && t2 !== f) return R(e2, 0 === e2.avail_out ? -5 : _);
            if (n2.strm = e2, r2 = n2.last_flush, n2.last_flush = t2, n2.status === C) if (2 === n2.wrap) e2.adler = 0, U(n2, 31), U(n2, 139), U(n2, 8), n2.gzhead ? (U(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), U(n2, 255 & n2.gzhead.time), U(n2, n2.gzhead.time >> 8 & 255), U(n2, n2.gzhead.time >> 16 & 255), U(n2, n2.gzhead.time >> 24 & 255), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (U(n2, 255 & n2.gzhead.extra.length), U(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 3), n2.status = E);
            else {
              var a2 = v + (n2.w_bits - 8 << 4) << 8;
              a2 |= (2 <= n2.strategy || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n2.status = E, P(n2, a2), 0 !== n2.strstart && (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), e2.adler = 1;
            }
            if (69 === n2.status) if (n2.gzhead.extra) {
              for (i2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) U(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
            } else n2.status = 73;
            if (73 === n2.status) if (n2.gzhead.name) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.gzindex = 0, n2.status = 91);
            } else n2.status = 91;
            if (91 === n2.status) if (n2.gzhead.comment) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.status = 103);
            } else n2.status = 103;
            if (103 === n2.status && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && F(e2), n2.pending + 2 <= n2.pending_buf_size && (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), e2.adler = 0, n2.status = E)) : n2.status = E), 0 !== n2.pending) {
              if (F(e2), 0 === e2.avail_out) return n2.last_flush = -1, m;
            } else if (0 === e2.avail_in && T(t2) <= T(r2) && t2 !== f) return R(e2, -5);
            if (666 === n2.status && 0 !== e2.avail_in) return R(e2, -5);
            if (0 !== e2.avail_in || 0 !== n2.lookahead || t2 !== l && 666 !== n2.status) {
              var o2 = 2 === n2.strategy ? function(e3, t3) {
                for (var r3; ; ) {
                  if (0 === e3.lookahead && (j(e3), 0 === e3.lookahead)) {
                    if (t3 === l) return A;
                    break;
                  }
                  if (e3.match_length = 0, r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              }(n2, t2) : 3 === n2.strategy ? function(e3, t3) {
                for (var r3, n3, i3, s3, a3 = e3.window; ; ) {
                  if (e3.lookahead <= S) {
                    if (j(e3), e3.lookahead <= S && t3 === l) return A;
                    if (0 === e3.lookahead) break;
                  }
                  if (e3.match_length = 0, e3.lookahead >= x && 0 < e3.strstart && (n3 = a3[i3 = e3.strstart - 1]) === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3]) {
                    s3 = e3.strstart + S;
                    do {
                    } while (n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && i3 < s3);
                    e3.match_length = S - (s3 - i3), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                  }
                  if (e3.match_length >= x ? (r3 = u._tr_tally(e3, 1, e3.match_length - x), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              }(n2, t2) : h[n2.level].func(n2, t2);
              if (o2 !== O && o2 !== B || (n2.status = 666), o2 === A || o2 === O) return 0 === e2.avail_out && (n2.last_flush = -1), m;
              if (o2 === I && (1 === t2 ? u._tr_align(n2) : 5 !== t2 && (u._tr_stored_block(n2, 0, 0, false), 3 === t2 && (D(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), F(e2), 0 === e2.avail_out)) return n2.last_flush = -1, m;
            }
            return t2 !== f ? m : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), U(n2, e2.adler >> 16 & 255), U(n2, e2.adler >> 24 & 255), U(n2, 255 & e2.total_in), U(n2, e2.total_in >> 8 & 255), U(n2, e2.total_in >> 16 & 255), U(n2, e2.total_in >> 24 & 255)) : (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), F(e2), 0 < n2.wrap && (n2.wrap = -n2.wrap), 0 !== n2.pending ? m : 1);
          }, r.deflateEnd = function(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state.status) !== C && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E && 666 !== t2 ? R(e2, _) : (e2.state = null, t2 === E ? R(e2, -3) : m) : _;
          }, r.deflateSetDictionary = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2 = t2.length;
            if (!e2 || !e2.state) return _;
            if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead) return _;
            for (1 === s2 && (e2.adler = d(e2.adler, t2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t2, l2 - r2.w_size, r2.w_size, 0), t2 = u2, l2 = r2.w_size), a2 = e2.avail_in, o2 = e2.next_in, h2 = e2.input, e2.avail_in = l2, e2.next_in = 0, e2.input = t2, j(r2); r2.lookahead >= x; ) {
              for (n2 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n2 + x - 1]) & r2.hash_mask, r2.prev[n2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n2, n2++, --i2; ) ;
              r2.strstart = n2, r2.lookahead = x - 1, j(r2);
            }
            return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e2.next_in = o2, e2.input = h2, e2.avail_in = a2, r2.wrap = s2, m;
          }, r.deflateInfo = "pako deflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
          };
        }, {}], 48: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2) {
            var r2, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
            r2 = e2.state, n = e2.next_in, z = e2.input, i = n + (e2.avail_in - 5), s = e2.next_out, C = e2.output, a = s - (t2 - e2.avail_out), o = s + (e2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, c = r2.window, d = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
            e: do {
              p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
              t: for (; ; ) {
                if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;
                else {
                  if (!(16 & y)) {
                    if (0 == (64 & y)) {
                      v = m[(65535 & v) + (d & (1 << y) - 1)];
                      continue t;
                    }
                    if (32 & y) {
                      r2.mode = 12;
                      break e;
                    }
                    e2.msg = "invalid literal/length code", r2.mode = 30;
                    break e;
                  }
                  w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
                  r: for (; ; ) {
                    if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                      if (0 == (64 & y)) {
                        v = _[(65535 & v) + (d & (1 << y) - 1)];
                        continue r;
                      }
                      e2.msg = "invalid distance code", r2.mode = 30;
                      break e;
                    }
                    if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (d >>>= y, p -= y, (y = s - a) < k) {
                      if (l < (y = k - y) && r2.sane) {
                        e2.msg = "invalid distance too far back", r2.mode = 30;
                        break e;
                      }
                      if (S = c, (x = 0) === f) {
                        if (x += u - y, y < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          x = s - k, S = C;
                        }
                      } else if (f < y) {
                        if (x += u + f - y, (y -= f) < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          if (x = 0, f < w) {
                            for (w -= y = f; C[s++] = c[x++], --y; ) ;
                            x = s - k, S = C;
                          }
                        }
                      } else if (x += f - y, y < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        x = s - k, S = C;
                      }
                      for (; 2 < w; ) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                      w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                    } else {
                      for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); ) ;
                      w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                    }
                    break;
                  }
                }
                break;
              }
            } while (n < i && s < o);
            n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e2.next_in = n, e2.next_out = s, e2.avail_in = n < i ? i - n + 5 : 5 - (n - i), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = d, r2.bits = p;
          };
        }, {}], 49: [function(e, t, r) {
          "use strict";
          var I = e("../utils/common"), O = e("./adler32"), B = e("./crc32"), R = e("./inffast"), T = e("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, n = 852, i = 592;
          function L(e2) {
            return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
          }
          function s() {
            this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }
          function a(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I.Buf32(n), t2.distcode = t2.distdyn = new I.Buf32(i), t2.sane = 1, t2.back = -1, N) : U;
          }
          function o(e2) {
            var t2;
            return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U;
          }
          function h(e2, t2) {
            var r2, n2;
            return e2 && e2.state ? (n2 = e2.state, t2 < 0 ? (r2 = 0, t2 = -t2) : (r2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U : (null !== n2.window && n2.wbits !== t2 && (n2.window = null), n2.wrap = r2, n2.wbits = t2, o(e2))) : U;
          }
          function u(e2, t2) {
            var r2, n2;
            return e2 ? (n2 = new s(), (e2.state = n2).window = null, (r2 = h(e2, t2)) !== N && (e2.state = null), r2) : U;
          }
          var l, f, c = true;
          function j(e2) {
            if (c) {
              var t2;
              for (l = new I.Buf32(512), f = new I.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
              for (; t2 < 256; ) e2.lens[t2++] = 9;
              for (; t2 < 280; ) e2.lens[t2++] = 7;
              for (; t2 < 288; ) e2.lens[t2++] = 8;
              for (T(D, e2.lens, 0, 288, l, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
              T(F, e2.lens, 0, 32, f, 0, e2.work, { bits: 5 }), c = false;
            }
            e2.lencode = l, e2.lenbits = 9, e2.distcode = f, e2.distbits = 5;
          }
          function Z(e2, t2, r2, n2) {
            var i2, s2 = e2.state;
            return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n2 >= s2.wsize ? (I.arraySet(s2.window, t2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n2 < (i2 = s2.wsize - s2.wnext) && (i2 = n2), I.arraySet(s2.window, t2, r2 - n2, i2, s2.wnext), (n2 -= i2) ? (I.arraySet(s2.window, t2, r2 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
          }
          r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e2) {
            return u(e2, 15);
          }, r.inflateInit2 = u, r.inflate = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U;
            12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, c2 = h2, x = N;
            e: for (; ; ) switch (r2.mode) {
              case P:
                if (0 === r2.wrap) {
                  r2.mode = 13;
                  break;
                }
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (2 & r2.wrap && 35615 === u2) {
                  E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                  break;
                }
                if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                  e2.msg = "incorrect header check", r2.mode = 30;
                  break;
                }
                if (8 != (15 & u2)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits) r2.wbits = k;
                else if (k > r2.wbits) {
                  e2.msg = "invalid window size", r2.mode = 30;
                  break;
                }
                r2.dmax = 1 << k, e2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                break;
              case 2:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.flags = u2, 8 != (255 & r2.flags)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (57344 & r2.flags) {
                  e2.msg = "unknown header flags set", r2.mode = 30;
                  break;
                }
                r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
              case 3:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
              case 4:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
              case 5:
                if (1024 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
                } else r2.head && (r2.head.extra = null);
                r2.mode = 6;
              case 6:
                if (1024 & r2.flags && (o2 < (d = r2.length) && (d = o2), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n2, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, r2.length -= d), r2.length)) break e;
                r2.length = 0, r2.mode = 7;
              case 7:
                if (2048 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.name = null);
                r2.length = 0, r2.mode = 8;
              case 8:
                if (4096 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.comment = null);
                r2.mode = 9;
              case 9:
                if (512 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (65535 & r2.check)) {
                    e2.msg = "header crc mismatch", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
                break;
              case 10:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                e2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
              case 11:
                if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
                e2.adler = r2.check = 1, r2.mode = 12;
              case 12:
                if (5 === t2 || 6 === t2) break e;
              case 13:
                if (r2.last) {
                  u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                  break;
                }
                for (; l2 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                  case 0:
                    r2.mode = 14;
                    break;
                  case 1:
                    if (j(r2), r2.mode = 20, 6 !== t2) break;
                    u2 >>>= 2, l2 -= 2;
                    break e;
                  case 2:
                    r2.mode = 17;
                    break;
                  case 3:
                    e2.msg = "invalid block type", r2.mode = 30;
                }
                u2 >>>= 2, l2 -= 2;
                break;
              case 14:
                for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                  e2.msg = "invalid stored block lengths", r2.mode = 30;
                  break;
                }
                if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t2) break e;
              case 15:
                r2.mode = 16;
              case 16:
                if (d = r2.length) {
                  if (o2 < d && (d = o2), h2 < d && (d = h2), 0 === d) break e;
                  I.arraySet(i2, n2, s2, d, a2), o2 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                  break;
                }
                r2.mode = 12;
                break;
              case 17:
                for (; l2 < 14; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                  e2.msg = "too many length or distance symbols", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 18;
              case 18:
                for (; r2.have < r2.ncode; ) {
                  for (; l2 < 3; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                }
                for (; r2.have < 19; ) r2.lens[A[r2.have++]] = 0;
                if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid code lengths set", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 19;
              case 19:
                for (; r2.have < r2.nlen + r2.ndist; ) {
                  for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (b < 16) u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                  else {
                    if (16 === b) {
                      for (z = _ + 2; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                        e2.msg = "invalid bit length repeat", r2.mode = 30;
                        break;
                      }
                      k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                    } else if (17 === b) {
                      for (z = _ + 3; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                    } else {
                      for (z = _ + 7; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                    }
                    if (r2.have + d > r2.nlen + r2.ndist) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    for (; d--; ) r2.lens[r2.have++] = k;
                  }
                }
                if (30 === r2.mode) break;
                if (0 === r2.lens[256]) {
                  e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                  break;
                }
                if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid literal/lengths set", r2.mode = 30;
                  break;
                }
                if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                  e2.msg = "invalid distances set", r2.mode = 30;
                  break;
                }
                if (r2.mode = 20, 6 === t2) break e;
              case 20:
                r2.mode = 21;
              case 21:
                if (6 <= o2 && 258 <= h2) {
                  e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(e2, c2), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                  break;
                }
                for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (g && 0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                  r2.mode = 26;
                  break;
                }
                if (32 & g) {
                  r2.back = -1, r2.mode = 12;
                  break;
                }
                if (64 & g) {
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break;
                }
                r2.extra = 15 & g, r2.mode = 22;
              case 22:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                r2.was = r2.length, r2.mode = 23;
              case 23:
                for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                  e2.msg = "invalid distance code", r2.mode = 30;
                  break;
                }
                r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
              case 24:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                if (r2.offset > r2.dmax) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                r2.mode = 25;
              case 25:
                if (0 === h2) break e;
                if (d = c2 - h2, r2.offset > d) {
                  if ((d = r2.offset - d) > r2.whave && r2.sane) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break;
                  }
                  p = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
                } else m = i2, p = a2 - r2.offset, d = r2.length;
                for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p++], --d; ) ;
                0 === r2.length && (r2.mode = 21);
                break;
              case 26:
                if (0 === h2) break e;
                i2[a2++] = r2.length, h2--, r2.mode = 21;
                break;
              case 27:
                if (r2.wrap) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 |= n2[s2++] << l2, l2 += 8;
                  }
                  if (c2 -= h2, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                    e2.msg = "incorrect data check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 28;
              case 28:
                if (r2.wrap && r2.flags) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (4294967295 & r2.total)) {
                    e2.msg = "incorrect length check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 29;
              case 29:
                x = 1;
                break e;
              case 30:
                x = -3;
                break e;
              case 31:
                return -4;
              case 32:
              default:
                return U;
            }
            return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t2)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f2 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f2, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e2.next_out - c2) : O(r2.check, i2, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f2 && 0 === c2 || 4 === t2) && x === N && (x = -5), x);
          }, r.inflateEnd = function(e2) {
            if (!e2 || !e2.state) return U;
            var t2 = e2.state;
            return t2.window && (t2.window = null), e2.state = null, N;
          }, r.inflateGetHeader = function(e2, t2) {
            var r2;
            return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U : ((r2.head = t2).done = false, N) : U;
          }, r.inflateSetDictionary = function(e2, t2) {
            var r2, n2 = t2.length;
            return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t2, n2, 0) !== r2.check ? -3 : Z(e2, t2, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
          }, r.inflateInfo = "pako inflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t, r) {
          "use strict";
          var D = e("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
          t.exports = function(e2, t2, r2, n, i, s, a, o) {
            var h, u, l, f, c, d, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
            for (b = 0; b <= 15; b++) O[b] = 0;
            for (v = 0; v < n; v++) O[t2[r2 + v]]++;
            for (k = g, w = 15; 1 <= w && 0 === O[w]; w--) ;
            if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
            for (y = 1; y < w && 0 === O[y]; y++) ;
            for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
            if (0 < z && (0 === e2 || 1 !== w)) return -1;
            for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
            for (v = 0; v < n; v++) 0 !== t2[r2 + v] && (a[B[t2[r2 + v]]++] = v);
            if (d = 0 === e2 ? (A = R = a, 19) : 1 === e2 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
            for (; ; ) {
              for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u; ) ;
              for (h = 1 << b - 1; E & h; ) h >>= 1;
              if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
                if (b === w) break;
                b = t2[r2 + a[v]];
              }
              if (k < b && (E & f) !== l) {
                for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, z <<= 1;
                if (C += 1 << x, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
                i[l = E & f] = k << 24 | x << 16 | c - s | 0;
              }
            }
            return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
          };
        }, { "../utils/common": 41 }], 51: [function(e, t, r) {
          "use strict";
          t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
        }, {}], 52: [function(e, t, r) {
          "use strict";
          var i = e("../utils/common"), o = 0, h = 1;
          function n(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
          n(z);
          var C = new Array(2 * f);
          n(C);
          var E = new Array(512);
          n(E);
          var A = new Array(256);
          n(A);
          var I = new Array(a);
          n(I);
          var O, B, R, T = new Array(f);
          function D(e2, t2, r2, n2, i2) {
            this.static_tree = e2, this.extra_bits = t2, this.extra_base = r2, this.elems = n2, this.max_length = i2, this.has_stree = e2 && e2.length;
          }
          function F(e2, t2) {
            this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
          }
          function N(e2) {
            return e2 < 256 ? E[e2] : E[256 + (e2 >>> 7)];
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
          }
          function P(e2, t2, r2) {
            e2.bi_valid > d - r2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U(e2, e2.bi_buf), e2.bi_buf = t2 >> d - e2.bi_valid, e2.bi_valid += r2 - d) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r2);
          }
          function L(e2, t2, r2) {
            P(e2, r2[2 * t2], r2[2 * t2 + 1]);
          }
          function j(e2, t2) {
            for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t2; ) ;
            return r2 >>> 1;
          }
          function Z(e2, t2, r2) {
            var n2, i2, s2 = new Array(g + 1), a2 = 0;
            for (n2 = 1; n2 <= g; n2++) s2[n2] = a2 = a2 + r2[n2 - 1] << 1;
            for (i2 = 0; i2 <= t2; i2++) {
              var o2 = e2[2 * i2 + 1];
              0 !== o2 && (e2[2 * i2] = j(s2[o2]++, o2));
            }
          }
          function W(e2) {
            var t2;
            for (t2 = 0; t2 < l; t2++) e2.dyn_ltree[2 * t2] = 0;
            for (t2 = 0; t2 < f; t2++) e2.dyn_dtree[2 * t2] = 0;
            for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
            e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
          }
          function M(e2) {
            8 < e2.bi_valid ? U(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
          }
          function H(e2, t2, r2, n2) {
            var i2 = 2 * t2, s2 = 2 * r2;
            return e2[i2] < e2[s2] || e2[i2] === e2[s2] && n2[t2] <= n2[r2];
          }
          function G(e2, t2, r2) {
            for (var n2 = e2.heap[r2], i2 = r2 << 1; i2 <= e2.heap_len && (i2 < e2.heap_len && H(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !H(t2, n2, e2.heap[i2], e2.depth)); ) e2.heap[r2] = e2.heap[i2], r2 = i2, i2 <<= 1;
            e2.heap[r2] = n2;
          }
          function K(e2, t2, r2) {
            var n2, i2, s2, a2, o2 = 0;
            if (0 !== e2.last_lit) for (; n2 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i2 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n2 ? L(e2, i2, t2) : (L(e2, (s2 = A[i2]) + u + 1, t2), 0 !== (a2 = w[s2]) && P(e2, i2 -= I[s2], a2), L(e2, s2 = N(--n2), r2), 0 !== (a2 = k[s2]) && P(e2, n2 -= T[s2], a2)), o2 < e2.last_lit; ) ;
            L(e2, m, t2);
          }
          function Y(e2, t2) {
            var r2, n2, i2, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o2 = t2.stat_desc.has_stree, h2 = t2.stat_desc.elems, u2 = -1;
            for (e2.heap_len = 0, e2.heap_max = _, r2 = 0; r2 < h2; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u2 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
            for (; e2.heap_len < 2; ) s2[2 * (i2 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i2] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i2 + 1]);
            for (t2.max_code = u2, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G(e2, s2, r2);
            for (i2 = h2; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G(e2, s2, 1), n2 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n2, s2[2 * i2] = s2[2 * r2] + s2[2 * n2], e2.depth[i2] = (e2.depth[r2] >= e2.depth[n2] ? e2.depth[r2] : e2.depth[n2]) + 1, s2[2 * r2 + 1] = s2[2 * n2 + 1] = i2, e2.heap[1] = i2++, G(e2, s2, 1), 2 <= e2.heap_len; ) ;
            e2.heap[--e2.heap_max] = e2.heap[1], function(e3, t3) {
              var r3, n3, i3, s3, a3, o3, h3 = t3.dyn_tree, u3 = t3.max_code, l2 = t3.stat_desc.static_tree, f2 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d2 = t3.stat_desc.extra_base, p2 = t3.stat_desc.max_length, m2 = 0;
              for (s3 = 0; s3 <= g; s3++) e3.bl_count[s3] = 0;
              for (h3[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _; r3++) p2 < (s3 = h3[2 * h3[2 * (n3 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * n3 + 1] = s3, u3 < n3 || (e3.bl_count[s3]++, a3 = 0, d2 <= n3 && (a3 = c2[n3 - d2]), o3 = h3[2 * n3], e3.opt_len += o3 * (s3 + a3), f2 && (e3.static_len += o3 * (l2[2 * n3 + 1] + a3)));
              if (0 !== m2) {
                do {
                  for (s3 = p2 - 1; 0 === e3.bl_count[s3]; ) s3--;
                  e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p2]--, m2 -= 2;
                } while (0 < m2);
                for (s3 = p2; 0 !== s3; s3--) for (n3 = e3.bl_count[s3]; 0 !== n3; ) u3 < (i3 = e3.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
              }
            }(e2, t2), Z(s2, u2, e2.bl_count);
          }
          function X(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), t2[2 * (r2 + 1) + 1] = 65535, n2 = 0; n2 <= r2; n2++) i2 = a2, a2 = t2[2 * (n2 + 1) + 1], ++o2 < h2 && i2 === a2 || (o2 < u2 ? e2.bl_tree[2 * i2] += o2 : 0 !== i2 ? (i2 !== s2 && e2.bl_tree[2 * i2]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v]++ : e2.bl_tree[2 * y]++, s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
          }
          function V(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), n2 = 0; n2 <= r2; n2++) if (i2 = a2, a2 = t2[2 * (n2 + 1) + 1], !(++o2 < h2 && i2 === a2)) {
              if (o2 < u2) for (; L(e2, i2, e2.bl_tree), 0 != --o2; ) ;
              else 0 !== i2 ? (i2 !== s2 && (L(e2, i2, e2.bl_tree), o2--), L(e2, b, e2.bl_tree), P(e2, o2 - 3, 2)) : o2 <= 10 ? (L(e2, v, e2.bl_tree), P(e2, o2 - 3, 3)) : (L(e2, y, e2.bl_tree), P(e2, o2 - 11, 7));
              s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
            }
          }
          n(T);
          var q = false;
          function J(e2, t2, r2, n2) {
            P(e2, (s << 1) + (n2 ? 1 : 0), 3), function(e3, t3, r3, n3) {
              M(e3), n3 && (U(e3, r3), U(e3, ~r3)), i.arraySet(e3.pending_buf, e3.window, t3, r3, e3.pending), e3.pending += r3;
            }(e2, t2, r2, true);
          }
          r._tr_init = function(e2) {
            q || (function() {
              var e3, t2, r2, n2, i2, s2 = new Array(g + 1);
              for (n2 = r2 = 0; n2 < a - 1; n2++) for (I[n2] = r2, e3 = 0; e3 < 1 << w[n2]; e3++) A[r2++] = n2;
              for (A[r2 - 1] = n2, n2 = i2 = 0; n2 < 16; n2++) for (T[n2] = i2, e3 = 0; e3 < 1 << k[n2]; e3++) E[i2++] = n2;
              for (i2 >>= 7; n2 < f; n2++) for (T[n2] = i2 << 7, e3 = 0; e3 < 1 << k[n2] - 7; e3++) E[256 + i2++] = n2;
              for (t2 = 0; t2 <= g; t2++) s2[t2] = 0;
              for (e3 = 0; e3 <= 143; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (; e3 <= 255; ) z[2 * e3 + 1] = 9, e3++, s2[9]++;
              for (; e3 <= 279; ) z[2 * e3 + 1] = 7, e3++, s2[7]++;
              for (; e3 <= 287; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (Z(z, l + 1, s2), e3 = 0; e3 < f; e3++) C[2 * e3 + 1] = 5, C[2 * e3] = j(e3, 5);
              O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, c, p);
            }(), q = true), e2.l_desc = new F(e2.dyn_ltree, O), e2.d_desc = new F(e2.dyn_dtree, B), e2.bl_desc = new F(e2.bl_tree, R), e2.bi_buf = 0, e2.bi_valid = 0, W(e2);
          }, r._tr_stored_block = J, r._tr_flush_block = function(e2, t2, r2, n2) {
            var i2, s2, a2 = 0;
            0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = function(e3) {
              var t3, r3 = 4093624447;
              for (t3 = 0; t3 <= 31; t3++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t3]) return o;
              if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h;
              for (t3 = 32; t3 < u; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h;
              return o;
            }(e2)), Y(e2, e2.l_desc), Y(e2, e2.d_desc), a2 = function(e3) {
              var t3;
              for (X(e3, e3.dyn_ltree, e3.l_desc.max_code), X(e3, e3.dyn_dtree, e3.d_desc.max_code), Y(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S[t3] + 1]; t3--) ;
              return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
            }(e2), i2 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t2 ? J(e2, t2, r2, n2) : 4 === e2.strategy || s2 === i2 ? (P(e2, 2 + (n2 ? 1 : 0), 3), K(e2, z, C)) : (P(e2, 4 + (n2 ? 1 : 0), 3), function(e3, t3, r3, n3) {
              var i3;
              for (P(e3, t3 - 257, 5), P(e3, r3 - 1, 5), P(e3, n3 - 4, 4), i3 = 0; i3 < n3; i3++) P(e3, e3.bl_tree[2 * S[i3] + 1], 3);
              V(e3, e3.dyn_ltree, t3 - 1), V(e3, e3.dyn_dtree, r3 - 1);
            }(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K(e2, e2.dyn_ltree, e2.dyn_dtree)), W(e2), n2 && M(e2);
          }, r._tr_tally = function(e2, t2, r2) {
            return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A[r2] + u + 1)]++, e2.dyn_dtree[2 * N(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
          }, r._tr_align = function(e2) {
            P(e2, 2, 3), L(e2, m, z), function(e3) {
              16 === e3.bi_valid ? (U(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
            }(e2);
          };
        }, { "../utils/common": 41 }], 53: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}], 54: [function(e, t, r) {
          (function(e2) {
            !function(r2, n) {
              "use strict";
              if (!r2.setImmediate) {
                var i, s, t2, a, o = 1, h = {}, u = false, l = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
                e3 = e3 && e3.setTimeout ? e3 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                  process.nextTick(function() {
                    c(e4);
                  });
                } : function() {
                  if (r2.postMessage && !r2.importScripts) {
                    var e4 = true, t3 = r2.onmessage;
                    return r2.onmessage = function() {
                      e4 = false;
                    }, r2.postMessage("", "*"), r2.onmessage = t3, e4;
                  }
                }() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e4) {
                  r2.postMessage(a + e4, "*");
                }) : r2.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                  c(e4.data);
                }, function(e4) {
                  t2.port2.postMessage(e4);
                }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e4) {
                  var t3 = l.createElement("script");
                  t3.onreadystatechange = function() {
                    c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                  }, s.appendChild(t3);
                }) : function(e4) {
                  setTimeout(c, 0, e4);
                }, e3.setImmediate = function(e4) {
                  "function" != typeof e4 && (e4 = new Function("" + e4));
                  for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; r3++) t3[r3] = arguments[r3 + 1];
                  var n2 = { callback: e4, args: t3 };
                  return h[o] = n2, i(o), o++;
                }, e3.clearImmediate = f;
              }
              function f(e4) {
                delete h[e4];
              }
              function c(e4) {
                if (u) setTimeout(c, 0, e4);
                else {
                  var t3 = h[e4];
                  if (t3) {
                    u = true;
                    try {
                      !function(e5) {
                        var t4 = e5.callback, r3 = e5.args;
                        switch (r3.length) {
                          case 0:
                            t4();
                            break;
                          case 1:
                            t4(r3[0]);
                            break;
                          case 2:
                            t4(r3[0], r3[1]);
                            break;
                          case 3:
                            t4(r3[0], r3[1], r3[2]);
                            break;
                          default:
                            t4.apply(n, r3);
                        }
                      }(t3);
                    } finally {
                      f(e4), u = false;
                    }
                  }
                }
              }
              function d(e4) {
                e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
              }
            }("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}] }, {}, [10])(10);
      });
    }
  });

  // node_modules/node-pkware/dist/constants.js
  var Compression;
  (function(Compression2) {
    Compression2[Compression2["Unknown"] = -1] = "Unknown";
    Compression2[Compression2["Binary"] = 0] = "Binary";
    Compression2[Compression2["Ascii"] = 1] = "Ascii";
  })(Compression || (Compression = {}));
  var DictionarySize;
  (function(DictionarySize2) {
    DictionarySize2[DictionarySize2["Unknown"] = -1] = "Unknown";
    DictionarySize2[DictionarySize2["Small"] = 4] = "Small";
    DictionarySize2[DictionarySize2["Medium"] = 5] = "Medium";
    DictionarySize2[DictionarySize2["Large"] = 6] = "Large";
  })(DictionarySize || (DictionarySize = {}));
  var LONGEST_ALLOWED_REPETITION = 516;
  var DistCode = [
    3,
    13,
    5,
    25,
    9,
    17,
    1,
    62,
    30,
    46,
    14,
    54,
    22,
    38,
    6,
    58,
    26,
    42,
    10,
    50,
    18,
    34,
    66,
    2,
    124,
    60,
    92,
    28,
    108,
    44,
    76,
    12,
    116,
    52,
    84,
    20,
    100,
    36,
    68,
    4,
    120,
    56,
    88,
    24,
    104,
    40,
    72,
    8,
    240,
    112,
    176,
    48,
    208,
    80,
    144,
    16,
    224,
    96,
    160,
    32,
    192,
    64,
    128,
    0
  ];
  var DistBits = [
    2,
    4,
    4,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8,
    8
  ];
  var LenBits = [
    3,
    2,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    7,
    7
  ];
  var LenCode = [
    5,
    3,
    1,
    6,
    10,
    2,
    12,
    20,
    4,
    24,
    8,
    48,
    16,
    32,
    64,
    0
  ];
  var ExLenBits = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ];
  var ChBitsAsc = [
    11,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    8,
    7,
    12,
    12,
    7,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    13,
    12,
    12,
    12,
    12,
    12,
    4,
    10,
    8,
    12,
    10,
    12,
    10,
    8,
    7,
    7,
    8,
    9,
    7,
    6,
    7,
    8,
    7,
    6,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    8,
    8,
    12,
    11,
    7,
    9,
    11,
    12,
    6,
    7,
    6,
    6,
    5,
    7,
    8,
    8,
    6,
    11,
    9,
    6,
    7,
    6,
    6,
    7,
    11,
    6,
    6,
    6,
    7,
    9,
    8,
    9,
    9,
    11,
    8,
    11,
    9,
    12,
    8,
    12,
    5,
    6,
    6,
    6,
    5,
    6,
    6,
    6,
    5,
    11,
    7,
    5,
    6,
    5,
    5,
    6,
    10,
    5,
    5,
    5,
    5,
    8,
    7,
    8,
    8,
    10,
    11,
    11,
    12,
    12,
    12,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    12,
    13,
    12,
    13,
    13,
    13,
    12,
    13,
    13,
    13,
    12,
    13,
    13,
    13,
    13,
    12,
    13,
    13,
    13,
    12,
    12,
    12,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13,
    13
  ];
  var ChCodeAsc = [
    1168,
    4064,
    2016,
    3040,
    992,
    3552,
    1504,
    2528,
    480,
    184,
    98,
    3808,
    1760,
    34,
    2784,
    736,
    3296,
    1248,
    2272,
    224,
    3936,
    1888,
    2912,
    864,
    3424,
    1376,
    4672,
    2400,
    352,
    3680,
    1632,
    2656,
    15,
    592,
    56,
    608,
    80,
    3168,
    912,
    216,
    66,
    2,
    88,
    432,
    124,
    41,
    60,
    152,
    92,
    9,
    28,
    108,
    44,
    76,
    24,
    12,
    116,
    232,
    104,
    1120,
    144,
    52,
    176,
    1808,
    2144,
    49,
    84,
    17,
    33,
    23,
    20,
    168,
    40,
    1,
    784,
    304,
    62,
    100,
    30,
    46,
    36,
    1296,
    14,
    54,
    22,
    68,
    48,
    200,
    464,
    208,
    272,
    72,
    1552,
    336,
    96,
    136,
    4e3,
    7,
    38,
    6,
    58,
    27,
    26,
    42,
    10,
    11,
    528,
    4,
    19,
    50,
    3,
    29,
    18,
    400,
    13,
    21,
    5,
    25,
    8,
    120,
    240,
    112,
    656,
    1040,
    16,
    1952,
    2976,
    928,
    576,
    7232,
    3136,
    5184,
    1088,
    6208,
    2112,
    4160,
    64,
    8064,
    3968,
    6016,
    1920,
    7040,
    2944,
    4992,
    896,
    7552,
    3456,
    5504,
    1408,
    6528,
    2432,
    4480,
    384,
    7808,
    3712,
    5760,
    1664,
    6784,
    2688,
    4736,
    640,
    7296,
    3200,
    5248,
    1152,
    6272,
    2176,
    4224,
    128,
    7936,
    3840,
    5888,
    1792,
    6912,
    2816,
    4864,
    3488,
    1440,
    2464,
    416,
    3744,
    1696,
    2720,
    672,
    3232,
    1184,
    2208,
    160,
    3872,
    1824,
    2848,
    800,
    3360,
    1312,
    2336,
    288,
    3616,
    1568,
    2592,
    544,
    3104,
    1056,
    2080,
    32,
    4032,
    1984,
    3008,
    960,
    3520,
    1472,
    2496,
    448,
    3776,
    1728,
    2752,
    704,
    3264,
    1216,
    2240,
    192,
    3904,
    1856,
    2880,
    832,
    768,
    3392,
    7424,
    3328,
    5376,
    1344,
    1280,
    6400,
    2304,
    2368,
    4352,
    256,
    7680,
    3584,
    320,
    5632,
    1536,
    6656,
    3648,
    1600,
    2624,
    2560,
    4608,
    512,
    7168,
    3072,
    5120,
    1024,
    6144,
    2048,
    4096,
    0
  ];

  // node_modules/node-pkware/dist/functions.js
  function repeat(value, repetitions) {
    const values = [];
    for (let i = 0; i < repetitions; i++) {
      values.push(value);
    }
    return values;
  }
  function clamp(min, max, n) {
    if (n < min) {
      return min;
    }
    if (n > max) {
      return max;
    }
    return n;
  }
  function nBitsOfOnes(numberOfBits) {
    if (!Number.isInteger(numberOfBits) || numberOfBits < 0) {
      return 0;
    }
    return (1 << numberOfBits) - 1;
  }
  function getLowestNBitsOf(number, numberOfBits) {
    return number & nBitsOfOnes(numberOfBits);
  }
  function quotientAndRemainder(dividend, divisor) {
    return [Math.floor(dividend / divisor), dividend % divisor];
  }
  function concatArrayBuffers(buffers) {
    if (buffers.length === 0) {
      return new ArrayBuffer(0);
    }
    const totalLength = buffers.reduce((sum, buffer) => {
      return sum + buffer.byteLength;
    }, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    buffers.forEach((buffer) => {
      combinedBuffer.set(new Uint8Array(buffer), offset);
      offset = offset + buffer.byteLength;
    });
    return combinedBuffer.buffer;
  }

  // node_modules/node-pkware/dist/simple/Implode.js
  function getSizeOfMatching(inputBytes, a, b) {
    const limit = clamp(2, LONGEST_ALLOWED_REPETITION, b - a);
    const view = new Uint8Array(inputBytes);
    for (let i = 2; i <= limit; i++) {
      if (view[a + i] !== view[b + i]) {
        return i;
      }
    }
    return limit;
  }
  function matchesAt(needle, haystack) {
    if (needle.byteLength === 0 || haystack.byteLength === 0) {
      return -1;
    }
    const needleView = new Uint8Array(needle);
    const haystackView = new Uint8Array(haystack);
    for (let i = 0; i < haystack.byteLength - needle.byteLength; i++) {
      let matches = true;
      for (let j = 0; j < needle.byteLength; j++) {
        if (haystackView[i + j] !== needleView[j]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        return i;
      }
    }
    return -1;
  }
  function findRepetitions(inputBytes, endOfLastMatch, cursor) {
    const notEnoughBytes = inputBytes.byteLength - cursor < 2;
    const tooClose = cursor === endOfLastMatch || cursor - endOfLastMatch < 2;
    if (notEnoughBytes || tooClose) {
      return { size: 0, distance: 0 };
    }
    const haystack = inputBytes.slice(endOfLastMatch, cursor);
    const needle = inputBytes.slice(cursor, cursor + 2);
    const matchIndex = matchesAt(needle, haystack);
    if (matchIndex !== -1) {
      const distance = cursor - endOfLastMatch - matchIndex;
      let size = 2;
      if (distance > 2) {
        size = getSizeOfMatching(inputBytes, endOfLastMatch + matchIndex, cursor);
      }
      return { distance: distance - 1, size };
    }
    return { size: 0, distance: 0 };
  }
  var Implode = class {
    inputBuffer;
    outputBuffer;
    compressionType;
    dictionarySize;
    dictionarySizeMask;
    streamEnded;
    distCodes;
    distBits;
    startIndex;
    handledFirstTwoBytes;
    outBits;
    nChBits;
    nChCodes;
    constructor(compressionType, dictionarySize) {
      this.inputBuffer = new ArrayBuffer(0);
      this.outputBuffer = new ArrayBuffer(0);
      this.compressionType = compressionType;
      this.dictionarySize = dictionarySize;
      this.dictionarySizeMask = 0;
      this.streamEnded = false;
      this.distCodes = structuredClone(DistCode);
      this.distBits = structuredClone(DistBits);
      this.startIndex = 0;
      this.handledFirstTwoBytes = false;
      this.outBits = 0;
      this.nChBits = repeat(0, 774);
      this.nChCodes = repeat(0, 774);
      this.setup();
    }
    handleData(input) {
      this.inputBuffer = input;
      this.processChunkData();
      const blockSize = 2048;
      let output;
      if (this.outputBuffer.byteLength > blockSize) {
        let [numberOfBlocks] = quotientAndRemainder(this.outputBuffer.byteLength, blockSize);
        numberOfBlocks = numberOfBlocks - 1;
        const numberOfBytes = numberOfBlocks * blockSize;
        output = this.outputBuffer.slice(0, numberOfBytes);
        this.outputBuffer = this.outputBuffer.slice(numberOfBytes);
        if (this.outBits === 0) {
          const view = new Uint8Array(this.outputBuffer);
          view[view.byteLength - 1] = 0;
        }
      } else {
        output = new ArrayBuffer(0);
      }
      this.streamEnded = true;
      this.processChunkData();
      return concatArrayBuffers([output, this.outputBuffer]);
    }
    processChunkData() {
      if (this.inputBuffer.byteLength !== 0) {
        this.startIndex = 0;
        if (!this.handledFirstTwoBytes) {
          if (this.inputBuffer.byteLength < 3) {
            return;
          }
          this.handledFirstTwoBytes = true;
          this.handleFirstTwoBytes();
        }
        const endOfLastMatch = 0;
        while (this.startIndex < this.inputBuffer.byteLength) {
          const { size, distance } = findRepetitions(this.inputBuffer.slice(endOfLastMatch), endOfLastMatch, this.startIndex);
          const isFlushable = this.isRepetitionFlushable(size, distance);
          if (isFlushable === false) {
            const view = new Uint8Array(this.inputBuffer);
            const byte = view[this.startIndex];
            this.outputBits(this.nChBits[byte], this.nChCodes[byte]);
            this.startIndex = this.startIndex + 1;
          } else {
            const byte = size + 254;
            this.outputBits(this.nChBits[byte], this.nChCodes[byte]);
            if (size === 2) {
              const byte2 = distance >> 2;
              this.outputBits(this.distBits[byte2], this.distCodes[byte2]);
              this.outputBits(2, distance & 3);
            } else {
              switch (this.dictionarySize) {
                case "small": {
                  const byte2 = distance >> 4;
                  this.outputBits(this.distBits[byte2], this.distCodes[byte2]);
                  this.outputBits(4, this.dictionarySizeMask & distance);
                  break;
                }
                case "medium": {
                  const byte2 = distance >> 5;
                  this.outputBits(this.distBits[byte2], this.distCodes[byte2]);
                  this.outputBits(5, this.dictionarySizeMask & distance);
                  break;
                }
                case "large": {
                  const byte2 = distance >> 6;
                  this.outputBits(this.distBits[byte2], this.distCodes[byte2]);
                  this.outputBits(6, this.dictionarySizeMask & distance);
                  break;
                }
              }
            }
            this.startIndex = this.startIndex + size;
          }
          if (this.dictionarySize === "small" && this.startIndex >= 1024) {
            this.inputBuffer = this.inputBuffer.slice(1024);
            this.startIndex = this.startIndex - 1024;
          } else if (this.dictionarySize === "medium" && this.startIndex >= 2048) {
            this.inputBuffer = this.inputBuffer.slice(2048);
            this.startIndex = this.startIndex - 2048;
          } else if (this.dictionarySize === "large" && this.startIndex >= 4096) {
            this.inputBuffer = this.inputBuffer.slice(4096);
            this.startIndex = this.startIndex - 4096;
          }
        }
        this.inputBuffer = new ArrayBuffer(0);
      }
      if (this.streamEnded) {
        this.outputBits(this.nChBits.at(-1), this.nChCodes.at(-1));
      }
    }
    /**
     * @returns false - non flushable
     * @returns true - flushable
     * @returns null - flushable, but there might be a better repetition
     */
    isRepetitionFlushable(size, distance) {
      if (size === 0) {
        return false;
      }
      if (size === 2 && distance >= 256) {
        return false;
      }
      if (size >= 8 || this.startIndex + 1 >= this.inputBuffer.byteLength) {
        return true;
      }
      return null;
    }
    /**
     * repetitions are at least 2 bytes long,
     * so the initial 2 bytes can be moved to the output as is
     */
    handleFirstTwoBytes() {
      const [byte1, byte2] = new Uint8Array(this.inputBuffer);
      this.outputBits(this.nChBits[byte1], this.nChCodes[byte1]);
      this.outputBits(this.nChBits[byte2], this.nChCodes[byte2]);
      this.startIndex = this.startIndex + 2;
    }
    setup() {
      const addition = new ArrayBuffer(1);
      const additionView = new Uint8Array(addition);
      switch (this.compressionType) {
        case "ascii": {
          for (let nCount2 = 0; nCount2 < 256; nCount2++) {
            this.nChBits[nCount2] = ChBitsAsc[nCount2] + 1;
            this.nChCodes[nCount2] = ChCodeAsc[nCount2] * 2;
          }
          additionView[0] = 1;
          break;
        }
        case "binary": {
          let nChCode = 0;
          for (let nCount2 = 0; nCount2 < 256; nCount2++) {
            this.nChBits[nCount2] = 9;
            this.nChCodes[nCount2] = nChCode;
            nChCode = getLowestNBitsOf(nChCode, 16) + 2;
          }
          additionView[0] = 0;
          break;
        }
      }
      this.outputBuffer = concatArrayBuffers([this.outputBuffer, addition]);
      switch (this.dictionarySize) {
        case "small": {
          this.dictionarySizeMask = nBitsOfOnes(4);
          additionView[0] = 4;
          break;
        }
        case "medium": {
          this.dictionarySizeMask = nBitsOfOnes(5);
          additionView[0] = 5;
          break;
        }
        case "large": {
          this.dictionarySizeMask = nBitsOfOnes(6);
          additionView[0] = 6;
          break;
        }
      }
      this.outputBuffer = concatArrayBuffers([this.outputBuffer, addition]);
      let nCount = 256;
      for (let i = 0; i < 16; i++) {
        for (let nCount2 = 0; nCount2 < 1 << ExLenBits[i]; nCount2++) {
          this.nChBits[nCount] = ExLenBits[i] + LenBits[i] + 1;
          this.nChCodes[nCount] = nCount2 << LenBits[i] + 1 | LenCode[i] * 2 | 1;
          nCount = nCount + 1;
        }
      }
      additionView[0] = 0;
      this.outputBuffer = concatArrayBuffers([this.outputBuffer, addition]);
      this.outBits = 0;
    }
    outputBits(nBits, bitBuffer) {
      if (nBits > 8) {
        this.outputBits(8, bitBuffer);
        bitBuffer = bitBuffer >> 8;
        nBits = nBits - 8;
      }
      const { outBits } = this;
      const view = new Uint8Array(this.outputBuffer);
      view[view.byteLength - 1] = view[view.byteLength - 1] | getLowestNBitsOf(bitBuffer << outBits, 8);
      this.outBits = this.outBits + nBits;
      if (this.outBits > 8) {
        this.outBits = getLowestNBitsOf(this.outBits, 3);
        bitBuffer = bitBuffer >> 8 - outBits;
        const addition = new ArrayBuffer(1);
        const additionView = new Uint8Array(addition);
        additionView[0] = getLowestNBitsOf(bitBuffer, 8);
        this.outputBuffer = concatArrayBuffers([this.outputBuffer, addition]);
      } else {
        this.outBits = getLowestNBitsOf(this.outBits, 3);
        if (this.outBits === 0) {
          const addition = new ArrayBuffer(1);
          const additionView = new Uint8Array(addition);
          additionView[0] = 0;
          this.outputBuffer = concatArrayBuffers([this.outputBuffer, addition]);
        }
      }
    }
  };

  // node_modules/node-pkware/dist/simple/index.js
  function implode(input, compressionType, dictionarySize) {
    const instance = new Implode(compressionType, dictionarySize);
    return instance.handleData(input);
  }

  // node_modules/arx-convert/dist/common/constants.js
  var DANAE_VERSION = 1.440000057220459;
  var LITTLE_ENDIAN = true;
  var TRUNCATE_ZERO_BYTES = "truncate zero bytes";
  var KEEP_ZERO_BYTES = "keep zero bytes";
  var MAP_WIDTH_IN_CELLS = 160;
  var MAP_DEPTH_IN_CELLS = 160;
  var CHARS = [
    "\0",
    "",
    "",
    "",
    "",
    "",
    "",
    "\x07",
    "\b",
    "	",
    "\n",
    "\v",
    "\f",
    "\r",
    "",
    "",
    "\0x10",
    "\0x11",
    "\0x12",
    "\0x13",
    "\0x14",
    "\0x15",
    "\0x16",
    "\0x17",
    "\0x18",
    "\0x19",
    "\0x1a",
    "\0x1b",
    "\0x1c",
    "\0x1d",
    "\0x1e",
    "\0x1f",
    " ",
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "{",
    "|",
    "}",
    "~",
    "\x7F",
    "\x80",
    "\x81",
    "\x82",
    "\x83",
    "\x84",
    "\x85",
    "\x86",
    "\x87",
    "\x88",
    "\x89",
    "\x8A",
    "\x8B",
    "\x8C",
    "\x8D",
    "\x8E",
    "\x8F",
    "\x90",
    "\x91",
    "\x92",
    "\x93",
    "\x94",
    "\x95",
    "\x96",
    "\x97",
    "\x98",
    "\x99",
    "\x9A",
    "\x9B",
    "\x9C",
    "\x9D",
    "\x9E",
    "\x9F",
    "\xA0",
    "\xA1",
    "\xA2",
    "\xA3",
    "\xA4",
    "\xA5",
    "\xA6",
    "\xA7",
    "\xA8",
    "\xA9",
    "\xAA",
    "\xAB",
    "\xAC",
    "\xAD",
    "\xAE",
    "\xAF",
    "\xB0",
    "\xB1",
    "\xB2",
    "\xB3",
    "\xB4",
    "\xB5",
    "\xB6",
    "\xB7",
    "\xB8",
    "\xB9",
    "\xBA",
    "\xBB",
    "\xBC",
    "\xBD",
    "\xBE",
    "\xBF",
    "\xC0",
    "\xC1",
    "\xC2",
    "\xC3",
    "\xC4",
    "\xC5",
    "\xC6",
    "\xC7",
    "\xC8",
    "\xC9",
    "\xCA",
    "\xCB",
    "\xCC",
    "\xCD",
    "\xCE",
    "\xCF",
    "\xD0",
    "\xD1",
    "\xD2",
    "\xD3",
    "\xD4",
    "\xD5",
    "\xD6",
    "\xD7",
    "\xD8",
    "\xD9",
    "\xDA",
    "\xDB",
    "\xDC",
    "\xDD",
    "\xDE",
    "\xDF",
    "\xE0",
    "\xE1",
    "\xE2",
    "\xE3",
    "\xE4",
    "\xE5",
    "\xE6",
    "\xE7",
    "\xE8",
    "\xE9",
    "\xEA",
    "\xEB",
    "\xEC",
    "\xED",
    "\xEE",
    "\xEF",
    "\xF0",
    "\xF1",
    "\xF2",
    "\xF3",
    "\xF4",
    "\xF5",
    "\xF6",
    "\xF7",
    "\xF8",
    "\xF9",
    "\xFA",
    "\xFB",
    "\xFC",
    "\xFD",
    "\xFE",
    "\xFF"
  ];
  var CODES = /* @__PURE__ */ invert(CHARS);
  var BYTE_OF_AN_UNKNOWN_CHAR = /* @__PURE__ */ CHARS.indexOf(" ");
  var CHAR_OF_AN_UNKNOWN_BYTE = " ";

  // node_modules/arx-convert/dist/common/helpers.js
  function maxAll(arr) {
    let i = arr.length;
    let max = Number.NEGATIVE_INFINITY;
    while (i > 0) {
      i = i - 1;
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }
  function uniq(values) {
    return values.filter((value, index, self2) => {
      return self2.indexOf(value) === index;
    });
  }
  function times(fn, repetitions) {
    return Array.from({ length: repetitions }).map((value, index) => {
      return fn(index);
    });
  }
  function repeat2(value, repetitions) {
    const values = [];
    for (let i = 0; i < repetitions; i++) {
      values.push(value);
    }
    return values;
  }
  function invert(values) {
    const obj = {};
    values.forEach((value, index) => {
      obj[value] = index;
    });
    return obj;
  }
  function decodeText(bytes) {
    const chars = bytes.map((byte) => {
      return CHARS[byte] ?? CHAR_OF_AN_UNKNOWN_BYTE;
    });
    return chars.join("");
  }
  function encodeText(text) {
    const chars = [...text];
    return chars.map((char) => {
      return CODES[char] ?? BYTE_OF_AN_UNKNOWN_CHAR;
    });
  }
  function clamp2(min, max, n) {
    if (n < min) {
      return min;
    }
    if (n > max) {
      return max;
    }
    return n;
  }
  function concatUint8Arrays(buffers) {
    if (buffers.length === 0) {
      return new Uint8Array(0);
    }
    const totalLength = buffers.reduce((sum, buffer) => {
      return sum + buffer.length;
    }, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    buffers.forEach((buffer) => {
      combinedBuffer.set(buffer, offset);
      offset = offset + buffer.length;
    });
    return combinedBuffer;
  }

  // node_modules/arx-convert/dist/common/BinaryIO.js
  var BinaryIO = class _BinaryIO extends DataView {
    static sizeOfFloat32() {
      return 4;
    }
    static sizeOfFloat32Array(length) {
      return length * _BinaryIO.sizeOfFloat32();
    }
    static sizeOfInt8() {
      return 1;
    }
    static sizeOfInt8Array(length) {
      return length * _BinaryIO.sizeOfInt8();
    }
    static sizeOfInt16() {
      return 2;
    }
    static sizeOfInt16Array(length) {
      return length * _BinaryIO.sizeOfInt16();
    }
    static sizeOfInt32() {
      return 4;
    }
    static sizeOfInt32Array(length) {
      return length * _BinaryIO.sizeOfInt32();
    }
    static sizeOfUint8() {
      return 1;
    }
    static sizeOfUint8Array(length) {
      return length * _BinaryIO.sizeOfUint8();
    }
    static sizeOfUint16() {
      return 2;
    }
    static sizeOfUint16Array(length) {
      return length * _BinaryIO.sizeOfUint16();
    }
    static sizeOfUint32() {
      return 4;
    }
    static sizeOfUint32Array(length) {
      return length * _BinaryIO.sizeOfUint32();
    }
    static sizeOfString(length) {
      return length;
    }
    static sizeOfNullTerminatedString(str) {
      return str.length + 1;
    }
    static sizeOfVector3() {
      return _BinaryIO.sizeOfFloat32Array(3);
    }
    static sizeOfVector3Array(length) {
      return length * _BinaryIO.sizeOfVector3();
    }
    static sizeOfRotation() {
      return _BinaryIO.sizeOfFloat32Array(3);
    }
    static sizeOfQuat() {
      return _BinaryIO.sizeOfFloat32Array(4);
    }
    position;
    // TODO: make this private - this needs to be public because of TEA
    constructor(buffer, byteOffset, byteLength) {
      super(buffer.buffer, byteOffset, byteLength);
      this.position = 0;
    }
    readFloat32() {
      const val = this.getFloat32(this.position, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfFloat32();
      return val;
    }
    readFloat32Array(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.readFloat32());
      }
      return arr;
    }
    readInt8() {
      const val = this.getInt8(this.position);
      this.position = this.position + _BinaryIO.sizeOfInt8();
      return val;
    }
    readInt8Array(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.readInt8());
      }
      return arr;
    }
    readInt16() {
      const val = this.getInt16(this.position, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfInt16();
      return val;
    }
    readInt16Array(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.readInt16());
      }
      return arr;
    }
    readInt32() {
      const val = this.getInt32(this.position, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfInt32();
      return val;
    }
    readInt32Array(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.readInt32());
      }
      return arr;
    }
    readUint8() {
      const val = this.getUint8(this.position);
      this.position = this.position + _BinaryIO.sizeOfUint8();
      return val;
    }
    readUint8Array(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.readUint8());
      }
      return arr;
    }
    readUint16() {
      const val = this.getUint16(this.position, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfUint16();
      return val;
    }
    readUint16Array(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.readUint16());
      }
      return arr;
    }
    readUint32() {
      const val = this.getUint32(this.position, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfUint32();
      return val;
    }
    readUint32Array(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.readUint32());
      }
      return arr;
    }
    writeFloat32(value) {
      this.setFloat32(this.position, value, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfFloat32();
    }
    writeFloat32Array(values) {
      values.forEach((value) => {
        this.writeFloat32(value);
      });
    }
    writeInt8(value) {
      this.setInt8(this.position, value);
      this.position = this.position + _BinaryIO.sizeOfInt8();
    }
    writeInt8Array(values) {
      values.forEach((value) => {
        this.writeInt8(value);
      });
    }
    writeInt16(value) {
      this.setInt16(this.position, value, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfInt16();
    }
    writeInt16Array(values) {
      values.forEach((value) => {
        this.writeInt16(value);
      });
    }
    writeInt32(value) {
      this.setInt32(this.position, value, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfInt32();
    }
    writeInt32Array(values) {
      values.forEach((value) => {
        this.writeInt32(value);
      });
    }
    writeUint8(value) {
      this.setUint8(this.position, value);
      this.position = this.position + _BinaryIO.sizeOfUint8();
    }
    writeUint8Array(values) {
      values.forEach((value) => {
        this.writeUint8(value);
      });
    }
    writeUint16(value) {
      this.setUint16(this.position, value, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfUint16();
    }
    writeUint16Array(values) {
      values.forEach((value) => {
        this.writeUint16(value);
      });
    }
    writeUint32(value) {
      this.setUint32(this.position, value, LITTLE_ENDIAN);
      this.position = this.position + _BinaryIO.sizeOfUint32();
    }
    writeUint32Array(values) {
      values.forEach((value) => {
        this.writeUint32(value);
      });
    }
    readString(length, truncateZeroBytes = TRUNCATE_ZERO_BYTES) {
      const codes = [];
      if (length === void 0) {
        let c = this.readUint8();
        while (c !== 0) {
          codes.push(c);
          c = this.readUint8();
        }
      } else {
        let gotNil = false;
        for (let i = 0; i < length; i++) {
          const c = this.readUint8();
          if (gotNil && truncateZeroBytes === TRUNCATE_ZERO_BYTES) {
            continue;
          }
          if (c === 0) {
            gotNil = true;
          }
          if (c !== 0 || truncateZeroBytes === KEEP_ZERO_BYTES) {
            if (c === 0) {
              codes.push(BYTE_OF_AN_UNKNOWN_CHAR);
            } else {
              codes.push(c);
            }
          }
        }
      }
      return decodeText(codes);
    }
    writeString(str, length) {
      if (length === void 0) {
        encodeText(str).forEach((charCode) => {
          this.writeUint8(charCode);
        });
        this.writeUint8(0);
      } else {
        const charCodes = repeat2(0, length);
        encodeText(str).forEach((charCode, index) => {
          charCodes[index] = charCode;
        });
        charCodes.forEach((charCode) => {
          this.writeUint8(charCode);
        });
      }
    }
    readVector3() {
      const [x, y, z] = this.readFloat32Array(3);
      return { x, y, z };
    }
    readVector3Array(length) {
      const arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.readVector3());
      }
      return arr;
    }
    writeVector3({ x, y, z }) {
      this.writeFloat32Array([x, y, z]);
    }
    writeVector3Array(values) {
      values.forEach((value) => {
        this.writeVector3(value);
      });
    }
    readRotation() {
      const [a, b, g] = this.readFloat32Array(3);
      return { a, b, g };
    }
    writeRotation({ a, b, g }) {
      this.writeFloat32Array([a, b, g]);
    }
    readQuat() {
      const [w, x, y, z] = this.readFloat32Array(4);
      return { x, y, z, w };
    }
    writeQuat({ x, y, z, w }) {
      this.writeFloat32Array([w, x, y, z]);
    }
    writeBuffer(buffer) {
      this.writeUint8Array(buffer);
    }
  };

  // node_modules/arx-convert/dist/dlf/DlfHeader.js
  var DlfHeader = class _DlfHeader {
    static readFrom(binary) {
      binary.readFloat32();
      binary.readString(16);
      const dataBlock = {
        lastUser: binary.readString(256),
        time: binary.readInt32(),
        posEdit: binary.readVector3(),
        angleEdit: binary.readRotation()
      };
      binary.readInt32();
      const numberOfInteractiveObjects = binary.readInt32();
      binary.readInt32();
      binary.readInt32();
      binary.readInt32();
      binary.readInt32();
      binary.readInt32Array(256);
      binary.readInt32();
      const numberOfFogs = binary.readInt32();
      const numberOfBackgroundPolygons = binary.readInt32();
      binary.readInt32();
      binary.readInt32();
      const numberOfZonesAndPaths = binary.readInt32();
      binary.readInt32Array(250);
      binary.readVector3();
      binary.readFloat32Array(253);
      binary.readString(4096);
      binary.readInt32Array(256);
      return {
        ...dataBlock,
        numberOfInteractiveObjects,
        numberOfFogs,
        numberOfBackgroundPolygons,
        numberOfZonesAndPaths
      };
    }
    static accumulateFrom(json) {
      const buffer = new Uint8Array(_DlfHeader.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeFloat32(DANAE_VERSION);
      binary.writeString("DANAE_FILE", 16);
      binary.writeString(json.header.lastUser, 256);
      binary.writeInt32(json.header.time);
      binary.writeVector3(json.header.posEdit);
      binary.writeRotation(json.header.angleEdit);
      binary.writeInt32(1);
      binary.writeInt32(json.interactiveObjects.length);
      binary.writeInt32(0);
      binary.writeInt32(12);
      binary.writeInt32(0);
      binary.writeInt32(0);
      binary.writeInt32Array(repeat2(0, 256));
      binary.writeInt32(0);
      binary.writeInt32(json.fogs.length);
      binary.writeInt32(json.header.numberOfBackgroundPolygons);
      binary.writeInt32(0);
      binary.writeInt32(0);
      binary.writeInt32(json.paths.length + json.zones.length);
      binary.writeInt32Array(repeat2(0, 250));
      binary.writeVector3({ x: 0, y: 0, z: 0 });
      binary.writeFloat32Array(repeat2(0, 253));
      binary.writeString("", 4096);
      binary.writeInt32Array(repeat2(0, 256));
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfFloat32() + BinaryIO.sizeOfString(16 + 256) + BinaryIO.sizeOfInt32() + BinaryIO.sizeOfVector3() + BinaryIO.sizeOfRotation() + BinaryIO.sizeOfInt32Array(6 + 256 + 6 + 250) + BinaryIO.sizeOfVector3() + BinaryIO.sizeOfFloat32Array(253) + BinaryIO.sizeOfString(4096) + BinaryIO.sizeOfInt32Array(256);
    }
  };

  // node_modules/arx-convert/dist/common/Color.js
  var Color = class _Color {
    static readFrom(binary, mode) {
      if (mode === "bgra") {
        const [b2, g2, r2, a] = binary.readUint8Array(4);
        return { r: r2, g: g2, b: b2, a: a / 255 };
      }
      if (mode === "abgr") {
        const [a, b2, g2, r2] = binary.readUint8Array(4);
        return { r: r2, g: g2, b: b2, a: a / 255 };
      }
      const [r, g, b] = binary.readFloat32Array(3);
      return { r: r * 255, g: g * 255, b: b * 255, a: 1 };
    }
    static accumulateFrom({ r, g, b, a }, mode) {
      const buffer = new Uint8Array(_Color.sizeOf(mode));
      const binary = new BinaryIO(buffer);
      if (mode === "bgra") {
        binary.writeUint8Array([b, g, r, a * 255]);
      } else if (mode === "abgr") {
        binary.writeUint8Array([a * 255, b, g, r]);
      } else {
        binary.writeFloat32Array([r / 255, g / 255, b / 255]);
      }
      return buffer;
    }
    static sizeOf(mode) {
      if (mode === "rgb") {
        return BinaryIO.sizeOfFloat32Array(3);
      }
      return BinaryIO.sizeOfUint8Array(4);
    }
    static get black() {
      return { r: 0, g: 0, b: 0, a: 1 };
    }
    static get transparent() {
      return { r: 0, g: 0, b: 0, a: 0 };
    }
  };

  // node_modules/arx-convert/dist/dlf/Fog.js
  var Fog = class _Fog {
    static readFrom(binary) {
      const dataBlock1 = {
        pos: binary.readVector3(),
        color: Color.readFrom(binary, "rgb"),
        size: binary.readFloat32(),
        special: binary.readInt32(),
        scale: binary.readFloat32(),
        move: binary.readVector3(),
        angle: binary.readRotation(),
        speed: binary.readFloat32(),
        rotateSpeed: binary.readFloat32(),
        toLive: binary.readInt32()
      };
      binary.readInt32();
      const frequency = binary.readFloat32();
      binary.readFloat32Array(32);
      binary.readInt32Array(32);
      binary.readString(256);
      return {
        ...dataBlock1,
        frequency
      };
    }
    static accumulateFrom(fog) {
      const buffer = new Uint8Array(_Fog.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeVector3(fog.pos);
      binary.writeBuffer(Color.accumulateFrom(fog.color, "rgb"));
      binary.writeFloat32(fog.size);
      binary.writeInt32(fog.special);
      binary.writeFloat32(fog.scale);
      binary.writeVector3(fog.move);
      binary.writeRotation(fog.angle);
      binary.writeFloat32(fog.speed);
      binary.writeFloat32(fog.rotateSpeed);
      binary.writeInt32(fog.toLive);
      binary.writeInt32(0);
      binary.writeFloat32(fog.frequency);
      binary.writeFloat32Array(repeat2(0, 32));
      binary.writeInt32Array(repeat2(0, 32));
      binary.writeString("", 256);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfVector3() + Color.sizeOf("rgb") + BinaryIO.sizeOfFloat32Array(2) + BinaryIO.sizeOfInt32() + BinaryIO.sizeOfVector3() + BinaryIO.sizeOfRotation() + BinaryIO.sizeOfFloat32Array(3) + BinaryIO.sizeOfInt32Array(2) + BinaryIO.sizeOfFloat32Array(32) + BinaryIO.sizeOfInt32Array(32) + BinaryIO.sizeOfString(256);
    }
  };

  // node_modules/arx-convert/dist/dlf/InteactiveObject.js
  var InteractiveObject = class _InteractiveObject {
    static readFrom(binary) {
      const data = {
        name: _InteractiveObject.toRelativePath(binary.readString(512)),
        pos: binary.readVector3(),
        angle: binary.readRotation(),
        identifier: binary.readInt32()
      };
      binary.readInt32();
      binary.readInt32Array(14);
      binary.readFloat32Array(16);
      return data;
    }
    static accumulateFrom(interactiveObject) {
      const buffer = new Uint8Array(_InteractiveObject.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeString(_InteractiveObject.toAbsolutePath(interactiveObject.name), 512);
      binary.writeVector3(interactiveObject.pos);
      binary.writeRotation(interactiveObject.angle);
      binary.writeInt32(interactiveObject.identifier);
      binary.writeInt32(0);
      binary.writeInt32Array(repeat2(0, 14));
      binary.writeFloat32Array(repeat2(0, 16));
      return buffer;
    }
    /**
     * from: `\\\\ARKANESERVER\\PUBLIC\\ARX\\GRAPH\\OBJ3D\\INTERACTIVE\\ITEMS\\PROVISIONS\\PIE\\PIE.teo`
     *   to: `items/provisions/pie`
     *
     * from: `C:\\ARX\\Graph\\Obj3D\\Interactive\\System\\Marker\\Marker.teo`
     *   to: `system/marker`
     *
     * If the last folder in the path and filename differs, like `...\\ITEMS\\PROVISIONS\\MUSHROOM\\FOOD_MUSHROOM.teo`
     * then it should keep the full path, but change the extension to `.asl`
     */
    static toRelativePath(filePath) {
      filePath = filePath.toLowerCase().replaceAll("\\", "/").split("graph/obj3d/interactive/")[1];
      const filePathParts = filePath.split("/");
      const fileName = filePathParts.pop();
      const fileNameParts = fileName.split(".");
      if (fileNameParts.length > 1) {
        fileNameParts.pop();
      }
      const dir = filePathParts.join("/");
      const name = fileNameParts.join(".");
      if (dir.split("/").at(-1) !== name) {
        return dir + "/" + name + ".asl";
      }
      return dir;
    }
    /**
     * from: `items/provisions/pie`
     *   to: `c:\\arx\\graph\\obj3d\\interactive\\items\\provisions\\pie\\pie.teo`
     *
     * If the path also has a file specified with extension, like `items/provisions/mushroom/food_mushroom.asl`
     * then keep the file part too, but change the extension to `.teo`
     */
    static toAbsolutePath(filePath) {
      filePath = filePath.toLowerCase().replace(/\/$/, "");
      if (filePath.endsWith(".asl")) {
        const filePathParts = filePath.split("/");
        const fileName = filePathParts.pop();
        const fileNameParts = fileName.split(".");
        if (fileNameParts.length > 1) {
          fileNameParts.pop();
        }
        const dir2 = filePathParts.join("/");
        const name2 = fileNameParts.join(".");
        return `c:\\arx\\graph\\obj3d\\interactive\\${dir2.replaceAll("/", "\\")}\\${name2}.teo`;
      }
      const dir = filePath;
      const name = filePath.split("/").at(-1);
      return `c:\\arx\\graph\\obj3d\\interactive\\${dir.replaceAll("/", "\\")}\\${name}.teo`;
    }
    static sizeOf() {
      return BinaryIO.sizeOfString(512) + BinaryIO.sizeOfVector3() + BinaryIO.sizeOfRotation() + BinaryIO.sizeOfInt32Array(16) + BinaryIO.sizeOfFloat32Array(16);
    }
  };

  // node_modules/arx-convert/dist/dlf/ZoneAndPathHeader.js
  var ArxZoneAndPathFlags;
  (function(ArxZoneAndPathFlags2) {
    ArxZoneAndPathFlags2[ArxZoneAndPathFlags2["None"] = 0] = "None";
    ArxZoneAndPathFlags2[ArxZoneAndPathFlags2["SetAmbience"] = 2] = "SetAmbience";
    ArxZoneAndPathFlags2[ArxZoneAndPathFlags2["SetBackgroundColor"] = 4] = "SetBackgroundColor";
    ArxZoneAndPathFlags2[ArxZoneAndPathFlags2["SetDrawDistance"] = 8] = "SetDrawDistance";
  })(ArxZoneAndPathFlags || (ArxZoneAndPathFlags = {}));
  var ZoneAndPathHeader = class _ZoneAndPathHeader {
    static readFrom(binary) {
      const name = binary.readString(64);
      binary.readInt16();
      const flags = binary.readInt16();
      binary.readVector3();
      const dataBlock = {
        pos: binary.readVector3(),
        numberOfPoints: binary.readInt32(),
        backgroundColor: Color.readFrom(binary, "rgb"),
        drawDistance: binary.readFloat32()
      };
      binary.readFloat32();
      const ambienceMaxVolume = binary.readFloat32();
      binary.readFloat32Array(26);
      const height = binary.readInt32();
      binary.readInt32Array(31);
      const ambience = binary.readString(128);
      binary.readString(128);
      return {
        name,
        flags,
        ...dataBlock,
        ambienceMaxVolume,
        height,
        ambience
      };
    }
    static allocateFrom(zoneOrPath) {
      const buffer = new Uint8Array(_ZoneAndPathHeader.sizeOf());
      const binary = new BinaryIO(buffer);
      const { pos } = zoneOrPath.points[0];
      binary.writeString(zoneOrPath.name, 64);
      binary.writeInt16(0);
      let flags = ArxZoneAndPathFlags.None;
      if ("backgroundColor" in zoneOrPath && zoneOrPath.backgroundColor !== void 0) {
        flags = flags | ArxZoneAndPathFlags.SetBackgroundColor;
      }
      if ("drawDistance" in zoneOrPath && zoneOrPath.drawDistance !== void 0) {
        flags = flags | ArxZoneAndPathFlags.SetDrawDistance;
      }
      if ("ambience" in zoneOrPath && zoneOrPath.ambience !== void 0 && "ambienceMaxVolume" in zoneOrPath && zoneOrPath.ambienceMaxVolume !== void 0) {
        flags = flags | ArxZoneAndPathFlags.SetAmbience;
      }
      binary.writeInt16(flags);
      binary.writeVector3(pos);
      binary.writeVector3(pos);
      binary.writeInt32(zoneOrPath.points.length);
      if ("backgroundColor" in zoneOrPath) {
        binary.writeBuffer(Color.accumulateFrom(zoneOrPath?.backgroundColor ?? Color.black, "rgb"));
      } else {
        binary.writeBuffer(Color.accumulateFrom(Color.black, "rgb"));
      }
      if ("drawDistance" in zoneOrPath) {
        binary.writeFloat32(zoneOrPath?.drawDistance ?? 2800);
      } else {
        binary.writeFloat32(2800);
      }
      binary.writeFloat32(0);
      if ("ambienceMaxVolume" in zoneOrPath) {
        binary.writeFloat32(zoneOrPath?.ambienceMaxVolume ?? 100);
      } else {
        binary.writeFloat32(100);
      }
      binary.writeFloat32Array(repeat2(0, 26));
      if ("height" in zoneOrPath) {
        binary.writeInt32(zoneOrPath.height);
      } else {
        binary.writeInt32(0);
      }
      binary.writeInt32Array(repeat2(0, 31));
      if ("ambience" in zoneOrPath) {
        binary.writeString(zoneOrPath?.ambience ?? "NONE", 128);
      } else {
        binary.writeString("NONE", 128);
      }
      binary.writeString("", 128);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfString(64) + BinaryIO.sizeOfInt16Array(2) + BinaryIO.sizeOfVector3Array(2) + BinaryIO.sizeOfInt32() + Color.sizeOf("rgb") + BinaryIO.sizeOfFloat32Array(3 + 26) + BinaryIO.sizeOfInt32Array(1 + 31) + BinaryIO.sizeOfString(256);
    }
  };

  // node_modules/arx-convert/dist/dlf/ZoneAndPathPoint.js
  var ArxZoneAndPathPointType;
  (function(ArxZoneAndPathPointType2) {
    ArxZoneAndPathPointType2[ArxZoneAndPathPointType2["Standard"] = 0] = "Standard";
    ArxZoneAndPathPointType2[ArxZoneAndPathPointType2["Bezier"] = 1] = "Bezier";
    ArxZoneAndPathPointType2[ArxZoneAndPathPointType2["BezierControlPoint"] = 2] = "BezierControlPoint";
  })(ArxZoneAndPathPointType || (ArxZoneAndPathPointType = {}));
  var ZoneAndPathPoint = class _ZoneAndPathPoint {
    static readFrom(binary, pos) {
      const rpos = binary.readVector3();
      const data = {
        pos: {
          x: rpos.x + pos.x,
          y: rpos.y + pos.y,
          z: rpos.z + pos.z
        },
        type: binary.readInt32(),
        time: binary.readUint32()
      };
      binary.readFloat32Array(2);
      binary.readInt32Array(2);
      binary.readUint8Array(32);
      return data;
    }
    static allocateFrom(point, pos) {
      const buffer = new Uint8Array(_ZoneAndPathPoint.sizeOf());
      const binary = new BinaryIO(buffer);
      const rpos = {
        x: point.pos.x - pos.x,
        y: point.pos.y - pos.y,
        z: point.pos.z - pos.z
      };
      binary.writeVector3(rpos);
      binary.writeInt32(point.type);
      binary.writeUint32(point.time);
      binary.writeFloat32Array(repeat2(0, 2));
      binary.writeInt32Array(repeat2(0, 2));
      binary.writeUint8Array(repeat2(0, 32));
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfVector3() + BinaryIO.sizeOfInt32() + BinaryIO.sizeOfUint32() + BinaryIO.sizeOfFloat32Array(2) + BinaryIO.sizeOfInt32Array(2) + BinaryIO.sizeOfUint8Array(32);
    }
  };

  // node_modules/arx-convert/dist/dlf/Scene.js
  var Scene = class _Scene {
    static readFrom(binary) {
      const levelIdx = _Scene.pathToLevelIdx(binary.readString(512));
      binary.readInt32Array(16);
      binary.readFloat32Array(16);
      return {
        levelIdx
      };
    }
    static accumulateFrom(scene) {
      const buffer = new Uint8Array(_Scene.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeString(_Scene.levelIdxToPath(scene.levelIdx), 512);
      binary.writeInt32Array(repeat2(0, 16));
      binary.writeFloat32Array(repeat2(0, 16));
      return buffer;
    }
    static pathToLevelIdx(path) {
      return Number.parseInt(path.toLowerCase().replace("graph\\levels\\level", "").replace("\\", ""), 10);
    }
    static levelIdxToPath(levelIdx) {
      return `Graph\\Levels\\level${levelIdx}\\`;
    }
    static sizeOf() {
      return BinaryIO.sizeOfString(512) + BinaryIO.sizeOfInt32Array(16) + BinaryIO.sizeOfFloat32Array(16);
    }
  };

  // node_modules/arx-convert/dist/dlf/DLF.js
  var DLF = class {
    static load(decompressedFile) {
      const file = new BinaryIO(decompressedFile);
      const { numberOfInteractiveObjects, numberOfFogs, numberOfZonesAndPaths, ...header } = DlfHeader.readFrom(file);
      const data = {
        header,
        scene: Scene.readFrom(file),
        interactiveObjects: times(() => {
          return InteractiveObject.readFrom(file);
        }, numberOfInteractiveObjects),
        fogs: times(() => {
          return Fog.readFrom(file);
        }, numberOfFogs),
        paths: [],
        zones: []
      };
      const numberOfNodes = 0;
      const numberOfNodeLinks = 12;
      file.readInt8Array(numberOfNodes * (204 + numberOfNodeLinks * 64));
      times(() => {
        const { numberOfPoints, pos, height, name, backgroundColor, ambience, ambienceMaxVolume, drawDistance, flags } = ZoneAndPathHeader.readFrom(file);
        const points = times(() => {
          return ZoneAndPathPoint.readFrom(file, pos);
        }, numberOfPoints);
        if (height === 0) {
          const path = { name, points };
          data.paths.push(path);
        } else {
          const zone = { name, points, height };
          if (flags & ArxZoneAndPathFlags.SetAmbience) {
            zone.ambience = ambience;
            zone.ambienceMaxVolume = ambienceMaxVolume;
          }
          if (flags & ArxZoneAndPathFlags.SetBackgroundColor) {
            zone.backgroundColor = backgroundColor;
          }
          if (flags & ArxZoneAndPathFlags.SetDrawDistance) {
            zone.drawDistance = drawDistance;
          }
          data.zones.push(zone);
        }
      }, numberOfZonesAndPaths);
      return data;
    }
    static save(json) {
      const header = DlfHeader.accumulateFrom(json);
      const scene = Scene.accumulateFrom(json.scene);
      const interactiveObjects = concatUint8Arrays(json.interactiveObjects.map(InteractiveObject.accumulateFrom));
      const fogs = concatUint8Arrays(json.fogs.map(Fog.accumulateFrom));
      const numberOfNodes = 0;
      const numberOfNodeLinks = 12;
      const nodes = new Uint8Array(numberOfNodes * (204 + numberOfNodeLinks * 64));
      const paths = concatUint8Arrays(json.paths.flatMap((path) => {
        const header2 = ZoneAndPathHeader.allocateFrom(path);
        const { pos } = path.points[0];
        const points = path.points.map((point) => {
          return ZoneAndPathPoint.allocateFrom(point, pos);
        });
        return [header2, ...points];
      }));
      const zones = concatUint8Arrays(json.zones.flatMap((zone) => {
        const header2 = ZoneAndPathHeader.allocateFrom(zone);
        const { pos } = zone.points[0];
        const points = zone.points.map((point) => {
          return ZoneAndPathPoint.allocateFrom(point, pos);
        });
        return [header2, ...points];
      }));
      return concatUint8Arrays([header, scene, interactiveObjects, fogs, nodes, paths, zones]);
    }
  };

  // node_modules/arx-convert/dist/fts/AnchorData.js
  var ArxAnchorFlags;
  (function(ArxAnchorFlags2) {
    ArxAnchorFlags2[ArxAnchorFlags2["None"] = 0] = "None";
    ArxAnchorFlags2[ArxAnchorFlags2["Blocked"] = 8] = "Blocked";
  })(ArxAnchorFlags || (ArxAnchorFlags = {}));
  var AnchorData = class _AnchorData {
    static readFrom(binary) {
      const data = {
        pos: binary.readVector3(),
        radius: binary.readFloat32(),
        height: binary.readFloat32(),
        numberOfLinkedAnchors: binary.readInt16(),
        isBlocked: false
      };
      const flags = binary.readInt16();
      if ((flags & ArxAnchorFlags.Blocked) !== 0) {
        data.isBlocked = true;
      }
      return data;
    }
    static accumulateFrom(anchor) {
      const buffer = new Uint8Array(_AnchorData.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeVector3(anchor.data.pos);
      binary.writeFloat32(anchor.data.radius);
      binary.writeFloat32(anchor.data.height);
      binary.writeInt16(anchor.linkedAnchors.length);
      let flags = 0;
      if (anchor.data.isBlocked) {
        flags = flags | ArxAnchorFlags.Blocked;
      }
      binary.writeInt16(flags);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfVector3() + BinaryIO.sizeOfFloat32Array(2) + BinaryIO.sizeOfInt16Array(2);
    }
  };

  // node_modules/arx-convert/dist/fts/Anchor.js
  var Anchor = class {
    static readFrom(binary) {
      const { numberOfLinkedAnchors, ...anchorData } = AnchorData.readFrom(binary);
      return {
        data: anchorData,
        linkedAnchors: binary.readInt32Array(numberOfLinkedAnchors)
      };
    }
    static accumulateFrom(anchor) {
      const buffer = new Uint8Array(AnchorData.sizeOf() + anchor.linkedAnchors.length * 4);
      const binary = new BinaryIO(buffer);
      binary.writeBuffer(AnchorData.accumulateFrom(anchor));
      binary.writeInt32Array(anchor.linkedAnchors);
      return buffer;
    }
  };

  // node_modules/arx-convert/dist/fts/Vertex.js
  var Vertex = class _Vertex {
    static readFrom(binary) {
      const [y, x, z, u, v] = binary.readFloat32Array(5);
      return { x, y, z, u, v };
    }
    static accumulateFrom({ x, y, z, u, v }) {
      const buffer = new Uint8Array(_Vertex.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeFloat32Array([y, x, z, u, v]);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfFloat32Array(5);
    }
  };

  // node_modules/arx-convert/dist/fts/Polygon.js
  var ArxPolygonFlags;
  (function(ArxPolygonFlags2) {
    ArxPolygonFlags2[ArxPolygonFlags2["None"] = 0] = "None";
    ArxPolygonFlags2[ArxPolygonFlags2["NoShadow"] = 1] = "NoShadow";
    ArxPolygonFlags2[ArxPolygonFlags2["DoubleSided"] = 2] = "DoubleSided";
    ArxPolygonFlags2[ArxPolygonFlags2["Transparent"] = 4] = "Transparent";
    ArxPolygonFlags2[ArxPolygonFlags2["Water"] = 8] = "Water";
    ArxPolygonFlags2[ArxPolygonFlags2["Glow"] = 16] = "Glow";
    ArxPolygonFlags2[ArxPolygonFlags2["Ignore"] = 32] = "Ignore";
    ArxPolygonFlags2[ArxPolygonFlags2["Quad"] = 64] = "Quad";
    ArxPolygonFlags2[ArxPolygonFlags2["Tiled"] = 128] = "Tiled";
    ArxPolygonFlags2[ArxPolygonFlags2["Metal"] = 256] = "Metal";
    ArxPolygonFlags2[ArxPolygonFlags2["Hide"] = 512] = "Hide";
    ArxPolygonFlags2[ArxPolygonFlags2["Stone"] = 1024] = "Stone";
    ArxPolygonFlags2[ArxPolygonFlags2["Wood"] = 2048] = "Wood";
    ArxPolygonFlags2[ArxPolygonFlags2["Gravel"] = 4096] = "Gravel";
    ArxPolygonFlags2[ArxPolygonFlags2["Earth"] = 8192] = "Earth";
    ArxPolygonFlags2[ArxPolygonFlags2["NoCollision"] = 16384] = "NoCollision";
    ArxPolygonFlags2[ArxPolygonFlags2["Lava"] = 32768] = "Lava";
    ArxPolygonFlags2[ArxPolygonFlags2["Climbable"] = 65536] = "Climbable";
    ArxPolygonFlags2[ArxPolygonFlags2["Falling"] = 131072] = "Falling";
    ArxPolygonFlags2[ArxPolygonFlags2["NoPath"] = 262144] = "NoPath";
    ArxPolygonFlags2[ArxPolygonFlags2["NoDraw"] = 524288] = "NoDraw";
    ArxPolygonFlags2[ArxPolygonFlags2["PrecisePath"] = 1048576] = "PrecisePath";
    ArxPolygonFlags2[ArxPolygonFlags2["LateMip"] = 134217728] = "LateMip";
  })(ArxPolygonFlags || (ArxPolygonFlags = {}));
  var Polygon = class _Polygon {
    static readFrom(binary) {
      return {
        vertices: times(() => {
          return Vertex.readFrom(binary);
        }, 4),
        textureContainerId: binary.readInt32(),
        norm: binary.readVector3(),
        norm2: binary.readVector3(),
        normals: binary.readVector3Array(4),
        transval: binary.readFloat32(),
        area: binary.readFloat32(),
        flags: binary.readInt32(),
        room: binary.readInt16(),
        paddy: binary.readInt16()
      };
    }
    static accumulateFrom(polygon) {
      const buffer = new Uint8Array(_Polygon.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeBuffer(concatUint8Arrays(polygon.vertices.map(Vertex.accumulateFrom)));
      binary.writeInt32(polygon.textureContainerId);
      binary.writeVector3(polygon.norm);
      binary.writeVector3(polygon.norm2);
      binary.writeVector3Array(polygon.normals ?? [polygon.norm, polygon.norm, polygon.norm, polygon.norm2]);
      binary.writeFloat32(polygon.transval);
      binary.writeFloat32(polygon.area);
      binary.writeInt32(polygon.flags);
      binary.writeInt16(polygon.room);
      binary.writeInt16(polygon.paddy ?? 0);
      return buffer;
    }
    static sizeOf() {
      return Vertex.sizeOf() * 4 + BinaryIO.sizeOfInt32() + BinaryIO.sizeOfVector3Array(1 + 1 + 4) + BinaryIO.sizeOfFloat32Array(2) + BinaryIO.sizeOfInt32() + BinaryIO.sizeOfInt16Array(2);
    }
  };

  // node_modules/arx-convert/dist/fts/SceneInfo.js
  var SceneInfo = class _SceneInfo {
    static readFrom(binary) {
      return {
        numberOfPolygons: binary.readInt32(),
        numberOfAnchors: binary.readInt32()
      };
    }
    static accumulateFrom(cell) {
      const buffer = new Uint8Array(_SceneInfo.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeInt32(cell.polygons.length);
      binary.writeInt32(cell.anchors?.length ?? 0);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfInt32Array(2);
    }
  };

  // node_modules/arx-convert/dist/fts/Cell.js
  var Cell = class {
    static readFrom(binary) {
      const { numberOfPolygons, numberOfAnchors } = SceneInfo.readFrom(binary);
      const data = {
        polygons: times(() => {
          return Polygon.readFrom(binary);
        }, numberOfPolygons)
      };
      if (numberOfAnchors > 0) {
        data.anchors = binary.readInt32Array(numberOfAnchors);
      }
      return data;
    }
    static accumulateFrom(cell) {
      const anchors = cell.anchors ?? [];
      const buffer = new Uint8Array(SceneInfo.sizeOf() + Polygon.sizeOf() * cell.polygons.length + BinaryIO.sizeOfInt32Array(anchors.length));
      const binary = new BinaryIO(buffer);
      binary.writeBuffer(SceneInfo.accumulateFrom(cell));
      binary.writeBuffer(concatUint8Arrays(cell.polygons.map(Polygon.accumulateFrom)));
      binary.writeInt32Array(anchors);
      return buffer;
    }
  };

  // node_modules/arx-convert/dist/fts/constants.js
  var VERSION = 0.14100000262260437;
  var COORDS_THAT_ROUND_UP = [
    [2550, 2600, 2649.999755859375],
    [2649.999755859375, 2700, 2749.999755859375],
    [3949.999755859375, 4e3, 4050],
    [4294.99951171875, 4299.99951171875, 4305],
    [4299.99951171875, 4299.99951171875, 4300],
    [4599.99951171875, 4599.99951171875, 4600],
    [4899.99951171875, 4900, 4900],
    [4995, 4999.99951171875, 5004.99951171875],
    [5599.9990234375, 5600, 5600],
    [5599.99951171875, 5600, 5600],
    [5690.2626953125, 5700, 5709.736328125],
    [5695.5126953125, 5700, 5704.486328125],
    [5795, 5799.99951171875, 5804.99951171875],
    [5799.99951171875, 5800, 5800],
    [5975, 6e3, 6024.99951171875],
    [6050, 6124.99951171875, 6124.99951171875],
    [6057.666015625, 6100, 6142.3330078125],
    [6090.2626953125, 6100, 6109.736328125],
    [6174.99951171875, 6174.99951171875, 6250],
    [6199.99951171875, 6199.99951171875, 6200.00048828125],
    [6349.9990234375, 6400, 6450],
    [6439.99951171875, 6525, 6535],
    [6450, 6500, 6549.99951171875],
    [6450, 6499.99951171875, 6549.99951171875],
    [6549.9990234375, 6600.0009765625, 6649.9990234375],
    [6599.99951171875, 6599.99951171875, 6600.00048828125],
    [6749.9970703125, 6800.001953125, 6850],
    [6799.9990234375, 6800, 6800],
    [6899.99951171875, 6899.99951171875, 6900],
    [6999.99951171875, 6999.99951171875, 7e3],
    [6999.99951171875, 7e3, 7e3],
    [7049.99951171875, 7125, 7125],
    [7175, 7175, 7249.99951171875],
    [7195.00048828125, 7199.99951171875, 7204.99951171875],
    [7280, 7290, 7329.9990234375],
    [7294.99951171875, 7299.99951171875, 7305.00048828125],
    [7349.99951171875, 7399.99951171875, 7450.00048828125],
    [7350.00048828125, 7399.99951171875, 7449.99951171875],
    [7399.9990234375, 7400, 7400],
    [7399.99951171875, 7399.99951171875, 7400.00048828125],
    [7499.99951171875, 7500, 7500],
    [7565, 7585, 7649.9990234375],
    [7583.3330078125, 7600, 7616.666015625],
    [7591.8662109375, 7601.7626953125, 7606.3701171875],
    [7599.9990234375, 7600, 7600],
    [7640.0009765625, 7729.9990234375, 7729.9990234375],
    [7650, 7700, 7749.9990234375],
    [7775, 7799.99951171875, 7825],
    [7799.9990234375, 7800, 7800.00048828125],
    [7799.99951171875, 7800, 7800],
    [7950, 8024.99951171875, 8025],
    [7999.99951171875, 8e3, 8e3],
    [7999.99951171875, 7999.99951171875, 8e3],
    [8050, 8124.99951171875, 8125],
    [8099.9951171875, 8100.0009765625, 8100.0029296875],
    [8149.99951171875, 8200, 8250],
    [8149.99951171875, 8225, 8225],
    [8349.9990234375, 8400, 8449.9990234375],
    [8349.9990234375, 8400, 8450],
    [8450, 8500, 8549.9990234375],
    [8583.2490234375, 8600, 8616.75],
    [8649.9990234375, 8700, 8749.9990234375],
    [8750, 8800, 8849.9990234375],
    [8875, 8875, 8949.9990234375],
    [8909.9990234375, 9045, 9045],
    [8949.9990234375, 9025, 9025],
    [9099.9990234375, 9099.9990234375, 9100],
    [9197.515625, 9199.7958984375, 9202.6875],
    [9349.9990234375, 9400, 9449.9990234375],
    [9350, 9424.9990234375, 9425],
    [9399.9990234375, 9400, 9400],
    [9499.9990234375, 9500, 9500],
    [9549.9990234375, 9599.9990234375, 9650],
    [9650, 9699.9990234375, 9749.9990234375],
    [9699.9990234375, 9700, 9700],
    [9949.9990234375, 9999.9990234375, 10050],
    [9999.9990234375, 1e4, 1e4],
    [10049.9990234375, 10100, 10150],
    [10299.9990234375, 10300, 10300],
    [10399.9990234375, 10400, 10400],
    [10649.998046875, 10700.0029296875, 10749.998046875],
    [10649.9990234375, 10699.9990234375, 10750],
    [10849.9951171875, 10900.0087890625, 10949.9951171875],
    [11199.994140625, 11200.001953125, 11200.001953125],
    [11299.994140625, 11300.001953125, 11300.001953125],
    [11399.994140625, 11400.001953125, 11400.001953125],
    [11399.9990234375, 11400, 11400],
    [11499.994140625, 11500.001953125, 11500.001953125],
    [12049.998046875, 12125, 12125],
    [12183.3330078125, 12200, 12216.666015625],
    [12250, 12299.9990234375, 12350],
    [12899.9990234375, 12899.9990234375, 12900],
    [13199.9990234375, 13200, 13200],
    [13839.9990234375, 13925, 13935]
  ];

  // node_modules/arx-convert/dist/fts/FtsHeader.js
  var FtsHeader = class _FtsHeader {
    static readFrom(binary) {
      const path = binary.readString(256);
      const data = {
        levelIdx: _FtsHeader.pathToLevelIdx(path),
        numberOfUniqueHeaders: binary.readInt32()
      };
      binary.readFloat32();
      binary.readInt32();
      binary.readUint32Array(3);
      return data;
    }
    static accumulateFrom(json, uncompressedSize) {
      const buffer = new Uint8Array(_FtsHeader.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeString(_FtsHeader.levelIdxToPath(json.header.levelIdx), 256);
      binary.writeInt32(json.uniqueHeaders.length);
      binary.writeFloat32(VERSION);
      binary.writeInt32(uncompressedSize);
      binary.writeUint32Array(repeat2(0, 3));
      return buffer;
    }
    static pathToLevelIdx(path) {
      return Number.parseInt(path.toLowerCase().replace("c:\\arx\\game\\graph\\levels\\level", "").replace("\\", ""), 10);
    }
    static levelIdxToPath(levelIdx) {
      return `C:\\ARX\\Game\\Graph\\Levels\\level${levelIdx}\\`;
    }
    static sizeOf() {
      return BinaryIO.sizeOfString(256) + BinaryIO.sizeOfInt32() + BinaryIO.sizeOfFloat32() + BinaryIO.sizeOfInt32() + BinaryIO.sizeOfUint32Array(3);
    }
  };

  // node_modules/arx-convert/dist/fts/TextureVertex.js
  var HARDCODED_DATA_TYPE1 = {
    color: Color.transparent,
    specular: Color.transparent,
    tu: 0,
    tv: 0
  };
  var HARDCODED_DATA_TYPE2 = {
    color: {
      r: 1,
      g: 22,
      b: 242,
      a: 0.2980392156862745
    },
    specular: {
      r: 0,
      g: 92,
      b: 200,
      a: 0.49411764705882355
    },
    tu: 15694542800437951e-59,
    tv: 2772455559201393e-53
  };
  var TextureVertex = class _TextureVertex {
    static readFrom(binary) {
      const data = {
        pos: binary.readVector3(),
        rhw: binary.readFloat32()
      };
      Color.readFrom(binary, "abgr");
      Color.readFrom(binary, "abgr");
      binary.readFloat32();
      binary.readFloat32();
      return data;
    }
    static accumulateFrom(vertex, idx) {
      const buffer = new Uint8Array(_TextureVertex.sizeOf());
      const binary = new BinaryIO(buffer);
      const isFirstVertexOfPolygon = idx === 0;
      const isLastVertexOfPolygon = idx === 3;
      let data;
      if (isLastVertexOfPolygon) {
        data = HARDCODED_DATA_TYPE2;
      } else {
        data = HARDCODED_DATA_TYPE1;
      }
      const { color, specular, tu, tv } = data;
      binary.writeVector3(vertex.pos);
      if (isFirstVertexOfPolygon) {
        binary.writeFloat32(vertex.rhw);
      } else {
        binary.writeFloat32(0);
      }
      binary.writeBuffer(Color.accumulateFrom(color, "abgr"));
      binary.writeBuffer(Color.accumulateFrom(specular, "abgr"));
      binary.writeFloat32(tu);
      binary.writeFloat32(tv);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfVector3() + BinaryIO.sizeOfFloat32() + Color.sizeOf("abgr") * 2 + BinaryIO.sizeOfFloat32Array(2);
    }
  };

  // node_modules/arx-convert/dist/fts/PortalPolygon.js
  var HARDCODED_DATA_TYPE12 = [
    56,
    242,
    22,
    1,
    40,
    22,
    105,
    0,
    231,
    255,
    255,
    255,
    0,
    0,
    0,
    0,
    159,
    199,
    92,
    0,
    172,
    141,
    105,
    0,
    25,
    0,
    0,
    0,
    100,
    242,
    22,
    1,
    56,
    242,
    22,
    1,
    0,
    0,
    0,
    0,
    255,
    255,
    255,
    255,
    184,
    255,
    165,
    0,
    255,
    255,
    255,
    255,
    144,
    242,
    22,
    1,
    126,
    200,
    92,
    0,
    92,
    0,
    0,
    0,
    168,
    242,
    22,
    1,
    124,
    242,
    22,
    1,
    40,
    22,
    105,
    0,
    236,
    255,
    255,
    255,
    0,
    0,
    0,
    0,
    159,
    199,
    92,
    0,
    172,
    30,
    166,
    0,
    20,
    0,
    0,
    0,
    168,
    242,
    22,
    1,
    124,
    242,
    22,
    1,
    253,
    243,
    22,
    1,
    193,
    30,
    166,
    0,
    160,
    74,
    244,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  var HARDCODED_DATA_TYPE22 = [...HARDCODED_DATA_TYPE12];
  HARDCODED_DATA_TYPE22[76] = HARDCODED_DATA_TYPE22[76] - 1;
  HARDCODED_DATA_TYPE22[92] = HARDCODED_DATA_TYPE22[92] + 1;
  HARDCODED_DATA_TYPE22[104] = HARDCODED_DATA_TYPE22[104] + 1;
  HARDCODED_DATA_TYPE22[108] = HARDCODED_DATA_TYPE22[108] + 1;
  var PortalPolygon = class _PortalPolygon {
    static readFrom(binary) {
      binary.readInt32();
      const dataBlock = {
        min: binary.readVector3(),
        max: binary.readVector3(),
        norm: binary.readVector3(),
        norm2: binary.readVector3(),
        vertices: times(() => {
          return TextureVertex.readFrom(binary);
        }, 4)
      };
      binary.readUint8Array(32 * 4);
      binary.readVector3Array(4);
      binary.readInt32();
      const center = binary.readVector3();
      binary.readFloat32();
      binary.readFloat32();
      binary.readInt16();
      binary.readInt16();
      return {
        ...dataBlock,
        center
      };
    }
    static accumulateFrom(portalPolygon, levelIdx) {
      const buffer = new Uint8Array(_PortalPolygon.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeInt32(ArxPolygonFlags.Quad);
      binary.writeVector3(portalPolygon.min);
      binary.writeVector3(portalPolygon.max);
      binary.writeVector3(portalPolygon.norm);
      binary.writeVector3(portalPolygon.norm2);
      binary.writeBuffer(concatUint8Arrays(portalPolygon.vertices.map((vertex, idx) => {
        return TextureVertex.accumulateFrom(vertex, idx);
      })));
      if (levelIdx < 10) {
        binary.writeUint8Array(HARDCODED_DATA_TYPE12);
      } else {
        binary.writeUint8Array(HARDCODED_DATA_TYPE22);
      }
      binary.writeVector3Array([
        // normals
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ]);
      binary.writeInt32(0);
      binary.writeVector3(portalPolygon.center);
      binary.writeFloat32(0);
      binary.writeFloat32(0);
      binary.writeInt16(0);
      binary.writeInt16(0);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfInt32() + BinaryIO.sizeOfVector3Array(4) + TextureVertex.sizeOf() * 4 + BinaryIO.sizeOfUint8Array(32 * 4) + BinaryIO.sizeOfVector3Array(4) + BinaryIO.sizeOfInt32() + BinaryIO.sizeOfVector3() + BinaryIO.sizeOfFloat32Array(2) + BinaryIO.sizeOfInt16Array(2);
    }
  };

  // node_modules/arx-convert/dist/fts/Portal.js
  var Portal = class _Portal {
    static readFrom(binary) {
      return {
        polygon: PortalPolygon.readFrom(binary),
        room1: binary.readInt32(),
        // facing normal
        room2: binary.readInt32(),
        useportal: binary.readInt16(),
        paddy: binary.readInt16()
      };
    }
    static accumulateFrom(portal, levelIdx) {
      const buffer = new Uint8Array(_Portal.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeBuffer(PortalPolygon.accumulateFrom(portal.polygon, levelIdx));
      binary.writeInt32(portal.room1);
      binary.writeInt32(portal.room2);
      binary.writeInt16(portal.useportal);
      binary.writeInt16(portal.paddy);
      return buffer;
    }
    static sizeOf() {
      return PortalPolygon.sizeOf() + BinaryIO.sizeOfInt32Array(2) + BinaryIO.sizeOfInt16Array(2);
    }
  };

  // node_modules/arx-convert/dist/fts/EPData.js
  var EPData = class _EPData {
    static readFrom(binary) {
      const [px, py, idx] = binary.readInt16Array(4);
      return { cellX: px, cellY: py, polygonIdx: idx };
    }
    static accumulateFrom({ cellX: px, cellY: py, polygonIdx: idx }) {
      const buffer = new Uint8Array(_EPData.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeInt16Array([px, py, idx, 0]);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfInt16Array(4);
    }
  };

  // node_modules/arx-convert/dist/fts/RoomData.js
  var RoomData = class _RoomData {
    static readFrom(binary) {
      const data = {
        numberOfPortals: binary.readInt32(),
        numberOfPolygons: binary.readInt32()
      };
      binary.readInt32Array(6);
      return data;
    }
    static accumulateFrom(room) {
      const buffer = new Uint8Array(_RoomData.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeInt32(room.portals.length);
      binary.writeInt32(room.polygons.length);
      binary.writeInt32Array(repeat2(0, 6));
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfInt32Array(1 + 1 + 6);
    }
  };

  // node_modules/arx-convert/dist/fts/Room.js
  var Room = class {
    static readFrom(binary) {
      const { numberOfPortals, numberOfPolygons } = RoomData.readFrom(binary);
      return {
        portals: binary.readInt32Array(numberOfPortals),
        polygons: times(() => {
          return EPData.readFrom(binary);
        }, numberOfPolygons)
      };
    }
    static accumulateFrom(room) {
      const roomData = RoomData.accumulateFrom(room);
      const portals = new Uint8Array(room.portals.length * 4);
      const binary = new BinaryIO(portals);
      binary.writeInt32Array(room.portals);
      const polygons = concatUint8Arrays(room.polygons.map(EPData.accumulateFrom));
      return concatUint8Arrays([roomData, portals, polygons]);
    }
  };

  // node_modules/arx-convert/dist/fts/RoomDistance.js
  var RoomDistance = class _RoomDistance {
    static readFrom(binary) {
      return {
        distance: binary.readFloat32(),
        // -1 means use truedist
        startPosition: binary.readVector3(),
        endPosition: binary.readVector3()
      };
    }
    static accumulateFrom(roomDistance) {
      const buffer = new Uint8Array(_RoomDistance.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeFloat32(roomDistance.distance);
      binary.writeVector3(roomDistance.startPosition);
      binary.writeVector3(roomDistance.endPosition);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfFloat32() + BinaryIO.sizeOfVector3Array(2);
    }
  };

  // node_modules/arx-convert/dist/fts/SceneHeader.js
  var SceneHeader = class _SceneHeader {
    static readFrom(binary) {
      binary.readFloat32();
      binary.readInt32();
      binary.readInt32();
      const numberOfTextures = binary.readInt32();
      binary.readInt32();
      const numberOfAnchors = binary.readInt32();
      binary.readVector3();
      return {
        numberOfTextures,
        numberOfAnchors,
        mScenePosition: binary.readVector3(),
        numberOfPortals: binary.readInt32(),
        numberOfRooms: binary.readInt32() + 1
        // rooms are 1 indexed, because an empty room is reserved for room #0
      };
    }
    static accumulateFrom(json) {
      const roomIds = json.polygons.map(({ room }) => {
        return room;
      });
      const numberOfRooms = maxAll(uniq(roomIds));
      const buffer = new Uint8Array(_SceneHeader.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeFloat32(VERSION);
      binary.writeInt32(MAP_WIDTH_IN_CELLS);
      binary.writeInt32(MAP_DEPTH_IN_CELLS);
      binary.writeInt32(json.textureContainers.length);
      binary.writeInt32(json.polygons.length);
      binary.writeInt32(json.anchors.length);
      binary.writeVector3({ x: 0, y: 0, z: 0 });
      binary.writeVector3(json.sceneHeader.mScenePosition);
      binary.writeInt32(json.portals.length);
      binary.writeInt32(numberOfRooms);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfFloat32() + BinaryIO.sizeOfInt32Array(5 + 2) + BinaryIO.sizeOfVector3Array(2);
    }
  };

  // node_modules/arx-convert/dist/fts/TextureContainer.js
  var TextureContainer = class _TextureContainer {
    static readFrom(binary) {
      const id = binary.readInt32();
      binary.readInt32();
      const filename = _TextureContainer.toRelativePath(binary.readString(256));
      return {
        id,
        filename
      };
    }
    static accumulateFrom(textureContainer) {
      const buffer = new Uint8Array(_TextureContainer.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeInt32(textureContainer.id);
      binary.writeInt32(0);
      binary.writeString(_TextureContainer.toAbsolutePath(textureContainer.filename), 256);
      return buffer;
    }
    /**
     * from: GRAPH\\OBJ3D\\TEXTURES\\[STONE]_HUMAN_GROUND_WET.BMP
     *   to: [stone]_human_ground_wet.bmp
     */
    static toRelativePath(filename) {
      return filename.toLowerCase().replace("graph\\obj3d\\textures\\", "");
    }
    /**
     * from: [stone]_human_ground_wet.bmp
     *   to: graph\\obj3d\\textures\\[stone]_human_ground_wet.bmp
     */
    static toAbsolutePath(filename) {
      return "graph\\obj3d\\textures\\" + filename.toLowerCase();
    }
    static sizeOf() {
      return BinaryIO.sizeOfInt32Array(2) + BinaryIO.sizeOfString(256);
    }
  };

  // node_modules/arx-convert/dist/fts/UniqueHeader.js
  var UniqueHeader = class _UniqueHeader {
    static readFrom(binary) {
      return {
        path: binary.readString(256),
        check: binary.readUint8Array(512)
      };
    }
    static accumulateFrom(uniqueHeader) {
      const buffer = new Uint8Array(_UniqueHeader.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeString(uniqueHeader.path, 256);
      binary.writeUint8Array(uniqueHeader.check);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfString(256) + BinaryIO.sizeOfUint8Array(512);
    }
  };

  // node_modules/arx-convert/dist/fts/helpers.js
  function isQuad({ flags }) {
    return (flags & ArxPolygonFlags.Quad) !== 0;
  }
  function addLightIndex(polygons) {
    let idx = 0;
    return polygons.map((polygon) => {
      polygon.vertices[0].llfColorIdx = idx;
      polygon.vertices[1].llfColorIdx = idx + 1;
      polygon.vertices[2].llfColorIdx = idx + 2;
      idx = idx + 3;
      if (isQuad(polygon)) {
        polygon.vertices[3].llfColorIdx = idx;
        idx = idx + 1;
      }
      return polygon;
    });
  }
  function doCoordsNeedToBeRoundedUp(coords) {
    const [a, b, c] = coords.sort((a2, b2) => {
      return a2 - b2;
    });
    return COORDS_THAT_ROUND_UP.some(([x, y, z]) => {
      return a === x && b === y && c === z;
    });
  }
  function getCellCoords([a, b, c]) {
    const x = (a.x + b.x + c.x) / 3;
    const z = (a.z + b.z + c.z) / 3;
    let cellX;
    if (doCoordsNeedToBeRoundedUp([a.x, b.x, c.x])) {
      cellX = Math.ceil(x / 100);
    } else {
      cellX = Math.floor(x / 100);
    }
    let cellY;
    if (doCoordsNeedToBeRoundedUp([a.z, b.z, c.z])) {
      cellY = Math.ceil(z / 100);
    } else {
      cellY = Math.floor(z / 100);
    }
    return [cellX, cellY];
  }

  // node_modules/arx-convert/dist/fts/FTS.js
  var IS_AN_UNCOMPRESSED_FTS = 0;
  var FTS = class {
    static load(decompressedFile) {
      const file = new BinaryIO(decompressedFile);
      const { numberOfUniqueHeaders, ...header } = FtsHeader.readFrom(file);
      const uniqueHeaders = times(() => {
        return UniqueHeader.readFrom(file);
      }, numberOfUniqueHeaders);
      const { numberOfTextures, numberOfAnchors, numberOfPortals, numberOfRooms, ...sceneHeader } = SceneHeader.readFrom(file);
      const textureContainers = times(() => {
        return TextureContainer.readFrom(file);
      }, numberOfTextures);
      const combinedCells = [];
      for (let z = 0; z < MAP_DEPTH_IN_CELLS; z++) {
        for (let x = 0; x < MAP_WIDTH_IN_CELLS; x++) {
          combinedCells.push(Cell.readFrom(file));
        }
      }
      return {
        header,
        uniqueHeaders,
        sceneHeader,
        textureContainers,
        cells: combinedCells.map(({ polygons, ...cell }) => {
          return cell;
        }),
        polygons: addLightIndex(combinedCells.flatMap(({ polygons }) => {
          return polygons;
        })),
        anchors: times(() => {
          return Anchor.readFrom(file);
        }, numberOfAnchors),
        portals: times(() => {
          return Portal.readFrom(file);
        }, numberOfPortals),
        rooms: times(() => {
          return Room.readFrom(file);
        }, numberOfRooms),
        roomDistances: times(() => {
          return RoomDistance.readFrom(file);
        }, numberOfRooms ** 2)
      };
    }
    static save(json, isCompressed = true) {
      const { levelIdx } = json.header;
      const sceneHeader = SceneHeader.accumulateFrom(json);
      const recombinedCells = json.cells.map((cell) => {
        return {
          ...cell,
          polygons: []
        };
      });
      json.polygons.forEach((polygon) => {
        const [cellX, cellY] = getCellCoords(polygon.vertices);
        const cellIndex = cellY * MAP_WIDTH_IN_CELLS + cellX;
        recombinedCells[cellIndex].polygons.push(polygon);
      });
      const textureContainers = concatUint8Arrays(json.textureContainers.map(TextureContainer.accumulateFrom));
      const cells = concatUint8Arrays(recombinedCells.map(Cell.accumulateFrom));
      const anchors = concatUint8Arrays(json.anchors.map(Anchor.accumulateFrom));
      const portals = concatUint8Arrays(json.portals.map((portal) => {
        return Portal.accumulateFrom(portal, levelIdx);
      }));
      const rooms = concatUint8Arrays(json.rooms.map(Room.accumulateFrom));
      const roomDistances = concatUint8Arrays(json.roomDistances.map(RoomDistance.accumulateFrom));
      const dataWithoutHeader = concatUint8Arrays([
        sceneHeader,
        textureContainers,
        cells,
        anchors,
        portals,
        rooms,
        roomDistances
      ]);
      let header;
      if (isCompressed) {
        header = FtsHeader.accumulateFrom(json, dataWithoutHeader.length);
      } else {
        header = FtsHeader.accumulateFrom(json, IS_AN_UNCOMPRESSED_FTS);
      }
      const uniqueHeaders = concatUint8Arrays(json.uniqueHeaders.map(UniqueHeader.accumulateFrom));
      return concatUint8Arrays([header, uniqueHeaders, dataWithoutHeader]);
    }
  };

  // node_modules/arx-convert/dist/llf/Light.js
  var ArxLightFlags;
  (function(ArxLightFlags2) {
    ArxLightFlags2[ArxLightFlags2["None"] = 0] = "None";
    ArxLightFlags2[ArxLightFlags2["SemiDynamic"] = 1] = "SemiDynamic";
    ArxLightFlags2[ArxLightFlags2["Extinguishable"] = 2] = "Extinguishable";
    ArxLightFlags2[ArxLightFlags2["StartExtinguished"] = 4] = "StartExtinguished";
    ArxLightFlags2[ArxLightFlags2["SpawnFire"] = 8] = "SpawnFire";
    ArxLightFlags2[ArxLightFlags2["SpawnSmoke"] = 16] = "SpawnSmoke";
    ArxLightFlags2[ArxLightFlags2["Off"] = 32] = "Off";
    ArxLightFlags2[ArxLightFlags2["ColorLegacy"] = 64] = "ColorLegacy";
    ArxLightFlags2[ArxLightFlags2["NoCasted"] = 128] = "NoCasted";
    ArxLightFlags2[ArxLightFlags2["FixFlareSize"] = 256] = "FixFlareSize";
    ArxLightFlags2[ArxLightFlags2["Fireplace"] = 512] = "Fireplace";
    ArxLightFlags2[ArxLightFlags2["NoIgnit"] = 1024] = "NoIgnit";
    ArxLightFlags2[ArxLightFlags2["Flare"] = 2048] = "Flare";
  })(ArxLightFlags || (ArxLightFlags = {}));
  var Light = class _Light {
    static readFrom(binary) {
      const dataBlock1 = {
        pos: binary.readVector3(),
        color: Color.readFrom(binary, "rgb"),
        fallStart: binary.readFloat32(),
        fallEnd: binary.readFloat32(),
        intensity: binary.readFloat32()
      };
      binary.readFloat32();
      const dataBlock2 = {
        exFlicker: Color.readFrom(binary, "rgb"),
        exRadius: binary.readFloat32(),
        exFrequency: binary.readFloat32(),
        exSize: binary.readFloat32(),
        exSpeed: binary.readFloat32(),
        exFlareSize: binary.readFloat32()
      };
      binary.readFloat32Array(24);
      const flags = binary.readInt32();
      binary.readInt32Array(31);
      return {
        ...dataBlock1,
        ...dataBlock2,
        flags
      };
    }
    static accumulateFrom(light) {
      const buffer = new Uint8Array(_Light.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeVector3(light.pos);
      binary.writeBuffer(Color.accumulateFrom(light.color, "rgb"));
      binary.writeFloat32(light.fallStart);
      binary.writeFloat32(light.fallEnd);
      binary.writeFloat32(light.intensity);
      binary.writeFloat32(0);
      binary.writeBuffer(Color.accumulateFrom(light.exFlicker, "rgb"));
      binary.writeFloat32(light.exRadius);
      binary.writeFloat32(light.exFrequency);
      binary.writeFloat32(light.exSize);
      binary.writeFloat32(clamp2(0, Number.MAX_SAFE_INTEGER, light.exSpeed));
      binary.writeFloat32(light.exFlareSize);
      binary.writeFloat32Array(repeat2(0, 24));
      binary.writeInt32(light.flags);
      binary.writeInt32Array(repeat2(0, 31));
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfVector3() + Color.sizeOf("rgb") * 2 + BinaryIO.sizeOfFloat32Array(9 + 24) + BinaryIO.sizeOfInt32Array(32);
    }
  };

  // node_modules/arx-convert/dist/llf/LightingHeader.js
  var LightingHeader = class _LightingHeader {
    static readFrom(binary) {
      const numberOfColors = binary.readInt32();
      binary.readInt32();
      binary.readInt32();
      binary.readInt32();
      return {
        numberOfColors
      };
    }
    static accumulateFrom(colors) {
      const buffer = new Uint8Array(_LightingHeader.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeInt32(colors.length);
      binary.writeInt32(0);
      binary.writeInt32(63);
      binary.writeInt32(0);
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfInt32() * 4;
    }
  };

  // node_modules/arx-convert/dist/llf/LlfHeader.js
  var LlfHeader = class _LlfHeader {
    static readFrom(binary) {
      binary.readFloat32();
      binary.readString(16);
      const dataBlock = {
        lastUser: binary.readString(256),
        time: binary.readInt32(),
        numberOfLights: binary.readInt32()
      };
      binary.readInt32();
      binary.readInt32();
      const numberOfBackgroundPolygons = binary.readInt32();
      binary.readInt32Array(256);
      binary.readFloat32Array(256);
      binary.readString(4096);
      binary.readInt32Array(256);
      return {
        ...dataBlock,
        numberOfBackgroundPolygons
      };
    }
    static accumulateFrom(json) {
      const buffer = new Uint8Array(_LlfHeader.sizeOf());
      const binary = new BinaryIO(buffer);
      binary.writeFloat32(DANAE_VERSION);
      binary.writeString("DANAE_LLH_FILE", 16);
      binary.writeString(json.header.lastUser, 256);
      binary.writeInt32(json.header.time);
      binary.writeInt32(json.lights.length);
      binary.writeInt32(0);
      binary.writeInt32(0);
      binary.writeInt32(json.header.numberOfBackgroundPolygons);
      binary.writeInt32Array(repeat2(0, 256));
      binary.writeFloat32Array(repeat2(0, 256));
      binary.writeString("", 4096);
      binary.writeInt32Array(repeat2(0, 256));
      return buffer;
    }
    static sizeOf() {
      return BinaryIO.sizeOfFloat32() + BinaryIO.sizeOfString(16 + 256) + BinaryIO.sizeOfInt32Array(5 + 256) + BinaryIO.sizeOfFloat32Array(256) + BinaryIO.sizeOfString(4096) + BinaryIO.sizeOfInt32Array(256);
    }
  };

  // node_modules/arx-convert/dist/llf/LLF.js
  var LLF = class {
    static load(decompressedFile) {
      const file = new BinaryIO(decompressedFile);
      const { numberOfLights, ...header } = LlfHeader.readFrom(file);
      const lights = times(() => {
        return Light.readFrom(file);
      }, numberOfLights);
      const { numberOfColors } = LightingHeader.readFrom(file);
      const colors = times(() => {
        return Color.readFrom(file, "bgra");
      }, numberOfColors);
      return {
        header,
        lights,
        colors
      };
    }
    static save(json) {
      const header = LlfHeader.accumulateFrom(json);
      const lights = concatUint8Arrays(json.lights.map(Light.accumulateFrom));
      const lightingHeader = LightingHeader.accumulateFrom(json.colors);
      const colors = concatUint8Arrays(json.colors.map((color) => {
        return Color.accumulateFrom(color, "bgra");
      }));
      return concatUint8Arrays([header, lights, lightingHeader, colors]);
    }
  };

  // node_modules/arx-convert/dist/ftl/Face.js
  var ArxFaceType;
  (function(ArxFaceType2) {
    ArxFaceType2[ArxFaceType2["Flat"] = 0] = "Flat";
    ArxFaceType2[ArxFaceType2["Text"] = 1] = "Text";
    ArxFaceType2[ArxFaceType2["DoubleSided"] = 2] = "DoubleSided";
  })(ArxFaceType || (ArxFaceType = {}));

  // node_modules/arx-convert/dist/amb/Setting.js
  var ArxSettingFlag;
  (function(ArxSettingFlag2) {
    ArxSettingFlag2[ArxSettingFlag2["None"] = 0] = "None";
    ArxSettingFlag2[ArxSettingFlag2["Random"] = 1] = "Random";
    ArxSettingFlag2[ArxSettingFlag2["Interpolate"] = 2] = "Interpolate";
  })(ArxSettingFlag || (ArxSettingFlag = {}));

  // node_modules/arx-convert/dist/amb/Track.js
  var ArxTrackFlags;
  (function(ArxTrackFlags2) {
    ArxTrackFlags2[ArxTrackFlags2["None"] = 0] = "None";
    ArxTrackFlags2[ArxTrackFlags2["Position"] = 1] = "Position";
    ArxTrackFlags2[ArxTrackFlags2["Master"] = 4] = "Master";
    ArxTrackFlags2[ArxTrackFlags2["Paused"] = 16] = "Paused";
    ArxTrackFlags2[ArxTrackFlags2["Prefetched"] = 32] = "Prefetched";
  })(ArxTrackFlags || (ArxTrackFlags = {}));

  // src/index.ts
  var import_jszip = __toESM(require_jszip_min(), 1);

  // src/functions.ts
  function downloadAs(filename, data) {
    const link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", filename);
    link.style.display = "none";
    document.body.append(link);
    link.click();
    link.remove();
  }
  function downloadBinaryAs(filename, data, mimeType) {
    let url;
    if (mimeType === void 0) {
      url = URL.createObjectURL(new Blob([data]));
    } else {
      url = URL.createObjectURL(new Blob([data], { type: mimeType }));
    }
    downloadAs(filename, url);
    URL.revokeObjectURL(url);
  }
  function concatArrayBuffers2(buffers) {
    if (buffers.length === 0) {
      return new ArrayBuffer(0);
    }
    const totalLength = buffers.reduce((sum, buffer) => {
      return sum + buffer.byteLength;
    }, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    buffers.forEach((buffer) => {
      combinedBuffer.set(new Uint8Array(buffer), offset);
      offset = offset + buffer.byteLength;
    });
    return combinedBuffer.buffer;
  }
  function times2(fn, repetitions) {
    return Array.from({ length: repetitions }).map((value, index) => {
      return fn(index);
    });
  }

  // src/index.ts
  document.getElementById("download")?.addEventListener("click", async () => {
    const now = Math.floor(Date.now() / 1e3);
    const llfData = {
      header: {
        lastUser: "Arx Browser Editor",
        time: now,
        numberOfBackgroundPolygons: 1
      },
      colors: [
        { r: 255, g: 255, b: 255, a: 1 },
        { r: 255, g: 255, b: 255, a: 1 },
        { r: 255, g: 255, b: 255, a: 1 },
        { r: 255, g: 255, b: 255, a: 1 }
      ],
      lights: []
    };
    const llf = LLF.save(llfData).buffer;
    const rawLlf = implode(llf, "binary", "large");
    const dlfData = {
      header: {
        lastUser: "Arx Browser Editor",
        time: now,
        posEdit: { x: 0, y: -180, z: 0 },
        angleEdit: { a: 0, b: 0, g: 0 },
        numberOfBackgroundPolygons: 1
      },
      scene: {
        levelIdx: 1
      },
      interactiveObjects: [],
      fogs: [],
      paths: [],
      zones: []
    };
    const dlf = DLF.save(dlfData).buffer;
    const dlfHeader = new Uint8Array(dlf).slice(0, 8520);
    const dlfBody = new Uint8Array(dlf).slice(8520);
    const rawDlf = concatArrayBuffers2([dlfHeader, implode(dlfBody, "binary", "large")]);
    const ftsData = {
      header: {
        levelIdx: 1
      },
      uniqueHeaders: [],
      sceneHeader: {
        mScenePosition: { x: 6e3, y: -170, z: 6e3 }
      },
      cells: times2(() => {
        return {};
      }, 160 * 160),
      anchors: [],
      portals: [],
      rooms: [
        {
          portals: [],
          polygons: []
        },
        {
          portals: [],
          polygons: [
            {
              cellX: 60,
              cellY: 59,
              polygonIdx: 0
            }
          ]
        }
      ],
      roomDistances: [
        {
          distance: -1,
          startPosition: { x: 0, y: 0, z: 0 },
          endPosition: { x: 1, y: 0, z: 0 }
        },
        {
          distance: -1,
          startPosition: { x: 0, y: 0, z: 0 },
          endPosition: { x: 0, y: 1, z: 0 }
        },
        {
          distance: -1,
          startPosition: { x: 0.984375, y: 0.984375, z: 0 },
          endPosition: { x: 0, y: 0, z: 0 }
        },
        {
          distance: -1,
          startPosition: { x: 0, y: 0, z: 0 },
          endPosition: { x: 0, y: 0, z: 0 }
        }
      ],
      polygons: [
        {
          vertices: [
            { x: 6050, y: 0, z: 5950, u: 1, v: 1 },
            { x: 6050, y: 0, z: 6050, u: 1, v: 0 },
            { x: 5950, y: 0, z: 5950, u: 0, v: 1 },
            { x: 5950, y: 0, z: 6050, u: 0, v: 0 }
          ],
          norm: { x: 0, y: -1, z: 0 },
          norm2: { x: 0, y: -1, z: 0 },
          textureContainerId: 1,
          flags: 64,
          transval: 0,
          area: 1e4,
          room: 1
        }
      ],
      textureContainers: [
        {
          id: 1,
          filename: "L1_PRISON_[STONE]_GROUND19.jpg"
        }
      ]
    };
    const fts = FTS.save(ftsData).buffer;
    const ftsHeader = new Uint8Array(fts).slice(0, 280 + 768 * ftsData.uniqueHeaders.length);
    const ftsBody = new Uint8Array(fts).slice(280 + 768 * ftsData.uniqueHeaders.length);
    const rawFts = concatArrayBuffers2([ftsHeader, implode(ftsBody, "binary", "large")]);
    const zip = new import_jszip.default();
    zip.file("game/graph/levels/level1/fast.fts", rawFts);
    zip.file("graph/levels/level1/level1.dlf", rawDlf);
    zip.file("graph/levels/level1/level1.llf", rawLlf);
    const content = await zip.generateAsync({ type: "blob" });
    downloadBinaryAs(`map-${now}.zip`, content, "application/zip" /* ZIP */);
  });
})();
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
*/
