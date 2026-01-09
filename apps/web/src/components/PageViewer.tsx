export function PageViewer({ url }: { url: string }) {
  return (
    <div className="iframe-wrapper">
      <iframe
        src={url}
        title="Page Viewer"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}
