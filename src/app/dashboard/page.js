"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import MonthSelection from "../_components/MonthSelection";
import StandardSelect from "../_components/StandardSelect";
import GlobalApi from '@/app/_services/GlobalApi';
import moment from "moment";
import StatusList from "./_components/StatusList";
import { set } from "react-hook-form";

function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();


  useEffect(() => {
    // setTheme("light");
    getAllStudentAttendance();
  }, [selectedGrade]);

  useEffect(() => {
    // setTheme("light");
    getAllStudentAttendance();
  }, [selectedMonth]);

  /**
   * 
   * Used to get Student Attendance for Give Month and Date
   */

  const getAllStudentAttendance = () => {
    GlobalApi.getAttendanceList(selectedGrade, moment(selectedMonth).format('MM/yyyy'))
    .then((res) => {
      // console.log(res);
      setAttendanceList(res.data);
    })
    .catch((error) => {
      console.log(error);
     })
  }


  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>

        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectedMonth}></MonthSelection>
          <StandardSelect selectedGrade={setSelectedGrade}></StandardSelect>
        </div>
      </div>

      <StatusList attendanceList={attendanceList}></StatusList>
    </div>
  );
}

export default Dashboard;
