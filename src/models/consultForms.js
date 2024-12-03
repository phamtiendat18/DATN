// models/consultForm.js
module.exports = (sequelize, DataTypes) => {
  const ConsultForm = sequelize.define(
    "ConsultForm",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      meeting_info: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.TIMESTAMP,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.TIMESTAMP,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "consult_forms",
      timestamps: true,
    }
  );

  // Định nghĩa quan hệ với các bảng khác (nếu có)
  ConsultForm.associate = function (models) {
    // Ví dụ: mối quan hệ với bảng appointments và staff
    ConsultForm.belongsTo(models.Appointment, { foreignKey: "appointment_id" });
    ConsultForm.belongsTo(models.Staff, { foreignKey: "staff_id" });
  };

  return ConsultForm;
};
