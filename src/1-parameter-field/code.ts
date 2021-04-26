export class Parameter<Value> {
  value: Value;
}

type ParameterConstructor<T = any> = new (...args: any[]) => T;
type Query<T extends any> = T extends { [K in keyof T]: ParameterConstructor | string } ? T : never;
type ExcludeNonParams<T> = Pick<T, { [K in keyof T]: T[K] extends Parameter<any> ? K: never}[keyof T]>;
type Params<T = any> = { [K in keyof ExcludeNonParams<T>]: T[K] extends Parameter<infer V> ? V : never};

export class QueryExecuter<TEntity, TQuery extends Query<TEntity>> {
  constructor(private query: TQuery) {}

  public setParameters(params: Params<TQuery>) {}
}

const input = {
  id: new Parameter<number>(),
  birthDate: new Parameter<Date>(),
  name: "John",
};
const myQuery = new QueryExecuter(input);

myQuery.setParameters({ id: 9 }); //Error: Al parameters must be provided
myQuery.setParameters({ id: 9, birthDate: "" }); //Error: birthDate should be a date
myQuery.setParameters({ name: "Peter" }); //Error: name is not a parameter

myQuery.setParameters({ id: 9, birthDate: new Date("2010-01-01") }); //OK
