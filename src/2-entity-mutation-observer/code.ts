type PropEventSource<T> = never; // FIX ME

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

//OK (callback should be infered to correct type or can be explicitly declared)
const observerOK1 = new PersonaMutationObserver(person, {
  onNameChanged: (name) => console.log(name.toLocaleLowerCase()),
  onBirthDateChanged: (date) => console.log(date.toLocaleDateString()),
  onCountryChanged: (value: string) => console.log(value.toUpperCase()),
});

//OK (all properties should be optional)
const observerOK2 = new PersonaMutationObserver(person, {
  onIdChanged: (id) => console.log(id),
});

//Error: there is no property named xpto in Person type
const observerError1 = new PersonaMutationObserver(person, {
  onNameChanged: (value) => console.log(value),
  onXptoChanged: (value) => console.log(value),
});

//Error: callback type is wrong
const observerError2 = new PersonaMutationObserver(person, {
  onNameChanged: (value: Date) => console.log(value),
});
