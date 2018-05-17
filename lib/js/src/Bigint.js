'use strict';

var List = require("bs-platform/lib/js/list.js");
var Int32 = require("bs-platform/lib/js/int32.js");
var Int64 = require("bs-platform/lib/js/int64.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Nativeint = require("bs-platform/lib/js/nativeint.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");

var zero = /* Bigint */[
  /* Pos */0,
  /* [] */0
];

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
    return List.map(digit, List.rev(charlist_of_string(substr)));
  };
  if (len === 0) {
    return zero;
  } else if (Caml_string.get(str, 0) === /* "-" */45) {
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

function compare(param, param$1) {
  return cmp(param[1], param$1[1]);
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

function divrem$prime(list1, list2$prime, powerof2) {
  if (cmp(list2$prime, list1) === 1) {
    return /* tuple */[
            /* :: */[
              0,
              /* [] */0
            ],
            list1
          ];
  } else {
    var match = divrem$prime(list1, add$prime(list2$prime, list2$prime, 0), add$prime(powerof2, powerof2, 0));
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

function even(number) {
  var match = divrem$prime(number, /* :: */[
        2,
        /* [] */0
      ], /* :: */[
        1,
        /* [] */0
      ]);
  return Caml_obj.caml_equal(match[1], /* :: */[
              0,
              /* [] */0
            ]);
}

function pow$prime(_list1, _list2, _result) {
  while(true) {
    var result = _result;
    var list2 = _list2;
    var list1 = _list1;
    var exit = 0;
    if (list2 && !(list2[0] !== 0 || list2[1])) {
      return result;
    } else {
      exit = 1;
    }
    if (exit === 1) {
      if (even(list2)) {
        _list2 = divrem$prime(list2, /* :: */[
                2,
                /* [] */0
              ], /* :: */[
                1,
                /* [] */0
              ])[0];
        _list1 = mul$prime(list1, list1, /* :: */[
                1,
                /* [] */0
              ])[1];
        continue ;
      } else {
        _result = mul$prime(list1, result, /* :: */[
                1,
                /* [] */0
              ])[1];
        _list2 = sub$prime(list2, /* :: */[
              1,
              /* [] */0
            ], 0);
        continue ;
      }
    }
    
  };
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

function divrem(list1, list2$prime) {
  return divrem$prime(list1, list2$prime, /* :: */[
              1,
              /* [] */0
            ]);
}

function div_rem(param, param$1) {
  var match = divrem(param[1], param$1[1]);
  return /* tuple */[
          /* Bigint */[
            /* Pos */0,
            match[0]
          ],
          /* Bigint */[
            /* Pos */0,
            match[1]
          ]
        ];
}

function div(param, param$1) {
  var match = divrem(param[1], param$1[1]);
  var quotient = match[0];
  if (param[0] === param$1[0]) {
    return /* Bigint */[
            /* Pos */0,
            quotient
          ];
  } else {
    return /* Bigint */[
            /* Neg */1,
            quotient
          ];
  }
}

function rem(param, param$1) {
  var match = divrem(param[1], param$1[1]);
  return /* Bigint */[
          /* Pos */0,
          match[1]
        ];
}

function pow(param, param$1) {
  var value2 = param$1[1];
  var value1 = param[1];
  var neg1 = param[0];
  if (param$1[0] === /* Pos */0) {
    if (neg1 === /* Neg */1) {
      if (even(value2)) {
        return /* Bigint */[
                /* Pos */0,
                pow$prime(value1, value2, /* :: */[
                      1,
                      /* [] */0
                    ])
              ];
      } else {
        return /* Bigint */[
                /* Neg */1,
                pow$prime(value1, value2, /* :: */[
                      1,
                      /* [] */0
                    ])
              ];
      }
    } else {
      return /* Bigint */[
              /* Pos */0,
              pow$prime(value1, value2, /* :: */[
                    1,
                    /* [] */0
                  ])
            ];
    }
  } else if (neg1 === /* Neg */1) {
    if (even(value2)) {
      return /* Bigint */[
              /* Pos */0,
              pow$prime(divrem$prime(/* :: */[
                          1,
                          /* [] */0
                        ], value1, /* :: */[
                          1,
                          /* [] */0
                        ])[0], value2, /* :: */[
                    1,
                    /* [] */0
                  ])
            ];
    } else {
      return /* Bigint */[
              /* Neg */1,
              pow$prime(divrem$prime(/* :: */[
                          1,
                          /* [] */0
                        ], value1, /* :: */[
                          1,
                          /* [] */0
                        ])[0], value2, /* :: */[
                    1,
                    /* [] */0
                  ])
            ];
    }
  } else {
    return /* Bigint */[
            /* Pos */0,
            pow$prime(divrem$prime(/* :: */[
                        1,
                        /* [] */0
                      ], value1, /* :: */[
                        1,
                        /* [] */0
                      ])[0], value2, /* :: */[
                  1,
                  /* [] */0
                ])
          ];
  }
}

function abs(param) {
  return /* Bigint */[
          /* Pos */0,
          param[1]
        ];
}

function numbits(param) {
  return List.length(param[1]);
}

function shift_left(x, n) {
  return mul(x, pow(of_string(String(2)), of_string(String(n))));
}

function shift_right(x, n) {
  return div(x, pow(of_string(String(2)), of_string(String(n))));
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

function sign(n) {
  if (n === zero) {
    return 0;
  } else if (cmp(n[1], /* [] */0) < 0) {
    return -1;
  } else {
    return 1;
  }
}

var Bigint_000 = /* Bigint */[
  /* Pos */0,
  /* :: */[
    0,
    /* [] */0
  ]
];

var Bigint_001 = /* Bigint */[
  /* Pos */0,
  /* :: */[
    1,
    /* [] */0
  ]
];

var Bigint_002 = /* Bigint */[
  /* Neg */1,
  /* :: */[
    1,
    /* [] */0
  ]
];

var Bigint = [
  Bigint_000,
  Bigint_001,
  Bigint_002,
  shift_left,
  shift_right,
  neg,
  sign,
  of_int,
  of_int32,
  of_int64,
  of_nativeint,
  of_string,
  to_string,
  add,
  sub,
  div,
  mul,
  compare,
  abs,
  numbits,
  rem,
  div_rem
];

exports.Bigint = Bigint;
/* No side effect */
