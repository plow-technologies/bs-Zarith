open Jest
open Expect

let () = 

describe "QBigint" (fun () ->
  test "zero equal to (Bigint.of_int 0)" (fun () ->
    expect @@ Q.QBigint.(sub (make (Z.Bigint.one) (Z.Bigint.of_int 2)) (make (Z.Bigint.of_int 1) (Z.Bigint.of_int 4)) ) |> toEqual (Q.QBigint.(make (Z.Bigint.of_int 1) (Z.Bigint.of_int 4)) ));

                        
  test "zero equal to (Bigint.of_int 0)" (fun () ->
    expect @@ Q.QBigint.zero |> toEqual (Q.QBigint.zero)))


(*

 *)
