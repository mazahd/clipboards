export const getSelectedText = (): string => {
  const element = document.activeElement as HTMLElement;
  const isInTextField = element.tagName === "INPUT" || element.tagName === "TEXTAREA";
  const selectedText = isInTextField
    ? (element as HTMLInputElement | HTMLTextAreaElement).value.substring(
        (element as HTMLInputElement | HTMLTextAreaElement).selectionStart,
        (element as HTMLInputElement | HTMLTextAreaElement).selectionEnd
      )
    : window.getSelection()?.toString() ?? "";
  return selectedText;
};
