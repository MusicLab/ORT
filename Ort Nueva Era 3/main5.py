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




lista2 = [(363,"OEN-2020-2"),
          (385,"SAD-2020-2"),
          (386,"AMS-2020-2"),
          (387,"SIS-2020-2"),
          (388,"CSO-2020-2"),
          (389,"PRF-2020-2")]



lista3 = [(375,"IIF-2020-2"),
          (377,"ASO-2020-2"),
          (378,"BD1-2020-2"),
          (379,"BD2-2020-2"),
          (380,"IT-2020-2"),
          (381,"II-2020-2")]

lista4 = [(365,"INT-2020-2"),
          (366,"MAT-2020-2"),
          (364,"TCR-2020-2"),
          (367,"ESJ-2020-2"),
          (368,"IN1-2020-2"),
          (369,"IN2-2020-2")]

lista5 = [(207,"FPR-2020-1"),
          (208,"THP-2020-1"),
          (209,"PR1-2020-1"),
          (206,"TP1-2020-1"),
          (210,"NT1-2020-1"),
          (229,"PR2-2020-1")]

lista6 = [(213,"OEN-2020-1"),
          (215,"SAD-2020-1"),
          (216,"AMS-2020-1"),
          (217,"SIS-2020-1"),
          (218,"CSO-2020-1"),
          (214,"PRF-2020-1")]

lista7 = [(219,"IIF-2020-1"),
          (221,"ASO-2020-1"),
          (220,"BD1-2020-1"),
          (222,"BD2-2020-1"),
          (177,"IT-2020"),
          (339,"II-2020-1")]

lista8 = [(225,"INT-2020-1"),
          (223,"MAT-2020-1"),
          (224,"TCR-2020-1"),
          (226,"ESJ-2020-1"),
          (343,"IN1-2020-1"),
          (344,"IN2-2020-1")]

lista9 = [#(387,"SIS-2020-2"),
          (388,"CSO-2020-2"),
          (389,"PRF-2020-2")]
          #(381,"II-2020-2"),
          #(368,"IN1-2020-2"),
          #(369,"IN2-2020-2")]

for cursito in lista9:
    print(cursito)
    try:
        curso = Curso(cursito[0], cursito[1])
        curso.obtener_info()
        integrantesCurso = IntegrantesCurso(curso.listaGrupos)
        integrantesCurso.obtener_info()

        notas = Notas(cursito[0])
        notas.obtener_info()

        alumnoPorGrupo = buscarGrupoAlumno(integrantesCurso, notas)

        df = notasCsv(alumnoPorGrupo)

            # with open('df.pkl', 'wb') as archivoDf:
            #         pickle.dump(df, archivoDf)
        # with open('df.pkl', 'rb') as archivoDf:
        #         df = pickle.load(archivoDf)
        #print(df)
        reemplazarDniDf(df)


        aCsv("asd", cursito[1], df)
            # respuesta = input("¿Quieres continuar? (s/n): ")
            # if respuesta.lower() != 's':
            #     break
    except Exception as e:
        print(e)
