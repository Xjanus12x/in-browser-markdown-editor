import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import React from "react";
import { MarkdownType } from "../assets/models/MarkdownType";
import HelloMarkdown from "../constants/HelloMarkdown";

type DocumentContextType = {
  toggleDocumentSidebar: boolean;
  setToggleDocumentSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDocumentPreview: boolean;
  setToggleDocumentPreview: React.Dispatch<React.SetStateAction<boolean>>;
  activeMarkdown: MarkdownType | null;
  setActiveMarkdown: React.Dispatch<React.SetStateAction<MarkdownType | null>>;
  markdownList: MarkdownType[];
  setMarkdownList: React.Dispatch<React.SetStateAction<MarkdownType[]>>;
};
const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export function useDocumentSidebar() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocumentSidebar must be used inside DocumentProvider");
  }
  return {
    toggleDocumentSidebar: context.toggleDocumentSidebar,
    setToggleDocumentSidebar: context.setToggleDocumentSidebar,
  };
}

export function useDocumentPreview() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocumentPreview must be used inside DocumentProvider");
  }
  return {
    toggleDocumentPreview: context.toggleDocumentPreview,
    setToggleDocumentPreview: context.setToggleDocumentPreview,
  };
}

export function useMarkdown() {
  const context = useContext(DocumentContext);
  if (!context)
    throw new Error("useMarkdown must be used inside DocumentProvider");

  return {
    activeMarkdown: context.activeMarkdown,
    setActiveMarkdown: context.setActiveMarkdown,
    markdownList: context.markdownList,
    setMarkdownList: context.setMarkdownList,
  };
}

type DocumentProviderType = PropsWithChildren;

export default function DocumentProvider({ children }: DocumentProviderType) {
  const isTablet = useBreakpoint("tablet");
  const [toggleDocumentSidebar, setToggleDocumentSidebar] = useState(false);
  const [toggleDocumentPreview, setToggleDocumentPreview] = useState(isTablet);
  const [activeMarkdown, setActiveMarkdown] = useState<MarkdownType | null>(
    HelloMarkdown
  );
  const [markdownList, setMarkdownList] = useState<MarkdownType[]>(() => {
    const storedFiles = localStorage.getItem("markdownFiles");
    return storedFiles ? JSON.parse(storedFiles) : [HelloMarkdown];
  });

  return (
    <DocumentContext.Provider
      value={{
        toggleDocumentSidebar,
        setToggleDocumentSidebar,
        toggleDocumentPreview,
        setToggleDocumentPreview,
        activeMarkdown,
        setActiveMarkdown,
        markdownList,
        setMarkdownList,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}
