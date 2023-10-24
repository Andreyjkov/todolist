import { EVENT_NAME } from '@/constants/eventName';

const subscribeEvent = (eventName: EVENT_NAME, listener: () => void) => {
  document.addEventListener(eventName, listener);
};

const unsubscribeEvent = (eventName: EVENT_NAME, listener: () => void) => {
  document.removeEventListener(eventName, listener);
};

const publishEvent = (eventName: EVENT_NAME) => {
  const event = new CustomEvent(eventName);
  document.dispatchEvent(event);
};

export const eventService = {
  subscribeEvent,
  unsubscribeEvent,
  publishEvent,
};
