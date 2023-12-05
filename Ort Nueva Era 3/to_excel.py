import os
import pandas as pd

# Ruta de la carpeta que contiene los archivos CSV
carpeta = 'Cursada del 2° Cuatrimestre 2022'

# Obtener la lista de archivos CSV en la carpeta
archivos_csv = [f for f in os.listdir(carpeta) if f.endswith('.csv')]

# Iterar sobre los archivos CSV y convertirlos a archivos Excel
for archivo in archivos_csv:
    # Leer el archivo CSV
    ruta_csv = os.path.join(carpeta, archivo)
    df = pd.read_csv(ruta_csv, encoding='utf-8')

    # Generar la ruta para guardar el archivo Excel (reemplazando la extensión .csv por .xlsx)
    ruta_xlsx = os.path.splitext(ruta_csv)[0] + '.xlsx'

    # Guardar el DataFrame como archivo Excel (.xlsx)
    df.to_excel(ruta_xlsx, index=False)