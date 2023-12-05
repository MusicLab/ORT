import requests



z=0
for i in range(7000, 8001):
    url = "http://aulavirtual.instituto.ort.edu.ar/webservice/rest/server.php"
    params = {
    "wsfunction": "core_user_get_users_by_field",
    "wstoken": "tokenn",
    "moodlewsrestformat": "json",
    "field": "id",
    "values[0]": str(i)

    }        
    response = requests.get(url, params)
    if response.status_code == 200:
            data = response.json()  # Convertir la respuesta JSON en un diccionario de Python
            try:
                print(data[0]["lang"])
                if data[0]["lang"] == "es":
                    z += 1
                    print(z)
            except Exception as e:
                print(e)
    else:
        print("La solicitud GET no fue exitosa. Código de estado:", response.status_code)