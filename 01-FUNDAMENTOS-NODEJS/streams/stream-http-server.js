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

const server = http.createServer((req, res) => {
    return req
    .pipe(new InverseNumberSteam())
    .pipe(res)
})

server.listen(3334)