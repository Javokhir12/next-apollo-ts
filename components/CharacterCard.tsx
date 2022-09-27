import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export interface CharacterCardProps {
  name: string;
  src: string;
  id: string;
}

function CharacterCard({ name, src, id }: CharacterCardProps) {
  return (
    <Box
      position="relative"
      width={250}
      pb="0.5rem"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={src} alt={name} width={250} height={225} />

      <Box as="h3" textAlign="center" my="1" color="gray.700" fontSize="lg">
        <Link href={`/characters/${id}`} passHref>
          <a>{name}</a>
        </Link>
      </Box>
    </Box>
  );
}

export default CharacterCard;
