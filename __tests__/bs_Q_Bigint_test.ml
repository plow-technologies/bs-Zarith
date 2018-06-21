open Jest
open Expect

let () = 

describe "QBigint" (fun () ->
  test "zero equal to (Bigint.of_int 0)" (fun () ->
    expect @@ Q.Bigint.(sub (make (Z.Bigint.one) (Z.Bigint.of_int 2)) (make (Z.Bigint.of_int 1) (Z.Bigint.of_int 4)) ) |> toEqual (Q.Bigint.(make (Z.Bigint.of_int 1) (Z.Bigint.of_int 4)) ));

                        
  test "zero equal to (Bigint.of_int 0)" (fun () ->
    expect @@ Q.Bigint.zero |> toEqual (Q.Bigint.zero)))


(*

 *)
