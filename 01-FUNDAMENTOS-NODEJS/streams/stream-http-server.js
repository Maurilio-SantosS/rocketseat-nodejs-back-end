import http from 'node:http'
import { Transform } from 'node:stream'


class InverseNumberSteam extends Transform {
    _transform() {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)
        
        callback(null, Buffer.from(String(transformed)))
    }
}

// req => readable stream
// res => writable stream

const server = http.createServer(async (req, res) => {
    // ESCREVE OS DADOS DEPOIS QUE ELE É LIDO POR INTEIRO
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // LENDO E ESCREVENDO OS DADOS EM PEDAÇOS
    // return req
    // .pipe(new InverseNumberSteam())
    // .pipe(res)
})

server.listen(3334)