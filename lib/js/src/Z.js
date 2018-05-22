'use strict';

var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
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

function ediv_rem$prime(_a, _b, _cum) {
  while(true) {
    var cum = _cum;
    var b = _b;
    var a = _a;
    var a$1 = Pervasives.abs(a);
    var b$1 = Pervasives.abs(b);
    var r = a$1 - b$1 | 0;
    if (Caml_primitive.caml_int_compare(a$1, b$1) === 1) {
      _cum = cum + 1 | 0;
      _b = b$1;
      _a = r;
      continue ;
    } else {
      return /* tuple */[
              cum + 1 | 0,
              r
            ];
    }
  };
}

function ediv_rem(a, b) {
  if (a > -1) {
    return div_rem(a, b);
  } else {
    var match = ediv_rem$prime(a, b, 0);
    return /* tuple */[
            -match[0] | 0,
            Pervasives.abs(match[1])
          ];
  }
}

function ediv(a, b) {
  return ediv_rem(a, b)[0];
}

function erem(a, b) {
  return ediv_rem(a, b)[1];
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

function is_even(i) {
  return i % 2 === 0;
}

function is_odd(i) {
  return i % 2 !== 0;
}

function gcd(x, y) {
  var _a = x;
  var _b = y;
  while(true) {
    var b = _b;
    var a = _a;
    var c = erem(a, b);
    if (c === 0) {
      return b;
    } else {
      _b = c;
      _a = b;
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
