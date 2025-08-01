package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;
import com.sl.algorithms.core.tree.TreeNode;

/**
 * <br><a href="https://en.wikipedia.org/wiki/Lowest_common_ancestor">LCA Definition</a><br> <br><a
 * href="https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/">Problem
 * Statement</a><br>
 */
public interface LowestCommonAncestor<T extends Comparable> extends BaseInterface<T> {

  TreeNode<T> findLCA(TreeNode<T> root, TreeNode<T> p, TreeNode<T> q);

  TreeNode<T> findLCABST(TreeNode<T> root, TreeNode<T> p, TreeNode<T> q);
}
