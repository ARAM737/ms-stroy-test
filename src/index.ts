import { ITreeChildren, ITreeData, ITreeItem } from './interfaces';
import { TypeId } from './types';

export class TreeStore {
    private readonly items: ITreeItem[];
    private readonly data: ITreeData;
    private readonly children: ITreeChildren;

    constructor(items: ITreeItem[]) {
        const state: { data: ITreeData, children: ITreeChildren } = this.initChildrenAndData(items);
        this.items = items;
        this.data = state.data;
        this.children = state.children;
    }

    private initChildrenAndData(items: ITreeItem[]): { data: ITreeData, children: ITreeChildren } {
        const data: ITreeData = {};
        const children: ITreeChildren = {};
        items.map((item: ITreeItem) => {
            data[item.id] = item;
            if (!children[item.parent]) children[item.parent] = [];
            children[item.parent].push(item.id);
        });
        return { data, children };
    }

    public getAll(): ITreeItem[] {
        return this.items;
    }

    public getItem(id: TypeId): ITreeItem {
        return this.data[id];
    }

    public getChildren(id: TypeId): ITreeItem[] {
        return this.children[id]
            ? this.children[id].map((child: TypeId) => this.getItem(child))
            : [];
    }

    public getAllChildren(id: TypeId): ITreeItem[] {
        const children: ITreeItem[] = this.getChildren(id);
        children.forEach((child: ITreeItem) => {
            children.push(...this.getChildren(child.id));
        })
        return children;
    }

    public getAllParents(id: TypeId): ITreeItem[] {
        if (!id) return [];
        const parent: ITreeItem = this.getItem(this.getItem(id).parent);
        if (!parent) return [];
        return [parent, ...this.getAllParents(this.getItem(id).parent)];
    }
}