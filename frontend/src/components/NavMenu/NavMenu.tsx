"use client";

import React, { useState } from "react";
import * as Menubar from "@radix-ui/react-menubar";
import Link from "next/link";
import styles from "./NavMenu.module.css";
import { useHydrateLocalStorage } from "@/hooks/useHydrateLocalStorage";
import { useAppStore } from "@/store/store";

const NavMenu = () => {
  const [value, setValue] = useState("");
  useHydrateLocalStorage();
  const closeNavMenu = () => setValue("");
  const changeDialogVisibility = useAppStore(
    (state) => state.changeDialogVisibility
  );

  const mainLinks = [
    {
      name: "Plik",
      sublinks: [
        { name: "Strona główna", href: "/" },
        { name: "About", href: "/about" },
      ],
    },
    {
      name: "Portfel",
      sublinks: [{ name: "Lista portfeli", href: "/wallet" }],
    },
  ];

  return (
    <Menubar.Root
      value={value}
      onValueChange={setValue}
      className={styles.menubarRoot}
    >
      {mainLinks.map((mainLink) => {
        return (
          <Menubar.Menu key={mainLink.name}>
            <Menubar.Trigger className={styles.menubarTrigger}>
              {mainLink.name}
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content
                className={styles.menubarContent}
                align="start"
                sideOffset={5}
                alignOffset={-3}
              >
                {mainLink.sublinks.map((link) => {
                  return (
                    <Menubar.Item
                      key={link.name}
                      className={styles.menubarItem}
                    >
                      <Link href={link.href} onClick={closeNavMenu}>
                        {link.name}
                      </Link>
                      <Menubar.Separator className={styles.menubarSeparator} />
                    </Menubar.Item>
                  );
                })}
                <Menubar.Item className={styles.menubarItem}>
                  <span
                    onClick={() => {
                      closeNavMenu;
                      changeDialogVisibility(true);
                    }}
                  >
                    Nowy Portfel
                  </span>
                  <Menubar.Separator className={styles.menubarSeparator} />
                </Menubar.Item>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
        );
      })}
      <Menubar.Menu>
        <Link href={"/watchlist"} className={styles.menubarTrigger}>
          Lista obserwowanych
        </Link>
        <Menubar.Portal>
          <Menubar.Content
            className={styles.menubarContent}
            align="start"
            sideOffset={5}
            alignOffset={-3}
          ></Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default NavMenu;
