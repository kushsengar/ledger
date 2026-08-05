import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders correctly with draft status', () => {
    render(<Badge status="DRAFT" />);
    const badge = screen.getByText('DRAFT');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-draft');
  });

  it('renders correctly with approved status', () => {
    render(<Badge status="APPROVED" />);
    const badge = screen.getByText('APPROVED');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-approved');
  });
});
