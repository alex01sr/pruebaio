export const SET_COMUNIDADES = "SET_COMUNIDADES";
export const SET_DATA_USER = "SET_DATA_USER";
export const SET_DATA_JWT = "SET_DATA_JWT";
export const SET_REACCIONES = "SET_REACCIONES";
export function setComunidades(data) {
  return {
    type: SET_COMUNIDADES,
    payload: data,
  };
}
export function setDataUser(data) {
  return {
    type: SET_DATA_USER,
    payload: data,
  };
}

export function setJwt(data) {
  return {
    type: SET_DATA_JWT,
    payload: data,
  };
}
export function setReacciones(data) {
  return {
    type: SET_REACCIONES,
    payload: data,
  };
}
