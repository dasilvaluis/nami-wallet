import {
  SENDER,
  TARGET,
} from '../config/config';

/**
 * @param {unknown} eventData 
 * @param {string} eventType 
 */
function isEventOfType(eventData, eventType) {
  const dataIsTruthy = eventData !== null && typeof eventData === 'object';

  return dataIsTruthy &&
    eventData.target && eventData.target === TARGET &&
    eventData.event && eventData.event === eventType &&
    eventData.sender && eventData.sender === SENDER.extension;
}

/**
 * @param {Function} callback 
 * @param {string} eventType 
 */
export function eventListenerManager(callback, eventType) {
  const responseHandler = (e) => {
    const response = e.data;

    if (isEventOfType(response, eventType)) {
      callback(response.data);
    }
  }

  window.addEventListener('message', responseHandler);

  return {
    remove: () => {
      window.removeEventListener('message', responseHandler);
    },
  };
}
