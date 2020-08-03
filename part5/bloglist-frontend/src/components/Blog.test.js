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
	let component, mockHandlerDelete, mockHandlerLikes;

	beforeEach(() => {
		mockHandlerLikes = jest.fn();
		mockHandlerDelete = jest.fn();
		component = render(
			<Blog
				blog={blog}
				username={blog.user.username}
				handleDelete={mockHandlerDelete}
				handleLikes={mockHandlerLikes}
			/>
		);
	});

	test('Initial render show title and author only', () => {
		expect(component.container).toHaveTextContent(
			`${blog.title} by ${blog.author}`
		);

		expect(component.container).not.toHaveTextContent(`${blog.url}`);
		expect(component.container).not.toHaveTextContent(`${blog.likes}`);
	});

	test('Likes and url are shown after clicking on view button', () => {
		const button = component.container.querySelector('.view-button');
		fireEvent.click(button);

		expect(component.container).toHaveTextContent(`${blog.url}`);
		expect(component.container).toHaveTextContent(`${blog.likes}`);
	});

	test('Like events are triggered properly', () => {
		const viewButton = component.container.querySelector('.view-button');
		fireEvent.click(viewButton);

		const likeButton = component.container.querySelector('.like-button');
		fireEvent.click(likeButton);
		fireEvent.click(likeButton);
		expect(mockHandlerLikes.mock.calls).toHaveLength(2);
	});
});
