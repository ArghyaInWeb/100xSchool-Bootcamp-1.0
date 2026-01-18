#include<iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        if (i == 0 || i == 4) {
            for(int j = 0; j < 5; j++) {
                cout << "*";
            }
            cout << endl;
        } else {
            for (int j = 5 - i - 1; j > 0; j--) {
                cout << " ";
            }
            cout << "*" << endl;
        }
        
    }
   return 0;
}