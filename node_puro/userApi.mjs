import * as http from 'http';
import * as url from 'url';


const hostname = '127.0.0.1';
const port = 8090;

const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    let parsedUrl = url.parse(req.url, true);
    let queryObject = parsedUrl.query;

    let vetor = parsedUrl.pathname.split('/');
    console.log(vetor);
    if ((vetor.length < 2) || (vetor[1] == '') || (vetor[1] == null) )
    {
        res.statusCode = 404;
        res.end("Não encontrado");
        return;
    }

    let modulo = vetor[1];
    import(`./${modulo}.mjs`).then(function(x)
    {
        console.log(x);
        
        try{
            let modfunc = x.default;
            console.log(modfunc);
            let obj = new modfunc(req, res);
            console.log(obj);

            let fn = obj[req.method.toLowerCase()];
            if (!fn) {
                res.statusCode = 400;
                res.end('bad request, meu patrão');
            }
            obj[req.method.toLowerCase()]();
        }
        catch(err)
        {
            res.statusCode = 500;
            res.end(err);
        }

    });
     

});

export default function serverInit()
{
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

    console.log("hello world");
}

serverInit();