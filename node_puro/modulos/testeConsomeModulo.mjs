//import testeModulo from './testeModulo.mjs';
//import outroModulo from './outroModulo.mjs';

function ChamaModulo(modulo, nome)
{

    let prom = import(`./${modulo}.mjs`);
    prom.then(x => {
        const { default: fnDefault } = x;
        fnDefault(nome);
    })
}


async function ChamaModuloAsync(modulo, nome) {

    const { default: fnDefault } = await import(`./${modulo}.mjs`);
    fnDefault(nome);
}


//ChamaModulo('testeModulo', 'jose');
//await ChamaModuloAsync('outroModulo', 'maria');

console.log(process.argv);

const myArgs = process.argv.slice(2);

console.log(myArgs);

await ChamaModuloAsync(myArgs[0], myArgs[1]);