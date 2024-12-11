import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useMarkdown } from "../context/DocumentProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type DeleteModalType = {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

export default function DeleteModal({
  isOpen,
  onCancel,
  onDelete,
}: DeleteModalType) {
  const { activeMarkdown } = useMarkdown();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalAnimation = useReducedMotion();

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-black bg-opacity-50"
          role="dialog"
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
          aria-modal="true"
          ref={modalRef}
          tabIndex={-1}
        >
          <div className="relative w-full h-full">
            <motion.div
              className="bg-dark-gray-2 p-6 rounded-md w-[300px] text-white shadow-md absolute"
              role="document"
              initial={
                modalAnimation
                  ? {
                      opacity: 0,
                      right: "50%",
                      x: "50%",
                      bottom: "50%",
                      y: "50%",
                    }
                  : {
                      opacity: 0,
                      right: 0,
                      bottom: 0,
                    }
              }
              animate={
                modalAnimation
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 1,
                      right: "50%",
                      x: "50%",
                      bottom: "50%",
                      y: "50%",
                    }
              }
              exit={
                modalAnimation
                  ? { opacity: 0 }
                  : { opacity: 0, right: 0, bottom: 0 }
              }
            >
              <h2 id="delete-modal-title" className="sr-only">
                Confirm Deletion
              </h2>
              <p id="delete-modal-description" className="mb-6 text-sm">
                Are you sure you want to delete the document{" "}
                <span className="font-bold">{activeMarkdown?.filename}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 text-sm rounded bg-light-gray-blue text-dark-gray-4 hover:bg-gray-300"
                  onClick={onCancel}
                  aria-label={`Cancel delete of document ${activeMarkdown?.filename}`}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm text-white rounded bg-vivid-orange hover:bg-orange-600"
                  onClick={onDelete}
                  aria-label={`Confirm delete of document ${activeMarkdown?.filename}`}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("root-portal")!
  );
}
