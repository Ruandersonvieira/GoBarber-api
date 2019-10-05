export default {
  secret: process.env.APP_SECRET,
  config: {
    expiresIn: process.env.APP_EXPIRY,
  },
};
