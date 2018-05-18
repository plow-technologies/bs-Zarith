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

/*  Not a pure module */
