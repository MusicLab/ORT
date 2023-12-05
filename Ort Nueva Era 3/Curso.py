import requests

class Curso:
    def __init__(self, courseid, nombre):
        self.url = "http://aulavirtual.instituto.ort.edu.ar/webservice/rest/server.php"
        self.params = {
        "wsfunction": "core_group_get_course_groups",
        "wstoken": "tokenn",
        "moodlewsrestformat": "json",
        "courseid": courseid
}
        self.listaGrupos = None
        self.obtener_info()
        self.nombre = nombre

    def obtener_info(self):
        response = requests.get(self.url, self.params)

        # Verificar si la solicitud fue exitosa (código de estado 200)
        if response.status_code == 200:
            data = response.json()  # Convertir la respuesta JSON en un diccionario de Python
            listaGrupos = []
            for i in data:
                listaGrupos.append((i["id"], i["name"]))
        else:
            print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)
        self.listaGrupos = listaGrupos