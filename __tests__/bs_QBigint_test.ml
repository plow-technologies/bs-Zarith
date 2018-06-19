open Jest
open Expect

let () = 

describe "QBigint" (fun () ->
  test "zero equal to (Bigint.of_int 0)" (fun () ->
    expect @@ Q.RationalBigint.zero |> toEqual (Q.RationalBigint.zero)))
