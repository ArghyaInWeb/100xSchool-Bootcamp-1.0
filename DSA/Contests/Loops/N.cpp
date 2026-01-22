#include<iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;

    long long copy = n;
    int l = to_string(n).length();

    int num = 0;

    while (n != 0) {
        int rem = n % 10;
        num = num * 10 + rem;
        n = n / 10;
    }

    if(num == copy) {
        cout << "YES";
    } else {
        cout << "NO";
    }
    return 0;
}