package com.sl.algorithms.core.utils;

import java.util.*;

public class ScratchArea {
    public static void main(String[] args) {
        Map<Integer, Integer> countMap = new HashMap<>();
        for (Map.Entry<Integer, Integer> entry : countMap.entrySet()) {
            entry.getKey();
            entry.getValue();
        }
        System.out.println(10|1);
        System.out.println(5|1);
        System.out.println(4|1);
        System.out.println(3|1);
        System.out.println(2|1);
        System.out.println(1|1);
        System.out.println(0|1);
        List<Integer> aList = new ArrayList<>();

        Queue<Integer> queue = new LinkedList<>();
        queue.offer(1);
        queue.poll();

        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(10);
        stack.pop();
    }
}
