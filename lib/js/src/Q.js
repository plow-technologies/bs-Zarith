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
  if (n === Z.ZInt[/* zero */1] || d === Z.ZInt[/* one */2]) {
    return /* record */[
            /* num */n,
            /* den */Z.ZInt[/* one */2]
          ];
  } else {
    var g = Curry._2(Z.ZInt[/* gcd */50], n, d);
    if (g === Z.ZInt[/* one */2]) {
      return /* record */[
              /* num */n,
              /* den */d
            ];
    } else {
      return /* record */[
              /* num */Curry._2(Z.ZInt[/* divexact */24], n, g),
              /* den */Curry._2(Z.ZInt[/* divexact */24], d, g)
            ];
    }
  }
}

function make(n, d) {
  var sd = Curry._1(Z.ZInt[/* sign */45], d);
  if (sd === 0) {
    return /* record */[
            /* num */Curry._1(Z.ZInt[/* of_int */4], Curry._1(Z.ZInt[/* sign */45], n)),
            /* den */Z.ZInt[/* zero */1]
          ];
  } else if (sd > 0) {
    return make_real(n, d);
  } else {
    return make_real(Curry._1(Z.ZInt[/* neg */14], n), Curry._1(Z.ZInt[/* neg */14], d));
  }
}

function of_bigint(n) {
  return /* record */[
          /* num */n,
          /* den */Z.ZInt[/* one */2]
        ];
}

function of_int(n) {
  var n$1 = Curry._1(Z.ZInt[/* of_int */4], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt[/* one */2]
        ];
}

function of_int32(n) {
  var n$1 = Curry._1(Z.ZInt[/* of_int32 */5], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt[/* one */2]
        ];
}

function of_int64(n) {
  var n$1 = Curry._1(Z.ZInt[/* of_int64 */6], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt[/* one */2]
        ];
}

function of_nativeint(n) {
  var n$1 = Curry._1(Z.ZInt[/* of_nativeint */7], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt[/* one */2]
        ];
}

function of_ints(n, d) {
  return make(Curry._1(Z.ZInt[/* of_int */4], n), Curry._1(Z.ZInt[/* of_int */4], d));
}

var zero_000 = /* num */Z.ZInt[/* zero */1];

var zero_001 = /* den */Z.ZInt[/* one */2];

var zero = /* record */[
  zero_000,
  zero_001
];

var one_000 = /* num */Z.ZInt[/* one */2];

var one_001 = /* den */Z.ZInt[/* one */2];

var one = /* record */[
  one_000,
  one_001
];

var minus_one_000 = /* num */Z.ZInt[/* minus_one */3];

var minus_one_001 = /* den */Z.ZInt[/* one */2];

var minus_one = /* record */[
  minus_one_000,
  minus_one_001
];

var inf_000 = /* num */Z.ZInt[/* one */2];

var inf_001 = /* den */Z.ZInt[/* zero */1];

var inf = /* record */[
  inf_000,
  inf_001
];

var minus_inf_000 = /* num */Z.ZInt[/* minus_one */3];

var minus_inf_001 = /* den */Z.ZInt[/* zero */1];

var minus_inf = /* record */[
  minus_inf_000,
  minus_inf_001
];

var undef_000 = /* num */Z.ZInt[/* zero */1];

var undef_001 = /* den */Z.ZInt[/* zero */1];

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
    var m = Curry._1(Z.ZInt[/* of_float */8], Caml_float.caml_ldexp_float(match[0], 53));
    var e = match[1] - 53 | 0;
    if (e >= 0) {
      var n = Curry._2(Z.ZInt[/* shift_left */29], m, e);
      return /* record */[
              /* num */n,
              /* den */Z.ZInt[/* one */2]
            ];
    } else {
      return make_real(m, Curry._2(Z.ZInt[/* shift_left */29], Z.ZInt[/* one */2], -e | 0));
    }
  }
}

function of_string(s) {
  try {
    var i = $$String.index(s, /* "/" */47);
    return make(Curry._3(Z.ZInt[/* of_substring */10], s, 0, i), Curry._3(Z.ZInt[/* of_substring */10], s, i + 1 | 0, (s.length - i | 0) - 1 | 0));
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
        var n = Curry._1(Z.ZInt[/* of_string */9], s);
        return /* record */[
                /* num */n,
                /* den */Z.ZInt[/* one */2]
              ];
      }
    } else {
      throw exn;
    }
  }
}

function classify(n) {
  if (n[/* den */1] === Z.ZInt[/* zero */1]) {
    var match = Curry._1(Z.ZInt[/* sign */45], n[/* num */0]);
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
  } else if (n[/* num */0] === Z.ZInt[/* zero */1]) {
    return /* ZERO */0;
  } else {
    return /* NZERO */4;
  }
}

function is_real(n) {
  return n[/* den */1] !== Z.ZInt[/* zero */1];
}

function num(x) {
  return x[/* num */0];
}

function den(x) {
  return x[/* den */1];
}

function sign(x) {
  return Curry._1(Z.ZInt[/* sign */45], x[/* num */0]);
}

function equal(x, y) {
  if (Curry._2(Z.ZInt[/* equal */40], x[/* num */0], y[/* num */0])) {
    return Curry._2(Z.ZInt[/* equal */40], x[/* den */1], y[/* den */1]);
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
  var exit$3 = 0;
  switch (match) {
    case 1 : 
        var switcher = match$1 - 1 | 0;
        if (switcher > 2 || switcher < 0) {
          exit$2 = 3;
        } else {
          switch (switcher) {
            case 0 : 
                return 0;
            case 1 : 
                exit$2 = 3;
                break;
            case 2 : 
                exit$3 = 4;
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
                  exit$3 = 4;
                  break;
              case 2 : 
                  exit$2 = 3;
                  break;
              
            }
          } else {
            exit$2 = 3;
          }
        } else {
          exit$3 = 4;
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
        exit$3 = 4;
        break;
    
  }
  if (exit$3 === 4) {
    var switcher$1 = match$1 - 1 | 0;
    if (switcher$1 > 2 || switcher$1 < 0) {
      exit$2 = 3;
    } else {
      switch (switcher$1) {
        case 0 : 
            return -1;
        case 1 : 
            exit$2 = 3;
            break;
        case 2 : 
            return 1;
        
      }
    }
  }
  if (exit$2 === 3) {
    if (match >= 4) {
      exit$1 = 2;
    } else {
      switch (match) {
        case 0 : 
            exit$1 = 2;
            break;
        case 1 : 
            return 1;
        case 2 : 
            return -1;
        
      }
    }
  }
  if (exit$1 === 2) {
    if (match$1 !== 2) {
      exit = 1;
    } else {
      return 1;
    }
  }
  if (exit === 1) {
    if (x[/* den */1] === y[/* den */1]) {
      return Curry._2(Z.ZInt[/* compare */39], x[/* num */0], y[/* num */0]);
    } else {
      return Curry._2(Z.ZInt[/* compare */39], Curry._2(Z.ZInt[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZInt[/* mul */17], y[/* num */0], x[/* den */1]));
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
        if (Curry._2(Z.ZInt[/* equal */40], n[/* den */1], Z.ZInt[/* one */2])) {
          return Curry._1(Z.ZInt[/* to_string */38], n[/* num */0]);
        } else {
          return Curry._1(Z.ZInt[/* to_string */38], n[/* num */0]) + ("/" + Curry._1(Z.ZInt[/* to_string */38], n[/* den */1]));
        }
    
  }
}

function to_bigint(x) {
  return Curry._2(Z.ZInt[/* div */18], x[/* num */0], x[/* den */1]);
}

function to_int(x) {
  return Curry._1(Z.ZInt[/* to_int */32], to_bigint(x));
}

function to_int32(x) {
  return Curry._1(Z.ZInt[/* to_int32 */33], to_bigint(x));
}

function to_int64(x) {
  return Curry._1(Z.ZInt[/* to_int64 */34], to_bigint(x));
}

function to_nativeint(x) {
  return Curry._1(Z.ZInt[/* to_nativeint */35], to_bigint(x));
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
        var np = Curry._1(Z.ZInt[/* numbits */31], p);
        var nq = Curry._1(Z.ZInt[/* numbits */31], q);
        if (np <= 53 && nq <= 53) {
          return Caml_int64.to_float(Curry._1(Z.ZInt[/* to_int64 */34], p)) / Caml_int64.to_float(Curry._1(Z.ZInt[/* to_int64 */34], q));
        } else {
          var n = 55 - (np - nq | 0) | 0;
          var match$1 = n >= 0 ? /* tuple */[
              Curry._2(Z.ZInt[/* shift_left */29], p, n),
              q
            ] : /* tuple */[
              p,
              Curry._2(Z.ZInt[/* shift_left */29], q, -n | 0)
            ];
          var match$2 = Curry._2(Z.ZInt[/* ediv_rem */21], match$1[0], match$1[1]);
          var f = Curry._2(Z.ZInt[/* round_to_float */37], match$2[0], Curry._1(Z.ZInt[/* sign */45], match$2[1]) === 0);
          return Caml_float.caml_ldexp_float(f, -n | 0);
        }
    
  }
}

function neg(x) {
  return /* record */[
          /* num */Curry._1(Z.ZInt[/* neg */14], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function abs(x) {
  return /* record */[
          /* num */Curry._1(Z.ZInt[/* abs */13], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function aors(zaors, x, y) {
  if (x[/* den */1] === y[/* den */1]) {
    return make_real(Curry._2(zaors, x[/* num */0], y[/* num */0]), x[/* den */1]);
  } else {
    return make_real(Curry._2(zaors, Curry._2(Z.ZInt[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZInt[/* mul */17], y[/* num */0], x[/* den */1])), Curry._2(Z.ZInt[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function add(x, y) {
  if (x[/* den */1] === Z.ZInt[/* zero */1] || y[/* den */1] === Z.ZInt[/* zero */1]) {
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
    return aors(Z.ZInt[/* add */15], x, y);
  }
}

function sub(x, y) {
  if (x[/* den */1] === Z.ZInt[/* zero */1] || y[/* den */1] === Z.ZInt[/* zero */1]) {
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
    return aors(Z.ZInt[/* sub */16], x, y);
  }
}

function mul(x, y) {
  if (x[/* den */1] === Z.ZInt[/* zero */1] || y[/* den */1] === Z.ZInt[/* zero */1]) {
    return /* record */[
            /* num */Curry._1(Z.ZInt[/* of_int */4], Caml_int32.imul(Curry._1(Z.ZInt[/* sign */45], x[/* num */0]), Curry._1(Z.ZInt[/* sign */45], y[/* num */0]))),
            /* den */Z.ZInt[/* zero */1]
          ];
  } else {
    return make_real(Curry._2(Z.ZInt[/* mul */17], x[/* num */0], y[/* num */0]), Curry._2(Z.ZInt[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function inv(x) {
  var match = Curry._1(Z.ZInt[/* sign */45], x[/* num */0]);
  var exit = 0;
  var switcher = match + 1 | 0;
  if (switcher > 2 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return /* record */[
                  /* num */Curry._1(Z.ZInt[/* neg */14], x[/* den */1]),
                  /* den */Curry._1(Z.ZInt[/* neg */14], x[/* num */0])
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
    if (x[/* den */1] === Z.ZInt[/* zero */1]) {
      return undef;
    } else {
      return inf;
    }
  }
  
}

function div(x, y) {
  if (Curry._1(Z.ZInt[/* sign */45], y[/* num */0]) >= 0) {
    return mul(x, /* record */[
                /* num */y[/* den */1],
                /* den */y[/* num */0]
              ]);
  } else {
    return mul(x, /* record */[
                /* num */Curry._1(Z.ZInt[/* neg */14], y[/* den */1]),
                /* den */Curry._1(Z.ZInt[/* neg */14], y[/* num */0])
              ]);
  }
}

function mul_2exp(x, n) {
  if (x[/* den */1] === Z.ZInt[/* zero */1]) {
    return x;
  } else {
    return make_real(Curry._2(Z.ZInt[/* shift_left */29], x[/* num */0], n), x[/* den */1]);
  }
}

function div_2exp(x, n) {
  if (x[/* den */1] === Z.ZInt[/* zero */1]) {
    return x;
  } else {
    return make_real(x[/* num */0], Curry._2(Z.ZInt[/* shift_left */29], x[/* den */1], n));
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

var RationalInt = /* module */[
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

function mk$1(n, d) {
  return /* record */[
          /* num */n,
          /* den */d
        ];
}

function make_real$1(n, d) {
  if (n === Z.ZInt32[/* zero */1] || d === Z.ZInt32[/* one */2]) {
    return /* record */[
            /* num */n,
            /* den */Z.ZInt32[/* one */2]
          ];
  } else {
    var g = Curry._2(Z.ZInt32[/* gcd */50], n, d);
    if (g === Z.ZInt32[/* one */2]) {
      return /* record */[
              /* num */n,
              /* den */d
            ];
    } else {
      return /* record */[
              /* num */Curry._2(Z.ZInt32[/* divexact */24], n, g),
              /* den */Curry._2(Z.ZInt32[/* divexact */24], d, g)
            ];
    }
  }
}

function make$1(n, d) {
  var sd = Curry._1(Z.ZInt32[/* sign */45], d);
  if (sd === 0) {
    return /* record */[
            /* num */Curry._1(Z.ZInt32[/* of_int */4], Curry._1(Z.ZInt32[/* sign */45], n)),
            /* den */Z.ZInt32[/* zero */1]
          ];
  } else if (sd > 0) {
    return make_real$1(n, d);
  } else {
    return make_real$1(Curry._1(Z.ZInt32[/* neg */14], n), Curry._1(Z.ZInt32[/* neg */14], d));
  }
}

function of_bigint$1(n) {
  return /* record */[
          /* num */n,
          /* den */Z.ZInt32[/* one */2]
        ];
}

function of_int$1(n) {
  var n$1 = Curry._1(Z.ZInt32[/* of_int */4], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt32[/* one */2]
        ];
}

function of_int32$1(n) {
  var n$1 = Curry._1(Z.ZInt32[/* of_int32 */5], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt32[/* one */2]
        ];
}

function of_int64$1(n) {
  var n$1 = Curry._1(Z.ZInt32[/* of_int64 */6], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt32[/* one */2]
        ];
}

function of_nativeint$1(n) {
  var n$1 = Curry._1(Z.ZInt32[/* of_nativeint */7], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt32[/* one */2]
        ];
}

function of_ints$1(n, d) {
  return make$1(Curry._1(Z.ZInt32[/* of_int */4], n), Curry._1(Z.ZInt32[/* of_int */4], d));
}

var zero_000$1 = /* num */Z.ZInt32[/* zero */1];

var zero_001$1 = /* den */Z.ZInt32[/* one */2];

var zero$1 = /* record */[
  zero_000$1,
  zero_001$1
];

var one_000$1 = /* num */Z.ZInt32[/* one */2];

var one_001$1 = /* den */Z.ZInt32[/* one */2];

var one$1 = /* record */[
  one_000$1,
  one_001$1
];

var minus_one_000$1 = /* num */Z.ZInt32[/* minus_one */3];

var minus_one_001$1 = /* den */Z.ZInt32[/* one */2];

var minus_one$1 = /* record */[
  minus_one_000$1,
  minus_one_001$1
];

var inf_000$1 = /* num */Z.ZInt32[/* one */2];

var inf_001$1 = /* den */Z.ZInt32[/* zero */1];

var inf$1 = /* record */[
  inf_000$1,
  inf_001$1
];

var minus_inf_000$1 = /* num */Z.ZInt32[/* minus_one */3];

var minus_inf_001$1 = /* den */Z.ZInt32[/* zero */1];

var minus_inf$1 = /* record */[
  minus_inf_000$1,
  minus_inf_001$1
];

var undef_000$1 = /* num */Z.ZInt32[/* zero */1];

var undef_001$1 = /* den */Z.ZInt32[/* zero */1];

var undef$1 = /* record */[
  undef_000$1,
  undef_001$1
];

function of_float$1(d) {
  if (d === Number.POSITIVE_INFINITY) {
    return inf$1;
  } else if (d === Number.NEGATIVE_INFINITY) {
    return minus_inf$1;
  } else if (Caml_float.caml_classify_float(d) === /* FP_nan */4) {
    return undef$1;
  } else {
    var match = Caml_float.caml_frexp_float(d);
    var m = Curry._1(Z.ZInt32[/* of_float */8], Caml_float.caml_ldexp_float(match[0], 53));
    var e = match[1] - 53 | 0;
    if (e >= 0) {
      var n = Curry._2(Z.ZInt32[/* shift_left */29], m, e);
      return /* record */[
              /* num */n,
              /* den */Z.ZInt32[/* one */2]
            ];
    } else {
      return make_real$1(m, Curry._2(Z.ZInt32[/* shift_left */29], Z.ZInt32[/* one */2], -e | 0));
    }
  }
}

function of_string$1(s) {
  try {
    var i = $$String.index(s, /* "/" */47);
    return make$1(Curry._3(Z.ZInt32[/* of_substring */10], s, 0, i), Curry._3(Z.ZInt32[/* of_substring */10], s, i + 1 | 0, (s.length - i | 0) - 1 | 0));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      if (s === "inf" || s === "+inf") {
        return inf$1;
      } else if (s === "-inf") {
        return minus_inf$1;
      } else if (s === "undef") {
        return undef$1;
      } else {
        var n = Curry._1(Z.ZInt32[/* of_string */9], s);
        return /* record */[
                /* num */n,
                /* den */Z.ZInt32[/* one */2]
              ];
      }
    } else {
      throw exn;
    }
  }
}

function classify$1(n) {
  if (n[/* den */1] === Z.ZInt32[/* zero */1]) {
    var match = Curry._1(Z.ZInt32[/* sign */45], n[/* num */0]);
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
  } else if (n[/* num */0] === Z.ZInt32[/* zero */1]) {
    return /* ZERO */0;
  } else {
    return /* NZERO */4;
  }
}

function is_real$1(n) {
  return n[/* den */1] !== Z.ZInt32[/* zero */1];
}

function num$1(x) {
  return x[/* num */0];
}

function den$1(x) {
  return x[/* den */1];
}

function sign$1(x) {
  return Curry._1(Z.ZInt32[/* sign */45], x[/* num */0]);
}

function equal$1(x, y) {
  if (Curry._2(Z.ZInt32[/* equal */40], x[/* num */0], y[/* num */0])) {
    return Curry._2(Z.ZInt32[/* equal */40], x[/* den */1], y[/* den */1]);
  } else {
    return false;
  }
}

function compare$1(x, y) {
  var match = classify$1(x);
  var match$1 = classify$1(y);
  var exit = 0;
  var exit$1 = 0;
  var exit$2 = 0;
  var exit$3 = 0;
  switch (match) {
    case 1 : 
        var switcher = match$1 - 1 | 0;
        if (switcher > 2 || switcher < 0) {
          exit$2 = 3;
        } else {
          switch (switcher) {
            case 0 : 
                return 0;
            case 1 : 
                exit$2 = 3;
                break;
            case 2 : 
                exit$3 = 4;
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
                  exit$3 = 4;
                  break;
              case 2 : 
                  exit$2 = 3;
                  break;
              
            }
          } else {
            exit$2 = 3;
          }
        } else {
          exit$3 = 4;
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
        exit$3 = 4;
        break;
    
  }
  if (exit$3 === 4) {
    var switcher$1 = match$1 - 1 | 0;
    if (switcher$1 > 2 || switcher$1 < 0) {
      exit$2 = 3;
    } else {
      switch (switcher$1) {
        case 0 : 
            return -1;
        case 1 : 
            exit$2 = 3;
            break;
        case 2 : 
            return 1;
        
      }
    }
  }
  if (exit$2 === 3) {
    if (match >= 4) {
      exit$1 = 2;
    } else {
      switch (match) {
        case 0 : 
            exit$1 = 2;
            break;
        case 1 : 
            return 1;
        case 2 : 
            return -1;
        
      }
    }
  }
  if (exit$1 === 2) {
    if (match$1 !== 2) {
      exit = 1;
    } else {
      return 1;
    }
  }
  if (exit === 1) {
    if (x[/* den */1] === y[/* den */1]) {
      return Curry._2(Z.ZInt32[/* compare */39], x[/* num */0], y[/* num */0]);
    } else {
      return Curry._2(Z.ZInt32[/* compare */39], Curry._2(Z.ZInt32[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZInt32[/* mul */17], y[/* num */0], x[/* den */1]));
    }
  }
  
}

function min$1(a, b) {
  if (compare$1(a, b) <= 0) {
    return a;
  } else {
    return b;
  }
}

function max$1(a, b) {
  if (compare$1(a, b) >= 0) {
    return a;
  } else {
    return b;
  }
}

function leq$1(a, b) {
  return compare$1(a, b) <= 0;
}

function geq$1(a, b) {
  return compare$1(a, b) >= 0;
}

function lt$1(a, b) {
  return compare$1(a, b) < 0;
}

function gt$1(a, b) {
  return compare$1(a, b) > 0;
}

function to_string$1(n) {
  var match = classify$1(n);
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
        if (Curry._2(Z.ZInt32[/* equal */40], n[/* den */1], Z.ZInt32[/* one */2])) {
          return Curry._1(Z.ZInt32[/* to_string */38], n[/* num */0]);
        } else {
          return Curry._1(Z.ZInt32[/* to_string */38], n[/* num */0]) + ("/" + Curry._1(Z.ZInt32[/* to_string */38], n[/* den */1]));
        }
    
  }
}

function to_bigint$1(x) {
  return Curry._2(Z.ZInt32[/* div */18], x[/* num */0], x[/* den */1]);
}

function to_int$1(x) {
  return Curry._1(Z.ZInt32[/* to_int */32], to_bigint$1(x));
}

function to_int32$1(x) {
  return Curry._1(Z.ZInt32[/* to_int32 */33], to_bigint$1(x));
}

function to_int64$1(x) {
  return Curry._1(Z.ZInt32[/* to_int64 */34], to_bigint$1(x));
}

function to_nativeint$1(x) {
  return Curry._1(Z.ZInt32[/* to_nativeint */35], to_bigint$1(x));
}

function to_float$1(x) {
  var match = classify$1(x);
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
        var np = Curry._1(Z.ZInt32[/* numbits */31], p);
        var nq = Curry._1(Z.ZInt32[/* numbits */31], q);
        if (np <= 53 && nq <= 53) {
          return Caml_int64.to_float(Curry._1(Z.ZInt32[/* to_int64 */34], p)) / Caml_int64.to_float(Curry._1(Z.ZInt32[/* to_int64 */34], q));
        } else {
          var n = 55 - (np - nq | 0) | 0;
          var match$1 = n >= 0 ? /* tuple */[
              Curry._2(Z.ZInt32[/* shift_left */29], p, n),
              q
            ] : /* tuple */[
              p,
              Curry._2(Z.ZInt32[/* shift_left */29], q, -n | 0)
            ];
          var match$2 = Curry._2(Z.ZInt32[/* ediv_rem */21], match$1[0], match$1[1]);
          var f = Curry._2(Z.ZInt32[/* round_to_float */37], match$2[0], Curry._1(Z.ZInt32[/* sign */45], match$2[1]) === 0);
          return Caml_float.caml_ldexp_float(f, -n | 0);
        }
    
  }
}

function neg$1(x) {
  return /* record */[
          /* num */Curry._1(Z.ZInt32[/* neg */14], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function abs$1(x) {
  return /* record */[
          /* num */Curry._1(Z.ZInt32[/* abs */13], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function aors$1(zaors, x, y) {
  if (x[/* den */1] === y[/* den */1]) {
    return make_real$1(Curry._2(zaors, x[/* num */0], y[/* num */0]), x[/* den */1]);
  } else {
    return make_real$1(Curry._2(zaors, Curry._2(Z.ZInt32[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZInt32[/* mul */17], y[/* num */0], x[/* den */1])), Curry._2(Z.ZInt32[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function add$1(x, y) {
  if (x[/* den */1] === Z.ZInt32[/* zero */1] || y[/* den */1] === Z.ZInt32[/* zero */1]) {
    var match = classify$1(x);
    var match$1 = classify$1(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return y;
      case 1 : 
          switch (match$1) {
            case 2 : 
                return undef$1;
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
                return undef$1;
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf$1;
            
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
        return undef$1;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef$1;
          } else {
            return inf$1;
          }
      case 2 : 
          if (match$1 >= 2) {
            return minus_inf$1;
          } else {
            return inf$1;
          }
      
    }
  } else {
    return aors$1(Z.ZInt32[/* add */15], x, y);
  }
}

function sub$1(x, y) {
  if (x[/* den */1] === Z.ZInt32[/* zero */1] || y[/* den */1] === Z.ZInt32[/* zero */1]) {
    var match = classify$1(x);
    var match$1 = classify$1(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return neg$1(y);
      case 1 : 
          switch (match$1) {
            case 1 : 
                return undef$1;
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
                return undef$1;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf$1;
            
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
        return undef$1;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef$1;
          } else {
            return inf$1;
          }
      case 2 : 
          if (match$1 >= 2) {
            return inf$1;
          } else {
            return minus_inf$1;
          }
      
    }
  } else {
    return aors$1(Z.ZInt32[/* sub */16], x, y);
  }
}

function mul$1(x, y) {
  if (x[/* den */1] === Z.ZInt32[/* zero */1] || y[/* den */1] === Z.ZInt32[/* zero */1]) {
    return /* record */[
            /* num */Curry._1(Z.ZInt32[/* of_int */4], Caml_int32.imul(Curry._1(Z.ZInt32[/* sign */45], x[/* num */0]), Curry._1(Z.ZInt32[/* sign */45], y[/* num */0]))),
            /* den */Z.ZInt32[/* zero */1]
          ];
  } else {
    return make_real$1(Curry._2(Z.ZInt32[/* mul */17], x[/* num */0], y[/* num */0]), Curry._2(Z.ZInt32[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function inv$1(x) {
  var match = Curry._1(Z.ZInt32[/* sign */45], x[/* num */0]);
  var exit = 0;
  var switcher = match + 1 | 0;
  if (switcher > 2 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return /* record */[
                  /* num */Curry._1(Z.ZInt32[/* neg */14], x[/* den */1]),
                  /* den */Curry._1(Z.ZInt32[/* neg */14], x[/* num */0])
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
    if (x[/* den */1] === Z.ZInt32[/* zero */1]) {
      return undef$1;
    } else {
      return inf$1;
    }
  }
  
}

function div$1(x, y) {
  if (Curry._1(Z.ZInt32[/* sign */45], y[/* num */0]) >= 0) {
    return mul$1(x, /* record */[
                /* num */y[/* den */1],
                /* den */y[/* num */0]
              ]);
  } else {
    return mul$1(x, /* record */[
                /* num */Curry._1(Z.ZInt32[/* neg */14], y[/* den */1]),
                /* den */Curry._1(Z.ZInt32[/* neg */14], y[/* num */0])
              ]);
  }
}

function mul_2exp$1(x, n) {
  if (x[/* den */1] === Z.ZInt32[/* zero */1]) {
    return x;
  } else {
    return make_real$1(Curry._2(Z.ZInt32[/* shift_left */29], x[/* num */0], n), x[/* den */1]);
  }
}

function div_2exp$1(x, n) {
  if (x[/* den */1] === Z.ZInt32[/* zero */1]) {
    return x;
  } else {
    return make_real$1(x[/* num */0], Curry._2(Z.ZInt32[/* shift_left */29], x[/* den */1], n));
  }
}

function print$1(x) {
  return Pervasives.print_string(to_string$1(x));
}

function output$1(chan, x) {
  return Pervasives.output_string(chan, to_string$1(x));
}

function sprint$1(_, x) {
  return to_string$1(x);
}

function bprint$1(b, x) {
  return $$Buffer.add_string(b, to_string$1(x));
}

function pp_print$1(f, x) {
  return Format.pp_print_string(f, to_string$1(x));
}

function $tilde$plus$1(x) {
  return x;
}

function $less$great$1(a, b) {
  return !equal$1(a, b);
}

var RationalInt32 = /* module */[
  /* mk */mk$1,
  /* make_real */make_real$1,
  /* make */make$1,
  /* of_bigint */of_bigint$1,
  /* of_int */of_int$1,
  /* of_int32 */of_int32$1,
  /* of_int64 */of_int64$1,
  /* of_nativeint */of_nativeint$1,
  /* of_ints */of_ints$1,
  /* zero */zero$1,
  /* one */one$1,
  /* minus_one */minus_one$1,
  /* inf */inf$1,
  /* minus_inf */minus_inf$1,
  /* undef */undef$1,
  /* of_float */of_float$1,
  /* of_string */of_string$1,
  /* classify */classify$1,
  /* is_real */is_real$1,
  /* num */num$1,
  /* den */den$1,
  /* sign */sign$1,
  /* equal */equal$1,
  /* compare */compare$1,
  /* min */min$1,
  /* max */max$1,
  /* leq */leq$1,
  /* geq */geq$1,
  /* lt */lt$1,
  /* gt */gt$1,
  /* to_string */to_string$1,
  /* to_bigint */to_bigint$1,
  /* to_int */to_int$1,
  /* to_int32 */to_int32$1,
  /* to_int64 */to_int64$1,
  /* to_nativeint */to_nativeint$1,
  /* to_float */to_float$1,
  /* neg */neg$1,
  /* abs */abs$1,
  /* aors */aors$1,
  /* add */add$1,
  /* sub */sub$1,
  /* mul */mul$1,
  /* inv */inv$1,
  /* div */div$1,
  /* mul_2exp */mul_2exp$1,
  /* div_2exp */div_2exp$1,
  /* print */print$1,
  /* output */output$1,
  /* sprint */sprint$1,
  /* bprint */bprint$1,
  /* pp_print */pp_print$1,
  /* ~- */neg$1,
  /* ~+ */$tilde$plus$1,
  /* + */add$1,
  /* - */sub$1,
  /* * */mul$1,
  /* / */div$1,
  /* lsl */mul_2exp$1,
  /* asr */div_2exp$1,
  /* ~$ */of_int$1,
  /* // */of_ints$1,
  /* ~$$ */of_bigint$1,
  /* /// */make$1,
  /* = */equal$1,
  /* < */lt$1,
  /* > */gt$1,
  /* <= */leq$1,
  /* >= */geq$1,
  /* <> */$less$great$1
];

function mk$2(n, d) {
  return /* record */[
          /* num */n,
          /* den */d
        ];
}

function make_real$2(n, d) {
  if (n === Z.ZInt64[/* zero */1] || d === Z.ZInt64[/* one */2]) {
    return /* record */[
            /* num */n,
            /* den */Z.ZInt64[/* one */2]
          ];
  } else {
    var g = Curry._2(Z.ZInt64[/* gcd */50], n, d);
    if (g === Z.ZInt64[/* one */2]) {
      return /* record */[
              /* num */n,
              /* den */d
            ];
    } else {
      return /* record */[
              /* num */Curry._2(Z.ZInt64[/* divexact */24], n, g),
              /* den */Curry._2(Z.ZInt64[/* divexact */24], d, g)
            ];
    }
  }
}

function make$2(n, d) {
  var sd = Curry._1(Z.ZInt64[/* sign */45], d);
  if (sd === 0) {
    return /* record */[
            /* num */Curry._1(Z.ZInt64[/* of_int */4], Curry._1(Z.ZInt64[/* sign */45], n)),
            /* den */Z.ZInt64[/* zero */1]
          ];
  } else if (sd > 0) {
    return make_real$2(n, d);
  } else {
    return make_real$2(Curry._1(Z.ZInt64[/* neg */14], n), Curry._1(Z.ZInt64[/* neg */14], d));
  }
}

function of_bigint$2(n) {
  return /* record */[
          /* num */n,
          /* den */Z.ZInt64[/* one */2]
        ];
}

function of_int$2(n) {
  var n$1 = Curry._1(Z.ZInt64[/* of_int */4], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt64[/* one */2]
        ];
}

function of_int32$2(n) {
  var n$1 = Curry._1(Z.ZInt64[/* of_int32 */5], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt64[/* one */2]
        ];
}

function of_int64$2(n) {
  var n$1 = Curry._1(Z.ZInt64[/* of_int64 */6], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt64[/* one */2]
        ];
}

function of_nativeint$2(n) {
  var n$1 = Curry._1(Z.ZInt64[/* of_nativeint */7], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZInt64[/* one */2]
        ];
}

function of_ints$2(n, d) {
  return make$2(Curry._1(Z.ZInt64[/* of_int */4], n), Curry._1(Z.ZInt64[/* of_int */4], d));
}

var zero_000$2 = /* num */Z.ZInt64[/* zero */1];

var zero_001$2 = /* den */Z.ZInt64[/* one */2];

var zero$2 = /* record */[
  zero_000$2,
  zero_001$2
];

var one_000$2 = /* num */Z.ZInt64[/* one */2];

var one_001$2 = /* den */Z.ZInt64[/* one */2];

var one$2 = /* record */[
  one_000$2,
  one_001$2
];

var minus_one_000$2 = /* num */Z.ZInt64[/* minus_one */3];

var minus_one_001$2 = /* den */Z.ZInt64[/* one */2];

var minus_one$2 = /* record */[
  minus_one_000$2,
  minus_one_001$2
];

var inf_000$2 = /* num */Z.ZInt64[/* one */2];

var inf_001$2 = /* den */Z.ZInt64[/* zero */1];

var inf$2 = /* record */[
  inf_000$2,
  inf_001$2
];

var minus_inf_000$2 = /* num */Z.ZInt64[/* minus_one */3];

var minus_inf_001$2 = /* den */Z.ZInt64[/* zero */1];

var minus_inf$2 = /* record */[
  minus_inf_000$2,
  minus_inf_001$2
];

var undef_000$2 = /* num */Z.ZInt64[/* zero */1];

var undef_001$2 = /* den */Z.ZInt64[/* zero */1];

var undef$2 = /* record */[
  undef_000$2,
  undef_001$2
];

function of_float$2(d) {
  if (d === Number.POSITIVE_INFINITY) {
    return inf$2;
  } else if (d === Number.NEGATIVE_INFINITY) {
    return minus_inf$2;
  } else if (Caml_float.caml_classify_float(d) === /* FP_nan */4) {
    return undef$2;
  } else {
    var match = Caml_float.caml_frexp_float(d);
    var m = Curry._1(Z.ZInt64[/* of_float */8], Caml_float.caml_ldexp_float(match[0], 53));
    var e = match[1] - 53 | 0;
    if (e >= 0) {
      var n = Curry._2(Z.ZInt64[/* shift_left */29], m, e);
      return /* record */[
              /* num */n,
              /* den */Z.ZInt64[/* one */2]
            ];
    } else {
      return make_real$2(m, Curry._2(Z.ZInt64[/* shift_left */29], Z.ZInt64[/* one */2], -e | 0));
    }
  }
}

function of_string$2(s) {
  try {
    var i = $$String.index(s, /* "/" */47);
    return make$2(Curry._3(Z.ZInt64[/* of_substring */10], s, 0, i), Curry._3(Z.ZInt64[/* of_substring */10], s, i + 1 | 0, (s.length - i | 0) - 1 | 0));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      if (s === "inf" || s === "+inf") {
        return inf$2;
      } else if (s === "-inf") {
        return minus_inf$2;
      } else if (s === "undef") {
        return undef$2;
      } else {
        var n = Curry._1(Z.ZInt64[/* of_string */9], s);
        return /* record */[
                /* num */n,
                /* den */Z.ZInt64[/* one */2]
              ];
      }
    } else {
      throw exn;
    }
  }
}

function classify$2(n) {
  if (n[/* den */1] === Z.ZInt64[/* zero */1]) {
    var match = Curry._1(Z.ZInt64[/* sign */45], n[/* num */0]);
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
  } else if (n[/* num */0] === Z.ZInt64[/* zero */1]) {
    return /* ZERO */0;
  } else {
    return /* NZERO */4;
  }
}

function is_real$2(n) {
  return n[/* den */1] !== Z.ZInt64[/* zero */1];
}

function num$2(x) {
  return x[/* num */0];
}

function den$2(x) {
  return x[/* den */1];
}

function sign$2(x) {
  return Curry._1(Z.ZInt64[/* sign */45], x[/* num */0]);
}

function equal$2(x, y) {
  if (Curry._2(Z.ZInt64[/* equal */40], x[/* num */0], y[/* num */0])) {
    return Curry._2(Z.ZInt64[/* equal */40], x[/* den */1], y[/* den */1]);
  } else {
    return false;
  }
}

function compare$2(x, y) {
  var match = classify$2(x);
  var match$1 = classify$2(y);
  var exit = 0;
  var exit$1 = 0;
  var exit$2 = 0;
  var exit$3 = 0;
  switch (match) {
    case 1 : 
        var switcher = match$1 - 1 | 0;
        if (switcher > 2 || switcher < 0) {
          exit$2 = 3;
        } else {
          switch (switcher) {
            case 0 : 
                return 0;
            case 1 : 
                exit$2 = 3;
                break;
            case 2 : 
                exit$3 = 4;
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
                  exit$3 = 4;
                  break;
              case 2 : 
                  exit$2 = 3;
                  break;
              
            }
          } else {
            exit$2 = 3;
          }
        } else {
          exit$3 = 4;
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
        exit$3 = 4;
        break;
    
  }
  if (exit$3 === 4) {
    var switcher$1 = match$1 - 1 | 0;
    if (switcher$1 > 2 || switcher$1 < 0) {
      exit$2 = 3;
    } else {
      switch (switcher$1) {
        case 0 : 
            return -1;
        case 1 : 
            exit$2 = 3;
            break;
        case 2 : 
            return 1;
        
      }
    }
  }
  if (exit$2 === 3) {
    if (match >= 4) {
      exit$1 = 2;
    } else {
      switch (match) {
        case 0 : 
            exit$1 = 2;
            break;
        case 1 : 
            return 1;
        case 2 : 
            return -1;
        
      }
    }
  }
  if (exit$1 === 2) {
    if (match$1 !== 2) {
      exit = 1;
    } else {
      return 1;
    }
  }
  if (exit === 1) {
    if (x[/* den */1] === y[/* den */1]) {
      return Curry._2(Z.ZInt64[/* compare */39], x[/* num */0], y[/* num */0]);
    } else {
      return Curry._2(Z.ZInt64[/* compare */39], Curry._2(Z.ZInt64[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZInt64[/* mul */17], y[/* num */0], x[/* den */1]));
    }
  }
  
}

function min$2(a, b) {
  if (compare$2(a, b) <= 0) {
    return a;
  } else {
    return b;
  }
}

function max$2(a, b) {
  if (compare$2(a, b) >= 0) {
    return a;
  } else {
    return b;
  }
}

function leq$2(a, b) {
  return compare$2(a, b) <= 0;
}

function geq$2(a, b) {
  return compare$2(a, b) >= 0;
}

function lt$2(a, b) {
  return compare$2(a, b) < 0;
}

function gt$2(a, b) {
  return compare$2(a, b) > 0;
}

function to_string$2(n) {
  var match = classify$2(n);
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
        if (Curry._2(Z.ZInt64[/* equal */40], n[/* den */1], Z.ZInt64[/* one */2])) {
          return Curry._1(Z.ZInt64[/* to_string */38], n[/* num */0]);
        } else {
          return Curry._1(Z.ZInt64[/* to_string */38], n[/* num */0]) + ("/" + Curry._1(Z.ZInt64[/* to_string */38], n[/* den */1]));
        }
    
  }
}

function to_bigint$2(x) {
  return Curry._2(Z.ZInt64[/* div */18], x[/* num */0], x[/* den */1]);
}

function to_int$2(x) {
  return Curry._1(Z.ZInt64[/* to_int */32], to_bigint$2(x));
}

function to_int32$2(x) {
  return Curry._1(Z.ZInt64[/* to_int32 */33], to_bigint$2(x));
}

function to_int64$2(x) {
  return Curry._1(Z.ZInt64[/* to_int64 */34], to_bigint$2(x));
}

function to_nativeint$2(x) {
  return Curry._1(Z.ZInt64[/* to_nativeint */35], to_bigint$2(x));
}

function to_float$2(x) {
  var match = classify$2(x);
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
        var np = Curry._1(Z.ZInt64[/* numbits */31], p);
        var nq = Curry._1(Z.ZInt64[/* numbits */31], q);
        if (np <= 53 && nq <= 53) {
          return Caml_int64.to_float(Curry._1(Z.ZInt64[/* to_int64 */34], p)) / Caml_int64.to_float(Curry._1(Z.ZInt64[/* to_int64 */34], q));
        } else {
          var n = 55 - (np - nq | 0) | 0;
          var match$1 = n >= 0 ? /* tuple */[
              Curry._2(Z.ZInt64[/* shift_left */29], p, n),
              q
            ] : /* tuple */[
              p,
              Curry._2(Z.ZInt64[/* shift_left */29], q, -n | 0)
            ];
          var match$2 = Curry._2(Z.ZInt64[/* ediv_rem */21], match$1[0], match$1[1]);
          var f = Curry._2(Z.ZInt64[/* round_to_float */37], match$2[0], Curry._1(Z.ZInt64[/* sign */45], match$2[1]) === 0);
          return Caml_float.caml_ldexp_float(f, -n | 0);
        }
    
  }
}

function neg$2(x) {
  return /* record */[
          /* num */Curry._1(Z.ZInt64[/* neg */14], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function abs$2(x) {
  return /* record */[
          /* num */Curry._1(Z.ZInt64[/* abs */13], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function aors$2(zaors, x, y) {
  if (x[/* den */1] === y[/* den */1]) {
    return make_real$2(Curry._2(zaors, x[/* num */0], y[/* num */0]), x[/* den */1]);
  } else {
    return make_real$2(Curry._2(zaors, Curry._2(Z.ZInt64[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZInt64[/* mul */17], y[/* num */0], x[/* den */1])), Curry._2(Z.ZInt64[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function add$2(x, y) {
  if (x[/* den */1] === Z.ZInt64[/* zero */1] || y[/* den */1] === Z.ZInt64[/* zero */1]) {
    var match = classify$2(x);
    var match$1 = classify$2(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return y;
      case 1 : 
          switch (match$1) {
            case 2 : 
                return undef$2;
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
                return undef$2;
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf$2;
            
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
        return undef$2;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef$2;
          } else {
            return inf$2;
          }
      case 2 : 
          if (match$1 >= 2) {
            return minus_inf$2;
          } else {
            return inf$2;
          }
      
    }
  } else {
    return aors$2(Z.ZInt64[/* add */15], x, y);
  }
}

function sub$2(x, y) {
  if (x[/* den */1] === Z.ZInt64[/* zero */1] || y[/* den */1] === Z.ZInt64[/* zero */1]) {
    var match = classify$2(x);
    var match$1 = classify$2(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return neg$2(y);
      case 1 : 
          switch (match$1) {
            case 1 : 
                return undef$2;
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
                return undef$2;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf$2;
            
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
        return undef$2;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef$2;
          } else {
            return inf$2;
          }
      case 2 : 
          if (match$1 >= 2) {
            return inf$2;
          } else {
            return minus_inf$2;
          }
      
    }
  } else {
    return aors$2(Z.ZInt64[/* sub */16], x, y);
  }
}

function mul$2(x, y) {
  if (x[/* den */1] === Z.ZInt64[/* zero */1] || y[/* den */1] === Z.ZInt64[/* zero */1]) {
    return /* record */[
            /* num */Curry._1(Z.ZInt64[/* of_int */4], Caml_int32.imul(Curry._1(Z.ZInt64[/* sign */45], x[/* num */0]), Curry._1(Z.ZInt64[/* sign */45], y[/* num */0]))),
            /* den */Z.ZInt64[/* zero */1]
          ];
  } else {
    return make_real$2(Curry._2(Z.ZInt64[/* mul */17], x[/* num */0], y[/* num */0]), Curry._2(Z.ZInt64[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function inv$2(x) {
  var match = Curry._1(Z.ZInt64[/* sign */45], x[/* num */0]);
  var exit = 0;
  var switcher = match + 1 | 0;
  if (switcher > 2 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return /* record */[
                  /* num */Curry._1(Z.ZInt64[/* neg */14], x[/* den */1]),
                  /* den */Curry._1(Z.ZInt64[/* neg */14], x[/* num */0])
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
    if (x[/* den */1] === Z.ZInt64[/* zero */1]) {
      return undef$2;
    } else {
      return inf$2;
    }
  }
  
}

function div$2(x, y) {
  if (Curry._1(Z.ZInt64[/* sign */45], y[/* num */0]) >= 0) {
    return mul$2(x, /* record */[
                /* num */y[/* den */1],
                /* den */y[/* num */0]
              ]);
  } else {
    return mul$2(x, /* record */[
                /* num */Curry._1(Z.ZInt64[/* neg */14], y[/* den */1]),
                /* den */Curry._1(Z.ZInt64[/* neg */14], y[/* num */0])
              ]);
  }
}

function mul_2exp$2(x, n) {
  if (x[/* den */1] === Z.ZInt64[/* zero */1]) {
    return x;
  } else {
    return make_real$2(Curry._2(Z.ZInt64[/* shift_left */29], x[/* num */0], n), x[/* den */1]);
  }
}

function div_2exp$2(x, n) {
  if (x[/* den */1] === Z.ZInt64[/* zero */1]) {
    return x;
  } else {
    return make_real$2(x[/* num */0], Curry._2(Z.ZInt64[/* shift_left */29], x[/* den */1], n));
  }
}

function print$2(x) {
  return Pervasives.print_string(to_string$2(x));
}

function output$2(chan, x) {
  return Pervasives.output_string(chan, to_string$2(x));
}

function sprint$2(_, x) {
  return to_string$2(x);
}

function bprint$2(b, x) {
  return $$Buffer.add_string(b, to_string$2(x));
}

function pp_print$2(f, x) {
  return Format.pp_print_string(f, to_string$2(x));
}

function $tilde$plus$2(x) {
  return x;
}

function $less$great$2(a, b) {
  return !equal$2(a, b);
}

var RationalInt64 = /* module */[
  /* mk */mk$2,
  /* make_real */make_real$2,
  /* make */make$2,
  /* of_bigint */of_bigint$2,
  /* of_int */of_int$2,
  /* of_int32 */of_int32$2,
  /* of_int64 */of_int64$2,
  /* of_nativeint */of_nativeint$2,
  /* of_ints */of_ints$2,
  /* zero */zero$2,
  /* one */one$2,
  /* minus_one */minus_one$2,
  /* inf */inf$2,
  /* minus_inf */minus_inf$2,
  /* undef */undef$2,
  /* of_float */of_float$2,
  /* of_string */of_string$2,
  /* classify */classify$2,
  /* is_real */is_real$2,
  /* num */num$2,
  /* den */den$2,
  /* sign */sign$2,
  /* equal */equal$2,
  /* compare */compare$2,
  /* min */min$2,
  /* max */max$2,
  /* leq */leq$2,
  /* geq */geq$2,
  /* lt */lt$2,
  /* gt */gt$2,
  /* to_string */to_string$2,
  /* to_bigint */to_bigint$2,
  /* to_int */to_int$2,
  /* to_int32 */to_int32$2,
  /* to_int64 */to_int64$2,
  /* to_nativeint */to_nativeint$2,
  /* to_float */to_float$2,
  /* neg */neg$2,
  /* abs */abs$2,
  /* aors */aors$2,
  /* add */add$2,
  /* sub */sub$2,
  /* mul */mul$2,
  /* inv */inv$2,
  /* div */div$2,
  /* mul_2exp */mul_2exp$2,
  /* div_2exp */div_2exp$2,
  /* print */print$2,
  /* output */output$2,
  /* sprint */sprint$2,
  /* bprint */bprint$2,
  /* pp_print */pp_print$2,
  /* ~- */neg$2,
  /* ~+ */$tilde$plus$2,
  /* + */add$2,
  /* - */sub$2,
  /* * */mul$2,
  /* / */div$2,
  /* lsl */mul_2exp$2,
  /* asr */div_2exp$2,
  /* ~$ */of_int$2,
  /* // */of_ints$2,
  /* ~$$ */of_bigint$2,
  /* /// */make$2,
  /* = */equal$2,
  /* < */lt$2,
  /* > */gt$2,
  /* <= */leq$2,
  /* >= */geq$2,
  /* <> */$less$great$2
];

function mk$3(n, d) {
  return /* record */[
          /* num */n,
          /* den */d
        ];
}

function make_real$3(n, d) {
  if (n === Z.ZNativeint[/* zero */1] || d === Z.ZNativeint[/* one */2]) {
    return /* record */[
            /* num */n,
            /* den */Z.ZNativeint[/* one */2]
          ];
  } else {
    var g = Curry._2(Z.ZNativeint[/* gcd */50], n, d);
    if (g === Z.ZNativeint[/* one */2]) {
      return /* record */[
              /* num */n,
              /* den */d
            ];
    } else {
      return /* record */[
              /* num */Curry._2(Z.ZNativeint[/* divexact */24], n, g),
              /* den */Curry._2(Z.ZNativeint[/* divexact */24], d, g)
            ];
    }
  }
}

function make$3(n, d) {
  var sd = Curry._1(Z.ZNativeint[/* sign */45], d);
  if (sd === 0) {
    return /* record */[
            /* num */Curry._1(Z.ZNativeint[/* of_int */4], Curry._1(Z.ZNativeint[/* sign */45], n)),
            /* den */Z.ZNativeint[/* zero */1]
          ];
  } else if (sd > 0) {
    return make_real$3(n, d);
  } else {
    return make_real$3(Curry._1(Z.ZNativeint[/* neg */14], n), Curry._1(Z.ZNativeint[/* neg */14], d));
  }
}

function of_bigint$3(n) {
  return /* record */[
          /* num */n,
          /* den */Z.ZNativeint[/* one */2]
        ];
}

function of_int$3(n) {
  var n$1 = Curry._1(Z.ZNativeint[/* of_int */4], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZNativeint[/* one */2]
        ];
}

function of_int32$3(n) {
  var n$1 = Curry._1(Z.ZNativeint[/* of_int32 */5], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZNativeint[/* one */2]
        ];
}

function of_int64$3(n) {
  var n$1 = Curry._1(Z.ZNativeint[/* of_int64 */6], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZNativeint[/* one */2]
        ];
}

function of_nativeint$3(n) {
  var n$1 = Curry._1(Z.ZNativeint[/* of_nativeint */7], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZNativeint[/* one */2]
        ];
}

function of_ints$3(n, d) {
  return make$3(Curry._1(Z.ZNativeint[/* of_int */4], n), Curry._1(Z.ZNativeint[/* of_int */4], d));
}

var zero_000$3 = /* num */Z.ZNativeint[/* zero */1];

var zero_001$3 = /* den */Z.ZNativeint[/* one */2];

var zero$3 = /* record */[
  zero_000$3,
  zero_001$3
];

var one_000$3 = /* num */Z.ZNativeint[/* one */2];

var one_001$3 = /* den */Z.ZNativeint[/* one */2];

var one$3 = /* record */[
  one_000$3,
  one_001$3
];

var minus_one_000$3 = /* num */Z.ZNativeint[/* minus_one */3];

var minus_one_001$3 = /* den */Z.ZNativeint[/* one */2];

var minus_one$3 = /* record */[
  minus_one_000$3,
  minus_one_001$3
];

var inf_000$3 = /* num */Z.ZNativeint[/* one */2];

var inf_001$3 = /* den */Z.ZNativeint[/* zero */1];

var inf$3 = /* record */[
  inf_000$3,
  inf_001$3
];

var minus_inf_000$3 = /* num */Z.ZNativeint[/* minus_one */3];

var minus_inf_001$3 = /* den */Z.ZNativeint[/* zero */1];

var minus_inf$3 = /* record */[
  minus_inf_000$3,
  minus_inf_001$3
];

var undef_000$3 = /* num */Z.ZNativeint[/* zero */1];

var undef_001$3 = /* den */Z.ZNativeint[/* zero */1];

var undef$3 = /* record */[
  undef_000$3,
  undef_001$3
];

function of_float$3(d) {
  if (d === Number.POSITIVE_INFINITY) {
    return inf$3;
  } else if (d === Number.NEGATIVE_INFINITY) {
    return minus_inf$3;
  } else if (Caml_float.caml_classify_float(d) === /* FP_nan */4) {
    return undef$3;
  } else {
    var match = Caml_float.caml_frexp_float(d);
    var m = Curry._1(Z.ZNativeint[/* of_float */8], Caml_float.caml_ldexp_float(match[0], 53));
    var e = match[1] - 53 | 0;
    if (e >= 0) {
      var n = Curry._2(Z.ZNativeint[/* shift_left */29], m, e);
      return /* record */[
              /* num */n,
              /* den */Z.ZNativeint[/* one */2]
            ];
    } else {
      return make_real$3(m, Curry._2(Z.ZNativeint[/* shift_left */29], Z.ZNativeint[/* one */2], -e | 0));
    }
  }
}

function of_string$3(s) {
  try {
    var i = $$String.index(s, /* "/" */47);
    return make$3(Curry._3(Z.ZNativeint[/* of_substring */10], s, 0, i), Curry._3(Z.ZNativeint[/* of_substring */10], s, i + 1 | 0, (s.length - i | 0) - 1 | 0));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      if (s === "inf" || s === "+inf") {
        return inf$3;
      } else if (s === "-inf") {
        return minus_inf$3;
      } else if (s === "undef") {
        return undef$3;
      } else {
        var n = Curry._1(Z.ZNativeint[/* of_string */9], s);
        return /* record */[
                /* num */n,
                /* den */Z.ZNativeint[/* one */2]
              ];
      }
    } else {
      throw exn;
    }
  }
}

function classify$3(n) {
  if (n[/* den */1] === Z.ZNativeint[/* zero */1]) {
    var match = Curry._1(Z.ZNativeint[/* sign */45], n[/* num */0]);
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
  } else if (n[/* num */0] === Z.ZNativeint[/* zero */1]) {
    return /* ZERO */0;
  } else {
    return /* NZERO */4;
  }
}

function is_real$3(n) {
  return n[/* den */1] !== Z.ZNativeint[/* zero */1];
}

function num$3(x) {
  return x[/* num */0];
}

function den$3(x) {
  return x[/* den */1];
}

function sign$3(x) {
  return Curry._1(Z.ZNativeint[/* sign */45], x[/* num */0]);
}

function equal$3(x, y) {
  if (Curry._2(Z.ZNativeint[/* equal */40], x[/* num */0], y[/* num */0])) {
    return Curry._2(Z.ZNativeint[/* equal */40], x[/* den */1], y[/* den */1]);
  } else {
    return false;
  }
}

function compare$3(x, y) {
  var match = classify$3(x);
  var match$1 = classify$3(y);
  var exit = 0;
  var exit$1 = 0;
  var exit$2 = 0;
  var exit$3 = 0;
  switch (match) {
    case 1 : 
        var switcher = match$1 - 1 | 0;
        if (switcher > 2 || switcher < 0) {
          exit$2 = 3;
        } else {
          switch (switcher) {
            case 0 : 
                return 0;
            case 1 : 
                exit$2 = 3;
                break;
            case 2 : 
                exit$3 = 4;
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
                  exit$3 = 4;
                  break;
              case 2 : 
                  exit$2 = 3;
                  break;
              
            }
          } else {
            exit$2 = 3;
          }
        } else {
          exit$3 = 4;
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
        exit$3 = 4;
        break;
    
  }
  if (exit$3 === 4) {
    var switcher$1 = match$1 - 1 | 0;
    if (switcher$1 > 2 || switcher$1 < 0) {
      exit$2 = 3;
    } else {
      switch (switcher$1) {
        case 0 : 
            return -1;
        case 1 : 
            exit$2 = 3;
            break;
        case 2 : 
            return 1;
        
      }
    }
  }
  if (exit$2 === 3) {
    if (match >= 4) {
      exit$1 = 2;
    } else {
      switch (match) {
        case 0 : 
            exit$1 = 2;
            break;
        case 1 : 
            return 1;
        case 2 : 
            return -1;
        
      }
    }
  }
  if (exit$1 === 2) {
    if (match$1 !== 2) {
      exit = 1;
    } else {
      return 1;
    }
  }
  if (exit === 1) {
    if (x[/* den */1] === y[/* den */1]) {
      return Curry._2(Z.ZNativeint[/* compare */39], x[/* num */0], y[/* num */0]);
    } else {
      return Curry._2(Z.ZNativeint[/* compare */39], Curry._2(Z.ZNativeint[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZNativeint[/* mul */17], y[/* num */0], x[/* den */1]));
    }
  }
  
}

function min$3(a, b) {
  if (compare$3(a, b) <= 0) {
    return a;
  } else {
    return b;
  }
}

function max$3(a, b) {
  if (compare$3(a, b) >= 0) {
    return a;
  } else {
    return b;
  }
}

function leq$3(a, b) {
  return compare$3(a, b) <= 0;
}

function geq$3(a, b) {
  return compare$3(a, b) >= 0;
}

function lt$3(a, b) {
  return compare$3(a, b) < 0;
}

function gt$3(a, b) {
  return compare$3(a, b) > 0;
}

function to_string$3(n) {
  var match = classify$3(n);
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
        if (Curry._2(Z.ZNativeint[/* equal */40], n[/* den */1], Z.ZNativeint[/* one */2])) {
          return Curry._1(Z.ZNativeint[/* to_string */38], n[/* num */0]);
        } else {
          return Curry._1(Z.ZNativeint[/* to_string */38], n[/* num */0]) + ("/" + Curry._1(Z.ZNativeint[/* to_string */38], n[/* den */1]));
        }
    
  }
}

function to_bigint$3(x) {
  return Curry._2(Z.ZNativeint[/* div */18], x[/* num */0], x[/* den */1]);
}

function to_int$3(x) {
  return Curry._1(Z.ZNativeint[/* to_int */32], to_bigint$3(x));
}

function to_int32$3(x) {
  return Curry._1(Z.ZNativeint[/* to_int32 */33], to_bigint$3(x));
}

function to_int64$3(x) {
  return Curry._1(Z.ZNativeint[/* to_int64 */34], to_bigint$3(x));
}

function to_nativeint$3(x) {
  return Curry._1(Z.ZNativeint[/* to_nativeint */35], to_bigint$3(x));
}

function to_float$3(x) {
  var match = classify$3(x);
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
        var np = Curry._1(Z.ZNativeint[/* numbits */31], p);
        var nq = Curry._1(Z.ZNativeint[/* numbits */31], q);
        if (np <= 53 && nq <= 53) {
          return Caml_int64.to_float(Curry._1(Z.ZNativeint[/* to_int64 */34], p)) / Caml_int64.to_float(Curry._1(Z.ZNativeint[/* to_int64 */34], q));
        } else {
          var n = 55 - (np - nq | 0) | 0;
          var match$1 = n >= 0 ? /* tuple */[
              Curry._2(Z.ZNativeint[/* shift_left */29], p, n),
              q
            ] : /* tuple */[
              p,
              Curry._2(Z.ZNativeint[/* shift_left */29], q, -n | 0)
            ];
          var match$2 = Curry._2(Z.ZNativeint[/* ediv_rem */21], match$1[0], match$1[1]);
          var f = Curry._2(Z.ZNativeint[/* round_to_float */37], match$2[0], Curry._1(Z.ZNativeint[/* sign */45], match$2[1]) === 0);
          return Caml_float.caml_ldexp_float(f, -n | 0);
        }
    
  }
}

function neg$3(x) {
  return /* record */[
          /* num */Curry._1(Z.ZNativeint[/* neg */14], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function abs$3(x) {
  return /* record */[
          /* num */Curry._1(Z.ZNativeint[/* abs */13], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function aors$3(zaors, x, y) {
  if (x[/* den */1] === y[/* den */1]) {
    return make_real$3(Curry._2(zaors, x[/* num */0], y[/* num */0]), x[/* den */1]);
  } else {
    return make_real$3(Curry._2(zaors, Curry._2(Z.ZNativeint[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZNativeint[/* mul */17], y[/* num */0], x[/* den */1])), Curry._2(Z.ZNativeint[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function add$3(x, y) {
  if (x[/* den */1] === Z.ZNativeint[/* zero */1] || y[/* den */1] === Z.ZNativeint[/* zero */1]) {
    var match = classify$3(x);
    var match$1 = classify$3(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return y;
      case 1 : 
          switch (match$1) {
            case 2 : 
                return undef$3;
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
                return undef$3;
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf$3;
            
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
        return undef$3;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef$3;
          } else {
            return inf$3;
          }
      case 2 : 
          if (match$1 >= 2) {
            return minus_inf$3;
          } else {
            return inf$3;
          }
      
    }
  } else {
    return aors$3(Z.ZNativeint[/* add */15], x, y);
  }
}

function sub$3(x, y) {
  if (x[/* den */1] === Z.ZNativeint[/* zero */1] || y[/* den */1] === Z.ZNativeint[/* zero */1]) {
    var match = classify$3(x);
    var match$1 = classify$3(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return neg$3(y);
      case 1 : 
          switch (match$1) {
            case 1 : 
                return undef$3;
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
                return undef$3;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf$3;
            
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
        return undef$3;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef$3;
          } else {
            return inf$3;
          }
      case 2 : 
          if (match$1 >= 2) {
            return inf$3;
          } else {
            return minus_inf$3;
          }
      
    }
  } else {
    return aors$3(Z.ZNativeint[/* sub */16], x, y);
  }
}

function mul$3(x, y) {
  if (x[/* den */1] === Z.ZNativeint[/* zero */1] || y[/* den */1] === Z.ZNativeint[/* zero */1]) {
    return /* record */[
            /* num */Curry._1(Z.ZNativeint[/* of_int */4], Caml_int32.imul(Curry._1(Z.ZNativeint[/* sign */45], x[/* num */0]), Curry._1(Z.ZNativeint[/* sign */45], y[/* num */0]))),
            /* den */Z.ZNativeint[/* zero */1]
          ];
  } else {
    return make_real$3(Curry._2(Z.ZNativeint[/* mul */17], x[/* num */0], y[/* num */0]), Curry._2(Z.ZNativeint[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function inv$3(x) {
  var match = Curry._1(Z.ZNativeint[/* sign */45], x[/* num */0]);
  var exit = 0;
  var switcher = match + 1 | 0;
  if (switcher > 2 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return /* record */[
                  /* num */Curry._1(Z.ZNativeint[/* neg */14], x[/* den */1]),
                  /* den */Curry._1(Z.ZNativeint[/* neg */14], x[/* num */0])
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
    if (x[/* den */1] === Z.ZNativeint[/* zero */1]) {
      return undef$3;
    } else {
      return inf$3;
    }
  }
  
}

function div$3(x, y) {
  if (Curry._1(Z.ZNativeint[/* sign */45], y[/* num */0]) >= 0) {
    return mul$3(x, /* record */[
                /* num */y[/* den */1],
                /* den */y[/* num */0]
              ]);
  } else {
    return mul$3(x, /* record */[
                /* num */Curry._1(Z.ZNativeint[/* neg */14], y[/* den */1]),
                /* den */Curry._1(Z.ZNativeint[/* neg */14], y[/* num */0])
              ]);
  }
}

function mul_2exp$3(x, n) {
  if (x[/* den */1] === Z.ZNativeint[/* zero */1]) {
    return x;
  } else {
    return make_real$3(Curry._2(Z.ZNativeint[/* shift_left */29], x[/* num */0], n), x[/* den */1]);
  }
}

function div_2exp$3(x, n) {
  if (x[/* den */1] === Z.ZNativeint[/* zero */1]) {
    return x;
  } else {
    return make_real$3(x[/* num */0], Curry._2(Z.ZNativeint[/* shift_left */29], x[/* den */1], n));
  }
}

function print$3(x) {
  return Pervasives.print_string(to_string$3(x));
}

function output$3(chan, x) {
  return Pervasives.output_string(chan, to_string$3(x));
}

function sprint$3(_, x) {
  return to_string$3(x);
}

function bprint$3(b, x) {
  return $$Buffer.add_string(b, to_string$3(x));
}

function pp_print$3(f, x) {
  return Format.pp_print_string(f, to_string$3(x));
}

function $tilde$plus$3(x) {
  return x;
}

function $less$great$3(a, b) {
  return !equal$3(a, b);
}

var RationalNativeint = /* module */[
  /* mk */mk$3,
  /* make_real */make_real$3,
  /* make */make$3,
  /* of_bigint */of_bigint$3,
  /* of_int */of_int$3,
  /* of_int32 */of_int32$3,
  /* of_int64 */of_int64$3,
  /* of_nativeint */of_nativeint$3,
  /* of_ints */of_ints$3,
  /* zero */zero$3,
  /* one */one$3,
  /* minus_one */minus_one$3,
  /* inf */inf$3,
  /* minus_inf */minus_inf$3,
  /* undef */undef$3,
  /* of_float */of_float$3,
  /* of_string */of_string$3,
  /* classify */classify$3,
  /* is_real */is_real$3,
  /* num */num$3,
  /* den */den$3,
  /* sign */sign$3,
  /* equal */equal$3,
  /* compare */compare$3,
  /* min */min$3,
  /* max */max$3,
  /* leq */leq$3,
  /* geq */geq$3,
  /* lt */lt$3,
  /* gt */gt$3,
  /* to_string */to_string$3,
  /* to_bigint */to_bigint$3,
  /* to_int */to_int$3,
  /* to_int32 */to_int32$3,
  /* to_int64 */to_int64$3,
  /* to_nativeint */to_nativeint$3,
  /* to_float */to_float$3,
  /* neg */neg$3,
  /* abs */abs$3,
  /* aors */aors$3,
  /* add */add$3,
  /* sub */sub$3,
  /* mul */mul$3,
  /* inv */inv$3,
  /* div */div$3,
  /* mul_2exp */mul_2exp$3,
  /* div_2exp */div_2exp$3,
  /* print */print$3,
  /* output */output$3,
  /* sprint */sprint$3,
  /* bprint */bprint$3,
  /* pp_print */pp_print$3,
  /* ~- */neg$3,
  /* ~+ */$tilde$plus$3,
  /* + */add$3,
  /* - */sub$3,
  /* * */mul$3,
  /* / */div$3,
  /* lsl */mul_2exp$3,
  /* asr */div_2exp$3,
  /* ~$ */of_int$3,
  /* // */of_ints$3,
  /* ~$$ */of_bigint$3,
  /* /// */make$3,
  /* = */equal$3,
  /* < */lt$3,
  /* > */gt$3,
  /* <= */leq$3,
  /* >= */geq$3,
  /* <> */$less$great$3
];

function mk$4(n, d) {
  return /* record */[
          /* num */n,
          /* den */d
        ];
}

function make_real$4(n, d) {
  if (n === Z.ZBigint[/* zero */1] || d === Z.ZBigint[/* one */2]) {
    return /* record */[
            /* num */n,
            /* den */Z.ZBigint[/* one */2]
          ];
  } else {
    var g = Curry._2(Z.ZBigint[/* gcd */50], n, d);
    if (g === Z.ZBigint[/* one */2]) {
      return /* record */[
              /* num */n,
              /* den */d
            ];
    } else {
      return /* record */[
              /* num */Curry._2(Z.ZBigint[/* divexact */24], n, g),
              /* den */Curry._2(Z.ZBigint[/* divexact */24], d, g)
            ];
    }
  }
}

function make$4(n, d) {
  var sd = Curry._1(Z.ZBigint[/* sign */45], d);
  if (sd === 0) {
    return /* record */[
            /* num */Curry._1(Z.ZBigint[/* of_int */4], Curry._1(Z.ZBigint[/* sign */45], n)),
            /* den */Z.ZBigint[/* zero */1]
          ];
  } else if (sd > 0) {
    return make_real$4(n, d);
  } else {
    return make_real$4(Curry._1(Z.ZBigint[/* neg */14], n), Curry._1(Z.ZBigint[/* neg */14], d));
  }
}

function of_bigint$4(n) {
  return /* record */[
          /* num */n,
          /* den */Z.ZBigint[/* one */2]
        ];
}

function of_int$4(n) {
  var n$1 = Curry._1(Z.ZBigint[/* of_int */4], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZBigint[/* one */2]
        ];
}

function of_int32$4(n) {
  var n$1 = Curry._1(Z.ZBigint[/* of_int32 */5], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZBigint[/* one */2]
        ];
}

function of_int64$4(n) {
  var n$1 = Curry._1(Z.ZBigint[/* of_int64 */6], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZBigint[/* one */2]
        ];
}

function of_nativeint$4(n) {
  var n$1 = Curry._1(Z.ZBigint[/* of_nativeint */7], n);
  return /* record */[
          /* num */n$1,
          /* den */Z.ZBigint[/* one */2]
        ];
}

function of_ints$4(n, d) {
  return make$4(Curry._1(Z.ZBigint[/* of_int */4], n), Curry._1(Z.ZBigint[/* of_int */4], d));
}

var zero_000$4 = /* num */Z.ZBigint[/* zero */1];

var zero_001$4 = /* den */Z.ZBigint[/* one */2];

var zero$4 = /* record */[
  zero_000$4,
  zero_001$4
];

var one_000$4 = /* num */Z.ZBigint[/* one */2];

var one_001$4 = /* den */Z.ZBigint[/* one */2];

var one$4 = /* record */[
  one_000$4,
  one_001$4
];

var minus_one_000$4 = /* num */Z.ZBigint[/* minus_one */3];

var minus_one_001$4 = /* den */Z.ZBigint[/* one */2];

var minus_one$4 = /* record */[
  minus_one_000$4,
  minus_one_001$4
];

var inf_000$4 = /* num */Z.ZBigint[/* one */2];

var inf_001$4 = /* den */Z.ZBigint[/* zero */1];

var inf$4 = /* record */[
  inf_000$4,
  inf_001$4
];

var minus_inf_000$4 = /* num */Z.ZBigint[/* minus_one */3];

var minus_inf_001$4 = /* den */Z.ZBigint[/* zero */1];

var minus_inf$4 = /* record */[
  minus_inf_000$4,
  minus_inf_001$4
];

var undef_000$4 = /* num */Z.ZBigint[/* zero */1];

var undef_001$4 = /* den */Z.ZBigint[/* zero */1];

var undef$4 = /* record */[
  undef_000$4,
  undef_001$4
];

function of_float$4(d) {
  if (d === Number.POSITIVE_INFINITY) {
    return inf$4;
  } else if (d === Number.NEGATIVE_INFINITY) {
    return minus_inf$4;
  } else if (Caml_float.caml_classify_float(d) === /* FP_nan */4) {
    return undef$4;
  } else {
    var match = Caml_float.caml_frexp_float(d);
    var m = Curry._1(Z.ZBigint[/* of_float */8], Caml_float.caml_ldexp_float(match[0], 53));
    var e = match[1] - 53 | 0;
    if (e >= 0) {
      var n = Curry._2(Z.ZBigint[/* shift_left */29], m, e);
      return /* record */[
              /* num */n,
              /* den */Z.ZBigint[/* one */2]
            ];
    } else {
      return make_real$4(m, Curry._2(Z.ZBigint[/* shift_left */29], Z.ZBigint[/* one */2], -e | 0));
    }
  }
}

function of_string$4(s) {
  try {
    var i = $$String.index(s, /* "/" */47);
    return make$4(Curry._3(Z.ZBigint[/* of_substring */10], s, 0, i), Curry._3(Z.ZBigint[/* of_substring */10], s, i + 1 | 0, (s.length - i | 0) - 1 | 0));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      if (s === "inf" || s === "+inf") {
        return inf$4;
      } else if (s === "-inf") {
        return minus_inf$4;
      } else if (s === "undef") {
        return undef$4;
      } else {
        var n = Curry._1(Z.ZBigint[/* of_string */9], s);
        return /* record */[
                /* num */n,
                /* den */Z.ZBigint[/* one */2]
              ];
      }
    } else {
      throw exn;
    }
  }
}

function classify$4(n) {
  if (n[/* den */1] === Z.ZBigint[/* zero */1]) {
    var match = Curry._1(Z.ZBigint[/* sign */45], n[/* num */0]);
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
  } else if (n[/* num */0] === Z.ZBigint[/* zero */1]) {
    return /* ZERO */0;
  } else {
    return /* NZERO */4;
  }
}

function is_real$4(n) {
  return n[/* den */1] !== Z.ZBigint[/* zero */1];
}

function num$4(x) {
  return x[/* num */0];
}

function den$4(x) {
  return x[/* den */1];
}

function sign$4(x) {
  return Curry._1(Z.ZBigint[/* sign */45], x[/* num */0]);
}

function equal$4(x, y) {
  if (Curry._2(Z.ZBigint[/* equal */40], x[/* num */0], y[/* num */0])) {
    return Curry._2(Z.ZBigint[/* equal */40], x[/* den */1], y[/* den */1]);
  } else {
    return false;
  }
}

function compare$4(x, y) {
  var match = classify$4(x);
  var match$1 = classify$4(y);
  var exit = 0;
  var exit$1 = 0;
  var exit$2 = 0;
  var exit$3 = 0;
  switch (match) {
    case 1 : 
        var switcher = match$1 - 1 | 0;
        if (switcher > 2 || switcher < 0) {
          exit$2 = 3;
        } else {
          switch (switcher) {
            case 0 : 
                return 0;
            case 1 : 
                exit$2 = 3;
                break;
            case 2 : 
                exit$3 = 4;
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
                  exit$3 = 4;
                  break;
              case 2 : 
                  exit$2 = 3;
                  break;
              
            }
          } else {
            exit$2 = 3;
          }
        } else {
          exit$3 = 4;
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
        exit$3 = 4;
        break;
    
  }
  if (exit$3 === 4) {
    var switcher$1 = match$1 - 1 | 0;
    if (switcher$1 > 2 || switcher$1 < 0) {
      exit$2 = 3;
    } else {
      switch (switcher$1) {
        case 0 : 
            return -1;
        case 1 : 
            exit$2 = 3;
            break;
        case 2 : 
            return 1;
        
      }
    }
  }
  if (exit$2 === 3) {
    if (match >= 4) {
      exit$1 = 2;
    } else {
      switch (match) {
        case 0 : 
            exit$1 = 2;
            break;
        case 1 : 
            return 1;
        case 2 : 
            return -1;
        
      }
    }
  }
  if (exit$1 === 2) {
    if (match$1 !== 2) {
      exit = 1;
    } else {
      return 1;
    }
  }
  if (exit === 1) {
    if (x[/* den */1] === y[/* den */1]) {
      return Curry._2(Z.ZBigint[/* compare */39], x[/* num */0], y[/* num */0]);
    } else {
      return Curry._2(Z.ZBigint[/* compare */39], Curry._2(Z.ZBigint[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZBigint[/* mul */17], y[/* num */0], x[/* den */1]));
    }
  }
  
}

function min$4(a, b) {
  if (compare$4(a, b) <= 0) {
    return a;
  } else {
    return b;
  }
}

function max$4(a, b) {
  if (compare$4(a, b) >= 0) {
    return a;
  } else {
    return b;
  }
}

function leq$4(a, b) {
  return compare$4(a, b) <= 0;
}

function geq$4(a, b) {
  return compare$4(a, b) >= 0;
}

function lt$4(a, b) {
  return compare$4(a, b) < 0;
}

function gt$4(a, b) {
  return compare$4(a, b) > 0;
}

function to_string$4(n) {
  var match = classify$4(n);
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
        if (Curry._2(Z.ZBigint[/* equal */40], n[/* den */1], Z.ZBigint[/* one */2])) {
          return Curry._1(Z.ZBigint[/* to_string */38], n[/* num */0]);
        } else {
          return Curry._1(Z.ZBigint[/* to_string */38], n[/* num */0]) + ("/" + Curry._1(Z.ZBigint[/* to_string */38], n[/* den */1]));
        }
    
  }
}

function to_bigint$4(x) {
  return Curry._2(Z.ZBigint[/* div */18], x[/* num */0], x[/* den */1]);
}

function to_int$4(x) {
  return Curry._1(Z.ZBigint[/* to_int */32], to_bigint$4(x));
}

function to_int32$4(x) {
  return Curry._1(Z.ZBigint[/* to_int32 */33], to_bigint$4(x));
}

function to_int64$4(x) {
  return Curry._1(Z.ZBigint[/* to_int64 */34], to_bigint$4(x));
}

function to_nativeint$4(x) {
  return Curry._1(Z.ZBigint[/* to_nativeint */35], to_bigint$4(x));
}

function to_float$4(x) {
  var match = classify$4(x);
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
        var np = Curry._1(Z.ZBigint[/* numbits */31], p);
        var nq = Curry._1(Z.ZBigint[/* numbits */31], q);
        if (np <= 53 && nq <= 53) {
          return Caml_int64.to_float(Curry._1(Z.ZBigint[/* to_int64 */34], p)) / Caml_int64.to_float(Curry._1(Z.ZBigint[/* to_int64 */34], q));
        } else {
          var n = 55 - (np - nq | 0) | 0;
          var match$1 = n >= 0 ? /* tuple */[
              Curry._2(Z.ZBigint[/* shift_left */29], p, n),
              q
            ] : /* tuple */[
              p,
              Curry._2(Z.ZBigint[/* shift_left */29], q, -n | 0)
            ];
          var match$2 = Curry._2(Z.ZBigint[/* ediv_rem */21], match$1[0], match$1[1]);
          var f = Curry._2(Z.ZBigint[/* round_to_float */37], match$2[0], Curry._1(Z.ZBigint[/* sign */45], match$2[1]) === 0);
          return Caml_float.caml_ldexp_float(f, -n | 0);
        }
    
  }
}

function neg$4(x) {
  return /* record */[
          /* num */Curry._1(Z.ZBigint[/* neg */14], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function abs$4(x) {
  return /* record */[
          /* num */Curry._1(Z.ZBigint[/* abs */13], x[/* num */0]),
          /* den */x[/* den */1]
        ];
}

function aors$4(zaors, x, y) {
  if (x[/* den */1] === y[/* den */1]) {
    return make_real$4(Curry._2(zaors, x[/* num */0], y[/* num */0]), x[/* den */1]);
  } else {
    return make_real$4(Curry._2(zaors, Curry._2(Z.ZBigint[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(Z.ZBigint[/* mul */17], y[/* num */0], x[/* den */1])), Curry._2(Z.ZBigint[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function add$4(x, y) {
  if (x[/* den */1] === Z.ZBigint[/* zero */1] || y[/* den */1] === Z.ZBigint[/* zero */1]) {
    var match = classify$4(x);
    var match$1 = classify$4(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return y;
      case 1 : 
          switch (match$1) {
            case 2 : 
                return undef$4;
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
                return undef$4;
            case 2 : 
                exit = 2;
                break;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf$4;
            
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
        return undef$4;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef$4;
          } else {
            return inf$4;
          }
      case 2 : 
          if (match$1 >= 2) {
            return minus_inf$4;
          } else {
            return inf$4;
          }
      
    }
  } else {
    return aors$4(Z.ZBigint[/* add */15], x, y);
  }
}

function sub$4(x, y) {
  if (x[/* den */1] === Z.ZBigint[/* zero */1] || y[/* den */1] === Z.ZBigint[/* zero */1]) {
    var match = classify$4(x);
    var match$1 = classify$4(y);
    var exit = 0;
    var exit$1 = 0;
    switch (match) {
      case 0 : 
          return neg$4(y);
      case 1 : 
          switch (match$1) {
            case 1 : 
                return undef$4;
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
                return undef$4;
            case 0 : 
            case 3 : 
                exit$1 = 3;
                break;
            case 4 : 
                return minus_inf$4;
            
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
        return undef$4;
      }
    }
    switch (exit) {
      case 1 : 
          if (match >= 3) {
            return undef$4;
          } else {
            return inf$4;
          }
      case 2 : 
          if (match$1 >= 2) {
            return inf$4;
          } else {
            return minus_inf$4;
          }
      
    }
  } else {
    return aors$4(Z.ZBigint[/* sub */16], x, y);
  }
}

function mul$4(x, y) {
  if (x[/* den */1] === Z.ZBigint[/* zero */1] || y[/* den */1] === Z.ZBigint[/* zero */1]) {
    return /* record */[
            /* num */Curry._1(Z.ZBigint[/* of_int */4], Caml_int32.imul(Curry._1(Z.ZBigint[/* sign */45], x[/* num */0]), Curry._1(Z.ZBigint[/* sign */45], y[/* num */0]))),
            /* den */Z.ZBigint[/* zero */1]
          ];
  } else {
    return make_real$4(Curry._2(Z.ZBigint[/* mul */17], x[/* num */0], y[/* num */0]), Curry._2(Z.ZBigint[/* mul */17], x[/* den */1], y[/* den */1]));
  }
}

function inv$4(x) {
  var match = Curry._1(Z.ZBigint[/* sign */45], x[/* num */0]);
  var exit = 0;
  var switcher = match + 1 | 0;
  if (switcher > 2 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return /* record */[
                  /* num */Curry._1(Z.ZBigint[/* neg */14], x[/* den */1]),
                  /* den */Curry._1(Z.ZBigint[/* neg */14], x[/* num */0])
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
    if (x[/* den */1] === Z.ZBigint[/* zero */1]) {
      return undef$4;
    } else {
      return inf$4;
    }
  }
  
}

function div$4(x, y) {
  if (Curry._1(Z.ZBigint[/* sign */45], y[/* num */0]) >= 0) {
    return mul$4(x, /* record */[
                /* num */y[/* den */1],
                /* den */y[/* num */0]
              ]);
  } else {
    return mul$4(x, /* record */[
                /* num */Curry._1(Z.ZBigint[/* neg */14], y[/* den */1]),
                /* den */Curry._1(Z.ZBigint[/* neg */14], y[/* num */0])
              ]);
  }
}

function mul_2exp$4(x, n) {
  if (x[/* den */1] === Z.ZBigint[/* zero */1]) {
    return x;
  } else {
    return make_real$4(Curry._2(Z.ZBigint[/* shift_left */29], x[/* num */0], n), x[/* den */1]);
  }
}

function div_2exp$4(x, n) {
  if (x[/* den */1] === Z.ZBigint[/* zero */1]) {
    return x;
  } else {
    return make_real$4(x[/* num */0], Curry._2(Z.ZBigint[/* shift_left */29], x[/* den */1], n));
  }
}

function print$4(x) {
  return Pervasives.print_string(to_string$4(x));
}

function output$4(chan, x) {
  return Pervasives.output_string(chan, to_string$4(x));
}

function sprint$4(_, x) {
  return to_string$4(x);
}

function bprint$4(b, x) {
  return $$Buffer.add_string(b, to_string$4(x));
}

function pp_print$4(f, x) {
  return Format.pp_print_string(f, to_string$4(x));
}

function $tilde$plus$4(x) {
  return x;
}

function $less$great$4(a, b) {
  return !equal$4(a, b);
}

var RationalBigint = /* module */[
  /* mk */mk$4,
  /* make_real */make_real$4,
  /* make */make$4,
  /* of_bigint */of_bigint$4,
  /* of_int */of_int$4,
  /* of_int32 */of_int32$4,
  /* of_int64 */of_int64$4,
  /* of_nativeint */of_nativeint$4,
  /* of_ints */of_ints$4,
  /* zero */zero$4,
  /* one */one$4,
  /* minus_one */minus_one$4,
  /* inf */inf$4,
  /* minus_inf */minus_inf$4,
  /* undef */undef$4,
  /* of_float */of_float$4,
  /* of_string */of_string$4,
  /* classify */classify$4,
  /* is_real */is_real$4,
  /* num */num$4,
  /* den */den$4,
  /* sign */sign$4,
  /* equal */equal$4,
  /* compare */compare$4,
  /* min */min$4,
  /* max */max$4,
  /* leq */leq$4,
  /* geq */geq$4,
  /* lt */lt$4,
  /* gt */gt$4,
  /* to_string */to_string$4,
  /* to_bigint */to_bigint$4,
  /* to_int */to_int$4,
  /* to_int32 */to_int32$4,
  /* to_int64 */to_int64$4,
  /* to_nativeint */to_nativeint$4,
  /* to_float */to_float$4,
  /* neg */neg$4,
  /* abs */abs$4,
  /* aors */aors$4,
  /* add */add$4,
  /* sub */sub$4,
  /* mul */mul$4,
  /* inv */inv$4,
  /* div */div$4,
  /* mul_2exp */mul_2exp$4,
  /* div_2exp */div_2exp$4,
  /* print */print$4,
  /* output */output$4,
  /* sprint */sprint$4,
  /* bprint */bprint$4,
  /* pp_print */pp_print$4,
  /* ~- */neg$4,
  /* ~+ */$tilde$plus$4,
  /* + */add$4,
  /* - */sub$4,
  /* * */mul$4,
  /* / */div$4,
  /* lsl */mul_2exp$4,
  /* asr */div_2exp$4,
  /* ~$ */of_int$4,
  /* // */of_ints$4,
  /* ~$$ */of_bigint$4,
  /* /// */make$4,
  /* = */equal$4,
  /* < */lt$4,
  /* > */gt$4,
  /* <= */leq$4,
  /* >= */geq$4,
  /* <> */$less$great$4
];

function Rational(funarg) {
  var make_real = function (n, d) {
    if (n === funarg[/* zero */1] || d === funarg[/* one */2]) {
      return /* record */[
              /* num */n,
              /* den */funarg[/* one */2]
            ];
    } else {
      var g = Curry._2(funarg[/* gcd */50], n, d);
      if (g === funarg[/* one */2]) {
        return /* record */[
                /* num */n,
                /* den */d
              ];
      } else {
        return /* record */[
                /* num */Curry._2(funarg[/* divexact */24], n, g),
                /* den */Curry._2(funarg[/* divexact */24], d, g)
              ];
      }
    }
  };
  var make = function (n, d) {
    var sd = Curry._1(funarg[/* sign */45], d);
    if (sd === 0) {
      return /* record */[
              /* num */Curry._1(funarg[/* of_int */4], Curry._1(funarg[/* sign */45], n)),
              /* den */funarg[/* zero */1]
            ];
    } else if (sd > 0) {
      return make_real(n, d);
    } else {
      return make_real(Curry._1(funarg[/* neg */14], n), Curry._1(funarg[/* neg */14], d));
    }
  };
  var of_bigint = function (n) {
    return /* record */[
            /* num */n,
            /* den */funarg[/* one */2]
          ];
  };
  var of_int = function (n) {
    var n$1 = Curry._1(funarg[/* of_int */4], n);
    return /* record */[
            /* num */n$1,
            /* den */funarg[/* one */2]
          ];
  };
  var of_int32 = function (n) {
    var n$1 = Curry._1(funarg[/* of_int32 */5], n);
    return /* record */[
            /* num */n$1,
            /* den */funarg[/* one */2]
          ];
  };
  var of_int64 = function (n) {
    var n$1 = Curry._1(funarg[/* of_int64 */6], n);
    return /* record */[
            /* num */n$1,
            /* den */funarg[/* one */2]
          ];
  };
  var of_nativeint = function (n) {
    var n$1 = Curry._1(funarg[/* of_nativeint */7], n);
    return /* record */[
            /* num */n$1,
            /* den */funarg[/* one */2]
          ];
  };
  var of_ints = function (n, d) {
    return make(Curry._1(funarg[/* of_int */4], n), Curry._1(funarg[/* of_int */4], d));
  };
  var zero_000 = /* num */funarg[/* zero */1];
  var zero_001 = /* den */funarg[/* one */2];
  var zero = /* record */[
    zero_000,
    zero_001
  ];
  var one_000 = /* num */funarg[/* one */2];
  var one_001 = /* den */funarg[/* one */2];
  var one = /* record */[
    one_000,
    one_001
  ];
  var minus_one_000 = /* num */funarg[/* minus_one */3];
  var minus_one_001 = /* den */funarg[/* one */2];
  var minus_one = /* record */[
    minus_one_000,
    minus_one_001
  ];
  var inf_000 = /* num */funarg[/* one */2];
  var inf_001 = /* den */funarg[/* zero */1];
  var inf = /* record */[
    inf_000,
    inf_001
  ];
  var minus_inf_000 = /* num */funarg[/* minus_one */3];
  var minus_inf_001 = /* den */funarg[/* zero */1];
  var minus_inf = /* record */[
    minus_inf_000,
    minus_inf_001
  ];
  var undef_000 = /* num */funarg[/* zero */1];
  var undef_001 = /* den */funarg[/* zero */1];
  var undef = /* record */[
    undef_000,
    undef_001
  ];
  var of_float = function (d) {
    if (d === Number.POSITIVE_INFINITY) {
      return inf;
    } else if (d === Number.NEGATIVE_INFINITY) {
      return minus_inf;
    } else if (Caml_float.caml_classify_float(d) === /* FP_nan */4) {
      return undef;
    } else {
      var match = Caml_float.caml_frexp_float(d);
      var m = Curry._1(funarg[/* of_float */8], Caml_float.caml_ldexp_float(match[0], 53));
      var e = match[1] - 53 | 0;
      if (e >= 0) {
        var n = Curry._2(funarg[/* shift_left */29], m, e);
        return /* record */[
                /* num */n,
                /* den */funarg[/* one */2]
              ];
      } else {
        return make_real(m, Curry._2(funarg[/* shift_left */29], funarg[/* one */2], -e | 0));
      }
    }
  };
  var of_string = function (s) {
    try {
      var i = $$String.index(s, /* "/" */47);
      return make(Curry._3(funarg[/* of_substring */10], s, 0, i), Curry._3(funarg[/* of_substring */10], s, i + 1 | 0, (s.length - i | 0) - 1 | 0));
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
          var n = Curry._1(funarg[/* of_string */9], s);
          return /* record */[
                  /* num */n,
                  /* den */funarg[/* one */2]
                ];
        }
      } else {
        throw exn;
      }
    }
  };
  var classify = function (n) {
    if (n[/* den */1] === funarg[/* zero */1]) {
      var match = Curry._1(funarg[/* sign */45], n[/* num */0]);
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
    } else if (n[/* num */0] === funarg[/* zero */1]) {
      return /* ZERO */0;
    } else {
      return /* NZERO */4;
    }
  };
  var is_real = function (n) {
    return n[/* den */1] !== funarg[/* zero */1];
  };
  var num = function (x) {
    return x[/* num */0];
  };
  var den = function (x) {
    return x[/* den */1];
  };
  var sign = function (x) {
    return Curry._1(funarg[/* sign */45], x[/* num */0]);
  };
  var equal = function (x, y) {
    if (Curry._2(funarg[/* equal */40], x[/* num */0], y[/* num */0])) {
      return Curry._2(funarg[/* equal */40], x[/* den */1], y[/* den */1]);
    } else {
      return false;
    }
  };
  var compare = function (x, y) {
    var match = classify(x);
    var match$1 = classify(y);
    var exit = 0;
    var exit$1 = 0;
    var exit$2 = 0;
    var exit$3 = 0;
    switch (match) {
      case 1 : 
          var switcher = match$1 - 1 | 0;
          if (switcher > 2 || switcher < 0) {
            exit$2 = 3;
          } else {
            switch (switcher) {
              case 0 : 
                  return 0;
              case 1 : 
                  exit$2 = 3;
                  break;
              case 2 : 
                  exit$3 = 4;
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
                    exit$3 = 4;
                    break;
                case 2 : 
                    exit$2 = 3;
                    break;
                
              }
            } else {
              exit$2 = 3;
            }
          } else {
            exit$3 = 4;
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
          exit$3 = 4;
          break;
      
    }
    if (exit$3 === 4) {
      var switcher$1 = match$1 - 1 | 0;
      if (switcher$1 > 2 || switcher$1 < 0) {
        exit$2 = 3;
      } else {
        switch (switcher$1) {
          case 0 : 
              return -1;
          case 1 : 
              exit$2 = 3;
              break;
          case 2 : 
              return 1;
          
        }
      }
    }
    if (exit$2 === 3) {
      if (match >= 4) {
        exit$1 = 2;
      } else {
        switch (match) {
          case 0 : 
              exit$1 = 2;
              break;
          case 1 : 
              return 1;
          case 2 : 
              return -1;
          
        }
      }
    }
    if (exit$1 === 2) {
      if (match$1 !== 2) {
        exit = 1;
      } else {
        return 1;
      }
    }
    if (exit === 1) {
      if (x[/* den */1] === y[/* den */1]) {
        return Curry._2(funarg[/* compare */39], x[/* num */0], y[/* num */0]);
      } else {
        return Curry._2(funarg[/* compare */39], Curry._2(funarg[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(funarg[/* mul */17], y[/* num */0], x[/* den */1]));
      }
    }
    
  };
  var min = function (a, b) {
    if (compare(a, b) <= 0) {
      return a;
    } else {
      return b;
    }
  };
  var max = function (a, b) {
    if (compare(a, b) >= 0) {
      return a;
    } else {
      return b;
    }
  };
  var leq = function (a, b) {
    return compare(a, b) <= 0;
  };
  var geq = function (a, b) {
    return compare(a, b) >= 0;
  };
  var lt = function (a, b) {
    return compare(a, b) < 0;
  };
  var gt = function (a, b) {
    return compare(a, b) > 0;
  };
  var to_string = function (n) {
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
          if (Curry._2(funarg[/* equal */40], n[/* den */1], funarg[/* one */2])) {
            return Curry._1(funarg[/* to_string */38], n[/* num */0]);
          } else {
            return Curry._1(funarg[/* to_string */38], n[/* num */0]) + ("/" + Curry._1(funarg[/* to_string */38], n[/* den */1]));
          }
      
    }
  };
  var to_bigint = function (x) {
    return Curry._2(funarg[/* div */18], x[/* num */0], x[/* den */1]);
  };
  var to_int = function (x) {
    return Curry._1(funarg[/* to_int */32], to_bigint(x));
  };
  var to_int32 = function (x) {
    return Curry._1(funarg[/* to_int32 */33], to_bigint(x));
  };
  var to_int64 = function (x) {
    return Curry._1(funarg[/* to_int64 */34], to_bigint(x));
  };
  var to_nativeint = function (x) {
    return Curry._1(funarg[/* to_nativeint */35], to_bigint(x));
  };
  var to_float = function (x) {
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
          var np = Curry._1(funarg[/* numbits */31], p);
          var nq = Curry._1(funarg[/* numbits */31], q);
          if (np <= 53 && nq <= 53) {
            return Caml_int64.to_float(Curry._1(funarg[/* to_int64 */34], p)) / Caml_int64.to_float(Curry._1(funarg[/* to_int64 */34], q));
          } else {
            var n = 55 - (np - nq | 0) | 0;
            var match$1 = n >= 0 ? /* tuple */[
                Curry._2(funarg[/* shift_left */29], p, n),
                q
              ] : /* tuple */[
                p,
                Curry._2(funarg[/* shift_left */29], q, -n | 0)
              ];
            var match$2 = Curry._2(funarg[/* ediv_rem */21], match$1[0], match$1[1]);
            var f = Curry._2(funarg[/* round_to_float */37], match$2[0], Curry._1(funarg[/* sign */45], match$2[1]) === 0);
            return Caml_float.caml_ldexp_float(f, -n | 0);
          }
      
    }
  };
  var neg = function (x) {
    return /* record */[
            /* num */Curry._1(funarg[/* neg */14], x[/* num */0]),
            /* den */x[/* den */1]
          ];
  };
  var abs = function (x) {
    return /* record */[
            /* num */Curry._1(funarg[/* abs */13], x[/* num */0]),
            /* den */x[/* den */1]
          ];
  };
  var aors = function (zaors, x, y) {
    if (x[/* den */1] === y[/* den */1]) {
      return make_real(Curry._2(zaors, x[/* num */0], y[/* num */0]), x[/* den */1]);
    } else {
      return make_real(Curry._2(zaors, Curry._2(funarg[/* mul */17], x[/* num */0], y[/* den */1]), Curry._2(funarg[/* mul */17], y[/* num */0], x[/* den */1])), Curry._2(funarg[/* mul */17], x[/* den */1], y[/* den */1]));
    }
  };
  var add = function (x, y) {
    if (x[/* den */1] === funarg[/* zero */1] || y[/* den */1] === funarg[/* zero */1]) {
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
      return aors(funarg[/* add */15], x, y);
    }
  };
  var sub = function (x, y) {
    if (x[/* den */1] === funarg[/* zero */1] || y[/* den */1] === funarg[/* zero */1]) {
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
      return aors(funarg[/* sub */16], x, y);
    }
  };
  var mul = function (x, y) {
    if (x[/* den */1] === funarg[/* zero */1] || y[/* den */1] === funarg[/* zero */1]) {
      return /* record */[
              /* num */Curry._1(funarg[/* of_int */4], Caml_int32.imul(Curry._1(funarg[/* sign */45], x[/* num */0]), Curry._1(funarg[/* sign */45], y[/* num */0]))),
              /* den */funarg[/* zero */1]
            ];
    } else {
      return make_real(Curry._2(funarg[/* mul */17], x[/* num */0], y[/* num */0]), Curry._2(funarg[/* mul */17], x[/* den */1], y[/* den */1]));
    }
  };
  var inv = function (x) {
    var match = Curry._1(funarg[/* sign */45], x[/* num */0]);
    var exit = 0;
    var switcher = match + 1 | 0;
    if (switcher > 2 || switcher < 0) {
      exit = 1;
    } else {
      switch (switcher) {
        case 0 : 
            return /* record */[
                    /* num */Curry._1(funarg[/* neg */14], x[/* den */1]),
                    /* den */Curry._1(funarg[/* neg */14], x[/* num */0])
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
      if (x[/* den */1] === funarg[/* zero */1]) {
        return undef;
      } else {
        return inf;
      }
    }
    
  };
  var div = function (x, y) {
    if (Curry._1(funarg[/* sign */45], y[/* num */0]) >= 0) {
      return mul(x, /* record */[
                  /* num */y[/* den */1],
                  /* den */y[/* num */0]
                ]);
    } else {
      return mul(x, /* record */[
                  /* num */Curry._1(funarg[/* neg */14], y[/* den */1]),
                  /* den */Curry._1(funarg[/* neg */14], y[/* num */0])
                ]);
    }
  };
  var mul_2exp = function (x, n) {
    if (x[/* den */1] === funarg[/* zero */1]) {
      return x;
    } else {
      return make_real(Curry._2(funarg[/* shift_left */29], x[/* num */0], n), x[/* den */1]);
    }
  };
  var div_2exp = function (x, n) {
    if (x[/* den */1] === funarg[/* zero */1]) {
      return x;
    } else {
      return make_real(x[/* num */0], Curry._2(funarg[/* shift_left */29], x[/* den */1], n));
    }
  };
  var print = function (x) {
    return Pervasives.print_string(to_string(x));
  };
  var output = function (chan, x) {
    return Pervasives.output_string(chan, to_string(x));
  };
  var sprint = function (_, x) {
    return to_string(x);
  };
  var bprint = function (b, x) {
    return $$Buffer.add_string(b, to_string(x));
  };
  var pp_print = function (f, x) {
    return Format.pp_print_string(f, to_string(x));
  };
  var $tilde$plus = function (x) {
    return x;
  };
  var $less$great = function (a, b) {
    return !equal(a, b);
  };
  return [
          make,
          zero,
          one,
          minus_one,
          inf,
          minus_inf,
          undef,
          of_bigint,
          of_int,
          of_int32,
          of_int64,
          of_nativeint,
          of_ints,
          of_float,
          of_string,
          num,
          den,
          classify,
          is_real,
          sign,
          compare,
          equal,
          min,
          max,
          leq,
          geq,
          lt,
          gt,
          to_bigint,
          to_int,
          to_int32,
          to_int64,
          to_nativeint,
          to_string,
          to_float,
          neg,
          abs,
          add,
          sub,
          mul,
          inv,
          div,
          mul_2exp,
          div_2exp,
          print,
          output,
          sprint,
          bprint,
          pp_print,
          neg,
          $tilde$plus,
          add,
          sub,
          mul,
          div,
          mul_2exp,
          div_2exp,
          of_int,
          of_ints,
          of_bigint,
          make,
          equal,
          lt,
          gt,
          leq,
          geq,
          $less$great
        ];
}

exports.Rational = Rational;
exports.RationalInt = RationalInt;
exports.RationalInt32 = RationalInt32;
exports.RationalInt64 = RationalInt64;
exports.RationalNativeint = RationalNativeint;
exports.RationalBigint = RationalBigint;
/* Format Not a pure module */
