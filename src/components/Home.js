import React, { useEffect } from 'react'
import Notes from './Notes';

export default function Home(props) {
 
  return (
    <>
      <div>
        <Notes showAlert={props.showAlert}></Notes>
      </div>
    </>
  )
}
