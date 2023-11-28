const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, 'client/build')));

// Manejar las peticiones GET en la ruta /api
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


/*
1era Red.: Obtener el codigo de la url
*/
app.get('/SelectProject/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
  //Obtencion de code, y client and secret id
  const code = req.query.code;
  console.log('codigo' + code)

  //Llamada a APS para obtener token
  let url = 'https://developer.api.autodesk.com/authentication/v1/gettoken';
  let data = {
      client_id: client_id,
      client_secret: secret_id,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:3001/SelectProject/'
  };
  let confheaders = {
      headers: {
          'content-type': 'application/x-www-form-urlencoded'
      }
  };
  axios
      .post(url, data, confheaders)
      .then((response) => {
          token = response.data['access_token']
          console.log(token);
          findHubId(token)
      })
      .catch((error) => {
          console.error(error);
      });
});

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
