"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import styles from "./ShareholdersAccordion.module.css";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { ShareholderI } from "@/types/types";

const ShareholdersAccordion = ({ shareholders }: any) => {
  const data: ShareholderI[] = JSON.parse(shareholders);

  return (
    <Accordion.Root
      className={styles.AccordionRoot}
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {data
        ? data.map((shareholder) => (
            <Accordion.Item
              key={shareholder.name}
              className={styles.AccordionItem}
              value="item-1"
            >
              <AccordionTrigger>{shareholder.name}</AccordionTrigger>
              <AccordionContent>
                ilość akcji:{shareholder.stockAmount}
                <br />
                procent akcji:{shareholder.stockPercentage}%
              </AccordionContent>
            </Accordion.Item>
          ))
        : null}
    </Accordion.Root>
  );
};

export default ShareholdersAccordion;

// <Accordion.Root
//   className={styles.AccordionRoot}
//   type="single"
//   defaultValue="item-1"
//   collapsible
// >
// <Accordion.Item className={styles.AccordionItem} value="item-1">
//   <AccordionTrigger>Is it accessible?</AccordionTrigger>
//   <AccordionContent>
//     Yes. It adheres to the WAI-ARIA design pattern.
//   </AccordionContent>
// </Accordion.Item>
// </Accordion.Root>
