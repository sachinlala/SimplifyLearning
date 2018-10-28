package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface MajorityFinder<T extends Comparable> extends BaseInterface<T> {

  T findMajorityElement(T[] candidates);

  boolean isMajority(T[] candidates, T majorityElement);
}
