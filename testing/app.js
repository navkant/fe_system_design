const users = [
  {
    name: "Akshay",
    age: 28,
  },
  {
    name: "John",
    age: 34,
  },
  {
    name: "Alice",
    age: 23,
  },
];

function sortingByAge(users) {
  return users.sort((a, b) => a.age - b.age);
}

module.exports = sortingByAge;
