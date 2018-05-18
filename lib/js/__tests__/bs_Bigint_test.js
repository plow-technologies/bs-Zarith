'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Bigint = require("../src/Bigint.js");

describe("Bigint", (function () {
        Jest.test("zero", (function () {
                return Jest.Expect[/* toEqual */12](Bigint.of_int(0), Jest.Expect[/* expect */0](Bigint.zero$prime));
              }));
        Jest.test("one", (function () {
                return Jest.Expect[/* toEqual */12](Bigint.of_int(1), Jest.Expect[/* expect */0](Bigint.one));
              }));
        Jest.test("minus_one", (function () {
                return Jest.Expect[/* toEqual */12](Bigint.of_int(-1), Jest.Expect[/* expect */0](Bigint.minus_one));
              }));
        Jest.test("simple addition", (function () {
                var x = Bigint.of_int(1);
                var y = Bigint.of_int(2);
                var z = Bigint.add(x, y);
                return Jest.Expect[/* toEqual */12](Bigint.of_int(3), Jest.Expect[/* expect */0](z));
              }));
        Jest.test("addition with negative numbers from string", (function () {
                var x = Bigint.of_string("-1");
                var y = Bigint.of_string("-2");
                var z = Bigint.add(x, y);
                return Jest.Expect[/* toEqual */12](Bigint.of_string("-3"), Jest.Expect[/* expect */0](z));
              }));
        Jest.test("addition with negative numbers from int", (function () {
                var x = Bigint.of_int(-1);
                var y = Bigint.of_int(-2);
                var z = Bigint.add(x, y);
                return Jest.Expect[/* toEqual */12](Bigint.of_int(-3), Jest.Expect[/* expect */0](z));
              }));
        Jest.test("addition with numbers larger than int64 can hold", (function () {
                var x = Bigint.of_string("1000000000000000000000000000000");
                var y = Bigint.of_string("1000000000000000000000000000000");
                var z = Bigint.add(x, y);
                return Jest.Expect[/* toEqual */12](Bigint.of_string("2000000000000000000000000000000"), Jest.Expect[/* expect */0](z));
              }));
        Jest.test("zero to string", (function () {
                return Jest.Expect[/* toEqual */12]("0", Jest.Expect[/* expect */0](Bigint.to_string(Bigint.zero$prime)));
              }));
        Jest.test("one to string", (function () {
                return Jest.Expect[/* toEqual */12]("1", Jest.Expect[/* expect */0](Bigint.to_string(Bigint.one)));
              }));
        Jest.test("minus_one to string", (function () {
                return Jest.Expect[/* toEqual */12]("-1", Jest.Expect[/* expect */0](Bigint.to_string(Bigint.minus_one)));
              }));
        return Jest.test("big to string", (function () {
                      return Jest.Expect[/* toEqual */12]("32389176649991293809043094891992939836566132213", Jest.Expect[/* expect */0](Bigint.to_string(Bigint.of_string("32389176649991293809043094891992939836566132213"))));
                    }));
      }));

Jest.test("pow", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(1), Jest.Expect[/* expect */0](Bigint.pow(Bigint.of_int(2), 0)));
      }));

Jest.test("pow", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(2), Jest.Expect[/* expect */0](Bigint.pow(Bigint.of_int(2), 1)));
      }));

Jest.test("pow", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(4), Jest.Expect[/* expect */0](Bigint.pow(Bigint.of_int(2), 2)));
      }));

Jest.test("pow", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(256), Jest.Expect[/* expect */0](Bigint.pow(Bigint.of_int(4), 4)));
      }));

Jest.test("div", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(2), Jest.Expect[/* expect */0](Bigint.div(Bigint.of_int(6), Bigint.of_int(3))));
      }));

Jest.test("div", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(-2), Jest.Expect[/* expect */0](Bigint.div(Bigint.of_int(-6), Bigint.of_int(3))));
      }));

Jest.test("div", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(-2), Jest.Expect[/* expect */0](Bigint.div(Bigint.of_int(6), Bigint.of_int(-3))));
      }));

Jest.test("div", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(2), Jest.Expect[/* expect */0](Bigint.div(Bigint.of_int(-6), Bigint.of_int(-3))));
      }));

Jest.test("div", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(2), Jest.Expect[/* expect */0](Bigint.div(Bigint.of_int(7), Bigint.of_int(3))));
      }));

Jest.test("rem", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(1), Jest.Expect[/* expect */0](Bigint.rem(Bigint.of_int(7), Bigint.of_int(3))));
      }));

Jest.test("rem", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(1), Jest.Expect[/* expect */0](Bigint.rem(Bigint.of_int(7), Bigint.of_int(-3))));
      }));

Jest.test("rem", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(-1), Jest.Expect[/* expect */0](Bigint.rem(Bigint.of_int(-7), Bigint.of_int(3))));
      }));

Jest.test("rem", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(-1), Jest.Expect[/* expect */0](Bigint.rem(Bigint.of_int(-7), Bigint.of_int(-3))));
      }));

Jest.test("rem proof", (function () {
        var a = Bigint.of_int(-7);
        var b = Bigint.of_int(-3);
        var c = Bigint.$plus(Bigint.$star(b, Bigint.div(a, b)), Bigint.rem(a, b));
        return Jest.Expect[/* toEqual */12](c, Jest.Expect[/* expect */0](a));
      }));

Jest.test("rem proof", (function () {
        var a = Bigint.of_int(21);
        var b = Bigint.of_int(4);
        var c = Bigint.$plus(Bigint.$star(b, Bigint.div(a, b)), Bigint.rem(a, b));
        return Jest.Expect[/* toEqual */12](c, Jest.Expect[/* expect */0](a));
      }));

Jest.test("rem proof", (function () {
        var a = Bigint.of_int(-21);
        var b = Bigint.of_int(4);
        var c = Bigint.$plus(Bigint.$star(b, Bigint.div(a, b)), Bigint.rem(a, b));
        return Jest.Expect[/* toEqual */12](c, Jest.Expect[/* expect */0](a));
      }));

Jest.test("div_rem", (function () {
        return Jest.Expect[/* toEqual */12](/* tuple */[
                    Bigint.of_int(2),
                    Bigint.of_int(1)
                  ], Jest.Expect[/* expect */0](Bigint.div_rem(Bigint.of_int(7), Bigint.of_int(3))));
      }));

Jest.test("div_rem", (function () {
        return Jest.Expect[/* toEqual */12](/* tuple */[
                    Bigint.of_int(-2),
                    Bigint.of_int(1)
                  ], Jest.Expect[/* expect */0](Bigint.div_rem(Bigint.of_int(7), Bigint.of_int(-3))));
      }));

Jest.test("div_rem", (function () {
        return Jest.Expect[/* toEqual */12](/* tuple */[
                    Bigint.of_int(-2),
                    Bigint.of_int(-1)
                  ], Jest.Expect[/* expect */0](Bigint.div_rem(Bigint.of_int(-7), Bigint.of_int(3))));
      }));

Jest.test("div_rem", (function () {
        return Jest.Expect[/* toEqual */12](/* tuple */[
                    Bigint.of_int(2),
                    Bigint.of_int(-1)
                  ], Jest.Expect[/* expect */0](Bigint.div_rem(Bigint.of_int(-7), Bigint.of_int(-3))));
      }));

Jest.test("is_even", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.is_even(Bigint.of_int(8))));
      }));

Jest.test("is_even", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.is_even(Bigint.of_int(9))));
      }));

Jest.test("is_even", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.is_even(Bigint.of_string("839816238764918263491726983776763728736482736846"))));
      }));

Jest.test("is_even", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.is_even(Bigint.of_string("98382938792846298734695872639470987109877098703"))));
      }));

Jest.test("is_odd", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.is_odd(Bigint.of_string("839816238764918263491726983776763728736482736846"))));
      }));

Jest.test("is_odd", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.is_odd(Bigint.of_string("98382938792846298734695872639470987109877098703"))));
      }));

Jest.test("sign", (function () {
        return Jest.Expect[/* toEqual */12](1, Jest.Expect[/* expect */0](Bigint.sign(Bigint.of_string("98382938792846298734695872639470987109877098703"))));
      }));

Jest.test("sign", (function () {
        return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Bigint.sign(Bigint.of_string("0"))));
      }));

Jest.test("sign", (function () {
        return Jest.Expect[/* toEqual */12](-1, Jest.Expect[/* expect */0](Bigint.sign(Bigint.of_string("-2839849727247283728372837287378723"))));
      }));

Jest.test("2 = 3", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.of_int(2), Bigint.of_int(3))));
      }));

Jest.test("2 = 2", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.of_int(2), Bigint.of_int(2))));
      }));

Jest.test("0 = 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.of_int(0), Bigint.of_int(0))));
      }));

Jest.test("0 = 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.of_int(0), Bigint.of_int(0))));
      }));

Jest.test("0 = 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.zero$prime, Bigint.of_int(0))));
      }));

Jest.test("0 = 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.zero$prime, Bigint.of_string("0"))));
      }));

Jest.test("0 = 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.of_int(0), Bigint.of_string("0"))));
      }));

Jest.test("-1 = -1", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.of_int(-1), Bigint.of_int(-1))));
      }));

Jest.test("-1 = 1", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$eq(Bigint.of_int(-1), Bigint.of_int(1))));
      }));

Jest.test("2 <= 3", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less$eq(Bigint.of_int(2), Bigint.of_int(3))));
      }));

Jest.test("2 <= 3", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less$eq(Bigint.of_int(2), Bigint.of_int(3))));
      }));

Jest.test("3 <= 3", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less$eq(Bigint.of_int(3), Bigint.of_int(3))));
      }));

Jest.test("0 <= 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less$eq(Bigint.of_int(0), Bigint.of_int(0))));
      }));

Jest.test("-1 <= 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less$eq(Bigint.of_int(-1), Bigint.of_int(0))));
      }));

Jest.test("-3 <= -2", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less$eq(Bigint.of_int(-3), Bigint.of_int(-2))));
      }));

Jest.test("1 <= 0", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$less$eq(Bigint.of_int(1), Bigint.of_int(0))));
      }));

Jest.test("2 < 3", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less(Bigint.of_int(2), Bigint.of_int(3))));
      }));

Jest.test("3 < 3", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$less(Bigint.of_int(3), Bigint.of_int(3))));
      }));

Jest.test("-1 < 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less(Bigint.of_int(-1), Bigint.of_int(0))));
      }));

Jest.test("-3 < -2", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less(Bigint.of_int(-3), Bigint.of_int(-2))));
      }));

Jest.test("1 < 0", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$less(Bigint.of_int(1), Bigint.of_int(0))));
      }));

Jest.test("2 >= 3", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$great$eq(Bigint.of_int(2), Bigint.of_int(3))));
      }));

Jest.test("3 >= 3", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$great$eq(Bigint.of_int(3), Bigint.of_int(3))));
      }));

Jest.test("-1 >= 0", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$great$eq(Bigint.of_int(-1), Bigint.of_int(0))));
      }));

Jest.test("-3 >= -2", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$great$eq(Bigint.of_int(-3), Bigint.of_int(-2))));
      }));

Jest.test("1 >= 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$great$eq(Bigint.of_int(1), Bigint.of_int(0))));
      }));

Jest.test("3 >= 2", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$great$eq(Bigint.of_int(3), Bigint.of_int(2))));
      }));

Jest.test("3 >= -2", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$great$eq(Bigint.of_int(3), Bigint.of_int(-2))));
      }));

Jest.test("2 > 3", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$great(Bigint.of_int(2), Bigint.of_int(3))));
      }));

Jest.test("3 > 3", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$great(Bigint.of_int(3), Bigint.of_int(3))));
      }));

Jest.test("-1 > 0", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$great(Bigint.of_int(-1), Bigint.of_int(0))));
      }));

Jest.test("-3 > -2", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$great(Bigint.of_int(-3), Bigint.of_int(-2))));
      }));

Jest.test("1 > 0", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$great(Bigint.of_int(1), Bigint.of_int(0))));
      }));

Jest.test("3 > 2", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$great(Bigint.of_int(3), Bigint.of_int(2))));
      }));

Jest.test("3 > -2", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$great(Bigint.of_int(3), Bigint.of_int(-2))));
      }));

Jest.test("3 <> 2", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less$great(Bigint.of_int(3), Bigint.of_int(2))));
      }));

Jest.test("2 <> 2", (function () {
        return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Bigint.$less$great(Bigint.of_int(2), Bigint.of_int(2))));
      }));

Jest.test("0 <> 1", (function () {
        return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Bigint.$less$great(Bigint.of_int(0), Bigint.of_int(1))));
      }));

Jest.test("pow", (function () {
        return Jest.Expect[/* toEqual */12](Bigint.of_int(4), Jest.Expect[/* expect */0](Bigint.pow(Bigint.of_int(2), 2)));
      }));

/*  Not a pure module */
