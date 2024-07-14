const generateCSV = (data) => {
  const fs = require("fs");
  const { stringify } = require("csv-stringify");

  stringify(data, (err, output) => {
    if (err) throw err;
    fs.writeFileSync("output.csv", output);
    console.log("CSV file created successfully.");
  });
};

module.exports = {
  generateCSV,
};
