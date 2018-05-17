module Bigint : sig
  type sign = Pos | Neg
  type t    = Bigint of sign * int list

  val of_int: int -> t
  val of_string: string -> t

  val add : t -> t -> t
  val sub : t -> t -> t
end