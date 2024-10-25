class TrieNode {
  value: string;
  wordEnd: boolean;
  children: Map<string, null | TrieNode>;
  originalWord: string;
  taskId: number | null;
  prevNode: TrieNode | null;

  constructor(value: string) {
    this.value = value;
    this.children = new Map();
    this.wordEnd = false;
    this.originalWord = "";
    this.taskId = null;
    this.prevNode = null;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode("");
  }

  addTask(word: string, id: number): void {
    let currentNode: TrieNode = this.root;
    let lowerCasedWord = word.toLowerCase();
    for (let char of lowerCasedWord) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode(char));
      }
      let nextNode = currentNode.children.get(char)!;
      nextNode.prevNode = currentNode;
      currentNode = nextNode;
    }
    currentNode.originalWord = word;
    currentNode.wordEnd = true;
    currentNode.taskId = id;
  }

  deleteTask(word: string): void {
    let currentNode: TrieNode | null = this.root;
    let lowerCasedWord = word.toLowerCase();
    for (let char of lowerCasedWord) {
      currentNode = currentNode?.children.get(char) ?? null;
      if (!currentNode) {
        return;
      }
    }
    currentNode.wordEnd = false;
    currentNode.originalWord = "";
    currentNode.taskId = null;
    if (!currentNode.children.size) {
      while (currentNode?.prevNode) {
        let prevNode: TrieNode = currentNode.prevNode;
        prevNode?.children.delete(currentNode.value);
        currentNode.prevNode = null;
        currentNode = prevNode;
      }
    }
  }

  search(prefix: string): { taskName: string; taskId: number }[] {
    if (!prefix) return [];
    const result: { taskName: string; taskId: number }[] = [];
    let currentNode: TrieNode | null = this.root;
    let lowerCasedPrefix = prefix.toLowerCase();

    //// Getting last node of prefix:
    for (let char of lowerCasedPrefix) {
      currentNode = currentNode?.children.get(char) ?? null;
      if (!currentNode) {
        return result;
      }
    }

    if (currentNode.children.size) {
      this.getWords(currentNode, result);
    }

    return result;
  }

  private getWords(
    node: TrieNode | null,
    result: { taskName: string; taskId: number }[]
  ): void {
    if (node && node?.originalWord && node.wordEnd) {
      result.push({ taskName: node.originalWord, taskId: node.taskId! });
    }

    if (node) {
      for (let childNode of Array.from(node?.children?.values())) {
        this.getWords(childNode, result);
      }
    }
  }
}
