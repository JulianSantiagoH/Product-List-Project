import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { category } from './public/js/writeJsonData.js'


const server = http.createServer(async(req,res)=>{
    try{
        const {method,url} = req
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
    
        if(url === '/' || url === '/index.html'){
            
            const route = path.join(__dirname,'public','index.html')
            const html = await fs.readFile(route,'utf-8')
            res.writeHead(200,{'content-type':'text/html'})
            res.end(html)
        }else if (url ==='/products'){
            const htmlContent = await category()

            const fullPage = `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Productos</title>
            </head>
            <body>
            ${htmlContent}
            </body>
            </html>
            `;

            res.writeHead(200,{'content-type':'text/html'})
            res.end(fullPage)
        }else if (url.endsWith('.css')){
            const route = path.join(__dirname,'public',url)
            const css = await fs.readFile(route,'utf-8')
            res.writeHead(200,{'content-type':'text/css'})
            res.end(css)
        } else{
            res.writeHead(404,{'content-type':'text/plain'})
            res.end('Error 404, pagina no encontrada')
        }
    }catch(error){
        res.writeHead(500,{'content-type':'text/plain'})
        res.end('Error al conectar con el servidor')
        console.error(error)
    }
})

const PORT = 3000

server.listen(3000,()=>{
    console.log(`The server is open in the port ${PORT}`)
})

