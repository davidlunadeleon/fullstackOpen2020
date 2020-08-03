import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Blog from './Blog';

const blog = {
	id: '5f25c3ef7bdded8586888e4c',
	title: 'The stacking context',
	author: 'Mozilla',
	url:
		'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context',
	likes: 0,
	user: {
		id: '5f20a5325fc1cf891718666f',
		username: 'davidLuna',
		name: 'David Luna'
	}
};

describe('<Blog />', () => {
	test('Initial render show title and author only', () => {
		const mockHandlerLikes = jest.fn();
		const mockHandlerDelete = jest.fn();
		const component = render(
			<Blog
				blog={blog}
				username={blog.user.username}
				handleDelete={mockHandlerDelete}
				handleLikes={mockHandlerLikes}
			/>
		);
		expect(component.container).toHaveTextContent(
			`${blog.title} by ${blog.author}`
		);

		expect(component.container).not.toHaveTextContent(`${blog.url}`);
		expect(component.container).not.toHaveTextContent(`${blog.likes}`);
	});
});
