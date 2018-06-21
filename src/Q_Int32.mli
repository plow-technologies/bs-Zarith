module Q_Int32 : sig
  type t = Q_Internal.Q(Z.Int32).t = { num : Z.Int32.t; den : Z.Int32.t; }
  val mk : Z.Int32.t -> Z.Int32.t -> t
  val make_real : Z.Int32.t -> Z.Int32.t -> t
  val make : Z.Int32.t -> Z.Int32.t -> t
  val of_bigint : Z.Int32.t -> t
  val of_int : int -> t
  val of_int32 : Int32.t -> t
  val of_int64 : Int64.t -> t
  val of_nativeint : nativeint -> t
  val of_ints : int -> int -> t
  val zero : t
  val one : t
  val minus_one : t
  val inf : t
  val minus_inf : t
  val undef : t
  val of_float : float -> t
  val of_string : string -> t
  type kind = Q_Internal.Q(Z.Int32).kind = ZERO | INF | MINF | UNDEF | NZERO
  val classify : t -> kind
  val is_real : t -> bool
  val num : t -> Z.Int32.t
  val den : t -> Z.Int32.t
  val sign : t -> int
  val equal : t -> t -> bool
  val compare : t -> t -> int
  val min : t -> t -> t
  val max : t -> t -> t
  val leq : t -> t -> bool
  val geq : t -> t -> bool
  val lt : t -> t -> bool
  val gt : t -> t -> bool
  val to_string : t -> string
  val to_bigint : t -> Z.Int32.t
  val to_int : t -> int
  val to_int32 : t -> int32
  val to_int64 : t -> int64
  val to_nativeint : t -> nativeint
  val to_float : t -> float
  val neg : t -> t
  val abs : t -> t
  val aors : (Z.Int32.t -> Z.Int32.t -> Z.Int32.t) -> t -> t -> t
  val add : t -> t -> t
  val sub : t -> t -> t
  val mul : t -> t -> t
  val inv : t -> t
  val div : t -> t -> t
  val mul_2exp : t -> int -> t
  val div_2exp : t -> int -> t
  val print : t -> unit
  val output : out_channel -> t -> unit
  val sprint : unit -> t -> string
  val bprint : Buffer.t -> t -> unit
  val pp_print : Format.formatter -> t -> unit
  val ( ~- ) : t -> t
  val ( ~+ ) : 'a -> 'a
  val ( + ) : t -> t -> t
  val ( - ) : t -> t -> t
  val ( * ) : t -> t -> t
  val ( / ) : t -> t -> t
  val ( lsl ) : t -> int -> t
  val ( asr ) : t -> int -> t
  val ( ~$ ) : int -> t
  val ( // ) : int -> int -> t
  val ( ~$$ ) : Z.Int32.t -> t
  val ( /// ) : Z.Int32.t -> Z.Int32.t -> t
  val ( = ) : t -> t -> bool
  val ( < ) : t -> t -> bool
  val ( > ) : t -> t -> bool
  val ( <= ) : t -> t -> bool
  val ( >= ) : t -> t -> bool
  val ( <> ) : t -> t -> bool
end
