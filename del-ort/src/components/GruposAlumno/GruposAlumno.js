import React, {useState, useEffect} from 'react'



const GruposAlumno = ({userid, setCourseid}) => {
    
    const [dataMaterias, setDataMaterias] = useState()
    
    
    useEffect (()=>{    
        enviarDatos()
    }, [userid])

    
    const enviarDatos = async () => {
    const res = await fetch(
      `http://www.ort.edu.ar:50080/moodle/webservice/rest/server.php?wsfunction=core_group_get_course_user_groups&moodlewsrestformat=json&wstoken=tokenn&userid=${userid}`
    )

    const data = await res.json()
      
    setDataMaterias(data)

      
  }
    
    return (
        <div>
            <ul className="row">
              materias:
              {dataMaterias?.groups.map((grupo, index) => {
                  return <p key={index} onClick={ () => setCourseid(grupo)}>{grupo.name} {grupo.id}</p>
                  })}
            </ul>
        </div>
    )
}

export default GruposAlumno