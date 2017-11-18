package com.sl.string.split;

import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.regex.Pattern;

import static org.junit.Assert.assertTrue;

public class StringSplitterTest {
    private String inputString;
    private String[] outputStringArray;
    private String delimiter = " ";

    @Before
    public void setUp() {
        inputString = "This is a performance test to compare different methods to split a string";
        outputStringArray = new String[]{"This", "is", "a", "performance", "test", "to", "compare", "different", "methods", "to", "split", "a", "string"};
    }

    @Test
    public void testPatternMethod() {
        Pattern wsPattern = Pattern.compile(delimiter);
        assertTrue(assertEqualArray(outputStringArray, StringSplitter.patternBasedSplit(inputString, wsPattern)));
    }

    @Test
    public void testStringMethod() {
        assertTrue(assertEqualArray(outputStringArray, StringSplitter.stringBasedSplit(inputString, delimiter)));
    }

    @Test
    public void testTokenizerMethod() {
        assertTrue(assertEqualArray(outputStringArray, StringSplitter.tokenizerBasedSplit(inputString, delimiter)));
    }

    @Test
    public void testScannerMethod() {
        List<String> scannerOutputList = StringSplitter.scannerBasedSplit(inputString, delimiter);
        String[] scannerOutputArray = new String[scannerOutputList.size()];
        scannerOutputArray = scannerOutputList.toArray(scannerOutputArray);
        assertTrue(assertEqualArray(outputStringArray, scannerOutputArray));
    }

    private boolean assertEqualArray(String[] s1, String[] s2) {
        if (s1.length != s2.length) {
            return false;
        }
        for (int i=0; i < s1.length; i++) {
            if (!s1[i].equals(s2[i])) {
                return false;
            }
        }
        return true;
    }
}