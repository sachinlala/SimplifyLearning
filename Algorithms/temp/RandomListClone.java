package algorithms;

/**
 * Definition for singly-linked list with a random pointer.
 */
public class RandomListClone {
    public RandomListNode copyRandomList(RandomListNode head) {
        // 1. insert copy in interleaved fashion
        // 2. find the random pointers for new nodes
        // 3. separate the 2 lists

        if (head == null) {
            return null;
        }

        RandomListNode nCurr = head;
        while (nCurr != null) {
            RandomListNode temp = new RandomListNode(nCurr.label);
            temp.next = nCurr.next;
            nCurr.next = temp;
            nCurr = nCurr.next.next;
        }

        nCurr = head;
        while (nCurr != null) {
            if (nCurr.random != null) {
                nCurr.next.random = nCurr.random.next;
            } else {
                nCurr.next.random = null;
            }
            nCurr = nCurr.next.next;
        }

        RandomListNode copy = head.next;
        nCurr = head;
        while (nCurr.next != null) {
            RandomListNode temp = nCurr.next;
            nCurr.next = nCurr.next.next;
            nCurr = temp;
        }

        return copy;
    }
}

class RandomListNode {
    int label;
    RandomListNode next, random;

    RandomListNode(int x) {
        this.label = x;
    }
};
