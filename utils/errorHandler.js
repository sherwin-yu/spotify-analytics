require('dotenv').config();

module.exports = (err, location, res) => {
  // eslint-disable-next-line no-console
  console.error(`
    -------------------------
    Function Name: ${location}
    Error Name: ${err.name}
    Error Message: ${err.message}
    Error Stack: ${err.stack}
    -------------------------`);
  return res.status(err.status).json(err.message);
};
