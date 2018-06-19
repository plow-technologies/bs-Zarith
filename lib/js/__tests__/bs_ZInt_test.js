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
        Jest.test("rem", (function () {
                return Jest.Expect[/* toEqual */12](Z.ZInt[/* of_int */4](-1), Jest.Expect[/* expect */0](Z.ZInt[/* rem */19](Z.ZInt[/* of_int */4](-7), Z.ZInt[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem 7 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](2),
                            Z.ZInt[/* of_int */4](1)
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](7), Z.ZInt[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem 7 (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](-2),
                            Z.ZInt[/* of_int */4](1)
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](7), Z.ZInt[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem (-7) 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](-3),
                            Z.ZInt[/* of_int */4](2)
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](-7), Z.ZInt[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem (-7) (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](-3),
                            Z.ZInt[/* of_int */4](2)
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](-7), Z.ZInt[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem (-8) 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](-3),
                            Z.ZInt[/* of_int */4](1)
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](-8), Z.ZInt[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem (-8) (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](-3),
                            Z.ZInt[/* of_int */4](1)
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](-8), Z.ZInt[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem 9 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](3),
                            Z.ZInt[/* of_int */4](0)
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](9), Z.ZInt[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem 9 (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](-3),
                            Z.ZInt[/* zero */1]
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](9), Z.ZInt[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem (-9) 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](-3),
                            Z.ZInt[/* of_int */4](0)
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](-9), Z.ZInt[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem (-9) (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.ZInt[/* of_int */4](-3),
                            Z.ZInt[/* zero */1]
                          ], Jest.Expect[/* expect */0](Z.ZInt[/* ediv_rem */21](Z.ZInt[/* of_int */4](-9), Z.ZInt[/* of_int */4](-3))));
              }));
        Jest.test("is_even", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Z.ZInt[/* is_even */46](Z.ZInt[/* of_int */4](8))));
              }));
        Jest.test("is_even", (function () {
                return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Z.ZInt[/* is_even */46](Z.ZInt[/* of_int */4](9))));
              }));
        Jest.test("is_odd", (function () {
                return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Z.ZInt[/* is_odd */47](Z.ZInt[/* of_int */4](8))));
              }));
        Jest.test("is_odd", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Z.ZInt[/* is_odd */47](Z.ZInt[/* of_int */4](9))));
              }));
        Jest.test("gcd 2 12", (function () {
                return Jest.Expect[/* toEqual */12](Z.ZInt[/* of_int */4](2), Jest.Expect[/* expect */0](Z.ZInt[/* gcd */48](Z.ZInt[/* of_int */4](2), Z.ZInt[/* of_int */4](12))));
              }));
        Jest.test("gcd 12 20", (function () {
                return Jest.Expect[/* toEqual */12](Z.ZInt[/* of_int */4](4), Jest.Expect[/* expect */0](Z.ZInt[/* gcd */48](Z.ZInt[/* of_int */4](12), Z.ZInt[/* of_int */4](20))));
              }));
        return Jest.test("gcd 36 60", (function () {
                      return Jest.Expect[/* toEqual */12](Z.ZInt[/* of_int */4](12), Jest.Expect[/* expect */0](Z.ZInt[/* gcd */48](Z.ZInt[/* of_int */4](36), Z.ZInt[/* of_int */4](60))));
                    }));
      }));

/*  Not a pure module */
