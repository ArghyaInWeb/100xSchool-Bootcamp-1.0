#include<iostream>
using namespace std;

int main() {
    int num;
    cin >> num;

    int arr[num];
    for (int i = 0; i < num; i++) {
        cin >> arr[i];
    }

    int countPositive = 0;
    int countNegative = 0;
    int countEven = 0;
    int countOdd = 0;

    for (int i = 0; i < num; i++) {
        if (arr[i] > 0) {
            countPositive++;
        }
        if (arr[i] < 0) {
            countNegative++;
        }
        if (arr[i] % 2 == 0) {
            countEven++;
        }
        if (arr[i] % 2 != 0) {
            countOdd++;
        }
    }

    cout << countPositive << endl;
    cout << countNegative << endl;
    cout << countEven << endl;
    cout << countOdd << endl;

    return 0;
}