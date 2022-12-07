import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { name, email, contact}= state;

    const navigate = useNavigate();

    const {id}= useParams(); // youtube-1.5.12

    useEffect(() => { // youtube-1.5.12
        axios.get(`http://localhost:5000/api/get/${id}`) // youtube-1.5.12
        .then((resp)=> setState({...resp.data[0]})) // youtube-1.5.12
    }, [id]); // youtube-1.5.12

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error ("please provide value into each input field");
            } else{
                if(!id){
                    axios.post("http://localhost:5000/api/post", {
                    name,
                    email,
                    contact,
                    })
                    .then(()=>{
                    setState({name:"", email: "", contact: ""});
                    })
                    .catch((err) =>toast.error(err.response.data));
                    toast.success("Contact Added successfully");
                } else {
                    axios.put(`http://localhost:5000/api/update/${id}`, {
                        name,
                        email,
                        contact,
                    })
                        .then(()=>{
                        setState({name:"", email: "", contact: ""});
                        })
                        .catch((err) =>toast.error(err.response.data));
                        toast.success("Contact Updated successfully");
                }
                
                setTimeout(()=>{
                    navigate('/');
                }, 500);
            }
    };

    const handleInputChange =(e)=>{
        const { name, value} =e.target;
        setState({...state, [name]: value});
    };
    return (
    <div style={{marginTop: "50px"}}>
        <form className='form'
        onSubmit={handleSubmit}
        >
            <h2>Register the Contact</h2>
            <label htmlFor= "name">Name</label>
            <input 
            type="text"
            id="name"
            name="name"
            placeholder="Your Name....."
            //value={name}
            value={name || ""} // youtube-1.5.12
            onChange = {handleInputChange}
            />
            <label htmlFor= "email">Email</label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder="Your email....."
            value={email || ""} // youtube-1.5.12
            onChange = {handleInputChange}
            />
            <label htmlFor= "contact">Contact</label>
            <input 
            type="number"
            id="contact"
            name="contact"
            placeholder="Your contact No....."
            value={contact || ""} // youtube-1.5.12
            onChange = {handleInputChange}
            />
            {/* <input type="submit" value="Save"/> */}
            <input type="submit" value={id? "Update" :"Save"}/>
            <Link to ="/">
                <input type="button" value="Go Back"/>
            </Link>
        </form>
    </div>
  )
}

export default AddEdit;