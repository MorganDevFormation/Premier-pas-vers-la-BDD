import api from '../api.js';

export const getLists = async () => {

    const lists = await api('/lists', 'GET')

    return lists
};

export const createList = async (list) => {

    const result = await api('/lists', 'POST', list)

    return result
};

export const updateList = async (list) => {

    const result = await api(`/lists/${list.id}`, 'PATCH',
    {
        title: list.title,
        position: list.position
    })

    return result
};

export const deleteList = async (listId) => {

    const result = await api(`/lists/${listId}`, 'DELETE')

    return result
};
