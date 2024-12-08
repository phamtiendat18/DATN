const MedicalRecords = require("../models/medicalRecords");
const MeetingRecord = require("../models/meetingRecords");
const RequestForm = require("../models/requestForms");
const Staffs = require("../models/staffs");
const TypeForms = require("../models/typeForms");

MeetingRecord.belongsTo(Staffs, { foreignKey: "staff_id" });
MeetingRecord.belongsTo(RequestForm, { foreignKey: "request_form_id" });
MeetingRecord.belongsTo(MedicalRecords, { foreignKey: "medical_record_id"});
TypeForms.hasOne(MeetingRecord, { foreignKey: "type_id" });
MeetingRecord.belongsTo(TypeForms, { foreignKey: "type_id" });

module.exports = {
  // Get all request forms
  async getAllForm(req, res) {
    try {
      const requestForms = await MeetingRecord.findAll();
      res.status(200).json({data: requestForms, status: 200});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch request forms', details: error });
    }
  },

  // Get request form by ID
  async getFormById(req, res) {
    try {
      const { id } = req.params;
      const requestForm = await MeetingRecord.findByPk(id);
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
      const requestForm = await MeetingRecord.findAll({where: {patient_id: id}});
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
      const requestForm = await MeetingRecord.findAll({where: {staff_id: id}});
      if (!requestForm) {
        return res.status(404).json({ error: 'Request form not found' });
      }
      res.status(200).json({data: requestForm, status: 200, message: "get success"});
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch request form', details: error });
    }
  },

  // Create a new request form
  async createForm(req, res) {
    try {
      const { staff_id, medical_record_id, request_form_id, meeting_info, type_id } = req.body;
      const newRequestForm = await MeetingRecord.create({
        staff_id, medical_record_id, request_form_id, meeting_info, type_id
      });
      res.status(201).json({data: newRequestForm, status: 201, message: "Tạo biên bản hội chẩn thành công"});
    } catch (error) {
      res.status(500).json({ error: 'Failed to create request form', details: error });
    }
  },

  // Update a request form
  async updateForm(req, res) {
    try {
      const { id } = req.params;
      const { staff_id, medical_record_id,request_form_id, meeting_info, type_id } = req.body;

      const requestForm = await MeetingRecord.findByPk(id);
      if (!requestForm) {
        return res.status(404).json({ error: 'Request form not found' });
      }

      await requestForm.update({ 
        staff_id, medical_record_id, request_form_id, meeting_info, type_id
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

      const requestForm = await MeetingRecord.findByPk(id);
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
