#include<iostream>
using namespace std;

int main() {
   int n, m;
   cin >> n >> m;

   n = n % 10;
   m = m % 10;

   cout << n + m;
   return 0;
}