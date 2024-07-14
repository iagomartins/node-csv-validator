const getData = (data) => {
  const isDocumentValid = require("../Utils/validateDocs").isDocumentValid;
  const validateTransactions =
    require("../Utils/validateTransactions").validateTransactions;
  const generateCSV = require("../Utils/generateCSV").generateCSV;
  const convertToBRL = require("../Utils/convertToBRL").convertToBRL;

  let mountedData = [];

  data.forEach((element) => {
    const isValidDoc = isDocumentValid(element.nrCpfCnpj);
    const isValidTransaction = validateTransactions(element);

    const mountedElement = {
      ...element,
      testeDocumento: isValidDoc.valid
        ? "O documento de " + isValidDoc.type + " informado é válido"
        : "O documento de " + isValidDoc.type + " informado não é válido",
      testeValores: `O valor das prestações ${
        isValidTransaction.conciseTransaction ? "é" : "não é"
      } coerente.`,
      testeMulta: `${
        isValidTransaction.additionalCosts && parseFloat(element.vlMulta) > 0
          ? "A multa está aplicada corretamente."
          : !isValidTransaction.additionalCosts &&
            parseFloat(element.vlMulta) > 0
          ? "A multa não está aplicada corretamente."
          : isValidTransaction.additionalCosts &&
            parseInt(element.vlMulta) === 0
          ? "Deveria existir uma multa nessa transação."
          : "A data de vencimento confirma o valor de multa zero."
      }`,
    };

    const totalValueParsed = parseFloat(mountedElement.vlTotal);
    const installmentParsed = parseFloat(mountedElement.vlPresta);
    const moraParsed = parseFloat(mountedElement.vlMora);
    const chargeParsed = parseFloat(mountedElement.vlMulta);
    const incrementParsed = parseFloat(mountedElement.vlOutAcr);
    const iofParsed = parseFloat(mountedElement.vlIof);
    const discountParsed = parseFloat(mountedElement.vlDescon);
    const actualParsed = parseFloat(mountedElement.vlAtual);

    mountedElement.vlTotal = convertToBRL(totalValueParsed);
    mountedElement.vlPresta = convertToBRL(installmentParsed);
    mountedElement.vlMora = convertToBRL(moraParsed);
    mountedElement.vlMulta = convertToBRL(chargeParsed);
    mountedElement.vlOutAcr = convertToBRL(incrementParsed);
    mountedElement.vlIof = convertToBRL(iofParsed);
    mountedElement.vlDescon = convertToBRL(discountParsed);
    mountedElement.vlAtual = convertToBRL(actualParsed);

    console.log("Processando...");

    mountedData.push(mountedElement);
  });

  generateCSV(mountedData);

  return mountedData;
};

module.exports = {
  getData,
};
