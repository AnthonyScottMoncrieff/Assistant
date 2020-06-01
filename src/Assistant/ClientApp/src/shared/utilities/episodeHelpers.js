export const saveEpisodesToLocalstorage = (episodes, showKey) => {
    let savedEpisodes = JSON.parse(localStorage.getItem('episodes'));
    let dateNow = new Date();
    if(savedEpisodes === null)
        savedEpisodes = {};

    savedEpisodes[showKey] = { 
        date: `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`,
        episodes
    }
    localStorage.setItem('episodes', JSON.stringify(savedEpisodes));
}

export const getEpisodesFromLocalstorage = (showKey) => {
    let dateNow = new Date();
    let savedEpisodes = JSON.parse(localStorage.getItem('episodes'));
    if(!savedEpisodes || savedEpisodes === null)
        return null;

    let showEpisodes = savedEpisodes[showKey];
    if(!showEpisodes || showEpisodes === null)
        return null;
    
    let parsedDate = new Date(showEpisodes.date);
    return ((dateNow - parsedDate) < 86400000) ? showEpisodes.episodes : null;
}