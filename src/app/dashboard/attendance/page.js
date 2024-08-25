import MonthSelection from "@/app/_components/MonthSelection";
import StandardSelect from "@/app/_components/StandardSelect";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import React from "react";

function Attendance() {

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();

 const onSearchHandler = () => {
    console.log(selectedMonth, selectedGrade);
    
 }


  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      {/* Search option */}

      <div className="flex gap-4 my-3 p-3 shadow-sm border rounded-lg">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)}></MonthSelection>
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Standard:</label>
          <StandardSelect selectedGrade={(value) => setSelectedGrade(value)}></StandardSelect>
        </div>
        <Button onClick = {() => onSearchHandler()}>Search</Button>
      </div>
      {/* Student Attendance Grid */}
    </div>
  );
}

export default Attendance;
