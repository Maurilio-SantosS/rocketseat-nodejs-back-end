import http from 'node:http'

// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//    - Métodos HTTP
//    - URL

// GET, POST, PUT PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no back-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless

// Cabeçalhos (Requisição/resposta) => Metadados

// HTTP Status Code

const users = []

const server = http.createServer((req, res) => {
    const {method, url} = req

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString)
    } catch {
        req.body = null
    }

    if(method == 'GET' && url == '/users') {
        return res
            .setHeaders('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if(method == 'POST' && url == '/users') {
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email,
        })
        return res.writeHead(201).end('Criação de usuário')
    }

    return res.writeHead(404).end()
})

server.listen(3333)

// const a = 6
// const b = 2

// console.log(a + b)