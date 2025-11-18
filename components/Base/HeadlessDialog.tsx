import React, { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface HeadlessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode | string;
  leading?: React.ReactNode;
  ending?: React.ReactNode;
  className?: string;
}

const HeadlessDialog = ({ isOpen, onClose, children, leading, ending, title, className }: HeadlessDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-gradient-to-b from-[#10FF61]/85 to-[#69B7FF]/85 backdrop-blur"
            aria-hidden="true"
          />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={twMerge(
                  `flex flex-col p-8 gap-4 bg-gradient-to-b from-[#6E2FF3] to-[#A92FF3] border-8 border-[#9A69FF] rounded-3xl w-full max-w-[360px] transform transition-all backdrop-blur ${className}`
                )}
              >
                <div className="grid grid-cols-[24px,1fr,24px] items-center">
                  {leading ? <div className="h-ful flex items-center justify-center">{leading}</div> : <div />}
                  {title && typeof title === "string" && (
                    <DialogTitle as="h3" className="text-base text-center">
                      {title}
                    </DialogTitle>
                  )}
                  {ending ? <div className="h-ful flex items-center justify-center">{ending}</div> : <div />}
                </div>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default HeadlessDialog;
