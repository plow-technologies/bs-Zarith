'use strict';

var Z = require("../src/Z.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Q_Internal = require("../src/Q_Internal.js");

describe("QBigint", (function () {
        Jest.test("1/2 - 1/4 is 1/2", (function () {
                return Jest.Expect[/* toEqual */12](Curry._2(Q_Internal.QBigint[/* M */0][/* make */2], Curry._1(Z.Bigint[/* of_int */4], 1), Curry._1(Z.Bigint[/* of_int */4], 4)), Jest.Expect[/* expect */0](Curry._2(Q_Internal.QBigint[/* M */0][/* sub */41], Curry._2(Q_Internal.QBigint[/* M */0][/* make */2], Z.Bigint[/* one */2], Curry._1(Z.Bigint[/* of_int */4], 2)), Curry._2(Q_Internal.QBigint[/* M */0][/* make */2], Curry._1(Z.Bigint[/* of_int */4], 1), Curry._1(Z.Bigint[/* of_int */4], 4)))));
              }));
        return Jest.test("1/8 + (-1/8) is 0", (function () {
                      return Jest.Expect[/* toEqual */12](Q_Internal.QBigint[/* M */0][/* zero */9], Jest.Expect[/* expect */0](Curry._2(Q_Internal.QBigint[/* M */0][/* add */40], Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "1/8"), Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "-1/8"))));
                    }));
      }));

Jest.test("1/8 + 14/16 is 1", (function () {
        return Jest.Expect[/* toEqual */12](Q_Internal.QBigint[/* M */0][/* one */10], Jest.Expect[/* expect */0](Curry._2(Q_Internal.QBigint[/* M */0][/* add */40], Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "1/8"), Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "14/16"))));
      }));

Jest.test("3 * 1/2 is 3/2", (function () {
        return Jest.Expect[/* toEqual */12](Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "3/2"), Jest.Expect[/* expect */0](Curry._2(Q_Internal.QBigint[/* M */0][/* mul */42], Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "3/1"), Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "1/2"))));
      }));

Jest.test("2/3 / 3/4 is 8/9", (function () {
        return Jest.Expect[/* toEqual */12](Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "8/9"), Jest.Expect[/* expect */0](Curry._2(Q_Internal.QBigint[/* M */0][/* div */44], Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "2/3"), Curry._1(Q_Internal.QBigint[/* M */0][/* of_string */16], "3/4"))));
      }));

Jest.test("zero equal to (Bigint.of_int 0)", (function () {
        return Jest.Expect[/* toEqual */12](Q_Internal.QBigint[/* M */0][/* zero */9], Jest.Expect[/* expect */0](Q_Internal.QBigint[/* M */0][/* zero */9]));
      }));

/*  Not a pure module */
