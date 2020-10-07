import * as SQLite from "expo-sqlite";

//Eger places.db adinda bir database,
// yoksa acar
// varsa baglanir.
const db = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    //transaction argument olarak fonksiyon alan bir methoddur.
    //(tx)Ve bu fonksiyon da icinde transaction objesine erismemizi saglayan baska bir argument veriyor bize. (tx)
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        //SUCCESS FUNCTION
        () => {
          resolve();
        },
        //ERROR FUNCTION
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUri, address, lat, lng],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //ERROR FUNCTION
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE",
        [],
        //SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        //ERROR FUNCTION
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
