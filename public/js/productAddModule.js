import { JSDOM } from 'jsdom';

export async function categoryAdd(){
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
    const { document } = dom.window;

    const divContent = document.createElement('div');

    const form = document.createElement('form')
    form.setAttribute('action','/product-add');
    form.setAttribute('method','POST');

    const title = document.createElement('h1');
    title.textContent='Agregar Producto';
    title.className = 'title';
    form.appendChild(title)

    const inputCategory = document.createElement('input');
    inputCategory.setAttribute('type','text');
    inputCategory.setAttribute('name','category');
    inputCategory.setAttribute('id','category');
    inputCategory.setAttribute('placeholder','agrega la categoria');
    form.appendChild(inputCategory);

    const inputPrice = document.createElement('input');
    inputPrice.setAttribute('type','number');
    inputPrice.setAttribute('name','price');
    inputPrice.setAttribute('id','price');
    inputPrice.setAttribute('placeholder','agrega el precio');
    form.appendChild(inputPrice);

    const inputColor = document.createElement('input');
    inputColor.setAttribute('type','text');
    inputColor.setAttribute('name','color');
    inputColor.setAttribute('id','color');
    inputColor.setAttribute('placeholder','agrega el/los colores Ej:Rojo,Blanco,Azul');
    form.appendChild(inputColor);

    const inputSize = document.createElement('input');
    inputSize.setAttribute('type','text');
    inputSize.setAttribute('name','size');
    inputSize.setAttribute('id','size');
    inputSize.setAttribute('placeholder','agrega la/las tallas: Ej: S,M,L');
    form.appendChild(inputSize);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type','submit');
    submitButton.textContent= 'Enviar';
    form.appendChild(submitButton);
    
    document.body.appendChild(form)


    return document.body.innerHTML;

}