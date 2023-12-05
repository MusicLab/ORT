from Curso import *
from IntegrantesCurso import *
from Notas import *
from Utilities import *
from Categorias import *
import json
import time
import pickle 


nombreCuatri = ""


categoria = Categorias(318)
categoria.obtener_info()
print(categoria.obtenerCategorias())

listaCursos = categoria.obtenerCategorias()

for cursito in listaCursos:

    curso = Curso(cursito["id"], cursito["fullname"])
    curso.obtener_info()

    integrantesCurso = IntegrantesCurso(curso.listaGrupos)
    integrantesCurso.obtener_info()

    notas = Notas(cursito["id"])
    notas.obtener_info()

    alumnoPorGrupo = buscarGrupoAlumno(integrantesCurso, notas)

    notasCsv(cursito["shortname"] + ".csv", alumnoPorGrupo)
    respuesta = input("¿Quieres continuar? (s/n): ")
    if respuesta.lower() != 's':
        break







