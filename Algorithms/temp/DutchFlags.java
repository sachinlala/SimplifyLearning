package algorithms;

public class DutchFlags {

    public static void main(String[] args) {
/*        int[] arr01 = { 1 };
        reArrangeOddEvenAndPrint(arr01);
        sortAndPrint(arr01);

        int[] arr02 = { 1, 2 };
        reArrangeOddEvenAndPrint(arr02);
        sortAndPrint(arr02);

        int[] arr03 = { 1, 2, 3 };
        reArrangeOddEvenAndPrint(arr03);
        sortAndPrint(arr03);

        int[] arr04 = { 1, 2, 3, 4 };
        reArrangeOddEvenAndPrint(arr04);
        sortAndPrint(arr04);
*/
        int[] arr05 = { 1, 2, 4, 3, 5 };
        //reArrangeOddEvenAndPrint(arr05);
        sortAndPrint(arr05);

        int[] arr1 = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        //reArrangeOddEvenAndPrint(arr1);
        sortAndPrint(arr1);

/*        int[] arr2 = { 12, 34, 45, 9, 8, 90, 3 };
        reArrangeOddEvenAndPrint(arr2);
        sortAndPrint(arr2);

        int[] arr3 = { 1, 2, 3, 1, 1, 3, 2, 1, 2, 3, 4 };
        reArrangeOddEvenAndPrint(arr3);
        sortAndPrint(arr3);

        int[] arr4 = { 2, -4, -1, -10, 5, 98, -7, 7 };
        sortAndPrint(arr4);
        // reArrayPositiveNegativeAndPrint(arr4); //TODO
*/    }

    private static void reArrangeOddEvenAndPrint(int[] arr) {
        System.out.println("Even Odd Grouping");
        printArray(arr, IOType.INPUT);
        groupEvenOdd(arr, false);
        printArray(arr, IOType.OUTPUT);
        groupEvenOdd(arr, true);
        printArray(arr, IOType.OUTPUT);
        System.out.println("-------------------");
    }

    private static void sortAndPrint(int[] arr) {
        System.out.println("Sorting");
        printArray(arr, IOType.INPUT);
        sort(arr, false);
        printArray(arr, IOType.OUTPUT);
        sort(arr, true);
        printArray(arr, IOType.OUTPUT);
        System.out.println("-------------------");
    }

    private static void groupEvenOdd(int[] arr, boolean arrangeEvenFirst) {
        int high, low;
        low = 0;
        high = arr.length - 1;
        while (low < high) {
            // System.out.println("low:"+low+"; high:"+high);
            if (arr[low] % 2 == 0) { // even
                if (arrangeEvenFirst) {
                    swap(arr, high, low);
                    high--;
                } else {
                    low++;
                }
            } else if (arr[low] % 2 == 1) { // odd
                if (!arrangeEvenFirst) {
                    swap(arr, high, low);
                    high--;
                } else {
                    low++;
                }
            }
        }
    }

    // sortAscending
    private static void sort(int[] arr, boolean sortAscending) {
        int high, low, middle;
        low = 0;
        high = arr.length - 1;
        middle = high;
        while (low < middle) {
            // System.out.println("low:"+low+"; high:"+high);
            if (arr[low] > arr[middle]) {
                swap(arr, middle, low);
                middle--;
            } else {
                low++;
            }
        }
        while (middle < high) {
            // System.out.println("low:"+low+"; high:"+high);
            if (arr[middle] > arr[high]) {
                swap(arr, high, middle);
                high--;
            } else {
                middle++;
            }
        }
    }

    private static void swap(int[] arr, int high, int low) {
        int temp;
        temp = arr[low];
        arr[low] = arr[high];
        arr[high] = temp;
    }

    private static void printArray(int[] arr, IOType io) {
        StringBuilder output = new StringBuilder();
        output.append(" { ");
        for (int i = 0; i < arr.length - 1; i++) {
            output.append(arr[i]);
            output.append(", ");
        }
        output.append(arr[arr.length - 1]);
        output.append(" }");
        System.out.print(io.name());
        System.out.println(output);
    }

    private enum IOType {
        INPUT, OUTPUT;
    }
}






