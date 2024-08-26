"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import MonthSelection from "../_components/MonthSelection";
import StandardSelect from "../_components/StandardSelect";
import GlobalApi from '@/app/_services/GlobalApi';
import moment from "moment";
import StatusList from "./_components/StatusList";
import { set } from "react-hook-form";
import BarChart from "./_components/BarChart";
import PieChart from "./_components/PieChart";

function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([]);

  // useEffect(() => {
  //   // setTheme("light");
  //   getAllStudentAttendance();
  //   getTotalPresentCountByDay();
  // }, [selectedGrade]);

  useEffect(() => {
    // setTheme("light");
    getTotalPresentCountByDay();
    getAllStudentAttendance();
  }, [selectedMonth || selectedGrade]);

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

 const getTotalPresentCountByDay = () => {
  GlobalApi.totalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'),selectedGrade)
  .then((res)=>{
    // console.log(res.data);
    setTotalPresentData(res.data);
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <BarChart attendanceList={attendanceList} totalPresentData={totalPresentData}></BarChart>
        </div>
        <div>
           <PieChart attendanceList={attendanceList}></PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
