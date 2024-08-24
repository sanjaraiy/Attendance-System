import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Search, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [25, 50, 100];

function StudentListTable({allStudentList}) {
    
    const customButtons = (props) => {
        return (
        <Button variant="destructive">
          <Trash></Trash>
        </Button>
        )
    }

    const [colDefs, setColDefs] = useState([
        {field:"id", filter:true},
        {field:"name", filter:true},
        {field:"address", filter:true},
        {field:"phone", filter:true},
        {field:"action", cellRenderer:customButtons}
    ])

    const [rowData, setRowData] = useState();
    const [searchInput, setSearchInput] = useState();
    useEffect(() => {
     allStudentList && setRowData(allStudentList)
    },[allStudentList])
  return (
   <div className='my-7'>
      <div
    className="ag-theme-quartz" // applying the Data Grid theme
    style={{ height: 500 }} // the Data Grid will fill the size of the parent container
   >
    <div>
        <h2 className='text-white'>{allStudentList?.length}</h2>
    </div>
    <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-w-sm'>
        <Search></Search>
        <input type="text" onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search on Anything...' 
           className='outline-none w-full' 
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
  )
}

export default StudentListTable