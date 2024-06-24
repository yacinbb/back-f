

const role = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message:"exception role" });
      }
      next();
    };
  };
  
  module.exports = { role };
  