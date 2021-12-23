import { eventListenerManager } from "../../../api/eventsManager";
import { SENDER, TARGET } from "../../../config/config";

const eventType = 'mock-event';

const mockEventData = {
  data: 'mock-data',
  target: TARGET,
  event: eventType,
  sender: SENDER.extension,
};

describe('eventListenerManager', () => {
  let event;
  let eventHandler = { remove: () => {} };
  const mockFn = jest.fn();

  beforeEach(() => {
    event = new Event('message');
    mockFn.mockReset();
    eventHandler.remove();
    eventHandler = eventListenerManager(mockFn, eventType);
  });

  test('calls given callback with emitted data', () => {
    event.data = mockEventData

    window.dispatchEvent(event);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('mock-data');
  });

  test('does not invoke given callback if data is null', () => {
    event.data = null; 

    window.dispatchEvent(event);

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('does not invoke given callback if data is empty object', () => {
    event.data = {}; 

    window.dispatchEvent(event);

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('does not invoke given callback if target does not match', () => {
    event.data = {
      ...mockEventData,
      target: 'fake-target',
    };

    window.dispatchEvent(event);

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('does not invoke given callback if sender does not match', () => {
    event.data = {
      ...mockEventData,
      sender: 'fake-sender',
    };

    window.dispatchEvent(event);

    expect(mockFn).not.toHaveBeenCalled();
  });

  test('does not invoke given callback if event is not match', () => {
    event.data = {
      ...mockEventData,
      event: 'non-matching-event',
    };

    window.dispatchEvent(event);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
