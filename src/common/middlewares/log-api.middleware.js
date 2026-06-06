export const logAPI = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] ${method} ${url} - ${ip}`;
  console.log(message);
  next();
};
