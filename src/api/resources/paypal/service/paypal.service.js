import paypal from 'paypal-rest-sdk';
import env from '../../../../config/env';

paypal.configure({
    mode: env.paypal_environment,
    client_id: env.paypal_client_id,
    client_secret: env.paypal_client_secret
});

export default {
    createPayment(transactions) {
        const createPaymentJson = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: env.paypal_sucess_url,
                cancel_url: env.paypal_error_url
            },
            transactions
        };

        return new Promise((resolve, reject) => {
            paypal.payment.create(createPaymentJson, function (error, payment) {
                if (error) {
                    reject(error);
                } else {
                    console.log("Create Payment Response");
                    console.log(payment);
                    resolve(payment.links[1].href);
                }
            });
        });
    },

    executePayment(payerId, paymentId, transactions) {
        const executePaymentJson = {
            payer_id: payerId,
            transactions
        };

        return new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, executePaymentJson, function (error, payment) {
                if (error) {
                    reject(error);
                } else {
                    console.log("Get Payment Response");
                    console.log(JSON.stringify(payment));
                    resolve();
                }
            });
        });
        
    }

}