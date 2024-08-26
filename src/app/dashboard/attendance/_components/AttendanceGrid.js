"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { year } from "drizzle-orm/mysql-core";
import moment from "moment";
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [25, 50, 100];


function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId", filter:true}, 
    { field: "name", filter:true},

]);


const daysInMonth = (year, month) => new Date(year, month+1,0).getDate();
const numberOfDays = daysInMonth(moment(selectedMonth).format('yyyy'), moment(selectedMonth).format('MM'));
console.log(numberOfDays);
const daysArrays = Array.from({length:numberOfDays}, (_,i) => i+1);
console.log(daysArrays);


  useEffect(() => {
    if(attendanceList){
        const userList = getUniqueRecord();

        console.log(userList);
        setRowData(userList);
    
        daysArrays.forEach((date) => {
            setColDefs(prevData => [...prevData, {
                field: date.toString(), width:50, editable:true
            }])
        })

        userList.forEach((obj) => {
            obj[date] = isPresent(obj.studentId, date);
        })
    }
  }, [attendanceList]);

/**
 * used to check if user present or not
 * @param {*} studentId 
 * @param {*} day 
 * @returns 
 */

  const isPresent = (studentId, day) => {
    const res = attendanceList.find((item) => item.day == day && item.studentId ==  studentId);
    return res? true : false;
  }

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

 
  /**
   * Used to mark student attendance
   * @param {*} day 
   * @param {*} studentId 
   * @param {*} presentStatus 
   */

  const onMarkingAttendance = (day, studentId, presentStatus) => {
      
       const date = moment(selectedMonth).format('MM/yyyy');
        if(presentStatus){
           
            const data = {
                day:day,
                studentId:studentId,
                present:presentStatus,
                date:date
            }

            GlobalApi.markingAttendance(data)
            .then((res) => {
                console.log(res);
                toast("Student Id:" + studentId + "Marked as present");
                
            })
            .catch((error) => {
            console.log(error);
            
            })

        }else{
            GlobalApi.markingAbsent(studentId, day, date)
            .then((res) => {
                toast("Student Id:" +studentId+ "Marked as absent");
            })
        }

        
  }
  
  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact 
         rowData={rowData} 
         columnDefs={colDefs} 
         pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
         onCellValueChanged={(e) => onMarkingAttendance(e.colDef.field, e.data.studentId, e.newValue)} 

         />
      </div>
    </div>
  );
}

export default AttendanceGrid;
