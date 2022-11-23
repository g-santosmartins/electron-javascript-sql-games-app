let { PythonShell } = require("python-shell")
let path = require("path")

// Defing what action I would take
function handleDefineAction() {
  let inputType = document.getElementById("input-type").value
  alert(inputType)
  if (inputType == "1") { createItemResourse() }
  if (inputType == "2") { listItemResource() }
  if (inputType == "3") { updateItemResourse() }
  if (inputType == "4") { deleteItemResourse() }
  return false
}

function handleGetInputValue() {
  let inputType = document.getElementById("input-type").value
  let inputName = document.getElementById("input-name").value
  let inputCategory = document.getElementById("input-category").value
  let inputDescription = document.getElementById("input-description").value
  let inputQuantity = document.getElementById("input-quantity").value
  let inputProducer = document.getElementById("input-maker").value
  let inputPrice = document.getElementById("input-price").value
  let inputImageUrl = document.getElementById("input-image-url").value
  return  [
    inputType,
    inputName,
    inputCategory,
    inputDescription,
    inputQuantity,
    inputProducer,
    inputPrice,
    inputImageUrl
  ]

}

function createItemResourse() {

  const inputArrayResult = handleGetInputValue()

  let options = {
    scriptPath: path.join(__dirname, './_engine/resources/'),
    args: inputArrayResult
  }
  try {
    new PythonShell('ProdutoController.py', options, function (err, results) {
      if(err) alert("Erro ao tentar criar item, tente novamente")
      alert('Item criado com sucesso!')
    });

  }catch(err) {
    console.log(err)
  }
  
}

function updateItemResourse() {

  const inputArrayResult = handleGetInputValue()

  let options = {
    scriptPath: path.join(__dirname, '../_engine/resources/'),
    args: inputArrayResult
  }

  let pythonScriptRunner = new PythonShell('ProdutoController.py', options);
  alert('Entrando na parte de atualização de item ')

  pythonScriptRunner.on('message', function (message) {
    swal('Consegui ler o script');
  })
}


function deleteItemResourse() {


  const inputArrayResult = handleGetInputValue()

  let options = {
    scriptPath: path.join(__dirname, '../_engine/resources/'),
    args: inputArrayResult
  }

  let pythonScriptRunner = new PythonShell('ProdutoController.py', options);
  alert('Entrando na parte de delecao de item ')


  pythonScriptRunner.on('message', function (message) {
    swal('Consegui ler o script');
  })
}

// Getting item
function listItemResource() {

 
  const inputArrayResult = handleGetInputValue()

  let options = {
    scriptPath: path.join(__dirname, '../_engine/resources/'),
    args: inputArrayResult
  }

  let pythonScriptRunner = new PythonShell('ProdutoController.py', options);
  alert('Entrando na parte de listagem de item ')


  pythonScriptRunner.on('message', function (message) {
  })
}

function cleanAllDataFields() {
  // getting the UI information
  try {
    document.getElementById("input-type").value = "1"
    document.getElementById("input-name").value = ""
    document.getElementById("input-category").value = "aventura"
    document.getElementById("input-description").value = ""
    document.getElementById("input-quantity").value = ""
    document.getElementById("input-maker").value = ""
    document.getElementById("input-price").value = ""
    document.getElementById("input-image-url").value = ""
    alert("Os campos foram limpos!")
  } catch (err) {
    console.log(err)
    alert("Não foi possível limpar campos, tente novamente")
  }
}