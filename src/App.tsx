import { motion } from "framer-motion";
import DocumentSidebar from "./components/DocumentSidebar";
import FileEditor from "./components/FileEditorHeader";
import MarkDownEditor from "./components/MarkdownEditor";
import MarkdownPreview from "./components/MarkdownPreview";
import { useDocumentSidebar } from "./context/DocumentProvider";
import SaveChangesNotification from "./components/SaveChangesNotification";

function App() {
  const { toggleDocumentSidebar } = useDocumentSidebar();
  return (
    <div className="flex overflow-x-hidden overflow-y-hidden min-h-svh bg-dark-gray-4">
      <DocumentSidebar />
      <motion.main
        className="min-w-full bg-documentBodyBg"
        animate={{
          marginLeft: toggleDocumentSidebar ? "13rem" : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="flex flex-col min-h-full">
          <FileEditor />
          <section className="relative flex grow shrink ">
            <MarkDownEditor />
            <MarkdownPreview />
          </section>
        </div>
      </motion.main>
      <SaveChangesNotification />
    </div>
  );
}

export default App;
