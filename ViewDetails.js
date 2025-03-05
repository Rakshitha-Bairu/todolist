import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

export default function ViewDetails(){
    const{studentid}=useParams();
    const[studentData,setStudentData]=useState({});
    useEffect(()=>{
        fetch("http://localhost:8000/students/"+studentid)
        .then((res)=>res.json())
        .then((data)=>setStudentData(data))
        .catch((err)=>console.log(err.message)
        
    )
    console.log(studentData);

    },[]);
    return(
<div className="container">
<h2>Student Details</h2>

 {studentData && <div class="details">

<p><strong>ID:</strong>{studentData.id}</p>
<p><strong>Name:</strong>{studentData.name}</p>
<p><strong>Place:</strong>{studentData.place}</p>
<p><strong>Phone:</strong>{studentData.phone}</p>
</div>  }
<Link to="/" className="btn btn-back">Back</Link>         
       </div>
    )
}