import paypal from 'paypal-rest-sdk';
import env from '../../../../config/env';

paypal.configure({
    mode: env.paypal_environment,
    client_id: env.paypal_client_id,
    client_secret: env.paypal_client_secret
});

export default {
    createPayment(transactions, paymentTransactionId) {
        const createPaymentJson = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: `${env.paypal_sucess_url}?&paymentTransactionId=${paymentTransactionId}&success=true`,
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

    executePayment(payerId, paymentId) {
        const executePaymentJson = {
            payer_id: payerId
        };

        return new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, executePaymentJson, function (error, payment) {
                if (error) {
                    reject(error);
                } else {
                    console.log("Get Payment Response");
                    console.log(JSON.stringify(payment));
                    resolve(payment);
                }
            });
        });
    },

    refundPayment(saleId) {
        return new Promise((resolve, reject) => {
            paypal.sale.refund(saleId, null, function (error, refund) {
                if (error) {
                    console.error(JSON.stringify(error));
                    reject();
                } else {
                    console.log("Refund Sale Response");
                    console.log(JSON.stringify(refund));
                    resolve();
                }
            });
        });
    }

}