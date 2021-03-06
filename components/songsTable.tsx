import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, IconButton, Tr, Th, Tbody } from "@chakra-ui/react";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";

import React from "react";
import { formatDate, formatTime } from "../lib/formatters";
import { useStoreActions } from "easy-peasy";

const SongsTable: React.FC<any> = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <IconButton
          aria-label="play"
          icon={<BsPlayFill fontSize="30px" />}
          colorScheme="green"
          size="lg"
          isRound
          onClick={() => handlePlay()}
        />
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255, 255,255, 0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td> {i + 1} </Td>
                <Td> {song.name} </Td>
                <Td> {formatDate(song.createdAt)} </Td>
                <Td> {formatTime(song.duration)} </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
