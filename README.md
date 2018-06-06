# indexed-search

Find the index of a value in a sorted array heka fast

This can find an item in an 10M length array in less than 1 millisecond on a modern laptop.

## Usage

indexedSearch(sortedArray, valueToFind[, comparitorFunction (optional), findLowestOrHighest (optional)]);

```javascript

var dataSet = [];

// Produce a set of data between -1 and 1
for(var i = 0; i < 1000000; i++){
    dataSet.push(Math.sin(i));
}

// Ensure the set is sorted
dataSet.sort((a, b) => a - b);

indexedSearch(dataSet, 0); // -> 499999

```

With a custom comparitor function:

```javascript

var dataSet = [];

// Produce a sorted set of strings
for(var i = 0; i < 1000000; i++){
    dataSet.push(i.toString(32));
}

var randomIndex = Math.ceil(Math.random() * dataSet.length) - 1;

indexedSearch(dataSet, 0, (a, b) => a < b ? -1 : 1); // -> randomIndex

```

Force finding higest or lowest index of a value:
`-1` for lowest, `1` for highest

```javascript

var dataSet = [1, 2, 2, 2, 2, 2, 3];

indexedSearch(dataSet, 2); // -> index of the first item found (unspecified between 1 and 5)

indexedSearch(dataSet, 2, -1); // -> 1

indexedSearch(dataSet, 2, 1); // -> 5

```