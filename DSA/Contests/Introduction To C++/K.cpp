#include<iostream>
using namespace std;

int main() {
   int n, f;
   cin >> n >> f;

   if(n % f == 0) {
    cout << "Yes";
   } else {
    cout << "No";
   }
   return 0;
}