import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { FilterCharactersByNameQueryHookResult } from '../generated/graphql';

export type SearchProps = Pick<
  FilterCharactersByNameQueryHookResult,
  'refetch'
>;

function Search({ refetch }: SearchProps) {
  const [term, setTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    refetch({
      name: term,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">🔍</InputLeftElement>
        <Input
          onChange={(e) => setTerm(e.target.value)}
          ref={searchRef}
          placeholder="Search characters"
          mb="2rem"
          focusBorderColor="green.300"
        />
      </InputGroup>
    </form>
  );
}

export default Search;
