import csv
import pandas as pd
import os
import requests


def buscarGrupoAlumno(integrantes_guardado, notas_guardado):
    for i in notas_guardado.notas:
        for x in integrantes_guardado.listaIntegrantesGrupos:

            if i["userid"] in x["userids"]:
                result = x["name"]
                i["groupid"] = result

        if "groupid" not in i:
            i["groupid"] = "no hay datos"

    return notas_guardado


    
    
def notasCsv(notas_guardado):
    data = [] 
    for alumno in notas_guardado.notas:
        for x in alumno["gradeitems"]:
    # Verificar si gradeformatted no es None
            if x["gradeformatted"] is not None:
                data.append([alumno["userid"], alumno["groupid"], x["itemname"], x["gradeformatted"]])
            else:
                data.append([alumno["userid"], alumno["groupid"], x["itemname"], 'Valor_faltante'])  # Reemplaza 'Valor_faltante' con el texto que quieras.

# Crear un DataFrame a partir de los datos recolectados
    df_nuevo = pd.DataFrame(data, columns=['userid', 'groupid', 'itemname', 'gradeformatted'])
    pivot_df = df_nuevo.pivot_table(index=['userid', 'groupid'], columns='itemname', values='gradeformatted', aggfunc='first')
    # Reiniciamos los índices
    pivot_df = pivot_df.reset_index()
    # Si lo prefieres, puedes cambiar el nombre del índice (None en este caso)
    pivot_df.columns.name = None

    # Renombramos las columnas
    pivot_df.columns = [col if col != ('userid', '') and col != ('groupid', '') else col[0] + '_' + col[1] for col in pivot_df.columns]
    # Rellenamos los valores NaN con un guión (-) o lo que prefieras
    pivot_df = pivot_df.fillna('-')
    return pivot_df
 
def aCsv(ruta, nombreArchivo, pivot_df):
    rutafinal = os.path.join(os.getcwd(), ruta)
    pivot_df.to_csv(rutafinal + "/" +  nombreArchivo+".csv", index=False)
    pivot_df.to_excel(rutafinal + "/" +  nombreArchivo+".xlsx", index=False)

def reemplazoDni(user):
    url = "http://aulavirtual.instituto.ort.edu.ar/webservice/rest/server.php"
    params = {
    "wsfunction": "core_user_get_users_by_field",
    "wstoken": "tokenn",
    "moodlewsrestformat": "json",
    "field": "id",
    "values[0]": user
}
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        clas = ""
        try:
            for a in data:
                try:
                    username = a["username"]
                except:
                    username = "-"
                try:
                    lastname = a["lastname"]
                except:
                    lastname = "-"
                try:
                    firstname = a["firstname"]
                except:
                    firstname = "-"
                try:
                    institution = a["institution"]
                except:
                    institution = "-"
                try:
                    department = a["department"]
                except:
                    department = "-"

                try:
                    for z in a["customfields"]:
                        if z["name"] == "Class":
                            clas=z["value"]
                except:
                    print("no existe customfields")
                            
        except Exception as e:
            print(e)  
    else:
        print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)


    return lastname, firstname, username, institution, department, clas

def reemplazarDniDf(df):

    df[['lastname', 'firstname', 'username', 'institution', 'department','clas']] = df['userid'].apply(lambda x: pd.Series(reemplazoDni(x)))
    df.insert(1, 'Apellido(s)', df.pop('lastname'))
    df.insert(2, 'Nombre', df.pop('firstname'))
    df.insert(3, 'Nombre de usuario', df.pop('username'))
    df.insert(4, 'Institución', df.pop('institution'))
    df.insert(5, 'Departamento', df.pop('department'))
    df.insert(6, '1-Sede', df['Institución'])
    df.insert(7, '2-Carrera', df['Departamento'])
    df.insert(8, 'class', df.pop('clas'))
    


