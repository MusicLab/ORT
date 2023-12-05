const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const credentials = require('../claves/del-ort-fb079ad7ab29.json')



async function listAllSpreadsheets() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const drive = google.drive({ version: 'v3', auth });

    // Obtiene la lista de hojas de cálculo propiedad de la cuenta de servicio
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet' and 'me' in owners",
    });

    // Imprime el nombre de cada hoja de cálculo
    console.log('Hojas de cálculo de la cuenta de servicio:');
    for (const file of response.data.files) {
      console.log(file.name);
    }

  } catch (error) {
    console.error('Error al obtener la lista de hojas de cálculo:', error.message);
  }
}


async function concatenateAndSetValues() {
  

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = '1b9DlSgjkv91tMZ4PL6zWDryfeEFLAzU9PsFytkpXtj4';
  const sheetName = 'ALMAGRO 2023-2'; // Reemplaza con el nombre de la hoja de cálculo que deseas acceder
  const startRow = 3; // Fila desde la cual comenzar a colocar los resultados
  const targetColumn = 'T'; // Columna en la que colocar los resultados

  try {
    // Obtiene los valores de las celdas L, M, N y O
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: `${sheetName}!L${startRow}:O`,
    });

    const values = response.data.values;

    if (!values || values.length === 0) {
      console.log('No hay valores en las celdas especificadas. Deteniendo el proceso.');
      return;
    }

    // Calcula el rango de destino hasta la última fila con valores
    const endRow = startRow + values.length - 1;

    // Crear una lista de letras en la columna T por cada fila
    const results = values.map((row) => {
      let allNoOrEmpty = true;
      const lettersList = [];

      // Recorrer las columnas L, M, N y O
      for (let i = 0; i < 4; i++) {
        const value = row[i];

        if (value && (value.toLowerCase() === 'si' || value.toLowerCase() === 'sí')) {
          allNoOrEmpty = false;
          if (i === 0) {
            lettersList.push('A');
          } else if (i === 1) {
            lettersList.push('B');
          } else if (i === 2) {
            lettersList.push('C');
          } else if (i === 3) {
            lettersList.push('D');
          }
        }
      }

      if (allNoOrEmpty) {
        lettersList.push('E');
      }

      return lettersList.join('');
    });

    // Actualiza los valores en la columna T
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: `${sheetName}!${targetColumn}${startRow}:${targetColumn}${endRow}`,
      valueInputOption: 'USER_ENTERED',
      resource: { values: results.map((result) => [result]) },
    });

    console.log('Las letras se han colocado en la columna T según los valores en las columnas L, M, N y O.');
  } catch (error) {
    console.error('Error al colocar las letras:', error);
  }
}


async function generateAndShareSheets() {

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const drive = google.drive({ version: 'v3', auth });

  const sourceSpreadsheetId = '1b9DlSgjkv91tMZ4PL6zWDryfeEFLAzU9PsFytkpXtj4';
  const sourceSheetName = 'ALMAGRO 2023-2'; // Reemplaza con el nombre de la hoja de cálculo que deseas copiar
  const sourceRange = `${sourceSheetName}!A3:U`; // Rango que incluye las columnas A a U, comenzando desde la fila 3

  try {
    // Obtener los datos de la hoja de origen
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sourceSpreadsheetId,
      range: sourceRange,
    });

    const values = response.data.values;

    if (!values || values.length === 0) {
      console.log('No hay valores en la hoja de origen. Deteniendo el proceso.');
      return;
    }

    // Crear un objeto para almacenar los datos filtrados por la columna U
    const filteredData = {};

    // Filtrar los datos por la columna U y almacenarlos en el objeto
    values.forEach((row) => {
      const columnUValue = row[20]; // Índice 20 corresponde a la columna U (0-indexed)
      const lastChar = columnUValue ? columnUValue.slice(-1) : ''; // Obtener el último carácter de la columna U

      if (lastChar === 'A') {
        if (!filteredData[lastChar]) {
          filteredData[lastChar] = [];
        }
        let x = "A"

        const rowData = [
          row[1], // DNI
          'dnidnidni', // Password
          row[4], // Nombre
          row[3], // Apellido
          row[5], // Mail
          '', // Idnumber
          row[6], // Teléfono
          "CABA",
          "Almagro",
          "ASC", //carrera
          row[19], // Class
          "Almagro",
          "ASC", //carrera
          row[19], // Class
          "FPR-2023-2",
          "1",
          "student",
          `YA-FPR${x}`,
          "THP-2023-2",
          "1",
          "student",
          `YA-THP${x}`,
          "OEM-2023-2",
          "1",
          "student",
          `YA-OEM${x}`,
           "IIF1-2023-2",
          "1",
          "student",
          `YA-IIF${x}`,
          "TCI-2023-2",
          "1",
          "student",
          `YA-TCI${x}`,
          "MAT-2023-2",
          "1",
          "student",
          `YA-MAT${x}`,
          "INT-2023-2",
          "1",
          "student",
          `YA-INT${x}`
        ];

        filteredData[lastChar].push(rowData); // Agregar la fila filtrada al grupo correspondiente
      }
    });

    // Verificar si hay datos filtrados para la letra A
    if (!filteredData['A'] || filteredData['A'].length === 0) {
      console.log('No hay datos filtrados para la letra A. Deteniendo el proceso.');
      return;
    }

    // Cabeceras adicionales
    const additionalHeaders = [
      'username', 'password', 'firstname', 'lastname', 'email', 'idnumber', "phone1", "city", "institution", "department", "Class", "profile_field_1Sede","profile_field_2Carrera","profile_field_3class","course1","type1","role1","group1","course2","type2","role2","group2","course3","type3","role3","group3","course4","type4","role4","group4","course5","type5","role5","group5","course6","type6","role6","group6","course7","type7","role7", "group7" 
    ];

    const sheetName = 'Hoja A'; // Nombre de la nueva hoja de cálculo

    // Crear la hoja de cálculo
    const newSpreadsheet = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: sheetName,
        },
      },
    });

    const newSpreadsheetId = newSpreadsheet.data.spreadsheetId;

    // Agregar las cabeceras a la nueva hoja de cálculo
    await sheets.spreadsheets.values.update({
      spreadsheetId: newSpreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      resource: { values: [additionalHeaders] },
    });

    // Copiar los datos filtrados a la nueva hoja de cálculo
    await sheets.spreadsheets.values.update({
      spreadsheetId: newSpreadsheetId,
      range: 'Sheet1!A2',
      valueInputOption: 'USER_ENTERED',
      resource: { values: filteredData['A'] },
    });

    // Compartir la hoja de cálculo con tu cuenta de Gmail
    await drive.permissions.create({
      fileId: newSpreadsheetId,
      sendNotificationEmails: false,
      requestBody: {
        role: 'writer',
        type: 'user',
        emailAddress: 'lucas.baruffaldi@ort.edu.ar',
      },
    });

    console.log(`Se ha creado la hoja de cálculo "${sheetName}" con los datos filtrados por "A" y se ha compartido con tu cuenta de Gmail.`);
  } catch (error) {
    console.error('Error al generar y compartir las nuevas hojas de cálculo:', error);
  }
}
async function generateAndShareSheets2() {

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const drive = google.drive({ version: 'v3', auth });

  const sourceSpreadsheetId = '1b9DlSgjkv91tMZ4PL6zWDryfeEFLAzU9PsFytkpXtj4';
  const sourceSheetName = 'ALMAGRO 2023-2'; // Reemplaza con el nombre de la hoja de cálculo que deseas copiar
  const sourceRange = `${sourceSheetName}!A3:U`; // Rango que incluye las columnas A a U, comenzando desde la fila 3

  try {
    // Obtener los datos de la hoja de origen
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sourceSpreadsheetId,
      range: sourceRange,
    });

    const values = response.data.values;

    if (!values || values.length === 0) {
      console.log('No hay valores en la hoja de origen. Deteniendo el proceso.');
      return;
    }

    // Crear un objeto para almacenar los datos filtrados por la columna U
    const filteredData = {};

    // Filtrar los datos por la columna U y almacenarlos en el objeto
    values.forEach((row) => {
      const columnUValue = row[20]; // Índice 20 corresponde a la columna U (0-indexed)
      const lastChar = columnUValue ? columnUValue.slice(-1) : ''; // Obtener el último carácter de la columna U

      if (lastChar !== '') {
        if (!filteredData[lastChar]) {
          filteredData[lastChar] = [];
        }
        let x = lastChar;

        const rowData = [
          row[1], // DNI
          'Ort12345', // Password
          row[4], // Nombre
          row[3], // Apellido
          row[5], // Mail
          '', // Idnumber
          row[6], // Teléfono
          "CABA",
          "Almagro",
          "ASC", //carrera
          row[19], // Class
          "Almagro",
          "ASC", //carrera
          row[19], // Class
          "FPR-2023-2",
          "1",
          "student",
          `YA-FPR${x}`,
          "THP-2023-2",
          "1",
          "student",
          `YA-THP${x}`,
          "OEM-2023-2",
          "1",
          "student",
          `YA-OEM${x}`,
          "IIF1-2023-2",
          "1",
          "student",
          `YA-IIF${x}`,
          "TCI-2023-2",
          "1",
          "student",
          `YA-TCI${x}`,
          "MAT-2023-2",
          "1",
          "student",
          `YA-MAT${x}`,
          "INT-2023-2",
          "1",
          "student",
          `YA-INT${x}`
        ];

        filteredData[lastChar].push(rowData); // Agregar la fila filtrada al grupo correspondiente
      }
    });

    // Verificar si hay datos filtrados
    const filteredKeys = Object.keys(filteredData);
    if (filteredKeys.length === 0) {
      console.log('No hay datos filtrados. Deteniendo el proceso.');
      return;
    }

    // Cabeceras adicionales
    const additionalHeaders = [
      'username', 'password', 'firstname', 'lastname', 'email', 'idnumber', "phone1", "city", "institution", "department", "Class", "profile_field_1Sede","profile_field_2Carrera","profile_field_3class","course1","type1","role1","group1","course2","type2","role2","group2","course3","type3","role3","group3","course4","type4","role4","group4","course5","type5","role5","group5","course6","type6","role6","group6","course7","type7","role7", "group7" 
    ];

    // Iterar sobre las últimas letras filtradas
    for (const lastChar of filteredKeys) {
      const sheetName = `Almagro - ${lastChar}`;

      // Crear la nueva hoja dentro de la planilla existente
      const addSheetRequest = {
        spreadsheetId: sourceSpreadsheetId,
        resource: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName,
                },
              },
            },
          ],
        },
      };
      await sheets.spreadsheets.batchUpdate(addSheetRequest);

      // Obtener el ID de la hoja de cálculo donde se generarán los datos filtrados
      const newSpreadsheetId = sourceSpreadsheetId;

      // Agregar las cabeceras a la nueva hoja de cálculo
      const headersUpdateRequest = {
        spreadsheetId: newSpreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        resource: { values: [additionalHeaders] },
      };
      await sheets.spreadsheets.values.update(headersUpdateRequest);

      // Copiar los datos filtrados a la nueva hoja de cálculo
      const dataUpdateRequest = {
        spreadsheetId: newSpreadsheetId,
        range: `${sheetName}!A2`,
        valueInputOption: 'USER_ENTERED',
        resource: { values: filteredData[lastChar] },
      };
      await sheets.spreadsheets.values.update(dataUpdateRequest);

      // Compartir la hoja de cálculo con tu cuenta de Gmail
      await drive.permissions.create({
        fileId: newSpreadsheetId,
        sendNotificationEmails: false,
        requestBody: {
          role: 'writer',
          type: 'user',
          emailAddress: 'lucas.baruffaldi@ort.edu.ar', // Reemplaza con tu dirección de correo electrónico de Gmail
        },
      });

      console.log(`Se ha creado la hoja de cálculo "${sheetName}" con los datos filtrados por "${lastChar}" y se ha compartido con tu cuenta de Gmail.`);
    }

    console.log(`Se han generado y compartido las nuevas hojas de cálculo dentro del documento.`);
  } catch (error) {
    console.error('Error al generar y compartir las nuevas hojas de cálculo:', error);
  }
}




async function shareAllSpreadsheets() {


  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const drive = google.drive({ version: 'v3', auth });

  try {
    // Obtener la lista de archivos creados por la cuenta de servicio
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: 'files(id, name)',
    });

    const files = response.data.files;

    if (files && files.length > 0) {
      for (const file of files) {
        const fileId = file.id;

        // Compartir el archivo con tu dirección de correo electrónico
        await drive.permissions.create({
          fileId: fileId,
          requestBody: {
            role: 'writer',
            type: 'user',
            emailAddress: 'lucas.baruffaldi@ort.edu.ar', // Reemplaza con tu dirección de correo electrónico
          },
        });

        console.log(`Se ha compartido la planilla "${file.name}" con tu cuenta de Gmail.`);
      }
    } else {
      console.log('No se encontraron planillas creadas por la cuenta de servicio.');
    }
  } catch (error) {
    console.error('Error al compartir las planillas:', error);
  }
}



async function listAllSpreadsheets() {

  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  
  const drive = google.drive({ version: 'v3', auth });
  
  try {
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: 'files(id, name)',
    });

    const files = response.data.files;
    
    if (files && files.length > 0) {
      console.log('Planillas de la cuenta de servicio:');
      for (const file of files) {
        console.log(`${file.name} (${file.id})`);
      }
    } else {
      console.log('No se encontraron planillas en la cuenta de servicio.');
    }
  } catch (error) {
    console.error('Error al obtener las planillas:', error);
  }
}

async function deleteAllSpreadsheets() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    
    const drive = google.drive({ version: 'v3', auth });

    // Obtener la lista de hojas de cálculo creadas por la cuenta de servicio
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet' and 'me' in owners",
    });

    const files = response.data.files;
    
    // Borrar cada hoja de cálculo
    for (const file of files) {
      await drive.files.delete({ fileId: file.id });
      console.log(`Hoja de cálculo "${file.name}" borrada con éxito.`);
    }
    
    console.log('Todas las hojas de cálculo hechas por la cuenta de servicio han sido borradas.');

  } catch (error) {
    console.error('Error al borrar las hojas de cálculo:', error.message);
  }
}




//listAllSpreadsheets();

//concatenateAndSetValues();
//shareAllSpreadsheets();

generateAndShareSheets2();
//deleteAllSpreadsheets();


