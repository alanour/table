
import React, {useEffect, useState} from 'react';

import './App.css';
//import { DataGrid, DataGridClsComponent } from './components/data-grid';

const App = () =>{

  const [loading, setLoading]=useState(false)
  const [dataSource , setdataSource]=useState([])
  const [page,setPage]=useState(1)
  const [pageSize,setPageSize]=useState(10)

  useEffect(()=>{
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(Response=>Response.json())
    .then(data=>{
      setdataSource(data)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
  
      setLoading(false)
      
    })
  },[])}
    
  const columns = [
    {
      key:"1",
      title:'Id',
      dataIndex:"id",
    },
    {
      key:"2",
      title:'User Id',
      dataIndex:"userId",
      sorter:(record1, record2)=>{
        return record1.userId > record2.userId
      }
    },
    {
      key:"3",
      title:'Status',
      dataIndex:"completed",
      render:(completed)=>{
        return <p>{completed?'completed':'In Progress'}</p>
      },
      filters:[
        {text:'Complete', value:true},
        {text: 'In Progress', value:false}
      ],
      onFilter:(value, record)=>{
      return  record.completed === value
      }
    },
  ]
  return (
    <div className="App">
      <header className="Sortting-Table">
        <table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            current:page,
            pageSize:pageSize,
            total:500,
            onChange:(page,pageSize)=>{
              setPage(page);
              setPageSize(pageSize);
            }
          }}
          >
        </table>
       
      </header>
    </div>
  );


export default App
