package com.sl.algorithms.core.interfaces.search;

import com.sl.algorithms.core.interfaces.base.BaseInterface;

public interface NextGreaterElement extends BaseInterface {

  int NGE_NOT_FOUND = -1;

  int[] findNGE(int[] elements);
}
