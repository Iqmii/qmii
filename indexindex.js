
const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '831009918252-lg48dt8tbi0ls77lgtj71lelss6j18dl.apps.googleusercontent.com' ;
const CLIENT_SECRET = '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';
const REFRESH_TOKEN = '1//04BE9Bmd47iX9CgYIARAAGAQSNwF-L9Irqt2gfAQWyyFPoq9GR9RytKDRfDB6rVq20Rmpy1Wh1jcn09nJotIZa2GcWehDKm9s-XM' ;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'liqmil.de@gmail.com', // обов'язково має бути Gmail, який авторизувався
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token
      },
    });

    const mailOptions = {
      from: 'liqmil.de@gmail.com',
      to: 'davidbilous1910@gmail.com',
      subject: 'Тема листа',
      text: 'Привіт! Це лист із Nodemailer + OAuth2',
      // html: '<h1>Привіт!</h1>',
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
    return result;
  } catch (error) {
    console.error('Помилка при відправленні листа:', error);
    throw error;
  }
}

sendMail();