import http from 'http'

const server = http.createServer((req,res)=>{
    res.end('Hello world')
})

const PORT = 3000

server.listen(3000,()=>{
    console.log(`The server is open in the port ${PORT}`)
})