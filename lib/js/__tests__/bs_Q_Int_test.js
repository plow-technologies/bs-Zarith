'use strict';

var Z = require("../src/Z.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Q_Internal = require("../src/Q_Internal.js");

describe("Q.Int", (function () {
        return Jest.test("1/2 - 1/4 is 1/2", (function () {
                      return Jest.Expect[/* toEqual */12](Curry._2(Q_Internal.QInt[/* M */0][/* make */2], Z.Int[/* of_int */4](1), Z.Int[/* of_int */4](4)), Jest.Expect[/* expect */0](Curry._2(Q_Internal.QInt[/* M */0][/* sub */41], Curry._2(Q_Internal.QInt[/* M */0][/* make */2], Z.Int[/* one */2], Z.Int[/* of_int */4](2)), Curry._2(Q_Internal.QInt[/* M */0][/* make */2], Z.Int[/* of_int */4](1), Z.Int[/* of_int */4](4)))));
                    }));
      }));

/*  Not a pure module */
