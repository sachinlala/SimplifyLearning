package algorithms;

public class StringReverser {
    private static final char whiteSpace = ' ';

    public static void main(String[] args) {
        StringReverser stringReverser = new StringReverser();
        String str = null;
        stringReverser.reverseWords(str);
        System.out.println("---------");
        str = "a";
        System.out.println(str);
        stringReverser.reverseWords(str);
        System.out.println("---------");
        str = "a b";
        System.out.println(str);
        stringReverser.reverseWords(str);
        System.out.println("---------");
        str = "sky is blue";
        System.out.println(str);
        stringReverser.reverseWords(str);
        System.out.println("---------");
    }

    public void reverseWords(String s) {
        if (s != null) {
            reverseWords(s.toCharArray());
        } else {
            System.err.println("Null value passed");
        }
    }

    public void reverseWords(char[] s) {
        if (s.length == 1) {
            System.out.println(s);
            return;
        }
        
        int leftIndex, rightIndex, whiteIndex = -1;

        rightIndex = s.length - 1;
        leftIndex = rightIndex;
        while (leftIndex > 0) {
            whiteIndex = getWhiteIndex(s, rightIndex);
            if (whiteIndex == 0) {
                leftIndex = 0;
            } else {
                leftIndex = whiteIndex + 1;
            }
            printWord(s, leftIndex, rightIndex);
            rightIndex = whiteIndex - 1;
        }
    }

    private int getWhiteIndex(char[] s, int rightIndex) {
        int whiteIndex = 0;
        for (int i = rightIndex; i >= 0; i--) {
            if (s[i] == whiteSpace) {
                whiteIndex = i;
                break;
            }
        }
        return whiteIndex;
    }

    private void printWord(char[] s, int leftIndex, int rightIndex) {
        for (int i = leftIndex; i <= rightIndex; i++) {
            System.out.print(s[i]);
        }
        System.out.print(whiteSpace);
    }
}
