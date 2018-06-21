'use strict';

var Z = require("./Z.js");
var Curry = require("bs-platform/lib/js/curry.js");
var $$Buffer = require("bs-platform/lib/js/buffer.js");
var Format = require("bs-platform/lib/js/format.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_float = require("bs-platform/lib/js/caml_float.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function mk(n, d) {
  return /* record */[
          /* num */n,
          /* den */d
        ];
}

function make_real(n, d) {
  if (n === Z.Nativeint[/* zero */1] || d === Z.Nativeint[/* one */2]) {
    return /* record */[
            /* num */n,
            /* den */Z.Nativeint[/* one */2]
          ];
  } else {
    var g = Z.Nativeint[/* gcd */52](n, d);
    if (g === Z.Nativeint[/* one */2]) {
      return /* record */[
              /* num */n,
              /* den */d
            ];
    } else {
      return /* record */[
              /* num */Z.Nativeint[/* divexact */25](n, g),
              /* den */Z.Nativeint[/* divexact */25](d, g)
            ];
    }
  }
}

function make(n, d) {
  var sd = Z.Nativeint[/* sign */47](d);
  if (sd === 0) {
    return /* record */[
            /* num */Z.Nativeint[/* of_int */4](Z.Nativeint[/* sign */47](n)),
            /* den */Z.Nativeint[/* zero */1]
          ];
  } else if (sd > 0) {
    return make_real(n, d);
  } else {
    return make_real(Z.Nativeint[/* neg */15](n), Z.Nativeint[/* neg */15](d));
  }
}

function of_bigint(n) {
  return /* record */[
          /* num */n,
          /* den */Z.Nativeint[/* one */2]
        ];
}

function of_int(n) {
  var n$1 = Z.Nativeint[/* of_int */4](n);
  return /* record */[
          /* num */n$1,
          /* den */Z.Nativeint[/* one */2]
        ];
}

function of_int32(n) {
  var n$1 = Z.Nativeint[/* of_int32 */5](n);
  return /* record */[
          /* num */n$1,
          /* den */Z.Nativeint[/* one */2]
        ];
}

function of_int64(n) {
  var n$1 = Z.Nativeint[/* of_int64 */6](n);
  return /* record */[
          /* num */n$1,
          /* den */Z.Nativeint[/* one */2]
        ];
}

function of_nativeint(n) {
  var n$1 = Z.Nativeint[/* of_nativeint */7](n);
  return /* record */[
          /* num */n$1,
          /* den */Z.Nativeint[/* one */2]
        ];
}

function of_ints(n, d) {
  return make(Z.Nativeint[/* of_int */4](n), Z.Nativeint[/* of_int */4](d));
}

var zero_000 = /* num */Z.Nativeint[/* zero */1];

var zero_001 = /* den */Z.Nativeint[/* one */2];

var zero = /* record */[
  zero_000,
  zero_001
];

var one_000 = /* num */Z.Nativeint[/* one */2];

var one_001 = /* den */Z.Nativeint[/* one */2];

var one = /* record */[
  one_000,
  one_001
];

var minus_one_000 = /* num */Z.Nativeint[/* minus_one */3];

var minus_one_001 = /* den */Z.Nativeint[/* one */2];

var minus_one = /* record */[
  minus_one_000,
  minus_one_001
];

var inf_000 = /* num */Z.Nativeint[/* one */2];

var inf_001 = /* den */Z.Nativeint[/* zero */1];

var inf = /* record */[
  inf_000,
  inf_001
];

var minus_inf_000 = /* num */Z.Nativeint[/* minus_one */3];

var minus_inf_001 = /* den */Z.Nativeint[/* zero */1];

var minus_inf = /* record */[
  minus_inf_000,
  minus_inf_001
];

var undef_000 = /* num */Z.Nativeint[/* zero */1];

var undef_001 = /* den */Z.Nativeint[/* zero */1];

var undef = /* record */[
  undef_000,
  undef_001
];

function of_float(d) {
  if (d === Number.POSITIVE_INFINITY) {
    return inf;
  } else if (d === Number.NEGATIVE_INFINITY) {
    return minus_inf;
  } else if (Caml_float.caml_classify_float(d) === /* FP_nan */4) {
    return undef;
  } else {
    var match = Caml_float.caml_frexp_float(d);
    var m = Z.Nativeint[/* of_float */9](Caml_float.caml_ldexp_float(match[0], 53));
    var e = match[1] - 53 | 0;
    if (e >= 0) {
      var n = Z.Nativeint[/* shift_left */30](m, e);
      return /* record */[
              /* num */n,
              /* den */Z.Nativeint[/* one */2]
            ];
    } else {
      return make_real(m, Z.Nativeint[/* shift_left */30](Z.Nativeint[/* one */2], -e | 0));
    }
  }
}

function of_string(s) {
  try {
    var i = $$String.index(s, /* "/" */47);
    return make(Z.Nativeint[/* of_substring */11](s, 0, i), Z.Nativeint[/* of_substring */11](s, i + 1 | 0, (s.length - i | 0) - 1 | 0));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      if (s === "inf" || s === "+inf") {
        return inf;
      } else if (s === "-inf") {
        return minus_inf;
      } else if (s === "undef") {
        return undef;
      } else {
        var n = Z.Nativeint[/* of_string */10](s);
        return /* record */[
                /* num */n,
                /* den */Z.Nativeint[/* one */2]
              ];
      }
    } else {
      throw exn;
    }
  }
}

function classify(n) {
  if (n[/* den */1] === Z.Nativeint[/* zero */1]) {
    var match = Z.Nativeint[/* sign */47](n[/* num */0]);
    var switcher = match + 1 | 0;
    if (switcher > 2 || switcher < 0) {
      return /* UNDEF */3;
    } else {
      switch (switcher) {
        case 0 : 
            return /* MINF */2;
        case 1 : 
            return /* UNDEF */3;
        case 2 : 
            return /* INF */1;
        
      }
    }
  } else if (n[/* num */0] === Z.Nativeint[/* zero */1]) {
    return /* ZERO */0;
  } else {
    return /* NZERO */4;
  }
}

function is_real(n) {
  return n[/* den */1] !== Z.Nativeint[/* zero */1];
}

function num(x) {
  return x[/* num */0];
}

function den(x) {
  return x[/* den */1];
}

function sign(x) {
  return Z.Nativeint[/* sign */47](x[/* num */0]);
}

function equal(x, y) {
  if (Z.Nativeint[/* equal */42](x[/* num */0], y[/* num */0])) {
    return Z.Nativeint[/* equal */42](x[/* den */1], y[/* den */1]);
  } else {
    return false;
  }
}

function compare(x, y) {
  var match = classify(x);
  var match$1 = classify(y);
  var exit = 0;
  var exit$1 = 0;
  var exit$2 = 0;
  switch (match) {
    case 1 : 
        var switcher = match$1 - 1 | 0;
        if (switcher > 2 || switcher < 0) {
          exit$1 = 2;
        } else {
          switch (switcher) {
            case 0 : 
                return 0;
            case 1 : 
                exit$1 = 2;
                break;
            case 2 : 
                exit$2 = 3;
                break;
            
          }
        }
        break;
    case 2 : 
        if (match$1 !== 1) {
          if (match$1 !== 0) {
            switch (match$1 - 2 | 0) {
              case 0 : 
                  return 0;
              case 1 : 
                  exit$2 = 3;
                  break;
              case 2 : 
                  exit$1 = 2;
                  break;
              
            }
          } else {
            exit$1 = 2;
          }
        } else {
          exit$2 = 3;
        }
        break;
    case 3 : 
        if (match$1 !== 3) {
          return -1;
        } else {
          return 0;
        }
    case 0 : 
    case 4 : 
        exit$2 = 3;
        break;
    
  }
  if (exit$2 === 3) {
    var switcher$1 = match$1 - 1 | 0;
    if (switcher$1 > 2 || switcher$1 < 0) {
      exit$1 = 2;
    } else {
      switch (switcher$1) {
        case 0 : 
            return -1;
        case 1 : 
            exit$1 = 2;
            break;
        case 2 : 
            return 1;
        
      }
    }
  }
  if (exit$1 === 2) {
    if (match >= 4) {
      exit = 1;
    } else {
      switch (match) {
        case 0 : 
            exit = 1;
            break;
        case 1 : 
            return 1;
        case 2 : 
            return -1;
        
      }
    }
  }
  if (exit === 1) {
    if (match$1 !== 2) {
      if (x[/* den */1] === y[/* den */1]) {
        return Curry._2(Z.Nativeint[/* compare */41], x[/* num */0], y[/* num */0]);
      } else {
        return Curry._2(Z.Nativeint[/* compare */41], Z.Nativeint[/* mul */18](x[/* num */0], y[/* den */1]), Z.Nativeint[/* mul */18](y[/* num */0], x[/* den */1]));
      }
    } else {
      return 1;
    }
  }
  
}

function min(a, b) {
  if (compare(a, b) <= 0) {
    return a;
  } else {
    return b;
  }
}

function max(a, b) {
  if (compare(a, b) >= 0) {
    return a;
  } else {
    return b;
  }
}

function leq(a, b) {
  return compare(a, b) <= 0;
}

function geq(a, b) {
  return compare(a, b) >= 0;
}

function lt(a, b) {
  return compare(a, b) < 0;
}

function gt(a, b) {
  return compare(a, b) > 0;
}

function to_string(n) {
  var match = classify(n);
  switch (match) {
    case 0 : 
        return "0";
    case 1 : 
        return "+inf";
    case 2 : 
        return "-inf";
    case 3 : 
        return "undef";
    case 4 : 
        if (Z.Nativeint[/* equal */42](n[/* den */1], Z.Nativeint[/* one */2])) {
          return Curry._1(Z.Nativeint[/* to_string */40], n[/* num */0]);
        } else {
          return Curry._1(Z.Nativeint[/* to_string */40], n[/* num */0]) + ("/" + Curry._1(Z.Nativeint[/* to_string */40], n[/* den */1]));
        }
    
  }
}

function to_bigint(x) {
  return Z.Nativeint[/* div */19](x[/* num */0], x[/* den */1]);
}

function to_int(x) {
  return Z.Nativeint[/* to_int */33](to_bigint(x));
}

function to_int32(x) {
  return Z.Nativeint[/* to_int32 */34](to_bigint(x));
}

function to_int64(x) {
  return Z.Nativeint[/* to_int64 */35](to_bigint(x));
}

function to_nativeint(x) {
  return Z.Nativeint[/* to_nativeint */36](to_bigint(x));
}

function to_float(x) {
  var match = classify(x);
  switch (match) {
    case 0 : 
        return 0.0;
    case 1 : 
        return Number.POSITIVE_INFINITY;
    case 2 : 
        return Number.NEGATIVE_INFINITY;
    case 3 : 
        return Number.NaN;
    case 4 : 
        var p = x[/* num */0];
        var q = x[/* den */1];
        var np = Z.Nativeint[/* numbits */32](p);
        var nq = Z.Nativeint[/* numbits */32](q);
        if (np <= 53 && nq <= 53) {
          return Caml_int64.to_float(Z.Nativeint[/* to_int64 */35](p)) / Caml_int64.to_float(Z.Nativeint[/* to_int64 */35](q));
        } else {
          var n = 55 - (np - nq | 0) | 0;
          var match$1 = n >= 0 ? /* tuple */[
              Z.Nativeint[/* shift_left */30](p, n),
              q
            ] : /* tuple */[
              p,
              Z.Nativeint[/* shift_left */30](q, -n | 0)
            ];
          var match$2 = Z.Nativeint[/* ediv_rem */22](match$1[0], match$1[1]);
          var f = Z.Nativeint[/* round_to_float */39](match$2[0], Z.Nativeint[/* sign */47](match$2[1]) === 0);
          return Caml_float.caml_ldexp_float(f, -n | 0);
        }
    
  }
}

function neg(x) {
  return /* record */[
          /* num */Z.Nativeint[/* neg */15](x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function abs(x) {
  return /* record */[
          /* num */Curry._1(Z.Nativeint[/* abs */14], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function aors(zaors, x, y) {
  if (x[/* den */1] === y[/* den */1]) {
    return make_real(Curry._2(zaors, x[/* num */0], y[/* num */0]), x[/* den */1]);
  } else {
    return make_real(Curry._2(zaors, Z.Nativeint[/* mul */18](x[/* num */0], y[/* den */1]), Z.Nativeint[/* mul */18](y[/* num */0], x[/* den */1])), Z.Nativeint[/* mul */18](x[/* den */1], y[/* den */1]));
  }
}

function add(x, y) {
  if (x[/* den */1] === Z.Nativeint[/* zero */1] || y[/* den */1] === Z.Nativeint[/* zero */1]) {
    var match = classify(x);
    var match$1 = classify(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return y;
      case 1 : 
          switch (match$1) {
            case 2 : 
                return undef;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 1 : 
            case 4 : 
                exit = 1;
                break;
            
          }
          break;
      case 2 : 
          switch (match$1) {
            case 1 : 
                return undef;
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf;
            
          }
          break;
      case 3 : 
          exit$1 = 3;
          break;
      case 4 : 
          switch (match$1) {
            case 1 : 
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return Pervasives.failwith("impossible case");
            
          }
          break;
      
    }
    if (exit$1 === 3) {
      if (match$1 !== 3) {
        if (match$1 !== 0) {
          exit = 1;
        } else {
          return x;
        }
      } else {
        return undef;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef;
          } else {
            return inf;
          }
      case 2 : 
          if (match$1 >= 2) {
            return minus_inf;
          } else {
            return inf;
          }
      
    }
  } else {
    return aors(Z.Nativeint[/* add */16], x, y);
  }
}

function sub(x, y) {
  if (x[/* den */1] === Z.Nativeint[/* zero */1] || y[/* den */1] === Z.Nativeint[/* zero */1]) {
    var match = classify(x);
    var match$1 = classify(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return neg(y);
      case 1 : 
          switch (match$1) {
            case 1 : 
                return undef;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 2 : 
            case 4 : 
                exit = 1;
                break;
            
          }
          break;
      case 2 : 
          switch (match$1) {
            case 1 : 
                exit = 2;
                break;
            case 2 : 
                return undef;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf;
            
          }
          break;
      case 3 : 
          exit$1 = 3;
          break;
      case 4 : 
          switch (match$1) {
            case 1 : 
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return Pervasives.failwith("impossible case");
            
          }
          break;
      
    }
    if (exit$1 === 3) {
      if (match$1 !== 3) {
        if (match$1 !== 0) {
          exit = 1;
        } else {
          return x;
        }
      } else {
        return undef;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef;
          } else {
            return inf;
          }
      case 2 : 
          if (match$1 >= 2) {
            return inf;
          } else {
            return minus_inf;
          }
      
    }
  } else {
    return aors(Z.Nativeint[/* sub */17], x, y);
  }
}

function mul(x, y) {
  if (x[/* den */1] === Z.Nativeint[/* zero */1] || y[/* den */1] === Z.Nativeint[/* zero */1]) {
    return /* record */[
            /* num */Z.Nativeint[/* of_int */4](Caml_int32.imul(Z.Nativeint[/* sign */47](x[/* num */0]), Z.Nativeint[/* sign */47](y[/* num */0]))),
            /* den */Z.Nativeint[/* zero */1]
          ];
  } else {
    return make_real(Z.Nativeint[/* mul */18](x[/* num */0], y[/* num */0]), Z.Nativeint[/* mul */18](x[/* den */1], y[/* den */1]));
  }
}

function inv(x) {
  var match = Z.Nativeint[/* sign */47](x[/* num */0]);
  var exit = 0;
  var switcher = match + 1 | 0;
  if (switcher > 2 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return /* record */[
                  /* num */Z.Nativeint[/* neg */15](x[/* den */1]),
                  /* den */Z.Nativeint[/* neg */15](x[/* num */0])
                ];
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return /* record */[
                  /* num */x[/* den */1],
                  /* den */x[/* num */0]
                ];
      
    }
  }
  if (exit === 1) {
    if (x[/* den */1] === Z.Nativeint[/* zero */1]) {
      return undef;
    } else {
      return inf;
    }
  }
  
}

function div(x, y) {
  if (Z.Nativeint[/* sign */47](y[/* num */0]) >= 0) {
    return mul(x, /* record */[
                /* num */y[/* den */1],
                /* den */y[/* num */0]
              ]);
  } else {
    return mul(x, /* record */[
                /* num */Z.Nativeint[/* neg */15](y[/* den */1]),
                /* den */Z.Nativeint[/* neg */15](y[/* num */0])
              ]);
  }
}

function mul_2exp(x, n) {
  if (x[/* den */1] === Z.Nativeint[/* zero */1]) {
    return x;
  } else {
    return make_real(Z.Nativeint[/* shift_left */30](x[/* num */0], n), x[/* den */1]);
  }
}

function div_2exp(x, n) {
  if (x[/* den */1] === Z.Nativeint[/* zero */1]) {
    return x;
  } else {
    return make_real(x[/* num */0], Z.Nativeint[/* shift_left */30](x[/* den */1], n));
  }
}

function print(x) {
  return Pervasives.print_string(to_string(x));
}

function output(chan, x) {
  return Pervasives.output_string(chan, to_string(x));
}

function sprint(_, x) {
  return to_string(x);
}

function bprint(b, x) {
  return $$Buffer.add_string(b, to_string(x));
}

function pp_print(f, x) {
  return Format.pp_print_string(f, to_string(x));
}

function $tilde$plus(x) {
  return x;
}

function $less$great(a, b) {
  return !equal(a, b);
}

var Q_Nativeint = /* module */[
  /* mk */mk,
  /* make_real */make_real,
  /* make */make,
  /* of_bigint */of_bigint,
  /* of_int */of_int,
  /* of_int32 */of_int32,
  /* of_int64 */of_int64,
  /* of_nativeint */of_nativeint,
  /* of_ints */of_ints,
  /* zero */zero,
  /* one */one,
  /* minus_one */minus_one,
  /* inf */inf,
  /* minus_inf */minus_inf,
  /* undef */undef,
  /* of_float */of_float,
  /* of_string */of_string,
  /* classify */classify,
  /* is_real */is_real,
  /* num */num,
  /* den */den,
  /* sign */sign,
  /* equal */equal,
  /* compare */compare,
  /* min */min,
  /* max */max,
  /* leq */leq,
  /* geq */geq,
  /* lt */lt,
  /* gt */gt,
  /* to_string */to_string,
  /* to_bigint */to_bigint,
  /* to_int */to_int,
  /* to_int32 */to_int32,
  /* to_int64 */to_int64,
  /* to_nativeint */to_nativeint,
  /* to_float */to_float,
  /* neg */neg,
  /* abs */abs,
  /* aors */aors,
  /* add */add,
  /* sub */sub,
  /* mul */mul,
  /* inv */inv,
  /* div */div,
  /* mul_2exp */mul_2exp,
  /* div_2exp */div_2exp,
  /* print */print,
  /* output */output,
  /* sprint */sprint,
  /* bprint */bprint,
  /* pp_print */pp_print,
  /* ~- */neg,
  /* ~+ */$tilde$plus,
  /* + */add,
  /* - */sub,
  /* * */mul,
  /* / */div,
  /* lsl */mul_2exp,
  /* asr */div_2exp,
  /* ~$ */of_int,
  /* // */of_ints,
  /* ~$$ */of_bigint,
  /* /// */make,
  /* = */equal,
  /* < */lt,
  /* > */gt,
  /* <= */leq,
  /* >= */geq,
  /* <> */$less$great
];

exports.Q_Nativeint = Q_Nativeint;
/* Format Not a pure module */
