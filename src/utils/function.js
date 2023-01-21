export const handleChange = (
  e,
  validate,
  callback,
  data,
  name,
  callbackError,
  error,
  extra
) => {
  callback({ ...data, [name]: e });
  validate(e, extra)
    ? callbackError({ ...error, [name]: false })
    : callbackError({
        ...error,
        [name]: true,
      });
};
