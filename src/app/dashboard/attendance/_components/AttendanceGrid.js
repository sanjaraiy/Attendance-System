"use client";

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { year } from "drizzle-orm/mysql-core";
import moment from "moment";

function AttendanceGrid({ attendanceList, selectedMonth }) {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId" }, 
    { field: "name" },

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

 
  
  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}

export default AttendanceGrid;
