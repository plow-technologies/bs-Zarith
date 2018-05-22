'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_float = require("bs-platform/lib/js/caml_float.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function Rational(funarg) {
  var make_real = function (n, d) {
    if (n === funarg[/* zero */0] || d === funarg[/* one */1]) {
      return /* record */[
              /* num */n,
              /* den */funarg[/* one */1]
            ];
    } else {
      var g = Curry._2(funarg[/* gcd */28], n, d);
      if (g === funarg[/* one */1]) {
        return /* record */[
                /* num */n,
                /* den */d
              ];
      } else {
        return /* record */[
                /* num */Curry._2(funarg[/* div */22], n, g),
                /* den */Curry._2(funarg[/* div */22], d, g)
              ];
      }
    }
  };
  var make = function (n, d) {
    var sd = Curry._1(funarg[/* sign */6], d);
    if (sd === 0) {
      return /* record */[
              /* num */Curry._1(funarg[/* of_int */8], Curry._1(funarg[/* sign */6], n)),
              /* den */funarg[/* zero */0]
            ];
    } else if (sd > 0) {
      return make_real(n, d);
    } else {
      return make_real(Curry._1(funarg[/* neg */5], n), Curry._1(funarg[/* neg */5], d));
    }
  };
  var of_bigint = function (n) {
    return /* record */[
            /* num */n,
            /* den */funarg[/* one */1]
          ];
  };
  var of_int = function (n) {
    var n$1 = Curry._1(funarg[/* of_int */8], n);
    return /* record */[
            /* num */n$1,
            /* den */funarg[/* one */1]
          ];
  };
  var of_int32 = function (n) {
    var n$1 = Curry._1(funarg[/* of_int32 */9], n);
    return /* record */[
            /* num */n$1,
            /* den */funarg[/* one */1]
          ];
  };
  var of_int64 = function (n) {
    var n$1 = Curry._1(funarg[/* of_int64 */10], n);
    return /* record */[
            /* num */n$1,
            /* den */funarg[/* one */1]
          ];
  };
  var of_nativeint = function (n) {
    var n$1 = Curry._1(funarg[/* of_nativeint */11], n);
    return /* record */[
            /* num */n$1,
            /* den */funarg[/* one */1]
          ];
  };
  var of_ints = function (n, d) {
    return make(Curry._1(funarg[/* of_int */8], n), Curry._1(funarg[/* of_int */8], d));
  };
  var zero_000 = /* num */funarg[/* zero */0];
  var zero_001 = /* den */funarg[/* one */1];
  var zero = /* record */[
    zero_000,
    zero_001
  ];
  var one_000 = /* num */funarg[/* one */1];
  var one_001 = /* den */funarg[/* one */1];
  var one = /* record */[
    one_000,
    one_001
  ];
  var minus_one_000 = /* num */funarg[/* minus_one */2];
  var minus_one_001 = /* den */funarg[/* one */1];
  var minus_one = /* record */[
    minus_one_000,
    minus_one_001
  ];
  var inf_000 = /* num */funarg[/* one */1];
  var inf_001 = /* den */funarg[/* zero */0];
  var inf = /* record */[
    inf_000,
    inf_001
  ];
  var minus_inf_000 = /* num */funarg[/* minus_one */2];
  var minus_inf_001 = /* den */funarg[/* zero */0];
  var minus_inf = /* record */[
    minus_inf_000,
    minus_inf_001
  ];
  var undef_000 = /* num */funarg[/* zero */0];
  var undef_001 = /* den */funarg[/* zero */0];
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
      var m = Curry._1(funarg[/* of_float */13], Caml_float.caml_ldexp_float(match[0], 53));
      var e = match[1] - 53 | 0;
      if (e >= 0) {
        var n = Curry._2(funarg[/* shift_left */3], m, e);
        return /* record */[
                /* num */n,
                /* den */funarg[/* one */1]
              ];
      } else {
        return make_real(m, Curry._2(funarg[/* shift_left */3], funarg[/* one */1], -e | 0));
      }
    }
  };
  var of_string = function (s) {
    try {
      var i = $$String.index(s, /* "/" */47);
      return make(Curry._3(funarg[/* of_substring */15], s, 0, i), Curry._3(funarg[/* of_substring */15], s, i + 1 | 0, (s.length - i | 0) - 1 | 0));
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
          var n = Curry._1(funarg[/* of_string */14], s);
          return /* record */[
                  /* num */n,
                  /* den */funarg[/* one */1]
                ];
        }
      } else {
        throw exn;
      }
    }
  };
  var classify = function (n) {
    if (n[/* den */1] === funarg[/* zero */0]) {
      var match = Curry._1(funarg[/* sign */6], n[/* num */0]);
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
    } else if (n[/* num */0] === funarg[/* zero */0]) {
      return /* ZERO */0;
    } else {
      return /* NZERO */4;
    }
  };
  var is_real = function (n) {
    return n[/* den */1] !== funarg[/* zero */0];
  };
  var num = function (x) {
    return x[/* num */0];
  };
  var den = function (x) {
    return x[/* den */1];
  };
  var sign = function (x) {
    return Curry._1(funarg[/* sign */6], x[/* num */0]);
  };
  var equal = function (x, y) {
    if (Curry._2(funarg[/* equal */7], x[/* num */0], y[/* num */0])) {
      return Curry._2(funarg[/* equal */7], x[/* den */1], y[/* den */1]);
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
          return Curry._2(funarg[/* compare */26], x[/* num */0], y[/* num */0]);
        } else {
          return Curry._2(funarg[/* compare */26], Curry._2(funarg[/* mul */23], x[/* num */0], y[/* den */1]), Curry._2(funarg[/* mul */23], y[/* num */0], x[/* den */1]));
        }
      } else {
        return 1;
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
          if (Curry._2(funarg[/* equal */7], n[/* den */1], funarg[/* one */1])) {
            return Curry._1(funarg[/* to_string */20], n[/* num */0]);
          } else {
            return Curry._1(funarg[/* to_string */20], n[/* num */0]) + ("/" + Curry._1(funarg[/* to_string */20], n[/* den */1]));
          }
      
    }
  };
  var to_bigint = function (x) {
    return Curry._2(funarg[/* div */22], x[/* num */0], x[/* den */1]);
  };
  var to_int = function (x) {
    return Curry._1(funarg[/* to_int */16], to_bigint(x));
  };
  var to_int32 = function (x) {
    return Curry._1(funarg[/* to_int32 */17], to_bigint(x));
  };
  var to_int64 = function (x) {
    return Curry._1(funarg[/* to_int64 */18], to_bigint(x));
  };
  var to_nativeint = function (x) {
    return Curry._1(funarg[/* to_nativeint */19], to_bigint(x));
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
          var np = Curry._1(funarg[/* numbits */21], p);
          var nq = Curry._1(funarg[/* numbits */21], q);
          if (np <= 53 && nq <= 53) {
            return Caml_int64.to_float(Curry._1(funarg[/* to_int64 */18], p)) / Caml_int64.to_float(Curry._1(funarg[/* to_int64 */18], q));
          } else {
            var n = 55 - (np - nq | 0) | 0;
            var match$1 = n >= 0 ? /* tuple */[
                Curry._2(funarg[/* shift_left */3], p, n),
                q
              ] : /* tuple */[
                p,
                Curry._2(funarg[/* shift_left */3], q, -n | 0)
              ];
            var match$2 = Curry._2(funarg[/* ediv_rem */31], match$1[0], match$1[1]);
            var f = Curry._2(funarg[/* round_to_float */32], match$2[0], Curry._1(funarg[/* sign */6], match$2[1]) === 0);
            return Caml_float.caml_ldexp_float(f, -n | 0);
          }
      
    }
  };
  var neg = function (x) {
    return /* record */[
            /* num */Curry._1(funarg[/* neg */5], x[/* num */0]),
            /* den */x[/* den */1]
          ];
  };
  var abs = function (x) {
    return /* record */[
            /* num */Curry._1(funarg[/* abs */27], x[/* num */0]),
            /* den */x[/* den */1]
          ];
  };
  var aors = function (zaors, x, y) {
    if (x[/* den */1] === y[/* den */1]) {
      return make_real(Curry._2(zaors, x[/* num */0], y[/* num */0]), x[/* den */1]);
    } else {
      return make_real(Curry._2(zaors, Curry._2(funarg[/* mul */23], x[/* num */0], y[/* den */1]), Curry._2(funarg[/* mul */23], y[/* num */0], x[/* den */1])), Curry._2(funarg[/* mul */23], x[/* den */1], y[/* den */1]));
    }
  };
  var add = function (x, y) {
    if (x[/* den */1] === funarg[/* zero */0] || y[/* den */1] === funarg[/* zero */0]) {
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
      return aors(funarg[/* add */24], x, y);
    }
  };
  var sub = function (x, y) {
    if (x[/* den */1] === funarg[/* zero */0] || y[/* den */1] === funarg[/* zero */0]) {
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
      return aors(funarg[/* sub */25], x, y);
    }
  };
  var mul = function (x, y) {
    if (x[/* den */1] === funarg[/* zero */0] || y[/* den */1] === funarg[/* zero */0]) {
      return /* record */[
              /* num */Curry._1(funarg[/* of_int */8], Caml_int32.imul(Curry._1(funarg[/* sign */6], x[/* num */0]), Curry._1(funarg[/* sign */6], y[/* num */0]))),
              /* den */funarg[/* zero */0]
            ];
    } else {
      return make_real(Curry._2(funarg[/* mul */23], x[/* num */0], y[/* num */0]), Curry._2(funarg[/* mul */23], x[/* den */1], y[/* den */1]));
    }
  };
  var inv = function (x) {
    var match = Curry._1(funarg[/* sign */6], x[/* num */0]);
    var exit = 0;
    var switcher = match + 1 | 0;
    if (switcher > 2 || switcher < 0) {
      exit = 1;
    } else {
      switch (switcher) {
        case 0 : 
            return /* record */[
                    /* num */Curry._1(funarg[/* neg */5], x[/* den */1]),
                    /* den */Curry._1(funarg[/* neg */5], x[/* num */0])
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
      if (x[/* den */1] === funarg[/* zero */0]) {
        return undef;
      } else {
        return inf;
      }
    }
    
  };
  var div = function (x, y) {
    if (Curry._1(funarg[/* sign */6], y[/* num */0]) >= 0) {
      return mul(x, /* record */[
                  /* num */y[/* den */1],
                  /* den */y[/* num */0]
                ]);
    } else {
      return mul(x, /* record */[
                  /* num */Curry._1(funarg[/* neg */5], y[/* den */1]),
                  /* den */Curry._1(funarg[/* neg */5], y[/* num */0])
                ]);
    }
  };
  var mul_2exp = function (x, n) {
    if (x[/* den */1] === funarg[/* zero */0]) {
      return x;
    } else {
      return make_real(Curry._2(funarg[/* shift_left */3], x[/* num */0], n), x[/* den */1]);
    }
  };
  var div_2exp = function (x, n) {
    if (x[/* den */1] === funarg[/* zero */0]) {
      return x;
    } else {
      return make_real(x[/* num */0], Curry._2(funarg[/* shift_left */3], x[/* den */1], n));
    }
  };
  var print = function (x) {
    return Pervasives.print_string(to_string(x));
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
/* No side effect */
