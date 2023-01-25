const auth = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/signup");
    } else {
      next();
    }
  };
  
  module.exports = auth;