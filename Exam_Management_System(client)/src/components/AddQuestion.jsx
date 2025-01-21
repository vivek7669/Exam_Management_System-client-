// import React from 'react'
import { useEffect } from "react"
import "./AddQuestion.css"
import api from "../services/handleData"
import { useState } from "react";

const AddQuestion = () => {
    let [categorys , setcategorys] = useState([{id : "" , categoryName : ""}]); 
    let [formdata , setformdata] = useState({
        "questionText" : "",
        "options" : ["","","",""],
        "correctAnswer" : ["A","B","C","D"],
        "marks":"",
        "category":"",
        "difficulty" : ""
        
    })
    useEffect(()=>{
       (async function retruveCategory() {
            let data = await api.get("/examCategory/");
            setcategorys(data.data.categories);
       })()
    },[])

    const hndleFormData = async (e) => {
        e.preventDefault()
        // console.log(formdata);
        let res = await api.post("/exam/add",formdata);
        console.log(res?.data);
    }

    const handleInputdata = (e) => {
        let {value , name} = e.target;
        if(name.startsWith('options')){
            const optionIndex = Number(name.split("[")[1].split("]")[0]);
        setformdata((prev)=>{
                const updatedOptions = [...prev.options] //destructure of array
                updatedOptions[optionIndex] = value
                return setformdata({...prev , options : updatedOptions})
            })
        }
        else{
            return setformdata((prev)=>({...prev , [name] : value}))
        }
    }
  return (
         <div className="container mt-5 mb-3">
                 <h2>Add Exam Question</h2>

                <form onSubmit={hndleFormData} >
                
                    <div className="form-group">
                        <label>Question Text</label>
                        <input type="text" className="form-control" id="questionText" name="questionText"  placeholder="Enter the question text" value={formdata?.questionText} onChange={handleInputdata} />
                    </div>
                    
                    <div className="form-group">
                            <label>Options (4)</label><br />
                            <input type="text" className="form-control mb-2" id="option1" name="options[0]" placeholder="Option A" value={formdata?.options.option1} onChange={handleInputdata} />
                            <input type="text" className="form-control mb-2" id="option2" name="options[1]" placeholder="Option B" value={formdata?.options.option2} onChange={handleInputdata} />
                            <input type="text" className="form-control mb-2" id="option3" name="options[2]" placeholder="Option C" value={formdata?.options.option3} onChange={handleInputdata} />
                            <input type="text" className="form-control mb-2" id="option4" name="options[3]" placeholder="Option D" value={formdata?.options.option4} onChange={handleInputdata} />
                    </div>

                    <div className="form-group">
                        <label>Correct Answer</label><br/>
                        <select className="form-control" name="correctAnswer" onChange={handleInputdata} >
                        <option value={formdata?.correctAnswer[0]}>A</option>
                        <option value={formdata?.correctAnswer[1]}>B</option>
                        <option value={formdata?.correctAnswer[2]}>C</option>
                        <option value={formdata?.correctAnswer[3]}>D</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Marks</label>
                        <input type="number" className="form-control" id="marks" name="marks" min="1"  placeholder="Enter marks" value={formdata?.marks} onChange={handleInputdata} />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select className="form-control" id="category" name="category" onChange={handleInputdata} >
                        {categorys.map((elm ,index)=>(
                                <option key={elm._id || index} value={elm._id}>{elm.categoryName}</option>
                          ))}  
                        </select>
                    </div>

                    <div className="form-group">
                            <label>Difficulty</label><br/>
                            <input type="radio" id="easy" name="difficulty" value="easy" onChange={handleInputdata} />
                            <label>Easy</label><br/>
                            <input type="radio" id="medium" name="difficulty" value="medium" onChange={handleInputdata} />
                            <label>Medium</label><br/>
                            <input type="radio" id="hard" name="difficulty" value="hard" onChange={handleInputdata} />
                            <label>Hard</label>
                    </div>

                    <button type="submit" className="btn btn-primary">Add Question</button>
                </form>
         </div>
  )
}

export default AddQuestion