module type Z = sig
  type t
  val zero : t
  val one : t
  val minus_one : t
  val shift_left : t -> int -> t
  val shift_right : t -> int -> t
  val neg : t -> t
  val sign : t -> int
  val equal : t -> t -> bool

  val of_int : int -> t
  val of_int32 : Int32.t -> t
  val of_int64 : Int64.t -> t
  val of_nativeint : nativeint -> t
  val (mod) : t -> t -> t
  val of_float : float -> t
  val of_string : string -> t
  val of_substring : string -> pos:int -> len:int -> t

  val to_int : t -> int
  val to_int32 : t -> Int32.t
  val to_int64 : t -> Int64.t
  val to_nativeint : t -> nativeint
  val to_string : t -> string

  val numbits: t -> int
  val div : t -> t -> t
  val mul : t -> t -> t
  val add : t -> t -> t
  val sub : t -> t -> t
  val compare : t -> t -> int
  val abs : t -> t
  val gcd : t -> t -> t

  val rem : t -> t -> t
  val div_rem: t -> t -> (t * t)
  val ediv_rem: t -> t -> (t * t)
  val round_to_float: t -> bool -> float
end

module ZInt : Z = struct
  type t = int
  let zero = 0
  let one = 1
  let minus_one = -1
  let shift_left = (lsl)
  let shift_right = (asr)
  let neg = (~-)
  let sign n =
    if n == 0
    then 0
    else
      if n < 0
      then -1
      else 1
  let equal x y = x == y
  let of_int x = x
  let of_int32 = Int32.to_int
  let of_int64 = Int64.to_int
  let of_nativeint = Nativeint.to_int
  let of_float = int_of_float
  let to_int x = x
  let to_int32 = Int32.of_int
  let to_int64 = Int64.of_int
  let to_nativeint = Nativeint.of_int
  let to_string = string_of_int
  let (mod) = (mod)
  let div x y = x / y
  let mul x y = x * y
  let add x y = x + y
  let sub x y = x - y
  let compare = compare
  let abs = abs
  let rec gcd a b =
    let c = (mod) a b in
    if c == 0
    then b
    else gcd b c

  let numbits n =
    let nref  = ref n in
    let count = ref 0 in
    while (!nref > !count) do
      if (!nref land !count == 1)
      then (count := !count + 1)
      else (nref := !nref lsr 1)
    done;
    !count
  
  let rem x y = x mod y
  let div_rem a b = (a / b, rem a b)

  let ediv_rem a b =
    (* we have a = q * b + r, but [Big_int]'s remainder satisfies 0 <= r < |b|,
       while [Z]'s remainder satisfies -|b| < r < |b| and sign(r) = sign(a)
     *)
     let q,r = div_rem a b in
     if sign r >= 0 then (q,r) else
     if sign b >= 0 then (pred q, add r b)
     else (succ q, sub r b)

  let round_to_float x exact =
    let m = to_int64 x in
    (* Unless the fractional part is exactly 0, round m to an odd integer *)
    let m = if exact then m else Int64.logor m 1L in
    (* Then convert m to float, with the current rounding mode. *)
    Int64.to_float m

  let of_string = int_of_string
  let of_substring s ~pos ~len = int_of_string (String.sub s pos len)
end

module ZInt32 : Z = struct
  type t = Int32.t
  let zero = Int32.zero
  let one = Int32.one
  let minus_one = Int32.minus_one
  let shift_left = Int32.shift_left
  let shift_right = Int32.shift_right
  let neg = Int32.neg
  let sign n =
    if n == (Int32.of_int 0)
    then 0
    else
      if (Int32.compare n (Int32.of_int 0)) < 0
      then -1
      else 1
  let equal x y = x == y

  let of_int = Int32.of_int
  let of_int32 x = x
  let of_int64 = Int64.to_int32
  let of_nativeint = Nativeint.to_int32
  let of_float = Int32.of_float
  let to_int = Int32.to_int
  let to_int32 x = x
  let to_int64 = Int64.of_int32
  let to_nativeint = Nativeint.of_int32
  let to_string = Int32.to_string
  let (mod) a n = Int32.sub a (Int32.mul n (Int32.div a n))

  let div = Int32.div
  let mul = Int32.mul
  let add = Int32.add
  let sub = Int32.sub
  let compare = Int32.compare

  let abs = Int32.abs

  let rec gcd a b =
    let c = (mod) a b in
    if c == zero
    then b
    else gcd b c

  let numbits n =
    let nref  = ref n in
    let count = ref (Int32.of_int 0) in
    while (!nref > !count) do
      if (Int32.logand !nref !count == (Int32.of_int 1))
      then (count := Int32.add !count (Int32.of_int 1))
      else (nref := Int32.shift_right_logical !nref 1)
    done;
    to_int !count
  
  let rem x y = x mod y
  let div_rem a b = (Int32.div a b, rem a b)

  let ediv_rem a b =
    (* we have a = q * b + r, but [Big_int]'s remainder satisfies 0 <= r < |b|,
       while [Z]'s remainder satisfies -|b| < r < |b| and sign(r) = sign(a)
     *)
     let q,r = div_rem a b in
     if sign r >= 0 then (q,r) else
     if sign b >= 0 then (Int32.pred q, add r b)
     else (Int32.succ q, sub r b)

  let round_to_float x exact =
    let m = to_int64 x in
    (* Unless the fractional part is exactly 0, round m to an odd integer *)
    let m = if exact then m else Int64.logor m 1L in
    (* Then convert m to float, with the current rounding mode. *)
    Int64.to_float m


  let of_string = Int32.of_string
  let of_substring s ~pos ~len = Int32.of_string (String.sub s pos len)
end

module ZInt64 : Z = struct
  type t = Int64.t
  let zero = Int64.zero
  let one = Int64.one
  let minus_one = Int64.minus_one
  let shift_left = Int64.shift_left
  let shift_right = Int64.shift_right
  let neg = Int64.neg
  let sign n =
    if n == zero
    then 0
    else
      if (Int64.compare n zero) < 0
      then -1
      else 1
  let equal x y = x == y

  let of_int = Int64.of_int
  let of_int32 = Int64.of_int32
  let of_int64 x = x
  let of_nativeint = Int64.of_nativeint
  let of_float = Int64.of_float
  let to_int = Int64.to_int
  let to_int32 = Int64.to_int32
  let to_int64 x = x
  let to_nativeint = Int64.to_nativeint
  let to_string = Int64.to_string
  let (mod) a n = Int64.sub a (Int64.mul n (Int64.div a n))

  let div = Int64.div
  let mul = Int64.mul
  let add = Int64.add
  let sub = Int64.sub
  let compare = Int64.compare

  let abs = Int64.abs

  let rec gcd a b =
    let c = (mod) a b in
    if c == zero
    then b
    else gcd b c

  let numbits n =
    let nref  = ref n in
    let count = ref zero in
    while (!nref > !count) do
      if (Int64.logand !nref !count == one)
      then (count := Int64.add !count one)
      else (nref := Int64.shift_right_logical !nref 1)
    done;
    to_int !count
  
  let rem x y = x mod y
  let div_rem a b = (Int64.div a b, rem a b)

  let ediv_rem a b =
    (* we have a = q * b + r, but [Big_int]'s remainder satisfies 0 <= r < |b|,
       while [Z]'s remainder satisfies -|b| < r < |b| and sign(r) = sign(a)
     *)
     let q,r = div_rem a b in
     if sign r >= 0 then (q,r) else
     if sign b >= 0 then (Int64.pred q, add r b)
     else (Int64.succ q, sub r b)

  let round_to_float x exact =
    let m = to_int64 x in
    (* Unless the fractional part is exactly 0, round m to an odd integer *)
    let m = if exact then m else Int64.logor m 1L in
    (* Then convert m to float, with the current rounding mode. *)
    Int64.to_float m


  let of_string = Int64.of_string
  let of_substring s ~pos ~len = Int64.of_string (String.sub s pos len)
end

module ZNativeint : Z = struct
  type t = Nativeint.t
  let zero = Nativeint.zero
  let one = Nativeint.one
  let minus_one = Nativeint.minus_one
  let shift_left = Nativeint.shift_left
  let shift_right = Nativeint.shift_right
  let neg = Nativeint.neg
  let sign n =
    if n == (Nativeint.of_int 0)
    then 0
    else
      if (Nativeint.compare n (Nativeint.of_int 0)) < 0
      then -1
      else 1
  let equal x y = x == y

  let of_int = Nativeint.of_int
  let of_int32 = Nativeint.of_int32
  let of_int64 = Int64.to_nativeint
  let of_nativeint x = x
  let of_float = Nativeint.of_float
  let to_int = Nativeint.to_int
  let to_int32 = Nativeint.to_int32
  let to_int64 = Int64.of_nativeint
  let to_nativeint x = x
  let to_string = Nativeint.to_string
  let (mod) a n = Nativeint.sub a (Nativeint.mul n (Nativeint.div a n))

  let div = Nativeint.div
  let mul = Nativeint.mul
  let add = Nativeint.add
  let sub = Nativeint.sub
  let compare = Nativeint.compare

  let abs = Nativeint.abs

  let rec gcd a b =
    let c = (mod) a b in
    if c == zero
    then b
    else gcd b c

  let numbits n =
    let nref  = ref n in
    let count = ref (Nativeint.of_int 0) in
    while (!nref > !count) do
      if (Nativeint.logand !nref !count == (Nativeint.of_int 1))
      then (count := Nativeint.add !count (Nativeint.of_int 1))
      else (nref := Nativeint.shift_right_logical !nref 1)
    done;
    to_int !count
  
  let rem x y = x mod y
  let div_rem a b = (Nativeint.div a b, rem a b)

  let ediv_rem a b =
    (* we have a = q * b + r, but [Big_int]'s remainder satisfies 0 <= r < |b|,
       while [Z]'s remainder satisfies -|b| < r < |b| and sign(r) = sign(a)
     *)
     let q,r = div_rem a b in
     if sign r >= 0 then (q,r) else
     if sign b >= 0 then (Nativeint.pred q, add r b)
     else (Nativeint.succ q, sub r b)

  let round_to_float x exact =
    let m = to_int64 x in
    (* Unless the fractional part is exactly 0, round m to an odd integer *)
    let m = if exact then m else Int64.logor m 1L in
    (* Then convert m to float, with the current rounding mode. *)
    Int64.to_float m


  let of_string = Nativeint.of_string
  let of_substring s ~pos ~len = Nativeint.of_string (String.sub s pos len)
end

module Rational (Z: Z) = struct
  type t =
    { num : Z.t
    ; den : Z.t
    }

  let mk n d =
    { num = n
    ; den = d
    }

  (* make and normalize n/d, assuming d > 0 *)
  let make_real n d =
    if n == Z.zero || d == Z.one then mk n Z.one
    else
      let g = Z.gcd n d in
      if g == Z.one
      then mk n d
      else mk (Z.div n g) (Z.div d g)

  (* make and normalize any fraction *)
  let make n d =
    let sd = Z.sign d in
    if sd = 0 then mk (Z.of_int (Z.sign n)) Z.zero else
    if sd > 0 then make_real n d else
      make_real (Z.neg n) (Z.neg d)

  let of_bigint n = mk n Z.one
  (* n/1 *)

  let of_int n = of_bigint (Z.of_int n)

  let of_int32 n = of_bigint (Z.of_int32 n)

  let of_int64 n = of_bigint (Z.of_int64 n)

  let of_nativeint n = of_bigint (Z.of_nativeint n)

  let of_ints n d = make (Z.of_int n) (Z.of_int d)

  let zero = of_bigint Z.zero
  (* 0/1 *)

  let one = of_bigint Z.one
  (* 1/1 *)

  let minus_one = of_bigint Z.minus_one
  (* -1/1 *)

  let inf = mk Z.one Z.zero
  (* 1/0 *)

  let minus_inf = mk Z.minus_one Z.zero
  (* -1/0 *)

  let undef = mk Z.zero Z.zero
  (* 0/0 *)

  let of_float d =
    if d = infinity then inf else
    if d = neg_infinity then minus_inf else
    if classify_float d = FP_nan then undef else
    let m,e = frexp d in
    (* put into the form m * 2^e, where m is an integer *)
    let m,e = Z.of_float (ldexp m 53), e-53 in
    if e >= 0 then of_bigint (Z.shift_left m e)
    else make_real m (Z.shift_left Z.one (-e))

  let of_string s =
    try
      let i  = String.index s '/' in
      make
        (Z.of_substring s ~pos:0 ~len:i)
        (Z.of_substring s ~pos:(i+1) ~len:(String.length s-i-1))
    with Not_found ->
      if s = "inf" || s = "+inf" then inf
      else if s = "-inf" then minus_inf
      else if s = "undef" then undef
      else of_bigint (Z.of_string s)

  (* queries *)
  (* ------- *)

  type kind =
    | ZERO   (* 0 *)
    | INF    (* 1/0 *)
    | MINF   (* -1/0 *)
    | UNDEF  (* 0/0 *)
    | NZERO  (* non-special, non-0 *)

  let classify n =
    if n.den == Z.zero then
      match Z.sign n.num with
      | 1  -> INF
      | -1 -> MINF
      | _ -> UNDEF
    else
      if n.num == Z.zero
      then ZERO
      else NZERO

  let is_real n = (n.den != Z.zero)

  let num x = x.num

  let den x = x.den

  let sign x = Z.sign x.num
  (* sign undef = 0
     sign inf = 1
     sign -inf = -1
  *)

  let equal x y =
    (Z.equal x.num y.num) && (Z.equal x.den y.den)

  let compare x y =
    match classify x, classify y with
    | UNDEF,UNDEF | INF,INF | MINF,MINF -> 0
    | UNDEF,_ -> -1
    | _,UNDEF -> 1
    | MINF,_ | _,INF -> -1
    | INF,_ | _,MINF -> 1
    | _ ->
      if x.den == y.den (* implies equality,
                           especially if immediate value and not a pointer,
                           in particular in the case den = 1 *)
      then Z.compare x.num y.num
      else
        Z.compare
          (Z.mul x.num y.den)
          (Z.mul y.num x.den)
  
  let min a b = if compare a b <= 0 then a else b
  let max a b = if compare a b >= 0 then a else b

  let leq a b = compare a b <= 0
  let geq a b = compare a b >= 0
  let lt a b = compare a b < 0
  let gt a b = compare a b > 0

  let to_string n =
    match classify n with
    | UNDEF -> "undef"
    | INF -> "+inf"
    | MINF -> "-inf"
    | ZERO -> "0"
    | NZERO ->
        if Z.equal n.den Z.one then Z.to_string n.num
        else (Z.to_string n.num) ^ "/" ^ (Z.to_string n.den)
  
  let to_bigint x = Z.div x.num x.den
  (* raises a Division by zero in case x is undefined or infinity *)

  let to_int x = Z.to_int (to_bigint x)

  let to_int32 x = Z.to_int32 (to_bigint x)

  let to_int64 x = Z.to_int64 (to_bigint x)

  let to_nativeint x = Z.to_nativeint (to_bigint x)

  let to_float x =
    match classify x with
    | ZERO -> 0.0
    | INF  -> infinity
    | MINF -> neg_infinity
    | UNDEF -> nan
    | NZERO ->
      let p = x.num and q = x.den in
      let np = Z.numbits p and nq = Z.numbits q in
      if np <= 53 && nq <= 53 then
        (* p and q convert to floats exactly; use FP division to get the
           correctly-rounded result. *)
        Int64.to_float (Z.to_int64 p) /. Int64.to_float (Z.to_int64 q)
      else begin
        (* |p| is in [2^(np-1), 2^np)
           q is in [2^(nq-1), 2^nq)
           hence |p/q| is in (2^(np-nq-1), 2^(np-nq+1)).
           We define n such that |p/q*2^n| is in [2^54, 2^56).
           >= 2^54 so that the round to odd technique applies.
           < 2^56 so that the integral part is representable as an int64. *)
        let n = 55 - (np - nq) in
        (* Scaling p/q by 2^n *)
        let (p', q') =
          if n >= 0
          then (Z.shift_left p n, q)
          else (p, Z.shift_left q (-n)) in
        (* Euclidean division of p' by q' *)
        let (quo, rem) = Z.ediv_rem p' q' in
        (* quo is the integral part of p/q*2^n
           rem/q' is the fractional part. *)
        (* Round quo to float *)
        let f = Z.round_to_float quo (Z.sign rem = 0) in
        (* Apply exponent *)
        ldexp f (-n)
    end

  (* operations *)
  (* ---------- *)

  let neg x =
    mk (Z.neg x.num) x.den
  (* neg undef = undef
     neg inf = -inf
     neg -inf = inf
   *)

  let abs x =
    mk (Z.abs x.num) x.den
  (* abs undef = undef
     abs inf = abs -inf = inf
   *)
  (* addition or substraction (zaors) of finite numbers *)
  let aors zaors x y =
    if x.den == y.den then  (* implies equality,
                               especially if immediate value and not a pointer,
                               in particular in the case den = 1 *)
      make_real (zaors x.num y.num) x.den
    else
      make_real
        (zaors
           (Z.mul x.num y.den)
           (Z.mul y.num x.den))
        (Z.mul x.den y.den)

  let add x y =
    if x.den == Z.zero || y.den == Z.zero then match classify x, classify y with
    | ZERO,_ -> y
    | _,ZERO -> x
    | UNDEF,_ | _,UNDEF -> undef
    | INF,MINF | MINF,INF -> undef
    | INF,_ | _,INF -> inf
    | MINF,_ | _,MINF -> minus_inf
    | NZERO,NZERO -> failwith "impossible case"
    else
      aors Z.add x y
  (* undef + x = x + undef = undef
     inf + -inf = -inf + inf = undef
     inf + x = x + inf = inf
     -inf + x = x + -inf = -inf
   *)

  let sub x y =
    if x.den == Z.zero || y.den == Z.zero then match classify x, classify y with
    | ZERO,_ -> neg y
    | _,ZERO -> x
    | UNDEF,_ | _,UNDEF -> undef
    | INF,INF | MINF,MINF -> undef
    | INF,_ | _,MINF -> inf
    | MINF,_ | _,INF -> minus_inf
    | NZERO,NZERO -> failwith "impossible case"
    else
      aors Z.sub x y
  (* sub x y = add x (neg y) *)

  let mul x y =
    if x.den == Z.zero || y.den == Z.zero then
      mk
        (Z.of_int ((Z.sign x.num) * (Z.sign y.num)))
        Z.zero
    else
      make_real (Z.mul x.num y.num) (Z.mul x.den y.den)
  (* undef * x = x * undef = undef
     0 * inf = inf * 0 = 0 * -inf = -inf * 0 = undef
     inf * x = x * inf = sign x * inf
     -inf * x = x * -inf = - sign x * inf
     *)

  let inv x =
    match Z.sign x.num with
    | 1 -> mk x.den x.num
    | -1 -> mk (Z.neg x.den) (Z.neg x.num)
    | _ -> if x.den == Z.zero then undef else inf
    (* 1 / undef = undef
       1 / inf = 1 / -inf = 0
       1 / 0 = inf
       note that: inv (inv -inf) = inf <> -inf
       *)

  let div x y =
    if Z.sign y.num >= 0
    then mul x (mk y.den y.num)
    else mul x (mk (Z.neg y.den) (Z.neg y.num))
(* undef / x = x / undef = undef
   0 / 0 = undef
   inf / inf = inf / -inf = -inf / inf = -inf / -inf = undef
   0 / inf = 0 / -inf = x / inf = x / -inf = 0
   inf / x = sign x * inf
   -inf / x = - sign x * inf
   inf / 0 = inf
   -inf / 0 = -inf
   x / 0 = sign x * inf
   we have div x y = mul x (inv y)
   *)


  let  mul_2exp x n =
    if x.den == Z.zero then x
    else make_real (Z.shift_left x.num n) x.den

  let  div_2exp x n =
    if x.den == Z.zero then x
    else make_real x.num (Z.shift_left x.den n)

  let print x = print_string (to_string x)

  (* prefix and infix *)
  (* ---------------- *)

  let (~-) = neg
  let (~+) x = x
  let (+)  = add
  let (-) = sub
  let ( * ) = mul
  let (/) = div
  let (lsl) = mul_2exp
  let (asr) = div_2exp
  let (~$) = of_int
  let (//) = of_ints
  let (~$$) = of_bigint
  let (///) = make
  let (=) = equal
  let (<) = lt
  let (>) = gt
  let (<=) = leq
  let (>=) = geq
  let (<>) a b = not (equal a b)
end


module RationalInt = Rational(ZInt)
module RationalInt32 = Rational(ZInt32)
module RationalInt64 = Rational(ZInt64)
module RationalNativeint = Rational(ZNativeint)


(*
 Nativeint
 Int64
 *)
  
(*

external rem: t -> t -> t = rem@ASM
(** Integer remainder. Can raise a [Division_by_zero].
    The result of [rem a b] has the sign of [a], and its absolute value is
    strictly smaller than the absolute value of [b].
    The result satisfies the equality [a = b * div a b + rem a b].
 *)

external div_rem: t -> t -> (t * t) = "ml_z_div_rem"
(** Computes both the integer quotient and the remainder.
    [div_rem a b] is equal to [(div a b, rem a b)].
    Raises [Division_by_zero] if [b = 0].
*)


from pervasives
(mod) : int -> int -> int
Integer remainder. If y is not zero, the result of x mod y satisfies the following properties: x = (x / y) * y + x mod y and abs(x mod y) <= abs(y) - 1. If y = 0, x mod y raises Division_by_zero. Note that x mod y is negative only if x < 0. Raise Division_by_zero if y is zero. Left-associative operator at precedence level 7/11.


val (/) : int -> int -> int

Integer division. Raise Division_by_zero if the second argument is 0. Integer division rounds the real quotient of its arguments towards zero. More precisely, if x >= 0 and y > 0, x / y is the greatest integer less than or equal to the real quotient of x by y. Moreover, (- x) / y = x / (- y) = - (x / y). Left-associative operator at precedence level 7/11.


*)
