import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.*;
import java.util.regex.Pattern;

/**
 * StringSplitOpPerformanceTest compares the performance of different methods to split a string. <br>
 * Approach is to invoke each split method on a space-delimited string iteratively (1-2 million times) so that we can get a collective view.
 */
public class StringSplitOpPerformanceTest {
    private static final int STATS_RANGE = 20;
    private static final int METHOD_INVOCATION_COUNT = 2000000;
    private static long[][] outputStats;

    public static void main (String[] args) {
        String testStr = "This is a performance test to compare different methods to split a string";
        String delimiter = " +";
        outputStats = new long[STATS_RANGE][4];

        for (int i=0; i < STATS_RANGE; i++) {
            System.out.println("Iteration # "+i);
            outputStats[i][0] = splitString(testStr, delimiter, SplitMethod.PATTERN_SPLIT);
            outputStats[i][1] = splitString(testStr, delimiter, SplitMethod.STRING_SPLIT);
            outputStats[i][2] = splitString(testStr, delimiter, SplitMethod.STRING_TOKENIZER_SPLIT);
            outputStats[i][3] = splitString(testStr, delimiter, SplitMethod.SCANNER_SPLIT);
        }

        try {
            printOutput();
        } catch (Exception e) {
        System.err.println("Exception while printing output: " + e.getMessage());
        }
    }

    @SuppressWarnings({"unused", "MismatchedQueryAndUpdateOfCollection", "MismatchedReadAndWriteOfArray"})
    private static long splitString (String testStr,
                                     String delimiter,
                                     SplitMethod splitMethod) {
        long startTime = System.currentTimeMillis();
        switch (splitMethod) {
            case PATTERN_SPLIT:
                Pattern wsPattern = Pattern.compile(delimiter);
                for (int i = 0; i < METHOD_INVOCATION_COUNT; i++) {
                    String[] patternBasedSplit = wsPattern.split(testStr);
                }
                break;
            case STRING_SPLIT:
                for (int i = 0; i < METHOD_INVOCATION_COUNT; i++) {
                    String[] stringBasedSplit = testStr.split(delimiter);
                }
                break;
            case STRING_TOKENIZER_SPLIT:
                for (int i = 0; i < METHOD_INVOCATION_COUNT; i++) {
                    StringTokenizer st = new StringTokenizer(testStr, delimiter);
                    String[] tokenizerBasedSplit = new String[st.countTokens()];
                    int j = 0;
                    while (st.hasMoreTokens()) {
                        tokenizerBasedSplit[j] = st.nextToken();
                        j++;
                    }
                }
                break;
            case SCANNER_SPLIT:
                for (int i = 0; i < METHOD_INVOCATION_COUNT; i++) {
                    Scanner scanner = new Scanner(testStr);
                    scanner.useDelimiter(delimiter);
                    List<String> scannerBasedSplitList = new ArrayList<>();
                    while (scanner.hasNext()) {
                        scannerBasedSplitList.add(scanner.next());
                    }
                    scanner.close();
                }
                break;
            default:
                break;
        }
        long endTime = System.currentTimeMillis();
        long timeTaken = endTime - startTime;

        System.out.println("Time taken for " + splitMethod + ": " + timeTaken
                + " milli-seconds");

        return timeTaken;
    }

    private static void printOutput() throws Exception {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(new File("StringSplitOpPerformanceTest.csv")));
        bufferedWriter.write(Arrays.deepToString(outputStats));
        bufferedWriter.close();
    }

    private enum SplitMethod {
        PATTERN_SPLIT, STRING_SPLIT, STRING_TOKENIZER_SPLIT, SCANNER_SPLIT
    }
}
