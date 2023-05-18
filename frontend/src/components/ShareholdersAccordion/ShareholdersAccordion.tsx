"use client";

import React, { ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import styles from "./ShareholdersAccordion.module.css";
import { ShareholderI } from "@/types/types";

const ShareholdersAccordion = ({ shareholders }: any) => {
  const data: ShareholderI[] = JSON.parse(shareholders);

  return (
    <Accordion.Root className={styles.AccordionRoot} type="multiple">
      <div className={styles.shareholdersContainer}>
        {data
          ? data.map((shareholder, index) => (
              <Accordion.Item
                key={shareholder.name}
                className={styles.AccordionItem}
                value={`item-${index + 1}`}
              >
                <AccordionTrigger>
                  <span>{shareholder.name}</span>
                </AccordionTrigger>
                <AccordionContent>
                  ilość akcji:{shareholder.stockAmount}
                  <br />
                  procent akcji:{shareholder.stockPercentage}%
                </AccordionContent>
              </Accordion.Item>
            ))
          : null}
      </div>
    </Accordion.Root>
  );
};

export default ShareholdersAccordion;

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={styles.AccordionHeader}>
    <Accordion.Trigger
      className={styles.AccordionTrigger}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={styles.AccordionContent}
      {...props}
      ref={forwardedRef}
    >
      <div className={styles.AccordionContentText}>{children}</div>
    </Accordion.Content>
  )
);
