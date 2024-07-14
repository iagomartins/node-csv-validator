const convertToBRL = (value) => {
  const result = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return result;
};

module.exports = {
  convertToBRL,
};
