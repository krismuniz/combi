export declare type Callback = (shortcut: string, event: KeyboardEvent) => void;
export default function (cb: Callback, preventDefault?: boolean): (e: KeyboardEvent) => void;
