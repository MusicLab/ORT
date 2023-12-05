import {knexAlumnos, knexAlumnosMid} from "../DBconfig.js"

export default class Alumnos {
    connection
    table
    constructor(connection, table) {
        this.connection = connection
        this.table = table
    }

    async getAll() {
        return await this.connection.from(this.table).select("*")
    }
    async save(alumno) {
        return await this.connection.from(this.table).insert(alumno)
    }
    async getById(id) {
        let data = await this.connection.from(this.table).select("*").where("id", id)
        if (data.length > 0) {
            return data
        }
        else {
            throw new Error(`Alumno con id ${id} no encontrado`)
        }
    }
    async deleteById(id) {
        let data = await this.connection.from(this.table).select("*").where("dni", id)
        if (data.length > 0) {
            await this.connection.from(this.table).select("*").where("dni", id).del()
            return data
        }
        else {
            throw new Error(`alumno con id ${id} no encontrado`)
        }
    }

    async updateAlumnoByDni(dni, body) {
        let data = await this.connection.from(this.table).select("*").where("dni" , dni)
        if (data.length > 0) {
            let data = await this.connection.from(this.table).select("*").update(body)
            return data
        }
        else {
            throw new Error(`alumno con id ${id} no encontrado`)
        }
    }
    async updateAlumno(body) {
        let data = await this.connection.from(this.table).select("*").where("dni" , body.dni)
        if (data.length > 0) {
            let data = await this.connection.from(this.table).select("*").where("dni", body.dni).update(body)
            return data
        }
        else {
            throw new Error(`alumno con id ${dni} no encontrado`)
        }
    }
}

export const alumnos = new Alumnos(knexAlumnos, "alumnos")
export const alumnosMid = new Alumnos(knexAlumnosMid, "alumnos")
