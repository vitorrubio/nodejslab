import readlineSync from 'readline-sync';

function prompt(question) {
	return readlineSync.question(question);
  }

export default function main() {


	console.log("Hello World again");

	const s1 = prompt("Entre com o raio do telhado");
	const r = parseFloat(s1);

	console.log(`A circunferência do telhado é ${r * 2 * Math.PI}`);

	const area = Math.PI * Math.pow(r, 2);
	console.log(`A área do telhado é ${area}`);

	let preco = 10;
	if (r > 10) {
		preco = 11;
	}

	console.log(`O preço do telhado é ${area * preco}`);
}

main();