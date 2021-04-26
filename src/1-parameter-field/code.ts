export class Parameter<Value> {
  value: Value;
}

export type Query<T> = never; // Fix me!
type Params<T> = never; // Fix me!

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
