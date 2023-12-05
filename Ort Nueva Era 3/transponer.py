import csv
import pandas as pd
with open("tabla.csv") as tabla:
    df = pd.read_csv(tabla, delimiter=',')
    df_transpuesto = df.transpose()
    
    print(df_transpuesto)
    df_transpuesto.to_csv('datos_transpuestos.csv', encoding='utf-8', index=False)

