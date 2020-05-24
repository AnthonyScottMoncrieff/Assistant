export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const stripHTMLTags = (input) => {
    return input === null ? input : input.replace(/<[^>]{1,6}>/g, "");
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
    }, {});
    var returnValue = [...reduction["groupings"]];
    reduction["groupings"] = null;
    return returnValue;
}

export const toBritishDate = (dateInput) => {
    let date = new Date(dateInput);
    return `${(date.getDate()).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

export const isDateInFuture = (dateInput) => {
    let parsedDate = new Date(dateInput);
    let currentDateTime = new Date();
    let currentDateOnly = new Date(`${currentDateTime.getUTCFullYear()}-${currentDateTime.getMonth() + 1}-${currentDateTime.getDate()}`);
    return currentDateOnly <= parsedDate;
}