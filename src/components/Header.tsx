import showPreview from "../assets/icon-show-preview.svg";
import hidePreview from "../assets/icon-hide-preview.svg";
import { useDocumentPreview } from "../context/DocumentProvider";

type HeaderType = {
  label: string;
  displayPreviewButton: boolean;
};
export default function Header({
  label,
  displayPreviewButton,
}: HeaderType) {
  const { toggleDocumentPreview, setToggleDocumentPreview } =
    useDocumentPreview();

  return (
    <header className="sticky top-0 flex items-center justify-between p-3 bg-documentHeaderBg text-txt-clr-2">
      <h2 className="text-sm font-medium tracking-widest uppercase">{label}</h2>
      {displayPreviewButton && (
        <button
          aria-label={
            toggleDocumentPreview
              ? "Close document preview"
              : "Open document preview"
          }
          aria-expanded={toggleDocumentPreview}
          aria-controls="document-preview"
          onClick={() => setToggleDocumentPreview(!toggleDocumentPreview)}
        >
          <img
            className="brightness-200"
            src={toggleDocumentPreview ? hidePreview : showPreview}
            aria-hidden="true"
          />
        </button>
      )}
    </header>
  );
}
