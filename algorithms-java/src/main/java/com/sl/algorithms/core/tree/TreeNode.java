package com.sl.algorithms.core.tree;

/**
 * Basic representation of a Binary Tree node.<br>
 *
 * @param <T> extends {@link Comparable}
 */
public class TreeNode<T extends Comparable> {

  /**
   * Direct public access for this project only (as it's not a service/app).<br>
   */
  public T data;
  public TreeNode<T> left;
  public TreeNode<T> right;

  public TreeNode(final T _data) {
    data = _data;
  }
}
