import React from 'react';
import { render } from 'react-native-testing-library';
import PreventBackground from '../';

describe('PreventBackground component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<PreventBackground />);
    const modal = getByTestId('modal');
    expect(modal.props.visible).toBe(true);
  });

  it('renders correctly with block prop set to false', () => {
    const { queryByTestId } = render(<PreventBackground block={false} />);
    const modal = queryByTestId('modal');
    expect(modal).toBeNull();
  });

  it('renders correctly with block prop set to true', () => {
    const { getByTestId } = render(<PreventBackground block={true} />);
    const modal = getByTestId('modal');
    expect(modal.props.visible).toBe(true);
  });
});
