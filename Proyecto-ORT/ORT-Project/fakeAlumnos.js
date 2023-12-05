import faker from "faker"
import {alumnos} from "./controllers/alumnos.js"


const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()

const generaSede = () => {
    const random = Math.random()
    if (random > 0.5) {
        return "Yatay"
    }
    else {
        return "Belgrano"
    }
}
const generaDni = () => {
    const random = Math.random()*100000000
    return random
}


const generarXAlumnos = async (x) => {
    for (let i = 0; i < x; i++) {
        const alumno = {
            dni : generaDni(),
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            sede: generaSede(),
            email: faker.internet.email()
        }
        await alumnos.save(alumno)        
    }
}

// console.log(firstName, lastName, generaSede(), email)

// const alumno = {nombre: faker.name.firstName(),
// apellido: faker.name.lastName(),
// sede: generaSede(),
// email: faker.internet.email()}



setTimeout( () => {
    generarXAlumnos(5)
}, 2000)
