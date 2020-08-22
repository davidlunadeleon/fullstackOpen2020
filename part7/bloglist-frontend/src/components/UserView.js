import React from 'react';

import Blogs from './Blogs';

const UserView = ({ user }) => {
	const makeList = () => {
		if (user.blogs.length >= 1) {
			return <Blogs blogs={user.blogs} />;
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
