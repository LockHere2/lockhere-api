const config = {
  production: {
    secret: process.env.secret,
    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT,
  },
  development: {
    secret: 'I_AME_GERER',
    //mongoUri: 'mongodb://localhost/db_api',
    mongoUri: 'mongodb://DESKTOP-6MUPTS0:27017,DESKTOP-6MUPTS0:27018,DESKTOP-6MUPTS0:27019/db_api?replicaSet=rs',
    port: 3000,
    geoUri: 'https://api.opencagedata.com/geocode/v1/json',
    geoApiKey: '793b15cd73b4480bb68801a573bc8ea6'
  },
  test: {
    secret: 'I_AME_GERER',
    mongoUri: 'mongodb+srv://dev:vM8hKlMtEsfJQ5v8@lock-here-production.hyp74.gcp.mongodb.net/db_api_test?retryWrites=true&w=majority',
    port: 3000,
    geoUri: 'https://api.opencagedata.com/geocode/v1/json',
    geoApiKey: '793b15cd73b4480bb68801a573bc8ea6'
  },
  testlocal: {
    secret: 'I_AME_GERER',
    mongoUri: 'mongodb://DESKTOP-6MUPTS0:27017,DESKTOP-6MUPTS0:27018,DESKTOP-6MUPTS0:27019/db_api_test?replicaSet=rs',
    port: 3000,
    geoUri: 'https://api.opencagedata.com/geocode/v1/json',
    geoApiKey: '793b15cd73b4480bb68801a573bc8ea6'
  }
};

export default config[process.env.NODE_ENV] || config.development;
