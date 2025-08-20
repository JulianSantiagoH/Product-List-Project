import { JSDOM } from 'jsdom';

export async function category(data) {
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
    const { document } = dom.window;

    const divButtons = document.createElement('div');
    divButtons.className = 'divButtons';

    const buttonFilterAll = document.createElement('a');
    buttonFilterAll.className = 'buttonFilterAll';
    buttonFilterAll.textContent = 'All';
    buttonFilterAll.href = '/products';
    divButtons.appendChild(buttonFilterAll);

    const buttonFilterTshirt = document.createElement('a');
    buttonFilterTshirt.className='buttonFilterTshirt';
    buttonFilterTshirt.textContent='T-shirt';
    buttonFilterTshirt.href = '/products?category=t-shirt';
    divButtons.appendChild(buttonFilterTshirt);


    const buttonFilterJeans = document.createElement('a');
    buttonFilterJeans.className = 'buttonFilterJeans';
    buttonFilterJeans.textContent='Jeans';
    buttonFilterJeans.href = '/products?category=jeans';
    divButtons.appendChild(buttonFilterJeans);


    const buttonFilterhoodie = document.createElement('a');
    buttonFilterhoodie.className='buttonFilterhoodie';
    buttonFilterhoodie.textContent='Hoddie';
    buttonFilterhoodie.href = '/products?category=hoodie';
    divButtons.appendChild(buttonFilterhoodie);


    const buttonFilterShoes = document.createElement('a');
    buttonFilterShoes.className='buttonFilterShoes';
    buttonFilterShoes.textContent='Shoes';
    buttonFilterShoes.href = '/products?category=shoes';
    divButtons.appendChild(buttonFilterShoes);

    const buttonEditContainer = document.createElement('div');
    buttonEditContainer.className = 'buttonEditContainer';

    const buttonEdit = document.createElement('a');
    buttonEdit.className = 'buttonEdit'
    buttonEdit.href= '/product-edit';
    buttonEdit.textContent='Edit Content'

    buttonEditContainer.appendChild(buttonEdit);

    divButtons.appendChild(buttonEditContainer);

    document.body.appendChild(divButtons);


    


    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cardsContainer';

    data.forEach((item) => {
        
        const card = document.createElement('div');
        card.className = "card";

        const categoryTitle = document.createElement('h1');
        categoryTitle.textContent = item.category;
        card.appendChild(categoryTitle);

        item.products.forEach((product) => {
            const price = document.createElement('h3');
            price.textContent = `$${product.price}`;
            card.appendChild(price);


            const divColor = document.createElement('div');
            divColor.className = 'colorContainer';
            product.color.forEach(items => {
                const color = document.createElement('h4');
                color.textContent = items;
                divColor.appendChild(color);
            });
            card.appendChild(divColor);


            const divSize = document.createElement('div');
            divSize.className = 'sizeContainer';
            product.size.forEach(items => {
                const size = document.createElement('h4');
                size.textContent = items;
                divSize.appendChild(size);
            });
            card.appendChild(divSize);


            const buyButton = document.createElement('button');
            buyButton.textContent = 'Comprar';
            buyButton.className = 'buyButton';

            card.appendChild(buyButton);
        })

        cardsContainer.appendChild(card);
        
    })

    document.body.appendChild(cardsContainer);

    const buttonHome = document.createElement('a');
    buttonHome.className = 'buttonHome';
    buttonHome.textContent = 'Home';
    buttonHome.href = '/';
    document.body.appendChild(buttonHome);

    return document.body.innerHTML;
}
