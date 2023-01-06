db.createUser({
  user: "MongoUser",
  pwd: "MongoPwd2020",
  roles: [
    {
      role: "dbOwner",
      db: "myDB",
    },
  ],
});
