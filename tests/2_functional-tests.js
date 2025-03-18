const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");
const res = require("express/lib/response");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(4000);

  suite("integration tests with chai-http", function () {
    //#1 - Convert a valid input such as 10L: GET request to /api/convert.
    test("Test GET 10L", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=10L")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(
            res.text,
            '{"initNum":10,"initUnit":"L","returnUnit":"gal","returnNum":2.64172,"string":"10 liters converts to 2.64172 gallons"}'
          );
          done();
        });
    });
    //#2 - Convert an invalid input such as 32g: GET request to /api/convert
    test("Test GET 32g", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=32g")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          // console.log(res.text);
          assert.equal(res.text, JSON.stringify("invalid unit"));
        });
      done();
    });
    //#3 - Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
    test("test GET faulty number", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify("invalid number"));
        });
      done();
    });
    //#4 - Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
    test("test GET faulty number and unit", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kilomegagram:")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify("invalid number and unit"));
        });
      done();
    });
    //#5 - Convert with no number such as kg: GET request to /api/convert
    test("test GET no number", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(
            res.text,
            `{"initNum":1,"initUnit":"kg","returnUnit":"lbs","returnNum":2.20462,"string":"1 kilograms converts to 2.20462 pounds"}`
          );
        });
      done();
    });
  });
});

//bezig met de invalid input 3 different kinds : DONE!
