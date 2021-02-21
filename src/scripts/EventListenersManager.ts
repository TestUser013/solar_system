import { ListenerEventMap, Listener } from './SolarSystemInterfaces';

export class EventListenersManager {

    private eventMapObject: ListenerEventMap = {};

    public addEventListener(event: keyof DocumentEventMap, listener: Listener<keyof DocumentEventMap>): void {
        if (!this.eventMapObject[event]) {
            this.eventMapObject[event] = {
                eventListenerFunction: this.callSubscribers.bind(this, event),
                listeners: [],
            };
            document.addEventListener(event, this.eventMapObject[event].eventListenerFunction);
        }
        if (this.findListenerIndex(event, listener.subscriber) === -1) {
            this.eventMapObject[event].listeners.push(listener);
        }
    }

    public removeEventListener(event: keyof DocumentEventMap, subscriber: string): void {
        const index: number = this.findListenerIndex(event, subscriber);
        if (index !== -1) {
            this.eventMapObject[event].listeners.splice(index, 1);
        }
        if (this.eventMapObject[event].listeners.length === 0) {
            document.removeEventListener(event, this.eventMapObject[event].eventListenerFunction);
            this.eventMapObject[event] = undefined;
        }
    }

    private callSubscribers<T extends keyof DocumentEventMap>(
        eventName: keyof DocumentEventMap,
        event: DocumentEventMap[T]
    ): void {
        this.eventMapObject[eventName].listeners.forEach((subscriber: Listener<keyof DocumentEventMap>) => {
            subscriber.callback(event);
        });
    }

    private findListenerIndex(event: keyof DocumentEventMap, subscriber: string): number {
        if (!this.eventMapObject[event]) {
            return -1;
        }
        return this.eventMapObject[event].listeners
            .findIndex((listener: Listener) => listener.subscriber === subscriber);
    }

}
