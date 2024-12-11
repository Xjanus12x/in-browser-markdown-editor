import { motion } from "framer-motion";
import { useDocumentPreview, useMarkdown } from "../context/DocumentProvider";
import Header from "./Header";

export default function MarkDownEditor() {
  const { toggleDocumentPreview } = useDocumentPreview();
  const { activeMarkdown, setActiveMarkdown } = useMarkdown();

  return (
    <motion.section
      className="grid grid-rows-[auto_1fr] min-h-full grow bg-editorBg"
      initial={{ marginRight: 0 }}
      animate={
        toggleDocumentPreview ? { marginRight: "50%" } : { marginRight: 0 }
      }
    >
      <Header
        label="Markdown"
        displayPreviewButton={!toggleDocumentPreview}
      />
      <form className="w-full max-h-full p-4 overflow-y-hidden">
        <label className="sr-only" htmlFor="markdown">
          Markdown Input
        </label>
        <textarea
          className="w-full min-h-full text-xs bg-transparent outline-none resize-none text-txt-clr-2 font-roboto-mono"
          name="markdown"
          id="markdown"
          value={activeMarkdown?.content ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setActiveMarkdown((prevValues) => {
              if (prevValues) return { ...prevValues, content: value };
              return null;
            });
          }}
        ></textarea>
      </form>
    </motion.section>
  );
}
