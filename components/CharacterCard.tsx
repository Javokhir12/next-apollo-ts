import { Box } from '@chakra-ui/react';
import Image from 'next/image';

export interface CharacterCardProps {
  name: string;
  src: string;
}

function CharacterCard({ name, src }: CharacterCardProps) {
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
        {name}
      </Box>
    </Box>
  );
}

export default CharacterCard;
