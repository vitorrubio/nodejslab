import * as http from 'http';
import * as url from 'url';

import { Sequelize, DataTypes } from 'sequelize';
//import SQLite from 'sqlite3';


//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize('sqlite:./nosso_bancao.sqlite');
// const sequelize = new Sequelize('burnoutados', 'sa', 'cAs2ptUjbEyCP%m^GKe9', {
//     host: '192.168.0.67',
//     dialect: 'mssql'
// });



export const User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    salary: DataTypes.DOUBLE,
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});



export function updateDb()
{
    console.log("Database Sync");
    sequelize.sync({ alter: true });
    console.log("Database Sync Finished");
}


export default function user(req, res)
{

    updateDb();

    let fname = 'user';

    this.get = () => {
        console.log(`executou ${fname} metodo ${req.method} - ${arguments}`)  
        let parsedUrl = url.parse(req.url, true);
        let queryObject = parsedUrl.query;

        if (queryObject.id == null) {

            let prom = User.findAll();

            prom.then(result => {

                res.end(JSON.stringify(result));

            }).catch(err => {
                res.statusCode = 500;
                console.log(err);
                res.end(JSON.stringify(err));
            });

        }
        else {


            let prom = User.findByPk(queryObject.id);
            prom.then(result => {


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

    this.post = () => {
        console.log(`executou ${fname} metodo ${req.method} - ${arguments}`)  
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {


            let usr = JSON.parse(body);
            let prom = User.create(usr);
            prom.then(x => {
                res.statusCode = 201;

                res.end(JSON.stringify(x));
            }).catch(err => {
                res.statusCode = 500;
                console.log(err);
                res.end(JSON.stringify(err));
            });
        });
    }

    this.put = () => {
        console.log(`executou ${fname} metodo ${req.method} - ${arguments}`)  
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


            let usrAlterado = JSON.parse(body);


            User.findByPk(queryObject.id)
                .then(usr => {


                    if (usr == null) {
                        res.statusCode = 404;
                        res.end("naum fode meu");
                        return
                    }

                    usr.username = usrAlterado.username;
                    usr.birthday = usrAlterado.birthday;

                    usr.save()
                        .then(result => {

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

    this.delete = () => {
        console.log(`executou ${fname} metodo ${req.method} - ${arguments}`)
        let parsedUrl = url.parse(req.url, true);
        let queryObject = parsedUrl.query;

        if (queryObject.id == null) {

            res.statusCode = 400;
            res.end('DELETAR O QUÊ?');
        }
        else {


            User.findByPk(queryObject.id)
                .then(usr => {



                    if (usr == null) {
                        res.statusCode = 404;
                        res.end("não encontrado");
                        return
                    }


                    User.destroy({ where: { id: queryObject.id } }).then(result => {

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
}

