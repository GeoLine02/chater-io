// components/Modal.tsx
"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <>
      {/* Dark surface */}
      <div className="fixed inset-0 z-40 bg-black/60" />

      {/* User-controlled modal content */}
      <div className="fixed inset-0 z-50 w-full h-screen flex items-center justify-center">
        {children}
      </div>
    </>,
    modalRoot,
  );
}
