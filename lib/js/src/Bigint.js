'use strict';

var List = require("bs-platform/lib/js/list.js");
var Int32 = require("bs-platform/lib/js/int32.js");
var Int64 = require("bs-platform/lib/js/int64.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Nativeint = require("bs-platform/lib/js/nativeint.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var Overflow = Caml_exceptions.create("Bigint.Overflow");

var zero = /* Bigint */[
  /* Pos */0,
  /* [] */0
];

var one = /* Bigint */[
  /* Pos */0,
  /* :: */[
    1,
    /* [] */0
  ]
];

var two = /* Bigint */[
  /* Pos */0,
  /* :: */[
    2,
    /* [] */0
  ]
];

function trimzeros(listy) {
  var trimzeros$prime = function (listy$prime) {
    if (listy$prime) {
      var car = listy$prime[0];
      var exit = 0;
      if (car !== 0 || listy$prime[1]) {
        exit = 1;
      } else {
        return /* [] */0;
      }
      if (exit === 1) {
        var cdr$prime = trimzeros$prime(listy$prime[1]);
        if (car !== 0) {
          return /* :: */[
                  car,
                  cdr$prime
                ];
        } else if (cdr$prime) {
          return /* :: */[
                  car,
                  cdr$prime
                ];
        } else {
          return /* [] */0;
        }
      }
      
    } else {
      return /* [] */0;
    }
  };
  return trimzeros$prime(listy);
}

function charlist_of_string(str) {
  var last = str.length - 1 | 0;
  var _pos = last;
  var _result = /* [] */0;
  while(true) {
    var result = _result;
    var pos = _pos;
    if (pos < 0) {
      return result;
    } else {
      _result = /* :: */[
        Caml_string.get(str, pos),
        result
      ];
      _pos = pos - 1 | 0;
      continue ;
    }
  };
}

function of_string(str) {
  var len = str.length;
  var to_intlist = function (first) {
    var substr = $$String.sub(str, first, len - first | 0);
    var digit = function ($$char) {
      return $$char - /* "0" */48 | 0;
    };
    return trimzeros(List.map(digit, List.rev(charlist_of_string(substr))));
  };
  if (Caml_string.get(str, 0) === /* "-" */45) {
    return /* Bigint */[
            /* Neg */1,
            to_intlist(1)
          ];
  } else {
    return /* Bigint */[
            /* Pos */0,
            to_intlist(0)
          ];
  }
}

function of_substring(s, pos, len) {
  return of_string($$String.sub(s, pos, len));
}

function of_int(i) {
  return of_string(String(i));
}

function of_int32(i) {
  return of_string(Int32.to_string(i));
}

function of_int64(i) {
  return of_string(Int64.to_string(i));
}

function of_nativeint(i) {
  return of_string(Nativeint.to_string(i));
}

function of_float(i) {
  return of_string(Int64.to_string(Caml_int64.of_float(i)));
}

function to_string(param) {
  var value = param[1];
  if (value) {
    var reversed = List.rev(value);
    return $$String.concat("", /* :: */[
                param[0] === /* Pos */0 ? "" : "-",
                List.map((function (prim) {
                        return String(prim);
                      }), reversed)
              ]);
  } else {
    return "0";
  }
}

function cmp(_list1, _list2) {
  while(true) {
    var list2 = _list2;
    var list1 = _list1;
    if (List.length(list1) > List.length(list2)) {
      return 1;
    } else if (List.length(list1) < List.length(list2)) {
      return -1;
    } else {
      var exit = 0;
      if (list1 || list2) {
        exit = 1;
      } else {
        return 0;
      }
      if (exit === 1) {
        var reverselist1 = List.rev(list1);
        var reverselist2 = List.rev(list2);
        if (Caml_obj.caml_greaterthan(List.hd(reverselist1), List.hd(reverselist2))) {
          return 1;
        } else if (Caml_obj.caml_lessthan(List.hd(reverselist1), List.hd(reverselist2))) {
          return -1;
        } else {
          var list1$prime = List.rev(List.tl(reverselist1));
          var list2$prime = List.rev(List.tl(reverselist2));
          _list2 = list2$prime;
          _list1 = list1$prime;
          continue ;
        }
      }
      
    }
  };
}

function add$prime(_list1, _list2, _carry) {
  while(true) {
    var carry = _carry;
    var list2 = _list2;
    var list1 = _list1;
    var exit = 0;
    var exit$1 = 0;
    if (list2 || carry !== 0) {
      exit$1 = 2;
    } else {
      return list1;
    }
    if (exit$1 === 2) {
      if (list1 || carry !== 0) {
        exit = 1;
      } else {
        return list2;
      }
    }
    if (exit === 1) {
      if (list2) {
        if (list1) {
          var sum = (List.hd(list1) + List.hd(list2) | 0) + carry | 0;
          return /* :: */[
                  sum % 10,
                  add$prime(List.tl(list1), List.tl(list2), sum / 10 | 0)
                ];
        } else {
          _carry = 0;
          _list1 = /* :: */[
            carry,
            /* [] */0
          ];
          continue ;
        }
      } else {
        _carry = 0;
        _list2 = /* :: */[
          carry,
          /* [] */0
        ];
        continue ;
      }
    }
    
  };
}

function sub$prime(list1, _list2, _carry) {
  while(true) {
    var carry = _carry;
    var list2 = _list2;
    var exit = 0;
    var exit$1 = 0;
    if (list1) {
      exit$1 = 2;
    } else if (list2) {
      exit = 1;
    } else if (carry !== 0) {
      exit$1 = 2;
    } else {
      return /* [] */0;
    }
    if (exit$1 === 2) {
      if (list2) {
        exit = 1;
      } else if (carry !== 0) {
        _carry = 0;
        _list2 = /* :: */[
          carry,
          /* [] */0
        ];
        continue ;
      } else {
        return list1;
      }
    }
    if (exit === 1) {
      var diff = (List.hd(list1) - List.hd(list2) | 0) - carry | 0;
      if (diff >= 0) {
        return /* :: */[
                diff,
                sub$prime(List.tl(list1), List.tl(list2), 0)
              ];
      } else {
        return /* :: */[
                diff + 10 | 0,
                sub$prime(List.tl(list1), List.tl(list2), 1)
              ];
      }
    }
    
  };
}

function mul$prime(list1, list2$prime, powerof2) {
  if (cmp(powerof2, list1) === 1) {
    return /* tuple */[
            list1,
            /* :: */[
              0,
              /* [] */0
            ]
          ];
  } else {
    var match = mul$prime(list1, add$prime(list2$prime, list2$prime, 0), add$prime(powerof2, powerof2, 0));
    var product = match[1];
    var remainder = match[0];
    if (cmp(remainder, powerof2) === -1) {
      return /* tuple */[
              remainder,
              product
            ];
    } else {
      return /* tuple */[
              trimzeros(sub$prime(remainder, powerof2, 0)),
              add$prime(product, list2$prime, 0)
            ];
    }
  }
}

function add(param, param$1) {
  var value2 = param$1[1];
  var neg2 = param$1[0];
  var value1 = param[1];
  var neg1 = param[0];
  if (neg1 === neg2) {
    return /* Bigint */[
            neg1,
            add$prime(value1, value2, 0)
          ];
  } else if (cmp(value1, value2) === 1) {
    return /* Bigint */[
            neg1,
            trimzeros(sub$prime(value1, value2, 0))
          ];
  } else if (cmp(value1, value2) === -1) {
    return /* Bigint */[
            neg2,
            trimzeros(sub$prime(value2, value1, 0))
          ];
  } else {
    return zero;
  }
}

function sub(param, param$1) {
  var value2 = param$1[1];
  var value1 = param[1];
  var neg1 = param[0];
  if (neg1 === param$1[0]) {
    if (cmp(value1, value2) === 1) {
      if (neg1 === /* Neg */1) {
        return /* Bigint */[
                /* Neg */1,
                trimzeros(sub$prime(value1, value2, 0))
              ];
      } else {
        return /* Bigint */[
                /* Pos */0,
                trimzeros(sub$prime(value1, value2, 0))
              ];
      }
    } else if (cmp(value1, value2) === -1) {
      if (neg1 === /* Neg */1) {
        return /* Bigint */[
                /* Pos */0,
                trimzeros(sub$prime(value2, value1, 0))
              ];
      } else {
        return /* Bigint */[
                /* Neg */1,
                trimzeros(sub$prime(value2, value1, 0))
              ];
      }
    } else {
      return zero;
    }
  } else {
    return /* Bigint */[
            neg1,
            add$prime(value1, value2, 0)
          ];
  }
}

function mul(param, param$1) {
  var match = mul$prime(param[1], param$1[1], /* :: */[
        1,
        /* [] */0
      ]);
  var product = match[1];
  if (param[0] === param$1[0]) {
    return /* Bigint */[
            /* Pos */0,
            product
          ];
  } else {
    return /* Bigint */[
            /* Neg */1,
            product
          ];
  }
}

function div_rem$prime(list1, list2$prime, powerof2) {
  if (cmp(list2$prime, list1) === 1) {
    return /* tuple */[
            /* [] */0,
            list1
          ];
  } else {
    var match = div_rem$prime(list1, add$prime(list2$prime, list2$prime, 0), add$prime(powerof2, powerof2, 0));
    var remainder = match[1];
    var quotient = match[0];
    if (cmp(remainder, list2$prime) === -1) {
      return /* tuple */[
              quotient,
              remainder
            ];
    } else {
      return /* tuple */[
              add$prime(quotient, powerof2, 0),
              trimzeros(sub$prime(remainder, list2$prime, 0))
            ];
    }
  }
}

function div_rem(param, param$1) {
  var neg1 = param[0];
  var match = div_rem$prime(param[1], param$1[1], /* :: */[
        1,
        /* [] */0
      ]);
  var rem = match[1];
  var quotient = match[0];
  var rem$1 = rem === /* [] */0 ? zero : /* Bigint */[
      neg1,
      rem
    ];
  if (neg1 === param$1[0]) {
    return /* tuple */[
            /* Bigint */[
              /* Pos */0,
              quotient
            ],
            rem$1
          ];
  } else {
    return /* tuple */[
            /* Bigint */[
              /* Neg */1,
              quotient
            ],
            rem$1
          ];
  }
}

function compare(param, param$1) {
  var v2 = param$1[1];
  var neg2 = param$1[0];
  var v1 = param[1];
  if (param[0]) {
    if (neg2) {
      return -cmp(v1, v2) | 0;
    } else {
      return -1;
    }
  } else if (neg2) {
    return 1;
  } else {
    return cmp(v1, v2);
  }
}

function sign(n) {
  if (Caml_obj.caml_equal(n, zero)) {
    return 0;
  } else if (compare(n, zero) < 0) {
    return -1;
  } else {
    return 1;
  }
}

function gt(x, y) {
  return compare(x, y) > 0;
}

function lt(x, y) {
  return compare(x, y) < 0;
}

function div(a, b) {
  return div_rem(a, b)[0];
}

function rem(a, b) {
  return div_rem(a, b)[1];
}

function ediv_rem$prime(_t0, _t1, _cum) {
  while(true) {
    var cum = _cum;
    var t1 = _t1;
    var t0 = _t0;
    var v0 = t0[1];
    var t0$prime = /* Bigint */[
      /* Pos */0,
      v0
    ];
    var v1 = t1[1];
    var t1$prime = /* Bigint */[
      /* Pos */0,
      v1
    ];
    var r = sub(t0$prime, t1$prime);
    if (cmp(v0, v1) === 1) {
      _cum = add(cum, one);
      _t1 = t1$prime;
      _t0 = r;
      continue ;
    } else if (cmp(r[1], /* :: */[
            0,
            /* [] */0
          ]) === 0) {
      return /* tuple */[
              cum,
              r
            ];
    } else {
      return /* tuple */[
              add(cum, one),
              r
            ];
    }
  };
}

function ediv_rem(a, b) {
  if (Caml_obj.caml_equal(b, zero)) {
    throw Caml_builtin_exceptions.division_by_zero;
  } else if (a[0]) {
    var match = ediv_rem$prime(a, b, zero);
    var r = trimzeros(match[1][1]);
    return /* tuple */[
            /* Bigint */[
              /* Neg */1,
              match[0][1]
            ],
            /* Bigint */[
              /* Pos */0,
              r
            ]
          ];
  } else {
    return div_rem(a, b);
  }
}

function ediv(a, b) {
  return ediv_rem(a, b)[0];
}

function erem(a, b) {
  return ediv_rem(a, b)[1];
}

function cdiv(a, b) {
  var match = div_rem(a, b);
  var quotient = match[0];
  if (gt(match[1], zero)) {
    return add(quotient, one);
  } else {
    return quotient;
  }
}

function fdiv(a, b) {
  var match = div_rem(a, b);
  var quotient = match[0];
  if (lt(match[1], zero)) {
    return sub(quotient, one);
  } else {
    return quotient;
  }
}

function divexact(a, b) {
  return div_rem(a, b)[0];
}

function is_even(param) {
  var match = div_rem$prime(param[1], /* :: */[
        2,
        /* [] */0
      ], /* :: */[
        1,
        /* [] */0
      ]);
  var remainder = match[1];
  if (remainder === /* [] */0) {
    return true;
  } else {
    return Caml_obj.caml_equal(remainder, /* :: */[
                0,
                /* [] */0
              ]);
  }
}

function is_odd(a) {
  return !is_even(a);
}

function gcd(x, y) {
  var _a = x;
  var _b = y;
  while(true) {
    var b = _b;
    var a = _a;
    var c = erem(a, b);
    if (Caml_obj.caml_equal(c, zero)) {
      return b;
    } else {
      _b = c;
      _a = b;
      continue ;
    }
  };
}

function pow(base, exp) {
  if (exp < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "The exponent must be greater zero or greater."
        ];
  } else if (exp === 0) {
    return one;
  } else if (exp === 1) {
    return base;
  } else {
    var base$1 = base;
    var _exp = exp;
    var _acc = one;
    while(true) {
      var acc = _acc;
      var exp$1 = _exp;
      if (exp$1 <= 0) {
        return acc;
      } else {
        _acc = mul(acc, base$1);
        _exp = exp$1 - 1 | 0;
        continue ;
      }
    };
  }
}

function abs(param) {
  return /* Bigint */[
          /* Pos */0,
          param[1]
        ];
}

function shift_left(x, n) {
  return mul(x, pow(of_string(String(2)), n));
}

function shift_right(x, n) {
  return div(x, pow(of_string(String(2)), n));
}

function neg(param) {
  var n = param[1];
  if (param[0]) {
    return /* Bigint */[
            /* Pos */0,
            n
          ];
  } else {
    return /* Bigint */[
            /* Neg */1,
            n
          ];
  }
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

function succ(x) {
  return add(x, one);
}

function pred(x) {
  return sub(x, one);
}

function numbits(n$prime) {
  var result = 0;
  var n = abs(n$prime);
  while(gt(n, zero)) {
    result = result + 1 | 0;
    n = div(n, two);
  };
  return result;
}

function logand(n1$prime, n2$prime) {
  var byte_val = one;
  var result = zero;
  var n1 = n1$prime;
  var n2 = n2$prime;
  while(gt(n1, zero) || gt(n2, zero)) {
    if (equal(rem(n1, two), one) && equal(rem(n2, two), one)) {
      result = add(result, byte_val);
    }
    n1 = div(n1, two);
    n2 = div(n2, two);
    byte_val = mul(byte_val, two);
  };
  return result;
}

function logor(n1$prime, n2$prime) {
  var byte_val = one;
  var result = zero;
  var n1 = n1$prime;
  var n2 = n2$prime;
  while(gt(n1, zero) || gt(n2, zero)) {
    if (equal(rem(n1, two), one) || equal(rem(n2, two), one)) {
      result = add(result, byte_val);
    }
    n1 = div(n1, two);
    n2 = div(n2, two);
    byte_val = mul(byte_val, two);
  };
  return result;
}

function logxor(n1$prime, n2$prime) {
  var byte_val = one;
  var result = zero;
  var n1 = n1$prime;
  var n2 = n2$prime;
  while(gt(n1, zero) || gt(n2, zero)) {
    if (!equal(rem(n1, two), rem(n2, two))) {
      result = add(result, byte_val);
    }
    n1 = div(n1, two);
    n2 = div(n2, two);
    byte_val = mul(byte_val, two);
  };
  return result;
}

function lognot(n1) {
  var byte_val = one;
  while(lt(byte_val, n1)) {
    byte_val = mul(byte_val, two);
  };
  return sub(byte_val, n1);
}

function min(x, y) {
  if (leq(x, y)) {
    return x;
  } else {
    return y;
  }
}

function max(x, y) {
  if (geq(x, y)) {
    return x;
  } else {
    return y;
  }
}

function $tilde$plus(x) {
  return x;
}

function $less$great(x, y) {
  return !equal(x, y);
}

function to_int(i) {
  if (gt(i, of_string(String(Pervasives.max_int))) || lt(i, of_string(String(Pervasives.min_int)))) {
    throw Overflow;
  } else {
    return Caml_format.caml_int_of_string(to_string(i));
  }
}

function to_int32(i) {
  if (gt(i, of_string(Int32.to_string(Int32.max_int))) || lt(i, of_string(Int32.to_string(Int32.min_int)))) {
    throw Overflow;
  } else {
    return Caml_format.caml_int32_of_string(to_string(i));
  }
}

function to_int64(i) {
  if (gt(i, of_string(Int64.to_string(Int64.max_int))) || lt(i, of_string(Int64.to_string(Int64.min_int)))) {
    throw Overflow;
  } else {
    return Caml_format.caml_int64_of_string(to_string(i));
  }
}

function to_nativeint(i) {
  if (gt(i, of_string(Nativeint.to_string(Nativeint.max_int))) || lt(i, of_string(Nativeint.to_string(Nativeint.min_int)))) {
    throw Overflow;
  } else {
    return Caml_format.caml_nativeint_of_string(to_string(i));
  }
}

function to_float(i) {
  return Caml_format.caml_float_of_string(to_string(i));
}

function round_to_float(x, exact) {
  var i = exact ? x : logor(x, one);
  return Caml_format.caml_float_of_string(to_string(i));
}

var minus_one = /* Bigint */[
  /* Neg */1,
  /* :: */[
    1,
    /* [] */0
  ]
];

var $tilde$neg = neg;

var $plus = add;

var $neg = sub;

var $star = mul;

var $slash = div;

var $slash$great = cdiv;

var $slash$less = fdiv;

var $slash$pipe = divexact;

var mod = rem;

var land = logand;

var lor = logor;

var lxor = logxor;

var $tilde$bang = lognot;

var lsl = shift_left;

var asr = shift_right;

var $tilde$ = of_int;

var $star$star = pow;

var $eq = equal;

var $less = lt;

var $great = gt;

var $less$eq = leq;

var $great$eq = geq;

exports.Overflow = Overflow;
exports.zero = zero;
exports.one = one;
exports.minus_one = minus_one;
exports.of_int = of_int;
exports.of_int32 = of_int32;
exports.of_int64 = of_int64;
exports.of_nativeint = of_nativeint;
exports.of_float = of_float;
exports.of_string = of_string;
exports.of_substring = of_substring;
exports.succ = succ;
exports.pred = pred;
exports.abs = abs;
exports.neg = neg;
exports.add = add;
exports.sub = sub;
exports.mul = mul;
exports.div = div;
exports.rem = rem;
exports.div_rem = div_rem;
exports.cdiv = cdiv;
exports.fdiv = fdiv;
exports.ediv_rem = ediv_rem;
exports.ediv = ediv;
exports.erem = erem;
exports.divexact = divexact;
exports.logand = logand;
exports.logor = logor;
exports.logxor = logxor;
exports.lognot = lognot;
exports.shift_left = shift_left;
exports.shift_right = shift_right;
exports.numbits = numbits;
exports.to_int = to_int;
exports.to_int32 = to_int32;
exports.to_int64 = to_int64;
exports.to_nativeint = to_nativeint;
exports.to_float = to_float;
exports.to_string = to_string;
exports.compare = compare;
exports.equal = equal;
exports.leq = leq;
exports.geq = geq;
exports.lt = lt;
exports.gt = gt;
exports.sign = sign;
exports.min = min;
exports.max = max;
exports.is_even = is_even;
exports.is_odd = is_odd;
exports.gcd = gcd;
exports.pow = pow;
exports.$tilde$neg = $tilde$neg;
exports.$tilde$plus = $tilde$plus;
exports.$plus = $plus;
exports.$neg = $neg;
exports.$star = $star;
exports.$slash = $slash;
exports.$slash$great = $slash$great;
exports.$slash$less = $slash$less;
exports.$slash$pipe = $slash$pipe;
exports.mod = mod;
exports.land = land;
exports.lor = lor;
exports.lxor = lxor;
exports.$tilde$bang = $tilde$bang;
exports.lsl = lsl;
exports.asr = asr;
exports.$tilde$ = $tilde$;
exports.$star$star = $star$star;
exports.$eq = $eq;
exports.$less = $less;
exports.$great = $great;
exports.$less$eq = $less$eq;
exports.$great$eq = $great$eq;
exports.$less$great = $less$great;
exports.round_to_float = round_to_float;
/* No side effect */
