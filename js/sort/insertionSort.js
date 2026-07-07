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