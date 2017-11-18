package com.sl.string.split;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.*;
import java.util.regex.Pattern;

/**
 * StringSplitter demonstrates the performance of different methods to split a String.<br>
 * It iteratively splits a string (1-2 million times) so that we can get a collective view of the time taken.<br>
 */
public class StringSplitter {
    private static final int STATS_RANGE = 2;
    private static final String DELIMITER = " +";
    private static final int METHOD_INVOCATION_COUNT = 2000000;

    private StringSplitter() {
        /**
         * This is a util class.
         */
    }

    public static void main(String[] args) {
        if (args == null || args.length == 0) {
            System.err.println("Please provide an input string to split");
            System.exit(-1);
        }
        long[][] outputStats = new long[STATS_RANGE][4];
        String inputString = buildInput(args);

        System.out.println("Input String is: " + inputString);

        for (int i = 0; i < STATS_RANGE; i++) {
            System.out.println("Iteration # " + i);
            outputStats[i][0] = splitString(inputString, SplitMethodEnum.PATTERN_SPLIT);
            outputStats[i][1] = splitString(inputString, SplitMethodEnum.STRING_SPLIT);
            outputStats[i][2] = splitString(inputString, SplitMethodEnum.STRING_TOKENIZER_SPLIT);
            outputStats[i][3] = splitString(inputString, SplitMethodEnum.SCANNER_SPLIT);
        }

        persistOutputStats(outputStats);
    }

    private static String buildInput(String[] args) {
        StringBuilder inputStrBuilder = new StringBuilder();
        for (String arg : args) {
            inputStrBuilder.append(arg);
        }
        return inputStrBuilder.toString();
    }

    private static long splitString(String testStr, SplitMethodEnum splitMethod) {
        return splitString(testStr, DELIMITER, splitMethod, METHOD_INVOCATION_COUNT);
    }

    private static long splitString(String testStr,
                                   String delimiter,
                                   SplitMethodEnum splitMethod, int iterationCount) {
        long startTime = System.currentTimeMillis();
        switch (splitMethod) {
            case PATTERN_SPLIT:
                Pattern wsPattern = Pattern.compile(delimiter);
                for (int i=0; i < iterationCount; i++) {
                    patternBasedSplit(testStr, wsPattern);
                }
                break;
            case STRING_SPLIT:
                for (int i = 0; i < iterationCount; i++) {
                    stringBasedSplit(testStr, delimiter);
                }
                break;
            case STRING_TOKENIZER_SPLIT:
                for (int i = 0; i < iterationCount; i++) {
                    tokenizerBasedSplit(testStr, delimiter);
                }
                break;
            case SCANNER_SPLIT:
                for (int i = 0; i < iterationCount; i++) {
                    scannerBasedSplit(testStr, delimiter);
                }
                break;
            default:
                break;
        }
        long timeTaken = System.currentTimeMillis() - startTime;

        System.out.println("Time taken for " + splitMethod + ": " + timeTaken
                + " milli-seconds");

        return timeTaken;
    }

    public static List<String> scannerBasedSplit(String testStr, String delimiter) {
        Scanner scanner = new Scanner(testStr);
        scanner.useDelimiter(delimiter);
        List<String> scannerBasedSplitList = new ArrayList<>();
        while (scanner.hasNext()) {
            scannerBasedSplitList.add(scanner.next());
        }
        scanner.close();
        return scannerBasedSplitList;
    }

    public static String[] tokenizerBasedSplit(String testStr, String delimiter) {
        StringTokenizer st = new StringTokenizer(testStr, delimiter);
        String[] tokenizerBasedSplit = new String[st.countTokens()];
        int j = 0;
        while (st.hasMoreTokens()) {
            tokenizerBasedSplit[j] = st.nextToken();
            j++;
        }
        return tokenizerBasedSplit;
    }

    public static String[] stringBasedSplit(String testStr, String delimiter) {
        return testStr.split(delimiter);
    }

    public static String[] patternBasedSplit(String testStr, Pattern wsPattern) {
        return wsPattern.split(testStr);
    }

    private static void persistOutputStats(long[][] outputStats) {
        String moduleDir = System.getProperty("user.dir");
        try {
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(new File(moduleDir+"/build/Results.csv")));
            bufferedWriter.write(Arrays.deepToString(outputStats));
            bufferedWriter.close();
        } catch (Exception e) {
            System.err.println("Exception while printing output: " + e.getMessage());
        }
    }
}
