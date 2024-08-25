"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns";
import moment from "moment";

function MonthSelection({ setSelectedMonth }) {
  const today = new Date();
  const [month, setMonth] = useState(addMonths(today, 0));

  const handleMonthChange = (selectedDate) => {
    if (selectedDate) {
      console.log("Selected Month:", selectedDate);
      setMonth(selectedDate);
      setSelectedMonth(selectedDate);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex gap-2 items-center text-slate-500"
          >
            <CalendarDays className="h-5 w-5" />
            {moment(month).format("MMM YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={month}
            onSelect={handleMonthChange}  // Using onSelect to handle the date selection
            className="flex flex-1 justify-center"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MonthSelection;
