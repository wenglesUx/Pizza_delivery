// Número de clones desejados
const numClones = 4 ; // Altere este número para a quantidade desejada

// Array para armazenar os clones
const pizzaClones = [];
const pratoclone = [];


pizzaJson.forEach((item, index) => {
    if (index < numClones) {
        // Clone o modelo de pizza
        let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
      
        


        // Configure o atributo data-key
        pizzaItem.setAttribute('data-key', index);
       

        // Configure a imagem da pizza
        pizzaItem.querySelector('.pizza-item--img img').src = item.img;
        pizzaItem.querySelector('.pizza-item--price').style.display = 'none'
        pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

        // Adicione o clone ao array
        pizzaClones.push(pizzaItem);
       
    }
    
});
pratosJson.forEach((item, index) => {
    if (index < numClones) {
        let pratoItem = document.querySelector('.models .pizza-item').cloneNode(true);
        pratoItem.setAttribute('data-key', index);
        pratoItem.querySelector('.pizza-item--img img').src = item.img;
        pratoItem.querySelector('.pizza-item--price').style.display = 'none'
        pratoItem.querySelector('.pizza-item--name').innerHTML = item.name
        pratoItem.querySelector('.pizza-item--desc').innerHTML = item.description
        pratoclone.push(pratoItem)
    }
    
});


// Adicione os clones à área de pizza

const pizzaArea = document.querySelector('.area');
pizzaClones.forEach(pizzaItem => {
    pizzaArea.appendChild(pizzaItem);

    
});


const pratoArea = document.querySelector('.area2');
pratoclone.forEach(pratoItem => {
    pratoArea.appendChild(pratoItem);
    
});






// Agora você tem os clones disponíveis no array pizzaClones para usar em outros lugares
