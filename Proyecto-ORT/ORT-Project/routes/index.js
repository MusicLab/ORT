import express from "express"
import {alumnos, alumnosMid} from "../controllers/alumnos.js"
import crearPromesasAlumnos from "../stage1Alumnos.js"
import crearPromesasAlumnos2 from "../stage2Alumnos.js"



const router = express.Router()


router.get("/alumnos/:id?", async(req, res) => {
    const { id } = req.params
    if (id) {
        try {
            const data = await alumnos.getById(id)
            res.json(data)
        } catch (error) {
            let msg = (error).message;
            return res.status(400).json({ error: msg });
        }
    } else {
        const data = await alumnos.getAll()
        res.json(data)
    }
})

router.post("/alumnos", async(req, res) =>{
    const {nombre, apellido, sede, email} = req.body
    console.log(nombre, apellido, sede, email)
    try {
        const response = await alumnos.save({
            nombre,
            apellido,
            sede,
            email
        })
        res.json(response)
    } catch(err) {
        res.status(400).json({
            error: "ocurrio un error"
        })
    }
})

router.delete("/alumnos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const response = await alumnos.deleteById(id)
        res.json(response)
    } catch (error) {
        let msg = (error).message;
            return res.status(400).json({ error: msg });
    }
})

router.put('/alumnos/:id', async (req, res) => {
    const {
        params: { id },
        body
    } = req
    if (body.nombre || body.apellido || body.sede || body.email ) {
        const response = await alumnos.updateAlumno(
            body
        )
        res.json(response)
    } else {
        res.status(400).json(`Debe ingresar un nombre, apellido, sede, o email`)
    }
});

// --------------------------------------------------------------------------------------------------------------
// alumnos midleware route

router.get("/alumnosMid/:id?", async(req, res) => {
    const { id } = req.params
    if (id) {
        try {
            const data = await alumnosMid.getById(id)
            res.json(data)
        } catch (error) {
            let msg = (error).message;
            return res.status(400).json({ error: msg });
        }
    } else {
        const data = await alumnosMid.getAll()
        res.json(data)
    }
})

router.post("/alumnosMid", async(req, res) =>{
    const {nombre, apellido, sede, email} = req.body
    console.log(nombre, apellido, sede, email)
    try {
        const response = await alumnosMid.save({
            nombre,
            apellido,
            sede,
            email
        })
        res.json(response)
    } catch(err) {
        res.status(400).json({
            error: "ocurrio un error"
        })
    }
})

router.delete("/alumnosMid/:id", async (req, res) => {
    const {id} = req.params
    try {
        const response = await alumnosMid.deleteById(id)
        res.json(response)
    } catch (error) {
        let msg = (error).message;
            return res.status(400).json({ error: msg });
    }
})



router.post("/stage1Alumnos", async(req, res) =>{
    try {
        const response = await crearPromesasAlumnos()
        
        res.json(response)
    } catch(err) {
        res.status(400).json({
            error: "ocurrio un error"
        })
    }
})

router.post("/stage2Alumnos", async(req, res) =>{
    try {
        const response = await crearPromesasAlumnos2()
        
        res.json(response)
    } catch(err) {
        res.status(400).json({
            error: "ocurrio un error"
        })
    }
})



export default router