const express = require("express");
const path = require('path');

const axios = require('axios');
const PORT = process.env.PORT || 3001;

const client_id = 's2ztlGcammyWFdVA7S4P9HX9cGaPKCk8'
const secret_id = 'UHFxXAnlp3O4daNs'

const app = express();

// Hacer que node sirva los archivos de nuestro app React
app.use(express.static(path.resolve(__dirname, 'client/build')));

/*
1era Red.: Obtener el codigo de la url
*/
app.get('/SelectProject/', function (req, res) {
  //Obtencion de code, y client and secret id
  const code = req.query.code;
  console.log('codigo' + code)
  res.redirect('/SelectProjectBc3');

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


//Llamada a APS para obtener el hub
function findHubId(tok) {
  let urlHub = 'https://developer.api.autodesk.com/project/v1/hubs';
  let confheadersHub = {
      headers: {
          Authorization: 'Bearer ' + tok
      }
  };
  axios
      .get(urlHub, confheadersHub)
      .then((response) => {
          const id_hub = response.data['data'][0]['id']
          getProjects(id_hub, tok)
      })
      .catch((error) => {
          console.error(error);
      });
}

//Llamada a APS para obtener todos los proyectos
function getProjects(id_hub, tok) {
  const urlProject = `https://developer.api.autodesk.com/project/v1/hubs/${id_hub}/projects`;
  let confheadersProj = {
      headers: {
          Authorization: 'Bearer ' + tok
      }
  };
  axios
      .get(urlProject, confheadersProj)
      .then((response) => {
          attributesArray = response
              .data
              .data
              .map((item) => ({name: item.attributes['name'], id: item.relationships['cost']['data']['id']
              }));

      })
      .catch((error) => {
          console.error(error);
      });
  app.get('/api/data', (req, res) => {
      res.json({attributesArray});
  });

}
