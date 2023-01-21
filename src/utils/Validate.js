export function validateEmail(email) {
  if (!email) return true;

  const re =
    /^(([^<>()\[\]\\.,;:\s@""''””’]+(\.[^<>()\[\]\\.,;:\s@""''””’ ]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([ a-zA-Z\-0-9]+\.)+[ a-zA-Z]{2,})){0,50}$/;

  return re.test(email);
}

export function validateString(str) {
  if (!str) return true;
  const re = /^[A-Za-zÀ-ÿ\u00f1\u00d1 ]{2,40}$/;
  return re.test(str);
}
export function validateStringAndNumber(str) {
  if (!str) return true;
  const re = /^[A-Za-z0-9 ]{0,40}$/;
  return re.test(str);
}
export function validateSitioWeb(str) {
  if (!str) return true;
  const re = /^[A-Za-z0-9./]{0,40}$/;
  return re.test(str);
}

export function validateNumber(num) {
  if (!num) return true;
  const re = /^[0-9]{0,16}$/;
  return re.test(num);
}
export function validateModelo(mod) {
  if (!mod) return true;
  const re = /^[0-9]{4,4}$/;
  return re.test(mod);
}

export function validatePassword(pass) {
  if (!pass) return true;

  const re = /^(?=.*[0-9])(?=.*[A-Z])[A-Za-z0-9]{8,12}$/;
  return re.test(pass);
}

export function validateConfirmPassword(pass, confirmPass) {
  if (!confirmPass) return true;

  if (pass === confirmPass) {
    return true;
  } else {
    return false;
  }
}

export function validateAge(date) {
  let dateNow = new Date();
  let age = dateNow.getFullYear() - date.getFullYear();
  var m = dateNow.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && dateNow.getDate() < date.getDate())) {
    age--;
  }

  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}

export function validateCod(cod) {
  if (!cod) return true;
  const re = /^[0-9]{6}$/;
  return re.test(cod);
}

export function validateAgeAds(date) {
  let dateNow = new Date();
  let age = dateNow.getFullYear() - date.getFullYear();
  var m = dateNow.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && dateNow.getDate() < date.getDate())) {
    age--;
  }

  return age;
}
export function validateDescription(str) {
  if (!str) return true;
  const re =
    /^[.,;:?¿!¡@a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[.,;:?¿!¡@a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[.,;:?¿!¡@a-zA-ZÀ-ÿ\u00f1\u00d1]{0,200}$/;
  return re.test(str);
}
export function validateReason(str) {
  if (!str) return true;
  const re =
    /^[.,;:?¿!¡@a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+(\s*[.,;:?¿!¡@a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[.,;:?¿!¡@a-zA-ZÀ-ÿ0-9\u00f1\u00d1]{0,300}$/;
  return re.test(str);
}
export function validateReview(str) {
  if (!str) return true;
  const re =
    /^[.,;:?¿!¡@a-zA-ZÀ-ÿ\u00f1\u00d10-9]+(\s*[.,;:?¿!¡@a-zA-ZÀ-ÿ\u00f1\u00d10-9]*)*[.,;:?¿!¡@a-zA-ZÀ-ÿ\u00f1\u00d10-9]{0,150}$/;
  return re.test(str);
}
export function validateSpace(str) {
  if (!str) return false;

  const re =
    /^(?=.*[A-Za-z0-9.?¿,])[?¿,.0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[?¿,.0-9a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[?¿,.0-9a-zA-ZÀ-ÿ\u00f1\u00d1]{0,200}$/;
  return re.test(str);
}
