package com.sl.algorithms.core.utils;

import com.sl.algorithms.core.interfaces.sort.SortingEngine;
import com.sl.algorithms.core.list.ListNode;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Deque;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.TreeMap;

public class ScratchArea {

  public static void main(String[] args) {
    Map<Integer, Integer> countMap = new HashMap<>();
    for (Map.Entry<Integer, Integer> entry : countMap.entrySet()) {
      entry.getKey();
      entry.getValue();
    }
    System.out.println(10 | 1);
    System.out.println(5 | 1);
    System.out.println(4 | 1);
    System.out.println(3 | 1);
    System.out.println(2 | 1);
    System.out.println(1 | 1);
    System.out.println(0 | 1);
    List<Integer> aList = new ArrayList<>();

    Queue<Integer> queue = new LinkedList<>();
    queue.offer(1);
    queue.poll();

    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(10);
    stack.pop();

    Map<Character, Integer> frequencyMap = new LinkedHashMap<>();
    for (Map.Entry entry : frequencyMap.entrySet()) {
    }
    frequencyMap.getOrDefault('a', 2);

    Map<Character, Integer> sortedMap = new TreeMap<>(new Comparator<Character>() {
      @Override
      public int compare(Character o1, Character o2) {
        return 0;
      }
    });
    for (Map.Entry entry : sortedMap.entrySet()) {
    }

    Queue<Map.Entry<Character, Integer>> pq = new PriorityQueue<>(
        new Comparator<Map.Entry<Character, Integer>>() {
          @Override
          public int compare(Map.Entry<Character, Integer> o1, Map.Entry<Character, Integer> o2) {
            return 0;
          }
        });
    pq.addAll(frequencyMap.entrySet());

    StringBuilder sb = new StringBuilder();
    String a = "ababab";
    int presence = a.indexOf("x");
    String b = a.substring(1);

    List<Integer> list = new ArrayList<>(Arrays.asList(1, 2));
  }

  enum Singleton implements SortingEngine {
    INSTANCE {
      @Override
      public void sort(Comparable[] objects) {
        return;
      }

      @Override
      public ListNode sortList(ListNode head) {
        return null;
      }
    };

  }
}
