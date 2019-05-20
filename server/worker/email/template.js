import Mailgen from "mailgen";

// Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Joshua E-Commerce",
    link: "https://github.com/obasajujoshua31/turing_backend"
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  }
});

const emailTemplate = (data) => {
    const emailBody = {
        body: {
            table: {
                data,
                columns: {
                    // Optionally, customize the column widths
                    customWidth: {
                        item_id: '8%',
                        order_id: '8%',
                        product_id: '8%',
                        attributes: '10%',
                        name: '25%',
                        quantity: '15%',
                        unit_cost: '10%',

                    },
                }
            }
        }
    };
    return mailGenerator.generate(emailBody);
};

export default emailTemplate;
