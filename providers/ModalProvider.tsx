"use client";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

// for modal pop ups
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
