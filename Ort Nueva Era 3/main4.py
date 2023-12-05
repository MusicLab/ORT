from Curso import *
from IntegrantesCurso import *
from Notas import *
from Utilities import *
from Categorias import *
import pickle

# cuatri_2022 = [318]

# for cuatri in cuatri_2022:


#     categoria = Categorias(cuatri)
#     categoria.obtener_info()
#     categoria.crearCarpeta()
#     listaCategorias = categoria.obtenerCategorias()
#     print(listaCategorias, len(listaCategorias))
#     for cursito in listaCategorias:
#         print(cursito)


lista = [(402,"THP-2020-2"),
         (404, "TP1-2020-2"),
         (411, "T5-2020-2"),
         (422, "IP-2020-2"),
         (403,"PR1-2020-2")
         ]

try:
    curso = Curso(401, "FPR-2020-2")
    curso.obtener_info()
    integrantesCurso = IntegrantesCurso(curso.listaGrupos)
    integrantesCurso.obtener_info()

    notas = Notas(401)
    notas.obtener_info()

    alumnoPorGrupo = buscarGrupoAlumno(integrantesCurso, notas)

    df = notasCsv(alumnoPorGrupo)

        # with open('df.pkl', 'wb') as archivoDf:
        #         pickle.dump(df, archivoDf)
    # with open('df.pkl', 'rb') as archivoDf:
    #         df = pickle.load(archivoDf)
    #print(df)
    reemplazarDniDf(df)


    aCsv("2020-1", "FPR-2020-2", df)
        # respuesta = input("¿Quieres continuar? (s/n): ")
        # if respuesta.lower() != 's':
        #     break
except Exception as e:
    print(e)
