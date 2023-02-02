class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class Tree{
    constructor(array){
        this.array = [... new Set(array.sort((a,b) => a - b))];
        this.root = this.buildTree(array);
    }

    buildTree(array){
        if (array.length == 0) return null;
    

        let mid = Math.floor(array.length / 2);

        let treeNode = new Node(array[mid]);;
        treeNode.left = this.buildTree(array.slice(0,mid));
        treeNode.right = this.buildTree(array.slice(mid + 1));

        return treeNode;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node.right) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '|   ' : '    '}`, false)
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '|   '}`, true)
        }
      }

}

let test = new Tree([3,2,234,23,243,44,21,500])

test.prettyPrint();