const express = require('express');

const router = express.Router();

const { isAuth } = require('../middlewares/is-auth')
const adminController = require('../controllers/adminController');

router.get('/', isAuth, adminController.getIndex);
router.get('/tugas', isAuth, adminController.getTasks);
router.get('/profil', isAuth, adminController.getProfile);
router.post('/profil/edit', adminController.postEditProfile);
router.post('/profil/change-password', adminController.postChangePassword);
router.get('/tambah', isAuth, adminController.getAddTask);
router.post('/tambah', isAuth, adminController.postAddTask);;
router.get('/edit/:taskId', isAuth, adminController.getEditTask);
router.post('/edit', isAuth, adminController.postEditTask);
router.get('/detail/:taskId', isAuth, adminController.getTask)
router.post('/hapus/:taskId', isAuth, adminController.postDeleteTask)

module.exports = router;