'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
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

var Bigint = [
  of_int,
  of_string,
  add,
  sub
];

exports.Bigint = Bigint;
/* No side effect */
