import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type ModalContextType = {
  toggleDeleteModal: boolean;
  isDeletingMarkdown: boolean;
  toggleModal: () => void;
  onDelete: () => void;
  saveNotificationMessage: string | null;
  setSaveNotificationMessage: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  isSaveButtonDisabled: boolean;
  notify: (filename: string) => void;
};
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useDeleteModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useDeleteModal must be used inside ModalProvider");
  }
  return {
    toggleDeleteModal: context.toggleDeleteModal,
    isDeletingMarkdown: context.isDeletingMarkdown,
    toggleModal: context.toggleModal,
    onDelete: context.onDelete,
  };
}

export function useSaveNotifications() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useSaveNotifications must be used inside ModalProvider");
  return {
    saveNotificationMessage: context.saveNotificationMessage,
    setSaveNotificationMessage: context.setSaveNotificationMessage,
    isSaveButtonDisabled: context.isSaveButtonDisabled,
    notify: context.notify,
  };
}

type ModalProviderProps = PropsWithChildren;

export default function ModalProvider({ children }: ModalProviderProps) {
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
  const [isDeletingMarkdown, setIsDeletingMarkdown] = useState(false);
  const [saveNotificationMessage, setSaveNotificationMessage] = useState<
    string | null
  >(null);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  function toggleModal() {
    setToggleDeleteModal(!toggleDeleteModal);
  }

  function onDelete() {
    setIsDeletingMarkdown(true);
    setToggleDeleteModal(false);
  }
  function notify(filename: string) {
    const notificationMessage = `Changes to "${filename}" have been saved.`;

    setSaveNotificationMessage(notificationMessage);
    setTimeout(() => {
      setSaveNotificationMessage(null);
    }, 2000);
    // Disable the save button for 20 seconds
    setIsSaveButtonDisabled(true);
    setTimeout(() => setIsSaveButtonDisabled(false), 10000);
  }

  return (
    <ModalContext.Provider
      value={{
        toggleDeleteModal,
        isDeletingMarkdown,
        toggleModal,
        onDelete,
        saveNotificationMessage,
        setSaveNotificationMessage,
        isSaveButtonDisabled,
        notify,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
