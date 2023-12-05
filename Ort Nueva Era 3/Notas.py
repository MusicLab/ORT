import requests

class Notas:
    def __init__(self, courseid):
        self.url = "http://aulavirtual.instituto.ort.edu.ar/webservice/rest/server.php"
        self.params = {
        "wsfunction": "gradereport_user_get_grade_items",
        "wstoken": "tokenn",
        "moodlewsrestformat": "json",
        "courseid": courseid
}
        self.notas = None
        self.obtener_info()

    def obtener_info(self):
        response = requests.get(self.url, self.params)

        # Verificar si la solicitud fue exitosa (código de estado 200)
        if response.status_code == 200:
            data = response.json()  # Convertir la respuesta JSON en un diccionario de Python
            listaNotas = []
            for i in data["usergrades"]:
                listaNotas.append(i)
        else:
            print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)
        self.notas = listaNotas