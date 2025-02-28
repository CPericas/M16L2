import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentForm from "../components/CommentForm";


describe('CommentForm', () => {
    it('renders correctly', () => {
        const { getByText } = render(<CommentForm />);
        expect(getByText('Post a Comment')).toBeInTheDocument();
    });

    it('handles input changes', () => {
        const { getByPlaceholderText } = render(<CommentForm />);
        const titleInput = getByPlaceholderText('Enter Title') as HTMLInputElement;
        const bodyInput = getByPlaceholderText('Enter your comment') as HTMLInputElement;

        fireEvent.change(titleInput, { target: { value: 'Test Title'} });
        fireEvent.change(bodyInput, { target: { value: 'Test Body'} });

        expect(titleInput.value).toBe('Test Title');
        expect(bodyInput.value).toBe('Test Body');
    });

    it('submits the form and stores comment in localStorage', () => {
        const { getByPlaceholderText, getByText } = render(<CommentForm />);
        const titleInput = getByPlaceholderText('Enter Title') as HTMLInputElement;
        const bodyInput = getByPlaceholderText('Enter your comment') as HTMLTextAreaElement;
        const submitButton = getByText('Submit');
    
        fireEvent.change(titleInput, { target: { value: 'Stored Title' } });
        fireEvent.change(bodyInput, { target: { value: 'Stored Body' } });
        fireEvent.click(submitButton);
    
        const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
        expect(storedComments).toEqual([{ title: 'Stored Title', body: 'Stored Body' }]);
      });
})