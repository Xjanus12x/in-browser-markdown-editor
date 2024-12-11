import lightMode from "../assets/icon-light-mode.svg";
import darkMode from "../assets/icon-dark-mode.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useDocumentSidebar, useMarkdown } from "../context/DocumentProvider";
import document from "../assets/icon-document.svg";
import { MarkdownType } from "../assets/models/MarkdownType";
import { useTheme } from "../context/ThemeProvider";

export default function DocumentSidebar() {
  const { toggleDocumentSidebar } = useDocumentSidebar();
  const { markdownList, setMarkdownList } = useMarkdown();
  return (
    <AnimatePresence>
      {toggleDocumentSidebar && (
        <motion.aside
          className="fixed top-0 bottom-0 left-0 z-20 grid p-5 overflow-y-hidden bg-documentSidebarBg min-w-52"
          id="document-sidebar"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="grid content-start self-start h-full max-h-[95%] space-y-4 overflow-y-hidden">
            <header className="text-sm tracking-widest uppercase text-txt-clr-3">
              <h2>My documents</h2>
            </header>
            <button
              className="py-3 text-white rounded-md bg-vivid-orange hover:bg-opacity-50 focus-visible:bg-opacity-50"
              aria-label="Add new document"
              onClick={() => {
                setMarkdownList((previousMarkdownList) => [
                  ...previousMarkdownList,
                  {
                    id: previousMarkdownList.length + 1,
                    filename: "untitledss-document.md",
                    content: "# Create your new markdown here!",
                    date: new Date().toDateString(),
                  },
                ]);
              }}
            >
              + New Document
            </button>
            <ul className="min-h-full space-y-5 overflow-y-auto">
              {markdownList.map((markdown) => (
                <li key={markdown.id}>
                  <DocumentItem {...markdown} />
                </li>
              ))}
            </ul>
          </div>
          <ToggleTheme />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function DocumentItem({ id, filename, content, date }: MarkdownType) {
  const { setActiveMarkdown, activeMarkdown } = useMarkdown();
  return (
    <button
      className="flex items-center gap-3 text-txt-clr-1 group"
      aria-label={`Open ${filename} document preview`}
      aria-describedby={`document-info-${filename}`}
      disabled={!!activeMarkdown && id === activeMarkdown.id}
      aria-disabled={!!activeMarkdown && id === activeMarkdown.id}
      onClick={() => {
        setActiveMarkdown({ id, filename, content, date });
      }}
    >
      <img src={document} aria-hidden={true} />
      <div
        className="grid text-xs text-left cursor-pointer"
        id={`document-info-${filename}`}
      >
        <span className="text-txt-clr-3">{date}</span>
        <span className="group-hover:text-vivid-orange group-disabled:text-vivid-orange">
          {filename}
        </span>
      </div>
    </button>
  );
}

function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="inline-flex items-center self-end justify-start gap-2 justify-self-center">
      <img className="brightness-200" src={lightMode} aria-hidden="true" />
      <label
        className="inline-flex items-center cursor-pointer"
        htmlFor="theme-toggle"
      >
        <input
          id="theme-toggle"
          type="checkbox"
          role="switch"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="sr-only peer"
          aria-checked={theme === "dark"}
          aria-label={`Toggle ${theme === "dark" ? "Light mode" : "Dark mode"}`}
        />
        <div className="relative w-11 h-6 bg-gray-500 peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-300 dark:peer-focus-visible:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-vivid-orange"></div>
        <span className="text-sm font-medium text-gray-900 sr-only ms-3 dark:text-gray-300">
          Toggle {theme === "dark" ? "Light mode theme" : "Dark mode theme"}
        </span>
      </label>
      <img className="brightness-200" src={darkMode} aria-hidden="true" />
    </div>
  );
}
