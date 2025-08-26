import { JSDOM } from 'jsdom';

export async function categoryEdit (data){
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
    const { document } = dom.window;

    const table = document.createElement('table');
    table.className='table';

    const tHead = document.createElement('thead');
    tHead.className = 'tHead'

    const trHead = document.createElement('tr');
    trHead.className= 'trHead';

    const thIDTitle = document.createElement('th');
    thIDTitle.textContent = 'ID'
    thIDTitle.className = 'th';
    trHead.appendChild(thIDTitle);

    const thCategoryTitle = document.createElement('th');
    thCategoryTitle.textContent = 'Category'
    thCategoryTitle.className = 'th';
    trHead.appendChild(thCategoryTitle);

    const thPriceTitle = document.createElement('th');
    thPriceTitle.textContent = 'Price'
    thPriceTitle.className = 'th';
    trHead.appendChild(thPriceTitle);
    
    const thColorTitle = document.createElement('th');
    thColorTitle.textContent = 'Color'
    thColorTitle.className = 'th';
    trHead.appendChild(thColorTitle);

    const thSizeTitle = document.createElement('th');
    thSizeTitle.textContent = 'Size'
    thSizeTitle.className = 'th';
    trHead.appendChild(thSizeTitle);

    const thButtons = document.createElement('th')
    thButtons.textContent = 'Options'
    thButtons.className = 'th';
    trHead.appendChild(thButtons);

    tHead.appendChild(trHead)

    table.appendChild(tHead);


    const tBody = document.createElement('tbody');

    data.forEach(element => {
        const tr =  document.createElement('tr');
        tr.className = 'tr';
        const tdID = document.createElement('td');
        tdID.textContent = element.id;
        tdID.className = 'td';
        tr.appendChild(tdID)
        const tdCategory = document.createElement('td');
        tdCategory.textContent = element.category;
        tdCategory.className = 'td';
        tr.appendChild(tdCategory);
        
        element.products.forEach(item =>{
            const tdPrice = document.createElement('td');
            tdPrice.textContent = item.price;
            tdPrice.className = 'td';
            tr.appendChild(tdPrice);
            const tdColor = document.createElement('td');
            tdColor.textContent = item.color;
            tdColor.className = 'td';
            tr.appendChild(tdColor);
            const tdSize = document.createElement('td');
            tdSize.className = 'td';
            tdSize.textContent = item.size;
            tr.appendChild(tdSize);
        })

        const tdButtons = document.createElement('td');
        tdButtons.classList.add('td','tdButtons')
        const buttonModify = document.createElement('button');
        buttonModify.textContent = 'Modify';
        buttonModify.className='buttonModify';
        tdButtons.appendChild(buttonModify);

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Delete';
        buttonDelete.className= 'buttonDelete';
        tdButtons.appendChild(buttonDelete);

        tr.appendChild(tdButtons)


        tBody.appendChild(tr);
    }); 

    const buttonAppendContainer = document.createElement('div');
    buttonAppendContainer.className = 'buttonAppendContainer';

    const buttonHomeMenu = document.createElement('a');
    buttonHomeMenu.href= '/products'
    buttonHomeMenu.textContent='Return Menu'
    buttonHomeMenu.className = 'buttonHomeMenu';
    buttonAppendContainer.appendChild(buttonHomeMenu)


    const buttonAppend= document.createElement('a');
    buttonAppend.textContent='Add new product';
    buttonAppend.className = 'buttonAppend';
    buttonAppend.href = '/product-add'
    
    buttonAppendContainer.appendChild(buttonAppend);

    document.body.appendChild(buttonAppendContainer);

    table.appendChild(tBody);

    document.body.appendChild(table);

    return document.body.innerHTML;

}