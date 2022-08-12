const fetch = require('./utils/fetch');

class BaseClass {
    sandbox = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
    live = "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout";

    constructor(username, password, appKey, appSecret, isDev) {
        this.username = username;
        this.password = password;
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.baseUrl = isDev ? this.sandbox : this.live;
    }

    static async init(username, password, appKey, appSecret, isDev) {
        const o = new BaseClass(username, password, appKey, appSecret, isDev);
        await o.grantToken();
        return o;
    }

    // grant token
    async grantToken() {
        try {
            let url = this.baseUrl + '/token/grant';

            let headers = {
                'username': this.username,
                'password': this.password
            };

            let data = {
                app_key: this.appKey,
                app_secret: this.appSecret
            };

            let res = await fetch({method: "POST", url, headers, data});

            if (res ?. statusCode === '0000') {
                this.token = res ?. id_token;
                this.tokenType = res ?. tokenType;
                this.refreshToken = res ?. refresh_token;
            }
            // console.log(res)
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // refresh token
    async grantRefreshToken() {
        try {
            let url = this.baseUrl + '/token/refresh';
            let headers = {
                username: this.username,
                password: this.password
            };

            let data = {
                app_key: this.appKey,
                app_secret: this.appSecret,
                refresh_token: this.refreshToken
            };

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.token = res ?. id_token;
                this.tokenType = res ?. token_type;
                this.refreshToken = res ?. refresh_token;

            };
            return res;

        } catch (e) {
            throw new Error(e.message);
        }
    }

    // create agreement
    async createAgreement() {
        try {
            let url = this.baseUrl + '/create';

            let data = {
                mode: '0000',
                payerReference: '01770618575',
                callbackURL: this.baseUrl,
                amount: '500'
            }

            let headers = {
                'Authorization': this.token,
                'X-App-Key': this.appKey
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.paymentID = res ?. paymentID;
                this.bkashURL = res ?. bkashURL;
                this.payerReference = res ?. payerReference
            }
            return res;
        } catch (e) {
            throw new Error(e.message)
        }
    }

    // execute agreement
    async executeAgreement() {
        try {
            let url = this.baseUrl + '/execute';

            let data = {
                paymentID: this.paymentID
            }

            let headers = {
                'Authorization': this.token,
                'X-App-Key': this.appKey
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.paymentID = res ?. paymentID;
                this.agreementID = res ?. agreementID

            }
            return res;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // query agreement
    async queryAgreement() {
        try {
            let url = this.baseUrl + '/agreement/status';

            let data = {
                agreementID: this.agreementID
            }

            let headers = {
                'Authorization': this.token,
                'X-App-Key': this.appKey
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.agreementID = res ?. agreementID;
            }
            return res;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // cancel agreement
    async cancelAgreement() {
        try {
            let url = this.baseUrl + '/agreement/cancel';

            let data = {

                agreementID: this.agreementID
            }

            let headers = {
                'Authorization': this.token,
                'X-App-Key': this.appKey
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.paymentID = res ?. paymentID;
                this.agreementID = res ?. agreementID;
            }
            return res;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // create payment
    async createPayment() {
        try {
            let url = this.baseUrl + '/create';

            let data = {
                'agreementID': this.agreementID,
                "mode": "0001",
                "payerReference": "01770618575",
                "callbackURL": this.baseUrl,
                "merchantAssociationInfo": "MI05MID54RF09123456One",
                "amount": "12",
                "currency": "BDT",
                "intent": "sale",
                "merchantInvoiceNumber": "Inv0124"


            }

            let headers = {
                Authorization: this.token,
                'X-App-Key': this.appKey
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.paymentID = res ?. paymentID;
                this.bkashURL = res ?. bkashURL;
                this.payerReference = res ?. payerReference
            }
            return res;

        } catch (e) {
            throw new Error(e.message);
        }
    }

    // execute payment
    async executePayment() {

        try {
            let url = this.baseUrl + "/execute";
            let data = {

                'paymentID': this.paymentID
            };

            let headers = {
                Authorization: this.token,
                "X-APP-Key": this.appKey
            };
            const res = await fetch({method: "POST", url, headers, data});

            if (res ?. statusCode === "0000") {
                this.paymentID = res ?. paymentID;
            }

            return res;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    // query payment
    async queryPayment() {
        try {
            let url = this.baseUrl + '/payment/status';

            let data = {
                paymentID: this.paymentID
            }

            let headers = {
                'Authorization': this.token,
                'X-App-Key': this.appKey
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.paymentID = res ?. paymentID;
            }
            return res;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // search transaction
    async searchTransac() {
        try {
            let url = this.baseUrl + '/general/searchTransaction';

            let data = {
                trxID: this.trxID
            }

            let headers = {
                'Authorization': this.token,
                'X-App-Key': this.appKey
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.trxID = res ?. trxID;
            }
            return res;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // refund transaction
    async refundTransac() {
        try {
            let url = this.baseUrl + '/general/searchTransaction';

            let data = {
                paymentID: this.paymentID,
                amount: this.amount,
                trxID: this.trxID,
                sku: this.sku,
                reason: this.reason
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.paymentID = res ?. paymentID;
                this.amount = res ?. amount;
                this.trxID = res ?. trxID,
                this.sku = res ?. sku,
                this.reason = res ?. reason
            }
            return res;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    // refund status
    async refundStatus() {
        try {
            let url = this.baseUrl + '/payment/refund';

            let data = {
                paymentID: this.paymentID,
                trxID: this.trxID
            }

            let res = await fetch({method: "POST", url, headers, data});
            if (res ?. statusCode === '0000') {
                this.paymentID = res ?. paymentID;
                this.trxID = res ?. trxID
            }
            return res;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = BaseClass;
