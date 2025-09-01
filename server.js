import http from 'http';
import fs from 'fs/promises';
import { data } from './public/js/getJsonData.js'
import path from 'path';
import { fileURLToPath} from 'url';
import { category } from './public/js/productMenuModule.js'
import { categoryEdit } from './public/js/productEditModule.js';
import { categoryAdd } from './public/js/productAddModule.js';
import querystring from "querystring";


const server = http.createServer(async(req,res)=>{
    try{
        const {method,url} = req
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, "data", "data.json");
        const parsedURL =  new URL (url, `http://${req.headers.host}`)
        const pathname = parsedURL.pathname;
        const queryCategory = parsedURL.searchParams.get("category")

    
        if(pathname === "/"){
            
            const route = path.join(__dirname,'public','index.html')
            const html = await fs.readFile(route,'utf-8')
            res.writeHead(200,{'content-type':'text/html'})
            res.end(html)
        }else if (pathname ==='/products'){
            let jsonData = await data;
            if (queryCategory){
                jsonData = jsonData.filter(d => d.category === queryCategory)
            }

            const htmlContent = await category(jsonData)


            const fullPage = `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="css/productMenu.css"></link>
            <title>Productos</title>
            </head>
            <body>
            ${htmlContent}
            </body>
            </html>
            `;

            res.writeHead(200,{'content-type':'text/html'})
            res.end(fullPage)
        } else if (pathname === '/product-edit') {
            let jsonData = data;
            const htmlContent = await categoryEdit(jsonData)

            const fullPage = `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="css/productEditMenu.css"></link>
            <title>Productos</title>
            </head>
            <body>
            ${htmlContent}
            </body>
            </html>
            `;

            res.writeHead(200,{'content-type':'text/html'})
            res.end(fullPage)
            
        
        }else if (method === 'POST' && pathname === '/product-add'){
            let body = ''
            const MAX = 1e6;

            req.on('data',chunk=>{
                body+=chunk
                if(body.length > MAX){
                    req.socket.destroy();
                }
            })

            req.on('error', () =>{
                res.writeHead(400,{'Content-Type':'text/plain'})
                res.end('Error al leer la peticion')
            })

            req.on('end', async ()=>{
                let jsonDataGet = await fs.readFile(filePath,'utf-8')
                let jsonData = JSON.parse(jsonDataGet)
                const formData = querystring.parse(body)
                const lastID = jsonData[jsonData.length-1]
                const getLastID = lastID.id+1
                const colorArray = formData.color.split(",").map(v => v.trim())
                const sizeArray = formData.size.split(",").map(v => v.trim())
                
                const newData = {
                    id:getLastID,
                    category:formData.category,
                    products:[
                        {
                            price:formData.price,
                            color:colorArray,
                            size:sizeArray,
                        }
                    ]
                }

                jsonData.push(newData)

                await fs.writeFile(filePath,JSON.stringify(jsonData,null,2))
                res.writeHead(302,{location:"/products"})
                res.end()
            })
        } else if (method === 'GET' && pathname === '/product-add'){
            const htmlContent = await categoryAdd()

            const fullPage = `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="css/productEditMenu.css"></link>
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

