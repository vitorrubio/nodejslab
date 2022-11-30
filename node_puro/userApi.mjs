import * as http from 'http';
import * as url from 'url';
import { Sequelize, DataTypes } from 'sequelize';
//import SQLite from 'sqlite3';


//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize('sqlite:./nosso_bancao.sqlite');

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
    
    if (req.method == "GET")
    {
        let parsedUrl = url.parse(req.url, true);
        let queryObject = parsedUrl.query;

        if (queryObject.id == null)
        {
            console.log("sem id");
            let prom = User.findAll();
            prom.then(result => {

                res.end(JSON.stringify(result));
            }).catch(err => 
                {
                res.statusCode = 500;
                console.log(err);
                res.end(JSON.stringify(err));
                });

        }
        else
        {

            console.log("com id");
            let prom = User.findByPk(queryObject.id);
            prom.then(result => {
                console.log(result);

                if (result == null) {
                    res.statusCode = 404;
                    res.end("naum fode meu");
                    return
                }


                res.end(JSON.stringify(result));
            }).catch(err => {
                res.statusCode = 500;
                console.log(err);
                res.end(JSON.stringify(err));
            });
        }
    } 

    else if (req.method == "DELETE") {
        let parsedUrl = url.parse(req.url, true);
        let queryObject = parsedUrl.query;

        if (queryObject.id == null) {

            res.statusCode = 400;
            res.end('DELETAR O QUÊ, meu patrão?'); 
        }
        else {


            console.log("com id");

            User.findByPk(queryObject.id)
                .then(usr => {

                    console.log(usr);

                    if (usr == null) {
                        res.statusCode = 404;
                        res.end("naum fode meu");
                        return
                    }


                    User.destroy({ where: { id: queryObject.id } }).then(result => {
                        console.log(result);
                        res.statusCode = 204;
                        res.end("");
                    }).catch(err => {
                        res.statusCode = 500;
                        console.log(err);
                        res.end(JSON.stringify(err));
                    });

                }).catch(err => {
                    res.statusCode = 500;
                    console.log(err);
                    res.end(JSON.stringify(err));
                    return
                });

        }
    } 
    else if (req.method == "POST")
    {

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log(body);
            
            let usr = JSON.parse(body);
            let prom =   User.create(usr);
            prom.then(x => 
                {
                    res.statusCode = 201;
                    console.log(x); 
                    res.end(JSON.stringify(x));
            }).catch(err => 
                {
                    res.statusCode = 500;
                    console.log(err);
                    res.end(JSON.stringify(err)); 
                });
        });
    }
    else if (req.method == "PUT") {

        let parsedUrl = url.parse(req.url, true);
        let queryObject = parsedUrl.query;

        if (queryObject.id == null) {

            res.statusCode = 400;
            res.end('DELETAR O QUÊ, meu patrão?');
            return
        }

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log(body);

            let usrAlterado = JSON.parse(body);


            User.findByPk(queryObject.id)
                .then(usr => {

                    console.log(usr);
                    if (usr == null) {
                        res.statusCode = 404;
                        res.end("naum fode meu");
                        return
                    }


                    
                    
                    usr.username = usrAlterado.username;
                    usr.birthday = usrAlterado.birthday;

                    usr.save()
                    .then(result => 
                        {
                            console.log(result);
                            res.end(JSON.stringify(result));
                        })
                    .catch(err => {
                        res.statusCode = 500;
                        console.log(err);
                        res.end(JSON.stringify(err));
                        return
                    });


                }).catch(err => {
                    res.statusCode = 500;
                    console.log(err);
                    res.end(JSON.stringify(err));
                    return
                });
            
        });
    }    
    else 
    {
        res.statusCode = 400;
        res.end('bad request, meu patrão'); 
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