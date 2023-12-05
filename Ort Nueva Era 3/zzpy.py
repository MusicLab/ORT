import os
import pandas as pd

# Ruta de la carpeta que contiene los archivos CSV
carpeta = 'Cursada del 1° Cuatrimestre 2023'

# Obtener la lista de archivos en la carpeta
archivos = os.listdir(carpeta)

# Iterar sobre cada archivo en la carpeta
for archivo in archivos:
    if archivo.endswith('.csv'):
        print(archivo)
        ruta_archivo = os.path.join(carpeta, archivo)
        
        # Leer el archivo CSV con pandas
        df = pd.read_csv(ruta_archivo, encoding='utf-8')
        
        # Guardar el archivo CSV con codificación UTF-8
        df.to_csv(ruta_archivo, encoding='utf-8', index=False)