import React, { useState } from 'react'

export default function Addnote(props) {
    const [note,setNote] = useState({title : "",description : "", tag : ""})
    const handelClick = (e)=>{
        e.preventDefault();
        props.addNote(note.title , note.description,note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name] : e.target.value});
    }
    return (
        <div>
            <div className='container mt-4'>
                <h2>Add a new note</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title </label>
                    <input  value = {note.title}type="text" className="form-control" id="title" name='title' placeholder="Todo list" onChange={onChange}/>
                    <label htmlFor="tag" className="form-label">Tag </label>
                    <input  value = {note.tag}type="text" className="form-control" id="tag" name='tag' placeholder="#imp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea value = {note.description} className="form-control" id="description" name='description' rows="3" onChange={onChange}></textarea>
                    <button disabled={note.title.length <5 || note.description.length <5} type="button" className="btn btn-primary mt-2" onClick={handelClick}>Add</button>
                </div>
                <h2>Your Notes</h2>
            </div>
        </div>
    )
}
