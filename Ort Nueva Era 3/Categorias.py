import requests
import pandas as pd
import json
import os



import requests

class Categorias:
    def __init__(self, categoria):
        self.url = "http://aulavirtual.instituto.ort.edu.ar/webservice/rest/server.php"
        self.params = {
        "wsfunction": "core_course_get_categories",
        "wstoken": "tokenn",
        "moodlewsrestformat": "json",
        
}
        self.categoria = categoria
        self.nombreCategoria = ""
        self.categorias = []
        self.cursos = []


    def obtener_info(self):
        response = requests.get(self.url, self.params)

        # Verificar si la solicitud fue exitosa (código de estado 200)
        if response.status_code == 200:
            data = response.json()  # Convertir la respuesta JSON en un diccionario de Python
            for a in data:
                if a["parent"] == self.categoria:
                    self.categorias.append({"id" : a["id"], "name" : a["name"]})
                if a["id"] == self.categoria:
                    self.nombreCategoria = a["name"]
            
        else:
            print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)


    def obtenerCategorias(self):
        listaCursos = []
        for a in self.categorias:
            params = {
            "wsfunction": "core_course_get_courses_by_field",
            "wstoken": "tokenn",
            "moodlewsrestformat": "json",
            "field" : "category",
            "value" : a["id"]
            
    }
            response = requests.get(self.url, params)

            # Verificar si la solicitud fue exitosa (código de estado 200)
            if response.status_code == 200:
                data = response.json()  # Convertir la respuesta JSON en un diccionario de Python
                for b in data["courses"]:
                    listaCursos.append({"id": b["id"], "shortname" : b["shortname"]})
            else:
                print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)
        return listaCursos
                
    def crearCarpeta(self):
        ruta = os.path.join(os.getcwd(), self.nombreCategoria)
        os.makedirs(ruta, exist_ok=True)









    
