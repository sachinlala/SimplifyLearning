package com.sl.algorithms.core.utils;

import java.util.Objects;

/**
 * General purpose Pair object.
 */
public class Pair<L, R> {

  public L left;
  public R right;

  public Pair(L _left, R _right) {
    left = _left;
    right = _right;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Pair<?, ?> pair = (Pair<?, ?>) o;
    return Objects.equals(left, pair.left) &&
        Objects.equals(right, pair.right);
  }

  @Override
  public int hashCode() {
    return Objects.hash(left, right);
  }

  @Override
  public String toString() {
    return new StringBuilder()
        .append("{ ")
        .append("Left:").append(left)
        .append("; ")
        .append("Right:").append(right)
        .append(" }").toString();
  }
}
