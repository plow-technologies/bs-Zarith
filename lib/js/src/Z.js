'use strict';

var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var Overflow = Caml_exceptions.create("Z.ZInt.Overflow");

function of_int(x) {
  return x;
}

function of_int32(prim) {
  return prim;
}

function of_int64(prim) {
  return prim[1] | 0;
}

function of_nativeint(prim) {
  return prim;
}

function of_float(prim) {
  return prim | 0;
}

var of_string = Caml_format.caml_int_of_string;

function of_substring(s, pos, len) {
  return Caml_format.caml_int_of_string($$String.sub(s, pos, len));
}

function succ(x) {
  return x + 1 | 0;
}

function pred(x) {
  return x - 1 | 0;
}

function neg(prim) {
  return -prim | 0;
}

function add(x, y) {
  return x + y | 0;
}

function sub(x, y) {
  return x - y | 0;
}

var mul = Caml_int32.imul;

var div = Caml_int32.div;

var rem = Caml_int32.mod_;

function div_rem(a, b) {
  return /* tuple */[
          Caml_int32.div(a, b),
          Caml_int32.mod_(a, b)
        ];
}

function sign(n) {
  if (n === 0) {
    return 0;
  } else if (n < 0) {
    return -1;
  } else {
    return 1;
  }
}

function ediv_rem(a, b) {
  var match = div_rem(a, b);
  var r = match[1];
  var q = match[0];
  if (sign(r) >= 0) {
    return /* tuple */[
            q,
            r
          ];
  } else if (sign(b) >= 0) {
    return /* tuple */[
            q - 1 | 0,
            r + b | 0
          ];
  } else {
    return /* tuple */[
            q + 1 | 0,
            r - b | 0
          ];
  }
}

function ediv(_, _$1) {
  return 0;
}

function erem(_, _$1) {
  return 0;
}

function shift_left(prim, prim$1) {
  return (prim << prim$1);
}

function shift_right(prim, prim$1) {
  return (prim >> prim$1);
}

function numbits(n) {
  var nref = n;
  var count = 0;
  while(nref > count) {
    if ((nref & count) === 1) {
      count = count + 1 | 0;
    } else {
      nref = (nref >>> 1);
    }
  };
  return count;
}

function to_int(x) {
  return x;
}

function to_int32(prim) {
  return prim;
}

var to_int64 = Caml_int64.of_int32;

function to_nativeint(prim) {
  return prim;
}

function to_float(prim) {
  return prim;
}

function round_to_float(x, exact) {
  var m = Caml_int64.of_int32(x);
  return Caml_int64.to_float(exact ? m : Caml_int64.or_(m, /* int64 */[
                    /* hi */0,
                    /* lo */1
                  ]));
}

function to_string(prim) {
  return String(prim);
}

var compare = Caml_obj.caml_compare;

var equal = Caml_obj.caml_equal;

var leq = Caml_obj.caml_lessequal;

var geq = Caml_obj.caml_greaterequal;

var lt = Caml_obj.caml_lessthan;

var gt = Caml_obj.caml_greaterthan;

function is_even() {
  return false;
}

function is_odd() {
  return false;
}

function gcd(a, b) {
  var _a = a;
  var _b = b;
  while(true) {
    var b$1 = _b;
    var a$1 = _a;
    var c = Caml_int32.mod_(a$1, b$1);
    if (c === 0) {
      return b$1;
    } else {
      _b = c;
      _a = b$1;
      continue ;
    }
  };
}

function pow(_, _$1) {
  return 0;
}

function lsl(prim, prim$1) {
  return (prim << prim$1);
}

function asr(prim, prim$1) {
  return (prim >> prim$1);
}

function $star$star(_, _$1) {
  return 0;
}

var $less = Caml_obj.caml_lessthan;

var $great = Caml_obj.caml_greaterthan;

var $less$eq = Caml_obj.caml_lessequal;

var $great$eq = Caml_obj.caml_greaterequal;

function $less$great(a, b) {
  return !Caml_obj.caml_equal(a, b);
}

var ZInt = /* module */[
  /* Overflow */Overflow,
  /* zero */0,
  /* one */1,
  /* minus_one */-1,
  /* of_int */of_int,
  /* of_int32 */of_int32,
  /* of_int64 */of_int64,
  /* of_nativeint */of_nativeint,
  /* of_float */of_float,
  /* of_string */of_string,
  /* of_substring */of_substring,
  /* succ */succ,
  /* pred */pred,
  /* abs */Pervasives.abs,
  /* neg */neg,
  /* add */add,
  /* sub */sub,
  /* mul */mul,
  /* div */div,
  /* rem */rem,
  /* div_rem */div_rem,
  /* ediv_rem */ediv_rem,
  /* ediv */ediv,
  /* erem */erem,
  /* divexact */div,
  /* shift_left */shift_left,
  /* shift_right */shift_right,
  /* numbits */numbits,
  /* to_int */to_int,
  /* to_int32 */to_int32,
  /* to_int64 */to_int64,
  /* to_nativeint */to_nativeint,
  /* to_float */to_float,
  /* round_to_float */round_to_float,
  /* to_string */to_string,
  /* compare */compare,
  /* equal */equal,
  /* leq */leq,
  /* geq */geq,
  /* lt */lt,
  /* gt */gt,
  /* sign */sign,
  /* is_even */is_even,
  /* is_odd */is_odd,
  /* gcd */gcd,
  /* pow */pow,
  /* ~- */neg,
  /* + */add,
  /* - */sub,
  /* * */mul,
  /* / */div,
  /* /| */div,
  /* lsl */lsl,
  /* asr */asr,
  /* ~$ */of_int,
  /* ** */$star$star,
  /* = */equal,
  /* < */$less,
  /* > */$great,
  /* <= */$less$eq,
  /* >= */$great$eq,
  /* <> */$less$great
];

exports.ZInt = ZInt;
/* No side effect */
