type Annotation = {
  id: string;
  x: number;
  y: number;
  content: string;
};

export function AnnotationOverlay({
  annotations,
  onAdd,
}: {
  annotations: Annotation[];
  onAdd: (x: number, y: number) => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    onAdd(x, y);
  };

  return (
    <div className="overlay" onClick={handleClick}>
      {annotations.map((a) => (
        <div
          key={a.id}
          className="dot"
          style={{
            left: `${a.x * 100}%`,
            top: `${a.y * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
