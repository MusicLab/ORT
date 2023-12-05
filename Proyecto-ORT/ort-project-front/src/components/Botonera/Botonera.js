import React from 'react'

const Botonera = () => {
    
    const ejecutarStage1 = async ()=> {
        const res = await fetch("http://localhost:8080/stage1Alumnos", {
            method:'post',
            
    })
    }

    const ejecutarStage2 = async ()=> {
        const res = await fetch("http://localhost:8080/stage2Alumnos", {
            method:'post',
            
    })
}

  
  
    return (
    <div>
        <button onClick= {ejecutarStage1}> Stage1 Alumnos</button>
        <button onClick= {ejecutarStage2}> Stage2 Alumnos</button>
    </div>
  )
}

export default Botonera