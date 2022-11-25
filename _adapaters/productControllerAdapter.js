let { PythonShell } = require("python-shell")
let path = require("path")

function handleSearchItem(type) {
  let inputId = document.getElementById("input-search").value
  if (type == "2")  {
    createItemResource()
    return
  } else {
    if(inputId === ""){
      alert("Insira informação correta na barra de ID!")
      return
    }
      if (type == "1") { listItemResource("create") }
      if (type == "3")  { updateItemResource() }
      if (type == "4")  { deleteItemResource() }
  }
}


function handleValidateInputs (inputArrayResult)  {
  let validation = true
  let validationNumber = true

  inputArrayResult.map((item, index) => {
    if(index === 6 || index === 4) {
      const convertedItem = Number(item)
      if(!convertedItem) validationNumber = false
      // logica de validacao 
    }
    if(!validation) return
    if(item === "" || item === undefined) validation = false
    
  })
  
  if(!validation) {
    alert('Houve um erro, revise os campos e tente novamente!')
    return false
  }
  if(!validationNumber) {
    alert('Revise os campos de quantidade ou preço, devem ser números e tente novamente')
    return false
  }

  return true
}

function handleGetInputValue(type) {
  // let inputType         = document.getElementById("input-type").value
  let inputName         = document.getElementById("input-name").value
  let inputCategory     = document.getElementById("input-category").value
  let inputDescription  = document.getElementById("input-description").value
  let inputQuantity     = document.getElementById("input-quantity").value
  let inputProducer     = document.getElementById("input-maker").value
  let inputPrice        = document.getElementById("input-price").value
  let inputImageUrl     = document.getElementById("input-image-url").value

  return  [
    type,
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
  const inputArrayResult = handleGetInputValue(1)
  console.log(inputArrayResult)

  const validation  = handleValidateInputs(inputArrayResult)
  
  if(!validation) return 
  
  let options = {
    scriptPath: path.join(__dirname, './_engine/resources/'),
    args: inputArrayResult
  }


  const result = new PythonShell('ProdutoController.py', options,function (err, results) {
    // console.log()
  });
  console.log(result)
  
  alert("Cadastro realizado com sucesso")

  result.end()
 
}

function updateItemResource() {
  const idItem =  document.getElementById("input-search").value
  const inputArrayResult = handleGetInputValue("3")
  const fullArray = [...inputArrayResult, idItem]

  const validation = handleValidateInputs(inputArrayResult)

  if(!validation) return

  const parsedValidation = parseInt(idItem)
  // console.log(parsedValidation)
  if(!parsedValidation) {
    alert("Por favor digite um número, para realizar a deleção!")
    return
  }


  let options = {
    scriptPath: path.join(__dirname, './_engine/resources/'),
    args: fullArray
  }

  try {
    let result = new PythonShell('ProdutoController.py', options);

    result.on('message', (message) => {
    
      const resultParsed =   JSON.parse(message)
      console.log('resultado', resultParsed)
      if(resultParsed.error) {
        alert(resultParsed.message)
        return
      }
      alert(resultParsed.message)
      listItemResource("update")
     })
  }catch(err) {
    console.log(err)
  }

  result.end()
}


async function deleteItemResource() {

  // TODO refactor DRY principle
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
   result.end()
}

// Getting item
function listItemResource(type) {

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
      if(type === "create") {
        alert('Produto encontrado!')
      }
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

  result.end()
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