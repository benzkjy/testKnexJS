const knex = require("knex")({
  client: "mssql",
  connection: {
    host: "localhost\\SQLEXPRESS",
    user: "sa",
    password: "12345",
    database: "TestKnex"
    // port: "9823"
  }
});
console.log("connect DataBase");

async function createTable() {
  await knex.schema.dropTableIfExists("user");
  await knex.schema
    .createTableIfNotExists("user", tbl => {
      tbl.increments("id");
      tbl.string("name");
      tbl.integer("age");
    })
    .then(console.log("create table user"))
    .catch(err => console.log(err))
    .finally(() => knex.destroy());
}

const insertUser = () => {
  const users = [
    { name: "Audi", age: "32" }
    // { name: "Mercedes", age: "35" },
    // { name: "Jame", age: "24" },
    // { name: "Mose", age: "62" },
    // { name: "Benz", age: "73" },
    // { name: "Atom", age: "23" },
    // { name: "Nobi", age: "14" },
    // { name: "Robert", age: "16" },
    // { name: "Hop", age: "72" },
    // { name: "Nomi", age: "34" },
    // { name: "Sam", age: "42" },
    // { name: "Nigth", age: "64" },
    // { name: "Lique", age: "13" }
  ];

  knex("user")
    .insert(users)
    .then(() => console.log("data inserted"))
    .catch(err => console.log(err))
    .finally(() => knex.destroy());
};

const selectUser = () => {
  knex("user")
    .select()
    // .where({ name: "Benz" })
    .then(rows => {
      rows.forEach(user => {
        console.log(`${user["id"]} ${user["name"]} ${user["age"]}`);
      });
    })
    .catch(err => console.log(err))
    .finally(() => knex.destroy());
};

const selectWhere = () => {
  knex("user")
    .select("name", "age")
    .where("age", "<", "30")
    .orderBy("age", "asc")
    .then(rows => {
      rows.forEach(user => {
        console.log(`${user["name"]} ${user["age"]}`);
      });
    })
    .catch(err => console.log(err))
    .finally(() => knex.destroy());
};

const updateUser = () => {
  knex("user")
    .where({ name: "Jame" })
    .update({ age: 24 })
    .then(
      knex("user")
        .select()
        .where({ name: "Jame" })
        .then(user => console.log(`${user["name"]} ${user["age"]}`))
      // .then(user => console.log(user))
    )
    .catch(err => console.log(err))
    .finally(() => knex.destroy());
};

async function updateUserAsyns() {
  await knex("user")
    .where({ name: "Jame" })
    .update({ age: 38 });
  const update = await knex("user")
    .select()
    .where({ name: "Jame" });
  // console.log(`${update["name"]} ${update["age"]}`);
  console.log(update);
  await knex.destroy();
}

async function deleteUser() {
  await knex("user")
    .where({ name: "Audi" })
    .del();
  const del = await knex("user").select();
  console.log(del);
  await knex.destroy();
}

// createTable();
// insertUser();
selectUser();
// selectWhere();
// updateUser();
// updateUserAsyns();
// deleteUser();
