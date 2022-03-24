import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class SaveDataCreateService {

  constructor(public afs: AngularFirestore) { }

  saveDataCreate(data){
    const id = data.id
    return this.afs.collection('creacionCitas').doc(id).set({
      data
    },{merge: true})
  }

}
