import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'acEnginnering.db'});

export function CreateUserDatabase() {
  db.transaction(function(txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
      [],
      function(tx, res) {
        if (res.rows.length === 0) {
          txn.executeSql('DROP TABLE IF EXISTS users', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, api_token VARCHAR(255), email VARCHAR(255), phone VARCHAR(255))',
            [],
          );
        }
      },
    );
  });
}

export async function InsertUserData(api_token, email, phone) {
  await db.transaction(function(tx) {
    tx.executeSql(
      'INSERT INTO users (api_token,  email, phone) VALUES (?,?,?)',
      [api_token, email, phone],
      (tx, results) => {
        console.log('Results', results);
        console.log('tx result', tx);
      },
    );
  });
}
