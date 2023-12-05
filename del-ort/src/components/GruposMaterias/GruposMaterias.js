import React, {useState, useEffect} from 'react'

const GruposMaterias = ({courseid, gruposMaterias, setGruposMaterias, grupoElegido, setGrupoElegido, userid}) => {

    
    useEffect (()=>{    
        enviarDatos()

    }, [courseid])

    const enviarDatos = async () => {
    const res = await fetch(
      `http://www.ort.edu.ar:50080/moodle/webservice/rest/server.php?wstoken=tokenn&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${courseid.courseid}`
    )

    const dataGruposMaterias = await res.json()   
    setGruposMaterias(dataGruposMaterias)    
    }

    const cambiarGrupo = async (userid,courseid, grupoElegido) => {
        console.log("userid", userid, "courseid", courseid.id, "grupoElegido", grupoElegido.id)
        await fetch(
            `http://www.ort.edu.ar:50080/moodle/webservice/rest/server.php?wstoken=tokenn&moodlewsrestformat=json&wsfunction=core_group_delete_group_members&members[0][groupid]=${courseid.id}&members[0][userid]=${userid}`
          )
        
        .then(await fetch(
            `http://www.ort.edu.ar:50080/moodle/webservice/rest/server.php?wstoken=tokenn&moodlewsrestformat=json&wsfunction=core_group_add_group_members&members[0][groupid]=${grupoElegido.id}&members[0][userid]=${userid}`
          ))
        .then(() => alert("Cambio Hecho"))
    }

  return (
    <div>
        <div className= "listas">
            <p>Materia Elegida:{grupoElegido ? grupoElegido.name : "No elegiste Grupo destino"} </p>
            <button onClick={ () => cambiarGrupo(userid, courseid, grupoElegido) }>Cambiar</button>
        </div>
        Grupo a cambiar: 
        <ul className="row">
              {gruposMaterias?.map((grupo, index) => {
                
                  return <p key={index} onClick={ () => setGrupoElegido(grupo)} >{grupo.name} {grupo.id}</p>
                  })}
        </ul>
    </div>
  )
}

export default GruposMaterias