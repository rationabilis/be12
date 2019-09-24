import CardList from '../cardlist/cardlist';


export const placesList = document.querySelector('.places-list');
export const newPlaceButton= document.querySelector('.user-info__button');
export const userButton= document.querySelector('.edit-button');
export const userNameHeader = document.querySelector('.user-info__name');
export const aboutUserParagraph = document.querySelector('.user-info__job');

export const cardList = new CardList(placesList, []);
