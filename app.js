const submitButton = document.querySelector('#app form button');
const zipCodeField = document.querySelector('#app form input');
const content = document.querySelector('#app main');

submitButton.addEventListener('click', run);

function run(event) {
  event.preventDefault();

  let zipCode = zipCodeField.value;
  zipCode = zipCode.replace(/[ |\.]/g, '');

  axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
  .then(function(response) {

    if(response.data.erro) {
      throw new Error('CEP Inválido');
    }

    content.innerHTML = '';
    createLine(response.data.logradouro);
    createLine(response.data.localidade + '/' + response.data.uf);
    createLine(response.data.bairro);
  })
  .catch(function(error) {
    content.innerHTML = '';
    createLine('Ops, algo deu errado!');
    console.log(error);
  });
  
  console.log(zipCode);
}

function createLine(textInfo) {
  let line = document.createElement('p');
  let text = document.createTextNode(textInfo);

  line.appendChild(text);
  content.appendChild(line);
}