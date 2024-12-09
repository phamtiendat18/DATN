const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo rằng file cấu hình Sequelize đã được thiết lập

const Payment = sequelize.define('Payment', {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  insurance_coverage: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'payments',
  timestamps: true, // Vì cột `created_at` và `updated_at` đã được định nghĩa, nên bỏ timestamps mặc định
});

module.exports = Payment;