'use strict';

var Q = require("../src/Q.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");

describe("QBigint", (function () {
        return Jest.test("zero equal to (Bigint.of_int 0)", (function () {
                      return Jest.Expect[/* toEqual */12](Q.RationalBigint[/* zero */9], Jest.Expect[/* expect */0](Q.RationalBigint[/* zero */9]));
                    }));
      }));

/*  Not a pure module */
