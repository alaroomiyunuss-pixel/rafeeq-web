'use strict';

/* ══════════════════════════════════════
   Firebase Configuration
══════════════════════════════════════ */
const firebaseConfig = {
  apiKey: "AIzaSyAhRIutJmUP5WGEfm-7BtcCZjr0EoumNF0",
  authDomain: "newrafiq-18fe1.firebaseapp.com",
  projectId: "newrafiq-18fe1",
  storageBucket: "newrafiq-18fe1.firebasestorage.app",
  messagingSenderId: "102380399042",
  appId: "1:102380399042:web:81a144654899bd83398e5b"
};

// Initialize Firebase (compat SDK)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ══════════════════════════════════════
   DATABASE — Firestore wrapper
   نفس واجهة IndexedDB السابقة للتوافق مع app.js
══════════════════════════════════════ */
const DB = {

  async get(col, id) {
    try {
      const snap = await db.collection(col).doc(String(id)).get();
      return snap.exists ? snap.data() : null;
    } catch(e) {
      console.error('DB.get error:', e);
      return null;
    }
  },

  async getAll(col) {
    try {
      const snap = await db.collection(col).get();
      return snap.docs.map(d => d.data());
    } catch(e) {
      console.error('DB.getAll error:', e);
      return [];
    }
  },

  async put(col, obj) {
    try {
      if (!obj.id) obj.id = db.collection(col).doc().id;
      await db.collection(col).doc(String(obj.id)).set(obj);
      return obj;
    } catch(e) {
      console.error('DB.put error:', e);
      return null;
    }
  },

  async putAll(col, arr) {
    try {
      const batch = db.batch();
      for (const obj of arr) {
        if (!obj.id) obj.id = db.collection(col).doc().id;
        const ref = db.collection(col).doc(String(obj.id));
        batch.set(ref, obj);
      }
      await batch.commit();
    } catch(e) {
      console.error('DB.putAll error:', e);
    }
  },

  async del(col, id) {
    try {
      await db.collection(col).doc(String(id)).delete();
    } catch(e) {
      console.error('DB.del error:', e);
    }
  },

  async clear(col) {
    try {
      const snap = await db.collection(col).get();
      const batch = db.batch();
      snap.docs.forEach(d => batch.delete(d.ref));
      await batch.commit();
    } catch(e) {
      console.error('DB.clear error:', e);
    }
  },

  async getSetting(k) {
    const doc = await this.get('settings', k);
    return doc ? doc.v : null;
  },

  async setSetting(k, v) {
    return this.put('settings', { id: k, v });
  },

  async query(col, fn) {
    const all = await this.getAll(col);
    return all.filter(fn);
  }
};
