# paramGen - constructing url parameters from object with full recursion

urlParam.fromObj - returns encoded string


var urlParam = new UrlParameters();

var paramString = urlParam.fromObj({
    a: {b: 1, c: 2},
    d: [3, [9, ['test', {data: [99]}]], {e: 5}]
});

var simpleParamString = urlParam.fromObj({key: 'value'});
