export type LibraryFile = {
  path: string;
  name: string;
};

export type LibraryPanalProps = {
  items: Array<LibraryFile>;
};

const LibraryPanal = ({ items }: LibraryPanalProps) => {
  return (
    <div className="bg-black text-white">
      <ul className="grid gap-2 p-1">
        {items.map((item) => (
          <li key={item.path}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryPanal;
