const validateTransactions = (element) => {
  const returnedInstallment = parseInt(element.vlPresta);
  const calculatedInstallment = parseInt(
    (parseFloat(element.vlTotal) +
      parseFloat(element.vlMulta) +
      parseFloat(element.vlMora)) /
      parseInt(element.qtPrestacoes)
  );
  const limit = 3000;
  const dueDate = new Date(
    element.dtVctPre.substring(0, 4) +
      "/" +
      element.dtVctPre.substring(4, 6) +
      "/" +
      element.dtVctPre.substring(6, 9)
  );

  const additionalCosts = dueDate > new Date();

  return {
    conciseTransaction:
      calculatedInstallment - limit < returnedInstallment &&
      calculatedInstallment < returnedInstallment + limit,
    additionalCosts,
  };
};

module.exports = {
  validateTransactions,
};
