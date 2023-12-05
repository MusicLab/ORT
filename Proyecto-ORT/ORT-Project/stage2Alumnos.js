import {alumnos, alumnosMid} from "./controllers/alumnos.js"
import crearAlumnoAV from "./controllers/crearAlumnoAV.js"


const crearPromesasAlumnos2 = async () => {
    const listaAlumnos = await alumnosMid.getAll()
    const result = await Promise.allSettled(
       listaAlumnos.map(async (alumno) => {
          try {
            const res = await crearAlumnoAV(alumno)
          } catch (err) {
             console.error(`${err}`)
          }
       })
    )
    return result
}
export default crearPromesasAlumnos2