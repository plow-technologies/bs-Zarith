'use strict';

var Z = require("../src/Z.js");
var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");

describe("Zint", (function () {
        Jest.test("rem", (function () {
                return Jest.Expect[/* toEqual */12](Z.Int[/* of_int */4](1), Jest.Expect[/* expect */0](Z.Int[/* rem */20](Z.Int[/* of_int */4](7), Z.Int[/* of_int */4](3))));
              }));
        Jest.test("rem", (function () {
                return Jest.Expect[/* toEqual */12](Z.Int[/* of_int */4](1), Jest.Expect[/* expect */0](Z.Int[/* rem */20](Z.Int[/* of_int */4](7), Z.Int[/* of_int */4](-3))));
              }));
        Jest.test("rem", (function () {
                return Jest.Expect[/* toEqual */12](Z.Int[/* of_int */4](-1), Jest.Expect[/* expect */0](Z.Int[/* rem */20](Z.Int[/* of_int */4](-7), Z.Int[/* of_int */4](3))));
              }));
        Jest.test("rem", (function () {
                return Jest.Expect[/* toEqual */12](Z.Int[/* of_int */4](-1), Jest.Expect[/* expect */0](Z.Int[/* rem */20](Z.Int[/* of_int */4](-7), Z.Int[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem 7 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](2),
                            Z.Int[/* of_int */4](1)
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](7), Z.Int[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem 7 (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](-2),
                            Z.Int[/* of_int */4](1)
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](7), Z.Int[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem (-7) 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](-3),
                            Z.Int[/* of_int */4](2)
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](-7), Z.Int[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem (-7) (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](-3),
                            Z.Int[/* of_int */4](2)
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](-7), Z.Int[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem (-8) 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](-3),
                            Z.Int[/* of_int */4](1)
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](-8), Z.Int[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem (-8) (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](-3),
                            Z.Int[/* of_int */4](1)
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](-8), Z.Int[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem 9 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](3),
                            Z.Int[/* of_int */4](0)
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](9), Z.Int[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem 9 (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](-3),
                            Z.Int[/* zero */1]
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](9), Z.Int[/* of_int */4](-3))));
              }));
        Jest.test("ediv_rem (-9) 3", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](-3),
                            Z.Int[/* of_int */4](0)
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](-9), Z.Int[/* of_int */4](3))));
              }));
        Jest.test("ediv_rem (-9) (-3)", (function () {
                return Jest.Expect[/* toEqual */12](/* tuple */[
                            Z.Int[/* of_int */4](-3),
                            Z.Int[/* zero */1]
                          ], Jest.Expect[/* expect */0](Z.Int[/* ediv_rem */24](Z.Int[/* of_int */4](-9), Z.Int[/* of_int */4](-3))));
              }));
        Jest.test("is_even", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Z.Int[/* is_even */52](Z.Int[/* of_int */4](8))));
              }));
        Jest.test("is_even", (function () {
                return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Z.Int[/* is_even */52](Z.Int[/* of_int */4](9))));
              }));
        Jest.test("is_odd", (function () {
                return Jest.Expect[/* toEqual */12](false, Jest.Expect[/* expect */0](Z.Int[/* is_odd */53](Z.Int[/* of_int */4](8))));
              }));
        Jest.test("is_odd", (function () {
                return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](Z.Int[/* is_odd */53](Z.Int[/* of_int */4](9))));
              }));
        Jest.test("gcd 2 12", (function () {
                return Jest.Expect[/* toEqual */12](Z.Int[/* of_int */4](2), Jest.Expect[/* expect */0](Z.Int[/* gcd */54](Z.Int[/* of_int */4](2), Z.Int[/* of_int */4](12))));
              }));
        Jest.test("gcd 12 20", (function () {
                return Jest.Expect[/* toEqual */12](Z.Int[/* of_int */4](4), Jest.Expect[/* expect */0](Z.Int[/* gcd */54](Z.Int[/* of_int */4](12), Z.Int[/* of_int */4](20))));
              }));
        return Jest.test("gcd 36 60", (function () {
                      return Jest.Expect[/* toEqual */12](Z.Int[/* of_int */4](12), Jest.Expect[/* expect */0](Z.Int[/* gcd */54](Z.Int[/* of_int */4](36), Z.Int[/* of_int */4](60))));
                    }));
      }));

/*  Not a pure module */
