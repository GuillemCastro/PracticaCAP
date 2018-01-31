function callcc(f) {
	var k = new Continuation();
	return f(k);
}

var cont;
function test(a) {
	cont = a;
	return 'First execution';
}

var newTest = callcc(test);
if (newTest === 'First execution') {
	cont(1);
} else if (newTest === 1) {
	print('El resultat es correcte.');
} else {
	print('El call/cc no funciona')
}
