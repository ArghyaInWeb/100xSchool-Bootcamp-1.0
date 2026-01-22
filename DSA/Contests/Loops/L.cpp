#include<iostream>
#include <string.h>
using namespace std;

int main() {
    long long n;
    cin >> n;

    int l = to_string(n).length();
    int sum = 0;
    while (n != 0) {
        int rem = n % 10;
        sum += rem;
        n = n / 10;
    }
    
    cout << sum;
    return 0;
}