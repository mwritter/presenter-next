"use client";

import { cn } from "@/lib/utils";
import { useLibraryContext } from "@/providers/LibraryProvider";
import { twMerge } from "tailwind-merge";

const LibraryDirectoryView = () => {
  const { libraryContents, setActiveLibrary, activeLibrary } =
    useLibraryContext();
  const entries = libraryContents?.filter((entry) => Boolean(entry.children));
  return (
    <div className="text-white">
      <h2 className="uppercase px-2 text-xs font-bold">Library</h2>
      <ul className="grid gap-1">
        {entries?.map((entry) => (
          <li
            className={cn("hover:cursor-pointer text-sm px-5", {
              "bg-white text-black": activeLibrary?.path === entry.path,
            })}
            key={entry.path}
            onClick={() => setActiveLibrary(entry)}
          >
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ItemView = () => {
  const { activeItem, setActiveItem } = useLibraryContext();

  const items = activeItem?.children?.filter((item) => !Boolean(item.children));

  const formatName = (item?: string) => {
    const name = item?.split(".");
    name?.pop();
    return name?.join(".");
  };

  return (
    <div className="text-white">
      <h2 className="uppercase px-2 text-xs font-bold">Items</h2>
      {items && (
        <ul className="grid gap-1">
          {items.map((item) => (
            <li
              key={item.path}
              className={cn("text-sm cursor-pointer px-5", {
                "bg-white text-black": activeItem?.path === item.path,
              })}
              onClick={() => setActiveItem(item)}
            >
              {formatName(item.name)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PlaylistDirectoryView = () => {
  const { playlistContents, activePlaylist, setActivePlaylist } =
    useLibraryContext();
  const entries = playlistContents?.filter((entry) => Boolean(entry.children));
  return (
    <div className="text-white">
      <h2 className="uppercase px-2 text-xs font-bold">Playlist</h2>
      <ul className="grid gap-1">
        {entries?.map((entry) => (
          <li
            className={cn("hover:cursor-pointer text-sm px-5", {
              "bg-white text-black": activePlaylist?.path === entry.path,
            })}
            key={entry.path}
            onClick={() => setActivePlaylist(entry)}
          >
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LibraryPanel = () => {
  return (
    <div className="h-full bg-neutral-800 grid gap-2 py-2">
      <div className="flex flex-col gap-2">
        <LibraryDirectoryView />
        <PlaylistDirectoryView />
      </div>
      <ItemView />
    </div>
  );
};

export default LibraryPanel;
