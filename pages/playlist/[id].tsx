import GradientLayout from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const Playlist = ({ playlist }) => {
  const getBGColor = (id) => {
    const colors = [
      "red",
      "green",
      "blue",
      "orange",
      "purple",
      "gray",
      "teal",
      "yellow",
    ];

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
  };
  const color = getBGColor(playlist.id);
  return (
    <GradientLayout
      title={playlist.name}
      roundImage={false}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
      color={color}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export default Playlist;

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req?.cookies?.TRAX_ACCESS_TOKEN);
  } catch (err) {
    return {
      path: "/signin",
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: { id: +query.id, userId: user.id },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};
