'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Bigint = require("../src/Bigint.js");

describe("Bigint", (function () {
        return Jest.test("addition", (function () {
                      var x = Bigint.Bigint[/* of_int */0](1);
                      var y = Bigint.Bigint[/* of_int */0](2);
                      var z = Bigint.Bigint[/* add */2](x, y);
                      Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_int */0](3), Jest.Expect[/* expect */0](z));
                      var x$prime = Bigint.Bigint[/* of_string */1]("-1");
                      var y$prime = Bigint.Bigint[/* of_string */1]("-2");
                      var z$prime = Bigint.Bigint[/* add */2](x$prime, y$prime);
                      Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_string */1]("-3"), Jest.Expect[/* expect */0](z$prime));
                      var x$prime$prime = Bigint.Bigint[/* of_int */0](-1);
                      var y$prime$prime = Bigint.Bigint[/* of_int */0](-2);
                      Bigint.Bigint[/* add */2](x$prime$prime, y$prime$prime);
                      return Jest.Expect[/* toEqual */12](Bigint.Bigint[/* of_int */0](-3), Jest.Expect[/* expect */0](z$prime));
                    }));
      }));

/*  Not a pure module */
