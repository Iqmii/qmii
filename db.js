const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://liqmilde:tUN0wYAzhFI8ldBI@cluster0.nfyku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connect erfolg'))
.catch((err) => console.error('connect error MongoDB:', err));  

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email:    { type: String, required: true},
    password: { type: String, required: true},
    confirmationCode: { type: String, },
    Code:  { type: String, },
    isVerified: { type: Boolean, default: false },

})


module.exports = {
    mongoose,
    User: mongoose.model('User', userSchema)
  };
  
