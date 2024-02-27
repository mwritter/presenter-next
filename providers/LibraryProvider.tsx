"use client";
import { directoryCreate, directoryExists, directoryRead } from "@/api/tauri";
import { FileEntry } from "@tauri-apps/api/fs";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type LibraryContextType = {
  libraryContents?: Array<FileEntry>;
  playlistContents?: Array<FileEntry>;
  activeLibrary?: FileEntry | null;
  activePlaylist?: FileEntry | null;
  activeItem?: FileEntry | null;
  setActiveLibrary: (entry: FileEntry) => void;
  setActivePlaylist: (entry: FileEntry) => void;
  setActiveItem: (entry: FileEntry) => void;
};

const LibraryContext = createContext<LibraryContextType>({
  libraryContents: [],
  playlistContents: [],
  activeLibrary: null,
  activePlaylist: null,
  activeItem: null,
  setActiveLibrary: () => {},
  setActivePlaylist: () => {},
  setActiveItem: () => {},
});

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [libraryContents, setLibraryContents] = useState<FileEntry[]>();
  const [playlistContents, setPlaylistContents] = useState<FileEntry[]>();
  const [activeLibrary, _setActiveLibrary] = useState<FileEntry | null>(null);
  const [activePlaylist, _setActivePlaylist] = useState<FileEntry | null>(null);
  const [activeItem, _setActiveItem] = useState<FileEntry | null>(null);

  // Library is a directory with folders that have files that hold 'slide data'
  const setActiveLibrary = useCallback((entry: FileEntry) => {
    _setActiveLibrary(entry);
    _setActivePlaylist(null);
  }, []);

  // Playlist is a directory with folders that have files that hold 'slide data'
  const setActivePlaylist = useCallback((entry: FileEntry) => {
    _setActivePlaylist(entry);
    _setActiveLibrary(null);
  }, []);

  // Items are files that hold 'slide data' from the selected Library or Playlist
  const setActiveItem = useCallback((entry: FileEntry) => {
    _setActiveItem(entry);
  }, []);

  useEffect(() => {
    _setActiveItem(activeLibrary ?? activePlaylist);
  }, [activePlaylist, activeLibrary]);

  useEffect(() => {
    (async () => {
      // check for the Library
      const hasLibraryDirectory = await directoryExists("Library");
      if (!hasLibraryDirectory) await directoryCreate("Library");
      const libraryDirectory = await directoryRead("Library");
      setLibraryContents(libraryDirectory);

      // check for the Playlist
      const hasPlaylistDirectory = await directoryExists("Playlist");
      if (!hasPlaylistDirectory) await directoryCreate("Playlist");
      const playlistDirectory = await directoryRead("Playlist");
      setPlaylistContents(playlistDirectory);
    })();
  }, []);

  const contextValue = useMemo(
    () => ({
      libraryContents,
      playlistContents,
      activeLibrary,
      activePlaylist,
      activeItem,
      setActiveLibrary,
      setActivePlaylist,
      setActiveItem,
    }),
    [
      libraryContents,
      playlistContents,
      activeLibrary,
      activePlaylist,
      activeItem,
      setActiveLibrary,
      setActivePlaylist,
      setActiveItem,
    ]
  );

  return (
    <LibraryContext.Provider value={contextValue}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => useContext(LibraryContext);
