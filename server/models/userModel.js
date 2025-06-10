const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Lütfen adınızı giriniz!'],
    },
    email: {
        type: String,
        required: [true, 'Lütfen email adresinizi giriniz!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Lütfen geçerli bir email adresi giriniz!'],
    },
    password: {
        type: String,
        required: [true, 'Lütfen şifrenizi giriniz!'],
        minlength: 8,
        select: false, //! false yaparak şifreyi istemciye göndermiyoruz
    },
    passwordConfirm: {
        type: String,
        required: [true, "Lütfen şifrenizi onaylayınız!"],
        validate: {
            validator: function (val) {
                return val === this.password; //! this.password ile passwordConfirm'un aynı olup olmadığını kontrol ediyoruz
            }
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        // select: false, //! false yaparak rolü istemciye göndermiyoruz
    },
    favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  ]
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); //! password değişmemişse next() ile geçiyoruz
    this.password = await bcrypt.hash(this.password, 12); //! password'u hashliyoruz
    this.passwordConfirm = undefined; //! passwordConfirm'u undefined yapıyoruz
    next(); //! middleware'i geçiyoruz
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword); //? password alanını karşılaştır
}

const User = mongoose.model('User', userSchema); //! User modelini oluşturuyoruz

module.exports = User; //! User modelini dışarı aktarıyoruz