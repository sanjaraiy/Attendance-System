const axios = require('axios');

const getAllStandards = async () => await axios.get('/api/standard');
const createNewStudent = async (data) => await axios.post('/api/student', data);
const getAllStudents = async () => await axios.get('/api/student');
const deleteStudentRecord = async (id) => await axios.delete('/api/student?id='+id);

const getAttendanceList = async (standard, month) => await axios.get('/api/attendance?standard='+standard+"&month="+month);

const markingAttendance = async (data) => await axios.post('/api/attendance', data);

const markingAbsent = async (studentId, day, date) => await  axios.delete('/api/attendance?studentId='+studentId+'&day='+day+'&date='+date);

const totalPresentCountByDay = async (date, standard) => await axios.get('/api/dashboard?date='+date+"&standard="+standard);
module.exports = {
    getAllStandards,
    createNewStudent,
    getAllStudents,
    deleteStudentRecord,
    getAttendanceList,
    markingAttendance,
    markingAbsent,
    totalPresentCountByDay,
};