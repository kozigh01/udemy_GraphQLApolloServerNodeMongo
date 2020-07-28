const mongoose = require('mongoose');
const dotEnv = require('dotenv');

dotEnv.config();

module.exports.connection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URL,
      {
        // user: "mdk_user",
        // pass: "abcd1234",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, client) => {
        if (err) throw err;

      }
    );
    console.log('Database connected successfully');
  } catch(error) {
    console.error('Database connect error', error);
    throw error;
  }
}