const bcrypt = require('bcryptjs');

const { User } = require("./db")
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { gmail } = require("googleapis/build/src/apis/gmail");






 class authController {
    async registration (req, res) {
        try {
            
            const {username, password, email} = req.body
            const candidate = await User.findOne({username, email});
            const candidateEmail = await User.findOne({email});
            
            if (candidate) {
                return res.status(400).json({message: "diese name ist nicht frei/email"})
                console.log("felher , authcontroller.js 20")
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            const generateCode = () => Math.floor(10000 + Math.random() * 90000 ).toString();
            const confirmationCode = generateCode();
            const user =  new User({username, email, confirmationCode,  password: hashPassword})
            
            await user.save();

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
                  to: email,
                  subject: 'Verification code',
                  text: 'Привіт! Це ваш код підтвердження: ' + confirmationCode,
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
           
            return res.status(201).json({ message: "успішно зареєстровано" });
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'REgistration error'})
              
           
        }
    }
    async login (req, res) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'login error'})
        }
    }
    async getUsers (req, res) {
        try {
            res.json(' server lauft')
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'users error'})
        }
    }

    async vereficationCode(req, res) {
      try {
        const { code } = req.body;
        const user = await User.findOne({ confirmationCode: code });
        
        if (!user) {
          return res.status(400).json({ message: "diese name ist nicht frei/email" });
        }
        
        user.isVerified = true;
        user.confirmationCode = undefined;
    
        await user.save();
        
        return res.status(200).json({
          message: "Email успішно підтверджено",
          redirectUrl: '/'
        }); 

      } catch (e) {
        console.log(e);
        return res.status(400).json({ message: "users error" });
      }
    }
    


};







module.exports = new authController();
