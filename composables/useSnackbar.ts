const allowedColors = {
  primary: "primary",
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
} as const;
type SnackbarColor = keyof typeof allowedColors;
export const useSnackbar = () => {
  const isSnackbarVisible = useState(() => false);
  const snackMessage = useState(() => "");
  const snackColor = useState<SnackbarColor>("primary");

  const sendSnackbar = (msg: string, color: SnackbarColor = "primary") => {
    isSnackbarVisible.value = true;
    snackColor.value = allowedColors[color];
    snackMessage.value = msg;
  };
  const setVisible = (visible: boolean) => {
    isSnackbarVisible.value = visible;
  };

  return {
    isSnackbarVisible,
    snackMessage,
    snackColor,
    sendSnackbar,
    setVisible,
  };
};
