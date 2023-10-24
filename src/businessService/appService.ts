import { eventService } from './eventService';
import { EVENT_NAME } from '@/constants/eventName';

let appState = {
  forbidden: false,
};

const getIsForbidden = (): boolean => {
  return appState.forbidden;
};

const setIsForbidden = (IsForbidden: boolean) => {
  appState = { ...appState, forbidden: IsForbidden };
  eventService.publishEvent(EVENT_NAME.UPDATE_APP);
};

export const appService = {
  getIsForbidden,
  setIsForbidden,
};
