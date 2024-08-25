"use client"

import React, { useEffect, useState } from 'react'

import GlobalApi from '@/app/_services/GlobalApi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function StandardSelect({selectedGrade}) {

   const [grade, setGrade] = useState([]);



    useEffect(() => {
        getAllStandardsList();
    },[]);
  
    const getAllStandardsList = () => {
     GlobalApi.getAllStandards()
      .then((res) => {
          console.log(res.data);
          setGrade(res.data);
      })
      .catch((err) => {
          console.log(err);
          
      })
    }
  

  return (
    <div>
           <Select onChange={(e) => selectedGrade(e.target.value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="10"/>
                    </SelectTrigger>
                    <SelectContent>
                       {
                         grade && grade.map((item, idx) => (
                           <SelectItem key={idx} value={item.standard}>{item.standard}</SelectItem>
                         ))
                       }
                      {/* <SelectItem value="6th">6th</SelectItem>
                      <SelectItem value="7th">7th</SelectItem> */}
                    </SelectContent>
                  </Select>
    </div>
  )
}

export default StandardSelect