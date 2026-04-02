import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("Basic API Test", () => {
  it("should return 404 for unknown route", (done) => {
    chai
      .request(app)
      .get("/not-exist")
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});