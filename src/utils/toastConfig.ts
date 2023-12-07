import type { DefaultToastOptions } from "react-hot-toast";

const toastConfig: DefaultToastOptions = {
  style: {
    background: "var(--paper)",
    color: "var(--text)",
  },
  loading: {
    iconTheme: {
      primary: "var(--text)",
      secondary: "rgba(var(--text-channel), 0.42)",
    },
  },
  success: {
    iconTheme: {
      primary: "var(--success)",
      secondary: "var(--paper)",
    },
  },
  error: {
    iconTheme: {
      primary: "var(--error)",
      secondary: "var(--paper)",
    },
  },
};

export default toastConfig;
