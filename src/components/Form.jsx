import React, { useState } from 'react'
import { postData } from '../api/PostApi';

export default function Form({data,setData}) {

    const[addData,setAddData]=useState({
        title:"",
        body:"",
    });

    const handleInputChange = (e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setAddData((prev)=>{
            // console.log(prev)
            return{
                ...prev,
                [name]:value,
            }
        })
    }

    const addPostData=async()=>{
        const resp = await postData(addData);
        console.log("Res",resp);
        if(resp.status===201){
            setData([...data,resp.data]);
            setAddData({title:"", body:""});
        }
    }
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        addPostData();
    }
  return (
    <div>
        <form action="" onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input type="text" id="title" name="title" placeholder='Add Title' value={addData.title} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="body"></label>
        <input type="text" id="body" name="body" placeholder='Add body' value={addData.body} onChange={handleInputChange}/>
      </div>
      <button>ADD</button>
      </form>
    </div>
  )
}
