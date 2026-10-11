import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import Form from "./Form";

export default function Posts() {
//   console.log(getPost());

  const[data,setData]=useState([]);

  const[updateDataApi,setUpdateDataApi]=useState({});

  const getPostData = async () => {
    const resp = await getPost();
    console.log(resp.data);
    setData(resp.data);
  };
  useEffect(() => {
    getPostData();
  },[]);

  const handleDeletePost=async(id)=>{
        try{
    const resp = await deletePost(id);
    // console.log(res);
    if(resp.status===200){
        const newUpdatedPost = data.filter((curPost)=>{
            return curPost.id !== id;
        });
        setData(newUpdatedPost);
    }else{
        console.log("Failed to delete the post", resp.status)
    }
    }
    catch(error){
        console.log(error)
    }
  }

  //handle post data
  const handleUpdatePost = (curElem) =>{
     setUpdateDataApi(curElem);
  }
  return (
    <div>
        <section className="section-form">
            <Form data={data} setData={setData}  updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}/>
        </section>
        <section className="section-post">
            <ol>
                {
                    data.map((curElem)=>{
                        const{id,body,title}=curElem
                        return (
                            <li key={id}>
                                <p>title:{title}</p>
                                <p>body:{body}</p>
                                <button className="btn-edit" onClick={()=>handleUpdatePost(curElem)} >EDIT</button>
                                <button className="btn-delete" onClick={() => handleDeletePost(id)}>DELETE</button>
                            </li>
                        )
                    })
                }
            </ol>
        </section>
    </div>
  );
}
