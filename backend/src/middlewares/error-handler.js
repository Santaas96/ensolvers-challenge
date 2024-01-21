export default function errorHandler(error, req, res, next) {
  const status = 400;
  const message = error.message || error;
  
  // ---LOGGER---
  const errorLog = {
    path: req.path,
    result: "ERROR",
    status,
    details: error,
  };
  console.error(errorLog);

  // ---RESPONSE HANDLER---
  res.status(status).send({ result: "ERROR", status, error: message });
}
