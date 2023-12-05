from Curso import *
from IntegrantesCurso import *
from Notas import *
from Utilities import *
from Categorias import *
import pickle

# 318 324 330 336
# 278	272(DIS problema)	266(VAVp3 problema)	260
# 199 (pr2 problema) 200 (AMSP3-2022-1 problema, MENP3-2022-1problema,MENP3-2022-1) 
# 201 (RCIP3-2022-1,BDP3-2022-1, SOP3-2022-1)
#202
# 139 140,141,142
# 78,79,80,81
cuatri_2022 = [56,57,58,59]

for cuatri in cuatri_2022:


    categoria = Categorias(cuatri)
    categoria.obtener_info()
    categoria.crearCarpeta()
    listaCategorias = categoria.obtenerCategorias()
    print(listaCategorias, len(listaCategorias))
    for cursito in listaCategorias:
        print(cursito)
        try:
            curso = Curso(cursito["id"], cursito["shortname"])
            curso.obtener_info()
            integrantesCurso = IntegrantesCurso(curso.listaGrupos)
            integrantesCurso.obtener_info()

            notas = Notas(cursito["id"])
            notas.obtener_info()

            alumnoPorGrupo = buscarGrupoAlumno(integrantesCurso, notas)

            df = notasCsv(alumnoPorGrupo)

                # with open('df.pkl', 'wb') as archivoDf:
                #         pickle.dump(df, archivoDf)
            # with open('df.pkl', 'rb') as archivoDf:
            #         df = pickle.load(archivoDf)
            #print(df)
            reemplazarDniDf(df)


            aCsv(categoria.nombreCategoria, cursito["shortname"], df)
                # respuesta = input("¿Quieres continuar? (s/n): ")
                # if respuesta.lower() != 's':
                #     break
        except Exception as e:
            print(e)
