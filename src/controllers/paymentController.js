const Payment = require("../models/payments");
const Staffs = require("../models/staffs")

Payment.belongsTo(Staffs, { foreignKey: "staff_id" });
// Lấy danh sách tất cả các bản ghi thanh toán
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({include: [
      {
        model: Staffs,
        attributes: ["name", "user_id"],
      },
    ],order: [['id', 'DESC']]});
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách thanh toán' });
  }
};

const getAllPaymentsByPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const payments = await Payment.findAll({where: {patient_id: id}});
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách thanh toán' });
  }
};
const checkingPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payments = await Payment.findAll({where: {patient_id: id, status: false}});
    if (payments.length) {
        res.status(200).json({status: false, message: "Bạn có hóa đơn chưa thanh toán!"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách thanh toán' });
  }
};

// Thêm một bản ghi thanh toán mới
const createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo thanh toán mới' });
  }
};

// Cập nhật thông tin thanh toán
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Payment.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedPayment = await Payment.findOne({ where: { id } });
      res.status(200).json(updatedPayment);
    } else {
      res.status(404).json({ message: 'Không tìm thấy thanh toán cần cập nhật' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi cập nhật thanh toán' });
  }
};

// Xóa một bản ghi thanh toán
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Payment.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'Đã xóa thanh toán thành công' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy thanh toán để xóa' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi xóa thanh toán' });
  }
};

module.exports = {
  getAllPayments,
  getAllPaymentsByPatient,
  createPayment,
  updatePayment,
  deletePayment,
  checkingPayment
};
