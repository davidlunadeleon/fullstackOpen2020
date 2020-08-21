import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
	const req = await axios.get(baseUrl);
	return req.data;
};

const getUser = async (id) => {
	const req = await axios.get(`${baseUrl}/${id}`);
	return req.data;
};

export default { getAll, getUser };
