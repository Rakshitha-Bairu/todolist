import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStudent(){
    const{studentid}=useParams();
    const[id,setId]=useState("");
    const[name,setName]=useState("");
    const[place,setPlace]=useState("");
    const[phone,setPhone]=useState("");
    const [validation,setValidation]=useState(false);
    const navigate=useNavigate();
   // const[studentData,setStudentData]=useState({});
    useEffect(()=>{
        fetch("http://localhost:8000/students/"+studentid)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setId(data.id);
            setName(data.name)
            setPlace(data.place)
            setPhone(data.phone)

        })
        .catch((err)=>console.log(err.message)
    )
    },[]);
   
    const handleSubmit=(e)=>{
        e.preventDefault();
        const studentData={id,name,place,phone};
        console.log(studentData);
        fetch("http://localhost:8000/students/" + studentid,{
        method:'PUT',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(studentData)
    })

        .then((res)=>{
            alert("Student data UPdated successfully");
            navigate("/");

        })
        .catch((err)=>console.log(err.message))
    
    }
    return(
       
        <div className="container">
        <h2>Editing Student</h2>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" required value={id} onChange={e=>setId(e.target.value)} onMouseDown={()=>setValidation(true)}/><br></br>
            {id.length===0 && validation && <span>Please Enter Id</span>}
         </div>
         <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required value={name} onChange={e=>setName(e.target.value)} onMouseDown={()=>setValidation(true)}/><br></br>
            {name.length===0 && validation && <span className="errorMsg">Please Enter Name</span>}
        </div>
        <div className="form-group">
            <label htmlFor="place">Place:</label>
            <input type="text" id="place" name="place" required value={place} onChange={e=>setPlace(e.target.value)} onMouseDown={()=>setValidation(true)}/><br></br>
            {place.length===0 && validation &&<span className="errorMsg">Please Enter Place</span>}
            </div>
            <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" required value={phone} onChange={e=>setPhone(e.target.value)} onMouseDown={()=>setValidation(true)}/><br></br><br></br>
            {phone.length===0 && validation && <span className="errorMsg">Please Enter Phone</span>}
            </div>
           <div>
                <button className="btn btn-save">Upadate</button>

                <Link to="/" className="btn btn-back">Back</Link>
        </div>
        </form>
        </div>
    </div>
   
)
}
       
   