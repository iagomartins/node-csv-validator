const isDocumentValid = (docNumber) => {
  const type = docNumber.toString().length === 11 ? "cpf" : "cnpj";
  let valid = false;

  if (type === "cnpj") {
    let cnpj = docNumber.toString();
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj.length != 14) {
      valid = false;
      return { valid, type };
    }

    let totalLength = cnpj.length - 2;
    let noDigitDocument = cnpj.substring(0, totalLength);
    let verifiers = cnpj.substring(totalLength);
    let sum = 0;
    let pos = totalLength - 7;

    for (i = totalLength; i >= 1; i--) {
      sum += noDigitDocument.charAt(totalLength - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != verifiers.charAt(0)) {
      valid = false;
      return { valid, type };
    }

    totalLength = totalLength + 1;
    noDigitDocument = cnpj.substring(0, totalLength);
    sum = 0;
    pos = totalLength - 7;
    for (i = totalLength; i >= 1; i--) {
      sum += noDigitDocument.charAt(totalLength - i) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != verifiers.charAt(1)) {
      valid = false;
      return { valid, type };
    }

    valid = true;
    return { valid, type };
  } else {
    let cpf = docNumber.toString();

    if (cpf == "00000000000") {
      valid = false;
      return { valid, type };
    }

    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length != 11) {
      valid = false;
      return { valid, type };
    }

    let sum = 0;
    let remaining;

    for (i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remaining = (sum * 10) % 11;
    if (remaining == 10 || remaining == 11) remaining = 0;

    if (remaining != parseInt(cpf.substring(9, 10))) {
      valid = false;
      return { valid, type };
    }

    sum = 0;
    for (i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remaining = (sum * 10) % 11;
    if (remaining == 10 || remaining == 11) remaining = 0;

    if (remaining != parseInt(cpf.substring(10, 11))) {
      valid = false;
      return { valid, type };
    }

    valid = true;
    return { valid, type };
  }
};

module.exports = {
  isDocumentValid,
};
