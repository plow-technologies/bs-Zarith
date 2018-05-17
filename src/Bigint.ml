(*  need to support these functions *)

(*
module type Bigint = sig
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
*)

module Bigint = struct
  type sign     = Pos | Neg

  type t   = Bigint of sign * int list

    let  radix    = 10
    let  radixlen = 1

    let car       = List.hd
    let cdr       = List.tl
    let map       = List.map
    let reverse   = List.rev
    let strcat    = String.concat
    let strlen    = String.length
    let strsub    = String.sub
    let zero = Bigint (Pos, [])

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

    let string_of_bigint (Bigint (sign, value)) =
        match value with
        | []    -> "0"
        | value -> let reversed = reverse value
                   in  strcat ""
                       ((if sign = Pos then "" else "-") ::
                        (map string_of_int reversed))

    let trimzeros listy =
        let rec trimzeros' listy' = match listy' with
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

    let rec divrem' list1 list2' powerof2 =
        if (cmp list2' list1) = 1
        then [0], list1
        else let quotient, remainder =
            divrem' list1 (double list2') (double powerof2)
            in if (cmp remainder list2') = -1
                then quotient, remainder
                else add' quotient powerof2 0,
                    trimzeros (sub' remainder list2' 0)

    let even number = 
        let _, remainder = divrem' number [2] [1]
        in (remainder = [0])

    let rec pow' list1 list2 result = match list2 with
        | [0]                   -> result
        | list2 when even list2 -> pow' (let _, product = mul' list1 list1 [1] in product) 
            (let q, _ = divrem' list2 [2] [1] in q) result
        | list2                 -> pow' list1 (sub' list2 [1] 0) 
            (let _, product = mul' list1 result [1] in product)

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

    let divrem list1 list2' = divrem' list1 list2' [1]

    let div (Bigint (neg1, value1)) (Bigint (neg2, value2)) =
        let quotient, _ = divrem value1 value2
        in if neg1 = neg2
            then Bigint (Pos, quotient)
            else Bigint (Neg, quotient)

    let rem (Bigint (_neg1, value1)) (Bigint (_neg2, value2)) =
        let _, remainder = divrem value1 value2
        in Bigint (Pos, remainder)

    let pow (Bigint (neg1, value1)) (Bigint (neg2, value2)) =
        if neg2 = Pos
        then (if neg1 = Neg
                then (if even value2
                        then Bigint (Pos, pow' value1 value2 [1])
                        else Bigint (Neg, pow' value1 value2 [1]))
                else Bigint (Pos, pow' value1 value2 [1]))
        else (if neg1 = Neg
                then (if even value2
                        then Bigint (Pos, pow' (let q, _ = divrem' [1] value1 [1] in q) value2 [1])
                        else Bigint (Neg, pow' (let q, _ = divrem' [1] value1 [1] in q) value2 [1]))
                        else Bigint (Pos, pow' (let q, _ = divrem' [1] value1 [1] in q) value2 [1]))

end
