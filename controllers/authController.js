const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        pageTitle: 'Daftar Akun SIMENTA - Sistem Informasi Manajemen Tugas Kuliah',
        layout: 'layouts/auth-layout'
    });
};

exports.postSignup = (req, res) => {
    const { nama, email, npm, password } = req.body;
    User.findOne({ where: { email } })
        .then(user => {
            if(user) {
                return res.redirect('/auth/daftar');
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            return User.create({ nama, email, npm, password: hashedPassword });
        })
        .then(result => {
            console.log('Berhasil Daftar!');
            res.redirect('/auth/masuk');
        })
        .catch(err => console.log(err));
};

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Masuk Akun SIMENTA - Sistem Informasi Manajemen Tugas Kuliah',
        layout: 'layouts/auth-layout'
    })
}

exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    let foundUser;
    User.findOne({ where: { email: email } })
        .then(matchUser => {
            if (!matchUser) {
                console.log("Email / Password Invalid");
                return res.redirect('/auth/masuk');
            }
            foundUser = matchUser;
            return bcrypt.compare(password, matchUser.password);
        })
        .then(doMatch => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = foundUser;
                req.session.save(err => {
                    console.log(err);
                    res.redirect('/admin');
                });
            } else {
                console.log("Password Invalid");
                return res.redirect('/auth/masuk');
            }
        })
        .catch(err => console.log(err));
}

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        err ? console.log(err.message) : console.log("Sesi berhasil dihapus");
        res.redirect('/');
    })
}