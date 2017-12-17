package com.sl.algorithms.core.nonlinear;

/**
 * <a href="https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/trees.html">CMU</a><br>
 * <a href="http://cslibrary.stanford.edu/110/BinaryTrees.html">Stanford</a><br>
 */
public class BTreeOps {

    BTreeOps() {
        /**
         * This is a utility class.<br>
         */
    }

    public static int countNodes(TreeNode<?> root) {
        if (root == null) {
            return 0; // base case
        }
        return 1 + countNodes(root.left) + countNodes(root.right);
    }

    public static int computeHeight(TreeNode<?> root) {
        if (root == null) return 0; // base case
        return 1 + Math.max(computeHeight(root.left), computeHeight(root.right));
    }

    public static String printTree(TreeNode<?> root) {
        StringBuilder output = new StringBuilder("[");
        output.append(nodeAsString(root));
        output.append("]");
        return output.toString();
    }

    /**
     * Pre-Order traversal<br>
     */
    private static String nodeAsString(TreeNode<?> root) {
        if (root == null) return ""; // base case
        StringBuilder str = new StringBuilder();
        str.append(root.value);
        str.append(nodeAsString(root.left));
        str.append(nodeAsString(root.right));
        return str.toString();
    }

    public static boolean isBST(TreeNode<Integer> root) {
        return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private static boolean isValidBST(TreeNode<Integer> root, long min, long max) {
        if (root == null) return true; // base condition
        if (root.value >= max || root.value <= min) return false;
        return isValidBST(root.left, min, root.value) && isValidBST(root.right, root.value, max);
    }
}
