package com.sl.algorithms.core.nonlinear;

import java.util.Objects;

/**
 * Basic representation for a tree node.<br>
 */
public class TreeNode<T> {
    T value;
    TreeNode<T> left, right;

    TreeNode(T _value) {
        value = _value;
        left = right = null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TreeNode<?> treeNode = (TreeNode<?>) o;
        return Objects.equals(value, treeNode.value) &&
                Objects.equals(left, treeNode.left) &&
                Objects.equals(right, treeNode.right);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value, left, right);
    }

    @Override
    public String toString() {
        StringBuilder output = new StringBuilder().append(value);
        if (left != null) output.append(left); // this implies a recursive call
        if (right != null) output.append(right); // this implies a recursive call
        return output.toString();
    }
}