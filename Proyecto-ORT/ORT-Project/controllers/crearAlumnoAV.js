import fetch from "node-fetch"


const crearAlumnoAV = async (alumno)=> {
    const {dni, nombre, apellido, sede, email} = alumno
    const password = "Ort12345"
    
    const res = await fetch(`http://www.ort.edu.ar:50080/moodle/webservice/rest/server.php?wstoken=tokenn&moodlewsrestformat=json&wsfunction=core_user_create_users&users[0][username]=${dni}&users[0][firstname]=${nombre}&users[0][lastname]=${apellido}&users[0][email]=${email}&users[0][password]=${password}&users[0][institution]=${sede}`)
    const data = await res.json()
    const final = data.message
    console.log(final)
}


export default crearAlumnoAV