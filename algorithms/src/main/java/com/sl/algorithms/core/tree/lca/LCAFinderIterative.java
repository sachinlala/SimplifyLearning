package com.sl.algorithms.core.tree.lca;

import com.sl.algorithms.core.interfaces.search.LowestCommonAncestor;
import com.sl.algorithms.core.tree.TreeNode;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public class LCAFinderIterative<T extends Comparable> implements LowestCommonAncestor<T> {

  @Override
  public TreeNode<T> findLCA(TreeNode<T> root, TreeNode<T> p, TreeNode<T> q) {
    if (root == null || root == p || root == q) {
      return root;
    }

    Map<TreeNode<T>, TreeNode<T>> parentMap = new HashMap<>();
    Queue<TreeNode<T>> queue = new LinkedList<>();

    parentMap.put(root, null);
    queue.offer(root);

    while (!parentMap.containsKey(p) || !parentMap.containsKey(q)) {
      TreeNode<T> node = queue.poll();
      if (node.left != null) {
        parentMap.put(node.left, node);
        queue.offer(node.left);
      }
      if (node.right != null) {
        parentMap.put(node.right, node);
        queue.offer(node.right);
      }
    }

    Set<TreeNode<T>> ancestors = new HashSet<>();
    while (p != null) {
      ancestors.add(p);
      p = parentMap.get(p);
    }
    while (!ancestors.contains(q)) {
      q = parentMap.get(q);
    }
    return q;
  }

  @SuppressWarnings("unchecked")
  @Override
  public TreeNode<T> findLCABST(TreeNode<T> root, TreeNode<T> p, TreeNode<T> q) {
    while (root != null) {
      if (root.data.compareTo(p.data) < 0 && root.data.compareTo(q.data) < 0) {
        root = root.right;
      } else if (root.data.compareTo(p.data) > 0 && root.data.compareTo(q.data) > 0) {
        root = root.left;
      } else {
        break;
      }
    }
    return root;
  }
}
