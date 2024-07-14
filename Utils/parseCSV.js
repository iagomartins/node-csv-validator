const parseCSV = async (file) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const getData = require("../Utils/getData").getData;

  let results = [];

  return await fs
    .createReadStream(file)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      getData(results);
      return results;
    });
};

module.exports = {
  parseCSV,
};
