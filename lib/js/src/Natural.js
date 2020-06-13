'use strict';

var Bigint = require("./Bigint.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var Underflow = Caml_exceptions.create("Natural.Underflow");

var DecodeError = Caml_exceptions.create("Natural.DecodeError");

var zero = /* Natural */[Bigint.zero];

var one = /* Natural */[Bigint.one];

function ofInt(x) {
  var r = Bigint.of_int(x);
  if (Bigint.lt(r, Bigint.zero)) {
    return ;
  } else {
    return /* Natural */[r];
  }
}

function ofInt32(x) {
  var r = Bigint.of_int32(x);
  if (Bigint.lt(r, Bigint.zero)) {
    return ;
  } else {
    return /* Natural */[r];
  }
}

function ofInt64(x) {
  var r = Bigint.of_int64(x);
  if (Bigint.lt(r, Bigint.zero)) {
    return ;
  } else {
    return /* Natural */[r];
  }
}

function ofNativeint(x) {
  var r = Bigint.of_nativeint(x);
  if (Bigint.lt(r, Bigint.zero)) {
    return ;
  } else {
    return /* Natural */[r];
  }
}

function ofFloat(x) {
  var r = Bigint.of_float(x);
  if (Bigint.lt(r, Bigint.zero)) {
    return ;
  } else {
    return /* Natural */[r];
  }
}

function ofString(x) {
  var r = Bigint.of_string_opt(x);
  if (r !== undefined) {
    var r$1 = r;
    if (Bigint.lt(r$1, Bigint.zero)) {
      return ;
    } else {
      return /* Natural */[r$1];
    }
  }
  
}

function unsafeOfInt(x) {
  var match = ofInt(x);
  if (match !== undefined) {
    return match;
  } else {
    throw Underflow;
  }
}

function unsafeOfInt32(x) {
  var match = ofInt32(x);
  if (match !== undefined) {
    return match;
  } else {
    throw Underflow;
  }
}

function unsafeOfInt64(x) {
  var match = ofInt64(x);
  if (match !== undefined) {
    return match;
  } else {
    throw Underflow;
  }
}

function unsafeOfNativeint(x) {
  var match = ofNativeint(x);
  if (match !== undefined) {
    return match;
  } else {
    throw Underflow;
  }
}

function unsafeOfFloat(x) {
  var match = ofFloat(x);
  if (match !== undefined) {
    return match;
  } else {
    throw Underflow;
  }
}

function unsafeOfString(x) {
  var match = ofString(x);
  if (match !== undefined) {
    return match;
  } else {
    throw DecodeError;
  }
}

function toInt(x) {
  return Bigint.to_int(x[0]);
}

function toInt32(x) {
  return Bigint.to_int32(x[0]);
}

function toInt64(x) {
  return Bigint.to_int64(x[0]);
}

function toNativeint(x) {
  return Bigint.to_nativeint(x[0]);
}

function toFloat(x) {
  return Bigint.to_float(x[0]);
}

function toString(x) {
  return Bigint.to_string(x[0]);
}

function succ(x) {
  return /* Natural */[Bigint.add(x[0], Bigint.one)];
}

function pred(x) {
  var r = Bigint.sub(x[0], Bigint.one);
  if (Bigint.lt(r, Bigint.zero)) {
    throw Underflow;
  }
  return /* Natural */[r];
}

function predSafe(x) {
  var x$1;
  try {
    x$1 = pred(x);
  }
  catch (exn){
    if (exn === Underflow) {
      return ;
    } else {
      throw exn;
    }
  }
  return x$1;
}

function add(x, y) {
  return /* Natural */[Bigint.add(x[0], y[0])];
}

function sub(x, y) {
  var r = Bigint.sub(x[0], y[0]);
  if (Bigint.lt(r, Bigint.zero)) {
    throw Underflow;
  }
  return /* Natural */[r];
}

function subSafe(x, y) {
  var r;
  try {
    r = sub(x, y);
  }
  catch (exn){
    if (exn === Underflow) {
      return ;
    } else {
      throw exn;
    }
  }
  return r;
}

function mul(x, y) {
  return /* Natural */[Bigint.mul(x[0], y[0])];
}

function div(x, y) {
  return /* Natural */[Bigint.div(x[0], y[0])];
}

function rem(x, y) {
  return /* Natural */[Bigint.rem(x[0], y[0])];
}

function divRem(x, y) {
  var match = Bigint.div_rem(x[0], y[0]);
  return /* tuple */[
          /* Natural */[match[0]],
          /* Natural */[match[1]]
        ];
}

function cdiv(x, y) {
  return /* Natural */[Bigint.cdiv(x[0], y[0])];
}

function fdiv(x, y) {
  return /* Natural */[Bigint.fdiv(x[0], y[0])];
}

function edivRem(x, y) {
  var match = Bigint.ediv_rem(x[0], y[0]);
  return /* tuple */[
          /* Natural */[match[0]],
          /* Natural */[match[1]]
        ];
}

function ediv(x, y) {
  return /* Natural */[Bigint.ediv(x[0], y[0])];
}

function erem(x, y) {
  return /* Natural */[Bigint.erem(x[0], y[0])];
}

function divexact(x, y) {
  return /* Natural */[Bigint.divexact(x[0], y[0])];
}

exports.Underflow = Underflow;
exports.DecodeError = DecodeError;
exports.zero = zero;
exports.one = one;
exports.ofInt = ofInt;
exports.ofInt32 = ofInt32;
exports.ofInt64 = ofInt64;
exports.ofNativeint = ofNativeint;
exports.ofFloat = ofFloat;
exports.ofString = ofString;
exports.unsafeOfInt = unsafeOfInt;
exports.unsafeOfInt32 = unsafeOfInt32;
exports.unsafeOfInt64 = unsafeOfInt64;
exports.unsafeOfNativeint = unsafeOfNativeint;
exports.unsafeOfFloat = unsafeOfFloat;
exports.unsafeOfString = unsafeOfString;
exports.toInt = toInt;
exports.toInt32 = toInt32;
exports.toInt64 = toInt64;
exports.toNativeint = toNativeint;
exports.toFloat = toFloat;
exports.toString = toString;
exports.succ = succ;
exports.pred = pred;
exports.predSafe = predSafe;
exports.add = add;
exports.sub = sub;
exports.subSafe = subSafe;
exports.mul = mul;
exports.div = div;
exports.rem = rem;
exports.divRem = divRem;
exports.cdiv = cdiv;
exports.fdiv = fdiv;
exports.edivRem = edivRem;
exports.ediv = ediv;
exports.erem = erem;
exports.divexact = divexact;
/* No side effect */
