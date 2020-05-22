export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const stripHTMLTags = (input) => {
    return input.replace(/\<[^>]{1,4}\>/g, "");
}