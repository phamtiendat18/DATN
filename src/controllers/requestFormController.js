const RequestForm = require("../models/requestForms");
const Staffs = require("../models/staffs");
const TypeForms = require("../models/typeForms");

RequestForm.belongsTo(Staffs, { foreignKey: "staff_id" });
TypeForms.hasOne(RequestForm, { foreignKey: "type_id" });
RequestForm.belongsTo(TypeForms, { foreignKey: "type_id" });

module.exports = {
  // Get all request forms
  async getAllForm(req, res) {
    try {
      const requestForms = await RequestForm.findAll();
      res.status(200).json({data: requestForms, status: 200});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch request forms', details: error });
    }
  },

  // Get request form by ID
  async getFormById(req, res) {
    try {
      const { id } = req.params;
      const requestForm = await RequestForm.findByPk(id);
      if (!requestForm) {
        return res.status(404).json({ error: 'Request form not found' });
      }
      res.status(200).json(requestForm);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch request form', details: error });
    }
  },

  // Get request form by patient ID
  async getFormByPatientId(req, res) {
    try {
      const { id } = req.params;
      const requestForm = await RequestForm.findAll({where: {patient_id: id}});
      if (!requestForm) {
        return res.status(404).json({ error: 'Request form not found' });
      }
      res.status(200).json(requestForm);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch request form', details: error });
    }
  },
  // Get request form by staff ID
  async getFormByStaffId(req, res) {
    try {
      const { id } = req.params;
      const requestForm = await RequestForm.findAll({where: {staff_id: id}});
      if (!requestForm) {
        return res.status(404).json({ error: 'Request form not found' });
      }
      res.status(200).json(requestForm);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch request form', details: error });
    }
  },

  // Create a new request form
  async createForm(req, res) {
    try {
      const { staff_id, code, disease_progress, type_id } = req.body;
      const newRequestForm = await RequestForm.create({
    
        staff_id,
        code,
        disease_progress,
        type_id,
      });
      res.status(201).json({data: newRequestForm, status: 201, message: "Tạo phiếu yêu cầu hội chẩn thành công"});
    } catch (error) {
      res.status(500).json({ error: 'Failed to create request form', details: error });
    }
  },

  // Update a request form
  async updateForm(req, res) {
    try {
      const { id } = req.params;
      const { staff_id, code, disease_progress, type_id } = req.body;

      const requestForm = await RequestForm.findByPk(id);
      if (!requestForm) {
        return res.status(404).json({ error: 'Request form not found' });
      }

      await requestForm.update({
    
        staff_id,
        code,
        disease_progress,
        type_id,
      });

      res.status(200).json(requestForm);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update request form', details: error });
    }
  },

  // Delete a request form
  async deleteForm(req, res) {
    try {
      const { id } = req.params;

      const requestForm = await RequestForm.findByPk(id);
      if (!requestForm) {
        return res.status(404).json({ error: 'Request form not found' });
      }

      await requestForm.destroy();
      res.status(200).json({ message: 'Request form deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete request form', details: error });
    }
  },
};
