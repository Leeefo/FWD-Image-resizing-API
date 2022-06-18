import supertest from "supertest";
import app from "./../app";

const request = supertest(app);

describe("Testing the images endpont", () => {
  it("checking for normal behavior 200", async () => {
    const res = await request.get(
      "/images?filename=fjord.jpg&width=200&height=300"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toMatch("image/jpeg");
  });

  it("checking for worng image name bad request 400", async () => {
    const res = await request.get(
      "/images?filename=asdaw.jpg&width=200&height=300"
    );
    expect(res.statusCode).toEqual(400);
    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.body.message).toMatch("Image not found");
  });

  it("checking for worng endpoint name returning not found 404", async () => {
    const res = await request.get(
      "/imasdages?filename=asdaw.jpg&width=200&height=300"
    );
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toMatch("application/json");
    expect(res.body.message).toMatch("Not found");
  });
});
