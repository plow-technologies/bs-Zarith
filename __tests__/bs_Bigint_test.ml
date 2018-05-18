open Jest
open Expect

let () = 

describe "Bigint" (fun () ->
  test "zero" (fun () ->
    expect @@ Bigint.zero' |> toEqual (Bigint.of_int 0));
                       
  test "one" (fun () ->
    expect @@ Bigint.one |> toEqual (Bigint.of_int 1));

  test "minus_one" (fun () ->
    expect @@ Bigint.minus_one |> toEqual (Bigint.of_int (-1)));
                       
  test "simple addition" (fun () ->
    let x = Bigint.of_int 1 in
    let y = Bigint.of_int 2 in
    let z = Bigint.add x y in
                       
    expect @@ z |> toEqual (Bigint.of_int 3));

  test "addition with negative numbers from string" (fun () ->    
    let x = Bigint.of_string "-1" in
    let y = Bigint.of_string "-2" in
    let z = Bigint.add x y in

    expect @@ z |> toEqual (Bigint.of_string "-3"));

  test "addition with negative numbers from int" (fun () ->
    let x = Bigint.of_int (-1) in
    let y = Bigint.of_int (-2) in
    let z = Bigint.add x y in

    expect @@ z |> toEqual (Bigint.of_int (-3)));

  test "addition with numbers larger than int64 can hold" (fun () ->
    let x = Bigint.of_string "1000000000000000000000000000000" in
    let y = Bigint.of_string "1000000000000000000000000000000" in
    let z = Bigint.add x y in

    expect @@ z |> toEqual (Bigint.of_string "2000000000000000000000000000000"));

  test "zero to string" (fun () ->
    expect @@ Bigint.to_string(Bigint.zero') |> toEqual "0");

  test "one to string" (fun () ->
    expect @@ Bigint.to_string(Bigint.one) |> toEqual "1");

  test "minus_one to string" (fun () ->
    expect @@ Bigint.to_string(Bigint.minus_one) |> toEqual "-1");

  test "big to string" (fun () ->
    expect @@ Bigint.to_string(Bigint.of_string "32389176649991293809043094891992939836566132213") |> toEqual "32389176649991293809043094891992939836566132213");
);
