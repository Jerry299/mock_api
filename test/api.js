const chai = require("chai");
const server = require("../server");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

// test not used, just a sample test
describe("MOck API Test", () => {
  it("Should be successful if credentials are valid", (done) => {
    chai
      .request(server)
      .post("/test")
      .send({ name: "Sean", pass: "myPass" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
