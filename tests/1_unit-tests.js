const chai = require("chai");
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Number input tests", function () {
    //#1 - convertHandler should correctly read a whole number input.
    test("#readWholeNumber", function () {
      assert.equal(
        convertHandler.handleInput("5mi").initNum,
        5,
        "convertHandler.getNum is not filtering an integer."
      );
    });
    //#2 - convertHandler should correctly read a decimal number input.
    test("#readDecimalNumber", function () {
      assert.equal(
        convertHandler.handleInput("0.5km").initNum,
        0.5,
        "convertHandler.getNum is not filtering a decimal"
      );
    });
    //#3 - convertHandler should correctly read a fractional input.
    test("#readFractionalInput", function () {
      assert.equal(
        convertHandler.handleInput("1/2km").initNum,
        0.5,
        "convertHandler.getNum is not filtering a fractional"
      );
    });
    //#4 convertHandler should correctly read a fractional input with a decimal.
    test("#readFractionalWithDecimal", function () {
      assert.equal(
        convertHandler.handleInput("4.03/112mi").initNum,
        4.03 / 112
      );
    });
    test("wat", function () {
      assert.equal(convertHandler.handleInput("2.3/2mi").initNum, 2.3 / 2);
    });
    //#5 - convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test("#readWrongFractionalInput", function () {
      assert.equal(
        convertHandler.handleInput("1/2/4km"),
        "invalid number",
        "should return invalid number"
      );
    });
  });
  suite("Unit input tests", function () {
    //#6 convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test("defaultToOne", function () {
      assert.equal(convertHandler.handleInput("mi").initNum, 1);
    });

    //#7 - convertHandler should correctly read each valid input unit.
    test("correctUnit", function () {
      assert.equal(
        convertHandler.handleInput("99km").initUnit,
        "km",
        "Should return correct unit"
      );
      assert.equal(
        convertHandler.handleInput("29mi").initUnit,
        "mi",
        "Should return correct unit"
      );
      assert.equal(
        convertHandler.handleInput("0.14/5l").initUnit,
        "L",
        "Should return correct unit"
      );
      assert.equal(
        convertHandler.handleInput("0.1gal").initUnit,
        "gal",
        "Should return correct unit"
      );
      assert.equal(
        convertHandler.handleInput("99/3lbs").initUnit,
        "lbs",
        "Should return correct unit"
      );
      assert.equal(
        convertHandler.handleInput("02kg").initUnit,
        "kg",
        "Should return correct unit"
      );
    });
    //#8 convertHandler should correctly return an error for an invalid input unit..
    test("faultyUnit", function () {
      assert.equal(convertHandler.handleInput("miii"), "invalid unit");
    });
    //#9 convertHandler should return the correct return unit for each valid input unit
    test("returnsCorrectReturnUnit", function () {
      assert.equal(
        convertHandler.handleInput("99km").returnUnit,
        "mi",
        "Should return correct return unit"
      );
      assert.equal(
        convertHandler.handleInput("29mi").returnUnit,
        "km",
        "Should return correct return unit"
      );
      assert.equal(
        convertHandler.handleInput("0.14/5l").returnUnit,
        "gal",
        "Should return correct return unit"
      );
      assert.equal(
        convertHandler.handleInput("0.1gal").returnUnit,
        "L",
        "Should return correct return unit"
      );
      assert.equal(
        convertHandler.handleInput("99/3lbs").returnUnit,
        "kg",
        "Should return correct return unit"
      );
      assert.equal(
        convertHandler.handleInput("02kg").returnUnit,
        "lbs",
        "Should return correct return unit"
      );
    });
    //#10  should correctly return the spelled-out string unit for each valid input unit.
    test("correctReturnStringGalToL", function () {
      assert.equal(
        convertHandler.handleInput("2gal").string,
        `2 gallons converts to ${(2 * 3.78541).toFixed(5)} liters`,
        "string isn't built correctly"
      );
      assert.equal(
        convertHandler.handleInput("2l").string,
        `2 liters converts to ${2 * (1 / 3.78541).toFixed(5)} gallons`,
        "string isn't built correctly"
      );
      assert.equal(
        convertHandler.handleInput("300km").string,
        `300 kilometers converts to ${(300 * (1 / 1.60934)).toFixed(5)} miles`,
        "string isn't built correctly"
      );
      assert.equal(
        convertHandler.handleInput("4mi").string,
        `4 miles converts to ${4 * 1.60934} kilometers`,
        "string isn't built correctly"
      );
      assert.equal(
        convertHandler.handleInput("33kg").string,
        `33 kilograms converts to ${(33 * (1 / 0.453592)).toFixed(5)} pounds`,
        "string isn't built correctly"
      );
      assert.equal(
        convertHandler.handleInput("195lbs").string,
        `195 pounds converts to ${(195 * 0.453592).toFixed(5)} kilograms`,
        "string isn't built correctly"
      );
    });
    //#11
    test("correctConversionkm/m", function () {
      assert.equal(
        convertHandler.handleInput("km").returnNum,
        (1 / 1.60934).toFixed(5),
        "Should return 1 km converted to miles"
      );
    });
    //#12

    test("correctConversioMi/km", function () {
      assert.equal(
        convertHandler.handleInput("mi").returnNum,
        1.60934,
        "Should return 1 mi converted to km"
      );
    });
    //#13

    test("correctConversionKg/Lbs", function () {
      assert.equal(
        convertHandler.handleInput("kg").returnNum,
        (1 / 0.453592).toFixed(5),
        "Should return 1 kg converted to lbs"
      );
    });
    //#14

    test("correctConversionL/Gal", function () {
      assert.equal(
        convertHandler.handleInput("l").returnNum,
        (1 / 3.78541).toFixed(5),
        "Should return 1 l converted to gal"
      );
    });
    //#15

    test("correctConversionGal/L", function () {
      assert.equal(
        convertHandler.handleInput("gal").returnNum,
        3.78541,
        "Should return 1 gal converted to liters"
      );
    });
    //#17
    test("correctConversiongaLbs/Kg", function () {
      assert.equal(
        convertHandler.handleInput("lbs").returnNum,
        `0.45359`,
        "Should return 1 lbs converted to kg"
      );
    });
  });
});
