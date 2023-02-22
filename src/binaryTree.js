import { BinaryTreeNode } from 'binary-tree-visualizer';

class Node {
  val;
  left;
  right;
  parent;

  constructor(data, left, right) {
    this.val = data;
    this.left = left;
    this.right = right;
  }

  *[Symbol.iterator]() {
    const queue = [this];
    while (queue.length !== 0) {
      const node = queue.shift();
      if (!node) {
        yield node;
        continue;
      }
      yield node.val;
      queue.push(node.left);
      queue.push(node.right);
    }
  }
}

class BinaryTree {
  drawRoot
  root;
  nodes = [];

  constructor(...values) {
    this.root = this.buildTree(values);
  }

  static from(values) {
    return new BinaryTree(...values);
  }

  buildTree(arr) {
    if (!Array.isArray(arr) || arr.length === 0 || arr[0] == null) {
      return null;
    }
    const root = new Node(arr[0]);
    this.drawRoot = new BinaryTreeNode(arr[0])
    const queue = [root];
    const drawQueue = [this.drawRoot]
    this.nodes = [root];
    let i = 1;
    while (i < arr.length) {
      const node = queue.shift();
      const drawNode = drawQueue.shift()
      const left = arr[i++];
      if (left == null) {
        node.left = null;
        this.nodes.push(null);
      } else {
        const leftNode = new Node(left);
        node.left = leftNode;
        leftNode.parent = node;
        queue.push(node.left);
        this.nodes.push(node.left);
        const drawLeftNode = new BinaryTreeNode(left)
        drawQueue.push(drawLeftNode)
        drawNode.setLeft(drawLeftNode)
      }
      const right = arr[i++];
      if (right == null) {
        node.right = null;
        this.nodes.push(null);
      } else {
        const rightNode = new Node(right);
        node.right = rightNode;
        rightNode.parent = node;
        queue.push(node.right);
        this.nodes.push(node.right);
        const drawRightNode = new BinaryTreeNode(right)
        drawNode.setRight(drawRightNode)
        drawQueue.push(drawRightNode)
      }
    }

    return root;
  }
}

BinaryTree.Node = Node;

export default BinaryTree;
