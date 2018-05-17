module Bigint : sig
  type sign = Pos | Neg
  type t    = Bigint of sign * int list

  val zero' : t
  val one : t
  val minus_one : t

  val shift_left : t -> int -> t
  val shift_right : t -> int -> t
  val neg : t -> t
  val sign : t -> int

  val of_int: int -> t
  val of_int32 : Int32.t -> t
  val of_int64 : Int64.t -> t
  val of_nativeint : nativeint -> t
  val of_string : string -> t

  val to_string : t -> string

  val add : t -> t -> t
  val sub : t -> t -> t
  val div : t -> t -> t
  val mul : t -> t -> t

  val compare : t -> t -> int
  val abs : t -> t

  val numbits : t -> int

  val rem : t -> t -> t

  val div_rem : t -> t -> (t * t)
end