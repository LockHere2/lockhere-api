const config = {
  production: {
    secret: process.env.secret,
    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT,
  },
  development: {
    secret: 'I_AME_GERER',
    mongoUri: 'mongodb://localhost/db_api',
    port: 3000,
    geoUri: 'https://api.opencagedata.com/geocode/v1/json',
    geoApiKey: '793b15cd73b4480bb68801a573bc8ea6'
  },
  test: {
    secret: 'I_AME_GERER',
    mongoUri: 'mongodb://localhost/db_api_test',
    port: 3000,
    geoUri: 'https://api.opencagedata.com/geocode/v1/json',
    geoApiKey: '793b15cd73b4480bb68801a573bc8ea6'
  }
};

export default config[process.env.NODE_ENV] || config.development;
