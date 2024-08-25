import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [25, 50, 100];

function StudentListTable({ allStudentList, refreshData }) {



 


  const customButtons = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Trash></Trash>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "address", filter: true },
    { field: "phone", filter: true },
    { field: "action", cellRenderer: customButtons },
  ]);

 

  const [rowData, setRowData] = useState();
  const [searchInput, setSearchInput] = useState();
  
  useEffect(() => {
    allStudentList && setRowData(allStudentList);
  }, [allStudentList]);

 const deleteRecord = (id) => {
     GlobalApi.deleteStudentRecord(id)
     .then((res) => {
        if(res){
            toast('Record deleted successfully!');
            refreshData();
        }
        
     })
 }



  return (
    <div className="my-7">
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <div>
          <h2 className="text-white">{allStudentList?.length}</h2>
        </div>
        <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-w-sm">
          <Search></Search>
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search on Anything..."
            className="outline-none w-full"
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          quickFilterText={searchInput}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default StudentListTable;
