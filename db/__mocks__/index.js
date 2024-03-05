const connect = () => {
  console.log("Mongo mock connection");
};

const disconnect = async () => {
  console.log("Mongo mock disconnection");
};

const findUser = async (obj) => {
  return Promise.resolve({
    firstName: "Prabin",
    lastName: "Pant",
    address: "tahachal",
    email: "prabin22panta@gmail.com",
    city: "kathmandu",
    zipCode: "44600",
    state: "Bagmati",
    password: "pass",
  });
};

const saveUser = async (newUser) => {
  return Promise.resolve({
    firstName: "Prabin",
    lastName: "Pant",
    address: "tahachal",
    email: "prabin22panta@gmail.com",
    city: "kathmandu",
    zipCode: "44600",
    state: "Bagmati",
    password: "pass",
  });
};

const clearDatabase = async () => {
  console.log("DB cleared");
};

module.exports = { connect, disconnect, findUser, saveUser, clearDatabase };
