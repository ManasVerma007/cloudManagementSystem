const request = require("supertest");
//reqiure the app
const app = require("../app"); // Import your Express app

describe("Machine Creation", () => {
  describe("Payload", () => {
    it("Should return 400 when name is missing", async () => {
      const response = await request(app).post("/machines").send({
        // name: "Machine19",
        ipAddress: "192.168.1.1",
        instanceType: "t2.micro",
        clusterId: 2,
        tags: "prod1,prod2",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Missing required fields",
      });
    });

    it("Should return 400 when ipAddress is missing", async () => {
        const response = await request(app).post("/machines").send({
        name: "Machine19",
        // ipAddress: "192.168.1.1",
        instanceType: "t2.micro",
        clusterId: 2,
        tags: "prod1,prod2",
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
        error: "Missing required fields",
        });
    });

    it("Should return 400 when clusterId is missing", async () => {
        const response = await request(app).post("/machines").send({
        name: "Machine19",
        ipAddress: "192.168.1.1",
        instanceType: "t2.micro",
        // clusterId: 2,
        tags: "prod1,prod2",
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
        error: "Missing required fields",
        });
    });
  });
});