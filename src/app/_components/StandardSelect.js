"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function StandardSelect({setSelectedGrade }) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    getAllStandardsList();
  }, []);

  const getAllStandardsList = async () => {
    try {
      const res = await GlobalApi.getAllStandards();
      console.log(res.data);
      setGrades(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Select onValueChange={(value) => setSelectedGrade(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Grade" />
        </SelectTrigger>
        <SelectContent>
          {grades.map((item, idx) => (
            <SelectItem key={idx} value={item.standard}>
              {item.standard}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StandardSelect;
