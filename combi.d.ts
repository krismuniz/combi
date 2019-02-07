export type Callback = (shortcut: string, event: KeyboardEvent) => void;

export type EventHandler = (event: KeyboardEvent) => void;

declare const combi: (callback: Callback, preventDefault?: boolean) => EventHandler;

export default combi;
