module.exports = ({ env }) => ({
   host: env("HOST", "0.0.0.0"),
   port: env.int("PORT", 1337),
   admin: {
      auth: {
         secret: env("ADMIN_JWT_SECRET", "9b7c1b210d08e9929d21bce6572483b2"),
      },
   },
   cron: {
      enabled: true,
   },
});
