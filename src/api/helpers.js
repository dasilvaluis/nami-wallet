export const getCurrentUrl = async () => new Promise((resolve) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true },
    (tabs) => resolve(tabs[0]?.url)
  );
});

export const reduceUrlToHost = (url) => {
  const noProtocol = /https?:\/\//.test(url)
    ? url.split('//')[1]
    : url;

  const onlyBase = noProtocol.split('/')[0]

  return onlyBase;
}
