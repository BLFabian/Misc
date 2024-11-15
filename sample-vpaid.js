/*!
 * @zentrick/vpaid-example v0.20.1
 * Copyright (c) 2019 Zentrick nv (https://www.zentrick.com/)
 *
 * Includes:
 * - https://www.npmjs.com/package/bowser
 * - https://www.npmjs.com/package/camelcase
 * - https://www.npmjs.com/package/delay
 * - https://www.npmjs.com/package/es6-error
 * - https://www.npmjs.com/package/json-stringify-safe
 * - https://www.npmjs.com/package/p-defer
 * - https://www.npmjs.com/package/p-finally
 * - https://www.npmjs.com/package/promise-queue
 * - https://www.npmjs.com/package/protochain
 * - https://www.npmjs.com/package/upper-case-first
 */
!(function () {
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1;
      i.configurable = !0;
      "value" in i && (i.writable = !0);
      Object.defineProperty(e, i.key, i);
    }
  }
  function t(t, n, i) {
    n && e(t.prototype, n);
    i && e(t, i);
    return t;
  }
  function n(e, t) {
    return e((t = { exports: {} }), t.exports), t.exports;
  }
  function i(e) {
    var t, n;
    this.promise = new e(function (e, i) {
      if (void 0 !== t || void 0 !== n)
        throw TypeError("Bad Promise constructor");
      t = e;
      n = i;
    });
    this.resolve = x(t);
    this.reject = x(n);
  }
  function r(e, t) {
    if (!e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
  }
  Function.prototype.$asyncbind = function e(t, n) {
    "use strict";
    function i() {
      return r.apply(t, arguments);
    }
    Function.prototype.$asyncbind ||
      Object.defineProperty(Function.prototype, "$asyncbind", {
        value: e,
        enumerable: !1,
        configurable: !0,
        writable: !0,
      });
    e.trampoline ||
      (e.trampoline = function (e, t, n, i, r) {
        return function o(s) {
          for (; s; ) {
            if (s.then) {
              s = s.then(o, i);
              return r ? void 0 : s;
            }
            try {
              if (s.pop) {
                if (s.length) return s.pop() ? t.call(e) : s;
                s = n;
              } else s = s.call(e);
            } catch (e) {
              return i(e);
            }
          }
        };
      });
    if (!e.LazyThenable) {
      e.LazyThenable = (function () {
        function e(e) {
          return e && e instanceof Object && "function" == typeof e.then;
        }
        function t(n, i, r) {
          try {
            var o = r ? r(i) : i;
            if (n === o)
              return n.reject(new TypeError("Promise resolution loop"));
            e(o)
              ? o.then(
                  function (e) {
                    t(n, e);
                  },
                  function (e) {
                    n.reject(e);
                  },
                )
              : n.resolve(o);
          } catch (e) {
            n.reject(e);
          }
        }
        function n(e) {}
        function i() {}
        function r(n, r) {
          var o = new i();
          try {
            this._resolver(
              function (i) {
                return e(i) ? i.then(n, r) : t(o, i, n);
              },
              function (e) {
                t(o, e, r);
              },
            );
          } catch (e) {
            t(o, e, r);
          }
          return o;
        }
        function o(e) {
          this._resolver = e;
          this.then = r;
        }
        i.prototype = {
          resolve: n,
          reject: n,
          then: function (e, t) {
            this.resolve = e;
            this.reject = t;
          },
        };
        o.resolve = function (e) {
          return o.isThenable(e)
            ? e
            : {
                then: function (t) {
                  return t(e);
                },
              };
        };
        o.isThenable = e;
        return o;
      })();
      e.EagerThenable = e.Thenable = (e.EagerThenableFactory = function (e) {
        function t(e) {
          if (e) {
            var t = this;
            e(
              function (e) {
                t.resolve(e);
              },
              function (e) {
                t.reject(e);
              },
            );
          }
        }
        function n(e, t) {
          if ("function" == typeof e.y)
            try {
              var n = e.y.call(void 0, t);
              e.p.resolve(n);
            } catch (t) {
              e.p.reject(t);
            }
          else e.p.resolve(t);
        }
        function i(e, t) {
          if ("function" == typeof e.n)
            try {
              var n = e.n.call(void 0, t);
              e.p.resolve(n);
            } catch (t) {
              e.p.reject(t);
            }
          else e.p.reject(t);
        }
        e =
          e ||
          ("object" == typeof qt && qt.nextTick) ||
          ("function" == typeof setImmediate && setImmediate) ||
          function (e) {
            setTimeout(e, 0);
          };
        var r = (function () {
          function t() {
            for (; n.length - i; ) {
              try {
                n[i]();
              } catch (e) {}
              n[i++] = void 0;
              if (i === r) {
                n.splice(0, r);
                i = 0;
              }
            }
          }
          var n = [],
            i = 0,
            r = 1024;
          return function (r) {
            n.push(r);
            n.length - i == 1 && e(t);
          };
        })();
        t.prototype = {
          resolve: function (e) {
            if (void 0 === this.state) {
              if (e === this)
                return this.reject(
                  new TypeError("Attempt to resolve promise with self"),
                );
              var t = this;
              if (e && ("function" == typeof e || "object" == typeof e))
                try {
                  var i = 0,
                    o = e.then;
                  if ("function" == typeof o) {
                    o.call(
                      e,
                      function (e) {
                        i++ || t.resolve(e);
                      },
                      function (e) {
                        i++ || t.reject(e);
                      },
                    );
                    return;
                  }
                } catch (e) {
                  i || this.reject(e);
                  return;
                }
              this.state = n;
              this.v = e;
              t.c &&
                r(function () {
                  for (var i = 0, r = t.c.length; i < r; i++) n(t.c[i], e);
                });
            }
          },
          reject: function (e) {
            if (void 0 === this.state) {
              this.state = i;
              this.v = e;
              var t = this.c;
              t &&
                r(function () {
                  for (var n = 0, r = t.length; n < r; n++) i(t[n], e);
                });
            }
          },
          then: function (e, n) {
            var i = new t(),
              o = { y: e, n: n, p: i };
            if (void 0 === this.state) this.c ? this.c.push(o) : (this.c = [o]);
            else {
              var s = this.state,
                u = this.v;
              r(function () {
                s(o, u);
              });
            }
            return i;
          },
        };
        t.resolve = function (e) {
          if (e && e instanceof t) return e;
          var n = new t();
          n.resolve(e);
          return n;
        };
        t.reject = function (e) {
          if (e && e instanceof t) return e;
          var n = new t();
          n.reject(e);
          return n;
        };
        t.version = "2.3.3-nodent";
        return t;
      })();
    }
    var r = this;
    switch (n) {
      case !0:
        return new e.Thenable(i);
      case 0:
        return new e.LazyThenable(i);
      case void 0:
        i.then = i;
        return i;
      default:
        return function () {
          try {
            return r.apply(t, arguments);
          } catch (e) {
            return n(e);
          }
        };
    }
  };
  var o =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : {},
    s = n(function (e) {
      var t = (e.exports =
        "undefined" != typeof window && window.Math == Math
          ? window
          : "undefined" != typeof self && self.Math == Math
            ? self
            : Function("return this")());
      "number" == typeof __g && (__g = t);
    }),
    u = {}.hasOwnProperty,
    a = function (e, t) {
      return u.call(e, t);
    },
    c = function (e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    },
    l = !c(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
    f = n(function (e) {
      var t = (e.exports = { version: "2.5.7" });
      "number" == typeof __e && (__e = t);
    }),
    d =
      (f.version,
      function (e) {
        return "object" == typeof e ? null !== e : "function" == typeof e;
      }),
    h = function (e) {
      if (!d(e)) throw TypeError(e + " is not an object!");
      return e;
    },
    p = s.document,
    v = d(p) && d(p.createElement),
    m = function (e) {
      return v ? p.createElement(e) : {};
    },
    y =
      !l &&
      !c(function () {
        return (
          7 !=
          Object.defineProperty(m("div"), "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    b = function (e, t) {
      if (!d(e)) return e;
      var n, i;
      if (t && "function" == typeof (n = e.toString) && !d((i = n.call(e))))
        return i;
      if ("function" == typeof (n = e.valueOf) && !d((i = n.call(e)))) return i;
      if (!t && "function" == typeof (n = e.toString) && !d((i = n.call(e))))
        return i;
      throw TypeError("Can't convert object to primitive value");
    },
    g = Object.defineProperty,
    _ = {
      f: l
        ? Object.defineProperty
        : function (e, t, n) {
            h(e);
            t = b(t, !0);
            h(n);
            if (y)
              try {
                return g(e, t, n);
              } catch (e) {}
            if ("get" in n || "set" in n)
              throw TypeError("Accessors not supported!");
            "value" in n && (e[t] = n.value);
            return e;
          },
    },
    w = function (e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t,
      };
    },
    S = l
      ? function (e, t, n) {
          return _.f(e, t, w(1, n));
        }
      : function (e, t, n) {
          e[t] = n;
          return e;
        },
    A = 0,
    k = Math.random(),
    O = function (e) {
      return "Symbol(".concat(
        void 0 === e ? "" : e,
        ")_",
        (++A + k).toString(36),
      );
    },
    E = n(function (e) {
      var t = O("src"),
        n = Function.toString,
        i = ("" + n).split("toString");
      f.inspectSource = function (e) {
        return n.call(e);
      };
      (e.exports = function (e, n, r, o) {
        var u = "function" == typeof r;
        u && (a(r, "name") || S(r, "name", n));
        if (e[n] !== r) {
          u && (a(r, t) || S(r, t, e[n] ? "" + e[n] : i.join(String(n))));
          if (e === s) e[n] = r;
          else if (o) e[n] ? (e[n] = r) : S(e, n, r);
          else {
            delete e[n];
            S(e, n, r);
          }
        }
      })(Function.prototype, "toString", function () {
        return ("function" == typeof this && this[t]) || n.call(this);
      });
    }),
    x = function (e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e;
    },
    P = function (e, t, n) {
      x(e);
      if (void 0 === t) return e;
      switch (n) {
        case 1:
          return function (n) {
            return e.call(t, n);
          };
        case 2:
          return function (n, i) {
            return e.call(t, n, i);
          };
        case 3:
          return function (n, i, r) {
            return e.call(t, n, i, r);
          };
      }
      return function () {
        return e.apply(t, arguments);
      };
    },
    T = function (e, t, n) {
      var i,
        r,
        o,
        u,
        a = e & T.F,
        c = e & T.G,
        l = e & T.S,
        d = e & T.P,
        h = e & T.B,
        p = c ? s : l ? s[t] || (s[t] = {}) : (s[t] || {}).prototype,
        v = c ? f : f[t] || (f[t] = {}),
        m = v.prototype || (v.prototype = {});
      c && (n = t);
      for (i in n) {
        o = ((r = !a && p && void 0 !== p[i]) ? p : n)[i];
        u =
          h && r
            ? P(o, s)
            : d && "function" == typeof o
              ? P(Function.call, o)
              : o;
        p && E(p, i, o, e & T.U);
        v[i] != o && S(v, i, u);
        d && m[i] != o && (m[i] = o);
      }
    };
  s.core = f;
  T.F = 1;
  T.G = 2;
  T.S = 4;
  T.P = 8;
  T.B = 16;
  T.W = 32;
  T.U = 64;
  T.R = 128;
  var j = T,
    C = n(function (e) {
      var t = O("meta"),
        n = _.f,
        i = 0,
        r =
          Object.isExtensible ||
          function () {
            return !0;
          },
        o = !c(function () {
          return r(Object.preventExtensions({}));
        }),
        s = function (e) {
          n(e, t, { value: { i: "O" + ++i, w: {} } });
        },
        u = (e.exports = {
          KEY: t,
          NEED: !1,
          fastKey: function (e, n) {
            if (!d(e))
              return "symbol" == typeof e
                ? e
                : ("string" == typeof e ? "S" : "P") + e;
            if (!a(e, t)) {
              if (!r(e)) return "F";
              if (!n) return "E";
              s(e);
            }
            return e[t].i;
          },
          getWeak: function (e, n) {
            if (!a(e, t)) {
              if (!r(e)) return !0;
              if (!n) return !1;
              s(e);
            }
            return e[t].w;
          },
          onFreeze: function (e) {
            o && u.NEED && r(e) && !a(e, t) && s(e);
            return e;
          },
        });
    }),
    F =
      (C.KEY,
      C.NEED,
      C.fastKey,
      C.getWeak,
      C.onFreeze,
      n(function (e) {
        var t = s["__core-js_shared__"] || (s["__core-js_shared__"] = {});
        (e.exports = function (e, n) {
          return t[e] || (t[e] = void 0 !== n ? n : {});
        })("versions", []).push({
          version: f.version,
          mode: "global",
          copyright: "Â© 2018 Denis Pushkarev (zloirock.ru)",
        });
      })),
    M = n(function (e) {
      var t = F("wks"),
        n = s.Symbol,
        i = "function" == typeof n;
      (e.exports = function (e) {
        return t[e] || (t[e] = (i && n[e]) || (i ? n : O)("Symbol." + e));
      }).store = t;
    }),
    V = _.f,
    L = M("toStringTag"),
    z = function (e, t, n) {
      e &&
        !a((e = n ? e : e.prototype), L) &&
        V(e, L, { configurable: !0, value: t });
    },
    I = { f: M },
    D = _.f,
    N = function (e) {
      var t = f.Symbol || (f.Symbol = s.Symbol || {});
      "_" == e.charAt(0) || e in t || D(t, e, { value: I.f(e) });
    },
    R = {}.toString,
    B = function (e) {
      return R.call(e).slice(8, -1);
    },
    q = Object("z").propertyIsEnumerable(0)
      ? Object
      : function (e) {
          return "String" == B(e) ? e.split("") : Object(e);
        },
    U = function (e) {
      if (null == e) throw TypeError("Can't call method on  " + e);
      return e;
    },
    W = function (e) {
      return q(U(e));
    },
    Q = Math.ceil,
    G = Math.floor,
    K = function (e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? G : Q)(e);
    },
    H = Math.min,
    J = function (e) {
      return e > 0 ? H(K(e), 9007199254740991) : 0;
    },
    X = Math.max,
    $ = Math.min,
    Y = F("keys"),
    Z = function (e) {
      return Y[e] || (Y[e] = O(e));
    },
    ee = function (e, t, n) {
      for (
        var i = W(e),
          r = J(i.length),
          o = (function (e, t) {
            return (e = K(e)) < 0 ? X(e + t, 0) : $(e, t);
          })(n, r);
        r > o;
        o++
      )
        if (o in i && i[o] === t) return o || 0;
      return -1;
    },
    te = Z("IE_PROTO"),
    ne = function (e, t) {
      var n,
        i = W(e),
        r = 0,
        o = [];
      for (n in i) n != te && a(i, n) && o.push(n);
      for (; t.length > r; ) a(i, (n = t[r++])) && (~ee(o, n) || o.push(n));
      return o;
    },
    ie =
      "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
        ",",
      ),
    re =
      Object.keys ||
      function (e) {
        return ne(e, ie);
      },
    oe = { f: Object.getOwnPropertySymbols },
    se = { f: {}.propertyIsEnumerable },
    ue =
      Array.isArray ||
      function (e) {
        return "Array" == B(e);
      },
    ae = l
      ? Object.defineProperties
      : function (e, t) {
          h(e);
          for (var n, i = re(t), r = i.length, o = 0; r > o; )
            _.f(e, (n = i[o++]), t[n]);
          return e;
        },
    ce = s.document,
    le = ce && ce.documentElement,
    fe = Z("IE_PROTO"),
    de = function () {},
    he = function () {
      var e,
        t = m("iframe"),
        n = ie.length;
      t.style.display = "none";
      le.appendChild(t);
      t.src = "javascript:";
      (e = t.contentWindow.document).open();
      e.write("<script>document.F=Object</script>");
      e.close();
      he = e.F;
      for (; n--; ) delete he.prototype[ie[n]];
      return he();
    },
    pe =
      Object.create ||
      function (e, t) {
        var n;
        if (null !== e) {
          de.prototype = h(e);
          n = new de();
          de.prototype = null;
          n[fe] = e;
        } else n = he();
        return void 0 === t ? n : ae(n, t);
      },
    ve = ie.concat("length", "prototype"),
    me = {
      f:
        Object.getOwnPropertyNames ||
        function (e) {
          return ne(e, ve);
        },
    },
    ye = me.f,
    be = {}.toString,
    ge =
      "object" == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : [],
    _e = {
      f: function (e) {
        return ge && "[object Window]" == be.call(e)
          ? (function (e) {
              try {
                return ye(e);
              } catch (e) {
                return ge.slice();
              }
            })(e)
          : ye(W(e));
      },
    },
    we = Object.getOwnPropertyDescriptor,
    Se = {
      f: l
        ? we
        : function (e, t) {
            e = W(e);
            t = b(t, !0);
            if (y)
              try {
                return we(e, t);
              } catch (e) {}
            if (a(e, t)) return w(!se.f.call(e, t), e[t]);
          },
    },
    Ae = C.KEY,
    ke = Se.f,
    Oe = _.f,
    Ee = _e.f,
    xe = s.Symbol,
    Pe = s.JSON,
    Te = Pe && Pe.stringify,
    je = M("_hidden"),
    Ce = M("toPrimitive"),
    Fe = {}.propertyIsEnumerable,
    Me = F("symbol-registry"),
    Ve = F("symbols"),
    Le = F("op-symbols"),
    ze = Object.prototype,
    Ie = "function" == typeof xe,
    De = s.QObject,
    Ne = !De || !De.prototype || !De.prototype.findChild,
    Re =
      l &&
      c(function () {
        return (
          7 !=
          pe(
            Oe({}, "a", {
              get: function () {
                return Oe(this, "a", { value: 7 }).a;
              },
            }),
          ).a
        );
      })
        ? function (e, t, n) {
            var i = ke(ze, t);
            i && delete ze[t];
            Oe(e, t, n);
            i && e !== ze && Oe(ze, t, i);
          }
        : Oe,
    Be = function (e) {
      var t = (Ve[e] = pe(xe.prototype));
      t._k = e;
      return t;
    },
    qe =
      Ie && "symbol" == typeof xe.iterator
        ? function (e) {
            return "symbol" == typeof e;
          }
        : function (e) {
            return e instanceof xe;
          },
    Ue = function (e, t, n) {
      e === ze && Ue(Le, t, n);
      h(e);
      t = b(t, !0);
      h(n);
      if (a(Ve, t)) {
        if (n.enumerable) {
          a(e, je) && e[je][t] && (e[je][t] = !1);
          n = pe(n, { enumerable: w(0, !1) });
        } else {
          a(e, je) || Oe(e, je, w(1, {}));
          e[je][t] = !0;
        }
        return Re(e, t, n);
      }
      return Oe(e, t, n);
    },
    We = function (e, t) {
      h(e);
      for (
        var n,
          i = (function (e) {
            var t = re(e),
              n = oe.f;
            if (n)
              for (var i, r = n(e), o = se.f, s = 0; r.length > s; )
                o.call(e, (i = r[s++])) && t.push(i);
            return t;
          })((t = W(t))),
          r = 0,
          o = i.length;
        o > r;

      )
        Ue(e, (n = i[r++]), t[n]);
      return e;
    },
    Qe = function (e) {
      var t = Fe.call(this, (e = b(e, !0)));
      return (
        !(this === ze && a(Ve, e) && !a(Le, e)) &&
        (!(t || !a(this, e) || !a(Ve, e) || (a(this, je) && this[je][e])) || t)
      );
    },
    Ge = function (e, t) {
      e = W(e);
      t = b(t, !0);
      if (e !== ze || !a(Ve, t) || a(Le, t)) {
        var n = ke(e, t);
        !n || !a(Ve, t) || (a(e, je) && e[je][t]) || (n.enumerable = !0);
        return n;
      }
    },
    Ke = function (e) {
      for (var t, n = Ee(W(e)), i = [], r = 0; n.length > r; )
        a(Ve, (t = n[r++])) || t == je || t == Ae || i.push(t);
      return i;
    },
    He = function (e) {
      for (
        var t, n = e === ze, i = Ee(n ? Le : W(e)), r = [], o = 0;
        i.length > o;

      )
        !a(Ve, (t = i[o++])) || (n && !a(ze, t)) || r.push(Ve[t]);
      return r;
    };
  if (!Ie) {
    E(
      (xe = function () {
        if (this instanceof xe) throw TypeError("Symbol is not a constructor!");
        var e = O(arguments.length > 0 ? arguments[0] : void 0),
          t = function (n) {
            this === ze && t.call(Le, n);
            a(this, je) && a(this[je], e) && (this[je][e] = !1);
            Re(this, e, w(1, n));
          };
        l && Ne && Re(ze, e, { configurable: !0, set: t });
        return Be(e);
      }).prototype,
      "toString",
      function () {
        return this._k;
      },
    );
    Se.f = Ge;
    _.f = Ue;
    me.f = _e.f = Ke;
    se.f = Qe;
    oe.f = He;
    l && E(ze, "propertyIsEnumerable", Qe, !0);
    I.f = function (e) {
      return Be(M(e));
    };
  }
  j(j.G + j.W + j.F * !Ie, { Symbol: xe });
  for (
    var Je =
        "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
          ",",
        ),
      Xe = 0;
    Je.length > Xe;

  )
    M(Je[Xe++]);
  for (var $e = re(M.store), Ye = 0; $e.length > Ye; ) N($e[Ye++]);
  j(j.S + j.F * !Ie, "Symbol", {
    for: function (e) {
      return a(Me, (e += "")) ? Me[e] : (Me[e] = xe(e));
    },
    keyFor: function (e) {
      if (!qe(e)) throw TypeError(e + " is not a symbol!");
      for (var t in Me) if (Me[t] === e) return t;
    },
    useSetter: function () {
      Ne = !0;
    },
    useSimple: function () {
      Ne = !1;
    },
  });
  j(j.S + j.F * !Ie, "Object", {
    create: function (e, t) {
      return void 0 === t ? pe(e) : We(pe(e), t);
    },
    defineProperty: Ue,
    defineProperties: We,
    getOwnPropertyDescriptor: Ge,
    getOwnPropertyNames: Ke,
    getOwnPropertySymbols: He,
  });
  Pe &&
    j(
      j.S +
        j.F *
          (!Ie ||
            c(function () {
              var e = xe();
              return (
                "[null]" != Te([e]) ||
                "{}" != Te({ a: e }) ||
                "{}" != Te(Object(e))
              );
            })),
      "JSON",
      {
        stringify: function (e) {
          for (var t, n, i = [e], r = 1; arguments.length > r; )
            i.push(arguments[r++]);
          n = t = i[1];
          if ((d(t) || void 0 !== e) && !qe(e)) {
            ue(t) ||
              (t = function (e, t) {
                "function" == typeof n && (t = n.call(this, e, t));
                if (!qe(t)) return t;
              });
            i[1] = t;
            return Te.apply(Pe, i);
          }
        },
      },
    );
  xe.prototype[Ce] || S(xe.prototype, Ce, xe.prototype.valueOf);
  z(xe, "Symbol");
  z(Math, "Math", !0);
  z(s.JSON, "JSON", !0);
  var Ze = M("unscopables"),
    et = Array.prototype;
  null == et[Ze] && S(et, Ze, {});
  var tt = function (e) {
      et[Ze][e] = !0;
    },
    nt = function (e, t) {
      return { value: t, done: !!e };
    },
    it = {},
    rt = {};
  S(rt, M("iterator"), function () {
    return this;
  });
  var ot,
    st,
    ut = function (e, t, n) {
      e.prototype = pe(rt, { next: w(1, n) });
      z(e, t + " Iterator");
    },
    at = function (e) {
      return Object(U(e));
    },
    ct = Z("IE_PROTO"),
    lt = Object.prototype,
    ft =
      Object.getPrototypeOf ||
      function (e) {
        e = at(e);
        return a(e, ct)
          ? e[ct]
          : "function" == typeof e.constructor && e instanceof e.constructor
            ? e.constructor.prototype
            : e instanceof Object
              ? lt
              : null;
      },
    dt = M("iterator"),
    ht = !([].keys && "next" in [].keys()),
    pt = function () {
      return this;
    },
    vt = function (e, t, n, i, r, o, s) {
      ut(n, t, i);
      var u,
        a,
        c,
        l = function (e) {
          if (!ht && e in p) return p[e];
          switch (e) {
            case "keys":
            case "values":
              return function () {
                return new n(this, e);
              };
          }
          return function () {
            return new n(this, e);
          };
        },
        f = t + " Iterator",
        d = "values" == r,
        h = !1,
        p = e.prototype,
        v = p[dt] || p["@@iterator"] || (r && p[r]),
        m = v || l(r),
        y = r ? (d ? l("entries") : m) : void 0,
        b = ("Array" == t && p.entries) || v;
      if (b && (c = ft(b.call(new e()))) !== Object.prototype && c.next) {
        z(c, f, !0);
        "function" != typeof c[dt] && S(c, dt, pt);
      }
      if (d && v && "values" !== v.name) {
        h = !0;
        m = function () {
          return v.call(this);
        };
      }
      (ht || h || !p[dt]) && S(p, dt, m);
      it[t] = m;
      it[f] = pt;
      if (r) {
        u = {
          values: d ? m : l("values"),
          keys: o ? m : l("keys"),
          entries: y,
        };
        if (s) for (a in u) a in p || E(p, a, u[a]);
        else j(j.P + j.F * (ht || h), t, u);
      }
      return u;
    },
    mt = vt(
      Array,
      "Array",
      function (e, t) {
        this._t = W(e);
        this._i = 0;
        this._k = t;
      },
      function () {
        var e = this._t,
          t = this._k,
          n = this._i++;
        if (!e || n >= e.length) {
          this._t = void 0;
          return nt(1);
        }
        return nt(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);
      },
      "values",
    );
  it.Arguments = it.Array;
  tt("keys");
  tt("values");
  tt("entries");
  for (
    var yt = M("iterator"),
      bt = M("toStringTag"),
      gt = it.Array,
      _t = {
        CSSRuleList: !0,
        CSSStyleDeclaration: !1,
        CSSValueList: !1,
        ClientRectList: !1,
        DOMRectList: !1,
        DOMStringList: !1,
        DOMTokenList: !0,
        DataTransferItemList: !1,
        FileList: !1,
        HTMLAllCollection: !1,
        HTMLCollection: !1,
        HTMLFormElement: !1,
        HTMLSelectElement: !1,
        MediaList: !0,
        MimeTypeArray: !1,
        NamedNodeMap: !1,
        NodeList: !0,
        PaintRequestList: !1,
        Plugin: !1,
        PluginArray: !1,
        SVGLengthList: !1,
        SVGNumberList: !1,
        SVGPathSegList: !1,
        SVGPointList: !1,
        SVGStringList: !1,
        SVGTransformList: !1,
        SourceBufferList: !1,
        StyleSheetList: !0,
        TextTrackCueList: !1,
        TextTrackList: !1,
        TouchList: !1,
      },
      wt = re(_t),
      St = 0;
    St < wt.length;
    St++
  ) {
    var At,
      kt = wt[St],
      Ot = _t[kt],
      Et = s[kt],
      xt = Et && Et.prototype;
    if (xt) {
      xt[yt] || S(xt, yt, gt);
      xt[bt] || S(xt, bt, kt);
      it[kt] = gt;
      if (Ot) for (At in mt) xt[At] || E(xt, At, mt[At], !0);
    }
  }
  (ot = (f.Object || {}).keys || Object.keys),
    (st = {
      keys: function (e) {
        return re(at(e));
      },
    }),
    j(
      j.S +
        j.F *
          c(function () {
            ot(1);
          }),
      "Object",
      st,
    );
  var Pt,
    Tt,
    jt,
    Ct = M("toStringTag"),
    Ft =
      "Arguments" ==
      B(
        (function () {
          return arguments;
        })(),
      ),
    Mt = function (e) {
      var t, n, i;
      return void 0 === e
        ? "Undefined"
        : null === e
          ? "Null"
          : "string" ==
              typeof (n = (function (e, t) {
                try {
                  return e[t];
                } catch (e) {}
              })((t = Object(e)), Ct))
            ? n
            : Ft
              ? B(t)
              : "Object" == (i = B(t)) && "function" == typeof t.callee
                ? "Arguments"
                : i;
    },
    Vt = function (e, t, n, i) {
      try {
        return i ? t(h(n)[0], n[1]) : t(n);
      } catch (t) {
        var r = e.return;
        void 0 !== r && h(r.call(e));
        throw t;
      }
    },
    Lt = M("iterator"),
    zt = Array.prototype,
    It = function (e) {
      return void 0 !== e && (it.Array === e || zt[Lt] === e);
    },
    Dt = M("iterator"),
    Nt = (f.getIteratorMethod = function (e) {
      if (null != e) return e[Dt] || e["@@iterator"] || it[Mt(e)];
    }),
    Rt = n(function (e) {
      var t = {},
        n = {},
        i = (e.exports = function (e, i, r, o, s) {
          var u,
            a,
            c,
            l,
            f = s
              ? function () {
                  return e;
                }
              : Nt(e),
            d = P(r, o, i ? 2 : 1),
            p = 0;
          if ("function" != typeof f) throw TypeError(e + " is not iterable!");
          if (It(f)) {
            for (u = J(e.length); u > p; p++)
              if (
                (l = i ? d(h((a = e[p]))[0], a[1]) : d(e[p])) === t ||
                l === n
              )
                return l;
          } else
            for (c = f.call(e); !(a = c.next()).done; )
              if ((l = Vt(c, d, a.value, i)) === t || l === n) return l;
        });
      i.BREAK = t;
      i.RETURN = n;
    }),
    Bt = M("species"),
    qt = s.process,
    Ut = s.setImmediate,
    Wt = s.clearImmediate,
    Qt = s.MessageChannel,
    Gt = s.Dispatch,
    Kt = 0,
    Ht = {},
    Jt = function () {
      var e = +this;
      if (Ht.hasOwnProperty(e)) {
        var t = Ht[e];
        delete Ht[e];
        t();
      }
    },
    Xt = function (e) {
      Jt.call(e.data);
    };
  if (!Ut || !Wt) {
    Ut = function (e) {
      for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
      Ht[++Kt] = function () {
        !(function (e, t, n) {
          switch (t.length) {
            case 0:
              return e();
            case 1:
              return e(t[0]);
            case 2:
              return e(t[0], t[1]);
            case 3:
              return e(t[0], t[1], t[2]);
            case 4:
              return e(t[0], t[1], t[2], t[3]);
          }
          e.apply(void 0, t);
        })("function" == typeof e ? e : Function(e), t);
      };
      Pt(Kt);
      return Kt;
    };
    Wt = function (e) {
      delete Ht[e];
    };
    if ("process" == B(qt))
      Pt = function (e) {
        qt.nextTick(P(Jt, e, 1));
      };
    else if (Gt && Gt.now)
      Pt = function (e) {
        Gt.now(P(Jt, e, 1));
      };
    else if (Qt) {
      jt = (Tt = new Qt()).port2;
      Tt.port1.onmessage = Xt;
      Pt = P(jt.postMessage, jt, 1);
    } else if (
      s.addEventListener &&
      "function" == typeof postMessage &&
      !s.importScripts
    ) {
      Pt = function (e) {
        s.postMessage(e + "", "*");
      };
      s.addEventListener("message", Xt, !1);
    } else
      Pt =
        "onreadystatechange" in m("script")
          ? function (e) {
              le.appendChild(m("script")).onreadystatechange = function () {
                le.removeChild(this);
                Jt.call(e);
              };
            }
          : function (e) {
              setTimeout(P(Jt, e, 1), 0);
            };
  }
  var $t = { set: Ut, clear: Wt },
    Yt = $t.set,
    Zt = s.MutationObserver || s.WebKitMutationObserver,
    en = s.process,
    tn = s.Promise,
    nn = "process" == B(en),
    rn = {
      f: function (e) {
        return new i(e);
      },
    },
    on = function (e) {
      try {
        return { e: !1, v: e() };
      } catch (e) {
        return { e: !0, v: e };
      }
    },
    sn = s.navigator,
    un = (sn && sn.userAgent) || "",
    an = M("species"),
    cn = M("iterator"),
    ln = !1;
  try {
    [7][cn]().return = function () {
      ln = !0;
    };
  } catch (e) {}
  var fn,
    dn,
    hn,
    pn,
    vn,
    mn = function (e, t) {
      if (!t && !ln) return !1;
      var n = !1;
      try {
        var i = [7],
          r = i[cn]();
        r.next = function () {
          return { done: (n = !0) };
        };
        i[cn] = function () {
          return r;
        };
        e(i);
      } catch (e) {}
      return n;
    },
    yn = $t.set,
    bn = (function () {
      var e,
        t,
        n,
        i = function () {
          var i, r;
          nn && (i = en.domain) && i.exit();
          for (; e; ) {
            r = e.fn;
            e = e.next;
            try {
              r();
            } catch (i) {
              e ? n() : (t = void 0);
              throw i;
            }
          }
          t = void 0;
          i && i.enter();
        };
      if (nn)
        n = function () {
          en.nextTick(i);
        };
      else if (!Zt || (s.navigator && s.navigator.standalone))
        if (tn && tn.resolve) {
          var r = tn.resolve(void 0);
          n = function () {
            r.then(i);
          };
        } else
          n = function () {
            Yt.call(s, i);
          };
      else {
        var o = !0,
          u = document.createTextNode("");
        new Zt(i).observe(u, { characterData: !0 });
        n = function () {
          u.data = o = !o;
        };
      }
      return function (i) {
        var r = { fn: i, next: void 0 };
        t && (t.next = r);
        if (!e) {
          e = r;
          n();
        }
        t = r;
      };
    })(),
    gn = s.TypeError,
    _n = s.process,
    wn = _n && _n.versions,
    Sn = (wn && wn.v8) || "",
    An = s.Promise,
    kn = "process" == Mt(_n),
    On = function () {},
    En = (dn = rn.f),
    xn = !!(function () {
      try {
        var e = An.resolve(1),
          t = ((e.constructor = {})[M("species")] = function (e) {
            e(On, On);
          });
        return (
          (kn || "function" == typeof PromiseRejectionEvent) &&
          e.then(On) instanceof t &&
          0 !== Sn.indexOf("6.6") &&
          -1 === un.indexOf("Chrome/66")
        );
      } catch (e) {}
    })(),
    Pn = function (e) {
      var t;
      return !(!d(e) || "function" != typeof (t = e.then)) && t;
    },
    Tn = function (e, t) {
      if (!e._n) {
        e._n = !0;
        var n = e._c;
        bn(function () {
          for (
            var i = e._v,
              r = 1 == e._s,
              o = 0,
              s = function (t) {
                var n,
                  o,
                  s,
                  u = r ? t.ok : t.fail,
                  a = t.resolve,
                  c = t.reject,
                  l = t.domain;
                try {
                  if (u) {
                    if (!r) {
                      2 == e._h && Fn(e);
                      e._h = 1;
                    }
                    if (!0 === u) n = i;
                    else {
                      l && l.enter();
                      n = u(i);
                      if (l) {
                        l.exit();
                        s = !0;
                      }
                    }
                    n === t.promise
                      ? c(gn("Promise-chain cycle"))
                      : (o = Pn(n))
                        ? o.call(n, a, c)
                        : a(n);
                  } else c(i);
                } catch (e) {
                  l && !s && l.exit();
                  c(e);
                }
              };
            n.length > o;

          )
            s(n[o++]);
          e._c = [];
          e._n = !1;
          t && !e._h && jn(e);
        });
      }
    },
    jn = function (e) {
      yn.call(s, function () {
        var t,
          n,
          i,
          r = e._v,
          o = Cn(e);
        if (o) {
          t = on(function () {
            kn
              ? _n.emit("unhandledRejection", r, e)
              : (n = s.onunhandledrejection)
                ? n({ promise: e, reason: r })
                : (i = s.console) &&
                  i.error &&
                  i.error("Unhandled promise rejection", r);
          });
          e._h = kn || Cn(e) ? 2 : 1;
        }
        e._a = void 0;
        if (o && t.e) throw t.v;
      });
    },
    Cn = function (e) {
      return 1 !== e._h && 0 === (e._a || e._c).length;
    },
    Fn = function (e) {
      yn.call(s, function () {
        var t;
        kn
          ? _n.emit("rejectionHandled", e)
          : (t = s.onrejectionhandled) && t({ promise: e, reason: e._v });
      });
    },
    Mn = function (e) {
      var t = this;
      if (!t._d) {
        t._d = !0;
        (t = t._w || t)._v = e;
        t._s = 2;
        t._a || (t._a = t._c.slice());
        Tn(t, !0);
      }
    },
    Vn = function (e) {
      var t,
        n = this;
      if (!n._d) {
        n._d = !0;
        n = n._w || n;
        try {
          if (n === e) throw gn("Promise can't be resolved itself");
          if ((t = Pn(e)))
            bn(function () {
              var i = { _w: n, _d: !1 };
              try {
                t.call(e, P(Vn, i, 1), P(Mn, i, 1));
              } catch (e) {
                Mn.call(i, e);
              }
            });
          else {
            n._v = e;
            n._s = 1;
            Tn(n, !1);
          }
        } catch (e) {
          Mn.call({ _w: n, _d: !1 }, e);
        }
      }
    };
  if (!xn) {
    An = function (e) {
      !(function (e, t, n, i) {
        if (!(e instanceof An) || "_h" in e)
          throw TypeError("Promise: incorrect invocation!");
      })(this);
      x(e);
      fn.call(this);
      try {
        e(P(Vn, this, 1), P(Mn, this, 1));
      } catch (e) {
        Mn.call(this, e);
      }
    };
    (fn = function (e) {
      this._c = [];
      this._a = void 0;
      this._s = 0;
      this._d = !1;
      this._v = void 0;
      this._h = 0;
      this._n = !1;
    }).prototype = (function (e, t, n) {
      for (var i in t) E(e, i, t[i], void 0);
      return e;
    })(An.prototype, {
      then: function (e, t) {
        var n,
          i,
          r,
          o = En(
            ((n = An),
            void 0 === (r = h(this).constructor) || null == (i = h(r)[Bt])
              ? n
              : x(i)),
          );
        o.ok = "function" != typeof e || e;
        o.fail = "function" == typeof t && t;
        o.domain = kn ? _n.domain : void 0;
        this._c.push(o);
        this._a && this._a.push(o);
        this._s && Tn(this, !1);
        return o.promise;
      },
      catch: function (e) {
        return this.then(void 0, e);
      },
    });
    hn = function () {
      var e = new fn();
      this.promise = e;
      this.resolve = P(Vn, e, 1);
      this.reject = P(Mn, e, 1);
    };
    rn.f = En = function (e) {
      return e === An || e === pn ? new hn(e) : dn(e);
    };
  }
  j(j.G + j.W + j.F * !xn, { Promise: An });
  z(An, "Promise");
  (vn = s.Promise),
    l &&
      vn &&
      !vn[an] &&
      _.f(vn, an, {
        configurable: !0,
        get: function () {
          return this;
        },
      });
  pn = f.Promise;
  j(j.S + j.F * !xn, "Promise", {
    reject: function (e) {
      var t = En(this);
      (0, t.reject)(e);
      return t.promise;
    },
  });
  j(j.S + j.F * !xn, "Promise", {
    resolve: function (e) {
      return (function (e, t) {
        h(e);
        if (d(t) && t.constructor === e) return t;
        var n = rn.f(e);
        (0, n.resolve)(t);
        return n.promise;
      })(this, e);
    },
  });
  j(
    j.S +
      j.F *
        !(
          xn &&
          mn(function (e) {
            An.all(e).catch(On);
          })
        ),
    "Promise",
    {
      all: function (e) {
        var t = this,
          n = En(t),
          i = n.resolve,
          r = n.reject,
          o = on(function () {
            var n = [],
              o = 0,
              s = 1;
            Rt(e, !1, function (e) {
              var u = o++,
                a = !1;
              n.push(void 0);
              s++;
              t.resolve(e).then(function (e) {
                if (!a) {
                  a = !0;
                  n[u] = e;
                  --s || i(n);
                }
              }, r);
            });
            --s || i(n);
          });
        o.e && r(o.v);
        return n.promise;
      },
      race: function (e) {
        var t = this,
          n = En(t),
          i = n.reject,
          r = on(function () {
            Rt(e, !1, function (e) {
              t.resolve(e).then(n.resolve, i);
            });
          });
        r.e && i(r.v);
        return n.promise;
      },
    },
  );
  var Ln = {};
  Ln[M("toStringTag")] = "z";
  Ln + "" != "[object z]" &&
    E(
      Object.prototype,
      "toString",
      function () {
        return "[object " + Mt(this) + "]";
      },
      !0,
    );
  var zn = _.f,
    In = Function.prototype,
    Dn = /^\s*function ([^ (]*)/;
  "name" in In ||
    (l &&
      zn(In, "name", {
        configurable: !0,
        get: function () {
          try {
            return ("" + this).match(Dn)[1];
          } catch (e) {
            return "";
          }
        },
      }));
  var Nn = Object.assign,
    Rn =
      !Nn ||
      c(function () {
        var e = {},
          t = {},
          n = Symbol(),
          i = "abcdefghijklmnopqrst";
        e[n] = 7;
        i.split("").forEach(function (e) {
          t[e] = e;
        });
        return 7 != Nn({}, e)[n] || Object.keys(Nn({}, t)).join("") != i;
      })
        ? function (e, t) {
            for (
              var n = at(e), i = arguments.length, r = 1, o = oe.f, s = se.f;
              i > r;

            )
              for (
                var u,
                  a = q(arguments[r++]),
                  c = o ? re(a).concat(o(a)) : re(a),
                  l = c.length,
                  f = 0;
                l > f;

              )
                s.call(a, (u = c[f++])) && (n[u] = a[u]);
            return n;
          }
        : Nn;
  j(j.S + j.F, "Object", { assign: Rn });
  var Bn,
    qn = -2,
    Un = {
      AdLoaded: "AdLoaded",
      AdStarted: "AdStarted",
      AdStopped: "AdStopped",
      AdSkipped: "AdSkipped",
      AdSkippableStateChange: "AdSkippableStateChange",
      AdSizeChange: "AdSizeChange",
      AdLinearChange: "AdLinearChange",
      AdDurationChange: "AdDurationChange",
      AdExpandedChange: "AdExpandedChange",
      AdRemainingTimeChange: "AdRemainingTimeChange",
      AdVolumeChange: "AdVolumeChange",
      AdImpression: "AdImpression",
      AdVideoStart: "AdVideoStart",
      AdVideoFirstQuartile: "AdVideoFirstQuartile",
      AdVideoMidpoint: "AdVideoMidpoint",
      AdVideoThirdQuartile: "AdVideoThirdQuartile",
      AdVideoComplete: "AdVideoComplete",
      AdClickThru: "AdClickThru",
      AdInteraction: "AdInteraction",
      AdUserAcceptInvitation: "AdUserAcceptInvitation",
      AdUserMinimize: "AdUserMinimize",
      AdUserClose: "AdUserClose",
      AdPaused: "AdPaused",
      AdPlaying: "AdPlaying",
      AdLog: "AdLog",
      AdError: "AdError",
    };
  ((Bn = {}).initAd = [Un.AdLoaded]),
    (Bn.resizeAd = [Un.AdSizeChange]),
    (Bn.startAd = [Un.AdStarted]),
    (Bn.stopAd = [Un.AdStopped]),
    (Bn.pauseAd = [Un.AdPaused]),
    (Bn.resumeAd = [Un.AdPlaying]),
    (Bn.expandAd = [Un.AdExpandedChange]),
    (Bn.collapseAd = [Un.AdExpandedChange]),
    (Bn.skipAd = [Un.AdSkipped, Un.AdStopped]);
  var Wn,
    Qn = [
      Un.AdLoaded,
      Un.AdStarted,
      Un.AdStopped,
      Un.AdSkipped,
      Un.AdImpression,
      Un.AdVideoStart,
      Un.AdVideoFirstQuartile,
      Un.AdVideoMidpoint,
      Un.AdVideoThirdQuartile,
      Un.AdVideoComplete,
      Un.AdError,
    ],
    Gn = ["initAd", "startAd", "stopAd", "skipAd"],
    Kn = [
      Un.AdVideoStart,
      Un.AdVideoFirstQuartile,
      Un.AdVideoMidpoint,
      Un.AdVideoThirdQuartile,
      Un.AdVideoComplete,
    ];
  ((Wn = {})[Un.AdSkipped] = ["skip"]),
    (Wn[Un.AdStarted] = ["creativeView"]),
    (Wn[Un.AdImpression] = ["impression"]),
    (Wn[Un.AdVideoStart] = ["start"]),
    (Wn[Un.AdVideoFirstQuartile] = ["firstQuartile"]),
    (Wn[Un.AdVideoMidpoint] = ["midpoint"]),
    (Wn[Un.AdVideoThirdQuartile] = ["thirdQuartile"]),
    (Wn[Un.AdVideoComplete] = ["complete"]),
    (Wn[Un.AdUserAcceptInvitation] = ["acceptInvitation"]),
    (Wn[Un.AdUserMinimize] = ["collapse", "playerCollapse"]),
    (Wn[Un.AdUserClose] = ["close", "closeLinear"]),
    (Wn[Un.AdPaused] = ["pause"]),
    (Wn[Un.AdPlaying] = ["resume"]),
    (Wn[Un.AdExpandedChange] = ["expand", "playerExpand"]),
    (Wn[Un.AdError] = ["error"]);
  Object.keys(Un).map(function (e) {
    return Un[e];
  });
  var Hn = function (e, t, n) {
      var i = M(e),
        r = n(U, i, ""[e]),
        o = r[0],
        s = r[1];
      if (
        c(function () {
          var t = {};
          t[i] = function () {
            return 7;
          };
          return 7 != ""[e](t);
        })
      ) {
        E(String.prototype, e, o);
        S(
          RegExp.prototype,
          i,
          2 == t
            ? function (e, t) {
                return s.call(e, this, t);
              }
            : function (e) {
                return s.call(e, this);
              },
        );
      }
    },
    Jn = M("match"),
    Xn = function (e) {
      var t;
      return d(e) && (void 0 !== (t = e[Jn]) ? !!t : "RegExp" == B(e));
    };
  Hn("split", 2, function (e, t, n) {
    var i = Xn,
      r = n,
      o = [].push;
    if (
      "c" == "abbc".split(/(b)*/)[1] ||
      4 != "test".split(/(?:)/, -1).length ||
      2 != "ab".split(/(?:ab)*/).length ||
      4 != ".".split(/(.?)(.?)/).length ||
      ".".split(/()()/).length > 1 ||
      "".split(/.?/).length
    ) {
      var s = void 0 === /()??/.exec("")[1];
      n = function (e, t) {
        var n = String(this);
        if (void 0 === e && 0 === t) return [];
        if (!i(e)) return r.call(n, e, t);
        var u,
          a,
          c,
          l,
          f,
          d = [],
          h =
            (e.ignoreCase ? "i" : "") +
            (e.multiline ? "m" : "") +
            (e.unicode ? "u" : "") +
            (e.sticky ? "y" : ""),
          p = 0,
          v = void 0 === t ? 4294967295 : t >>> 0,
          m = new RegExp(e.source, h + "g");
        s || (u = new RegExp("^" + m.source + "$(?!\\s)", h));
        for (; (a = m.exec(n)); ) {
          if ((c = a.index + a[0].length) > p) {
            d.push(n.slice(p, a.index));
            !s &&
              a.length > 1 &&
              a[0].replace(u, function () {
                for (f = 1; f < arguments.length - 2; f++)
                  void 0 === arguments[f] && (a[f] = void 0);
              });
            a.length > 1 && a.index < n.length && o.apply(d, a.slice(1));
            l = a[0].length;
            p = c;
            if (d.length >= v) break;
          }
          m.lastIndex === a.index && m.lastIndex++;
        }
        p === n.length ? (!l && m.test("")) || d.push("") : d.push(n.slice(p));
        return d.length > v ? d.slice(0, v) : d;
      };
    } else
      "0".split(void 0, 0).length &&
        (n = function (e, t) {
          return void 0 === e && 0 === t ? [] : r.call(this, e, t);
        });
    return [
      function (i, r) {
        var o = e(this),
          s = null == i ? void 0 : i[t];
        return void 0 !== s ? s.call(i, o, r) : n.call(String(o), i, r);
      },
      n,
    ];
  });
  Hn("replace", 2, function (e, t, n) {
    return [
      function (i, r) {
        var o = e(this),
          s = null == i ? void 0 : i[t];
        return void 0 !== s ? s.call(i, o, r) : n.call(String(o), i, r);
      },
      n,
    ];
  });
  var $n = /"/g,
    Yn = function (e, t, n, i) {
      var r = String(U(e)),
        o = "<" + t;
      "" !== n && (o += " " + n + '="' + String(i).replace($n, "&quot;") + '"');
      return o + ">" + r + "</" + t + ">";
    };
  !(function (e, t) {
    var n = {};
    n.blink = (function (e) {
      return function () {
        return e(this, "blink", "", "");
      };
    })(Yn);
    j(
      j.P +
        j.F *
          c(function () {
            var e = "".blink('"');
            return e !== e.toLowerCase() || e.split('"').length > 3;
          }),
      "String",
      n,
    );
  })();
  Hn("match", 1, function (e, t, n) {
    return [
      function (n) {
        var i = e(this),
          r = null == n ? void 0 : n[t];
        return void 0 !== r ? r.call(n, i) : new RegExp(n)[t](String(i));
      },
      n,
    ];
  });
  var Zn,
    ei = n(function (e) {
      (t = o),
        (n = function () {
          function e(e) {
            function t(t) {
              var n = e.match(t);
              return (n && n.length > 1 && n[1]) || "";
            }
            function n(t) {
              var n = e.match(t);
              return (n && n.length > 1 && n[2]) || "";
            }
            var r,
              s = t(/(ipod|iphone|ipad)/i).toLowerCase(),
              u = !/like android/i.test(e) && /android/i.test(e),
              a = /nexus\s*[0-6]\s*/i.test(e),
              c = !a && /nexus\s*[0-9]+/i.test(e),
              l = /CrOS/.test(e),
              f = /silk/i.test(e),
              d = /sailfish/i.test(e),
              h = /tizen/i.test(e),
              p = /(web|hpw)(o|0)s/i.test(e),
              v = /windows phone/i.test(e),
              m = (/SamsungBrowser/i.test(e), !v && /windows/i.test(e)),
              y = !s && !f && /macintosh/i.test(e),
              b = !u && !d && !h && !p && /linux/i.test(e),
              g = n(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),
              _ = t(/version\/(\d+(\.\d+)?)/i),
              w = /tablet/i.test(e) && !/tablet pc/i.test(e),
              S = !w && /[^-]mobi/i.test(e),
              A = /xbox/i.test(e);
            if (/opera/i.test(e))
              r = {
                name: "Opera",
                opera: o,
                version: _ || t(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i),
              };
            else if (/opr\/|opios/i.test(e))
              r = {
                name: "Opera",
                opera: o,
                version: t(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || _,
              };
            else if (/SamsungBrowser/i.test(e))
              r = {
                name: "Samsung Internet for Android",
                samsungBrowser: o,
                version: _ || t(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i),
              };
            else if (/Whale/i.test(e))
              r = {
                name: "NAVER Whale browser",
                whale: o,
                version: t(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i),
              };
            else if (/MZBrowser/i.test(e))
              r = {
                name: "MZ Browser",
                mzbrowser: o,
                version: t(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i),
              };
            else if (/coast/i.test(e))
              r = {
                name: "Opera Coast",
                coast: o,
                version: _ || t(/(?:coast)[\s\/](\d+(\.\d+)?)/i),
              };
            else if (/focus/i.test(e))
              r = {
                name: "Focus",
                focus: o,
                version: t(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i),
              };
            else if (/yabrowser/i.test(e))
              r = {
                name: "Yandex Browser",
                yandexbrowser: o,
                version: _ || t(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i),
              };
            else if (/ucbrowser/i.test(e))
              r = {
                name: "UC Browser",
                ucbrowser: o,
                version: t(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i),
              };
            else if (/mxios/i.test(e))
              r = {
                name: "Maxthon",
                maxthon: o,
                version: t(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i),
              };
            else if (/epiphany/i.test(e))
              r = {
                name: "Epiphany",
                epiphany: o,
                version: t(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i),
              };
            else if (/puffin/i.test(e))
              r = {
                name: "Puffin",
                puffin: o,
                version: t(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i),
              };
            else if (/sleipnir/i.test(e))
              r = {
                name: "Sleipnir",
                sleipnir: o,
                version: t(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i),
              };
            else if (/k-meleon/i.test(e))
              r = {
                name: "K-Meleon",
                kMeleon: o,
                version: t(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i),
              };
            else if (v) {
              r = {
                name: "Windows Phone",
                osname: "Windows Phone",
                windowsphone: o,
              };
              if (g) {
                r.msedge = o;
                r.version = g;
              } else {
                r.msie = o;
                r.version = t(/iemobile\/(\d+(\.\d+)?)/i);
              }
            } else if (/msie|trident/i.test(e))
              r = {
                name: "Internet Explorer",
                msie: o,
                version: t(/(?:msie |rv:)(\d+(\.\d+)?)/i),
              };
            else if (l)
              r = {
                name: "Chrome",
                osname: "Chrome OS",
                chromeos: o,
                chromeBook: o,
                chrome: o,
                version: t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
              };
            else if (/edg([ea]|ios)/i.test(e))
              r = { name: "Microsoft Edge", msedge: o, version: g };
            else if (/vivaldi/i.test(e))
              r = {
                name: "Vivaldi",
                vivaldi: o,
                version: t(/vivaldi\/(\d+(\.\d+)?)/i) || _,
              };
            else if (d)
              r = {
                name: "Sailfish",
                osname: "Sailfish OS",
                sailfish: o,
                version: t(/sailfish\s?browser\/(\d+(\.\d+)?)/i),
              };
            else if (/seamonkey\//i.test(e))
              r = {
                name: "SeaMonkey",
                seamonkey: o,
                version: t(/seamonkey\/(\d+(\.\d+)?)/i),
              };
            else if (/firefox|iceweasel|fxios/i.test(e)) {
              r = {
                name: "Firefox",
                firefox: o,
                version: t(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i),
              };
              if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)) {
                r.firefoxos = o;
                r.osname = "Firefox OS";
              }
            } else if (f)
              r = {
                name: "Amazon Silk",
                silk: o,
                version: t(/silk\/(\d+(\.\d+)?)/i),
              };
            else if (/phantom/i.test(e))
              r = {
                name: "PhantomJS",
                phantom: o,
                version: t(/phantomjs\/(\d+(\.\d+)?)/i),
              };
            else if (/slimerjs/i.test(e))
              r = {
                name: "SlimerJS",
                slimer: o,
                version: t(/slimerjs\/(\d+(\.\d+)?)/i),
              };
            else if (/blackberry|\bbb\d+/i.test(e) || /rim\stablet/i.test(e))
              r = {
                name: "BlackBerry",
                osname: "BlackBerry OS",
                blackberry: o,
                version: _ || t(/blackberry[\d]+\/(\d+(\.\d+)?)/i),
              };
            else if (p) {
              r = {
                name: "WebOS",
                osname: "WebOS",
                webos: o,
                version: _ || t(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i),
              };
              /touchpad\//i.test(e) && (r.touchpad = o);
            } else if (/bada/i.test(e))
              r = {
                name: "Bada",
                osname: "Bada",
                bada: o,
                version: t(/dolfin\/(\d+(\.\d+)?)/i),
              };
            else if (h)
              r = {
                name: "Tizen",
                osname: "Tizen",
                tizen: o,
                version: t(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || _,
              };
            else if (/qupzilla/i.test(e))
              r = {
                name: "QupZilla",
                qupzilla: o,
                version: t(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || _,
              };
            else if (/chromium/i.test(e))
              r = {
                name: "Chromium",
                chromium: o,
                version: t(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || _,
              };
            else if (/chrome|crios|crmo/i.test(e))
              r = {
                name: "Chrome",
                chrome: o,
                version: t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
              };
            else if (u) r = { name: "Android", version: _ };
            else if (/safari|applewebkit/i.test(e)) {
              r = { name: "Safari", safari: o };
              _ && (r.version = _);
            } else if (s) {
              r = {
                name: "iphone" == s ? "iPhone" : "ipad" == s ? "iPad" : "iPod",
              };
              _ && (r.version = _);
            } else
              r = /googlebot/i.test(e)
                ? {
                    name: "Googlebot",
                    googlebot: o,
                    version: t(/googlebot\/(\d+(\.\d+))/i) || _,
                  }
                : { name: t(/^(.*)\/(.*) /), version: n(/^(.*)\/(.*) /) };
            if (!r.msedge && /(apple)?webkit/i.test(e)) {
              if (/(apple)?webkit\/537\.36/i.test(e)) {
                r.name = r.name || "Blink";
                r.blink = o;
              } else {
                r.name = r.name || "Webkit";
                r.webkit = o;
              }
              !r.version && _ && (r.version = _);
            } else if (!r.opera && /gecko\//i.test(e)) {
              r.name = r.name || "Gecko";
              r.gecko = o;
              r.version = r.version || t(/gecko\/(\d+(\.\d+)?)/i);
            }
            if (r.windowsphone || (!u && !r.silk)) {
              if (!r.windowsphone && s) {
                r[s] = o;
                r.ios = o;
                r.osname = "iOS";
              } else if (y) {
                r.mac = o;
                r.osname = "macOS";
              } else if (A) {
                r.xbox = o;
                r.osname = "Xbox";
              } else if (m) {
                r.windows = o;
                r.osname = "Windows";
              } else if (b) {
                r.linux = o;
                r.osname = "Linux";
              }
            } else {
              r.android = o;
              r.osname = "Android";
            }
            var k = "";
            r.windows
              ? (k = (function (e) {
                  switch (t(/Windows ((NT|XP)( \d\d?.\d)?)/i)) {
                    case "NT":
                      return "NT";
                    case "XP":
                      return "XP";
                    case "NT 5.0":
                      return "2000";
                    case "NT 5.1":
                      return "XP";
                    case "NT 5.2":
                      return "2003";
                    case "NT 6.0":
                      return "Vista";
                    case "NT 6.1":
                      return "7";
                    case "NT 6.2":
                      return "8";
                    case "NT 6.3":
                      return "8.1";
                    case "NT 10.0":
                      return "10";
                    default:
                      return;
                  }
                })())
              : r.windowsphone
                ? (k = t(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i))
                : r.mac
                  ? (k = (k = t(/Mac OS X (\d+([_\.\s]\d+)*)/i)).replace(
                      /[_\s]/g,
                      ".",
                    ))
                  : s
                    ? (k = (k = t(
                        /os (\d+([_\s]\d+)*) like mac os x/i,
                      )).replace(/[_\s]/g, "."))
                    : u
                      ? (k = t(/android[ \/-](\d+(\.\d+)*)/i))
                      : r.webos
                        ? (k = t(/(?:web|hpw)os\/(\d+(\.\d+)*)/i))
                        : r.blackberry
                          ? (k = t(/rim\stablet\sos\s(\d+(\.\d+)*)/i))
                          : r.bada
                            ? (k = t(/bada\/(\d+(\.\d+)*)/i))
                            : r.tizen && (k = t(/tizen[\/\s](\d+(\.\d+)*)/i));
            k && (r.osversion = k);
            var O = !r.windows && k.split(".")[0];
            w || c || "ipad" == s || (u && (3 == O || (O >= 4 && !S))) || r.silk
              ? (r.tablet = o)
              : (S ||
                  "iphone" == s ||
                  "ipod" == s ||
                  u ||
                  a ||
                  r.blackberry ||
                  r.webos ||
                  r.bada) &&
                (r.mobile = o);
            r.msedge ||
            (r.msie && r.version >= 10) ||
            (r.yandexbrowser && r.version >= 15) ||
            (r.vivaldi && r.version >= 1) ||
            (r.chrome && r.version >= 20) ||
            (r.samsungBrowser && r.version >= 4) ||
            (r.whale && 1 === i([r.version, "1.0"])) ||
            (r.mzbrowser && 1 === i([r.version, "6.0"])) ||
            (r.focus && 1 === i([r.version, "1.0"])) ||
            (r.firefox && r.version >= 20) ||
            (r.safari && r.version >= 6) ||
            (r.opera && r.version >= 10) ||
            (r.ios && r.osversion && r.osversion.split(".")[0] >= 6) ||
            (r.blackberry && r.version >= 10.1) ||
            (r.chromium && r.version >= 20)
              ? (r.a = o)
              : (r.msie && r.version < 10) ||
                  (r.chrome && r.version < 20) ||
                  (r.firefox && r.version < 20) ||
                  (r.safari && r.version < 6) ||
                  (r.opera && r.version < 10) ||
                  (r.ios && r.osversion && r.osversion.split(".")[0] < 6) ||
                  (r.chromium && r.version < 20)
                ? (r.c = o)
                : (r.x = o);
            return r;
          }
          function t(e) {
            return e.split(".").length;
          }
          function n(e, t) {
            var n,
              i = [];
            if (Array.prototype.map) return Array.prototype.map.call(e, t);
            for (n = 0; n < e.length; n++) i.push(t(e[n]));
            return i;
          }
          function i(e) {
            for (
              var i = Math.max(t(e[0]), t(e[1])),
                r = n(e, function (e) {
                  var r = i - t(e);
                  return n(
                    (e += new Array(r + 1).join(".0")).split("."),
                    function (e) {
                      return new Array(20 - e.length).join("0") + e;
                    },
                  ).reverse();
                });
              --i >= 0;

            ) {
              if (r[0][i] > r[1][i]) return 1;
              if (r[0][i] !== r[1][i]) return -1;
              if (0 === i) return 0;
            }
          }
          function r(t, n, r) {
            var o = s;
            if ("string" == typeof n) {
              r = n;
              n = void 0;
            }
            void 0 === n && (n = !1);
            r && (o = e(r));
            var u = "" + o.version;
            for (var a in t)
              if (t.hasOwnProperty(a) && o[a]) {
                if ("string" != typeof t[a])
                  throw new Error(
                    "Browser version in the minVersion map should be a string: " +
                      a +
                      ": " +
                      String(t),
                  );
                return i([u, t[a]]) < 0;
              }
            return n;
          }
          var o = !0,
            s = e(
              ("undefined" != typeof navigator && navigator.userAgent) || "",
            );
          s.test = function (e) {
            for (var t = 0; t < e.length; ++t) {
              var n = e[t];
              if ("string" == typeof n && n in s) return !0;
            }
            return !1;
          };
          s.isUnsupportedBrowser = r;
          s.compareVersions = i;
          s.check = function (e, t, n) {
            return !r(e, t, n);
          };
          s._detect = e;
          s.detect = e;
          return s;
        }),
        e.exports ? (e.exports = n()) : (t.bowser = n());
      var t, n;
    }),
    ti = ["dns-prefetch", "preconnect", "prefetch", "preload"],
    ni = {},
    ii = ti.reverse();
  (Zn = document.createElement("link")).relList && Zn.relList.supports
    ? ti.forEach(function (e) {
        ni[e] = Zn.relList.supports(e);
      })
    : Object.assign(ni, {
        "dns-prefetch": ei.check({ msie: "10", msedge: "12" }, !0),
        prefetch: ei.check({ msie: "11", msedge: "12" }, !0),
        preload: ei.check({ msedge: "17" }, !0),
      });
  var ri = function (e) {
      return !!ni[e];
    },
    oi = function (e, t, n) {
      void 0 === t && (t = document);
      void 0 === n && (n = null);
      if (null != e && null != e.href && null != e.rel) {
        e.rel = (function (e, t) {
          void 0 === t && (t = null);
          if (null == t) {
            var n = ii.indexOf(e);
            n >= 0 && (t = ii.slice(n + 1));
          }
          if (null != t) for (var i = 0; i < t.length && !ri(e); ) e = t[i++];
          return ri(e) ? e : null;
        })(e.rel, n);
        if (null != e.rel) {
          if ("dns-prefetch" === e.rel || "preconnect" === e.rel) {
            e.href = (function (e) {
              var t = e.indexOf("//");
              if (t < 0) return null;
              var n = e.indexOf("/", t + 2);
              return n < 0 ? e : e.substr(0, n);
            })(e.href);
            delete e.as;
            delete e.type;
          } else
            ("prefetch" !== e.rel && "preload" !== e.rel) ||
              (e.href =
                (r = (i = e.href).indexOf("#")) < 0 ? i : i.substr(0, r));
          var i,
            r,
            o = t.createElement("link");
          Object.assign(o, e);
          t.head.appendChild(o);
        }
      }
    },
    si = function () {
      var e = h(this),
        t = "";
      e.global && (t += "g");
      e.ignoreCase && (t += "i");
      e.multiline && (t += "m");
      e.unicode && (t += "u");
      e.sticky && (t += "y");
      return t;
    };
  l &&
    "g" != /./g.flags &&
    _.f(RegExp.prototype, "flags", { configurable: !0, get: si });
  var ui = /./.toString,
    ai = function (e) {
      E(RegExp.prototype, "toString", e, !0);
    };
  c(function () {
    return "/a/b" != ui.call({ source: "a", flags: "b" });
  })
    ? ai(function () {
        var e = h(this);
        return "/".concat(
          e.source,
          "/",
          "flags" in e
            ? e.flags
            : !l && e instanceof RegExp
              ? si.call(e)
              : void 0,
        );
      })
    : "toString" != ui.name &&
      ai(function () {
        return ui.call(this);
      });
  var ci = function (e, t) {
      h(e);
      if (!d(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
    },
    li = {
      set:
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function (e, t, n) {
              try {
                (n = P(
                  Function.call,
                  Se.f(Object.prototype, "__proto__").set,
                  2,
                ))(e, []);
                t = !(e instanceof Array);
              } catch (e) {
                t = !0;
              }
              return function (e, i) {
                ci(e, i);
                t ? (e.__proto__ = i) : n(e, i);
                return e;
              };
            })({}, !1)
          : void 0),
      check: ci,
    };
  j(j.S, "Object", { setPrototypeOf: li.set });
  !(function (e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof t,
      );
    e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
    });
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
  })(
    function e() {
      var t =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
      !(function (t, n) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      })(this);
      var n = r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
      Object.defineProperty(n, "message", {
        configurable: !0,
        enumerable: !1,
        value: t,
        writable: !0,
      });
      Object.defineProperty(n, "name", {
        configurable: !0,
        enumerable: !1,
        value: n.constructor.name,
        writable: !0,
      });
      if (Error.hasOwnProperty("captureStackTrace")) {
        Error.captureStackTrace(n, n.constructor);
        return r(n);
      }
      Object.defineProperty(n, "stack", {
        configurable: !0,
        enumerable: !1,
        value: new Error(t).stack,
        writable: !0,
      });
      return n;
    },
    (function (e) {
      function t() {
        e.apply(this, arguments);
      }
      t.prototype = Object.create(e.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      });
      Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e);
      return t;
    })(Error),
  );
  vt(
    String,
    "String",
    function (e) {
      this._t = String(e);
      this._i = 0;
    },
    function () {
      var e,
        t,
        n,
        i,
        r,
        o,
        s,
        u = this._t,
        a = this._i;
      if (a >= u.length) return { value: void 0, done: !0 };
      e =
        ((t = a),
        (r = String(U(u))),
        (o = K(t)),
        (s = r.length),
        o < 0 || o >= s
          ? ""
          : (n = r.charCodeAt(o)) < 55296 ||
              n > 56319 ||
              o + 1 === s ||
              (i = r.charCodeAt(o + 1)) < 56320 ||
              i > 57343
            ? r.charAt(o)
            : r.slice(o, o + 2));
      this._i += e.length;
      return { value: e, done: !1 };
    },
  );
  var fi = function () {
      var e = {};
      e.promise = new Promise(function (t, n) {
        e.resolve = t;
        e.reject = n;
      });
      return e;
    },
    di = fi,
    hi = fi;
  di.default = hi;
  var pi = function () {},
    vi = function (e, t, n) {
      void 0 === n && (n = !1);
      if (null != e && null != e.style) {
        var i = n ? "important" : "";
        Object.keys(t).forEach(function (n) {
          e.style.setProperty(n, t[n], i);
        });
      }
    },
    mi = function () {
      var e = new Error("Delay aborted");
      e.name = "AbortError";
      return e;
    },
    yi = function (e) {
      var t = e.clearTimeout,
        n = void 0 === t ? clearTimeout : t,
        i = e.setTimeout,
        r = void 0 === i ? setTimeout : i,
        o = e.willResolve;
      return function (e, t) {
        var i,
          s,
          u,
          a = void 0 === t ? {} : t,
          c = a.value,
          l = a.signal;
        if (l && l.aborted) return Promise.reject(mi());
        var f = function () {
            n(i);
            u(mi());
          },
          d = function () {
            l && l.removeEventListener("abort", f);
          },
          h = new Promise(function (t, n) {
            s = function () {
              d();
              o ? t(c) : n(c);
            };
            u = n;
            i = r(s, e);
          });
        l && l.addEventListener("abort", f, { once: !0 });
        h.clear = function () {
          n(i);
          i = null;
          d();
          s();
        };
        return h;
      };
    },
    bi = yi({ willResolve: !0 });
  bi.reject = yi({ willResolve: !1 });
  bi.createWithTimers = function (e) {
    var t = e.clearTimeout,
      n = e.setTimeout,
      i = yi({ clearTimeout: t, setTimeout: n, willResolve: !0 });
    i.reject = yi({ clearTimeout: t, setTimeout: n, willResolve: !1 });
    return i;
  };
  var gi = bi,
    _i = bi;
  gi.default = _i;
  var wi = Symbol("listeners"),
    Si = (function () {
      function e() {
        this[wi] = [];
      }
      var n = e.prototype;
      n.add = function (e, t, n, i) {
        void 0 === i && (i = null);
        null != i && (n = n.bind(i));
        e.addEventListener(t, n);
        this[wi].push({ target: e, type: t, listener: n });
        return this;
      };
      n.addMany = function (e, t, n) {
        var i = this;
        void 0 === n && (n = null);
        Object.keys(t).forEach(function (r) {
          return i.add(e, r, t[r], n);
        });
        return this;
      };
      n.removeAll = function () {
        this[wi].slice(0).forEach(function (e) {
          var t = e.target,
            n = e.type,
            i = e.listener;
          t.removeEventListener(n, i);
        });
        return this;
      };
      t(e, [
        {
          key: "count",
          get: function () {
            return this[wi].length;
          },
        },
      ]);
      return e;
    })(),
    Ai = s.Reflect,
    ki =
      (Ai && Ai.ownKeys) ||
      function (e) {
        var t = me.f(h(e)),
          n = oe.f;
        return n ? t.concat(n(e)) : t;
      },
    Oi = function (e, t, n) {
      t in e ? _.f(e, t, w(0, n)) : (e[t] = n);
    };
  j(j.S, "Object", {
    getOwnPropertyDescriptors: function (e) {
      for (
        var t, n, i = W(e), r = Se.f, o = ki(i), s = {}, u = 0;
        o.length > u;

      )
        void 0 !== (n = r(i, (t = o[u++]))) && Oi(s, t, n);
      return s;
    },
  });
  M("species");
  var Ei = !0;
  "find" in [] &&
    Array(1).find(function () {
      Ei = !1;
    });
  j(j.P + j.F * Ei, "Array", {
    find: function (e) {
      return (function (e, t, n) {
        for (
          var i, r = at(e), o = q(r), s = P(t, n, 3), u = J(o.length), a = 0;
          u > a;
          a++
        )
          if (s((i = o[a]), a, r)) return i;
      })(this, e, arguments.length > 1 ? arguments[1] : void 0);
    },
  });
  tt("find");
  var xi = M("match"),
    Pi = "".startsWith;
  j(
    j.P +
      j.F *
        (function (e) {
          var t = /./;
          try {
            "/./"[e](t);
          } catch (n) {
            try {
              t[xi] = !1;
              return !"/./"[e](t);
            } catch (e) {}
          }
          return !0;
        })("startsWith"),
    "String",
    {
      startsWith: function (e) {
        var t = (function (e, t, n) {
            if (Xn(t))
              throw TypeError("String#startsWith doesn't accept regex!");
            return String(U(e));
          })(this, e),
          n = J(
            Math.min(arguments.length > 1 ? arguments[1] : void 0, t.length),
          ),
          i = String(e);
        return Pi ? Pi.call(t, i, n) : t.slice(n, n + i.length) === i;
      },
    },
  );
  var Ti,
    ji = /^(?:application|text)\/(?:x-)?javascript$/i,
    Ci = function (e) {
      var t = e.type;
      return "VPAID" === e.apiFramework && ji.test(t);
    },
    Fi = function (e) {
      var t = 0,
        n = null;
      return function () {
        if (0 === t)
          try {
            for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++)
              r[o] = arguments[o];
            n = e.apply(this, r);
            t = 1;
          } catch (e) {
            n = e;
            t = 2;
          }
        if (2 === t) throw n;
        return n;
      };
    },
    Mi = function (e, t, n) {
      void 0 === n && (n = "Timed out");
      var i = gi.reject(t, { value: new Error(n) });
      i.catch(pi);
      return (function (e, t) {
        t = t || function () {};
        return e.then(
          function (e) {
            return new Promise(function (e) {
              e(t());
            }).then(function () {
              return e;
            });
          },
          function (e) {
            return new Promise(function (e) {
              e(t());
            }).then(function () {
              throw e;
            });
          },
        );
      })(Promise.race([e, i]), function () {
        i.clear();
      });
    },
    Vi = [].sort,
    Li = [1, 2, 3];
  j(
    j.P +
      j.F *
        (c(function () {
          Li.sort(void 0);
        }) ||
          !c(function () {
            Li.sort(null);
          }) ||
          !((Ti = Vi),
          Ti &&
            c(function () {
              Ti.call(null);
            }))),
    "Array",
    {
      sort: function (e) {
        return void 0 === e ? Vi.call(at(this)) : Vi.call(at(this), x(e));
      },
    },
  );
  var zi,
    Ii,
    Di = se.f,
    Ni = function (e) {
      for (var t, n = W(e), i = re(n), r = i.length, o = 0, s = []; r > o; )
        Di.call(n, (t = i[o++])) && s.push([t, n[t]]);
      return s;
    };
  j(j.S, "Object", {
    entries: function (e) {
      return Ni(e);
    },
  });
  var Ri = ["video/3gpp"],
    Bi =
      (((zi = {}).vpaid = 1),
      (zi.video = 2),
      (zi.vast = 3),
      function (e) {
        return e.width * e.height;
      }),
    qi = function (e, t) {
      for (
        var n = t.selector, i = t.filter, r = null, o = 0;
        o < e.length && null == r;

      ) {
        var s = e[o].filter(i);
        s.length > 0 && (r = n(s));
        ++o;
      }
      return r;
    },
    Ui = function (e, t, n, i) {
      var r = (function (e, t, n) {
          for (var i = {}, r = 0; r < e.length; ++r) {
            var o = e[r].type;
            i.hasOwnProperty(o) || (i[o] = t.canPlayType(o));
          }
          for (var s = {}, u = 0; u < n.length; ++u) s[n[u]] = [];
          for (var a = 0; a < e.length; ++a) {
            var c = e[a],
              l = i[c.type];
            null != s[l] && s[l].push(c);
          }
          return s;
        })(e, n, ["probably"].concat(i ? ["maybe"] : [])),
        o = r.probably,
        s = void 0 === o ? [] : o,
        u = r.maybe,
        a = void 0 === u ? [] : u;
      if (s.length + a.length === 0) return null;
      for (var c = null, l = 0; l < t.length && null == c; ) {
        c = qi([s, a], t[l]);
        ++l;
      }
      return c;
    };
  ((Ii = {}).vast = function (e) {
    return e[0];
  }),
    (Ii.vpaid = function (e) {
      return (function (e) {
        var t = e.filter(Ci);
        return t.length > 0
          ? t.reduce(function (e, t) {
              return Bi(t) > Bi(e) ? t : e;
            })
          : null;
      })(e);
    }),
    (Ii.video = function (e, t, n) {
      var i,
        r = e.filter(function (e) {
          var t = e.type;
          return Ri.indexOf(t) < 0;
        }),
        o = r.length > 0 ? r : e;
      null != n && "function" == typeof n.canPlayType && (i = Ui(o, t, n, !1));
      null == i && (i = Ui(o, t, document.createElement("video"), !0));
      return i;
    });
  j(j.S + j.F * !mn(function (e) {}), "Array", {
    from: function (e) {
      var t,
        n,
        i,
        r,
        o = at(e),
        s = "function" == typeof this ? this : Array,
        u = arguments.length,
        a = u > 1 ? arguments[1] : void 0,
        c = void 0 !== a,
        l = 0,
        f = Nt(o);
      c && (a = P(a, u > 2 ? arguments[2] : void 0, 2));
      if (null == f || (s == Array && It(f)))
        for (n = new s((t = J(o.length))); t > l; l++)
          Oi(n, l, c ? a(o[l], l) : o[l]);
      else
        for (r = f.call(o), n = new s(); !(i = r.next()).done; l++)
          Oi(n, l, c ? Vt(r, a, [i.value, l], !0) : i.value);
      n.length = l;
      return n;
    },
  });
  n(function (e, t) {
    function n(e, t) {
      var n = [],
        i = [];
      null == t &&
        (t = function (e, t) {
          return n[0] === t
            ? "[Circular ~]"
            : "[Circular ~." + i.slice(0, n.indexOf(t)).join(".") + "]";
        });
      return function (r, o) {
        if (n.length > 0) {
          var s = n.indexOf(this);
          ~s ? n.splice(s + 1) : n.push(this);
          ~s ? i.splice(s, 1 / 0, r) : i.push(r);
          ~n.indexOf(o) && (o = t.call(this, r, o));
        } else n.push(o);
        return null == e ? o : e.call(this, r, o);
      };
    }
    (e.exports = function (e, t, i, r) {
      return JSON.stringify(e, n(t, r), i);
    }).getSerialize = n;
  }).getSerialize;
  var Wi,
    Qi = Symbol("subscribers"),
    Gi = Symbol("published"),
    Ki = (function () {
      function e() {
        this[Qi] = {};
        this[Gi] = [];
      }
      var n = e.prototype;
      n.subscribe = function (e, t, n) {
        void 0 === n && (n = null);
        null == this[Qi][t] && (this[Qi][t] = []);
        this[Qi][t].push({ fn: e, ctx: n });
      };
      n.unsubscribe = function (e, t) {
        var n = this[Qi][t];
        if (null != n)
          for (var i = n.length - 1; i >= 0; --i)
            n[i].fn === e && n.splice(i, 1);
      };
      n.publish = function (e, t) {
        void 0 === t && (t = []);
        if (!(Qn.indexOf(e) >= 0 && this.didPublish(e))) {
          t = this._normalizeEventArgs(e, t);
          this[Gi].push({ name: e, args: t });
          if (null != this[Qi][e])
            for (var n = this[Qi][e].slice(), i = 0; i < n.length; ++i) {
              var r = n[i],
                o = r.fn,
                s = r.ctx;
              o.apply(s, t);
            }
        }
      };
      n.didPublish = function (e) {
        return this[Gi].some(function (t) {
          var n = t.name;
          return e === n;
        });
      };
      n._normalizeEventArgs = function (e, t) {
        switch (e) {
          case Un.AdClickThru:
            var n = t[0],
              i = t[1],
              r = t[2];
            return [
              "string" == typeof n ? n : void 0,
              null != i ? i : "",
              null == r || !!r,
            ];
          default:
            return t;
        }
      };
      t(e, [
        {
          key: "published",
          get: function () {
            return this[Gi];
          },
        },
      ]);
      return e;
    })(),
    Hi = {
      fullscreenEnabled: 0,
      fullscreenElement: 1,
      requestFullscreen: 2,
      exitFullscreen: 3,
      fullscreenchange: 4,
      fullscreenerror: 5,
    },
    Ji = [
      "webkitFullscreenEnabled",
      "webkitFullscreenElement",
      "webkitRequestFullscreen",
      "webkitExitFullscreen",
      "webkitfullscreenchange",
      "webkitfullscreenerror",
    ],
    Xi = [
      "mozFullScreenEnabled",
      "mozFullScreenElement",
      "mozRequestFullScreen",
      "mozCancelFullScreen",
      "mozfullscreenchange",
      "mozfullscreenerror",
    ],
    $i = [
      "msFullscreenEnabled",
      "msFullscreenElement",
      "msRequestFullscreen",
      "msExitFullscreen",
      "MSFullscreenChange",
      "MSFullscreenError",
    ],
    Yi =
      "undefined" != typeof window && void 0 !== window.document
        ? window.document
        : {},
    Zi =
      ("fullscreenEnabled" in Yi && Object.keys(Hi)) ||
      (Ji[0] in Yi && Ji) ||
      (Xi[0] in Yi && Xi) ||
      ($i[0] in Yi && $i) ||
      [],
    er = {
      get changeEventType() {
        return Zi[Hi.fullscreenchange];
      },
      isActive: function (e) {
        var t = e.ownerDocument,
          n = Zi[Hi.fullscreenElement];
        return null != t && t[n] === e;
      },
      request: function (e) {
        if (er.isActive(e)) return Promise.resolve();
        var t = Zi[Hi.requestFullscreen];
        return "function" != typeof e[t]
          ? Promise.reject(new Error("Not supported"))
          : Mi(e[t](), 3e3);
      },
      exit: function (e) {
        var t = Zi[Hi.exitFullscreen];
        return "function" != typeof e[t]
          ? Promise.reject(new Error("Not supported"))
          : Mi(e[t](), 1e3);
      },
    },
    tr = Symbol("url"),
    nr = Symbol("options"),
    ir = Symbol("pubSub"),
    rr = Symbol("skippable"),
    or = Symbol("slot"),
    sr = Symbol("videoSlot"),
    ur = Symbol("clickSlot"),
    ar = Symbol("width"),
    cr = Symbol("height"),
    lr = Symbol("viewMode"),
    fr = Symbol("volumeImpaired"),
    dr = Symbol("volume"),
    hr = Symbol("paused"),
    pr = Symbol("loaded"),
    vr = Symbol("clicked"),
    mr = Symbol("requested"),
    yr = Symbol("domEventTracker"),
    br = Symbol("tickInterval"),
    gr = Symbol("quartile"),
    _r = Symbol("monitors"),
    wr = {
      noMutedAutoplayFallback: !1,
      noPauseOnClickThrough: !1,
      skipOffset: null,
    },
    Sr = {
      position: "absolute",
      left: "0",
      top: "0",
      border: "0",
      margin: "0",
      padding: "0",
    },
    Ar = Object.assign({}, Sr, { cursor: "pointer" }),
    kr =
      (((Wi = {}).duration = [["getAdDuration"], "AdDurationChange"]),
      (Wi.remainingTime = [["getAdRemainingTime"], "AdRemainingTimeChange"]),
      (Wi.volume = [["getAdVolume"], "AdVolumeChange"]),
      (Wi.skippableState = [["getAdSkippableState"], "AdSkippableStateChange"]),
      (Wi.size = [["getAdWidth", "getAdHeight"], "AdSizeChange"]),
      Wi),
    Or = (function () {
      function e(e, t) {
        this[tr] = e;
        this[nr] = Object.assign({}, wr, t);
        this[ir] = new Ki();
        this[rr] = null == this[nr].skipOffset;
        this[ar] = qn;
        this[cr] = qn;
        this[lr] = null;
        this[fr] = !1;
        this[dr] = qn;
        this[or] = null;
        this[sr] = null;
        this[hr] = !0;
        this[pr] = !1;
        this[vr] = !1;
        this[yr] = new Si();
        this[mr] = {};
        this[br] = null;
        this[gr] = -1;
        this[_r] = this._buildMonitors();
        this._onTick = this._onTick.bind(this);
        for (var n = 0; n < Gn.length; ++n) {
          var i = Gn[n];
          this[i] = Fi(this[i]).bind(this);
        }
        oi({ rel: "preconnect", href: e, pr: "1.0" });
      }
      var t = e.prototype;
      t._getSlot = function () {
        return this[or];
      };
      t.getAdLinear = function () {
        return !0;
      };
      t.getAdWidth = function () {
        return this._isFullscreen() ? screen.width : this[ar];
      };
      t.getAdHeight = function () {
        return this._isFullscreen() ? screen.height : this[cr];
      };
      t.getAdExpanded = function () {
        return !1;
      };
      t.getAdSkippableState = function () {
        return this[rr];
      };
      t.getAdRemainingTime = function () {
        if (this[pr] && null != this[sr]) {
          var e = this[sr],
            t = e.currentTime,
            n = e.duration;
          if (isFinite(t) && isFinite(n)) return n - t;
        }
        return qn;
      };
      t.getAdDuration = function () {
        if (this[pr] && null != this[sr]) {
          var e = this[sr].duration;
          if (isFinite(e) && e > 0) return e;
        }
        return qn;
      };
      t.getAdVolume = function () {
        if (this[pr] && null != this[sr]) {
          var e = this[sr],
            t = e.volume,
            n = e.muted;
          if ("boolean" == typeof n && n) return 0;
          if (isFinite(t)) return t;
        }
        return this[dr];
      };
      t.setAdVolume = function (e) {
        this[dr] = e;
        if (null != this[sr]) {
          this._setVolume(e);
          this[fr] && this._notifyMonitor("volume");
        }
      };
      t.getAdCompanions = function () {
        return "";
      };
      t.getAdIcons = function () {
        return !1;
      };
      t.handshakeVersion = function () {
        return "2.0";
      };
      t.initAd = function (e, t, n, i, r, o) {
        var s = this,
          u = o || {},
          a = u.videoSlot,
          c = u.slot,
          l = null == c || null == c.ownerDocument;
        if (l) {
          c = document.createElement("div");
          vi(c, Sr);
        }
        if (null == a) {
          a = c.ownerDocument.createElement("video");
          vi(a, Sr);
          c.appendChild(a);
        }
        this[or] = c;
        this[sr] = a;
        this[ur] = c.ownerDocument.createElement("div");
        vi(this[ur], Ar, !0);
        c.appendChild(this[ur]);
        this[fr] = !("volume" in a && "muted" in a);
        this._setDimensions(e, t, n, !1);
        this._preloadSrc(this[tr]);
        var f,
          d = function () {
            s._publish(Un.AdLoaded);
          };
        l
          ? ((f = document),
            new Promise(function (e, t) {
              var n,
                i,
                r,
                o,
                s = function (e) {
                  return function (r) {
                    try {
                      n.cancel();
                      i.cancel();
                      return e && e.call(this, r);
                    } catch (e) {
                      return t(e);
                    }
                  }.bind(this);
                }.bind(this);
              void 0 === f && (f = document);
              if (null != f.body) return e();
              n =
                ((r = f),
                (o = "body"),
                (function (e, t) {
                  var n = di(),
                    i = setInterval(function () {
                      null != r[o] && n.resolve();
                    }, 20);
                  n.promise.cancel = function () {
                    clearInterval(i);
                    n.reject(new Error("Canceled"));
                  };
                  return n.promise;
                })());
              i = (function (e, t) {
                var n = di(),
                  i = function t() {
                    e.removeEventListener("DOMContentLoaded", t);
                    n.resolve();
                  };
                e.addEventListener("DOMContentLoaded", i);
                n.promise.cancel = function () {
                  e.removeEventListener("DOMContentLoaded", i);
                  n.reject(new Error("Canceled"));
                };
                return n.promise;
              })(f);
              n.catch(pi);
              i.catch(pi);
              var u = function () {
                  try {
                    return e();
                  } catch (e) {
                    return t(e);
                  }
                },
                a = function (e) {
                  try {
                    throw e;
                  } catch (e) {
                    return s(t)(e);
                  }
                };
              try {
                return Promise.resolve(Promise.race([n, i])).then(function (e) {
                  try {
                    return s(u)();
                  } catch (e) {
                    return a(e);
                  }
                }, a);
              } catch (e) {
                a(e);
              }
            })).then(function () {
              document.body.appendChild(c);
              d();
            })
          : d();
      };
      t.resizeAd = function (e, t, n) {
        this._setDimensions(e, t, n, !0);
      };
      t.startAd = function () {
        this._request(Un.AdImpression);
        this._addDomListeners();
        this[sr].pause();
        if (this[dr] >= 0) {
          this._setVolume(this[dr]);
          this._notifyMonitor("volume");
        }
        this._initVideoSlot(this[tr]);
        this[pr] = !0;
        this._publish(Un.AdStarted);
        this[hr] = !1;
        this._play();
      };
      t.stopAd = function () {
        this._stop();
      };
      t.skipAd = function () {
        this._request(Un.AdSkipped);
        this._stop();
      };
      t.pauseAd = function () {
        this._pause();
      };
      t.resumeAd = function () {
        this._resume();
      };
      t.expandAd = function () {};
      t.collapseAd = function () {};
      t.subscribe = function (e, t, n) {
        void 0 === n && (n = null);
        this[ir].subscribe(e, t, n);
      };
      t.unsubscribe = function (e, t) {
        this[ir].unsubscribe(e, t);
      };
      t._publish = function (e, t) {
        void 0 === t && (t = []);
        this[ir].publish(e, t);
      };
      t._addDomListeners = function () {
        if (!(this[yr].count > 0)) {
          var e = this[sr].ownerDocument || document;
          this[yr]
            .add(this[ur], "click", this._onClickSlotClick, this)
            .add(e, er.changeEventType, this._onFullscreenchange, this)
            .addMany(
              this[sr],
              {
                durationchange: this._onVideoDurationchange,
                volumechange: this._onVideoVolumechange,
                playing: this._onVideoSlotPlaying,
                play: this._onVideoSlotPlay,
                pause: this._onVideoSlotPause,
                seeked: this._onVideoSeeked,
                ended: this._onVideoEnded,
                error: this._onVideoSlotError,
              },
              this,
            );
        }
      };
      t._onClickSlotClick = function () {
        if (this[vr] && this[hr]) {
          if (this[hr]) {
            this[vr] = !1;
            this._resume();
          }
        } else {
          this[nr].noPauseOnClickThrough || this[hr] || this._pause();
          this[vr] = !0;
          this._publish(Un.AdClickThru, [null, null, !0]);
        }
      };
      t._onVideoDurationchange = function () {
        this._notifyMonitor("duration");
        this._notifyMonitor("remainingTime");
      };
      t._onVideoVolumechange = function () {
        this._notifyMonitor("volume");
      };
      t._onVideoSlotPlaying = function () {
        this._satisfy(Un.AdImpression);
        this._satisfy(Un.AdPlaying);
        this._startTicking();
      };
      t._onVideoSlotPlay = function () {};
      t._onVideoSlotPause = function () {
        this._stopTicking();
        this._satisfy(Un.AdPaused);
        this._satisfyStopRequest();
      };
      t._onVideoSeeked = function () {
        this._notifyMonitor("remainingTime");
      };
      t._onVideoEnded = function () {
        this._onTick();
        this._stop();
      };
      t._onVideoSlotError = function () {
        var e =
          null != this[sr].error ? this[sr].error : new Error("Video error");
        this._onError(e);
      };
      t._onError = function (e) {
        this._publish(Un.AdError, [e.message]);
        this._stop();
      };
      t._preloadSrc = function (e) {
        var t = this[sr],
          n = t.src,
          i = t.currentSrc;
        (null != n && "" !== n) ||
          (null != i && "" !== i) ||
          this._initVideoSlot(e);
      };
      t._initVideoSlot = function (e) {
        if ("function" == typeof this[sr].setAttribute) {
          this[sr].setAttribute("playsinline", "true");
          this[sr].setAttribute("webkit-playsinline", "true");
        } else this[sr].playsInline = !0;
        this[sr].autoplay = !1;
        this[sr].controls = !1;
        this[sr].loop = !1;
        this[sr].src = e;
      };
      t._setDimensions = function (e, t, n, i) {
        var r = this;
        "fullscreen" === n
          ? this._requestFullscreen().catch(function (e) {
              r._publishAdLog("Fullscreen mode failed: " + e);
            })
          : this._exitFullscreen()
              .catch(pi)
              .then(function () {
                r._setDimensionsNormal(e, t);
                i && r._notifyMonitor("size");
              });
      };
      t._setDimensionsNormal = function (e, t) {
        this[ar] = e;
        this[cr] = t;
        this[lr] = "normal";
        var n = { width: e + "px", height: t + "px" };
        vi(this[sr], n);
        vi(this[or], n);
        vi(this[ur], n, !0);
      };
      t._requestFullscreen = function () {
        return this._isFullscreen()
          ? Promise.resolve()
          : er.request(this[sr]).then(
              function () {},
              function (e) {
                throw e;
              },
            );
      };
      t._exitFullscreen = function () {
        return this._isFullscreen()
          ? er.exit(this[sr].ownerDocument).catch(function (e) {
              throw e;
            })
          : Promise.resolve();
      };
      t._onFullscreenchange = function () {
        var e = this._isFullscreen() ? "fullscreen" : "normal";
        if (e !== this[lr]) {
          this[lr] = e;
          this._notifyMonitor("size");
        }
      };
      t._isFullscreen = function () {
        return null != this[sr] && er.isActive(this[sr]);
      };
      t._setVolume = function (e) {
        this[sr].volume !== e && (this[sr].volume = e);
        var t = 0 === e;
        this[sr].muted !== t && (this[sr].muted = t);
      };
      t._play = function () {
        var e = this,
          t = this[nr].noMutedAutoplayFallback,
          n = this[sr].muted,
          i = this[sr].play();
        null != i && "function" == typeof i.catch
          ? i
              .catch(function (i) {
                if (n) throw i;
                e._publishAdLog("Unmuted playback failed: " + i);
                if (e[hr])
                  e._publishAdLog(
                    "Unmuted playback failed and ad is paused, not falling back to muted playback",
                  );
                else {
                  if (!t) {
                    e._publishAdLog(
                      "Unmuted playback failed, attempting fallback to muted playback",
                    );
                    e[sr].muted = !0;
                    return e[sr].play();
                  }
                  e._publishAdLog(
                    "Unmuted playback failed and fallback to muted playback disabled, giving up",
                  );
                }
              })
              .catch(function (t) {
                e._publishAdLog("Muted playback failed: " + t);
              })
          : this._publishAdLog(
              "Video slot does not report disallowed play attempts",
            );
      };
      t._pause = function () {
        this[hr] = !0;
        if (null == this[sr] || this[sr].paused) this._publish(Un.AdPaused);
        else {
          this._request(Un.AdPaused);
          this[sr].pause();
        }
      };
      t._resume = function () {
        this[hr] = !1;
        if (null != this[sr] && this[sr].paused) {
          this._request(Un.AdPlaying);
          this._play();
        } else this._publish(Un.AdPlaying);
      };
      t._stop = function () {
        this._stopTicking();
        this[hr] = !0;
        this._request(Un.AdStopped);
        null == this[sr] || this[sr].paused || this[sr].ended
          ? this._satisfyStopRequest()
          : this[sr].pause();
      };
      t._satisfyStopRequest = function () {
        if (this._requested(Un.AdStopped)) {
          this[yr].removeAll();
          null != this[sr] && this._resetMediaSrc();
          this._satisfy(Un.AdSkipped);
          this._satisfy(Un.AdStopped);
        }
      };
      t._resetMediaSrc = function () {
        var e = this[sr];
        if ("function" == typeof e.removeAttribute) {
          e.removeAttribute("src");
          e.load();
        } else e.src = "";
        this[pr] = !1;
      };
      t._startTicking = function () {
        if (null == this[br]) {
          this[br] = setInterval(this._onTick, 250);
          this._onTick();
        }
      };
      t._stopTicking = function () {
        if (null != this[br]) {
          this._onTick();
          clearInterval(this[br]);
          this[br] = null;
        }
      };
      t._onTick = function () {
        if (this[pr]) {
          var e = this[sr];
          if (!(null == e || e.readyState < 1 || null != e.error)) {
            this._notifyMonitor("duration");
            this._notifyMonitor("remainingTime");
            this._handleSkippableState();
            this._handleQuartiles();
          }
        }
      };
      t._handleSkippableState = function () {
        var e = this[nr].skipOffset,
          t = this[sr].currentTime;
        if (!this[rr] && "number" == typeof e && t >= e) {
          this[rr] = !0;
          this._notifyMonitor("skippableState");
        }
      };
      t._handleQuartiles = function () {
        var e,
          t = this[sr],
          n = t.currentTime,
          i = t.duration,
          r = t.ended,
          o = t.played,
          s =
            null != o
              ? ((e = o),
                Array.apply(null, e).reduce(function (t, n, i) {
                  return t + e.end(i) - e.start(i);
                }, 0))
              : n;
        if (!(!isFinite(s) || s < 0 || !isFinite(i) || i <= 0)) {
          var u = this[gr],
            a = r ? 0.25 : 0;
          this[gr] = Math.min(Math.max(u, Math.floor(((s + a) / i) * 4)), 4);
          for (var c = u + 1; c <= this[gr]; ++c) this._publish(Kn[c]);
        }
      };
      t._request = function (e) {
        this[mr][e] = !0;
      };
      t._requested = function (e) {
        return !!this[mr][e];
      };
      t._satisfy = function (e) {
        if (this._requested(e)) {
          this[mr][e] = !1;
          this._publish(e);
        }
      };
      t._buildMonitors = function () {
        for (var e = {}, t = Object.keys(kr), n = 0; n < t.length; ++n) {
          var i = t[n],
            r = kr[i],
            o = r[0],
            s = r[1];
          e[i] = this._buildMonitor(o, s);
        }
        return e;
      };
      t._buildMonitor = function (e, t) {
        var n = this,
          i = function () {
            return e
              .map(function (e) {
                return n[e]();
              })
              .join("\0");
          },
          r = i();
        return function () {
          var e = i();
          if (e !== r) {
            r = e;
            n._publish(t);
          }
        };
      };
      t._notifyMonitor = function (e) {
        this[_r][e]();
      };
      t._publishAdLog = function (e) {
        this._publish(Un.AdLog, [e]);
      };
      return e;
    })(),
    Er = {
      position: "absolute",
      top: "12px",
      right: "12px",
      padding: "6px",
      margin: 0,
      "border-width": "1px",
      "border-style": "solid",
      "font-family": "Arial, Helvetica, sans-serif",
      "font-size": "12px",
      "font-weight": 200,
      "pointer-events": "none",
      opacity: 0.9,
    },
    xr = { opacity: 1 },
    Pr = Symbol("button"),
    Tr = Symbol("config"),
    jr = Symbol("videoUrl"),
    Cr = Symbol("clickUrl"),
    Fr = new ((function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      !(function (e, t) {
        e.prototype = Object.create(t.prototype);
        e.prototype.constructor = e;
        e.__proto__ = t;
      })(t, e);
      var n = t.prototype;
      n.initAd = function (t, n, i, r, o, s) {
        this._parseAdParameters(o);
        e.prototype.initAd.call(this, t, n, i, r, o, s);
      };
      n.startAd = function () {
        this._createButton(this[Tr]);
        this._insertButton();
        this._animateButton();
        e.prototype.startAd.call(this);
      };
      n._initVideoSlot = function () {
        e.prototype._initVideoSlot.call(this, this[jr]);
      };
      n._publish = function (t, n) {
        if (t === Un.AdClickThru) {
          window.open(this[Cr], "_blank", "");
          n = [this[Cr], null, !1];
        }
        e.prototype._publish.call(this, t, n);
      };
      n._parseAdParameters = function (e) {
        var t = null;
        try {
          t = (function (e) {
            var t = (function (e) {
              return null == e || "string" == typeof e ? e : e.AdParameters;
            })(e);
            try {
              return JSON.parse(t);
            } catch (e) {
              throw new Error('Failed to parse AdParameters "' + t + '"');
            }
          })(e);
        } catch (e) {}
        var n = t || {},
          i = n.videoUrl,
          r =
            void 0 === i
              ? "https://vasttester.iabtechlab.com/fixtures/video/360p30.mp4"
              : i,
          o = n.clickUrl,
          s = void 0 === o ? "https://iabtechlab.com/" : o,
          u = n.buttonText,
          a = void 0 === u ? "Learn more" : u,
          c = n.buttonForegroundColor,
          l = void 0 === c ? "#F0F0F0" : c,
          f = n.buttonBackgroundColor,
          d = void 0 === f ? "#101010" : f;
        this[jr] = r;
        this[Cr] = s;
        this[Tr] = {
          buttonText: a,
          buttonForegroundColor: l,
          buttonBackgroundColor: d,
        };
      };
      n._createButton = function (e) {
        var t = e.buttonText,
          n = e.buttonForegroundColor,
          i = e.buttonBackgroundColor,
          r = this._getSlot().ownerDocument;
        this[Pr] = r.createElement("div");
        this[Pr].textContent = t;
        vi(this[Pr], { background: i, color: n, "border-color": n });
        vi(this[Pr], Er);
      };
      n._insertButton = function () {
        var e = this;
        this._getSlot().appendChild(this[Pr]);
        this.subscribe(function () {
          null != e[Pr].parentNode && e[Pr].parentNode.removeChild(e[Pr]);
        }, Un.AdStopped);
      };
      n._animateButton = function () {
        var e = this,
          t = this._getSlot();
        t.addEventListener("mouseenter", function () {
          vi(e[Pr], xr);
        });
        t.addEventListener("mouseleave", function () {
          vi(e[Pr], Er);
        });
      };
      return t;
    })(Or))();
  window.getVPAIDAd = function () {
    return Fr;
  };
})();
