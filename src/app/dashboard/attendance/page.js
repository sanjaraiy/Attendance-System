"use client"

import MonthSelection from "@/app/_components/MonthSelection";
import StandardSelect from "@/app/_components/StandardSelect";
import { Button } from "@/components/ui/button";
import GlobalApi from '@/app/_services/GlobalApi';

import React, { useState } from "react";
import moment from "moment/moment";
import AttendanceGrid from "./_components/AttendanceGrid";

function Attendance() {

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();


  // Used to fetch attendance list for give month and Grade
 const onSearchHandler = () => {
    console.log(selectedMonth, selectedGrade);
    const month = moment(selectedMonth).format('MM/YYYY');
    console.log(month);
    
    GlobalApi.getAttendanceList(selectedGrade, month)
    .then((res) => {
        console.log(res.data);
        setAttendanceList(res.data);
        
    })
 }


  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      {/* Search option */}

      <div className="flex gap-4 my-3 p-3 shadow-sm border rounded-lg">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection setSelectedMonth={setSelectedMonth}></MonthSelection>
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Standard:</label>
          <StandardSelect setSelectedGrade={setSelectedGrade}></StandardSelect>
        </div>
        <Button onClick = {() => onSearchHandler()}>Search</Button>
      </div>
      {/* Student Attendance Grid */}
      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth}></AttendanceGrid>
    </div>
  );
}

export default Attendance;
