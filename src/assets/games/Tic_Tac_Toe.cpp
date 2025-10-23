/*
Get your friend ready and play the tic-tac-toe in the C++ terminal, no need to worry about pen paper 😊
*/

#include <iostream>
using namespace std;

char board[3][3] = { {'1', '2', '3'}, {'4', '5', '6'}, {'7', '8', '9'} };
char player_turn = 'X';

void show_board() {
    for (int i = 0; i < 3; i++) {
        cout << " " << board[i][0] << " | " << board[i][1] << " | " << board[i][2] << " ";
        cout << endl;
        if (i < 2)
            cout << "---|---|---" << endl;
    }
}

bool is_winner() {
    for (int i = 0; i < 3; i++)
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) return true;
    for (int i = 0; i < 3; i++)
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) return true;
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) return true;
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) return true;
    return false;
}

void tic_tac_toe() {
    for (int moves = 0; moves < 9; moves++) {
        show_board();
        cout << "Player " << player_turn << ", enter your move: ";
        int move;
        cin >> move;

        if (move < 1 || move > 9) {
            cout << "Invalid Move.Enter a number between 1-9." << endl;
            moves--;
            continue;
        }

        int row = (move - 1) / 3;
        int col = (move - 1) % 3;

        if (board[row][col] == 'X' || board[row][col] == 'O') {
            cout << "Invalid move. The number is already taken. Choose different" << endl;
            moves--;
            continue;
        }

        board[row][col] = player_turn;

        if (is_winner()) {
            show_board();
            cout << "Player " << player_turn << " wins!" << endl;
            return;
        }

        if (player_turn == 'X') {
            player_turn = 'O';
        } else {
            player_turn = 'X';
        }
    }

    show_board();
    cout << "DRAW.." << endl;
}

int main() {
    tic_tac_toe();
}