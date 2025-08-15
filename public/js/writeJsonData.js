import { data } from './getJsonData.js'
import {JSDOM} from 'jsdom';

export async function category (){
    const productData = await data
    const dom = new JSDOM('<!DOCTYPE tml><html><head></head><body></body></html>')
    const { document } = dom.window;
    productData.forEach((item)=>{
        const card = document.createElement('div');
        card.className="card";

        const categoryTitle = document.createElement('h1');
        categoryTitle.textContent= item.category;
        card.appendChild(categoryTitle)

        item.products.forEach((product)=>{
            const price = document.createElement('h3');
            price.textContent=product.price;
            card.appendChild(price)


            const divColor = document.createElement('div')
            divColor.className = 'colorContainer'
            product.color.forEach(items => {
                const color = document.createElement('h4');
                color.textContent=items;
                divColor.appendChild(color)
            });
            card.appendChild(divColor)

            
            const divSize = document.createElement('div')
            divSize.className = 'sizeContainer'
            product.size.forEach(items => {
                const size = document.createElement('h4');
                size.textContent=items;
                divSize.appendChild(size)
            });
            card.appendChild(divSize)
        })
        

        document.body.appendChild(card);
    })

    const button = document.createElement('a');
    button.textContent='Back'
    button.href='/'
    document.body.appendChild(button);

    return document.body.innerHTML;
}

