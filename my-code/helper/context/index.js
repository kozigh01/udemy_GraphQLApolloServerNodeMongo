const jwt = require('jsonwebtoken');
const User = require('../../database/models/user');

module.exports.verifyUser = async (req) => {
  try {
    req.email = null;
    req.userid = null;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'mysecretkey');
      const user = await User.findOne({ email: payload.email });
      if (!user) {
        throw new Error('User not found');
      }
      req.email = user.email;
      req.userid = user.id;
    }
  } catch(err) {
    console.error(err);
    throw err;
  }
};