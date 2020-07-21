import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = (newPhone) => {
	const request = axios.post(baseUrl, newPhone);
	return request.then((response) => response.data);
};

const update = (id, newPhone) => {
	const request = axios.put(`${baseUrl}/${id}`, newPhone);
	return request.then((response) => response.data);
};

const deletePhone = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

export default { getAll, create, update, deletePhone };
