const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Task = require('../models/Task');
const taskTime = require('../utils/taskTime');

exports.getIndex = (req, res) => {
    res.render('admin/index', {
        pageTitle: 'Home - Dashboard',
        layout: 'layouts/admin-layout'
    })
}

exports.getTasks = (req, res) => {
    Task.findAll({ where: { userId: req.user.id } })
        .then(tasks => {
            tasks.forEach(task => {
                taskTime(task);
            });
            res.render('admin/tasks', {
                pageTitle: 'Dashboard',
                layout: 'layouts/admin-layout',
                tasks: tasks,
            });
        })
        .catch(err => console.log(err));
}

exports.getTask = (req, res) => {
    const taskId = req.params.taskId;
    Promise.all([User.findAll(), Task.findByPk(taskId)])
        .then(([user, task]) => {
            taskTime(task)
            res.render('admin/detail', {
                pageTitle: 'Detail Page',
                layout: 'layouts/admin-layout',
                task: task,
                user: user
            });
        })
        .catch(err => console.log(err));
}

exports.getProfile = (req, res) => {
    res.render('admin/profile', {
        pageTitle: 'Profile',
        layout: 'layouts/admin-layout'
    })
}


exports.getAddTask = (req, res) => {
    res.render('admin/add', {
        pageTitle: 'Add Task',
        layout: 'layouts/admin-layout.ejs'
    });
};

exports.postAddTask = (req, res) => {
    const { mata_kuliah, dosen, deskripsi, deadline, status } = req.body;
    Task.create({ mata_kuliah, dosen, deskripsi, deadline, status, userId: req.user.id })
        .then(result => {
            console.log("Data ditambahkan");
            res.redirect('/admin/tugas');
        })
        .catch(err => console.log(err));
};

exports.getEditTask = (req, res) => {
    const taskId = req.params.taskId;
    Task.findByPk(taskId)
        .then(task => {
            res.render('admin/edit', {
                pageTitle: 'Edit Task',
                layout: 'layouts/admin-layout',
                task: task,
                });
            })
            .catch(err => console.log(err));
};

exports.postEditTask = (req, res) => {
    const taskId = req.body.taskId; 
    const updatedMataKuliah = req.body.mata_kuliah;
    const updatedDosen = req.body.dosen;
    const updatedDeskripsi = req.body.deskripsi;
    const updatedDeadline = req.body.deadline !== "" ? req.body.deadline : req.body.oldDate;
    const updatedStatus = req.body.status;
    Task.findByPk(taskId)
        .then(task => {
            if(task.userId.toString() !== req.user.id.toString()) {
                return('/')
            }
            task.mata_kuliah = updatedMataKuliah,
            task.dosen = updatedDosen,
            task.deskripsi = updatedDeskripsi,
            task.deadline = updatedDeadline,
            task.status = updatedStatus
            return task.save();
        })
        .then(result => {
            console.log("Berhasil Edit");
            res.redirect('/admin/tugas');
        })
        .catch(err => console.log(err));
}

exports.postDeleteTask = (req, res) => {
    const taskId = req.params.taskId;
    Task.destroy({ where: {id: taskId, userId: req.user.id} })
        .then(result => {
            console.log("Berhasil menghapus tugas");
            res.redirect('/admin/tugas');
        })
        .catch(err => console.log(err));
}

exports.postEditProfile = (req, res) => {
    const { nama, email, npm, foto_url, password } = req.body;
    const userId = req.user.id
    User.findByPk(userId)
        .then(user => {
            if(!user) {
                throw new Error('User tidak ditemukan!');
            }
            return bcrypt.compare(password, user.password);
        })
        .then(validPassword => {
            if(!validPassword) {
                throw new Error("Invalid Password");
            }
            return User.update({ nama, email, npm, foto_url }, {where: {id: userId } });
        })
        .then(result => {
            console.log("Profil berhasil diubah");
            res.redirect('/admin/profil');
        })
        .catch(err => console.log(err));
}

exports.postChangePassword = (req, res) => {
    const { oldPw, oldPwConf, newPw } = req.body;
    let user;
    if( oldPw === oldPwConf ) {
        User.findOne({ where: {id: req.user.id} })
        .then(foundUser => {
            if(!foundUser) {
                return console.log("Invalid User");
            }
            user = foundUser;
            return bcrypt.hash(newPw, 12)
        })
        .then(hashedPassword => {
            user.password = hashedPassword;
            return user.save();
        })
        .then(result => {
            console.log("Berhasil mengubah password");
            res.redirect('/admin/profil');
        })
        .catch(err => console.log(err));
    } else {
        console.log('Password Confirmation not match');
        res.redirect('/admin/profil');
    }
}