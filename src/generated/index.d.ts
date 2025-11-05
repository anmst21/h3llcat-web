
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserData
 * 
 */
export type UserData = $Result.DefaultSelection<Prisma.$UserDataPayload>
/**
 * Model MintReceiptJson
 * 
 */
export type MintReceiptJson = $Result.DefaultSelection<Prisma.$MintReceiptJsonPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserData
 * const userData = await prisma.userData.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserData
   * const userData = await prisma.userData.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.userData`: Exposes CRUD operations for the **UserData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserData
    * const userData = await prisma.userData.findMany()
    * ```
    */
  get userData(): Prisma.UserDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mintReceiptJson`: Exposes CRUD operations for the **MintReceiptJson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MintReceiptJsons
    * const mintReceiptJsons = await prisma.mintReceiptJson.findMany()
    * ```
    */
  get mintReceiptJson(): Prisma.MintReceiptJsonDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserData: 'UserData',
    MintReceiptJson: 'MintReceiptJson'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "userData" | "mintReceiptJson"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserData: {
        payload: Prisma.$UserDataPayload<ExtArgs>
        fields: Prisma.UserDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>
          }
          findFirst: {
            args: Prisma.UserDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>
          }
          findMany: {
            args: Prisma.UserDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>[]
          }
          create: {
            args: Prisma.UserDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>
          }
          createMany: {
            args: Prisma.UserDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>[]
          }
          delete: {
            args: Prisma.UserDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>
          }
          update: {
            args: Prisma.UserDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>
          }
          deleteMany: {
            args: Prisma.UserDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>[]
          }
          upsert: {
            args: Prisma.UserDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDataPayload>
          }
          aggregate: {
            args: Prisma.UserDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserData>
          }
          groupBy: {
            args: Prisma.UserDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDataCountArgs<ExtArgs>
            result: $Utils.Optional<UserDataCountAggregateOutputType> | number
          }
        }
      }
      MintReceiptJson: {
        payload: Prisma.$MintReceiptJsonPayload<ExtArgs>
        fields: Prisma.MintReceiptJsonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MintReceiptJsonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MintReceiptJsonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>
          }
          findFirst: {
            args: Prisma.MintReceiptJsonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MintReceiptJsonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>
          }
          findMany: {
            args: Prisma.MintReceiptJsonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>[]
          }
          create: {
            args: Prisma.MintReceiptJsonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>
          }
          createMany: {
            args: Prisma.MintReceiptJsonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MintReceiptJsonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>[]
          }
          delete: {
            args: Prisma.MintReceiptJsonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>
          }
          update: {
            args: Prisma.MintReceiptJsonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>
          }
          deleteMany: {
            args: Prisma.MintReceiptJsonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MintReceiptJsonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MintReceiptJsonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>[]
          }
          upsert: {
            args: Prisma.MintReceiptJsonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintReceiptJsonPayload>
          }
          aggregate: {
            args: Prisma.MintReceiptJsonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMintReceiptJson>
          }
          groupBy: {
            args: Prisma.MintReceiptJsonGroupByArgs<ExtArgs>
            result: $Utils.Optional<MintReceiptJsonGroupByOutputType>[]
          }
          count: {
            args: Prisma.MintReceiptJsonCountArgs<ExtArgs>
            result: $Utils.Optional<MintReceiptJsonCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    userData?: UserDataOmit
    mintReceiptJson?: MintReceiptJsonOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserDataCountOutputType
   */

  export type UserDataCountOutputType = {
    MintReceiptJson: number
  }

  export type UserDataCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MintReceiptJson?: boolean | UserDataCountOutputTypeCountMintReceiptJsonArgs
  }

  // Custom InputTypes
  /**
   * UserDataCountOutputType without action
   */
  export type UserDataCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDataCountOutputType
     */
    select?: UserDataCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserDataCountOutputType without action
   */
  export type UserDataCountOutputTypeCountMintReceiptJsonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MintReceiptJsonWhereInput
  }


  /**
   * Models
   */

  /**
   * Model UserData
   */

  export type AggregateUserData = {
    _count: UserDataCountAggregateOutputType | null
    _avg: UserDataAvgAggregateOutputType | null
    _sum: UserDataSumAggregateOutputType | null
    _min: UserDataMinAggregateOutputType | null
    _max: UserDataMaxAggregateOutputType | null
  }

  export type UserDataAvgAggregateOutputType = {
    id: number | null
  }

  export type UserDataSumAggregateOutputType = {
    id: number | null
  }

  export type UserDataMinAggregateOutputType = {
    id: number | null
    did: string | null
    email: string | null
    isMinted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserDataMaxAggregateOutputType = {
    id: number | null
    did: string | null
    email: string | null
    isMinted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserDataCountAggregateOutputType = {
    id: number
    did: number
    email: number
    isMinted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserDataAvgAggregateInputType = {
    id?: true
  }

  export type UserDataSumAggregateInputType = {
    id?: true
  }

  export type UserDataMinAggregateInputType = {
    id?: true
    did?: true
    email?: true
    isMinted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserDataMaxAggregateInputType = {
    id?: true
    did?: true
    email?: true
    isMinted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserDataCountAggregateInputType = {
    id?: true
    did?: true
    email?: true
    isMinted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserData to aggregate.
     */
    where?: UserDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserData to fetch.
     */
    orderBy?: UserDataOrderByWithRelationInput | UserDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserData
    **/
    _count?: true | UserDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDataMaxAggregateInputType
  }

  export type GetUserDataAggregateType<T extends UserDataAggregateArgs> = {
        [P in keyof T & keyof AggregateUserData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserData[P]>
      : GetScalarType<T[P], AggregateUserData[P]>
  }




  export type UserDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDataWhereInput
    orderBy?: UserDataOrderByWithAggregationInput | UserDataOrderByWithAggregationInput[]
    by: UserDataScalarFieldEnum[] | UserDataScalarFieldEnum
    having?: UserDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDataCountAggregateInputType | true
    _avg?: UserDataAvgAggregateInputType
    _sum?: UserDataSumAggregateInputType
    _min?: UserDataMinAggregateInputType
    _max?: UserDataMaxAggregateInputType
  }

  export type UserDataGroupByOutputType = {
    id: number
    did: string
    email: string | null
    isMinted: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserDataCountAggregateOutputType | null
    _avg: UserDataAvgAggregateOutputType | null
    _sum: UserDataSumAggregateOutputType | null
    _min: UserDataMinAggregateOutputType | null
    _max: UserDataMaxAggregateOutputType | null
  }

  type GetUserDataGroupByPayload<T extends UserDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDataGroupByOutputType[P]>
            : GetScalarType<T[P], UserDataGroupByOutputType[P]>
        }
      >
    >


  export type UserDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    did?: boolean
    email?: boolean
    isMinted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    MintReceiptJson?: boolean | UserData$MintReceiptJsonArgs<ExtArgs>
    _count?: boolean | UserDataCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userData"]>

  export type UserDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    did?: boolean
    email?: boolean
    isMinted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userData"]>

  export type UserDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    did?: boolean
    email?: boolean
    isMinted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userData"]>

  export type UserDataSelectScalar = {
    id?: boolean
    did?: boolean
    email?: boolean
    isMinted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "did" | "email" | "isMinted" | "createdAt" | "updatedAt", ExtArgs["result"]["userData"]>
  export type UserDataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MintReceiptJson?: boolean | UserData$MintReceiptJsonArgs<ExtArgs>
    _count?: boolean | UserDataCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserDataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserDataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserData"
    objects: {
      MintReceiptJson: Prisma.$MintReceiptJsonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      did: string
      email: string | null
      isMinted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userData"]>
    composites: {}
  }

  type UserDataGetPayload<S extends boolean | null | undefined | UserDataDefaultArgs> = $Result.GetResult<Prisma.$UserDataPayload, S>

  type UserDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDataCountAggregateInputType | true
    }

  export interface UserDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserData'], meta: { name: 'UserData' } }
    /**
     * Find zero or one UserData that matches the filter.
     * @param {UserDataFindUniqueArgs} args - Arguments to find a UserData
     * @example
     * // Get one UserData
     * const userData = await prisma.userData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDataFindUniqueArgs>(args: SelectSubset<T, UserDataFindUniqueArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDataFindUniqueOrThrowArgs} args - Arguments to find a UserData
     * @example
     * // Get one UserData
     * const userData = await prisma.userData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDataFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDataFindFirstArgs} args - Arguments to find a UserData
     * @example
     * // Get one UserData
     * const userData = await prisma.userData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDataFindFirstArgs>(args?: SelectSubset<T, UserDataFindFirstArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDataFindFirstOrThrowArgs} args - Arguments to find a UserData
     * @example
     * // Get one UserData
     * const userData = await prisma.userData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDataFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserData
     * const userData = await prisma.userData.findMany()
     * 
     * // Get first 10 UserData
     * const userData = await prisma.userData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userDataWithIdOnly = await prisma.userData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserDataFindManyArgs>(args?: SelectSubset<T, UserDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserData.
     * @param {UserDataCreateArgs} args - Arguments to create a UserData.
     * @example
     * // Create one UserData
     * const UserData = await prisma.userData.create({
     *   data: {
     *     // ... data to create a UserData
     *   }
     * })
     * 
     */
    create<T extends UserDataCreateArgs>(args: SelectSubset<T, UserDataCreateArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserData.
     * @param {UserDataCreateManyArgs} args - Arguments to create many UserData.
     * @example
     * // Create many UserData
     * const userData = await prisma.userData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDataCreateManyArgs>(args?: SelectSubset<T, UserDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserData and returns the data saved in the database.
     * @param {UserDataCreateManyAndReturnArgs} args - Arguments to create many UserData.
     * @example
     * // Create many UserData
     * const userData = await prisma.userData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserData and only return the `id`
     * const userDataWithIdOnly = await prisma.userData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserDataCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserData.
     * @param {UserDataDeleteArgs} args - Arguments to delete one UserData.
     * @example
     * // Delete one UserData
     * const UserData = await prisma.userData.delete({
     *   where: {
     *     // ... filter to delete one UserData
     *   }
     * })
     * 
     */
    delete<T extends UserDataDeleteArgs>(args: SelectSubset<T, UserDataDeleteArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserData.
     * @param {UserDataUpdateArgs} args - Arguments to update one UserData.
     * @example
     * // Update one UserData
     * const userData = await prisma.userData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDataUpdateArgs>(args: SelectSubset<T, UserDataUpdateArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserData.
     * @param {UserDataDeleteManyArgs} args - Arguments to filter UserData to delete.
     * @example
     * // Delete a few UserData
     * const { count } = await prisma.userData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDataDeleteManyArgs>(args?: SelectSubset<T, UserDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserData
     * const userData = await prisma.userData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDataUpdateManyArgs>(args: SelectSubset<T, UserDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserData and returns the data updated in the database.
     * @param {UserDataUpdateManyAndReturnArgs} args - Arguments to update many UserData.
     * @example
     * // Update many UserData
     * const userData = await prisma.userData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserData and only return the `id`
     * const userDataWithIdOnly = await prisma.userData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserDataUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserData.
     * @param {UserDataUpsertArgs} args - Arguments to update or create a UserData.
     * @example
     * // Update or create a UserData
     * const userData = await prisma.userData.upsert({
     *   create: {
     *     // ... data to create a UserData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserData we want to update
     *   }
     * })
     */
    upsert<T extends UserDataUpsertArgs>(args: SelectSubset<T, UserDataUpsertArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDataCountArgs} args - Arguments to filter UserData to count.
     * @example
     * // Count the number of UserData
     * const count = await prisma.userData.count({
     *   where: {
     *     // ... the filter for the UserData we want to count
     *   }
     * })
    **/
    count<T extends UserDataCountArgs>(
      args?: Subset<T, UserDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDataAggregateArgs>(args: Subset<T, UserDataAggregateArgs>): Prisma.PrismaPromise<GetUserDataAggregateType<T>>

    /**
     * Group by UserData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDataGroupByArgs['orderBy'] }
        : { orderBy?: UserDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserData model
   */
  readonly fields: UserDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    MintReceiptJson<T extends UserData$MintReceiptJsonArgs<ExtArgs> = {}>(args?: Subset<T, UserData$MintReceiptJsonArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserData model
   */
  interface UserDataFieldRefs {
    readonly id: FieldRef<"UserData", 'Int'>
    readonly did: FieldRef<"UserData", 'String'>
    readonly email: FieldRef<"UserData", 'String'>
    readonly isMinted: FieldRef<"UserData", 'Boolean'>
    readonly createdAt: FieldRef<"UserData", 'DateTime'>
    readonly updatedAt: FieldRef<"UserData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserData findUnique
   */
  export type UserDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * Filter, which UserData to fetch.
     */
    where: UserDataWhereUniqueInput
  }

  /**
   * UserData findUniqueOrThrow
   */
  export type UserDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * Filter, which UserData to fetch.
     */
    where: UserDataWhereUniqueInput
  }

  /**
   * UserData findFirst
   */
  export type UserDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * Filter, which UserData to fetch.
     */
    where?: UserDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserData to fetch.
     */
    orderBy?: UserDataOrderByWithRelationInput | UserDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserData.
     */
    cursor?: UserDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserData.
     */
    distinct?: UserDataScalarFieldEnum | UserDataScalarFieldEnum[]
  }

  /**
   * UserData findFirstOrThrow
   */
  export type UserDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * Filter, which UserData to fetch.
     */
    where?: UserDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserData to fetch.
     */
    orderBy?: UserDataOrderByWithRelationInput | UserDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserData.
     */
    cursor?: UserDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserData.
     */
    distinct?: UserDataScalarFieldEnum | UserDataScalarFieldEnum[]
  }

  /**
   * UserData findMany
   */
  export type UserDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * Filter, which UserData to fetch.
     */
    where?: UserDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserData to fetch.
     */
    orderBy?: UserDataOrderByWithRelationInput | UserDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserData.
     */
    cursor?: UserDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserData.
     */
    skip?: number
    distinct?: UserDataScalarFieldEnum | UserDataScalarFieldEnum[]
  }

  /**
   * UserData create
   */
  export type UserDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * The data needed to create a UserData.
     */
    data: XOR<UserDataCreateInput, UserDataUncheckedCreateInput>
  }

  /**
   * UserData createMany
   */
  export type UserDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserData.
     */
    data: UserDataCreateManyInput | UserDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserData createManyAndReturn
   */
  export type UserDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * The data used to create many UserData.
     */
    data: UserDataCreateManyInput | UserDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserData update
   */
  export type UserDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * The data needed to update a UserData.
     */
    data: XOR<UserDataUpdateInput, UserDataUncheckedUpdateInput>
    /**
     * Choose, which UserData to update.
     */
    where: UserDataWhereUniqueInput
  }

  /**
   * UserData updateMany
   */
  export type UserDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserData.
     */
    data: XOR<UserDataUpdateManyMutationInput, UserDataUncheckedUpdateManyInput>
    /**
     * Filter which UserData to update
     */
    where?: UserDataWhereInput
    /**
     * Limit how many UserData to update.
     */
    limit?: number
  }

  /**
   * UserData updateManyAndReturn
   */
  export type UserDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * The data used to update UserData.
     */
    data: XOR<UserDataUpdateManyMutationInput, UserDataUncheckedUpdateManyInput>
    /**
     * Filter which UserData to update
     */
    where?: UserDataWhereInput
    /**
     * Limit how many UserData to update.
     */
    limit?: number
  }

  /**
   * UserData upsert
   */
  export type UserDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * The filter to search for the UserData to update in case it exists.
     */
    where: UserDataWhereUniqueInput
    /**
     * In case the UserData found by the `where` argument doesn't exist, create a new UserData with this data.
     */
    create: XOR<UserDataCreateInput, UserDataUncheckedCreateInput>
    /**
     * In case the UserData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDataUpdateInput, UserDataUncheckedUpdateInput>
  }

  /**
   * UserData delete
   */
  export type UserDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
    /**
     * Filter which UserData to delete.
     */
    where: UserDataWhereUniqueInput
  }

  /**
   * UserData deleteMany
   */
  export type UserDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserData to delete
     */
    where?: UserDataWhereInput
    /**
     * Limit how many UserData to delete.
     */
    limit?: number
  }

  /**
   * UserData.MintReceiptJson
   */
  export type UserData$MintReceiptJsonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    where?: MintReceiptJsonWhereInput
    orderBy?: MintReceiptJsonOrderByWithRelationInput | MintReceiptJsonOrderByWithRelationInput[]
    cursor?: MintReceiptJsonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MintReceiptJsonScalarFieldEnum | MintReceiptJsonScalarFieldEnum[]
  }

  /**
   * UserData without action
   */
  export type UserDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserData
     */
    omit?: UserDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDataInclude<ExtArgs> | null
  }


  /**
   * Model MintReceiptJson
   */

  export type AggregateMintReceiptJson = {
    _count: MintReceiptJsonCountAggregateOutputType | null
    _avg: MintReceiptJsonAvgAggregateOutputType | null
    _sum: MintReceiptJsonSumAggregateOutputType | null
    _min: MintReceiptJsonMinAggregateOutputType | null
    _max: MintReceiptJsonMaxAggregateOutputType | null
  }

  export type MintReceiptJsonAvgAggregateOutputType = {
    userId: number | null
  }

  export type MintReceiptJsonSumAggregateOutputType = {
    userId: number | null
  }

  export type MintReceiptJsonMinAggregateOutputType = {
    id: string | null
    userId: number | null
    txHash: string | null
    createdAt: Date | null
  }

  export type MintReceiptJsonMaxAggregateOutputType = {
    id: string | null
    userId: number | null
    txHash: string | null
    createdAt: Date | null
  }

  export type MintReceiptJsonCountAggregateOutputType = {
    id: number
    userId: number
    txHash: number
    raw: number
    createdAt: number
    _all: number
  }


  export type MintReceiptJsonAvgAggregateInputType = {
    userId?: true
  }

  export type MintReceiptJsonSumAggregateInputType = {
    userId?: true
  }

  export type MintReceiptJsonMinAggregateInputType = {
    id?: true
    userId?: true
    txHash?: true
    createdAt?: true
  }

  export type MintReceiptJsonMaxAggregateInputType = {
    id?: true
    userId?: true
    txHash?: true
    createdAt?: true
  }

  export type MintReceiptJsonCountAggregateInputType = {
    id?: true
    userId?: true
    txHash?: true
    raw?: true
    createdAt?: true
    _all?: true
  }

  export type MintReceiptJsonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MintReceiptJson to aggregate.
     */
    where?: MintReceiptJsonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MintReceiptJsons to fetch.
     */
    orderBy?: MintReceiptJsonOrderByWithRelationInput | MintReceiptJsonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MintReceiptJsonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MintReceiptJsons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MintReceiptJsons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MintReceiptJsons
    **/
    _count?: true | MintReceiptJsonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MintReceiptJsonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MintReceiptJsonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MintReceiptJsonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MintReceiptJsonMaxAggregateInputType
  }

  export type GetMintReceiptJsonAggregateType<T extends MintReceiptJsonAggregateArgs> = {
        [P in keyof T & keyof AggregateMintReceiptJson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMintReceiptJson[P]>
      : GetScalarType<T[P], AggregateMintReceiptJson[P]>
  }




  export type MintReceiptJsonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MintReceiptJsonWhereInput
    orderBy?: MintReceiptJsonOrderByWithAggregationInput | MintReceiptJsonOrderByWithAggregationInput[]
    by: MintReceiptJsonScalarFieldEnum[] | MintReceiptJsonScalarFieldEnum
    having?: MintReceiptJsonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MintReceiptJsonCountAggregateInputType | true
    _avg?: MintReceiptJsonAvgAggregateInputType
    _sum?: MintReceiptJsonSumAggregateInputType
    _min?: MintReceiptJsonMinAggregateInputType
    _max?: MintReceiptJsonMaxAggregateInputType
  }

  export type MintReceiptJsonGroupByOutputType = {
    id: string
    userId: number
    txHash: string
    raw: JsonValue
    createdAt: Date
    _count: MintReceiptJsonCountAggregateOutputType | null
    _avg: MintReceiptJsonAvgAggregateOutputType | null
    _sum: MintReceiptJsonSumAggregateOutputType | null
    _min: MintReceiptJsonMinAggregateOutputType | null
    _max: MintReceiptJsonMaxAggregateOutputType | null
  }

  type GetMintReceiptJsonGroupByPayload<T extends MintReceiptJsonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MintReceiptJsonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MintReceiptJsonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MintReceiptJsonGroupByOutputType[P]>
            : GetScalarType<T[P], MintReceiptJsonGroupByOutputType[P]>
        }
      >
    >


  export type MintReceiptJsonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    txHash?: boolean
    raw?: boolean
    createdAt?: boolean
    user?: boolean | UserDataDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mintReceiptJson"]>

  export type MintReceiptJsonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    txHash?: boolean
    raw?: boolean
    createdAt?: boolean
    user?: boolean | UserDataDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mintReceiptJson"]>

  export type MintReceiptJsonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    txHash?: boolean
    raw?: boolean
    createdAt?: boolean
    user?: boolean | UserDataDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mintReceiptJson"]>

  export type MintReceiptJsonSelectScalar = {
    id?: boolean
    userId?: boolean
    txHash?: boolean
    raw?: boolean
    createdAt?: boolean
  }

  export type MintReceiptJsonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "txHash" | "raw" | "createdAt", ExtArgs["result"]["mintReceiptJson"]>
  export type MintReceiptJsonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDataDefaultArgs<ExtArgs>
  }
  export type MintReceiptJsonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDataDefaultArgs<ExtArgs>
  }
  export type MintReceiptJsonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDataDefaultArgs<ExtArgs>
  }

  export type $MintReceiptJsonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MintReceiptJson"
    objects: {
      user: Prisma.$UserDataPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: number
      txHash: string
      raw: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["mintReceiptJson"]>
    composites: {}
  }

  type MintReceiptJsonGetPayload<S extends boolean | null | undefined | MintReceiptJsonDefaultArgs> = $Result.GetResult<Prisma.$MintReceiptJsonPayload, S>

  type MintReceiptJsonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MintReceiptJsonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MintReceiptJsonCountAggregateInputType | true
    }

  export interface MintReceiptJsonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MintReceiptJson'], meta: { name: 'MintReceiptJson' } }
    /**
     * Find zero or one MintReceiptJson that matches the filter.
     * @param {MintReceiptJsonFindUniqueArgs} args - Arguments to find a MintReceiptJson
     * @example
     * // Get one MintReceiptJson
     * const mintReceiptJson = await prisma.mintReceiptJson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MintReceiptJsonFindUniqueArgs>(args: SelectSubset<T, MintReceiptJsonFindUniqueArgs<ExtArgs>>): Prisma__MintReceiptJsonClient<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MintReceiptJson that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MintReceiptJsonFindUniqueOrThrowArgs} args - Arguments to find a MintReceiptJson
     * @example
     * // Get one MintReceiptJson
     * const mintReceiptJson = await prisma.mintReceiptJson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MintReceiptJsonFindUniqueOrThrowArgs>(args: SelectSubset<T, MintReceiptJsonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MintReceiptJsonClient<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MintReceiptJson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintReceiptJsonFindFirstArgs} args - Arguments to find a MintReceiptJson
     * @example
     * // Get one MintReceiptJson
     * const mintReceiptJson = await prisma.mintReceiptJson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MintReceiptJsonFindFirstArgs>(args?: SelectSubset<T, MintReceiptJsonFindFirstArgs<ExtArgs>>): Prisma__MintReceiptJsonClient<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MintReceiptJson that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintReceiptJsonFindFirstOrThrowArgs} args - Arguments to find a MintReceiptJson
     * @example
     * // Get one MintReceiptJson
     * const mintReceiptJson = await prisma.mintReceiptJson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MintReceiptJsonFindFirstOrThrowArgs>(args?: SelectSubset<T, MintReceiptJsonFindFirstOrThrowArgs<ExtArgs>>): Prisma__MintReceiptJsonClient<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MintReceiptJsons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintReceiptJsonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MintReceiptJsons
     * const mintReceiptJsons = await prisma.mintReceiptJson.findMany()
     * 
     * // Get first 10 MintReceiptJsons
     * const mintReceiptJsons = await prisma.mintReceiptJson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mintReceiptJsonWithIdOnly = await prisma.mintReceiptJson.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MintReceiptJsonFindManyArgs>(args?: SelectSubset<T, MintReceiptJsonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MintReceiptJson.
     * @param {MintReceiptJsonCreateArgs} args - Arguments to create a MintReceiptJson.
     * @example
     * // Create one MintReceiptJson
     * const MintReceiptJson = await prisma.mintReceiptJson.create({
     *   data: {
     *     // ... data to create a MintReceiptJson
     *   }
     * })
     * 
     */
    create<T extends MintReceiptJsonCreateArgs>(args: SelectSubset<T, MintReceiptJsonCreateArgs<ExtArgs>>): Prisma__MintReceiptJsonClient<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MintReceiptJsons.
     * @param {MintReceiptJsonCreateManyArgs} args - Arguments to create many MintReceiptJsons.
     * @example
     * // Create many MintReceiptJsons
     * const mintReceiptJson = await prisma.mintReceiptJson.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MintReceiptJsonCreateManyArgs>(args?: SelectSubset<T, MintReceiptJsonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MintReceiptJsons and returns the data saved in the database.
     * @param {MintReceiptJsonCreateManyAndReturnArgs} args - Arguments to create many MintReceiptJsons.
     * @example
     * // Create many MintReceiptJsons
     * const mintReceiptJson = await prisma.mintReceiptJson.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MintReceiptJsons and only return the `id`
     * const mintReceiptJsonWithIdOnly = await prisma.mintReceiptJson.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MintReceiptJsonCreateManyAndReturnArgs>(args?: SelectSubset<T, MintReceiptJsonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MintReceiptJson.
     * @param {MintReceiptJsonDeleteArgs} args - Arguments to delete one MintReceiptJson.
     * @example
     * // Delete one MintReceiptJson
     * const MintReceiptJson = await prisma.mintReceiptJson.delete({
     *   where: {
     *     // ... filter to delete one MintReceiptJson
     *   }
     * })
     * 
     */
    delete<T extends MintReceiptJsonDeleteArgs>(args: SelectSubset<T, MintReceiptJsonDeleteArgs<ExtArgs>>): Prisma__MintReceiptJsonClient<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MintReceiptJson.
     * @param {MintReceiptJsonUpdateArgs} args - Arguments to update one MintReceiptJson.
     * @example
     * // Update one MintReceiptJson
     * const mintReceiptJson = await prisma.mintReceiptJson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MintReceiptJsonUpdateArgs>(args: SelectSubset<T, MintReceiptJsonUpdateArgs<ExtArgs>>): Prisma__MintReceiptJsonClient<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MintReceiptJsons.
     * @param {MintReceiptJsonDeleteManyArgs} args - Arguments to filter MintReceiptJsons to delete.
     * @example
     * // Delete a few MintReceiptJsons
     * const { count } = await prisma.mintReceiptJson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MintReceiptJsonDeleteManyArgs>(args?: SelectSubset<T, MintReceiptJsonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MintReceiptJsons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintReceiptJsonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MintReceiptJsons
     * const mintReceiptJson = await prisma.mintReceiptJson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MintReceiptJsonUpdateManyArgs>(args: SelectSubset<T, MintReceiptJsonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MintReceiptJsons and returns the data updated in the database.
     * @param {MintReceiptJsonUpdateManyAndReturnArgs} args - Arguments to update many MintReceiptJsons.
     * @example
     * // Update many MintReceiptJsons
     * const mintReceiptJson = await prisma.mintReceiptJson.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MintReceiptJsons and only return the `id`
     * const mintReceiptJsonWithIdOnly = await prisma.mintReceiptJson.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MintReceiptJsonUpdateManyAndReturnArgs>(args: SelectSubset<T, MintReceiptJsonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MintReceiptJson.
     * @param {MintReceiptJsonUpsertArgs} args - Arguments to update or create a MintReceiptJson.
     * @example
     * // Update or create a MintReceiptJson
     * const mintReceiptJson = await prisma.mintReceiptJson.upsert({
     *   create: {
     *     // ... data to create a MintReceiptJson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MintReceiptJson we want to update
     *   }
     * })
     */
    upsert<T extends MintReceiptJsonUpsertArgs>(args: SelectSubset<T, MintReceiptJsonUpsertArgs<ExtArgs>>): Prisma__MintReceiptJsonClient<$Result.GetResult<Prisma.$MintReceiptJsonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MintReceiptJsons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintReceiptJsonCountArgs} args - Arguments to filter MintReceiptJsons to count.
     * @example
     * // Count the number of MintReceiptJsons
     * const count = await prisma.mintReceiptJson.count({
     *   where: {
     *     // ... the filter for the MintReceiptJsons we want to count
     *   }
     * })
    **/
    count<T extends MintReceiptJsonCountArgs>(
      args?: Subset<T, MintReceiptJsonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MintReceiptJsonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MintReceiptJson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintReceiptJsonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MintReceiptJsonAggregateArgs>(args: Subset<T, MintReceiptJsonAggregateArgs>): Prisma.PrismaPromise<GetMintReceiptJsonAggregateType<T>>

    /**
     * Group by MintReceiptJson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintReceiptJsonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MintReceiptJsonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MintReceiptJsonGroupByArgs['orderBy'] }
        : { orderBy?: MintReceiptJsonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MintReceiptJsonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMintReceiptJsonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MintReceiptJson model
   */
  readonly fields: MintReceiptJsonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MintReceiptJson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MintReceiptJsonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDataDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDataDefaultArgs<ExtArgs>>): Prisma__UserDataClient<$Result.GetResult<Prisma.$UserDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MintReceiptJson model
   */
  interface MintReceiptJsonFieldRefs {
    readonly id: FieldRef<"MintReceiptJson", 'String'>
    readonly userId: FieldRef<"MintReceiptJson", 'Int'>
    readonly txHash: FieldRef<"MintReceiptJson", 'String'>
    readonly raw: FieldRef<"MintReceiptJson", 'Json'>
    readonly createdAt: FieldRef<"MintReceiptJson", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MintReceiptJson findUnique
   */
  export type MintReceiptJsonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * Filter, which MintReceiptJson to fetch.
     */
    where: MintReceiptJsonWhereUniqueInput
  }

  /**
   * MintReceiptJson findUniqueOrThrow
   */
  export type MintReceiptJsonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * Filter, which MintReceiptJson to fetch.
     */
    where: MintReceiptJsonWhereUniqueInput
  }

  /**
   * MintReceiptJson findFirst
   */
  export type MintReceiptJsonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * Filter, which MintReceiptJson to fetch.
     */
    where?: MintReceiptJsonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MintReceiptJsons to fetch.
     */
    orderBy?: MintReceiptJsonOrderByWithRelationInput | MintReceiptJsonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MintReceiptJsons.
     */
    cursor?: MintReceiptJsonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MintReceiptJsons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MintReceiptJsons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MintReceiptJsons.
     */
    distinct?: MintReceiptJsonScalarFieldEnum | MintReceiptJsonScalarFieldEnum[]
  }

  /**
   * MintReceiptJson findFirstOrThrow
   */
  export type MintReceiptJsonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * Filter, which MintReceiptJson to fetch.
     */
    where?: MintReceiptJsonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MintReceiptJsons to fetch.
     */
    orderBy?: MintReceiptJsonOrderByWithRelationInput | MintReceiptJsonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MintReceiptJsons.
     */
    cursor?: MintReceiptJsonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MintReceiptJsons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MintReceiptJsons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MintReceiptJsons.
     */
    distinct?: MintReceiptJsonScalarFieldEnum | MintReceiptJsonScalarFieldEnum[]
  }

  /**
   * MintReceiptJson findMany
   */
  export type MintReceiptJsonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * Filter, which MintReceiptJsons to fetch.
     */
    where?: MintReceiptJsonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MintReceiptJsons to fetch.
     */
    orderBy?: MintReceiptJsonOrderByWithRelationInput | MintReceiptJsonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MintReceiptJsons.
     */
    cursor?: MintReceiptJsonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MintReceiptJsons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MintReceiptJsons.
     */
    skip?: number
    distinct?: MintReceiptJsonScalarFieldEnum | MintReceiptJsonScalarFieldEnum[]
  }

  /**
   * MintReceiptJson create
   */
  export type MintReceiptJsonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * The data needed to create a MintReceiptJson.
     */
    data: XOR<MintReceiptJsonCreateInput, MintReceiptJsonUncheckedCreateInput>
  }

  /**
   * MintReceiptJson createMany
   */
  export type MintReceiptJsonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MintReceiptJsons.
     */
    data: MintReceiptJsonCreateManyInput | MintReceiptJsonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MintReceiptJson createManyAndReturn
   */
  export type MintReceiptJsonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * The data used to create many MintReceiptJsons.
     */
    data: MintReceiptJsonCreateManyInput | MintReceiptJsonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MintReceiptJson update
   */
  export type MintReceiptJsonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * The data needed to update a MintReceiptJson.
     */
    data: XOR<MintReceiptJsonUpdateInput, MintReceiptJsonUncheckedUpdateInput>
    /**
     * Choose, which MintReceiptJson to update.
     */
    where: MintReceiptJsonWhereUniqueInput
  }

  /**
   * MintReceiptJson updateMany
   */
  export type MintReceiptJsonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MintReceiptJsons.
     */
    data: XOR<MintReceiptJsonUpdateManyMutationInput, MintReceiptJsonUncheckedUpdateManyInput>
    /**
     * Filter which MintReceiptJsons to update
     */
    where?: MintReceiptJsonWhereInput
    /**
     * Limit how many MintReceiptJsons to update.
     */
    limit?: number
  }

  /**
   * MintReceiptJson updateManyAndReturn
   */
  export type MintReceiptJsonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * The data used to update MintReceiptJsons.
     */
    data: XOR<MintReceiptJsonUpdateManyMutationInput, MintReceiptJsonUncheckedUpdateManyInput>
    /**
     * Filter which MintReceiptJsons to update
     */
    where?: MintReceiptJsonWhereInput
    /**
     * Limit how many MintReceiptJsons to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MintReceiptJson upsert
   */
  export type MintReceiptJsonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * The filter to search for the MintReceiptJson to update in case it exists.
     */
    where: MintReceiptJsonWhereUniqueInput
    /**
     * In case the MintReceiptJson found by the `where` argument doesn't exist, create a new MintReceiptJson with this data.
     */
    create: XOR<MintReceiptJsonCreateInput, MintReceiptJsonUncheckedCreateInput>
    /**
     * In case the MintReceiptJson was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MintReceiptJsonUpdateInput, MintReceiptJsonUncheckedUpdateInput>
  }

  /**
   * MintReceiptJson delete
   */
  export type MintReceiptJsonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
    /**
     * Filter which MintReceiptJson to delete.
     */
    where: MintReceiptJsonWhereUniqueInput
  }

  /**
   * MintReceiptJson deleteMany
   */
  export type MintReceiptJsonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MintReceiptJsons to delete
     */
    where?: MintReceiptJsonWhereInput
    /**
     * Limit how many MintReceiptJsons to delete.
     */
    limit?: number
  }

  /**
   * MintReceiptJson without action
   */
  export type MintReceiptJsonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintReceiptJson
     */
    select?: MintReceiptJsonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MintReceiptJson
     */
    omit?: MintReceiptJsonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintReceiptJsonInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserDataScalarFieldEnum: {
    id: 'id',
    did: 'did',
    email: 'email',
    isMinted: 'isMinted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserDataScalarFieldEnum = (typeof UserDataScalarFieldEnum)[keyof typeof UserDataScalarFieldEnum]


  export const MintReceiptJsonScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    txHash: 'txHash',
    raw: 'raw',
    createdAt: 'createdAt'
  };

  export type MintReceiptJsonScalarFieldEnum = (typeof MintReceiptJsonScalarFieldEnum)[keyof typeof MintReceiptJsonScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserDataWhereInput = {
    AND?: UserDataWhereInput | UserDataWhereInput[]
    OR?: UserDataWhereInput[]
    NOT?: UserDataWhereInput | UserDataWhereInput[]
    id?: IntFilter<"UserData"> | number
    did?: StringFilter<"UserData"> | string
    email?: StringNullableFilter<"UserData"> | string | null
    isMinted?: BoolFilter<"UserData"> | boolean
    createdAt?: DateTimeFilter<"UserData"> | Date | string
    updatedAt?: DateTimeFilter<"UserData"> | Date | string
    MintReceiptJson?: MintReceiptJsonListRelationFilter
  }

  export type UserDataOrderByWithRelationInput = {
    id?: SortOrder
    did?: SortOrder
    email?: SortOrderInput | SortOrder
    isMinted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    MintReceiptJson?: MintReceiptJsonOrderByRelationAggregateInput
  }

  export type UserDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    did?: string
    AND?: UserDataWhereInput | UserDataWhereInput[]
    OR?: UserDataWhereInput[]
    NOT?: UserDataWhereInput | UserDataWhereInput[]
    email?: StringNullableFilter<"UserData"> | string | null
    isMinted?: BoolFilter<"UserData"> | boolean
    createdAt?: DateTimeFilter<"UserData"> | Date | string
    updatedAt?: DateTimeFilter<"UserData"> | Date | string
    MintReceiptJson?: MintReceiptJsonListRelationFilter
  }, "id" | "did">

  export type UserDataOrderByWithAggregationInput = {
    id?: SortOrder
    did?: SortOrder
    email?: SortOrderInput | SortOrder
    isMinted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserDataCountOrderByAggregateInput
    _avg?: UserDataAvgOrderByAggregateInput
    _max?: UserDataMaxOrderByAggregateInput
    _min?: UserDataMinOrderByAggregateInput
    _sum?: UserDataSumOrderByAggregateInput
  }

  export type UserDataScalarWhereWithAggregatesInput = {
    AND?: UserDataScalarWhereWithAggregatesInput | UserDataScalarWhereWithAggregatesInput[]
    OR?: UserDataScalarWhereWithAggregatesInput[]
    NOT?: UserDataScalarWhereWithAggregatesInput | UserDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserData"> | number
    did?: StringWithAggregatesFilter<"UserData"> | string
    email?: StringNullableWithAggregatesFilter<"UserData"> | string | null
    isMinted?: BoolWithAggregatesFilter<"UserData"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserData"> | Date | string
  }

  export type MintReceiptJsonWhereInput = {
    AND?: MintReceiptJsonWhereInput | MintReceiptJsonWhereInput[]
    OR?: MintReceiptJsonWhereInput[]
    NOT?: MintReceiptJsonWhereInput | MintReceiptJsonWhereInput[]
    id?: StringFilter<"MintReceiptJson"> | string
    userId?: IntFilter<"MintReceiptJson"> | number
    txHash?: StringFilter<"MintReceiptJson"> | string
    raw?: JsonFilter<"MintReceiptJson">
    createdAt?: DateTimeFilter<"MintReceiptJson"> | Date | string
    user?: XOR<UserDataScalarRelationFilter, UserDataWhereInput>
  }

  export type MintReceiptJsonOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    txHash?: SortOrder
    raw?: SortOrder
    createdAt?: SortOrder
    user?: UserDataOrderByWithRelationInput
  }

  export type MintReceiptJsonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txHash?: string
    AND?: MintReceiptJsonWhereInput | MintReceiptJsonWhereInput[]
    OR?: MintReceiptJsonWhereInput[]
    NOT?: MintReceiptJsonWhereInput | MintReceiptJsonWhereInput[]
    userId?: IntFilter<"MintReceiptJson"> | number
    raw?: JsonFilter<"MintReceiptJson">
    createdAt?: DateTimeFilter<"MintReceiptJson"> | Date | string
    user?: XOR<UserDataScalarRelationFilter, UserDataWhereInput>
  }, "id" | "txHash">

  export type MintReceiptJsonOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    txHash?: SortOrder
    raw?: SortOrder
    createdAt?: SortOrder
    _count?: MintReceiptJsonCountOrderByAggregateInput
    _avg?: MintReceiptJsonAvgOrderByAggregateInput
    _max?: MintReceiptJsonMaxOrderByAggregateInput
    _min?: MintReceiptJsonMinOrderByAggregateInput
    _sum?: MintReceiptJsonSumOrderByAggregateInput
  }

  export type MintReceiptJsonScalarWhereWithAggregatesInput = {
    AND?: MintReceiptJsonScalarWhereWithAggregatesInput | MintReceiptJsonScalarWhereWithAggregatesInput[]
    OR?: MintReceiptJsonScalarWhereWithAggregatesInput[]
    NOT?: MintReceiptJsonScalarWhereWithAggregatesInput | MintReceiptJsonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MintReceiptJson"> | string
    userId?: IntWithAggregatesFilter<"MintReceiptJson"> | number
    txHash?: StringWithAggregatesFilter<"MintReceiptJson"> | string
    raw?: JsonWithAggregatesFilter<"MintReceiptJson">
    createdAt?: DateTimeWithAggregatesFilter<"MintReceiptJson"> | Date | string
  }

  export type UserDataCreateInput = {
    did: string
    email?: string | null
    isMinted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    MintReceiptJson?: MintReceiptJsonCreateNestedManyWithoutUserInput
  }

  export type UserDataUncheckedCreateInput = {
    id?: number
    did: string
    email?: string | null
    isMinted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    MintReceiptJson?: MintReceiptJsonUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserDataUpdateInput = {
    did?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isMinted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    MintReceiptJson?: MintReceiptJsonUpdateManyWithoutUserNestedInput
  }

  export type UserDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    did?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isMinted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    MintReceiptJson?: MintReceiptJsonUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserDataCreateManyInput = {
    id?: number
    did: string
    email?: string | null
    isMinted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDataUpdateManyMutationInput = {
    did?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isMinted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    did?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isMinted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintReceiptJsonCreateInput = {
    id?: string
    txHash: string
    raw: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user: UserDataCreateNestedOneWithoutMintReceiptJsonInput
  }

  export type MintReceiptJsonUncheckedCreateInput = {
    id?: string
    userId: number
    txHash: string
    raw: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MintReceiptJsonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    raw?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserDataUpdateOneRequiredWithoutMintReceiptJsonNestedInput
  }

  export type MintReceiptJsonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    raw?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintReceiptJsonCreateManyInput = {
    id?: string
    userId: number
    txHash: string
    raw: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MintReceiptJsonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    raw?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintReceiptJsonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    txHash?: StringFieldUpdateOperationsInput | string
    raw?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type MintReceiptJsonListRelationFilter =
    | PatchUndefined<
        Either<Required<MintReceiptJsonListRelationFilterBase>, Exclude<keyof Required<MintReceiptJsonListRelationFilterBase>, 'path'>>,
        Required<MintReceiptJsonListRelationFilterBase>
      >
    | OptionalFlat<Omit<Required<MintReceiptJsonListRelationFilterBase>, 'path'>>

  export type MintReceiptJsonListRelationFilterBase = {
    every?: MintReceiptJsonWhereInput
    some?: MintReceiptJsonWhereInput
    none?: MintReceiptJsonWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MintReceiptJsonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserDataCountOrderByAggregateInput = {
    id?: SortOrder
    did?: SortOrder
    email?: SortOrder
    isMinted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserDataAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserDataMaxOrderByAggregateInput = {
    id?: SortOrder
    did?: SortOrder
    email?: SortOrder
    isMinted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserDataMinOrderByAggregateInput = {
    id?: SortOrder
    did?: SortOrder
    email?: SortOrder
    isMinted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserDataSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserDataScalarRelationFilter = {
    is?: UserDataWhereInput
    isNot?: UserDataWhereInput
  }

  export type MintReceiptJsonCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    txHash?: SortOrder
    raw?: SortOrder
    createdAt?: SortOrder
  }

  export type MintReceiptJsonAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type MintReceiptJsonMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type MintReceiptJsonMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
  }

  export type MintReceiptJsonSumOrderByAggregateInput = {
    userId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type MintReceiptJsonCreateNestedManyWithoutUserInput = {
    create?: XOR<MintReceiptJsonCreateWithoutUserInput, MintReceiptJsonUncheckedCreateWithoutUserInput> | MintReceiptJsonCreateWithoutUserInput[] | MintReceiptJsonUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MintReceiptJsonCreateOrConnectWithoutUserInput | MintReceiptJsonCreateOrConnectWithoutUserInput[]
    createMany?: MintReceiptJsonCreateManyUserInputEnvelope
    connect?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
  }

  export type MintReceiptJsonUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MintReceiptJsonCreateWithoutUserInput, MintReceiptJsonUncheckedCreateWithoutUserInput> | MintReceiptJsonCreateWithoutUserInput[] | MintReceiptJsonUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MintReceiptJsonCreateOrConnectWithoutUserInput | MintReceiptJsonCreateOrConnectWithoutUserInput[]
    createMany?: MintReceiptJsonCreateManyUserInputEnvelope
    connect?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MintReceiptJsonUpdateManyWithoutUserNestedInput = {
    create?: XOR<MintReceiptJsonCreateWithoutUserInput, MintReceiptJsonUncheckedCreateWithoutUserInput> | MintReceiptJsonCreateWithoutUserInput[] | MintReceiptJsonUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MintReceiptJsonCreateOrConnectWithoutUserInput | MintReceiptJsonCreateOrConnectWithoutUserInput[]
    upsert?: MintReceiptJsonUpsertWithWhereUniqueWithoutUserInput | MintReceiptJsonUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MintReceiptJsonCreateManyUserInputEnvelope
    set?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
    disconnect?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
    delete?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
    connect?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
    update?: MintReceiptJsonUpdateWithWhereUniqueWithoutUserInput | MintReceiptJsonUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MintReceiptJsonUpdateManyWithWhereWithoutUserInput | MintReceiptJsonUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MintReceiptJsonScalarWhereInput | MintReceiptJsonScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MintReceiptJsonUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MintReceiptJsonCreateWithoutUserInput, MintReceiptJsonUncheckedCreateWithoutUserInput> | MintReceiptJsonCreateWithoutUserInput[] | MintReceiptJsonUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MintReceiptJsonCreateOrConnectWithoutUserInput | MintReceiptJsonCreateOrConnectWithoutUserInput[]
    upsert?: MintReceiptJsonUpsertWithWhereUniqueWithoutUserInput | MintReceiptJsonUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MintReceiptJsonCreateManyUserInputEnvelope
    set?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
    disconnect?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
    delete?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
    connect?: MintReceiptJsonWhereUniqueInput | MintReceiptJsonWhereUniqueInput[]
    update?: MintReceiptJsonUpdateWithWhereUniqueWithoutUserInput | MintReceiptJsonUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MintReceiptJsonUpdateManyWithWhereWithoutUserInput | MintReceiptJsonUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MintReceiptJsonScalarWhereInput | MintReceiptJsonScalarWhereInput[]
  }

  export type UserDataCreateNestedOneWithoutMintReceiptJsonInput = {
    create?: XOR<UserDataCreateWithoutMintReceiptJsonInput, UserDataUncheckedCreateWithoutMintReceiptJsonInput>
    connectOrCreate?: UserDataCreateOrConnectWithoutMintReceiptJsonInput
    connect?: UserDataWhereUniqueInput
  }

  export type UserDataUpdateOneRequiredWithoutMintReceiptJsonNestedInput = {
    create?: XOR<UserDataCreateWithoutMintReceiptJsonInput, UserDataUncheckedCreateWithoutMintReceiptJsonInput>
    connectOrCreate?: UserDataCreateOrConnectWithoutMintReceiptJsonInput
    upsert?: UserDataUpsertWithoutMintReceiptJsonInput
    connect?: UserDataWhereUniqueInput
    update?: XOR<XOR<UserDataUpdateToOneWithWhereWithoutMintReceiptJsonInput, UserDataUpdateWithoutMintReceiptJsonInput>, UserDataUncheckedUpdateWithoutMintReceiptJsonInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MintReceiptJsonCreateWithoutUserInput = {
    id?: string
    txHash: string
    raw: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MintReceiptJsonUncheckedCreateWithoutUserInput = {
    id?: string
    txHash: string
    raw: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MintReceiptJsonCreateOrConnectWithoutUserInput = {
    where: MintReceiptJsonWhereUniqueInput
    create: XOR<MintReceiptJsonCreateWithoutUserInput, MintReceiptJsonUncheckedCreateWithoutUserInput>
  }

  export type MintReceiptJsonCreateManyUserInputEnvelope = {
    data: MintReceiptJsonCreateManyUserInput | MintReceiptJsonCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MintReceiptJsonUpsertWithWhereUniqueWithoutUserInput = {
    where: MintReceiptJsonWhereUniqueInput
    update: XOR<MintReceiptJsonUpdateWithoutUserInput, MintReceiptJsonUncheckedUpdateWithoutUserInput>
    create: XOR<MintReceiptJsonCreateWithoutUserInput, MintReceiptJsonUncheckedCreateWithoutUserInput>
  }

  export type MintReceiptJsonUpdateWithWhereUniqueWithoutUserInput = {
    where: MintReceiptJsonWhereUniqueInput
    data: XOR<MintReceiptJsonUpdateWithoutUserInput, MintReceiptJsonUncheckedUpdateWithoutUserInput>
  }

  export type MintReceiptJsonUpdateManyWithWhereWithoutUserInput = {
    where: MintReceiptJsonScalarWhereInput
    data: XOR<MintReceiptJsonUpdateManyMutationInput, MintReceiptJsonUncheckedUpdateManyWithoutUserInput>
  }

  export type MintReceiptJsonScalarWhereInput = {
    AND?: MintReceiptJsonScalarWhereInput | MintReceiptJsonScalarWhereInput[]
    OR?: MintReceiptJsonScalarWhereInput[]
    NOT?: MintReceiptJsonScalarWhereInput | MintReceiptJsonScalarWhereInput[]
    id?: StringFilter<"MintReceiptJson"> | string
    userId?: IntFilter<"MintReceiptJson"> | number
    txHash?: StringFilter<"MintReceiptJson"> | string
    raw?: JsonFilter<"MintReceiptJson">
    createdAt?: DateTimeFilter<"MintReceiptJson"> | Date | string
  }

  export type UserDataCreateWithoutMintReceiptJsonInput = {
    did: string
    email?: string | null
    isMinted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDataUncheckedCreateWithoutMintReceiptJsonInput = {
    id?: number
    did: string
    email?: string | null
    isMinted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDataCreateOrConnectWithoutMintReceiptJsonInput = {
    where: UserDataWhereUniqueInput
    create: XOR<UserDataCreateWithoutMintReceiptJsonInput, UserDataUncheckedCreateWithoutMintReceiptJsonInput>
  }

  export type UserDataUpsertWithoutMintReceiptJsonInput = {
    update: XOR<UserDataUpdateWithoutMintReceiptJsonInput, UserDataUncheckedUpdateWithoutMintReceiptJsonInput>
    create: XOR<UserDataCreateWithoutMintReceiptJsonInput, UserDataUncheckedCreateWithoutMintReceiptJsonInput>
    where?: UserDataWhereInput
  }

  export type UserDataUpdateToOneWithWhereWithoutMintReceiptJsonInput = {
    where?: UserDataWhereInput
    data: XOR<UserDataUpdateWithoutMintReceiptJsonInput, UserDataUncheckedUpdateWithoutMintReceiptJsonInput>
  }

  export type UserDataUpdateWithoutMintReceiptJsonInput = {
    did?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isMinted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDataUncheckedUpdateWithoutMintReceiptJsonInput = {
    id?: IntFieldUpdateOperationsInput | number
    did?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    isMinted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintReceiptJsonCreateManyUserInput = {
    id?: string
    txHash: string
    raw: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MintReceiptJsonUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    raw?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintReceiptJsonUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    raw?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintReceiptJsonUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    txHash?: StringFieldUpdateOperationsInput | string
    raw?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}