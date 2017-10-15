package algorithms;

public class Palindrome {

    public static void main(String[] args) {
        checkGeneratePalindrome("arora");
        checkGeneratePalindrome("lala");
    }

    private static void checkGeneratePalindrome(String inputStr) {
        boolean isPalindrome = true;
        char[] arr = inputStr.toCharArray();
        String[] strArray = inputStr.split("");
        for (int i = 0; i < strArray.length; i++) {
            if (strArray[i].equals("")) {
                System.out.println("Empty string");
            }
            System.out.println(strArray[i]);
        }
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] != arr[arr.length - 1 - i]) {
                isPalindrome = false;
                break;
            }
        }
        if (isPalindrome) {
            System.out.println(inputStr+" is a palindrome");
        } else {
            System.out.println(inputStr+" is not a palindrome");
        }
    }

}
