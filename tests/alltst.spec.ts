import request from "supertest";
import {server} from "../index";
import { db } from "../model/model";
import { v4 as uuidv4 } from 'uuid';

const URL = "http://localhost:4000";

describe("all users command",  () => {

  let Userid;
  it("Get all users", async () => {
    const res = await request(URL).get("/api/users/");
    const allUsers = res.body
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(allUsers);
    Userid = res.body[0].id;
  });
 it("Get user by ID", async () => {
    const response = await request(URL).get(`/api/users/${Userid}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toEqual('mike');
    expect(response.body.age).toEqual(11);
    expect(response.body.hobbies).toEqual(['walk']);
  });
 it("Post user", async () => {
    const res = await request(URL)
      .post("/api/users").set('Accept', 'application/json')
      .send({
        username: "jhon",
        age: 22,
        hobbies: ["golf"],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toEqual("jhon");
    expect(res.body.age).toEqual(22);
    expect(res.body.hobbies).toEqual(["golf"]);
  });
  it("Change user", async () => {
    const response = await request(URL)
      .put(`/api/users/${Userid}`)
      .set('Accept', 'application/json')
      .send({
        username: 'gosha',
        age: 12,
        hobbies: ['football', 'music'],
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(Userid);
      expect(response.body.username).toEqual('gosha');
      expect(response.body.age).toEqual(12);
      expect(response.body.hobbies).toEqual(['football', 'music']);
  });
  it("Delete user", async () => {
    const res = await request(URL).delete(`/api/users/${Userid}`);
    expect(res.statusCode).toBe(204);
  }); 
});


describe("errors", () => {
  const testUsr = {
    username: 'alex',
    age: 12,
    hobbies: ['sport', 'music'],
  };

  const uuId = uuidv4();

  it('userId is invalid, method GET', async () => {
    const response = await request(URL).get('/api/users/asdf');

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual("Invalid user ID");
  });

  it("userId doesn't exist, method GET", async () => {
    const response = await request(URL).get(`/api/users/${uuId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual(`User not found`);
  });
  it('try to create user without necessary fields', async()=>{
    const res = await request(URL)
      .post("/api/users").set('Accept', 'application/json')
      .send({
        username: "jhon",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toEqual(`Missing required fields`);
  })
  it(' when userId is invalid, method PUT', async () => {
    const response = await request(URL).put('/api/users/asdf').send(testUsr);

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Invalid user ID");
  });

  it("when userId doesn't exist, method PUT", async () => {
    const response = await request(URL).put(`/api/users/${uuId}`).send(testUsr);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual(`User not found`);
  });

  it(' when userId is invalid, method Delete', async () => {
    const response = await request(URL).delete('/api/users/asdf');

    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Invalid user ID");
  });

  it("when userId doesn't exist, method Delete", async () => {
    const response = await request(URL).delete(`/api/users/${uuId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual(`User not found`);
  });
});
