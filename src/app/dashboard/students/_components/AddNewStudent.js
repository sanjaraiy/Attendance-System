"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner"
import { LoaderIcon } from "lucide-react";

function AddNewStudent({refreshData}) {

  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  
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

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Form Data:", data);
    GlobalApi.createNewStudent(data)
    .then((res) => {
       console.log("created Student successfully", res);
       if(res.data.result){
         reset();
         refreshData();
         setOpen(false);
         toast("New Student Added successfully!")
        }

        setLoading(false);
    }).catch((err) =>{
        console.log("error: ", err);
    })
  };

  // Custom function to handle the Select value change
  const handleSelectChange = (value) => {
    setValue("standard", value); // Set the value in react-hook-form
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <Input type='text' placeholder="Enter your full Name" {...register('fullname', { required: true })} />
                </div>
                <div className="py-2">
                  <Input type='phone' placeholder="Enter your phone no" {...register('phone', { required: true })} />
                </div>
                <div className="py-2">
                  <Input type='text' placeholder="Enter your address" {...register('address', { required: true })} />
                </div>
                <div className="py-2">
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="Select Standard"/>
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
                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button type="button" onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                  <Button type="submit" disable={loading}>
                    {loading ? <LoaderIcon className="animate-spin"></LoaderIcon> : "Save"}
                  </Button>
                </div>
               

              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
