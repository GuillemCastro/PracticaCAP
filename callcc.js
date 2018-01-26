function callcc(f) {
	var k = Continuation();
	return f(k);
}