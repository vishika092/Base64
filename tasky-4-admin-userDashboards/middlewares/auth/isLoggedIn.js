import jwt from "jsonwebtoken";
function isLoggedIn(req, res, next) {
  try {
    let token = req.cookies["access_token"];
    if (!token) {
      return next();
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET); // throws Error for invalid token
    req.user = payload;
    //    return res.redirect("/task/add")
    if (payload.role === "user") {
      res.redirect("/user/userDashboard");
    } else if (payload.role === "admin") {
      res.redirect("/admin");
    }
  } catch (error) {
    res.clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    });
    return next();
  }
}

export default isLoggedIn;
