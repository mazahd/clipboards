export function selectOnFocus(node: HTMLInputElement) {
  if (node && typeof node.select === "function") {
    // make sure node is defined and has a select() method
    const onFocus = () => node.select(); // event handler
    node.addEventListener("focus", onFocus); // when node gets focus call onFocus()
    return {
      destroy: () => node.removeEventListener("focus", onFocus), // this will be executed when the node is removed from the DOM
    };
  }
}


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

