"use client";

import React from "react";

export const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  targetId: string
) => {
  e.preventDefault();
  const element = document.getElementById(targetId.replace("#", ""));
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
