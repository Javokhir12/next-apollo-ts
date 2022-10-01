import { GetCharacterByIdQuery } from '@/generated/graphql';
import renderer from 'react-test-renderer';
import Character from '@/pages/characters/[characterId]';

const characterProps: Pick<GetCharacterByIdQuery, 'character'> = {
  character: {
    gender: 'Male',
    id: 'abcdef777',
    image: 'https://test.com/rick.png',
    name: 'Rick',
    origin: {
      id: 'earth-777',
      name: 'The Earth',
    },
    status: 'Alive',
  },
};

describe('Character', () => {
  it('renders character info correctly', () => {
    const tree = renderer.create(<Character {...characterProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
