const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

const expect = chai.expect;
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