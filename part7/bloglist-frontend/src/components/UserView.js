import React from 'react';

const UserView = ({ user }) => {
	const makeList = () => {
		if (user.blogs.length >= 1) {
			return (
				<ul>
					{user.blogs.map((b) => (
						<li key={b.id}>{b.title}</li>
					))}
				</ul>
			);
		} else {
			return <p>This user does not have any posts yet.</p>;
		}
	};

	return (
		<div>
			<h3>{user.username}</h3>
			<p>Added blogs:</p>
			{makeList()}
		</div>
	);
};

export default UserView;
