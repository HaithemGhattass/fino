import {PageViewer} from "./PageViewer";
import { AnnotationOverlay } from "./AnnotationOverlay";

type Annotation = {
  id: string;
  x: number;
  y: number;
  content: string;
};

export default function PageCanvas({
  url,
  annotations,
  onAddAnnotation,
}: {
  url: string;
  annotations: Annotation[];
  onAddAnnotation: (x: number, y: number) => void;
}) {
  return (
    <div className="page-canvas">
      <PageViewer url={url} />
      <AnnotationOverlay
        annotations={annotations}
        onAdd={onAddAnnotation}
      />
    </div>
  );
}
