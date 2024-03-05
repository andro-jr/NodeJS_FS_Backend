const {
  connect,
  disconnect,
  saveUser,
  findUser,
  clearDatabase,
} = require("./index");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// describe, test, expect

jest.mock("./index");

beforeAll(async () => {
  await connect();
  return await clearDatabase();
});

describe("User Test Suite", () => {
  test("As a user I want to save a user to the database", async () => {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: "Prabin",
      lastName: "Pant",
      address: "tahachal",
      email: "prabin22panta@gmail.com",
      city: "kathmandu",
      zipCode: "44600",
      state: "Bagmati",
      password: "pass",
    });

    const user = await saveUser(newUser);
    expect(user.firstName).toEqual("Prabin");
    expect(user.lastName).toEqual("Pant");
    expect(user.address).toEqual("tahachal");
    expect(user.email).toEqual("prabin22panta@gmail.com");
    expect(user.city).toEqual("kathmandu");
    expect(user.zipCode).toEqual("44600");
    expect(user.state).toEqual("Bagmati");
    expect(user.password).toEqual("pass");
  });

  test("As a user I want to find a user by any property", async () => {
    const obj = { firstName: "Prabin" };

    const user = await findUser(obj);

    expect(user.firstName).toEqual("Prabin");
    expect(user.lastName).toEqual("Pant");
    expect(user.address).toEqual("tahachal");
    expect(user.email).toEqual("prabin22panta@gmail.com");
    expect(user.city).toEqual("kathmandu");
    expect(user.zipCode).toEqual("44600");
    expect(user.state).toEqual("Bagmati");
    expect(user.password).toEqual("pass");
  });
});

afterAll(async () => {
  return await disconnect();
});
