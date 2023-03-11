class Node{
    constructor(value){
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class Tree{
    constructor(arr){
        this.array = [...new Set(arr.sort((a, b) => a - b))];
        this.root = this.buildTree(this.array);
    }

    buildTree(array = this.array){
        if(array.length == 0){
            return null;
        };

        var mid = Math.floor(array.length/ 2);
        var node = new Node(array[mid]);
        node.left = this.buildTree(array.slice(0,mid))
        node.right = this.buildTree(array.slice(mid + 1))
        return node;
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
        } else {
            return;
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

    height(node){
        if (!node){
            return 0;
        }
       
        return Math.max((this.height(node.right) + 1),(this.height(node.left) + 1))
    }

    depth(node){
        var root = this.root;
        var count = 0;
        while(root){
            if(node > root.value){
                root = root.right;
            } else if (node < root.value){
                root = root.left;
            } else {
                return count;
            }

            count +=1
        }

        return null;
    }

    isBalanced(root = this.root){
        var leftHeight = this.height(root.left);
        var rightHeight = this.height(root.right);
        if (Math.abs(leftHeight - rightHeight) > 1){
            return false;
        }

        return true;
    }

    rebalance(){
        var arr = this.inorder([],this.root);

        arr = [... new Set(arr.sort((a,b) => a - b))];
        this.root = this.buildTree(arr);
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

function randomArray(){
    return Array.from({length: Math.random() * 20}, () => Math.floor(Math.random() *100));
}

var newArr = randomArray();
var tree = new Tree(newArr);
prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());
tree.insert(234)
tree.insert(352)
tree.insert(231)
tree.insert(341)
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());
prettyPrint(tree.root);