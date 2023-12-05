import os
import csv

def reemplazar_guiones(nombre_archivo):
    with open(nombre_archivo, 'r', encoding = 'utf-8') as archivo:
        filas = csv.reader(archivo)
        datos = list(filas)
    
    # Reemplaza los guiones que sean el único valor en la celda por None
    for fila in datos:
        for i, valor in enumerate(fila):
            if valor == '-':
                fila[i] = None

    # Escribe los cambios al archivo
    with open(nombre_archivo, 'w', newline='', encoding = 'utf-8') as archivo:
        escritor_csv = csv.writer(archivo)
        escritor_csv.writerows(datos)

# Ruta de la carpeta que contiene los archivos CSV
carpeta = 'Cursada del 2° Cuatrimestre 2022'

# Iterar sobre los archivos CSV en la carpeta y realizar el reemplazo
for archivo in os.listdir(carpeta):
    if archivo.endswith('.csv'):
        ruta_archivo = os.path.join(carpeta, archivo)
        reemplazar_guiones(ruta_archivo)