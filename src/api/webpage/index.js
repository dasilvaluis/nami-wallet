import { EVENT, METHOD, SENDER, TARGET } from '../../config/config';
import { Messaging } from '../messaging';

export const getBalance = async () => {
  const result = await Messaging.sendToContent({ method: METHOD.getBalance });
  return result.data;
};

export const enable = async () => {
  const result = await Messaging.sendToContent({ method: METHOD.enable });
  return result.data;
};

export const isEnabled = async () => {
  const result = await Messaging.sendToContent({ method: METHOD.isEnabled });
  return result.data;
};

export const signData = async (address, payload) => {
  const result = await Messaging.sendToContent({
    method: METHOD.signData,
    data: { address, payload },
  });
  return result.data;
};

export const signTx = async (tx, partialSign = false) => {
  const result = await Messaging.sendToContent({
    method: METHOD.signTx,
    data: { tx, partialSign },
  });
  return result.data;
};

export const getAddress = async () => {
  const result = await Messaging.sendToContent({
    method: METHOD.getAddress,
  });
  return result.data;
};

export const getRewardAddress = async () => {
  const result = await Messaging.sendToContent({
    method: METHOD.getRewardAddress,
  });
  return result.data;
};

export const getNetworkId = async () => {
  const result = await Messaging.sendToContent({
    method: METHOD.getNetworkId,
  });
  return result.data;
};

export const getUtxos = async (amount = undefined, paginate = undefined) => {
  const result = await Messaging.sendToContent({
    method: METHOD.getUtxos,
    data: { amount, paginate },
  });
  return result.data;
};

export const getCollateral = async () => {
  const result = await Messaging.sendToContent({
    method: METHOD.getCollateral,
  });
  return result.data;
};

export const submitTx = async (tx) => {
  const result = await Messaging.sendToContent({
    method: METHOD.submitTx,
    data: tx,
  });
  return result.data;
};

export const on = (eventName, callback) => {
  const fn = (e) => callback(e.detail);
  Object.defineProperty(fn, 'name', { value: callback.name });
  window.cardano._events[eventName] = [
    ...(window.cardano._events[eventName] || []),
    fn,
  ];
  window.addEventListener(
    TARGET + eventName,
    window.cardano._events[eventName][
      window.cardano._events[eventName].length - 1
    ]
  );
};

export const removeListener = (eventName, callback) => {
  const fn = window.cardano._events[eventName].find(
    (f) => f.name == callback.name
  );
  if (!fn) return;
  const index = window.cardano._events[eventName].indexOf(fn);
  window.removeEventListener(
    TARGET + eventName,
    window.cardano._events[eventName][index]
  );
  window.cardano._events[eventName].splice(index, 1);
  if (window.cardano._events[eventName].length <= 0)
    delete window.cardano._events[eventName];
};
