# paramGen - constructing url parameters from object with full recursion

urlParam.fromObj - returns encoded string


var urlParam = new UrlParameters();

var paramString = urlParam.fromObj({
    a: {b: 1, c: 2},
    d: [3, [9, [test, {data: []}]], {e: 5}]
});
