import noteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
    
    const host = "http://localhost:5000";
    const notesInitial = [];

    const [notes, setnotes] = useState(notesInitial);

    const fetchAllNotes = async()=>{
        const url = `${host}/api/notes/fetchallnotes`
        let authToken = localStorage.getItem('token');
        console.log(authToken);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'auth-token':authToken,
            },
        })
        const json = await response.json();
        setnotes(json);
    }
    //add a note
    const addNote = async (title,description,tag)=>{

        const url = `${host}/api/notes/addnotes`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-type': "application/json",
            },
            body: JSON.stringify({ title, description, tag }),
        })
        console.log(response);
        let note = await response.json();
        console.log(note);
        setnotes(notes.concat(note));
    }
    // delete a note 
    const deleteNote = async(id)=>{
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-type': "application/json",
            },
        })

        const json = response.json();

        const newnote = notes.filter((note)=>{return note._id !== id});
        setnotes(newnote);
    }


    let newNotes = JSON.parse(JSON.stringify(notes));
    const editNote = async (id,title,description,tag)=>{
        const url = `${host}/api/notes/updatenotes/${id}`
        const response = await fetch(url,{
            method : "PUT",
            headers:{
                'auth-token': localStorage.getItem('token'),
                'Content-type' : "application/json",
            },
            body : JSON.stringify({title,description,tag}),
        })
        console.log(response);
        // const json = response.json();

        for (let i = 0; i < newNotes.length;i++){
            if (newNotes[i]._id === id){
                console.log(newNotes[i]._id);
                console.log(newNotes[i]);
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                console.log(newNotes[i]);
                
                break;
            }
        }
        setnotes(newNotes);
    };

    return (
        <noteContext.Provider value={{ notes, addNote,deleteNote,editNote ,fetchAllNotes }}>
            {props.children}
        </noteContext.Provider>

    )
}

export default NoteState;