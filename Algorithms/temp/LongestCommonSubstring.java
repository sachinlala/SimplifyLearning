package algorithms;

public class LongestCommonSubstring {
    
    public static void main(String[] args) {
        
    }
    
    public String getLCS(String a, String b) {
        char[] aArr = a.toCharArray();
        char[] bArr = b.toCharArray();
        
        char[][] match = new char[aArr.length][bArr.length];
        
        for (int i = 0; i < aArr.length; i++) {
            match[i][0] = aArr[i];
        }
        
        for (int j = 0; j < bArr.length; j++) {
            match[0][j] = bArr[j];
        }
        
        for (int i = 0; i < aArr.length; i++) {
            for (int j = 0; j < bArr.length; j++) {
                if (aArr[i] == bArr[j]) {
                    
                }
            }
        }
        
        return null;
    }

}
