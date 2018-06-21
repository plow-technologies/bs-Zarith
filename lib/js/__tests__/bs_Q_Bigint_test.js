'use strict';

var Z = require("../src/Z.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Q_Internal = require("../src/Q_Internal.js");

describe("QBigint", (function () {
        Jest.test("zero equal to (Bigint.of_int 0)", (function () {
                return Jest.Expect[/* toEqual */12](Curry._2(Q_Internal.QBigint[/* M */0][/* make */2], Curry._1(Z.Bigint[/* of_int */4], 1), Curry._1(Z.Bigint[/* of_int */4], 4)), Jest.Expect[/* expect */0](Curry._2(Q_Internal.QBigint[/* M */0][/* sub */41], Curry._2(Q_Internal.QBigint[/* M */0][/* make */2], Z.Bigint[/* one */2], Curry._1(Z.Bigint[/* of_int */4], 2)), Curry._2(Q_Internal.QBigint[/* M */0][/* make */2], Curry._1(Z.Bigint[/* of_int */4], 1), Curry._1(Z.Bigint[/* of_int */4], 4)))));
              }));
        return Jest.test("zero equal to (Bigint.of_int 0)", (function () {
                      return Jest.Expect[/* toEqual */12](Q_Internal.QBigint[/* M */0][/* zero */9], Jest.Expect[/* expect */0](Q_Internal.QBigint[/* M */0][/* zero */9]));
                    }));
      }));

/*  Not a pure module */
