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
    expect @@ ZInt.(rem (of_int (-7)) (of_int (-3))) |> toEqual (ZInt.of_int (-1)));


  test "ediv_rem 7 3" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int 7) (of_int 3)) |> toEqual (ZInt.(of_int 2, of_int 1)));

  test "ediv_rem 7 (-3)" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int 7) (of_int (-3))) |> toEqual (ZInt.(of_int (-2), of_int 1)));

  test "ediv_rem (-7) 3" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int (-7)) (of_int 3)) |> toEqual (ZInt.(of_int (-3), of_int 2)));

  test "ediv_rem (-7) (-3)" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int (-7)) (of_int (-3))) |> toEqual (ZInt.(of_int (-3), of_int 2)));

  test "ediv_rem (-8) 3" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int (-8)) (of_int 3)) |> toEqual (ZInt.(of_int (-3), of_int 1)));

  test "ediv_rem (-8) (-3)" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int (-8)) (of_int (-3))) |> toEqual (ZInt.(of_int (-3), of_int 1)));

  test "ediv_rem 9 3" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int 9) (of_int 3)) |> toEqual (ZInt.(of_int 3, of_int 0 )));

  test "ediv_rem 9 (-3)" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int 9) (of_int (-3))) |> toEqual (ZInt.(of_int (-3), zero )));

  test "ediv_rem (-9) 3" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int (-9)) (of_int 3)) |> toEqual (ZInt.(of_int (-3), of_int 0 )));

  test "ediv_rem (-9) (-3)" (fun () ->
    expect @@ ZInt.(ediv_rem (of_int (-9)) (of_int (-3))) |> toEqual (ZInt.(of_int (-3), zero )));


  test "is_even" (fun () ->
    expect @@ ZInt.(is_even (of_int (8))) |> toEqual true);  

  test "is_even" (fun () ->
    expect @@ ZInt.(is_even (of_int (9))) |> toEqual false);

  test "is_odd" (fun () ->
    expect @@ ZInt.(is_odd (of_int (8))) |> toEqual false);  

  test "is_odd" (fun () ->
    expect @@ ZInt.(is_odd (of_int (9))) |> toEqual true);
  
  )
