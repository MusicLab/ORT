import {GoogleSpreadsheet} from "google-spreadsheet"
import credenciales from "./credenciales.json" assert {type: "json"}

const googleId = "1Prspp9NOrWL6Jn_ELHL0zs5lYdfTIdiYlZcObSwiT40"


async function accederGoogleSheet() {

    const documento = new GoogleSpreadsheet(googleId)
    await documento.userServiceAccountAuth(credenciales)
    await documento.loadInfo()

    const sheet = documento.sheetsByIndex[0]
    console.log(sheet)

}

accederGoogleSheet()
// module.exports = {
//     accederGoogleSheet : accederGoogleSheet,
// }