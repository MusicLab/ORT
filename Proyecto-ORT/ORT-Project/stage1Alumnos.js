import {alumnos, alumnosMid} from "./controllers/alumnos.js"





const crearPromesasAlumnos = async (res) => {
    const listaAlumnos = await alumnos.getAll()
    const result = await Promise.allSettled(
       listaAlumnos.map(async (alumno) => {
          try {
            await alumnosMid.updateAlumno(alumno)
          } catch (err) {
             console.error(`${err}`)
          }
          try {
            await alumnosMid.save(alumno)
          } catch (err) {
            console.error(`${err}`)
            }
       })
    )
    return result
}



export default crearPromesasAlumnos