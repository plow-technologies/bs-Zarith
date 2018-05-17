'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Bigint = require("../src/Bigint.js");

describe("Bigint", (function () {
        Jest.test("zero", (function () {
                return Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_int */7](0), Jest.Expect[/* expect */0](Bigint.Bigint[/* zero' */0]));
              }));
        Jest.test("one", (function () {
                return Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_int */7](1), Jest.Expect[/* expect */0](Bigint.Bigint[/* one */1]));
              }));
        Jest.test("minus_one", (function () {
                return Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_int */7](-1), Jest.Expect[/* expect */0](Bigint.Bigint[/* minus_one */2]));
              }));
        Jest.test("simple addition", (function () {
                var x = Bigint.Bigint[/* of_int */7](1);
                var y = Bigint.Bigint[/* of_int */7](2);
                var z = Bigint.Bigint[/* add */13](x, y);
                return Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_int */7](3), Jest.Expect[/* expect */0](z));
              }));
        Jest.test("addition with negative numbers from string", (function () {
                var x = Bigint.Bigint[/* of_string */11]("-1");
                var y = Bigint.Bigint[/* of_string */11]("-2");
                var z = Bigint.Bigint[/* add */13](x, y);
                return Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_string */11]("-3"), Jest.Expect[/* expect */0](z));
              }));
        Jest.test("addition with negative numbers from int", (function () {
                var x = Bigint.Bigint[/* of_int */7](-1);
                var y = Bigint.Bigint[/* of_int */7](-2);
                var z = Bigint.Bigint[/* add */13](x, y);
                return Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_int */7](-3), Jest.Expect[/* expect */0](z));
              }));
        Jest.test("addition with numbers larger than int64 can hold", (function () {
                var x = Bigint.Bigint[/* of_string */11]("1000000000000000000000000000000");
                var y = Bigint.Bigint[/* of_string */11]("1000000000000000000000000000000");
                var z = Bigint.Bigint[/* add */13](x, y);
                return Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_string */11]("2000000000000000000000000000000"), Jest.Expect[/* expect */0](z));
              }));
        Jest.test("zero to string", (function () {
                return Jest.Expect[/* toEqual */12]("0", Jest.Expect[/* expect */0](Bigint.Bigint[/* to_string */12](Bigint.Bigint[/* zero' */0])));
              }));
        Jest.test("one to string", (function () {
                return Jest.Expect[/* toEqual */12]("1", Jest.Expect[/* expect */0](Bigint.Bigint[/* to_string */12](Bigint.Bigint[/* one */1])));
              }));
        Jest.test("minus_one to string", (function () {
                return Jest.Expect[/* toEqual */12]("-1", Jest.Expect[/* expect */0](Bigint.Bigint[/* to_string */12](Bigint.Bigint[/* minus_one */2])));
              }));
        return Jest.test("big to string", (function () {
                      return Jest.Expect[/* toEqual */12]("32389176649991293809043094891992939836566132213", Jest.Expect[/* expect */0](Bigint.Bigint[/* to_string */12](Bigint.Bigint[/* of_string */11]("32389176649991293809043094891992939836566132213"))));
                    }));
      }));

/*  Not a pure module */
