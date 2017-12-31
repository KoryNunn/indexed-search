function search(sortedItems, searchIndex, comparitor){
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

        if(comparitor(sortedItems[index], searchIndex) >= 0){
            upper = index;
        }

        if(comparitor(sortedItems[index], searchIndex) <= 0){
            lower = index;
        }
    };

    return index;
}

module.exports = search;