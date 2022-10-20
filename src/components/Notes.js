import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notecontext'
import Addnote from './Addnote';
import NoteItems from './NoteItems';

export default function Notes(props) {
    const navigate = useNavigate();
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
    const [currentnoteid, setcurrentnoteid] = useState('');

    const a = useContext(noteContext);
    const { notes, addNote, fetchAllNotes, editNote } = a;
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchAllNotes();
        }
        else{
            navigate('/login')
        }

    }, [])
    const updatenote = (currentNote) => {
        ref.current.click();
        setcurrentnoteid(currentNote._id);
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    const handelClick = (e) => {
        e.preventDefault();
        editNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        console.log(e.target.value);
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const editnote = () => {
        editNote(currentnoteid, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note has been updated" , "success");

    }
    return (
        <>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ display: "hidden" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name='etitle' placeholder="Todo list" onChange={onChange} value={note.etitle} />
                                <label htmlFor="etag" className="form-label">Tag </label>
                                <input type="text" className="form-control" id="etag" name='etag' placeholder="#imp" onChange={onChange} vlaue={note.etag} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <textarea className="form-control" id="edescription" name='edescription' rows="3" onChange={onChange} value={note.edescription}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={editnote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <Addnote addNote={addNote}></Addnote>
            <div className="container">
                {notes.length === 0 ? 'No notes to preview' : ''}
            </div>
            <div className="container">
                <div className='row'>
                    {notes.map((note) => {
                        return <NoteItems key={note._id} notes={note} updatenote={updatenote} />
                    })}
                </div>
            </div>
        </>
    )
}
