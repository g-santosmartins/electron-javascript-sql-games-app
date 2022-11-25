let { PythonShell } = require("python-shell")
let path = require("path")

// Defing what action I would take
function handleDefineAction() {
  let inputType = document.getElementById("input-type").value
  alert(inputType)
  if (inputType == "1")  { listItemResource() }
  if (inputType == "2")  { createItemResource() }
  if (inputType == "3")  { updateItemResource() }
  if (inputType == "4")  { deleteItemResource() }
  return false
}
function handleSearchItem(type) {
  let inputId = document.getElementById("input-search").value
  if(inputId === ""){
    alert("Insira informação correta na barra de ID!")
    return
  }
  if (type == "1")  { listItemResource() }
  if (type == "2")  { createItemResource() }
  if (type == "3")  { updateItemResource() }
  if (type == "4")  { deleteItemResource() }
}

function handleGetInputValue() {
  // let inputType         = document.getElementById("input-type").value
  let inputName         = document.getElementById("input-name").value
  let inputCategory     = document.getElementById("input-category").value
  let inputDescription  = document.getElementById("input-description").value
  let inputQuantity     = document.getElementById("input-quantity").value
  let inputProducer     = document.getElementById("input-maker").value
  let inputPrice        = document.getElementById("input-price").value
  let inputImageUrl     = document.getElementById("input-image-url").value

  return  [
    1,
    inputName,
    inputCategory,
    inputDescription,
    inputQuantity,
    inputProducer,
    inputPrice,
    inputImageUrl
  ]
}

function createItemResource() {
  const inputArrayResult = handleGetInputValue()
  console.log(inputArrayResult)

  let validation = true

  inputArrayResult.map((item, index) => {
    if(item === "" || item === undefined) validation = false
  })

  if(!validation) {
    alert('Houve um erro ao criar registro, revise os campos e tente novamente!')
    return
  }
  
  let options = {
    scriptPath: path.join(__dirname, './_engine/resources/'),
    args: inputArrayResult
  }


  const result = new PythonShell('ProdutoController.py', options,function (err, results) {
    // console.log()
  });
  console.log(result)
  
  alert("Cadastro realizado com sucesso")
 
}

function updateItemResource() {

  const inputArrayResult = handleGetInputValue()

  let options = {
    scriptPath: path.join(__dirname, './_engine/resources/'),
    args: inputArrayResult
  }

  let pythonScriptRunner = new PythonShell('ProdutoController.py', options);
  alert('Entrando na parte de atualização de item ')

  pythonScriptRunner.on('message', function (message) {
    swal('Consegui ler o script');
  })
}


async function deleteItemResource() {
  const idItem =  document.getElementById("input-search").value

  const parsedValidation = parseInt(idItem)
  // console.log(parsedValidation)
  if(!parsedValidation) {
    alert("Por favor digite um número, para realizar a deleção!")
    return
  }
  let options = {
    scriptPath: path.join(__dirname, './_engine/resources/'),
    args: [4,idItem]
  }

  let result = new PythonShell('ProdutoController.py', options);


   result.on('message', (message) => {
    
    const resultParsed =   JSON.parse(message)
    console.log('resultado', resultParsed)
    if(resultParsed.error) {
      alert(resultParsed.message)
      return
    }
    alert(resultParsed.message)
    cleanAllDataFields()
   })

}

// Getting item
function listItemResource() {

  const idItem =  document.getElementById("input-search").value

  const parsedValidation = parseInt(idItem)
  console.log(parsedValidation)
  if(!parsedValidation) {
    alert("Por favor digite um número, para realizar uma busca!")
    return
  }

  let options = {
    scriptPath: path.join(__dirname, './_engine/resources/'),
    args: [2, idItem]
  }  
  try {
    const result  = new PythonShell('ProdutoController.py', options, function (err, results) {
      // console.log()
    });

    // Retreving
    result.on('message', (message) => {

     const resultParsed =   JSON.parse(message)
     if(resultParsed.error) {
      alert(resultParsed.message)
      return
     }
     alert('Produto encontrado!')
      console.log('result', JSON.parse(message))
      document.getElementById("span-id").innerText        = resultParsed.id
      document.getElementById("input-name").value         = resultParsed.name
      document.getElementById("input-category").value     = resultParsed.category
      document.getElementById("input-description").value  = resultParsed.description
      document.getElementById("input-quantity").value     = resultParsed.quantity
      document.getElementById("input-maker").value        = resultParsed.producer
      document.getElementById("input-price").value        = resultParsed.price
      document.getElementById("input-image-url").value    = resultParsed.image_url
      document.getElementById("input-preview-tag").src    = resultParsed.image_url
    })

  }catch(err) {
    console.log(err)
  }
}

function cleanAllDataFields() {
  // getting the UI information
  try {
    // document.getElementById("input-type").value         = "1"
    document.getElementById("input-name").value         = ""
    document.getElementById("input-category").value     = "aventura"
    document.getElementById("input-description").value  = ""
    document.getElementById("input-quantity").value     = ""
    document.getElementById("input-maker").value        = ""
    document.getElementById("input-price").value        = ""
    document.getElementById("input-image-url").value    = ""
      document.getElementById("input-preview-tag").src  = "./_images/no-image.png"

    // alert("Os campos foram limpos!")
  } catch (err) {
    console.log(err)
    alert("Não foi possível limpar campos, tente novamente")
  }
}