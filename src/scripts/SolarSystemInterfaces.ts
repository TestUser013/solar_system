export interface AnimationsRequest {
    subscriber: string;
    callback: () => void;
}

export type ListenerEventMap = {
    [T in keyof DocumentEventMap]?: {
        listeners: Listener<T>[];
        eventListenerFunction: (event: DocumentEventMap[T]) => void;
    };
}

export interface Listener<T extends keyof DocumentEventMap> {
    subscriber: string;
    callback: (event: DocumentEventMap[T]) => void;
}
