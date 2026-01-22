#include<iostream>
#include <string.h>
using namespace std;

int main() {
    long long n;
    cin >> n;

    int l = to_string(n).length();

    for (int i = 0; i < l; i++) {
        int rem = n % 10;
        n = n / 10;
        cout << rem;
    }
    return 0;
}