open Jest
open Expect

let () = 

describe "QBigint" (fun () ->
  test "zero equal to (Bigint.of_int 0)" (fun () ->
    expect @@ Q.RationalBigint.(sub (make (Z.ZBigint.one) (Z.ZBigint.of_int 2)) (make (Z.ZBigint.of_int 1) (Z.ZBigint.of_int 4)) ) |> toEqual (Q.RationalBigint.(make (Z.ZBigint.of_int 1) (Z.ZBigint.of_int 4)) ));

                        
  test "zero equal to (Bigint.of_int 0)" (fun () ->
    expect @@ Q.RationalBigint.zero |> toEqual (Q.RationalBigint.zero)))


(*

 *)
