const mongoose = require('mongoose');
const dotEnv = require('dotenv');

dotEnv.config();

module.exports.connection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URL,
      {
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log('Database connected successfully');
  } catch(error) {
    console.error('Database connect error', error);
    throw error;
  }
}