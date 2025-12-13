import 'dotenv/config';



export default {
  schema: './src/modules/*.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,


  }
};
