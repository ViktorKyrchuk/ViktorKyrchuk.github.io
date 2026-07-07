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