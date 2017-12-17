package com.sl.algorithms.core.nonlinear;

import com.sl.algorithms.core.linear.ListNode;

/**
 * <a href="https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/trees.html">CMU</a><br>
 * <a href="http://cslibrary.stanford.edu/110/BinaryTrees.html">Stanford</a><br>
 */
public class BSTOps extends BTreeOps {

    BSTOps() {
        /**
         * This is a utility class.<br>
         */
    }


    /**
     * <a href="https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/">Convert Sorted Array to BST</a>
     * // Root = midPoint
     * // O(n) time and O(1) space
     */
    public static TreeNode<Integer> createBSTFromSortedArray(int[] sortedNums) {
        if (sortedNums == null || sortedNums.length == 0) {
            return null;
        }
        return createBSTFromArray(sortedNums, 0, sortedNums.length - 1);
    }

    private static TreeNode<Integer> createBSTFromArray(int[] sortedNums, int start, int end) {
        if (start > end) {
            return null; // base case
        }
        int midPoint = start + (end-start) / 2;
        TreeNode<Integer> root = new TreeNode<>(sortedNums[midPoint]);
        root.left = createBSTFromArray(sortedNums, start, midPoint - 1); //left sub-tree
        root.right = createBSTFromArray(sortedNums, midPoint + 1, end); // right sub-tree
        return root;
    }

    /**
     * <a href="https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/description/">Convert Sorted List to BST</a>
     * // Root = midPoint
     * // O(n) time and O(1) space
     */
    public static TreeNode<Integer> createBSTFromSortedList(ListNode<Integer> head) {
        if (head == null) return null;
        return createBSTFromList(head, null);
    }

    private static TreeNode<Integer> createBSTFromList(ListNode<Integer> head, ListNode<Integer> tail) {
        if (head == tail) return null; // base case
        ListNode<Integer> slow=head, fast=head;
        while (fast != tail && fast.next != tail) {
            slow = slow.next;
            fast = fast.next.next;
        }
        TreeNode<Integer> root = new TreeNode<>(slow.data);
        root.left = createBSTFromList(head, slow);
        root.right = createBSTFromList(slow.next, tail);
        return root;
    }

    public static int[] convertToSortedArray(TreeNode<Integer> bstNode) {
        if (bstNode == null) {
            return new int[]{};
        }
        int[] sortedNums = new int[countNodes(bstNode)];
        toSortedArray(bstNode, sortedNums, 0);
        return sortedNums;
    }

    /**
     * In-order traversal.<br>
     */
    private static int toSortedArray(TreeNode<Integer> bstNode, int[] sortedNums, int index) {
        if (bstNode != null && index < sortedNums.length) {
            if (bstNode.left != null) {
                index = toSortedArray(bstNode.left, sortedNums, index);
            }
            sortedNums[index] = bstNode.value;
            index++;
            if (bstNode.right != null) {
                index = toSortedArray(bstNode.right, sortedNums, index);
            }
        }
        return index;
    }

    public static TreeNode<Integer> findNode(TreeNode<Integer> root, int value) {
        if (root == null || root.value == value) return root;
        if (root.value < value) return findNode(root.right, value);
        return findNode(root.left, value); //if (root.value > value)
    }

    public static TreeNode<Integer> findMinimum(TreeNode<Integer> root) {
        if (root == null) throw new IllegalArgumentException("Tree is empty");
        if (root.left == null) return root;
        return findMinimum(root.left);
    }

    public static TreeNode<Integer> findMaximum(TreeNode<Integer> root) {
        if (root == null) throw new IllegalArgumentException("Tree is empty");
        if (root.right == null) return root;
        return findMaximum(root.right);
    }

    // add a node
    public static TreeNode<Integer> addNodeIteratively(TreeNode<Integer> root, int value ) {
        TreeNode<Integer> newNode = new TreeNode<>(value);
        if (root == null) return newNode;
        TreeNode<Integer> parent=null, current=root;
        while (current != null) {
            parent = current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (parent.value < value) {
            parent.right = newNode;
        } else {
            parent.left = newNode;
        }
        return root;
    }

    //O(n) worst case, O(log(n)) average case
    public static TreeNode<Integer> addNode(TreeNode<Integer> root, int value ) {
        TreeNode<Integer> newNode = new TreeNode<>(value);
        if (root == null) return newNode;
        if (root.value < value) {
            root.right = addNode(root.right, value);
        } else {
            root.left = addNode(root.left, value);
        }
        return root;
    }

    /**
     * <a href="https://discuss.leetcode.com/topic/65792/recursive-easy-to-understand-java-solution">Remove Node</a>
     * <br>// find node and then remove => re-adjust tree if needed
     * <br>// value may just match the root, so let's handle that case first
     */
    public static TreeNode<Integer> removeNode(TreeNode<Integer> root, int value ) {
        if (root == null) return null;
        if (value == root.value) {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TreeNode<Integer> minNode = findMinimum(root.right);
            root.value = minNode.value;
            root.right = removeNode(root.right, root.value);
        }
        if (value < root.value) root.left = removeNode(root.left, value);
        if (value > root.value) root.right = removeNode(root.right, value);
        return root;
    }

    //TODO
    // find LCA
    public static TreeNode<Integer> findLCA(TreeNode<Integer> root, int value1, int value2) {
        return null;
    }
}