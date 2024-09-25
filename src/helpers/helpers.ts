/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const stripHTMLTags = (str: string) => str.replace(/<[^>]*>/g, '');

export const decodeHtmlEntities = (str: string) => {
  const entities = {
      '&#039;': "'",
      '&quot;': '"',
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>'
  };

  // @ts-ignore
  return str.replace(/&#039;|&quot;|&amp;|&lt;|&gt;/g, match => entities[match]);
}

export const LSsetItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const LSgetItem = (key: string) => {
  // @ts-ignore
  return JSON.parse(localStorage.getItem(key));
}
