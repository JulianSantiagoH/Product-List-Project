import { JSDOM } from 'jsdom';

export async function categoryAdd(){
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
    const { document } = dom.window;

    

    return document.body.innerHTML;

}