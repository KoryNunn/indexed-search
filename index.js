function search(sortedItems, searchIndex, comparitor, findLowestOrHighest){
    if(!comparitor && isNaN(searchIndex)){
        throw new Error('Invalid searchIndex: NaN')
    }

    if(typeof comparitor !== 'function'){
        findLowestOrHighest = comparitor;
        comparitor = null;
    }
    if(!comparitor){
        comparitor = (a, b) => a - b;
    }
    var upper = sortedItems.length;
    var lower = 0;
    var index;

    while(upper !== lower){

        index = Math.floor((upper + lower) / 2);

        if(index === lower){
            if(comparitor(sortedItems[index], searchIndex) < 0){
                index++;
            }
            break;
        }

        var comparison = comparitor(sortedItems[index], searchIndex);
        if((findLowestOrHighest && findLowestOrHighest > 0) ? comparison > 0 : comparison >= 0){
            upper = index;
        }

        if((findLowestOrHighest && findLowestOrHighest < 0) ? comparison < 0 : comparison <= 0){
            lower = index;
        }
    };

    return index;
}

module.exports = search;