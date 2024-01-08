import type { ThemeDefinition } from "vuetify";

// String that represents the name of the theme I am using
export const MAIN_THEME = "mainTheme";
// Light mode theme
export const mainTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#052158",
    secondary: "#444444",
    accent: '#c2a925',
    success: "#6cc822",
    error: '#de0000',
    info: '#2196F3',
    warning: "#F44336",
    white: "#fff",
    caution: "#ffb40a",
    loginText: "#000929",
    cautionButton: "#FFB300",
    line: "#d9d9d9",
    inputsBackground: "#f0f0f0",
    normalText: "#000000",
    customBlue: "#003143",
    background: "#f7f7f7",
    sidebarPrimary: "#2c2e2e",
    sidebarDetail1: "#363838",
    sidebarDetail2: "#3e4040",
    sidebarDetail3: "#454747",
    sidebarDetail4: "#4a4c4c",
    sidebarText: "#FFFFFF",
    sidebarTextActive: "#000000",
    inputBackground:"e6e9ee"
  },
};

// String that represents the name of the dark theme I am using
export const MAIN_DARK_THEME = "mainDarkTheme";
// Dark mode theme
export const mainDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#0C111B",
    surface: "#111827",
    primary: "#0C111B",
    secondary: '#E91E63',
    sidebarText:"#FFFFFF",
    sidebarTextActive: "#000000",
    error: "#ef4444",
    info: "#3b82f6",
    success: "#22c55e",
    warning: "#f59e0b",
    inputBackground:"#263350"
  },
};
