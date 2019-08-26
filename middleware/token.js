const token = () => {
  const checkForToken = (req, res, next) => {
    if (!req.cookies.spotify_access_token) {
      console.log('no token');
      res.redirect('/auth/login');
    }
    return next();
  };
  return [checkForToken];
};

module.exports = token;
