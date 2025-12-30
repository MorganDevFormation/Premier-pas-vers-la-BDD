import api from '../api.js';

export const getCards = async (listId) => {

    const cards = await api(`/lists/${listId}/cards`, 'GET')

    return cards
};

export const createCard = async (card) => {

    const result = await api('/cards', 'POST', card)

    return result
};

export const updateCard = async (card) => {

    const result = await api(`/cards/${card.id}`, 'PATCH', 
    {
        content: card.content,
        position: card.position,
        color: card.color,
        list_id: card.list_id
    })

    return result
};

export const deleteCard = async (cardId) => {

    const result = await api(`/cards/${cardId}`, 'DELETE')

    return result
};
