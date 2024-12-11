import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSaveNotifications } from "../context/ModalProvider";

export default function SaveChangesNotification() {
  const { saveNotificationMessage } = useSaveNotifications();

  return createPortal(
    <AnimatePresence>
      {saveNotificationMessage && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 m-4 bg-opacity-75 p-4 rounded-md shadow-md w-[300px] grid gap-2 content-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="block px-4 py-2 text-sm font-medium text-white rounded-md shadow-md bg-vivid-orange"
            role="alert"
            aria-live="polite"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {saveNotificationMessage}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("root-portal")!
  );
}
