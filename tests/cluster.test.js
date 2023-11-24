const request = require('supertest');
//reqiure the app 
const app = require('../app'); // Import your Express app

describe("Cluster Creation", () => {
  describe("Payload", () => {
    it("Should return 400 when name is missing", async () => {
      const response = await request(app)
        .post("/clusters")
        .send({ 
          // "name": "MyCluster2",
          "cloudRegion": "us-west-1"
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Missing required fields",
      });
    });

    it("Should return 400 when cloudRegion is missing", async () => {
      const response = await request(app)
        .post("/clusters")
        .send({ 
          // "name": "MyCluster2",
          "cloudRegion": "us-west-1"
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Missing required fields",
      });
    });
  });
});