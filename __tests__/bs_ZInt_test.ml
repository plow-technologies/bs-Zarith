open Jest
open Expect
open Z

let () = 

describe "Zint" (fun () ->
  test "rem" (fun () ->
    expect @@ ZInt.(rem (of_int 7) (of_int 3)) |> toEqual (ZInt.of_int 1));

  test "rem" (fun () ->
    expect @@ ZInt.(rem (of_int 7) (of_int (-3))) |> toEqual (ZInt.of_int 1));

  test "rem" (fun () ->
    expect @@ ZInt.(rem (of_int (-7)) (of_int 3)) |> toEqual (ZInt.of_int (-1)));

  test "rem" (fun () ->
    expect @@ ZInt.(rem (of_int (-7)) (of_int (-3))) |> toEqual (ZInt.of_int (-1))))





