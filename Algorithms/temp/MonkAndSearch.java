package algorithms;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class MonkAndSearch {
    
    public static void main(String args[]) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String line = br.readLine();
        int N = Integer.parseInt(line);
        
        if (N < 1 || N > 100000){
            System.err.println("Invalid input for the number of entries in the input array");
            return;
        }
        int[] numbers = new int[N];
        line = br.readLine();
        char[] nArray = line.toCharArray();
        int index = 0;
        for (int i = 0; i < nArray.length; i++) {
            if (' ' == nArray[i]) {
                continue;
            } else {
                numbers[index] = Integer.parseInt(String.valueOf(nArray[i]));
                index++;
            }
        }
        
        line = br.readLine();
        int Q = Integer.parseInt(line);
        
        if (Q < 1 || Q > 300000) {
            System.out.println("Invalid input for the number of comparison entrues in the input");
            return;
        }
        int[] countArray = new int[Q];
        for (int i = 0; i < Q; i++) {
            int counter = 0;
            line = br.readLine();
            char[] cArray = line.toCharArray();
            if ('0' == cArray[0]) {
                counter = count(numbers, cArray[2], CHECK.EQUAL_OR_GREATER);
            }
            if ('1' == cArray[0]) {
                counter = count(numbers, cArray[2], CHECK.GREATER);
            }
            countArray[i] = counter;
        }
        for (int i = 0; i <countArray.length; i++) {
            System.out.println(countArray[i]);
        }
    }

    private static int count(int[] numbers, char s, CHECK checkType) {
        int counter = 0;
        int number = Integer.parseInt(String.valueOf(s));
        switch (checkType) {
            case GREATER:
                for (int i = 0; i < numbers.length; i++) {
                    if (numbers[i] > number) {
                        counter++;
                    }
                }
                break;
            case EQUAL_OR_GREATER:
                for (int i = 0; i < numbers.length; i++) {
                    if (numbers[i] >= number) {
                        counter++;
                    }
                }
                break;
            default:
                // do nothing
                break;
            }
        return counter;
    }

    private enum CHECK {
        GREATER, EQUAL_OR_GREATER;
    }
}
