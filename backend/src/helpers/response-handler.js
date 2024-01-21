export const responseHandler = (res, body) => {
  const status = 200;
  res.status(status).send({ result: "OK", status, data: body });
};