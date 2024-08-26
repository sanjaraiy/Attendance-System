import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { GraduationCap, TrendingUp, TrendingDown } from 'lucide-react';

function StatusList({attendanceList}) {
    const [totalStudent, setTotalStudent] = useState(0);
    const [presentPerc, setPresentPerc] = useState(0);


     /**
   * Used to get Distict User List
   * @returns
   */

  const getUniqueRecord = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendanceList?.forEach((record) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });

    return uniqueRecord;
  };

  
//   useEffect(() => {
//        if(attendanceList){
//            const totalSt = getUniqueRecord(attendanceList);
//            setTotalStudent(totalSt.length);
//            const today = moment().format('D');
//            const PresentPrec = (attendanceList.length/(totalSt.length*Number(today))*100);
//         //    console.log(PresentPrec);
//          setPresentPerc( PresentPrec);
           
//        }
//   },[attendanceList])



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
        <Card icon={<GraduationCap></GraduationCap>} title='Total Student' value={totalStudent}></Card>
        <Card icon={<TrendingUp></TrendingUp>} title='Total Present' value={presentPerc.toFixed(1)+"%"}></Card>
        <Card icon={<TrendingDown></TrendingDown>} title='Total Absent' value={100 - presentPerc.toFixed(1)+"%"}></Card>
    </div>
  )
}

export default StatusList