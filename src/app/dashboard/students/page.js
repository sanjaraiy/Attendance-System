"use client"

import React, { useEffect, useState } from 'react'
import AddNewStudent from './_components/AddNewStudent'
import GlobalApi from '@/app/_services/GlobalApi'
import StudentListTable from './_components/StudentListTable';

function Student() {
  const [allStudentList, setAllStudentList] = useState([]);
   
  useEffect(()=>{
    getAllStudents();
  },[]);

  const getAllStudents = () => {
      GlobalApi.getAllStudents()
      .then((res) => {
         console.log(res.data);
         
         setAllStudentList(res.data);
      }).catch((err) => {
         console.log("error: ", err);
      })
  }
  return (
    <div className='p-7'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>
            Students
            <AddNewStudent></AddNewStudent>
        </h2>

        <StudentListTable allStudentList={allStudentList} refreshData={getAllStudents}></StudentListTable>
       
    </div>
  )
}

export default Student