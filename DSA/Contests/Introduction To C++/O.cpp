#include<iostream>
using namespace std;

int main() {
   int a, b, c;
   cin >> a >> b >> c;

   if (a > b && a > c) {
        if (b > c) {
            cout << "Min = " << c << endl;
            cout << "Max = " << a;
        } else {
            cout << "Min = " << b << endl;
            cout << "Max = " << a;
        }
    } else if (b > a && b > c) {
        if (a > c) {
            cout << "Min = " << c << endl;
            cout << "Max = " << b;
        } else {
            cout << "Min = " << a << endl;
            cout << "Max = " << b;
        }
    } else if(c > a && c > b) {
        if (a > b) {
            cout << "Min = " << b << endl;
            cout << "Max = " << c;
        } else {
            cout << "Min = " << a << endl;
            cout << "Max = " << c;
        }
    }
   return 0;
}