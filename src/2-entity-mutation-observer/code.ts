type PropEventSource<T> = Omit<{ [K in keyof T & string as `on${Capitalize<K>}Changed`]: (val: T[K]) => void }, 'onIdChanged'>;

class PersonaMutationObserver<T> {
  constructor(obj: T, observer: PropEventSource<T>) {}
}

type Person = {
  id: number;
  name: string;
  birthDate: Date;
  country: string;
};

const person: Person = {
  id: 1,
  name: "Paul",
  birthDate: new Date("2000-01-01"),
  country: "Spain",
};

//OK (callback should be inferred to correct type or can be explicity declared)
const observer = new PersonaMutationObserver(person, {
  onNameChanged: (name) => console.log(name.toLocaleLowerCase()),
  onBirthDateChanged: (date) => console.log(date.toLocaleDateString()),
  onCountryChanged: (value: string) => console.log(value.toUpperCase()),
});

//Error: there is no property named xpto in Person type
const observer2 = new PersonaMutationObserver(person, {
  onNameChanged: (value) => console.log(value),
  onXptoChanged: (value) => console.log(value),
});

//Error: callback type is wrong
const observer3 = new PersonaMutationObserver(person, {
  onNameChanged: (value: Date) => console.log(value),
});
