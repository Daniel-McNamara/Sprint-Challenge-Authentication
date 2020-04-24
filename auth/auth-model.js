const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  edit,
  remove
};

function find() {
  return db("auth").select("id", "username");
}

function findBy(filter) {
  return db("auth").where(filter);
}

function findById(id) {
  return db("auth")
    .select("id", "username")
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db("auth").insert(user, "id");
  return findById(id);
}

function edit(changes, id) {
  return db("auth")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

async function remove(id) {
  const user = await findById(id);
  db("auth")
    .where({ id })
    .del();
  return user;
}