import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages/index';
import {
  FilterCharactersByNameDocument,
  FilterCharactersByNameQuery,
} from '@/generated/graphql';

const results = [
  {
    id: '1',
    name: 'Rick',
    image: 'https://test.com/img1.png',
  },
  {
    id: '2',
    name: 'Morty',
    image: 'https://test.com/img2.png',
  },
  {
    id: '3',
    name: 'Fat Rick',
    image: 'https://test.com/img3.png',
  },
];

const successMock: MockedResponse<FilterCharactersByNameQuery> = {
  request: {
    query: FilterCharactersByNameDocument,
  },
  result: {
    data: {
      characters: {
        info: {
          count: 3,
          next: null,
          prev: null,
          pages: 1,
        },
        results,
      },
    },
  },
};

function renderWithMockGraphQLProvider({
  mocks = [],
}: {
  mocks?: ReadonlyArray<MockedResponse>;
}) {
  const component = (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>
  );

  return render(component);
}

describe('Home page', () => {
  it('renders a heading', () => {
    const { getByText } = renderWithMockGraphQLProvider({});

    expect(getByText('Rick && Morty')).toBeInTheDocument();
  });

  it('renders a loading UI initially', () => {
    const { getByText } = renderWithMockGraphQLProvider({});

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test.each(results)("renders $name's name", async ({ name }) => {
    const { findByRole } = renderWithMockGraphQLProvider({
      mocks: [successMock],
    });

    expect(await findByRole('heading', { name })).toBeInTheDocument();
  });

  it("renders a link for each character's detail page", async () => {
    const { getAllByRole, queryByText } = renderWithMockGraphQLProvider({
      mocks: [successMock],
    });
    await waitFor(() =>
      expect(queryByText('Loading...')).not.toBeInTheDocument()
    );

    const links = getAllByRole('link', { name: /read more/i });

    links.forEach((link, i) => {
      expect(link).toHaveAttribute('href', `/characters/${results[i].id}`);
    });
  });
});
