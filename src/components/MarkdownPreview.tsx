import { AnimatePresence, motion } from "framer-motion";
import { useDocumentPreview, useMarkdown } from "../context/DocumentProvider";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import Header from "./Header";

export default function MarkdownPreview() {
  const { toggleDocumentPreview } = useDocumentPreview();
  const { activeMarkdown } = useMarkdown();

  return (
    <AnimatePresence>
      {toggleDocumentPreview && (
        <motion.section
          className="absolute top-0 right-0 bottom-0 w-full text-txt-clr-1 border-l bg-previewBg border-light-gray-blue sm:max-w-[50%] min-h-full overflow-y-auto"
          id="document-preview"
          initial={{ x: "100%" }} // Starts off-screen
          animate={{ x: 0 }} // Animates into view
          exit={{ x: "100%" }} // Animates out of view
        >
          <Header
            label="Preview"
            displayPreviewButton={toggleDocumentPreview}
          />
          <Markdown
            className="min-h-full p-4 space-y-5 text-sm break-all text-wrap markdown-isolated font-roboto-slab"
            remarkPlugins={[remarkGfm, remarkBreaks]} // Plugins for processing markdown syntax
            rehypePlugins={[rehypeRaw]}
            children={activeMarkdown?.content}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-4xl" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-3xl font-light" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-2xl" {...props} />
              ),
              h4: ({ node, ...props }) => <h4 className="text-xl" {...props} />,
              h5: ({ node, ...props }) => <h5 className="text-lg" {...props} />,
              h6: ({ node, ...props }) => (
                <h6 className="text-sm text-vivid-orange" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-txt-clr-2" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre className="p-8 bg-dark-gray-1" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="space-y-2 marker:text-vivid-orange "
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="space-y-2 marker:text-vivid-orange "
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a className="text-txt-clr-1" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="relative p-8 overflow-hidden border-l-4 rounded-sm bg-blockquoteBg before:absolute before:inset-0 before:right-auto before:bg-vivid-orange before:w-1.5 before:rounded-l-sm"
                  {...props}
                />
              ),
            }}
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
