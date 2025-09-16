# Counting Sort

A stable, linear-time sorting algorithm that works by counting occurrences of each element. Efficient for sorting integers within a known, small range.

## Algorithm Overview

**Counting Sort** is a distribution sorting algorithm that operates by counting the occurrences of each distinct element in the input array, then using this information to place elements directly into their correct sorted positions.

### Key Characteristics

- **Time Complexity**: O(n + k) where n is the number of elements and k is the range of input values
- **Space Complexity**: O(k) for the counting array
- **Stable**: Yes (maintains relative order of equal elements)
- **In-place**: No (requires additional space)
- **Comparison-based**: No (distribution sort)

### When to Use

✅ **Good for:**
- Sorting integers within a known, small range
- When stability is required
- When linear time complexity is needed
- Input elements are non-negative integers

❌ **Not suitable for:**
- Large ranges (k >> n)
- Floating-point numbers
- Negative numbers (without modification)
- General comparison-based sorting

## Usage

### Basic Usage

```javascript
const { CountingSortModule } = require('./index.js');

// Simple sorting
const sorted = CountingSortModule.sort([4, 2, 2, 8, 3, 3, 1]);
console.log(sorted); // [1, 2, 2, 3, 3, 4, 8]

// With detailed results and metrics
const result = CountingSortModule.countingSort([4, 2, 2, 8, 3, 3, 1]);
console.log('Sorted:', result.sortedArray);
console.log('Metrics:', result.metrics);
```

### Step-by-Step Visualization

```javascript
// Get step-by-step execution for visualization
const result = CountingSortModule.sortWithSteps([4, 2, 2, 8, 3, 3, 1]);

console.log('Steps:', result.steps.length);
result.steps.forEach((step, i) => {
    console.log(`Step ${i + 1}: ${step.message}`);
});
```

### Quick Demo

```javascript
// Run a quick demonstration
CountingSortModule.demo(); // Uses default test case
CountingSortModule.demo([5, 1, 3, 2, 4]); // Custom input
```

### Input Validation

```javascript
// Validate input before sorting
const validation = CountingSortModule.validate([1, 2, 3]);
if (validation.valid) {
    console.log('Input is valid');
} else {
    console.log('Error:', validation.message);
}
```

### Performance Comparison

```javascript
// Compare with other sorting algorithms
const comparison = CountingSortModule.compare(
    [4, 2, 2, 8, 3, 3, 1],
    (arr) => arr.sort((a, b) => a - b),
    'JavaScript Sort'
);
console.log(comparison);
```

## Algorithm Steps

1. **Find Maximum**: Determine the maximum value to set counting array size
2. **Count Elements**: Count occurrences of each element value
3. **Cumulative Sum**: Convert counts to starting positions
4. **Place Elements**: Place each element at its correct position (right-to-left for stability)
5. **Complete**: Result is a sorted array

## Example Walkthrough

Input: `[4, 2, 2, 8, 3, 3, 1]`

1. **Find Maximum**: max = 8, so counting array size = 9 (indices 0-8)
2. **Count Elements**: 
   - Count[1] = 1, Count[2] = 2, Count[3] = 2, Count[4] = 1, Count[8] = 1
3. **Cumulative Sum**: 
   - Count[1] = 1, Count[2] = 3, Count[3] = 5, Count[4] = 6, Count[8] = 7
4. **Place Elements**: Process right-to-left to maintain stability
5. **Result**: `[1, 2, 2, 3, 3, 4, 8]`

## Configuration

The module includes comprehensive configuration for interactive demos:

- **Test Cases**: 8 predefined test cases from easy to hard
- **Visualization**: Color schemes and animation settings
- **Validation**: Input constraints and custom validators
- **Performance**: Comparison data and metrics

## Files

- `counting-sort-core.js` - Core algorithm implementation
- `counting-sort-config.js` - Configuration for demos and visualization
- `test-counting-sort.js` - Comprehensive test suite
- `index.js` - Main module entry point
- `README.md` - This documentation

## Testing

Run the test suite to verify the implementation:

```bash
node test-counting-sort.js
```

All tests should pass, verifying:
- Basic functionality
- Edge cases (empty arrays, single elements)
- Input validation
- Stability properties
- Configuration test cases
- Performance characteristics

## Browser Usage

The module works in both Node.js and browser environments:

```html
<script src="counting-sort-core.js"></script>
<script src="counting-sort-config.js"></script>
<script src="index.js"></script>

<script>
    // Use CountingSortModule in browser
    const result = CountingSortModule.sort([3, 1, 4, 1, 5]);
    console.log(result);
</script>
```

## Algorithm Inventor

Counting Sort was developed by **Harold H. Seward** as an efficient method for sorting integers when the range of possible values is known and relatively small.

## Complexity Analysis

- **Time Complexity**: O(n + k)
  - Finding maximum: O(n)
  - Counting elements: O(n)
  - Cumulative sum: O(k)
  - Placing elements: O(n)
  - Total: O(n + k)

- **Space Complexity**: O(k)
  - Counting array: O(k)
  - Output array: O(n) (temporary)

The algorithm is most efficient when k ≤ n or when k is small relative to n.