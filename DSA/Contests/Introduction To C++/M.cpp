#include<iostream>
using namespace std;

int main() {
   int marks;
   cin >> marks;

   if (marks < 35) {
    cout << "Fail";
   } else if (marks <= 100) {
    cout << "Pass";
   }
   return 0;
}