// função responsavel para receber todos os elementos que adicionarmos ao carrinho
let  cart = []
let pizzaItems = []
        // Variavel responsavel por dizer em qual pizza clicamos atraves do seu id, o seu valor sempre começara com 0
let modalKey = 0;
let modalQt = 1;
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el)





// 
const campoPesquisa = document.getElementById('barra-de-pesquisa');
const resultadosContainer = document.querySelector('.conteudo');

campoPesquisa.addEventListener('input', () => {
    const termoPesquisa = campoPesquisa.value.toLowerCase().trim();
if(termoPesquisa === ''){
    resultadosContainer.innerHTML = '';
    return
}
    // Limpar os resultados anteriores
    resultadosContainer.innerHTML = '';

    // Filtrar e exibir os itens que correspondem ao termo de pesquisa
    const resultados = pizzaJson.filter(item => item.name.toLowerCase().includes(termoPesquisa));
    let pizzaItem
    if (resultados.length > 0) {
        resultados.forEach(resultado => {
             pizzaItem = document.createElement('div');
            pizzaItem.classList.add('pizza-item');

            // Conteúdo da pizza
            
            const conteudo = `
               
                <img src="${resultado.img}" alt="${resultado.name}">
                <h3>${resultado.name}</h3>
                <p>${resultado.description}</p>
                <p class="price">R$ ${resultado.price.toFixed(2)}</p>
            `;
            
            pizzaItem.innerHTML = conteudo;
            resultadosContainer.appendChild(pizzaItem);
        });
    } else  {
       
        resultadosContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
       
        
    }
});





// pratosJson.map((item,index)=>{
//     let pratoItem = document.querySelector('.models .pizza-item').cloneNode(true);
    
//     pratoItem.setAttribute('data-key', index);
//     c('.pizza-area-2').append(pratoItem);
//     pratoItem.querySelector('.pizza-item--img img').src = item.img
//     pratoItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
//     pratoItem.querySelector('.pizza-item--name').innerHTML = item.name
//     pratoItem.querySelector('.pizza-item--desc').innerHTML = item.description
// })
pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    c('.pizza-area').append(pizzaItem);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault()
        console.log('voce cliccou na pizza',index)
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        // Variavel responsavel por dizer em qual pizza clicamos atraves do seu id
        modalKey = key;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        c('.pizzaInfo--actualPrice').innerHTML =`R$ ${pizzaJson[key].price.toFixed(2)}`
         c('.pizzaInfo--size.selected').classList.remove('selected')
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=> {
             if(sizeIndex == 2){
                 size.classList.add('selected')
             }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        });
        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = '0'
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = '1'
        },200)
        console.log('clicou na pizza')
    })
    
});
// EVENTOS DO MODAL
 function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none'
    }, 500)
 }
 cs('.pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal)
 })
 // Area de eventos de quantidade de produtos dentro do carrinho 
 c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt > 1){

    
        modalQt --;
        c('.pizzaInfo--qt').innerHTML = modalQt;
}
 })
 c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt ++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
 });

 // Area responsavel para ler e informar o tamanho da pizza que selecionamos

 cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })

 })
//  Botão responsvel por adicionar os elementos ao carrinho
 c('.pizzaInfo--addButton').addEventListener('click',()=>{
    console.log(modalKey)
// variavel responsavel de pegar o tamanho selecionado para a pizza
   let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=> item.identifier == identifier)

    if(key > -1){
        cart[key].qt += modalQt;
    } else{
// Adicionando items ao carrinho
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

console.log(cart)
updateCart()
closeModal();
 })
 c('.count-item').addEventListener('click',()=>{
    if(cart.length > 0){
        c('aside').style.left = '70%'
    } 
 
 });
 c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});
 function updateCart(){
    c('.count-item span').innerHTML = cart.length;

    if(cart.length >0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;
            console.log(pizzaItem);
            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                pizzaSizeName = 'P';
                break
                case 1:
                    pizzaSizeName = 'M';
                break
                case 2:
                    pizzaSizeName = 'G';
                break;
                    
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i,1);
                }
                updateCart();
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            })

            c('.cart').append(cartItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        c(' .subtotal span:last-child').innerHTML = `${subtotal.toFixed(2)}`;
        c(' .desconto span:last-child').innerHTML = `${desconto.toFixed(2)}`;
        c(' .total span:last-child').innerHTML = `${total.toFixed(2)}`;


    }else{
        c('aside').classList.remove('show');
    }
 }