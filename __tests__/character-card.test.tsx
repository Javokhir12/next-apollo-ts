import CharacterCard from '@/components/CharacterCard';
import renderer from 'react-test-renderer';

test('CharacterCard renders correctly', () => {
  const tree = renderer
    .create(
      <CharacterCard id="1" name="Rick" src="https://test.com/rick.png" />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
