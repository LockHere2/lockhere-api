const config = {
  production: {
    secret: process.env.SECRET_KEY,
    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT,
    geoUri: 'https://api.opencagedata.com/geocode/v1/json',
    geoApiKey: '793b15cd73b4480bb68801a573bc8ea6',
    companyEmail: 'lockherebusiness@gmail.com',
    companyEmailPassword: 'lock123here'
  },
  development: {
    secret: 'I_AME_GERER',
    mongoUri: 'mongodb://DESKTOP-6MUPTS0:27017,DESKTOP-6MUPTS0:27018,DESKTOP-6MUPTS0:27019/db_api?replicaSet=rs',
    port: 3000,
    geoUri: 'https://api.opencagedata.com/geocode/v1/json',
    geoApiKey: '793b15cd73b4480bb68801a573bc8ea6',
    companyEmail: 'lockherebusiness@gmail.com',
    companyEmailPassword: 'lock123here',
    paypal_environment: 'sandbox',
    paypal_sucess_url: 'http://10.0.2.2:3000/api/paypal/execute-payment',
    paypal_error_url: 'http://10.0.2.2:3000/api/paypal/cancel-payment',
    paypal_client_id: "AVnM0DWBWeZuyQFeOqdgAuI9xzGQXJzRm1OHn0uUXplXst6ftuwZ18ypY85aQ6Gvub6p-8US-2L9F_n-",
    paypal_client_secret: "EBSkmXgKcDKyksV5jZiv5MqF97e5nSncjwP93DQRgrcWUPHMZpJo6uNEp3wFDN0HfjZD1Gr7ld7kfxUh"
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
