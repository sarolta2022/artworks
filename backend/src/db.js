let db = null;

const init = async (fp) => {
  const lowdb = await import("lowdb"); //require promise-os megfelelője
  const adapter = new lowdb.JSONFile(fp);
  db = new lowdb.Low(adapter);
  await db.read();
  db.data ||= { users: [] };
  return db.write();
};

const getAllUser = async () => {
  await db.read();
  return db.data.users;
};
const findUserByEmail = async (email) => {
  await db.read();
  return db.data.users.find((user) => {
    return user.email === email;
  });
};
const createUser = async (user) => {
  await db.read();
  db.data.users.push(user);
  return db.write();
};

const addFavToUser = async (email, fav) => {
  await db.read();
  console.log(fav);
  db.data.users.find((user) => user.email === email).favs.push(fav);
  return db.write();
};

module.exports = {
  init,
  getAllUser,
  findUserByEmail,
  createUser,
  addFavToUser,
};
