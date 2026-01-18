#include<iostream>
using namespace std;

int main() {
   int a, b;
   cin >> a >> b;

   if (a > b) {
    cout << "Min = " << b << endl;
    cout << "Max = " << a;
   } else {
    cout << "Min = " << a << endl;
    cout << "Max = " << b;
   }
   return 0;
}