import knex from "knex"
import dotenv from "dotenv"

dotenv.config()



export const knexAlumnos = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: "3306",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "sge"
    },
    pool: { min:0, max:7 } 
})


export const knexAlumnosMid = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: "3306",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "midleware"
    },
    pool: { min:0, max:7 } 
})


// knexAlumnosMid.schema.dropTableIfExists("alumnos")
//     .finally(()=>{
//         return knexAlumnosMid.schema.createTable("alumnos", table => {
//             table.integer("dni").unique()
//             table.string("nombre")
//             table.string("apellido")
//             table.string("sede")
//             table.string("email")
//             table.timestamps(true, true)
            
//         })
//     })

// knexAlumnos.schema.dropTableIfExists("alumnos")
//     .finally(()=>{
//         return knexAlumnos.schema.createTable("alumnos", table => {
//             table.integer("dni").unique()
//             table.string("nombre")
//             table.string("apellido")
//             table.string("sede")
//             table.string("email")
//             table.timestamps(true, true)
            
//         })
//     })

// knexAlumnos.schema.dropTableIfExists("matriculaciones")
//     .finally(()=>{
//         return knexAlumnos.schema.createTable("matriculaciones", table => {
//             table.integer("dni").unique()
//             table.string("nombre")
//             table.string("apellido")
//             table.string("sede")
//             table.string("email")
//             table.timestamps(true, true)
            
//         })
//     })

