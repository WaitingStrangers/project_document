// middleware/auth.js

module.exports = (req, res, next) => {
  // 临时直接放行所有请求
   console.log("auth middleware called");
  next();
};
