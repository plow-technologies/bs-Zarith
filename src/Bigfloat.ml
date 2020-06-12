type t = {
  value: Bigint.t;
  decimals: int;
  }

let mkBigfloat v d = { value = v; decimals = d } 
       
let zero = { value = Bigint.zero; decimals = 0 }

let one = { value = Bigint.one; decimals = 0 }

let minusOne = { value = Bigint.minus_one; decimals = 0 }

(** Internal utility functions *)             
let rec repeatString n s = if n = 0 then "" else s ^ (repeatString (n - 1) s)

let addCommas: string -> string =
  [%bs.raw
    {|
    function (s) {
      var sp = s.split(".");
      var l = sp[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      if (sp.length > 1) {
        return l.concat(".", sp[1]);
      } else {
        return l;
      }
    }
     |}]

let removeCommas: string -> string =
  [%bs.raw
    {|
    function (s) {
      return s.replace(/,/g, "");
    }
   |}]

(** of conversions *)

let ofInt i =
  { value = (Bigint.of_int i); decimals = 0 }
  
let ofInt32 i =
  { value = (Bigint.of_int32 i); decimals = 0 }
  
let ofInt64 i =
  { value = (Bigint.of_int64 i); decimals = 0 }

let ofNativeint i =
  { value = (Bigint.of_nativeint i); decimals = 0 }

let ofString (string : string) decimals =
  let s = removeCommas string in
  let a = Js.String.split "." s in
  if Array.length a = 1
  then
    Belt.Result.Ok
      { value = (Bigint.mul (Bigint.of_string s) (Bigint.pow (Bigint.of_int 10) decimals));
        decimals }
   else
     if Array.length a = 2
     then
       let leftSide = a.(0) in
       let rightSide = a.(1) in
       let rightSideLength = String.length rightSide in
       let rr =
         (if rightSideLength = decimals
          then rightSide
          else
            if rightSideLength < decimals
            then
              rightSide ^
                (repeatString (decimals - rightSideLength) "0")
            else
              String.sub rightSide 0 decimals) in
       Belt.Result.Ok { value = (Bigint.of_string (leftSide ^ rr)); decimals }
     else Belt.Result.Error string
  
let ofFloat (f : float) decimals =
  (let s = Js.Float.toString f in
   let a = Js.String.split ((".")[@reason.raw_literal "."]) s in
   if (Array.length a) = 1
   then { value = (Bigint.of_float f); decimals }
   else
     if (Array.length a) = 2
     then
       (let leftSide = a.(0) in
        let rightSide = a.(1) in
        let rightSideLength = String.length rightSide in
        let rr =
          if rightSideLength = decimals
          then rightSide
          else
            if rightSideLength < decimals
            then
              rightSide ^
                (repeatString (decimals - rightSideLength)
                   (("0")[@reason.raw_literal "0"]))
            else String.sub rightSide 0 decimals in
        { value = (Bigint.of_string (leftSide ^ rr)); decimals })
     else { value = Bigint.zero; decimals } : t)


(** to conversions *)

let toInt t =
   Bigint.to_int (Bigint.div t.value (Bigint.pow (Bigint.of_int 10) t.decimals))
  
let toInt32 t =
   Bigint.to_int32 (Bigint.div t.value (Bigint.pow (Bigint.of_int 10) t.decimals))
  
let toInt64 t =
   Bigint.to_int64 (Bigint.div t.value (Bigint.pow (Bigint.of_int 10) t.decimals))

let toNativeint t =
   Bigint.to_nativeint (Bigint.div t.value (Bigint.pow (Bigint.of_int 10) t.decimals))
  
let toString (t : t) =
  let s = Bigint.to_string t.value in
  let sl = String.length s in
  if t.decimals = 0
  then s
  else
    if sl <= t.decimals
    then
      "0." ^ (repeatString (t.decimals - sl) "0") ^ s
    else
      (let r = Js.String.slice ~from:(sl - t.decimals) ~to_:sl s in
       let l = Js.String.slice ~from:0 ~to_:(sl - t.decimals) s in
       l ^ "." ^ r)

let toStringWithCommas (t : t) = (addCommas (toString t) : string)
  
let toFloat (t : t) = (float_of_string (toString t) : float)

(** Arithmetic *)

let abs t = {t with value = Bigint.abs t.value}

let neg t = {t with value = Bigint.neg t.value}
  
let add (x : t) (y : t) =
  if x.decimals = y.decimals
  then { value = (Bigint.add x.value y.value); decimals = (x.decimals) }
  else
    if x.decimals > y.decimals
    then
      (let decimals = x.decimals - y.decimals in
       {
         value =
           (let open Bigint in
              add x.value (mul y.value (pow (of_int 10) decimals)));
         decimals = (x.decimals)
       })
    else
      (let decimals = y.decimals - x.decimals in
       {
         value =
           (let open Bigint in
              add y.value (mul x.value (pow (of_int 10) decimals)));
         decimals = (y.decimals)
       })

let sub x y =
  if x.decimals = y.decimals
  then { value = (Bigint.sub x.value y.value); decimals = (x.decimals) }
  else
    if x.decimals > y.decimals
    then
      (let decimals = x.decimals - y.decimals in
       {
         value =
           (let open Bigint in
              sub x.value (mul y.value (pow (of_int 10) decimals)));
         decimals = (x.decimals)
       })
    else
      (let decimals = y.decimals - x.decimals in
       {
         value =
           (let open Bigint in
              sub y.value (mul x.value (pow (of_int 10) decimals)));
         decimals = (y.decimals)
       })

let mul x y =
  {
    value = (Bigint.mul x.value y.value);
    decimals = (x.decimals + y.decimals)
  }

let elongateBy x decimals =
  {
    x with
    value =
      (let open Bigint in Bigint.mul x.value (pow (of_int 10) decimals))
  }

(* let truncate x decimals =
 *   let diff = x.decimals - decimals in
 *   { value = (let open Bigint in div x.value (pow (of_int 10) diff)); decimals
 *   } *)

let adjustDecimals (x : t) (y : t) =
  if x.decimals = y.decimals
  then (x, y)
  else
    if x.decimals > y.decimals
    then
      (let decimals = x.decimals - y.decimals in
       (x,
         {
           value =
             (Bigint.mul y.value (Bigint.pow (Bigint.of_int 10) decimals));
           decimals = (x.decimals)
         }))
    else
      (let decimals = y.decimals - x.decimals in
       ({
          value = (Bigint.mul x.value (Bigint.pow (Bigint.of_int 10) decimals));
          decimals = (y.decimals)
        }, y))

let div x y =
  if (x.decimals = 0) && (y.decimals = 0)
  then { value = (Bigint.div x.value y.value); decimals = (x.decimals) }
  else
    (let (x,y) = adjustDecimals x y in
     let xFirstNonZero = Bigint.firstNonZero x.value in
     let yFirstNonZero = Bigint.firstNonZero y.value in
     match (xFirstNonZero, yFirstNonZero) with
     | (((Some (xFirstNonZero))[@explicit_arity ]),((Some
        (yFirstNonZero))[@explicit_arity ])) ->
         if (xFirstNonZero >= x.decimals) && (yFirstNonZero >= y.decimals)
         then
           elongateBy
             { value = (Bigint.div x.value y.value); decimals = (x.decimals)
             } x.decimals
         else
           (let reposition =
              if xFirstNonZero > yFirstNonZero
              then y.decimals - yFirstNonZero
              else x.decimals - xFirstNonZero in
            let x = elongateBy x reposition in
            let y = elongateBy y reposition in
            elongateBy
              {
                value = (let open Bigint in div x.value y.value);
                decimals = (x.decimals)
              } x.decimals)
     | _ -> { x with value = Bigint.zero })

(** comparison *)
  
let compare x y =
  let (x,y) = adjustDecimals x y in Bigint.compare x.value y.value

let equal x y = (compare x y) = 0

let leq x y = (compare x y) < 1

let geq x y = (compare x y) > -1
            
let lt x y = (compare x y) < 0

let gt x y = (compare x y) > 0
           
let leqZero x = (Bigint.compare x.value Bigint.zero) <= 0

let geqZero x = (Bigint.compare x.value Bigint.zero) >= 0
              
let ltZero x = (Bigint.compare x.value Bigint.zero) < 0

let gtZero x = (Bigint.compare x.value Bigint.zero) > 0

let min x y = (if (compare x y) < 0 then y else x : t)

let max x y = (if (compare x y) < 0 then x else y : t)
