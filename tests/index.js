const Bkash = require('../src/index');

let username = "sandboxTokenizedUser02";
let password = "sandboxTokenizedUser02@12345";
let appKey = "4f6o0cjiki2rfm34kfdadl1eqq";
let appSecret = "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b";

(async () => { // const obj = new Bkash(username, password, appKey, appSecret, true);
    const obj = await Bkash.init(username, password, appKey, appSecret, true);
    let token = await obj.grantToken();
    // console.log(obj.tokenType);

    // refresh token
    setTimeout(async () => {
        const refresh = await obj.grantRefreshToken();
        console.log(refresh);
    }, 2000)

    // create agreement
    setTimeout(async () => {
        const createAgreement = await obj.createAgreement();
        console.log(createAgreement);
    }, 2000)


    // execute agreement
    setTimeout(async () => {
        const exeAgreement = await obj.executeAgreement();
        console.log(exeAgreement);
    }, 60000)

    // query agreement
    setTimeout(async () => {
        const queAgreement = await obj.queryAgreement();
        console.log(queAgreement);
    }, 80000)

    // cancel agreement
    /*  setTimeout(async () => {
        const canAgreement = await obj.cancelAgreement();
        console.log(canAgreement);
    }, 90000) */

    // create payment
    setTimeout(async () => {
        const createPayment = await obj.createPayment();
        console.log(createPayment);
    }, 100000)

    // execute payment
    setTimeout(async () => {
        const executePayment = await obj.executePayment();
        console.log(executePayment);
    }, 120000)

    // query payment
    setTimeout(async () => {
        const queryPayment = await obj.queryPayment();
        console.log(queryPayment);
    }, 140000)

    // search transaction
    setTimeout(async () => {
        const searchTrans = await obj.searchTransac();
        console.log(searchTrans);
    }, 160000)

    // refund transaction
    setTimeout(async () => {
        const refundTrans = await obj.refundTransac();
        console.log(refundTrans);
    }, 180000)

    // refund status
    setTimeout(async () => {
        const refundStatus = await obj.refundStatus();
        console.log(refundStatus);
    }, 200000)

})();
