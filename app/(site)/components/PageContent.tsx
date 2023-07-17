"use client";

import SongItem from "@/components/SongItem";
import { Songs } from "@/types";

const PageContent = ({ songs }: { [key: string]: Songs[] }) => {
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8  gap-4 mt-2">
      {songs.map((songItem) => (
        <SongItem key={songItem.id} onClick={() => {}} data={songItem} />
      ))}
    </div>
  );
};

export default PageContent;
