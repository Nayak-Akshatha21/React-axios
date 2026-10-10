import React, { useEffect, useState } from "react";
import { getPost } from "../api/PostApi";

export default function Posts() {
//   console.log(getPost());

  const[data,setData]=useState([]);

  const getPostData = async () => {
    const resp = await getPost();
    console.log(resp.data);
    setData(resp.data);
  };
  useEffect(() => {
    getPostData();
  },[]);
  return (
    <div>
        <section className="section-post">
            <ol>
                {
                    data.map((curElem)=>{
                        const{id,body,title}=curElem
                        return (
                            <li key={id}>
                                <p>title:{title}</p>
                                <p>body:{body}</p>
                                <button className="btn-edit">EDIT</button>
                                <button className="btn-delete">DELETE</button>
                            </li>
                        )
                    })
                }
            </ol>
        </section>
    </div>
  );
}
