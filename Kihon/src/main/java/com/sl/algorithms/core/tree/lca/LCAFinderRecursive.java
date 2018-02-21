package com.sl.algorithms.core.tree.lca;

import com.sl.algorithms.core.interfaces.search.LowestCommonAncestor;
import com.sl.algorithms.core.tree.TreeNode;

public class LCAFinderRecursive<T extends Comparable> implements LowestCommonAncestor<T> {
    @Override
    public TreeNode<T> findLCA(TreeNode<T> root, TreeNode<T> p, TreeNode<T> q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode<T> lNode = findLCA(root.left, p, q);
        TreeNode<T> rNode = findLCA(root.right, p, q);
        if (lNode != null && rNode != null) {
            return root;
        }
        if (lNode != null) {
            return lNode;
        }
        if (rNode != null) {
            return rNode;
        }
        return null;
    }
}
