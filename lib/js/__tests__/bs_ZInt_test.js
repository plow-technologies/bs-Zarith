'use strict';

var Z = require("../src/Z.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");

describe("Zint", (function () {
        Jest.test("rem", (function () {
                return Jest.Expect[/* toEqual */12](Z.ZInt[/* of_int */4](1), Jest.Expect[/* expect */0](Z.ZInt[/* rem */19](Z.ZInt[/* of_int */4](7), Z.ZInt[/* of_int */4](3))));
              }));
        Jest.test("rem", (function () {
                return Jest.Expect[/* toEqual */12](Z.ZInt[/* of_int */4](1), Jest.Expect[/* expect */0](Z.ZInt[/* rem */19](Z.ZInt[/* of_int */4](7), Z.ZInt[/* of_int */4](-3))));
              }));
        Jest.test("rem", (function () {
                return Jest.Expect[/* toEqual */12](Z.ZInt[/* of_int */4](-1), Jest.Expect[/* expect */0](Z.ZInt[/* rem */19](Z.ZInt[/* of_int */4](-7), Z.ZInt[/* of_int */4](3))));
              }));
        return Jest.test("rem", (function () {
                      return Jest.Expect[/* toEqual */12](Z.ZInt[/* of_int */4](-1), Jest.Expect[/* expect */0](Z.ZInt[/* rem */19](Z.ZInt[/* of_int */4](-7), Z.ZInt[/* of_int */4](-3))));
                    }));
      }));

/*  Not a pure module */
