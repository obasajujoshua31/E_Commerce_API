import sgMail from "@sendgrid/mail";
import emailTemplate from "./template";

const isTest = process.env.NODE_ENV === 'test';

const { SENDGRID_KEY, EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

/**
 * @description This sends email to the email provided with the payload provided
 * @param  {string} email
 * @param  {Array} payload
 * @returns {Promise} sendEmail
 */
const sendEmail = async (email, payload) => {
  const msg = {
    to: email,
    from: EMAIL,
    subject: "Your Order at Joshua E-Commerce",
    html: emailTemplate(payload)
  };
  return isTest ? Promise.resolve("Email Sent") : await sgMail.send(msg);
};

export default sendEmail;
