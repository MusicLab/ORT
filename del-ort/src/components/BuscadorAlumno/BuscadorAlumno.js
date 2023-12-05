import React, {useState, useEffect} from 'react'



const BuscadorAlumno = ({setUserid}) => {
    const [mail, setMail] = useState("gonzalocabad@live.com")
    

    

    const handleInputChange = (event) => {
      setMail(
        event.target.value
      )

    }
    
    const enviarDatos = async (event) => {

      event.preventDefault()
       
    const res = await fetch(
      `http://www.ort.edu.ar:50080/moodle/webservice/rest/server.php?wstoken=tokenn&moodlewsrestformat=json&wsfunction=core_user_get_users_by_field&field=email&values[0]=${mail}`
    )

    const data = await res.json()  
    data.length > 0 && setUserid(data[0].id)
      

      
      
      
      
  }

    return (
        <div>
            <form className="row" onSubmit={enviarDatos}>
              <label>
                <input type="text" placeholder="Mail" className="form-control" onChange={handleInputChange} name="mail"></input>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </label>
            </form>
        </div>
    )
}

export default BuscadorAlumno
