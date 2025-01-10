import type { ThemeDefinition } from "vuetify";

export const staticPrimaryColor = "#652672";
export const staticPrimaryDarkenColor = "#471B50";

export const themes: Record<string, ThemeDefinition> = {
  light: {
    dark: false,
    colors: {
      primary: staticPrimaryColor,
      "on-primary": "#fff",
      "primary-darken-1": staticPrimaryDarkenColor,
      secondary: "#6D788D",
      "secondary-darken-1": "#626C7F",
      "on-secondary": "#fff",
      success: "#72E128",
      "success-darken-1": "#67CB24",
      "on-success": "#fff",
      info: "#26C6F9",
      "info-darken-1": "#22B3E1",
      "on-info": "#fff",
      warning: "#FDB528",
      "warning-darken-1": "#E4A324",
      "on-warning": "#fff",
      error: "#FF4D49",
      "error-darken-1": "#E64542",
      "on-error": "#fff",
      background: "#F7F7F9",
      "on-background": "#262B43",
      surface: "#fff",
      "on-surface": "#262B43",
      "grey-50": "#FAFAFA",
      "grey-100": "#F5F5F5",
      "grey-200": "#EEEEEE",
      "grey-300": "#E0E0E0",
      "grey-400": "#BDBDBD",
      "grey-500": "#9E9E9E",
      "grey-600": "#757575",
      "grey-700": "#616161",
      "grey-800": "#424242",
      "grey-900": "#212121",
      "perfect-scrollbar-thumb": "#dbdade",
      "skin-bordered-background": "#fff",
      "skin-bordered-surface": "#fff",
      "expansion-panel-text-custom-bg": "#fafafa",
      "track-bg": "#FAFAFD",
      "chat-bg": "#F7F6FA",
      "navbar-background": "#471B50",
      "navbar-item-color": "#FFFFFF",
      "navbar-section-color": "#A09BA1",
      black: "#000000",
    },

    variables: {
      "code-color": "#d400ff",
      "overlay-scrim-background": "#262B43",
      "tooltip-background": "#282A42",
      "overlay-scrim-opacity": 0.5,
      "hover-opacity": 0.06,
      "focus-opacity": 0.1,
      "selected-opacity": 0.08,
      "activated-opacity": 0.16,
      "pressed-opacity": 0.14,
      "dragged-opacity": 0.1,
      "disabled-opacity": 0.4,
      "border-color": "#262B43",
      "border-opacity": 0.12,
      "table-header-color": "#F5F5F7",
      "high-emphasis-opacity": 0.9,
      "medium-emphasis-opacity": 0.7,

      // 👉 shadows
      "shadow-key-umbra-color": "#262B43",
      "shadow-xs-opacity": "0.14",
      "shadow-sm-opacity": "0.16",
      "shadow-md-opacity": "0.16",
      "shadow-lg-opacity": "0.18",
      "shadow-xl-opacity": "0.18",
    },
  },

  dark: {
    dark: true,
    colors: {
      primary: staticPrimaryColor,
      "on-primary": "#fff",
      "primary-darken-1": staticPrimaryDarkenColor,
      secondary: "#6D788D",
      "secondary-darken-1": "#626C7F",
      "on-secondary": "#fff",
      success: "#72E128",
      "success-darken-1": "#67CB24",
      "on-success": "#fff",
      info: "#26C6F9",
      "info-darken-1": "#22B3E1",
      "on-info": "#fff",
      warning: "#FDB528",
      "warning-darken-1": "#E4A324",
      "on-warning": "#fff",
      error: "#FF4D49",
      "error-darken-1": "#E64542",
      "on-error": "#fff",
      background: "#282A42",
      "on-background": "#EAEAFF",
      surface: "#30334E",
      "on-surface": "#EAEAFF",
      "grey-50": "#2A2E42",
      "grey-100": "#2F3349",
      "grey-200": "#4A5072",
      "grey-300": "#5E6692",
      "grey-400": "#7983BB",
      "grey-500": "#8692D0",
      "grey-600": "#AAB3DE",
      "grey-700": "#B6BEE3",
      "grey-800": "#CFD3EC",
      "grey-900": "#E7E9F6",
      "perfect-scrollbar-thumb": "#4a5072",
      "skin-bordered-background": "#30334E",
      "skin-bordered-surface": "#30334E",
      "expansion-panel-text-custom-bg": "#333851",
      "track-bg": "#3C3F59",
      "chat-bg": "#343752",
      black: "#000000",
    },

    variables: {
      "code-color": "#d400ff",
      "overlay-scrim-background": "#101121",
      "tooltip-background": "#F5F5F5",
      "overlay-scrim-opacity": 0.6,
      "hover-opacity": 0.06,
      "focus-opacity": 0.1,
      "selected-opacity": 0.08,
      "activated-opacity": 0.16,
      "pressed-opacity": 0.14,
      "disabled-opacity": 0.4,
      "dragged-opacity": 0.1,
      "border-color": "#EAEAFF",
      "border-opacity": 0.12,
      "table-header-color": "#3A3E5B",
      "high-emphasis-opacity": 0.9,
      "medium-emphasis-opacity": 0.7,

      // 👉 Shadows
      "shadow-key-umbra-color": "#101121",
      "shadow-xs-opacity": "0.20",
      "shadow-sm-opacity": "0.24",
      "shadow-md-opacity": "0.26",
      "shadow-lg-opacity": "0.28",
      "shadow-xl-opacity": "0.30",
    },
  },
};

export default themes;
