import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
	const users = useSelector((state) => state.userList);

	const populateUserTable = () => {
		return users.map((u) => (
			<tr key={u.id}>
				<td>{u.name}</td>
				<td>
					<Link to={`/user/${u.id}`}>{u.username}</Link>
				</td>
				<td>{u.blogs.length}</td>
			</tr>
		));
	};

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>{populateUserTable()}</tbody>
			</table>
		</div>
	);
};

export default Users;
