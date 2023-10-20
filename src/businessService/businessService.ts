import { TODO_EVENT_NAME } from '@constants/eventTypes';

const subscribeEvent = (eventName: TODO_EVENT_NAME, listener: () => void) => {
  document.addEventListener(eventName, listener);
};

const unsubscribeEvent = (eventName: TODO_EVENT_NAME, listener: () => void) => {
  document.removeEventListener(eventName, listener);
};

const publishEvent = (eventName: TODO_EVENT_NAME) => {
  const event = new CustomEvent(eventName);
  document.dispatchEvent(event);
};

export const businessService = {
  subscribeEvent,
  unsubscribeEvent,
  publishEvent,
};
