const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Lấy danh sách thanh toán
router.get('/', paymentController.getAllPayments);

router.get('/checking/:id', paymentController.checkingPayment);

router.get('/patient/:id', paymentController.getAllPaymentsByPatient);

// Thêm thanh toán mới
router.post('/', paymentController.createPayment);

// Cập nhật thanh toán
router.put('/:id', paymentController.updatePayment);

// Xóa thanh toán
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
