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
        if(array.length == 0){
            return null;
        };

        var mid = Math.ceil(array.length/ 2);
        var node = new Node(array[mid - 1]);

        node.left = this.buildTree(array.slice(0,mid - 1))
        node.right = this.buildTree(array.slice(mid))
        return node
    }

    insert(value){
        this.root = this.insertHelper(value, this.root)
    }

    insertHelper(value, root){
        if(!root){
            let node = new Node(value);
            return node;
        }

        if(value > root.value){
            root.right = this.insertHelper(value, root.right)
        } else if (value < root.value) {
            root.left = this.insertHelper(value, root.left)
        } 

        return root;
    }

    delete(value, root = this.root){
        if(!root){
            return root;
        }

        if(value > root.value){
            root.right = this.delete(value, root.right)
        } else if (value < root.value) {
            root.left = this.delete(value, root.left)
        } else {
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;
            
            root.value = this.getMin(root.right);

            root.right = this.delete(root.value, root.right);
        }

        return root;
    }

    getMin(root){
        let min = root.value;
    
            while (root.left != null){
                min = root.left.value;
                root = root.left;
            }
        
        return min;
    }

    find(value){
        var temp = this.root;

        while(temp){
            if(value > temp.value){
                temp = temp.right;
            } else if (value < temp.value){
                temp = temp.left;
            } else {
                return temp;
            }
        }
    }

    levelOrder(arr =[], queue=[], root = this.root){
        if (!root) return;
        
        arr.push(root.value);

        queue.push(root.left);
        queue.push(root.right);

        while(queue.length){
            const level = queue[0];
            queue.shift();
            this.levelOrder(arr, queue, level)
        }
        return arr;
    }

    inorder(arr=[], root = this.root){
        if(root == null) return;

        this.inorder(arr,root.left)
        arr.push(root.value)
        this.inorder(arr, root.right)
        
        return arr;
    }

    preorder(arr=[], root = this.root){
        if(root == null) return;

        arr.push(root.value)
        this.preorder(arr, root.left)
        this.preorder(arr, root.right)

        return arr;
    }

    postorder(arr=[], root = this.root){
        if (!root) return;
        
        this.postorder(arr, root.left)
        this.postorder(arr, root.right)
        arr.push(root.value)

        return arr;
    }

    height(node, count=0){
        var max = 0;

        var count = 0;

    }
    
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

var tree = new Tree([5,4,6,8,97,3,85])
tree.insert(1)
tree.insert(2)
tree.insert(4)
tree.insert(5)
tree.insert(3)
tree.insert(6)
tree.insert(1)
tree.insert(1)
tree.insert(1)
tree.delete(5);
console.log(tree.postorder())

prettyPrint(tree.root)