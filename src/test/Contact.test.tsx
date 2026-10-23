import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../components/Contact';

describe('Contact Component', () => {
  it('renders contact form', () => {
    render(<Contact />);
    const form = screen.getByPlaceholderText(/Your Name/i).closest('form');
    expect(form).toBeInTheDocument();
  });

  it('displays all form fields', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\+91 98765/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/What would you like to talk about/i)).toBeInTheDocument();
  });

  it('requires name and message fields', async () => {
    render(<Contact />);
    const submitBtn = screen.getByRole('button', { name: /Send message/i });

    await userEvent.click(submitBtn);

    const error = await screen.findByText(/Name and message are required/i);
    expect(error).toBeInTheDocument();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/Your Name/i);
    const emailInput = screen.getByPlaceholderText(/your@email.com/i);
    const messageInput = screen.getByPlaceholderText(/What would you like to talk about/i);
    const submitBtn = screen.getByRole('button', { name: /Send message/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'invalid-email');
    await user.type(messageInput, 'Test message');
    await user.click(submitBtn);

    const error = await screen.findByText(/valid email/i);
    expect(error).toBeInTheDocument();
  });

  it('displays contact info', () => {
    const { container } = render(<Contact />);
    const info = within(container.querySelector('.contact-info') as HTMLElement);
    expect(info.getByText('Email')).toBeInTheDocument();
    expect(info.getByText('Phone')).toBeInTheDocument();
    expect(info.getByText('Location')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument();
  });
});
