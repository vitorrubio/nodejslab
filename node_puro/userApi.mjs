import * as http from 'http';
import * as url from 'url';
import { Sequelize, DataTypes } from 'sequelize';
//import SQLite from 'sqlite3';


//const sequelize = new Sequelize('sqlite::memory:');
//const sequelize = new Sequelize('sqlite:./nosso_bancao.sqlite');
const sequelize = new Sequelize('nosso_bancao', 'zumble', 'gimble', {
    host: 'localhost',
    dialect: 'mssql'
});


const User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});

let sync = sequelize.sync();
// sync.then(x => {})
// .catch(err)

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
        
        let modfunc = x.default;
        console.log(modfunc);
        let obj = new modfunc(req);
        console.log(obj);

        //user/10 === user/{id}
        //prod/10/100 === prod/{cat}/{pag}

        obj[req.method.toLowerCase()]();

        res.end();
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