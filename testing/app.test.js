const sortingByAge = require("./app");

test("Testing sorting function", () => {
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

  const sortedUsers = sortingByAge(users);

  expect(sortedUsers).toEqual([
    {
      name: "Alice",
      age: 23,
    },
    {
      name: "Akshay",
      age: 28,
    },
    {
      name: "John",
      age: 34,
    },
  ]);
});
