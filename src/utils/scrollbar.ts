export const toggleScrollbar = (open: boolean): void => {
  const root: HTMLElement | null = document.querySelector(":root");

  if (root) {
    const prev = parseInt(
      getComputedStyle(root).getPropertyValue("--modal-count")
    );
    const newValue = prev + (open ? 1 : -1);
    if (newValue < 0) return;

    root.style.setProperty("--modal-count", String(newValue));
    const body = document.querySelector("body");
    if (body) {
      body.style.overflowY = newValue === 0 ? "visible" : "hidden";
    }
  }
};

export const hideScrollbar = () => toggleScrollbar(true);
export const showScrollbar = () => toggleScrollbar(false);
