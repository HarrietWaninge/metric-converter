function ConvertHandler() {
  let units = {
    km: {
      initUnit: "km",
      pairedUnit: "mi",
      spelledOut: "kilometers",
      conversion: 1 / 1.60934,
    },
    mi: {
      initUnit: "mi",
      pairedUnit: "km",
      spelledOut: "miles",
      conversion: 1.60934,
    },
    l: {
      initUnit: "L",
      pairedUnit: "gal",
      spelledOut: "liters",
      conversion: 1 / 3.78541,
    },
    gal: {
      initUnit: "gal",
      pairedUnit: "L",
      spelledOut: "gallons",
      conversion: 3.78541,
    },
    kg: {
      initUnit: "kg",
      pairedUnit: "lbs",
      spelledOut: "kilograms",
      conversion: 1 / 0.453592,
    },
    lbs: {
      initUnit: "lbs",
      pairedUnit: "kg",
      spelledOut: "pounds",
      conversion: 0.453592,
    },
  };

  this.handleInput = function (input) {
    console.log("INPUT:", input);
    let initNum, returnNum, returnUnit, initUnit, string;

    // console.log("match:", input.match(inputRegex).groups);
    let error = this.getErrorMessage(input);
    if (error) {
      return error;
    }

    let { numbers, unit } = this.splitNumbersUnit(input);
    unit = unit.toLowerCase();
    //  console.log("NUMBERS UNIT", numbers, unit);

    initNum = numbers == "" ? 1 : this.getNum(numbers);
    initUnit = this.getInitUnit(unit);
    returnUnit = this.getReturnUnit(unit);
    returnNum = Number(this.convert(initNum, unit));
    string = this.getString(initNum, unit, returnNum, returnUnit);
    //  console.log({ initNum, initUnit, returnUnit, string });
    return { initNum, initUnit, returnUnit, returnNum, string };
  };

  this.getErrorMessage = function (input) {
    //console.log("input in erromessagefunc", input);
    let correctNumber = this.checkNumbers(input);
    let correctUnit = this.checkUnit(input);

    return correctNumber && correctUnit
      ? null
      : !correctNumber && !correctUnit
      ? "invalid number and unit"
      : !correctNumber
      ? "invalid number"
      : "invalid unit";
  };

  this.checkUnit = function (input) {
    let unitRegex = /kg$|mi$|lbs$|l$|gal$|km$/i;
    // console.log(unitRegex.test(input));
    return unitRegex.test(input);
  };

  this.checkNumbers = function (input) {
    let numbersRegex = /(?<numbers>^[0-9\.\/]*)/;
    if (numbersRegex.test(input)) {
      let numbers = input.match(numbersRegex).groups.numbers;
      return !(
        Number.isNaN(Number(numbers)) &&
        (this.amountOfDots(numbers) > 1 || !this.correctFractional(numbers))
      );
    } else {
      return true;
    }
  };

  this.splitNumbersUnit = function (input) {
    inputRegex = /(?<numbers>[0-9\.\/]*)(?<unit>kg$|mi$|lbs$|l$|gal$|km$)/i;
    return input.match(inputRegex).groups;
  };

  this.getNum = function (numbersInput) {
    let number = Number(numbersInput);

    if (Number.isNaN(number)) {
      //deal with fancy input (num/num and num.num/num)
      number = this.solveFractional(numbersInput);
    }
    //console.log("num;", number);
    return number;
  };

  this.solveFractional = function (numbersInput) {
    console.log("INPUT", numbersInput);
    let solvedFractional, integer, number;

    let { numerator, denominator } = numbersInput.match(
      /(?<numerator>[\d\.]+)\/(?<denominator>[\d\.]+)/
    ).groups;
    console.log(
      "input:",
      numbersInput,
      "numerator:",
      numerator,
      "denominator",
      denominator
    );

    // if (this.amountOfDots(numbersInput) == 1) {
    //   //we're dealing with a 2.3/4 number
    //   integer = numbersInput.match(/^\d+/)[0] || 0;
    //   console.log("INTEGER!", integer);
    // }
    solvedFractional = numerator / denominator;

    console.log("solvedFractional:", solvedFractional);
    number = integer
      ? Number(integer) + Number(solvedFractional)
      : Number(solvedFractional);
    console.log("we are here with number: ", number);

    return Number(number);
  };

  this.correctFractional = function (numbersInput) {
    let fractionalRegEx = /(\d+\/\d+)/;
    return (
      numbersInput.split("/").length === 2 && fractionalRegEx.test(numbersInput)
    );
  };

  this.amountOfDots = function (numbersInput) {
    return numbersInput.split(".").length - 1;
  };
  this.getInitUnit = function (unit) {
    return units[unit].initUnit;
  };
  this.getReturnUnit = function (initUnit) {
    return units[initUnit].pairedUnit;
  };

  this.spellOutUnit = function (unit) {
    //  console.log("UNIT:", unit);
    // console.log(units[unit]);
    return units[unit.toLowerCase()].spelledOut;
  };

  this.convert = function (initNum, initUnit) {
    return (initNum * units[initUnit].conversion).toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let spelledOutInitUnit = this.spellOutUnit(initUnit);
    let spelledOutReturnUnit = this.spellOutUnit(returnUnit);

    let result = `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`;

    return result;
  };
}

module.exports = ConvertHandler;
