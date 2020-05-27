import axios from 'axios';

const ListRestService = {
    
  getLists: async function() {
    return await axios.get('http://localhost:4100/list');
  },

  saveList: async function(newList) {
    return await axios.post('http://localhost:4100/list', newList);
  },

  deleteList: async function(listId) {
    return await axios.delete('http://localhost:4100/list/' + listId);
  },

  updateList: async function(listId) {
    return await axios.put('http://localhost:4100/list', listId);
  }
};

export default ListRestService;