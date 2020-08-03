import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AddBlogs from './AddBlogs';

const blog = {
	title: 'The stacking context',
	author: 'Mozilla',
	url:
		'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context'
};

describe('<AddBlogs />', () => {
	let createBlog, component;

	beforeEach(() => {
		createBlog = jest.fn();
		component = render(<AddBlogs handleCreateBlog={createBlog} />);
	});

	test('Create blog method is correctly called', () => {
		const author = component.container.querySelector('#inputAuthor');
		const title = component.container.querySelector('#inputTitle');
		const url = component.container.querySelector('#inputUrl');
		const form = component.container.querySelector('form');

		fireEvent.change(author, {
			target: { value: blog.author }
		});
		fireEvent.change(title, {
			target: { value: blog.title }
		});
		fireEvent.change(url, {
			target: { value: blog.url }
		});
		fireEvent.submit(form);
		expect(createBlog.mock.calls).toHaveLength(1);
		expect(createBlog.mock.calls[0][0]).toEqual(blog);
	});
});
