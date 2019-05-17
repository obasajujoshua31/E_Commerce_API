export default {
    makePayment: function() {
        return Promise.resolve({
            name: 'Joshua',
            amount: 2000
        });
    }  
};
