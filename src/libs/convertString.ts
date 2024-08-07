export const convertLinesToParagraphs = (text: string) => {
  text = text.replace(/\r\n/g, "\n");
  const paragraphs = text.split("\n");
  if (text === "") {
    return "";
  }
  const newParagraphs = paragraphs
    .map((paragraph) => {
      return `<p>${paragraph}</p>`;
    })
    .join("");
  return newParagraphs;
};

export const sanitaizeText = (text: string) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};
