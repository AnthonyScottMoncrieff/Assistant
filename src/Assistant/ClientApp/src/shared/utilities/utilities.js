export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const stripHTMLTags = (input) => {
    return input.replace(/\<[^>]{1,6}\>/g, "");
}

export const groupByShallowProperty = (collection, property) => {
    let reduction = collection.reduce((accumulator, currentValue) => {
        if(!accumulator["groupings"]) accumulator["groupings"] = [];
        let grouping = accumulator.groupings.filter(x => x["key"] === currentValue[property])[0]; 
        if(grouping === undefined){
            let newGrouping = {key: currentValue[property], groupedCollection: []};
            accumulator.groupings.push(newGrouping);
            grouping = newGrouping;
        }
        grouping.groupedCollection.push(currentValue);
        return accumulator;
    });
    return reduction["groupings"];
}