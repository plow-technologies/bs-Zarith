open Jest
open Expect
open Bigint

let () = 

describe "Bigint" (fun () ->
  test "addition" (fun () ->
    let x = Bigint.of_int 1 in
    let y = Bigint.of_int 2 in
    let z = Bigint.add x y in
                       
    expect @@ z |> toEqual (Bigint.of_int 3);

    let x' = Bigint.of_string "-1" in
    let y' = Bigint.of_string "-2" in
    let z' = Bigint.add x' y' in

    expect @@ z' |> toEqual (Bigint.of_string "-3");

    let x'' = Bigint.of_int (-1) in
    let y'' = Bigint.of_int (-2) in
    let z'' = Bigint.add x'' y'' in

    expect @@ z' |> toEqual (Bigint.of_int (-3));

));
