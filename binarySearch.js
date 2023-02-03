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

    insert(value){
        var newNode = new Node(value)
        var root = this.root;


        this.root = this.insertHelper(root, newNode);
    }

    insertHelper(root, node){
        if (root == null){
            return node;
        };

        if (root.value == node.value){
            return root;
        } else if (root.value > node.value){
            root.left = this.insertHelper(root.left, node);
        } else if (root.value < node.value){
            root.right = this.insertHelper(root.right, node);
        }

        return root;
    }

    delete(value){
        let root = this.root;

        this.root = this.deleteHelper(root, value)
            // 1 child
            // no child
            // multi child
    }
    

    deleteHelper(root, target){
        if (root == null) return root;

        if (root.value > target){
            root.left = this.deleteHelper(root.left, target);
        } else if (root.value < target){
            root.right = this.deleteHelper(root.right, target);
        }

        else {
            if(!root.left){
                return root.right;
            } else if (!root.right){
                return root.left;
            }

            var newItem = this.minFinder(root.right);
            root.value = newItem.value;
            root.right = this.deleteHelper(root.right, root.key);
        }

        return root;
    }

    minFinder(root){
        while(root.left){
            root = root.left;
        }

        return root;
    }

    
}

let test = new Tree([3,2,234,23,243,44,21,500])

test.insert(54);
test.insert(55);
test.insert(56);
test.insert(53);
test.delete(54);
test.prettyPrint();