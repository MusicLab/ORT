from Curso import *
from IntegrantesCurso import *
from Notas import *
from Utilities import *
from Categorias import *
import json
import time
import pickle 


categoria = Categorias(318)
categoria.obtener_info()
categoria.crearCarpeta()
listaCategorias = categoria.obtenerCategorias()

with open('integrantes.pkl', 'rb') as archivoIntegrantes:
    integrantesCurso = pickle.load(archivoIntegrantes)
# print(integrantesCurso.listaGrupos)
print(integrantesCurso.listaIntegrantesGrupos[0])
#integrantesCurso.reemplazarPorDni()


z = 1
for cursito in listaCategorias:
    if z ==1:
        curso = Curso(cursito["id"], cursito["shortname"])
        curso.obtener_info()
        # notas = Notas(cursito["id"])
        # notas.obtener_info()
        # with open('notas.pkl', 'wb') as archivoNotas:
        #     pickle.dump(notas, archivoNotas)
        with open('notas.pkl', 'rb') as archivoNotas:
            notas = pickle.load(archivoNotas)
        alumnoPorGrupo = buscarGrupoAlumno(integrantesCurso, notas)
        z +=1
#     integrantesCurso = IntegrantesCurso(curso.listaGrupos)
#     integrantesCurso.obtener_info()

    # with open('integrantes.pkl', 'wb') as archivoIntegrantes:
    #          pickle.dump(integrantesCurso, archivoIntegrantes)


#     notas = Notas(cursito["id"])
#     notas.obtener_info()

#     alumnoPorGrupo = buscarGrupoAlumno(integrantesCurso, notas)

#     notasCsv(categoria.nombreCategoria, cursito["shortname"] + ".csv", alumnoPorGrupo)

# respuesta = input("¿Quieres continuar? (s/n): ")
# if respuesta.lower() != 's':
#     break


# # # # --------------------------------------Abriendo variables-------------------------------------------------

# # with open('notas.pkl', 'rb') as archivoNotas:
# #     notas = pickle.load(archivoNotas)


# integrantesCurso.reemplazarPorDni()
# print(integrantesCurso.listaIntegrantesGrupos)
#         #print(integrantesCurso.listaIntegrantesGrupos)


#         # # notas = Notas(cursito["id"])
#         # # notas.obtener_info()

#         # alumnoPorGrupo = buscarGrupoAlumno(integrantesCurso, notas)


#         # notasCsv(nombreCuatri + ".csv", alumnoPorGrupo)
#         # z +=1
#         # #transponer(nombreCuatri + ".csv")


#         # with open('integrantes.pkl', 'wb') as archivoIntegrantes:
#         #     pickle.dump(integrantesCurso, archivoIntegrantes)

#         # # with open('notas.pkl', 'wb') as archivoNotas:
#         # #     pickle.dump(notas, archivoNotas)

#         # with open("integranesCurso", "wb") as archivoIntegrantesCurso:
#         #     pickle.dump(integrantesCurso, archivoIntegrantesCurso)




