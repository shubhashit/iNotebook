import React, { useContext } from 'react'
import noteContext from '../context/notecontext'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NoteItems(props) {
    const a = useContext(noteContext);
    const {deleteNote} = a;
    return (
        <div className='col-md-4 my-3'>
            <div className="card text-center">
                <div className="card-header">
                    {props.notes.tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.notes.title}</h5>
                    <p className="card-text">{props.notes.description}</p>
                    <div>
                    <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(props.notes._id)}}></i>
                    <i className="fa-regular fa-pen-to-square mx-3 " onClick={()=>{props.updatenote(props.notes)}}></i>
                    </div>
                </div >
                <div className="card-footer text-muted p-1">
                    {props.notes.date}
                </div>
            </div>
        </div>
    )
}
