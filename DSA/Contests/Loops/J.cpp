#include<iostream>
using namespace std;

int main() {
    long long x, n;
    cin >> x >> n;
    long long num = x;
    for (int i = 1; i < n; i++) {
        num *= x;
    }

    cout << num << endl;
    return 0;
}