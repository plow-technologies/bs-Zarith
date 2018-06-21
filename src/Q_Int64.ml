module Q_Int64 = struct
  type t = Q_Internal.Q(Z.Int64).t = { num : Z.Int64.t; den : Z.Int64.t; }
  (* Type of rationals.
     Invariants:
     - den is always >= 0;
     - num and den have no common factor;
     - if den=0, then num is -1, 0 or 1.
     - if num=0, then den is -1, 0 or 1.
   *)

  (* creation *)
  (* -------- *)

  (* make *)
  let mk n d =
    { num = n; den = d; }

  (* make and normalize n/d, assuming d > 0 *)
  let make_real n d =
    if n == Z.Int64.zero || d == Z.Int64.one then mk n Z.Int64.one
    else
      let g = Z.Int64.gcd n d in
      if g == Z.Int64.one
      then mk n d
      else mk (Z.Int64.divexact n g) (Z.Int64.divexact d g)

  (* make and normalize any fraction *)
  let make n d =
    let sd = Z.Int64.sign d in
    if sd = 0 then mk (Z.Int64.of_int (Z.Int64.sign n)) Z.Int64.zero else
      if sd > 0 then make_real n d else
        make_real (Z.Int64.neg n) (Z.Int64.neg d)

  let of_bigint n = mk n Z.Int64.one
  (* n/1 *)

  let of_int n = of_bigint (Z.Int64.of_int n)

  let of_int32 n = of_bigint (Z.Int64.of_int32 n)

  let of_int64 n = of_bigint (Z.Int64.of_int64 n)

  let of_nativeint n = of_bigint (Z.Int64.of_nativeint n)

  let of_ints n d = make (Z.Int64.of_int n) (Z.Int64.of_int d)

  let zero = of_bigint Z.Int64.zero
  (* 0/1 *)

  let one = of_bigint Z.Int64.one
  (* 1/1 *)

  let minus_one = of_bigint Z.Int64.minus_one
  (* -1/1 *)

  let inf = mk Z.Int64.one Z.Int64.zero
  (* 1/0 *)

  let minus_inf = mk Z.Int64.minus_one Z.Int64.zero
  (* -1/0 *)

  let undef = mk Z.Int64.zero Z.Int64.zero
  (* 0/0 *)

  let of_float d =
    if d = infinity then inf else
      if d = neg_infinity then minus_inf else
        if classify_float d = FP_nan then undef else
          let m,e = frexp d in
          (* put into the form m * 2^e, where m is an integer *)
          let m,e = Z.Int64.of_float (ldexp m 53), e-53 in
          if e >= 0 then of_bigint (Z.Int64.shift_left m e)
          else make_real m (Z.Int64.shift_left Z.Int64.one (-e))

  let of_string s =
    try
      let i  = String.index s '/' in
      make
        (Z.Int64.of_substring s ~pos:0 ~len:i)
        (Z.Int64.of_substring s ~pos:(i+1) ~len:(String.length s-i-1))
    with Not_found ->
      if s = "inf" || s = "+inf" then inf
      else if s = "-inf" then minus_inf
      else if s = "undef" then undef
      else of_bigint (Z.Int64.of_string s)


  (* queries *)
  (* ------- *)

  type kind = Q_Internal.Q(Z.Int64).kind = ZERO | INF | MINF | UNDEF | NZERO
                                                                   
  let classify n =
    if n.den == Z.Int64.zero then
      match Z.Int64.sign n.num with
      | 1  -> INF
      | -1 -> MINF
      | _ -> UNDEF
    else
      if n.num == Z.Int64.zero
      then ZERO
      else NZERO

  let is_real n = (n.den != Z.Int64.zero)

  let num x = x.num

  let den x = x.den

  let sign x = Z.Int64.sign x.num
  (* sign undef = 0
   sign inf = 1
   sign -inf = -1
   *)

  let equal x y =
    (Z.Int64.equal x.num y.num) && (Z.Int64.equal x.den y.den)

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
       then Z.Int64.compare x.num y.num
       else
         Z.Int64.compare
           (Z.Int64.mul x.num y.den)
           (Z.Int64.mul y.num x.den)

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
       if Z.Int64.equal n.den Z.Int64.one then Z.Int64.to_string n.num
       else (Z.Int64.to_string n.num) ^ "/" ^ (Z.Int64.to_string n.den)

  let to_bigint x = Z.Int64.div x.num x.den
  (* raises a Division by zero in case x is undefined or infinity *)

  let to_int x = Z.Int64.to_int (to_bigint x)

  let to_int32 x = Z.Int64.to_int32 (to_bigint x)

  let to_int64 x = Z.Int64.to_int64 (to_bigint x)

  let to_nativeint x = Z.Int64.to_nativeint (to_bigint x)

  let to_float x =
    match classify x with
    | ZERO -> 0.0
    | INF  -> infinity
    | MINF -> neg_infinity
    | UNDEF -> nan
    | NZERO ->
       let p = x.num and q = x.den in
       let np = Z.Int64.numbits p and nq = Z.Int64.numbits q in
       if np <= 53 && nq <= 53 then
         (* p and q convert to floats exactly; use FP division to get the
         correctly-rounded result. *)
         Int64.to_float (Z.Int64.to_int64 p) /. Int64.to_float (Z.Int64.to_int64 q)
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
             then (Z.Int64.shift_left p n, q)
             else (p, Z.Int64.shift_left q (-n)) in
           (* Euclidean division of p' by q' *)
           let (quo, rem) = Z.Int64.ediv_rem p' q' in
           (* quo is the integral part of p/q*2^n
         rem/q' is the fractional part. *)
           (* Round quo to float *)
           let f = Z.Int64.round_to_float quo (Z.Int64.sign rem = 0) in
           (* Apply exponent *)
           ldexp f (-n)
         end

  (* operations *)
  (* ---------- *)

  let neg x =
    mk (Z.Int64.neg x.num) x.den
  (* neg undef = undef
   neg inf = -inf
   neg -inf = inf
   *)

  let abs x =
    mk (Z.Int64.abs x.num) x.den
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
           (Z.Int64.mul x.num y.den)
           (Z.Int64.mul y.num x.den))
        (Z.Int64.mul x.den y.den)

  let add x y =
    if x.den == Z.Int64.zero || y.den == Z.Int64.zero then match classify x, classify y with
                                               | ZERO,_ -> y
                                               | _,ZERO -> x
                                               | UNDEF,_ | _,UNDEF -> undef
                                               | INF,MINF | MINF,INF -> undef
                                               | INF,_ | _,INF -> inf
                                               | MINF,_ | _,MINF -> minus_inf
                                               | NZERO,NZERO -> failwith "impossible case"
    else
      aors Z.Int64.add x y
  (* undef + x = x + undef = undef
   inf + -inf = -inf + inf = undef
   inf + x = x + inf = inf
   -inf + x = x + -inf = -inf
   *)

  let sub x y =
    if x.den == Z.Int64.zero || y.den == Z.Int64.zero then match classify x, classify y with
                                               | ZERO,_ -> neg y
                                               | _,ZERO -> x
                                               | UNDEF,_ | _,UNDEF -> undef
                                               | INF,INF | MINF,MINF -> undef
                                               | INF,_ | _,MINF -> inf
                                               | MINF,_ | _,INF -> minus_inf
                                               | NZERO,NZERO -> failwith "impossible case"
    else
      aors Z.Int64.sub x y
  (* sub x y = add x (neg y) *)

  let mul x y =
    if x.den == Z.Int64.zero || y.den == Z.Int64.zero then
      mk
        (Z.Int64.of_int ((Z.Int64.sign x.num) * (Z.Int64.sign y.num)))
        Z.Int64.zero
    else
      make_real (Z.Int64.mul x.num y.num) (Z.Int64.mul x.den y.den)

  (* undef * x = x * undef = undef
   0 * inf = inf * 0 = 0 * -inf = -inf * 0 = undef
   inf * x = x * inf = sign x * inf
   -inf * x = x * -inf = - sign x * inf
   *)

  let inv x =
    match Z.Int64.sign x.num with
    | 1 -> mk x.den x.num
    | -1 -> mk (Z.Int64.neg x.den) (Z.Int64.neg x.num)
    | _ ->  if x.den == Z.Int64.zero then undef else inf
  (* 1 / undef = undef
   1 / inf = 1 / -inf = 0
   1 / 0 = inf

   note that: inv (inv -inf) = inf <> -inf
   *)

  let div x y =
    if Z.Int64.sign y.num >= 0
    then mul x (mk y.den y.num)
    else mul x (mk (Z.Int64.neg y.den) (Z.Int64.neg y.num))
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
    if x.den == Z.Int64.zero then x
    else make_real (Z.Int64.shift_left x.num n) x.den

  let  div_2exp x n =
    if x.den == Z.Int64.zero then x
    else make_real x.num (Z.Int64.shift_left x.den n)


  (* printing *)
  (* -------- *)

  let print x = print_string (to_string x)
  let output chan x = output_string chan (to_string x)
  let sprint () x = to_string x
  let bprint b x = Buffer.add_string b (to_string x)
  let pp_print f x = Format.pp_print_string f (to_string x)


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
