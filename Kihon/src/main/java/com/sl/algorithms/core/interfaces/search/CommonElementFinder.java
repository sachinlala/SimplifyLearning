package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

import java.util.List;

public interface CommonElementFinder<T extends Comparable> extends BaseInterface<T> {

    List<T> findCommonList(List<T> A, List<T> B);
}
