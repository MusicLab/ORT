import React, {useState, useEffect} from 'react'

// componentes
import BuscadorAlumno from "../../components/BuscadorAlumno/BuscadorAlumno"
import GruposAlumno from "../../components/GruposAlumno/GruposAlumno"
import GruposMaterias from "../../components/GruposMaterias/GruposMaterias"



const AlumnChanging = () => {
    const [userid, setUserid] = useState()
    const [courseid, setCourseid] = useState()
    const [gruposMaterias, setGruposMaterias] = useState()
    const [grupoElegido, setGrupoElegido] = useState()
    return (
        <div>
            <BuscadorAlumno setUserid={setUserid} ></BuscadorAlumno>
            <div className='listas'>
            {userid && <GruposAlumno userid={userid} setCourseid={setCourseid} ></GruposAlumno>}
            {courseid && <GruposMaterias courseid={courseid} gruposMaterias={gruposMaterias} setGruposMaterias={setGruposMaterias} grupoElegido={grupoElegido} setGrupoElegido={setGrupoElegido} userid={userid} ></GruposMaterias>}
            </div>
        </div>
    )
    
    
}

export default AlumnChanging
