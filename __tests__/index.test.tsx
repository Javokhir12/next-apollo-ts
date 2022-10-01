import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import Home from '@/pages/index';

function renderWithMockGraphQLProvider({
  mocks = [],
}: {
  mocks?: ReadonlyArray<MockedResponse>;
}) {
  const component = (
    <MockedProvider mocks={mocks}>
      <Home />
    </MockedProvider>
  );

  return render(component);
}

describe('Home page', () => {
  it('renders  a heading', () => {
    const { getByText } = renderWithMockGraphQLProvider({});

    expect(getByText('Rick && Morty')).toBeInTheDocument();
  });
});
