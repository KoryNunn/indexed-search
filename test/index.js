var indexedSearch = require('../');
var test = require('tape');

var dataSet = [];

for(var i = 0; i < 1000000; i++){
    dataSet.push(Math.sin(i));
}

dataSet.sort((a, b) => a - b);

test('centre', function(t){
    t.plan(1);

    var centreIndex = Math.floor(dataSet.length / 2 - 1);

    var start = Date.now();
    var resultIndex = indexedSearch(dataSet, dataSet[centreIndex]);
    console.log('found in', Date.now() - start + 'ms');

    t.equal(resultIndex, centreIndex, 'found centre item');
});

test('first', function(t){
    t.plan(1);

    var start = Date.now();
    var resultIndex = indexedSearch(dataSet, -1);
    console.log('found in', Date.now() - start + 'ms');

    t.equal(resultIndex, 0, 'found first item');
});

test('last', function(t){
    t.plan(1);

    var start = Date.now();
    var resultIndex = indexedSearch(dataSet, 1);
    console.log('found in', Date.now() - start + 'ms');

    t.equal(resultIndex, dataSet.length, 'found last item');
});

test('random', function(t){
    t.plan(1);

    var randomIndex = Math.ceil(Math.random() * dataSet.length) - 1;

    var start = Date.now();
    var resultIndex = indexedSearch(dataSet, dataSet[randomIndex]);
    console.log('found in', Date.now() - start + 'ms');

    t.equal(resultIndex, randomIndex, 'found random item');
});

test('custom comparitor, random index', function(t){
    t.plan(1);

    var stringData = [];

    for(var i = 0; i < 1000000; i++){
        stringData.push(i.toString(32));
    }

    stringData.sort((a, b) => a < b ? -1 : 1);

    var randomIndex = Math.ceil(Math.random() * dataSet.length) - 1;

    var start = Date.now();
    var resultIndex = indexedSearch(stringData, stringData[randomIndex], (a, b) => a < b ? -1 : 1);
    console.log('found in', Date.now() - start + 'ms');

    t.equal(resultIndex, randomIndex, 'found random item');
});

test('custom comparitor, complex data, random index', function(t){
    t.plan(1);

    var complexData = [];

    for(var i = 0; i < 1000000; i++){
        complexData.push({
            foo: Math.random(),
            bar: 'bar',
            baz: true
        });
    }

    complexData.sort((a, b) => a.foo < b.foo ? -1 : 1);

    var randomIndex = Math.ceil(Math.random() * dataSet.length) - 1;

    var start = Date.now();
    var resultIndex = indexedSearch(complexData, complexData[randomIndex], (a, b) => a.foo < b.foo ? -1 : 1);
    console.log('found in', Date.now() - start + 'ms');

    t.equal(resultIndex, randomIndex, 'found random item');
});

var duplicates = [1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,4,4,4,5,5,5];

test('first duplicate', function(t){
    t.plan(1);

    var resultIndex = indexedSearch(duplicates, 2);

    t.equal(resultIndex, 12, 'found first duplicate item');
});

test('lowest duplicate', function(t){
    t.plan(1);

    var resultIndex = indexedSearch(duplicates, 2, -1);

    t.equal(resultIndex, 3, 'found lowest duplicate item');
});

test('higest duplicate', function(t){
    t.plan(1);

    var resultIndex = indexedSearch(duplicates, 2, 1);

    t.equal(resultIndex, 14, 'found highest duplicate item');
});