// --------------
// Bubble Sort
// --------------

function bubbleSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return arr;
}


let array = [64, 34, 25, 12, 22, 11, 90];
let bs_array = document.getElementById("originalArray_bubble");
bs_array.textContent += " [" + array + "]";

let sortedArray = bubbleSort(array);
document.getElementById("sortedArray_bubble").textContent += " [" + sortedArray + "]";

console.log("Original array: " + array);
console.log("Sorted array: " + sortedArray);

// --------------
// Selection Sort
// --------------

function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for(let j = i + 1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

let array2 = [29, 10, 14, 37, 13];
let ss_array = document.getElementById("originalArray_selection");
ss_array.textContent += " [" + array2 + "]";

let sortedArray2 = selectionSort(array2);
document.getElementById("sortedArray_selection").textContent += " [" + sortedArray2 + "]";

console.log("Original array: " + array2);
console.log("Sorted array: " + sortedArray2);


// --------------
// Insertion Sort
// --------------

function insertionSort(arr) {
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

let array3 = [12, 11, 13, 5, 6];
let is_array = document.getElementById("originalArray_insertion");
is_array.textContent += " [" + array3 + "]";

let sortedArray3 = insertionSort(array3);
document.getElementById("sortedArray_insertion").textContent += " [" + sortedArray3 + "]";

console.log("Original array: " + array3);
console.log("Sorted array: " + insertionSort(array3));