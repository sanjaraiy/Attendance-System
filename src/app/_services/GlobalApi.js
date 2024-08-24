const axios = require('axios');

const getAllStandards = async () => await axios.get('/api/standard');
const createNewStudent = async (data) => await axios.post('/api/student', data);
const getAllStudents = async () => await axios.get('/api/student');

module.exports = {
    getAllStandards,
    createNewStudent,
    getAllStudents,
};