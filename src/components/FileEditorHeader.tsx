import hamburgerMenu from "../assets/icon-menu.svg";
import close from "../assets/icon-close.svg";
import save from "../assets/icon-save.svg";
import logo from "../assets/logo.svg";
import document from "../assets/icon-document.svg";
import { useDocumentSidebar, useMarkdown } from "../context/DocumentProvider";
import TrashIcon from "../icons/Trash";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import DeleteModal from "./DeleteModal";
import { useDeleteModal, useSaveNotifications } from "../context/ModalProvider";
import { MarkdownType } from "../assets/models/MarkdownType";

export default function FileEditor() {
  const { toggleDocumentSidebar, setToggleDocumentSidebar } =
    useDocumentSidebar();
  const { activeMarkdown, markdownList, setActiveMarkdown, setMarkdownList } =
    useMarkdown();
  const { isDeletingMarkdown, toggleDeleteModal, toggleModal, onDelete } =
    useDeleteModal();

  useEffect(() => {
    if (isDeletingMarkdown && markdownList.length === 1) {
      setMarkdownList([]);
      setActiveMarkdown(null);
    } else if (isDeletingMarkdown && markdownList.length > 1) {
      setMarkdownList((currMarkdownList) =>
        currMarkdownList.filter(({ id }) => id !== activeMarkdown!.id)
      );
      setActiveMarkdown(null);
    }
  }, [isDeletingMarkdown, setMarkdownList, setActiveMarkdown]);

  return (
    <header className="sticky top-0 z-10 flex items-center bg-fileEditorHeaderBg col-span-full">
      <button
        className="self-stretch p-6 max-w-fit bg-hamburgerMenuBg hover:bg-vivid-orange focus-visible:bg-vivid-orange"
        aria-label={
          toggleDocumentSidebar
            ? "Close document sidebar"
            : "Open document sidebar"
        }
        aria-expanded={toggleDocumentSidebar}
        aria-controls="document-sidebar"
        onClick={() => setToggleDocumentSidebar(!toggleDocumentSidebar)}
      >
        <img
          className="object-contain object-center size-7"
          src={toggleDocumentSidebar ? close : hamburgerMenu}
          aria-hidden="true"
        />
      </button>

      <div className="relative lg:grid self-stretch px-5 before:w-[.5px] before:h-3/5 before:translate-y-2/4 place-content-center before:absolute before:right-0 before:bottom-2/4 before:bg-[#5a6069] hidden ">
        <img src={logo} alt="Markdown logo" aria-hidden />
      </div>

      <div className="py-2 pr-1.5 flex justify-between grow md:pr-3">
        <div className="inline-flex justify-between px-5 py-2 grow">
          {activeMarkdown && (
            <>
              <ActiveMarkdown
                activeMarkdown={activeMarkdown}
                setActiveMarkdown={setActiveMarkdown}
              />

              <DeleteButton
                activeMarkdown={activeMarkdown}
                toggleModal={toggleModal}
              />
            </>
          )}
        </div>
        {activeMarkdown && <SaveButton />}
      </div>

      <DeleteModal
        isOpen={toggleDeleteModal}
        onCancel={toggleModal}
        onDelete={onDelete}
      />
    </header>
  );
}

type ActiveMarkdownType = {
  activeMarkdown: MarkdownType | null;
  setActiveMarkdown: React.Dispatch<React.SetStateAction<MarkdownType | null>>;
};
function ActiveMarkdown({
  activeMarkdown,
  setActiveMarkdown,
}: ActiveMarkdownType) {
  const [localFilenameInput, setLocalFilenameInput] = useState(
    activeMarkdown!.filename ?? ""
  );
  const filenameDebounce = useDebounce(localFilenameInput);
  // Sync local state with activeMarkdown whenever it changes
  useEffect(() => {
    if (activeMarkdown) {
      setLocalFilenameInput(activeMarkdown.filename ?? "");
    }
  }, [activeMarkdown]);
  
  useEffect(() => {
    if (filenameDebounce && activeMarkdown) {
      const isMarkdownFile = /\.md$/i.test(filenameDebounce); // Check if filename ends with .md (case-insensitive)
      const filename = isMarkdownFile
        ? filenameDebounce
        : `${localFilenameInput}.md`;
      setActiveMarkdown({ ...activeMarkdown, filename });
    }
  }, [filenameDebounce, setActiveMarkdown]);

  return (
    <form className="inline-flex items-center gap-3 grow shrink">
      <img src={document} aria-hidden />
      <div className="grid">
        <span className="text-sm text-txt-clr-2">Document Name</span>
        <input
          key={activeMarkdown?.id}
          className="text-sm text-white bg-transparent border-b-2 border-transparent outline-none focus:border-white focus:outline-none"
          value={localFilenameInput}
          onChange={(e) => setLocalFilenameInput(e.target.value)}
        />
      </div>
    </form>
  );
}

function SaveButton() {
  const { isSaveButtonDisabled, notify } = useSaveNotifications();
  const { activeMarkdown, markdownList, setMarkdownList } = useMarkdown();

  function saveMarkdowns() {
    const updatedMarkdownList = markdownList.map((markdown) =>
      markdown.id === activeMarkdown?.id ? activeMarkdown : markdown
    );
    localStorage.setItem("markdownFiles", JSON.stringify(updatedMarkdownList));
    setMarkdownList(updatedMarkdownList);
  }

  return (
    <button
      className="self-center p-4 rounded-md bg-vivid-orange lg:flex lg:items-center lg:gap-2 lg:p-3 hover:bg-vivid-orange/50 focus-visible:bg-vivid-orange/50 disabled:bg-vivid-orange/50"
      aria-label={`Save ${activeMarkdown?.filename}`}
      aria-disabled={!activeMarkdown || isSaveButtonDisabled}
      disabled={!activeMarkdown || isSaveButtonDisabled}
      onClick={() => {
        if (activeMarkdown) {
          saveMarkdowns();
          notify(activeMarkdown.filename);
        }
      }}
    >
      <img src={save} aria-hidden="true" />
      <span className="hidden text-white lg:block">Save Changes</span>
    </button>
  );
}
type DeleteButtonType = {
  activeMarkdown: MarkdownType;
  toggleModal: () => void;
};
function DeleteButton({ activeMarkdown, toggleModal }: DeleteButtonType) {
  return (
    <button
      className="hover:text-vivid-orange text-txt-clr-3 disabled:bg-red-500"
      aria-label={
        activeMarkdown
          ? `Delete document ${activeMarkdown.filename}`
          : "Delete button disabled. No document selected"
      }
      aria-disabled={!activeMarkdown}
      disabled={!activeMarkdown}
      onClick={() => toggleModal()}
    >
      <TrashIcon />
    </button>
  );
}
