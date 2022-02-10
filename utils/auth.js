const withAuth = (req, res, next) => {
    console.log("checking auth")
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login");
    }
  };
  
  module.exports = withAuth;
  
