import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BeneficesService {

  constructor(public afs: AngularFirestore) { }

  saveData(data){
    return this.afs.collection('inscritos').doc().set({
      data: data,
      status: 'pendiente'
    }
    ).catch(err =>{
      console.log(err)
    });
  }

  getAllData(){
      return this.afs.collection('inscritos').snapshotChanges();
  }

  changueStatus(id, status){
      return this.afs.collection('inscritos').doc(id).set({
        status: status
      }, {merge: true})
      .catch(err => {
        console.log(err)
      })
  }


}
