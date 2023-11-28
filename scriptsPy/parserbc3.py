import re
import io
from collections import defaultdict

import subprocess
import sys

# Instalar dependencias usando pip
subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])

import requests
import base64
import json
def tree(): return defaultdict(tree)
import sys
import socketio

# Conectar al servidor de Socket.io

bc3_file = sys.argv[1]
token = sys.argv[2]
id_project = sys.argv[3]
id_template = sys.argv[4]

#Global Vars 
presBAS = None
name_budget = concepts  = chapters_princ = []
total_chapters = total_concepts = 0
esquema = dict()
descompRE = re.compile('(.*?)\\\\(.*?)\\\\(.*?)\\\\')

#CLASE PRESUPUESTO
class presupuesto:
    def __init__(self, *archivo):
        try:
            self.leerBC3(archivo)
            print(self,'es un presupuesto creado a partir de', archivo[0])
        finally:
            pass

    def leerBC3(self, archivo):
        regs = re.split('~',open(archivo[0], encoding='latin-1').read())
        self.registros = [re.split('\|',reg) for reg in regs]

        [regsC, regsD, regsM, regsT] = [{},{},{},{}]

        for reg in self.registros:
            if reg[0] == 'C':
                regsC.update({reg[1]:reg[2:-1]})
            elif reg[0] == 'D':
                try:
                    regsD.update({reg[1]:reg[2:-1]})
                except IndexError:
                    print("No hay descomposiciones")
            elif reg[0] == 'M':
                regsM.update({reg[1]:reg[2:-1]})
            elif reg[0] == 'T':
                regsT.update({reg[1]:reg[2:-1][0]})
            else:
                pass

        self.conceptos = regsC
        self.descomposiciones = regsD
        self.mediciones = regsM
        self.textos = regsT

#CLASE CONCEPTO
class Concepto:
    def __init__(self, code,unit,description,unit_price,medition,tot_price,isChapter):
        self.code = code
        self.unit = unit
        self.description = description
        self.unit_price = unit_price
        self.medition = medition
        self.tot_price = tot_price
        self.isChapter = isChapter

    def toString(self):
        return f'{self.code} , {self.unit} , {self.description} , {self.unit_price} , {self.medition} , {self.tot_price} , {self.isChapter}'

def main():
    global name_budget
    concepts  = []
    total_chapters = total_concepts = 0 

    try:
        presBAS = presupuesto(bc3_file)
    except Exception as e:
        print(f"Ha ocurrido un error: {e}") 


    #Proceso para obtener todas las mediciones con sus correspondientes codigos
    all_meditions = {}
    dicc_claves = presBAS.mediciones
    for clave, valor in dicc_claves.items():
        code = clave.split('\\')
        code_limp = code[-1].replace('#','').replace('\\', '')
        all_meditions[code_limp] = valor[1]


    claves = presBAS.conceptos.keys()
    dicc_claves = presBAS.conceptos
    #Proceso para obtener todos los capitulos y descomposiciones, y guardarlos en lista
    for clave, valor in dicc_claves.items():
    #Nombre presupuesto y conceptos padre
        if re.search('.*##',clave):
            name_budget = [valor[1], valor[2]+'€']
    #Capitulos:
        elif re.search('.*#', clave):
            concept = Concepto((clave).replace('#','').replace('\\', ''), '-', valor[1], '-', '-', valor[2], True)
            concepts.append(concept)
            total_chapters+=1
    #Conceptos:
        else:
            medition = all_meditions[clave] if clave in all_meditions else None
            #Si tiene medicion
            if medition is not None:
                concept = Concepto(clave.replace('#','').replace('\\', ''), valor[0], valor[1], valor[2],float(medition), valor[4], False)
            else:
                concept = Concepto(clave.replace('#','').replace('\\', ''), valor[0], valor[1], valor[2],'-', valor[4], False)
            concepts.append(concept)
            total_concepts+=1
            #print(concept.toString())

    print('Declarados {} conceptos y descomposiciones para el presupuesto {} con coste total de {}'.format(len(concepts), name_budget[0], name_budget[1]))

    #Obtener capitulos principales
    chapters_princ = []
    for capitulo in presBAS.descomposiciones:
        if re.search('.*##',capitulo):
            chapters_princ=(presBAS.descomposiciones[capitulo][0]).replace('#','')

        elif re.search('.*#', capitulo):
            partidas = [ re.findall(r"(.*?)\\",partida[0]) for partida in
                        re.findall(r"(((.*?)\\){3})",presBAS.descomposiciones[capitulo][0])]

    chapters_princ = chapters_princ.split('\\1\\1\\')
    chapters_princ = chapters_princ[:-1]

    #Descomponemos todo el codigo y actualizamos padres con hijos
    esquema = dict()
    descompRE = re.compile('(.*?)\\\\(.*?)\\\\(.*?)\\\\')
    for padre in presBAS.descomposiciones:
        esquema[padre] = {}
        concPadre=findConcept(padre)

        aa = re.split(descompRE,
                    presBAS.descomposiciones[padre][0])[0:-1]
        hijos = [ (a , {}) for a in aa[1::4]]
        esquema[padre].update(hijos)

        for dd in zip(*[iter(aa)]*4):
            x=dd[1:]
            codeDescomp = x[0]

    #Proceso para ordenar todo el JSON
    claves_ordenadas = sorted(esquema.keys(), key=ordenar_claves)
    json_ordenado = {clave: esquema[clave] for clave in claves_ordenadas}   
    json_sin_hashtags = eliminar_hashtags(json_ordenado)
    json_anidado=anidar_objetos_profundo(json_sin_hashtags)
    eliminar_claves_no_coincidentes(json_anidado, chapters_princ)
    json_esperado = json.dumps(json_anidado, indent=2)

    #Proceso para crear los segmentos y presupuesto global
    id_seg=create_segment()
    create_segment_code(id_seg)
    id_budget = post_global_budget()

    #Proceso para postear de manera recursiva el presupuesto
    post_recursively(json_anidado, id_budget, concepts)



def findConcept(nConcept):
    try:
        for concept in concepts:
            if concept.code == nConcept:
                return concept
        return None
    except AttributeError:
        return None

#Funcion para ordenar el JSON en orden alfanumerico
def ordenar_claves(clave):
    letras = ''.join(filter(str.isalpha, clave))
    numeros = ''.join(filter(str.isdigit, clave))
    return (letras, int(numeros)) if numeros else (letras, 0)

def eliminar_hashtags(json_data):
    if isinstance(json_data, dict):
        for key, value in list(json_data.items()):
            new_key = key.replace("#", "").replace('\\', '')
            json_data[new_key] = eliminar_hashtags(json_data.pop(key))
            json_data[new_key] = eliminar_hashtags(json_data[new_key])
    elif isinstance(json_data, list):
        for i in range(len(json_data)):
            json_data[i] = eliminar_hashtags(json_data[i])
    elif isinstance(json_data, str):
        json_data = json_data.replace("#", "").replace('\\', '')
    return json_data

#Funcion para anidar los padres con los hijos
def anidar_objetos_profundo(objeto):
    if isinstance(objeto, dict):
        for clave, valor in list(objeto.items()):
            if isinstance(valor, dict):
                objeto[clave] = anidar_objetos_profundo(valor)
            if clave in objeto and isinstance(objeto[clave], dict):
                for subclave in objeto[clave]:
                    if subclave in objeto:
                        objeto[clave][subclave] = anidar_objetos_profundo(objeto[subclave])
    return objeto


# Función para eliminar claves no coincidentes
def eliminar_claves_no_coincidentes(json_obj, lista_cadenas):
    for clave in list(json_obj.keys()):  # Usamos list() para evitar RuntimeError al modificar el diccionario durante la iteración
        if clave not in lista_cadenas:
            del json_obj[clave]

def create_segment():
  global token, name_budget
  url = "https://developer.api.autodesk.com/cost/v1/containers/{}/templates/{}/segments".format(id_project, id_template)
  headers = {
      'Content-Type': "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer {}".format(token)
      }
  data = {
        "code": name_budget[0],
        "name": name_budget[0],
        "type": "code",
        "delimiter": "none",
        "length" : len(name_budget[0])
        }

  try:
    response = requests.post(url, data=json.dumps(data), headers=headers)
    response.raise_for_status()
    response_data = response.json()
    return response_data['id']

  except requests.exceptions.RequestException as e:
      print(f"\nError creando el segmento:\n{response.text}")    


def create_segment_code(segment_id):
  global token, name_budget
  url = "https://developer.api.autodesk.com/cost/v1/containers/{}/segments/{}/values".format(id_project,segment_id)

  headers = {
      'Content-Type': "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer {}".format(token)
      }
  data = {
    "id":segment_id,
    "code":name_budget[0],
    "description": name_budget[0]
    }

  try:
    response = requests.post(url, data=json.dumps(data), headers=headers)
    response.raise_for_status()
    print(f"\nCodigo creado correctamente en segmento:\n{response.text}")
    response_data = response.json()
    return response_data['id']

  except requests.exceptions.RequestException as e:
      print(f"\nError creando el codigo en el segmento:\n{response.text}")


def post_global_budget():
  global token, name_budget
  url = "https://developer.api.autodesk.com/cost/v1/containers/{}/budgets".format(id_project)

  headers = {
      'Content-Type': "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer {}".format(token)
      }

  data = {
        "code":name_budget[0],
        "name":name_budget[0],
        "description": name_budget[0]
    }

  try:
      response = requests.post(url, data=json.dumps(data), headers=headers)
      response.raise_for_status()
      print(f"\nPresupuesto global subido correctamente")
      response_data = response.json()
      return response_data['id']

  except requests.exceptions.RequestException as e:
      print(f"\nError creando el presupuesto global {name_budget[0]}:\n{response.text}")


def postConceptBudget(concept, parent_id):
  #Esta comprobacion es para no postear mediciones demasiado complejas, es decir, las composiciones de las descomposiciones que aparte, no tienen medicion y no se pueden postear en el  presupuesto por que descuadra todo
  if concept.medition != '-' :
    global token
    url = "https://developer.api.autodesk.com/cost/v1/containers/{}/budgets".format(id_project)

    headers = {
        'Content-Type': "application/json",
        "Accept": "application/json",
        'Authorization': "Bearer {}".format(token)
        }

    data = {
          "code": concept.code,
          "name": concept.description,
          "description": concept.description,
          "parentId":parent_id,
          "unit": concept.unit,
          "unitPrice":concept.unit_price,
          "quantity" : concept.medition
      }

    try:
        response = requests.post(url, data=json.dumps(data), headers=headers)
        response.raise_for_status()
        response_data = response.json()
        return response_data['id']

    except requests.exceptions.RequestException as e:
        print(f"\tError creando el concepto {concept.code}:\n{response.text}")

def postChapterBudget(concept, parent_id):
  global token
  url = "https://developer.api.autodesk.com/cost/v1/containers/{}/budgets".format(id_project)
  headers = {
      'Content-Type': "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer {}".format(token)
      }

  data = {
        "code": concept.code,
        "name": concept.description,
        "description": concept.description,
        "parentId":parent_id,
        "unitPrice":concept.tot_price,
        "unit": concept.unit,
        "actualUnitPrice": concept.tot_price,
        "actualCost": concept.tot_price
    }
  try:
      response = requests.post(url, data=json.dumps(data), headers=headers)
      response.raise_for_status()
      print(f"\nCapitulo {concept.code} subido correctamente")
      response_data = response.json()
      return response_data['id']

  except requests.exceptions.RequestException as e:
      print(f"\nError creando el capitulo {concept.code}:\n{response.text}")


def post_recursively(data, parent_id, concepts):
    for key in data:
        concepto = next((obj for obj in concepts if obj.code == key), None)
        if concepto is not None:
          if concepto.isChapter is True:
            new_parent_id = postChapterBudget(concepto, parent_id)
          if concepto.isChapter is False:
            new_parent_id = postConceptBudget(concepto, parent_id)
          if isinstance(data[key], dict):
              post_recursively(data[key], new_parent_id, concepts)


if __name__ == "__main__":
    main()

