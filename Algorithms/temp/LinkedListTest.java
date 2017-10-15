package algorithms;

public class LinkedListTest {
    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4 };

        RandomListNode head = null;
        RandomListNode node = null;
        for (int i = 0; i < arr.length; i++) {
            if (head == null) {
                head = new RandomListNode(arr[i]);
                node = head;
            } else {
                node.next = new RandomListNode(arr[i]);
                node = node.next;
            }
        }

        node = head;
        while (node != null) {
            if (node.next == null) {
                node.random = head;
            }
            else if (node.next.next == null) {
                node.random = node;
            } else {
                node.random = node.next;
            }
            node = node.next;
        }

        node = head;
        while (node != null) {
            System.out.print(node.label);
            System.out.print(":");
            System.out.print(node.random.label);
            if (node.next != null) {
                System.out.print(";");
                node = node.next;
            } else {
                break;
            }
        }
    }
}
