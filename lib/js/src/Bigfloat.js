'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Bigint = require("./Bigint.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

function mkBigfloat(v, d) {
  return {
          value: v,
          decimals: d
        };
}

var zero = {
  value: Bigint.zero,
  decimals: 0
};

var one = {
  value: Bigint.one,
  decimals: 0
};

var minusOne = {
  value: Bigint.minus_one,
  decimals: 0
};

function repeatString(n, s) {
  if (n === 0) {
    return "";
  } else {
    return s + repeatString(n - 1 | 0, s);
  }
}

var addCommas = (function (s) {
      var sp = s.split(".");
      var l = sp[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      if (sp.length > 1) {
        return l.concat(".", sp[1]);
      } else {
        return l;
      }
    });

var removeCommas = (function (s) {
      return s.replace(/,/g, "");
    });

function ofInt(i) {
  return {
          value: Bigint.of_int(i),
          decimals: 0
        };
}

function ofInt32(i) {
  return {
          value: Bigint.of_int32(i),
          decimals: 0
        };
}

function ofInt64(i) {
  return {
          value: Bigint.of_int64(i),
          decimals: 0
        };
}

function ofNativeint(i) {
  return {
          value: Bigint.of_nativeint(i),
          decimals: 0
        };
}

function ofString(string, decimals) {
  var s = removeCommas(string);
  var a = s.split(".");
  if (a.length === 1) {
    return /* Ok */Block.__(0, [{
                value: Bigint.mul(Bigint.of_string(s), Bigint.pow(Bigint.of_int(10), decimals)),
                decimals: decimals
              }]);
  } else if (a.length === 2) {
    var leftSide = Caml_array.caml_array_get(a, 0);
    var rightSide = Caml_array.caml_array_get(a, 1);
    var rightSideLength = rightSide.length;
    var rr = rightSideLength === decimals ? rightSide : (
        rightSideLength < decimals ? rightSide + repeatString(decimals - rightSideLength | 0, "0") : $$String.sub(rightSide, 0, decimals)
      );
    return /* Ok */Block.__(0, [{
                value: Bigint.of_string(leftSide + rr),
                decimals: decimals
              }]);
  } else {
    return /* Error */Block.__(1, [string]);
  }
}

function ofFloat(f, decimals) {
  var s = f.toString();
  var a = s.split(".");
  if (a.length === 1) {
    return {
            value: Bigint.of_float(f),
            decimals: decimals
          };
  } else if (a.length === 2) {
    var leftSide = Caml_array.caml_array_get(a, 0);
    var rightSide = Caml_array.caml_array_get(a, 1);
    var rightSideLength = rightSide.length;
    var rr = rightSideLength === decimals ? rightSide : (
        rightSideLength < decimals ? rightSide + repeatString(decimals - rightSideLength | 0, "0") : $$String.sub(rightSide, 0, decimals)
      );
    return {
            value: Bigint.of_string(leftSide + rr),
            decimals: decimals
          };
  } else {
    return {
            value: Bigint.zero,
            decimals: decimals
          };
  }
}

function toInt(t) {
  return Bigint.to_int(Bigint.div(t.value, Bigint.pow(Bigint.of_int(10), t.decimals)));
}

function toInt32(t) {
  return Bigint.to_int32(Bigint.div(t.value, Bigint.pow(Bigint.of_int(10), t.decimals)));
}

function toInt64(t) {
  return Bigint.to_int64(Bigint.div(t.value, Bigint.pow(Bigint.of_int(10), t.decimals)));
}

function toNativeint(t) {
  return Bigint.to_nativeint(Bigint.div(t.value, Bigint.pow(Bigint.of_int(10), t.decimals)));
}

function toString(t) {
  var s = Bigint.to_string(t.value);
  var sl = s.length;
  if (t.decimals === 0) {
    return s;
  } else if (sl <= t.decimals) {
    return "0." + (repeatString(t.decimals - sl | 0, "0") + s);
  } else {
    var r = s.slice(sl - t.decimals | 0, sl);
    var l = s.slice(0, sl - t.decimals | 0);
    return l + ("." + r);
  }
}

function toStringWithCommas(t) {
  return addCommas(toString(t));
}

function toFloat(t) {
  return Caml_format.caml_float_of_string(toString(t));
}

function abs(t) {
  return {
          value: Bigint.abs(t.value),
          decimals: t.decimals
        };
}

function neg(t) {
  return {
          value: Bigint.neg(t.value),
          decimals: t.decimals
        };
}

function add(x, y) {
  if (x.decimals === y.decimals) {
    return {
            value: Bigint.add(x.value, y.value),
            decimals: x.decimals
          };
  } else if (x.decimals > y.decimals) {
    var decimals = x.decimals - y.decimals | 0;
    return {
            value: Bigint.add(x.value, Bigint.mul(y.value, Bigint.pow(Bigint.of_int(10), decimals))),
            decimals: x.decimals
          };
  } else {
    var decimals$1 = y.decimals - x.decimals | 0;
    return {
            value: Bigint.add(y.value, Bigint.mul(x.value, Bigint.pow(Bigint.of_int(10), decimals$1))),
            decimals: y.decimals
          };
  }
}

function sub(x, y) {
  if (x.decimals === y.decimals) {
    return {
            value: Bigint.sub(x.value, y.value),
            decimals: x.decimals
          };
  } else if (x.decimals > y.decimals) {
    var decimals = x.decimals - y.decimals | 0;
    return {
            value: Bigint.sub(x.value, Bigint.mul(y.value, Bigint.pow(Bigint.of_int(10), decimals))),
            decimals: x.decimals
          };
  } else {
    var decimals$1 = y.decimals - x.decimals | 0;
    return {
            value: Bigint.sub(y.value, Bigint.mul(x.value, Bigint.pow(Bigint.of_int(10), decimals$1))),
            decimals: y.decimals
          };
  }
}

function mul(x, y) {
  return {
          value: Bigint.mul(x.value, y.value),
          decimals: x.decimals + y.decimals | 0
        };
}

function elongateBy(x, decimals) {
  return {
          value: Bigint.mul(x.value, Bigint.pow(Bigint.of_int(10), decimals)),
          decimals: x.decimals
        };
}

function adjustDecimals(x, y) {
  if (x.decimals === y.decimals) {
    return /* tuple */[
            x,
            y
          ];
  } else if (x.decimals > y.decimals) {
    var decimals = x.decimals - y.decimals | 0;
    return /* tuple */[
            x,
            {
              value: Bigint.mul(y.value, Bigint.pow(Bigint.of_int(10), decimals)),
              decimals: x.decimals
            }
          ];
  } else {
    var decimals$1 = y.decimals - x.decimals | 0;
    return /* tuple */[
            {
              value: Bigint.mul(x.value, Bigint.pow(Bigint.of_int(10), decimals$1)),
              decimals: y.decimals
            },
            y
          ];
  }
}

function div(x, y) {
  if (x.decimals === 0 && y.decimals === 0) {
    return {
            value: Bigint.div(x.value, y.value),
            decimals: x.decimals
          };
  } else {
    var match = adjustDecimals(x, y);
    var y$1 = match[1];
    var x$1 = match[0];
    var xFirstNonZero = Bigint.firstNonZero(x$1.value);
    var yFirstNonZero = Bigint.firstNonZero(y$1.value);
    if (xFirstNonZero !== undefined && yFirstNonZero !== undefined) {
      var yFirstNonZero$1 = yFirstNonZero;
      var xFirstNonZero$1 = xFirstNonZero;
      if (xFirstNonZero$1 >= x$1.decimals && yFirstNonZero$1 >= y$1.decimals) {
        return elongateBy({
                    value: Bigint.div(x$1.value, y$1.value),
                    decimals: x$1.decimals
                  }, x$1.decimals);
      } else {
        var reposition = xFirstNonZero$1 > yFirstNonZero$1 ? y$1.decimals - yFirstNonZero$1 | 0 : x$1.decimals - xFirstNonZero$1 | 0;
        var x$2 = elongateBy(x$1, reposition);
        var y$2 = elongateBy(y$1, reposition);
        return elongateBy({
                    value: Bigint.div(x$2.value, y$2.value),
                    decimals: x$2.decimals
                  }, x$2.decimals);
      }
    } else {
      return {
              value: Bigint.zero,
              decimals: x$1.decimals
            };
    }
  }
}

function compare(x, y) {
  var match = adjustDecimals(x, y);
  return Bigint.compare(match[0].value, match[1].value);
}

function equal(x, y) {
  return compare(x, y) === 0;
}

function leq(x, y) {
  return compare(x, y) < 1;
}

function geq(x, y) {
  return compare(x, y) > -1;
}

function lt(x, y) {
  return compare(x, y) < 0;
}

function gt(x, y) {
  return compare(x, y) > 0;
}

function leqZero(x) {
  return Bigint.compare(x.value, Bigint.zero) <= 0;
}

function geqZero(x) {
  return Bigint.compare(x.value, Bigint.zero) >= 0;
}

function ltZero(x) {
  return Bigint.compare(x.value, Bigint.zero) < 0;
}

function gtZero(x) {
  return Bigint.compare(x.value, Bigint.zero) > 0;
}

function min(x, y) {
  if (compare(x, y) < 0) {
    return y;
  } else {
    return x;
  }
}

function max(x, y) {
  if (compare(x, y) < 0) {
    return x;
  } else {
    return y;
  }
}

exports.mkBigfloat = mkBigfloat;
exports.zero = zero;
exports.one = one;
exports.minusOne = minusOne;
exports.ofInt = ofInt;
exports.ofInt32 = ofInt32;
exports.ofInt64 = ofInt64;
exports.ofNativeint = ofNativeint;
exports.ofFloat = ofFloat;
exports.ofString = ofString;
exports.toInt = toInt;
exports.toInt32 = toInt32;
exports.toInt64 = toInt64;
exports.toNativeint = toNativeint;
exports.toFloat = toFloat;
exports.toString = toString;
exports.toStringWithCommas = toStringWithCommas;
exports.adjustDecimals = adjustDecimals;
exports.abs = abs;
exports.neg = neg;
exports.add = add;
exports.sub = sub;
exports.mul = mul;
exports.div = div;
exports.compare = compare;
exports.equal = equal;
exports.leq = leq;
exports.geq = geq;
exports.lt = lt;
exports.gt = gt;
exports.leqZero = leqZero;
exports.geqZero = geqZero;
exports.ltZero = ltZero;
exports.gtZero = gtZero;
exports.min = min;
exports.max = max;
/* No side effect */
