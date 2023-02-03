import * as http from 'http';
import * as url from 'url';


const hostname = '127.0.0.1';
const port = 8090;

const server = http.createServer( (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");


    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    let parsedUrl = url.parse(req.url, true);
    let queryObject = parsedUrl.query;

    let vetor = parsedUrl.pathname.split('/');

    if ((vetor.length < 2) || (vetor[1] == '') || (vetor[1] == null) )
    {

        res.statusCode = 404;
        res.end("Não encontrado");
        return;
    }
    try {
        if (req.method.toUpperCase() === "OPTIONS")
        {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "*");
            res.setHeader("Access-Control-Allow-Headers", "*");

            res.statusCode = 200;
            res.end();
            return
        }
        let modulo = vetor[1];
        import(`./${modulo}.mjs`).then(function(x)
        {
                let modfunc = x.default;
                let obj = new modfunc(req, res);
                let fn = obj[req.method.toLowerCase()];
                if (!fn) {
                    res.statusCode = 400;
                    res.end('bad request');
                }
                obj[req.method.toLowerCase()]();


        });
    }
    catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end(err );
    }

});

export default function serverInit()
{
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

    console.log("hello world");
}

serverInit();