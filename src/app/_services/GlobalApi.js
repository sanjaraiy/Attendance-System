const axios = require('axios');

const getAllStandards = async () => await axios.get('/api/standard');
const createNewStudent = async (data) => await axios.post('/api/student', data);
const getAllStudents = async () => await axios.get('/api/student');
const deleteStudentRecord = async (id) => await axios.delete('/api/student?id='+id);



module.exports = {
    getAllStandards,
    createNewStudent,
    getAllStudents,
    deleteStudentRecord,
};