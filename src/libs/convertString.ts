
export const convertLinesToParagraphs = (text: string) => {
  text = text.replace(/\r\n/g,"\n");
  const paragraphs = text.split("\n");
  const newParagraphs = paragraphs.map((paragraph) => {
    return `<p>${paragraph}</p>`;
  }).join('');
  console.log(newParagraphs);
  return newParagraphs;
}
