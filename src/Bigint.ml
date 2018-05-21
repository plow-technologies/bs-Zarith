type sign = Pos | Neg

type t    = Bigint of sign * int list 

let radix    = 10
let radixlen = 1

let car       = List.hd
let cdr       = List.tl
let map       = List.map
let reverse   = List.rev
let strcat    = String.concat
let strlen    = String.length
let strsub    = String.sub

let zero = Bigint (Pos, [])
let zero' = Bigint (Pos, [0])
let one = Bigint (Pos, [1])
let minus_one = Bigint (Neg, [1])

let charlist_of_string str = 
  let last = strlen str - 1
  in  let rec charlist pos result =
      if pos < 0
      then result
      else charlist (pos - 1) (str.[pos] :: result)
  in  charlist last []
    
let of_string str =
  let len = strlen str
  in  let to_intlist first =
          let substr = strsub str first (len - first) in
          let digit char = int_of_char char - int_of_char '0' in
          map digit (reverse (charlist_of_string substr))
      in  if   len = 0
          then zero
          else if   str.[0] = '-'
               then Bigint (Neg, to_intlist 1)
               else Bigint (Pos, to_intlist 0)

let of_int i = of_string (string_of_int i)
let of_int32 i = of_string (Int32.to_string i)
let of_int64 i = of_string (Int64.to_string i)
let of_nativeint i = of_string (Nativeint.to_string i)

let to_string (Bigint (sign, value)) =
  match value with
  | []    -> "0"
  | value -> let reversed = reverse value
             in  strcat ""
                 ((if sign = Pos then "" else "-") ::
                  (map string_of_int reversed))

let trimzeros listy =
  let rec trimzeros' listy' = 
    match listy' with
    | []        -> []
    | [0]       -> []
    | car::cdr ->
        let cdr' = trimzeros' cdr
        in match (car, cdr') with
           | 0, []      -> []
           | car, cdr'  -> car::cdr'
  in trimzeros' listy

(* cmp list1 list2 = bigger list *)
let rec cmp list1 list2 =
    if List.length list1 > List.length list2
    then 1
    else if List.length list1 < List.length list2
    then -1
    else match (list1, list2) with
    | [], []        -> 0
    | list1, list2  ->
        let reverselist1 = reverse list1 in
        let reverselist2 = reverse list2 in
        if car reverselist1 > car reverselist2
        then 1
        else if car reverselist1 < car reverselist2
        then -1
        else let list1' = reverse (cdr reverselist1) in
            let list2' = reverse (cdr reverselist2) in 
            cmp list1' list2'

  
let rec add' list1 list2 carry = match (list1, list2, carry) with
    | list1, [], 0       -> list1
    | [], list2, 0       -> list2
    | list1, [], carry   -> add' list1 [carry] 0
    | [], list2, carry   -> add' [carry] list2 0
    | list1, list2, carry ->
      let sum = (car list1) + (car list2) + carry
       in  sum mod radix :: add' (cdr list1) (cdr list2) (sum / radix)

let rec sub' list1 list2 carry = match (list1, list2, carry) with
    | [], [], 0         -> []
    | list1, [], 0      -> list1
    | list1, [], carry  -> sub' list1 [carry] 0
    | list1, list2, carry ->
        let diff = (car list1) - (car list2) - carry in
            if (diff >= 0)
            then diff :: sub' (cdr list1) (cdr list2) 0
            else diff + 10 :: sub' (cdr list1) (cdr list2) 1

let double listy = add' listy listy 0

let rec mul' list1 list2' powerof2 =
  if (cmp powerof2 list1) = 1
  then list1, [0]
  else let remainder, product =
    mul' list1 (double list2') (double powerof2)
    in if (cmp remainder powerof2) = -1
        then remainder, product
        else trimzeros (sub' remainder powerof2 0), 
            add' product list2' 0


let add (Bigint (neg1, value1)) (Bigint (neg2, value2)) =
  if neg1 = neg2
  then Bigint (neg1, add' value1 value2 0)
  else if (cmp value1 value2) = 1
    then Bigint (neg1, trimzeros (sub' value1 value2 0))
    else if cmp value1 value2 = -1
      then Bigint (neg2, trimzeros (sub' value2 value1 0))
      else zero

let sub (Bigint (neg1, value1)) (Bigint (neg2, value2)) =
  if neg1 = neg2
  then (if (cmp value1 value2) = 1
    then (if neg1 = Neg
      then Bigint (Neg, trimzeros(sub' value1 value2 0))
      else Bigint (Pos, trimzeros(sub' value1 value2 0)))
    else if (cmp value1 value2) = -1
    then (if neg1 = Neg
      then Bigint (Pos, trimzeros(sub' value2 value1 0))
      else Bigint (Neg, trimzeros(sub' value2 value1 0)))
    else zero)
  else Bigint (neg1, add' value1 value2 0)

let mul (Bigint (neg1, value1)) (Bigint (neg2, value2)) =
  let _, product = mul' value1 value2 [1]
  in if neg1 = neg2
    then Bigint (Pos, product)
    else Bigint (Neg, product)

let rec div_rem' list1 list2' powerof2 =
  if (cmp list2' list1) = 1
  then [0], list1
  else let quotient, remainder =
    div_rem' list1 (double list2') (double powerof2)
    in if (cmp remainder list2') = -1
       then quotient, remainder
       else add' quotient powerof2 0,
         trimzeros (sub' remainder list2' 0)

let div_rem (Bigint (neg1, value1)) (Bigint (neg2, value2)) =
  let quotient, rem = div_rem' value1 value2 [1] in
  let rem = if rem = [] then Bigint (Pos, [0]) else Bigint (neg1, rem)
    in if neg1 = neg2
      then (Bigint (Pos, quotient), rem)
      else (Bigint (Neg, quotient), rem)

let div a b =
  let quotient, _ = div_rem a b
  in quotient

let rem a b =
  let _, remainder = div_rem a b
  in remainder

let rec ediv_rem' t0 t1 cum =
  let (Bigint (_, v0)) = t0 in
  let t0' = (Bigint (Pos, v0)) in
  let (Bigint (_, v1)) = t1 in
  let t1' = (Bigint (Pos, v1)) in
  let r = sub t0' t1' in
  if (cmp v0 v1) = 1
  then ediv_rem' r t1' (add cum one)
  else
    let (Bigint (_, rv)) = r in
    if (cmp rv [0]) = 0
    then (cum, r)
    else ((add cum one), r)

let ediv_rem a b =
  let (Bigint (neg1, _)) = a in
  let (Bigint (neg2, _)) = b in
  match (neg1, neg2) with
  | (Pos, Pos) -> div_rem a b
  | (Pos, Neg) -> div_rem a b
  | (Neg, _) ->
    let (Bigint (_, q), Bigint(_, r)) = ediv_rem' a b zero in
    let r = trimzeros r in
    let r = if r = [] then [0] else r in
    (Bigint (Neg, q), Bigint (Pos, r))

let ediv a b =
  let quotient, _ = ediv_rem a b
  in quotient

let erem a b =
  let _, remainder = ediv_rem a b
  in remainder

let is_even (Bigint (_neg, value)) = 
  let _, remainder = div_rem' value [2] [1]
  in (remainder = [] || remainder = [0])

let is_odd a = 
  not (is_even a)

(** Elementary number theory *)

let rec gcd' a b =
  let c = erem a b
  in if c = zero'
    then b
    else gcd' b c

let gcd x y = gcd' x y

let rec pow' base exp acc =
  if exp <= 0
  then acc
  else (pow' base (exp - 1) (mul acc base))

let pow base exp =
  if exp < 0
  then raise (Invalid_argument "The exponent must be greater zero or greater.")
  else if exp = 0
    then one
    else if exp = 1
    then base
    else pow' base exp one

let abs (Bigint (_neg, value)) = Bigint (Pos, value)

  (* not complete *)
  let numbits (Bigint (_neg, value)) = List.length value

  (* need to test theses *)
  let shift_left x n = mul x (pow (of_int 2) n)

  let shift_right x n = div x (pow (of_int 2) n)

let neg (Bigint (sn, n)) =
  match sn with
  | Pos -> Bigint (Neg, n)
  | Neg -> Bigint (Pos, n)

let compare (Bigint (neg1, v1)) (Bigint (neg2, v2)) =
  match (neg1, neg2) with
  | (Neg,Pos) -> -1
  | (Pos,Neg) -> 1
  | (Neg,Neg) -> ~-(cmp v1 v2)
  | (Pos,Pos) -> cmp v1 v2

let equal x y = (compare x y) = 0

let leq x y = (compare x y) < 1

let geq x y = (compare x y) > -1

let lt x y = (compare x y) < 0

let gt x y = (compare x y) > 0

let sign n =
  if n = zero'
  then 0
  else
    if (compare n zero') < 0
    then -1
    else 1

let succ x = add x one

let pred x = sub x one


let (~-) = neg

(* val (~+): t -> t *)

let (+) = add

let (-) = sub

let ( * ) = mul

let (/) = div

(* (/>): t -> t -> t *)

(* (/<): t -> t -> t *)

(* (/|): t -> t -> t *)

(* (mod): t -> t -> t *)

(* (land): t -> t -> t *)

(* (lor): t -> t -> t *)

(* (lxor): t -> t -> t *)

(* (~!): t -> t *)

let (lsl) = shift_left

let (asr) = shift_right

let (~$) = of_int

let ( ** ) = pow

let (=) = equal

let (<) = lt

let (>) = gt

let (<=) = leq

let (>=) = geq

let (<>) x y = not (equal x y)


(*
shift left
x * (2 ** n)

shift right
x / (2 ** n)
 dividing it by 2**n, but it always rounds down (towards negative infinity).

let rec pow a = function
  | 0 -> 1
  | 1 -> a
  | n -> 
    let b = pow a (n / 2) in
    b * b * (if n mod 2 = 0 then 1 else a)
 *)
