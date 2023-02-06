class TrieNode {
  key: string | null;
  parent: TrieNode | null;
  children: {[key: string]: TrieNode};
  isValidWord: boolean;

  constructor(key: string | null) {
    this.key = key;
    this.parent = null;
    this.children = {};
    this.isValidWord = false;
  }

  // For testing purposes, remove later
  getWord() {
    const ret: (string | null)[] = [];
    let currNode: TrieNode | null = this;

    while (currNode !== null) {
      ret.unshift(currNode.key);
      currNode = currNode.parent;
    }

    return ret.join('');
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word: string) {
    let currNode: TrieNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const char: string = word[i];
      if (!currNode.children[char]) {
        currNode.children[char] = new TrieNode(char);
        currNode.children[char].parent = currNode;
      }
      currNode = currNode.children[char];
      if (i >= word.length - 1) {
        currNode.isValidWord = true;
      }
    }
  }

  // For testing purposes, remove later
  contains(word: string): boolean {
    let currNode: TrieNode = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (char in currNode.children) {
        currNode = currNode.children[char];
      } else {
        return false;
      }
    }
    return currNode.isValidWord;
  }
}

export {TrieNode, Trie};
