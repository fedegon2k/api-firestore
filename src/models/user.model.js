import { collection, getDocs, getDoc, doc, addDoc, query, where } from 'firebase/firestore';
import db from '../config/db.js';

const usersCollection = collection(db, 'users');

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async getAll() {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async findByEmail(email) {
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  static async create(userData) {
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password
    };
    const docRef = await addDoc(usersCollection, newUser);
    return { id: docRef.id, ...newUser };
  }
}

export default User;