import findIndex from 'lodash.findindex';

import {
  IInternalItem,
  IItem,
  isInternalItem,
} from '../types/Item';

export class Navigation {
  navigation: any;
  flattenedNav: any;

  constructor(navigation: any) {
    this.flattenedNav = this.flattenTree(navigation);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flattenDeep(arr: any[]) : any[] {
    return Array.isArray(arr)
      ? arr.reduce( (a, b) => a.concat(this.flattenDeep(b)) , [])
      : [
        arr,
      ];
  }

  flattenTree(tree: IItem[]) : IInternalItem[] {
    return this.flattenDeep(
      tree.map((node: IItem) => {
        if (!isInternalItem(node)) {
          return [];
        }

        return [
          node,
          ...(node.items ? this.flattenTree(node?.items) : []),
          ...(
            node.secondaryItems
              ? this.flattenTree(node?.secondaryItems)
              :  []
          ),
        ];
      }));
  }

  findNodeIndex(currentPath: string): number {
    return findIndex(
      this.flattenedNav,
      (item: IInternalItem) => item.to === currentPath.replace(/\/$/, '')
    );
  }

  getPreviousPage(currentPath: string): void | IInternalItem {
    const nodeIndex = this.findNodeIndex(currentPath);

    if (this.flattenedNav[nodeIndex - 1]) {
      return this.flattenedNav[nodeIndex - 1];
    }
  }

  getNextPage = (currentPath: string): void | IInternalItem => {
    const nodeIndex = this.findNodeIndex(currentPath);

    if (this.flattenedNav[nodeIndex + 1]) {
      return this.flattenedNav[nodeIndex + 1];
    }
  };
}
