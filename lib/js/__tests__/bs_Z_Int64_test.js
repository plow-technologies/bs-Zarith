'use strict';

var Z = require("../src/Z.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");

describe("Z.Int64", (function () {
        return Jest.test("add", (function () {
                      var x = Z.Int64[/* of_string */10]("230000232323322323");
                      var y = Z.Int64[/* of_int */4](3);
                      var z = Z.Int64[/* - */59](x, y);
                      return Jest.Expect[/* toEqual */12](Z.Int64[/* of_string */10]("230000232323322320"), Jest.Expect[/* expect */0](z));
                    }));
      }));

/*  Not a pure module */
