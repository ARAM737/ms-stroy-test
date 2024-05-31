import { TypeId } from './types';

export interface ITreeItem {
    id: TypeId,
    parent: TypeId,
    type?: any,
}

export interface ITreeData {
    [key: string]: ITreeItem,
}

export interface ITreeChildren {
    [id: TypeId]: TypeId[],
}