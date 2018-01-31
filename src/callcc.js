function someFunction()  {
    var kont  = new  Continuation();
    print("captured: " + kont);
    return kont;
}

var k = someFunction();
if (k instanceof Continuation) {
    print("k is a continuation");
    k(200);
}
else {
    print("k is now a " + typeof(k));
}
print(k);