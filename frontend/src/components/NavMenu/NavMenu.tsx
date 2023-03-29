"use client";

import React, { useState } from "react";
import * as Menubar from "@radix-ui/react-menubar";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import styles from "./NavMenu.module.css";

const NavMenu = () => {
  const [value, setValue] = useState("");

  const closeNavMenu = () => setValue("");

  const links = [
    { name: "Index Root Link", href: "/" },
    { name: "Wallet Link", href: "/wallet" },
    { name: "Example Profile Link", href: "/wallet/profile/foobar" },
  ];

  return (
    <Menubar.Root
      value={value}
      onValueChange={setValue}
      className={styles.menubarRoot}
    >
      <Menubar.Menu>
        <Menubar.Trigger className={styles.menubarTrigger}>
          Plik
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className={styles.menubarContent}
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            {links.map((link) => {
              return (
                <Menubar.Item key={link.name} className={styles.menubarItem}>
                  <Link href={link.href} onClick={closeNavMenu}>
                    {link.name}{" "}
                  </Link>
                </Menubar.Item>
              );
            })}
            <Menubar.Separator className={styles.menubarSeparator} />
            <Menubar.Sub>
              <Menubar.SubTrigger className={styles.menubarSubTrigger}>
                Share
                <div className={styles.rightSlot}>
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent
                  className={styles.menubarSubContent}
                  alignOffset={-5}
                >
                  <Menubar.Item className={styles.menubarItem}>
                    Email Link
                  </Menubar.Item>
                  <Menubar.Item className={styles.menubarItem}>
                    Messages
                  </Menubar.Item>
                  <Menubar.Item className={styles.menubarItem}>
                    Notes
                  </Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className={styles.menubarSeparator} />
            <Menubar.Item className={styles.menubarItem}>About</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default NavMenu;
