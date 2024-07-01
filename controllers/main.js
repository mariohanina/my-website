// Modules
const nodemailer = require('nodemailer');

// Contact form credentials
const { EMAIL, PASSWORD, RECIPIENT } = process.env;

// nodemailer service set up
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});


// Render Main Page
module.exports.renderMainPage = (req, res) => { res.render("main/index") };

// Submit Contact Form
module.exports.submtContactForm = (req, res) => {
    const mailOptions = {
        from: EMAIL,
        to: RECIPIENT,
        subject: req.body.subject,
        text: `Email: ${req.body.email}\nPhone Number: ${req.body.phoneNumber}\nSubject: ${req.body.subject}\nMessage: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.render("main/contact-result.ejs", {
                heading: "Something went Wrong!",
                body: "Sorry about that, please try again later."
            })
        } else {
            console.log('Email sent: ' + info.response);
            res.render("main/contact-result.ejs", {
                heading: "Request received!",
                body: "Thank you, I will respond to you as soon as possible."
            })
        }
    });
}
