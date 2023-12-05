import requests

class IntegrantesCurso:
    def __init__(self, listaGrupos):
        self.url = "http://aulavirtual.instituto.ort.edu.ar/webservice/rest/server.php"
        self.listaGrupos = listaGrupos
        self.listaIntegrantesGrupos = []
        self.obtener_info()
        

    
    
    
    def obtener_info(self):
       
        for grupo in self.listaGrupos:
            params = {
                "wsfunction": "core_group_get_group_members",
                "wstoken": "tokenn",
                "moodlewsrestformat": "json",
                "groupids[0]": grupo[0]
            }
            response = requests.get(self.url, params=params)

            # Verificar si la solicitud fue exitosa (código de estado 200)
            if response.status_code == 200:
                data = response.json()  # Convertir la respuesta JSON en un diccionario de Python
                data[0]["name"] = grupo[1]
                self.listaIntegrantesGrupos.append((data[0]))
            else:
                print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)
        
        return "noHayDatos"
    
    def reemplazarPorDni1(self):
        z = 1
        if z == 1:
            for e in self.listaIntegrantesGrupos:
                for indice, user in enumerate(e["userids"]):
                    params = {
                    "wsfunction": "core_user_get_users_by_field",
                    "wstoken": "tokenn",
                    "moodlewsrestformat": "json",
                    "field": "id",
                    "values[0]": user
                }
                    response = requests.get(self.url, params=params)

                    if response.status_code == 200:
                        data = response.json()

                        try:
                            e["userids"][indice] = data[0]["username"]
                            print(e["userids"][indice])
                            # for a in data[0]["customfields"]:
                            #     if a["name"] == "Class":
                            #         print(a["value"])
                        ## reemplazamos userid por username(documento)
                        except Exception as e:
                            print(e)
                        z += 1        
                    else:
                        print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)
        

    def reemplazarPorDni(self):
        z = 1
        for e in self.listaIntegrantesGrupos:
            if z == 1:
                for indice, user in enumerate(e["userids"]):
                    params = {
                    "wsfunction": "core_user_get_users_by_field",
                    "wstoken": "tokenn",
                    "moodlewsrestformat": "json",
                    "field": "id",
                    "values[0]": user
                }
                    response = requests.get(self.url, params=params)

                    if response.status_code == 200:
                        data = response.json()
                        clas = ""
                        try:
                            for a in data[0]["customfields"]:
                                if a["name"] == "Class":
                                    clas = a["value"]


                            e["userids"][indice] = (data[0]["username"], clas, 
                                                    data[0]["lastname"],
                                                    data[0]["firstname"],
                                                    data[0]["institution"],
                                                    data[0]["department"]
                                                    )
                        ## reemplazamos userid por username(documento)
                        except Exception as e:
                            print(e)
                        z += 1        
                    else:
                        print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)
        





