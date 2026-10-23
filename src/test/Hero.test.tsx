import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';

describe('Hero Component', () => {
  it('renders hero section', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { name: /Chandran Lakshmanan/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays profile role', () => {
    render(<Hero />);
    const role = screen.getByText(/Full Stack Developer & AI Engineer/i);
    expect(role).toBeInTheDocument();
  });

  it('displays status widget', () => {
    render(<Hero />);
    const status = screen.getByText(/STATUS/i);
    expect(status).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    const viewWorkBtn = screen.getByRole('link', { name: /View Work/i });
    const getInTouchBtn = screen.getByRole('link', { name: /Get in Touch/i });
    expect(viewWorkBtn).toBeInTheDocument();
    expect(getInTouchBtn).toBeInTheDocument();
  });

  it('displays top skills', () => {
    render(<Hero />);
    const skills = screen.getAllByText(/React|Node.js|Claude API/i);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('renders stats', () => {
    render(<Hero />);
    const statsText = screen.getByText(/Years of experience/i);
    expect(statsText).toBeInTheDocument();
  });
});
