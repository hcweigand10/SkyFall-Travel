const withAuth = (req, res, next) => {
    if (!req.session.user.id) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  
