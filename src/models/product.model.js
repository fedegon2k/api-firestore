import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../config/db.js';

const productsCollection = collection(db, 'products');

class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    static async getAll() {
        const querySnapshot = await getDocs(productsCollection);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async findById(id) {
        const docRef = doc(productsCollection, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return null;
        return { id: docSnap.id, ...docSnap.data() };
    }

    static async create(productData) {
        const docRef = await addDoc(productsCollection, productData);
        return { id: docRef.id, ...productData };
    }

    static async update(id, productData) {
        const docRef = doc(productsCollection, id);
        await updateDoc(docRef, productData);
        return { id, ...productData };
    }

    static async delete(id) {
        const docRef = doc(productsCollection, id);
        await deleteDoc(docRef);
        return true;
    }
}

export default Product;