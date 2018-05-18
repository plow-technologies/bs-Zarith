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
    expect @@ Bigint.to_string(Bigint.of_string "32389176649991293809043094891992939836566132213") |> toEqual "32389176649991293809043094891992939836566132213"));

  test "pow" (fun () ->
    expect @@ Bigint.(pow (of_int 2) 0) |> toEqual (Bigint.of_int 1));

  test "pow" (fun () ->
    expect @@ Bigint.(pow (of_int 2) 1) |> toEqual (Bigint.of_int 2));

  test "pow" (fun () ->
    expect @@ Bigint.(pow (of_int 2) 2) |> toEqual (Bigint.of_int 4));

  test "pow" (fun () ->
    expect @@ Bigint.(pow (of_int 4) 4) |> toEqual (Bigint.of_int 256));

  (* test that div handles signs correctly *)
  test "div" (fun () ->
    expect @@ Bigint.(div (of_int 6) (of_int 3)) |> toEqual (Bigint.of_int 2));

  test "div" (fun () ->
    expect @@ Bigint.(div (of_int (-6)) (of_int 3)) |> toEqual (Bigint.of_int (-2)));

  test "div" (fun () ->
    expect @@ Bigint.(div (of_int 6) (of_int (-3))) |> toEqual (Bigint.of_int (-2)));

  test "div" (fun () ->
    expect @@ Bigint.(div (of_int (-6)) (of_int (-3))) |> toEqual (Bigint.of_int 2));

  test "div" (fun () ->
    expect @@ Bigint.(div (of_int 7) (of_int 3)) |> toEqual (Bigint.of_int 2));

  test "rem" (fun () ->
    expect @@ Bigint.(rem (of_int 7) (of_int 3)) |> toEqual (Bigint.of_int 1));

  test "rem" (fun () ->
    expect @@ Bigint.(rem (of_int 7) (of_int (-3))) |> toEqual (Bigint.of_int 1));

  test "rem" (fun () ->
    expect @@ Bigint.(rem (of_int (-7)) (of_int 3)) |> toEqual (Bigint.of_int (-1)));

  test "rem" (fun () ->
    expect @@ Bigint.(rem (of_int (-7)) (of_int (-3))) |> toEqual (Bigint.of_int (-1)));

  test "rem proof" (fun () ->
    let a = Bigint.of_int (-7) in
    let b = Bigint.of_int (-3) in
    let c = Bigint.(b * (div a b) + (rem a b)) in
    expect @@ a |> toEqual c);

  test "rem proof" (fun () ->
    let a = Bigint.of_int (21) in
    let b = Bigint.of_int (4) in
    let c = Bigint.(b * (div a b) + (rem a b)) in
    expect @@ a |> toEqual c);

  test "rem proof" (fun () ->
    let a = Bigint.of_int (-21) in
    let b = Bigint.of_int (4) in
    let c = Bigint.(b * (div a b) + (rem a b)) in
    expect @@ a |> toEqual c);

  test "div_rem" (fun () ->
    expect @@ Bigint.(div_rem (of_int 7) (of_int 3)) |> toEqual (Bigint.(of_int 2, of_int 1)));

  test "div_rem" (fun () ->
    expect @@ Bigint.(div_rem (of_int 7) (of_int (-3))) |> toEqual (Bigint.(of_int (-2), of_int 1)));

  test "div_rem" (fun () ->
    expect @@ Bigint.(div_rem (of_int (-7)) (of_int 3)) |> toEqual (Bigint.(of_int (-2), of_int (-1))));

  test "div_rem" (fun () ->
    expect @@ Bigint.(div_rem (of_int (-7)) (of_int (-3))) |> toEqual (Bigint.(of_int 2, of_int (-1))));
  
  test "pow" (fun () ->
    expect @@ Bigint.(pow (of_int 2) 2) |> toEqual (Bigint.of_int 4))
