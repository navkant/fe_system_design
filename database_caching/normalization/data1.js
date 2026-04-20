// Problem statement:

const state = {
  users: [
    {
      id: 1,
      name: "Alice",
      posts: [
        { id: 101, title: "Post 1" },
        { id: 102, title: "Post 2" },
      ],
    },
    {
      id: 2,
      name: "Bob",
      posts: [{ id: 103, title: "Post 3" }],
    },
  ],
};

const stateN = {
  users: {
    byIds: {
      1: {
        id: 1,
        name: "Alice",
      },
      2: {
        id: 2,
        name: "Bob",
      },
    },
    posts: {
      byIds: {
        101: {
          id: 101,
          title: "Post 1",
          userId: 1,
        },
        102: {
          id: 102,
          title: "Post 2",
          userId: 1,
        },
        103: {
          id: 103,
          title: "Post 3",
          userId: 2,
        },
      },
    },
  },
};
