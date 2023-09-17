const path = require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const sequelize = require('./utils/database');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');
const compression = require('compression');
const morgan = require('morgan');
// const serverless = require('serverless-http');

const app = express();
const PORT = 3000;

// const router = express.Router();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
});
// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(session({
    secret: 'manage app',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 7 },
    store: new SequelizeStore({
        db: sequelize,
    })
}));
app.use(flash());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use((req, res, next) => {
    if(!req.session.user) {
        next();
    } else {
        User.findByPk(req.session.user.id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => console.log(err));
    }
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.user = req.user;
    next();
});

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth')
const pageController = require('./controllers/pageController');
const errorController = require('./controllers/errorController');

const User = require('./models/User');
const Task = require('./models/Task');

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.get('/', pageController.getIndex);
app.get('*', errorController.get404);

// app.use('/netlify/function/', router);

User.hasMany(Task);
Task.belongsTo(User, { constraints: true, onDelete: true });

// sequelize.sync({ force: true })
sequelize.sync()
    .then(result => {
        // https
        //     .createServer({key: privateKey, cert: certificate}, app)
        //     .listen(process.env.PORT || PORT);
        app.listen(process.env.PORT || PORT);
    })
    .catch(err => console.log(err));

// module.exports.handler = serverless(app);