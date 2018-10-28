package com.sl.algorithms.search.majorityelement;

import com.sl.algorithms.core.interfaces.search.MajorityFinder;

/**
 * <br><a href="https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm">Boyer
 * Moore Voting Algorithm</a><br> <br><p>Basic idea of the algorithm is if we cancel out each
 * occurrence of an element e with all the other elements that are different from e then e will
 * exist till end if it is a majority element.</p> Majority = n/2
 */
public class BoyerMooreVoting<T extends Comparable> implements MajorityFinder<T> {

  @Override
  public T findMajorityElement(T[] candidates) {
    checkArray(candidates);
    int majorityIndex = 0, count = 1;
    for (int i = 1; i < candidates.length; i++) {
      if (count == 0) {
        majorityIndex = i;
        count = 1;
      }
      if (candidates[i].equals(candidates[majorityIndex])) {
        count++;
      } else {
        count--;
      }
    }
    return candidates[majorityIndex];
  }

  @Override
  public boolean isMajority(T[] candidates, T majorityElement) {
    checkArray(candidates);
    int count = 0;
    for (T candidate : candidates) {
      if (candidate.equals(majorityElement)) {
        count++;
        if (count > candidates.length / 2) {
          return true;
        }
      }
    }
    return false;
  }
}
