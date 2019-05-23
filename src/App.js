// React core
import React, { Component } from 'react';

// Firebase.
//import firebase from 'firebase';
import firebase from './firebase'
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


// Styles
import './App.css'; // This uses CSS modules.

//components
import Admin from './components/admin';
import Teacher from './components/teacher';
import M123 from './components/M123';
import M456 from './components/M456';

//bootstarp4
import logo from './pic.gif';
import { Button } from 'reactstrap';
//import { Container, Row, Col } from 'reactstrap';
//import { Nav, NavItem, NavLink } from 'reactstrap';

class SignInScreen extends Component {
  //จะลองทำให้มันส่งไปหน้าอื่น รอแปป
  // Initialize Firebase

  constructor() {
    super();
    this.state = {
      StatusSwitch: undefined,
      isSignedIn: false,
      pags: undefined,
      sia: undefined,
    }
  }
  // The component's Local state.
  /*state = {
    isSignedIn: false,// Local signed-in state.
  };*/
  uiConfig_admin = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user }) //ต้องทำแบบอันนี้
    );
    const db = firebase.database();
    db.ref('/openweb').on('value', (snapshot) => {
      var items = snapshot.val().value;
      this.setState({ StatusSwitch: items });
    })
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  };
  render() {

    if (this.state.StatusSwitch == undefined) {
      return (
        <div className="container  mx_auto  ">
          <br></br><br></br>
          <img src={logo} width="100" alt="Logo" />
          <h1>ระบบลงทะเบียนชุมนุม</h1>
          <h1>โรงเรียนพรหมานุสรณ์จังหวัดเพชรบุรี</h1>
          <br></br><br></br>
          <div className="spinner-border text-danger"></div>
          <br></br>
          <h4 className="text-danger">เนื่องจากมีผู้ใช้งานจำนวนมากกรุณารอคิวเพื่อเข้าสู่ระบบ</h4>
          <h4 className="text-danger">หากเข้าสู้ระบบไม่ได้ภายใน 15 นาที กรุณา Reload หน้าเว็บใหม่อีกครัง</h4>
        </div>
      );
    }
    else if (this.state.StatusSwitch == false) {
      if (this.state.isSignedIn && firebase.auth().currentUser.email == 'admin@regispromma.co') {
        return (
          <Admin />
        );
      }
      else if(this.state.isSignedIn && firebase.auth().currentUser.email == 'teacher@regispromma.co') {
        return (
          <Teacher />
        );
      }
      else if (this.state.isSignedIn) {
        firebase.auth().signOut()
        window.location.reload()
      }
      return (
        <div className="container  mx_auto ">
          <br></br><br></br>
          <img src={logo} width="100" alt="Logo" />
          <h1>ระบบลงทะเบียนชุมนุม</h1>
          <h1>โรงเรียนพรหมานุสรณ์จังหวัดเพชรบุรี</h1>
          <br></br><br></br>
          <h1 className="text-danger">ระบบยังไม่เปิดให้บริการสำหรับนักเรียน</h1>
          <br></br>
          <StyledFirebaseAuth uiConfig={this.uiConfig_admin} firebaseAuth={firebase.auth()} />
          <h5>สถานะของเว็บไซต์ : <span class={this.state.StatusSwitch ? "badge badge-success" : "badge badge-danger"}>{this.state.StatusSwitch ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน'}</span></h5>
          <a href="https://drive.google.com/open?id=1tX2m7xuK6k8sgWXgMcvSkbO0SPrMYX8g" target="_blank" >คู่มือการลงทะเบียน คลิกที่นี่!!!</a> 
          <h5>Version : 2.3.0</h5>
        </div>
      );

    }
    else if (!this.state.isSignedIn && this.state.StatusSwitch == true) {
      return (
        <div className="container  mx_auto " >
          <br></br><br></br>
          <img src={logo} width="100" alt="Logo" />
          <h1>ระบบลงทะเบียนชุมนุม</h1>
          <h1>โรงเรียนพรหมานุสรณ์จังหวัดเพชรบุรี</h1>
          <br></br>
          <h3 className="text-warning">กรุณาเข้าสู่ระบบด้วยบัญชี Gmail ของโรงเรียนเท่านั้น</h3>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
          <h5>สถานะของเว็บไซต์ : <span class={this.state.StatusSwitch ? "badge badge-success" : "badge badge-danger"}>{this.state.StatusSwitch ? 'เปิดการใช้งาน' : 'ปิดการใช้งาน'}</span></h5>
          <a href="https://drive.google.com/open?id=1tX2m7xuK6k8sgWXgMcvSkbO0SPrMYX8g" target="_blank" >คู่มือการลงทะเบียน คลิกที่นี่!!!</a> 
          <h5>Version : 2.3.0</h5>
        </div>
      );
    }
    else if (this.state.isSignedIn && this.state.StatusSwitch == true) {
      if (firebase.auth().currentUser.email == 'admin@regispromma.co') {
        return (
          <Admin />
        );
      }
      else if(this.state.isSignedIn && firebase.auth().currentUser.email == 'teacher@regispromma.co') {
        return (
          <Teacher />
        );
      }
      else {
        const db = firebase.database();
        var email = firebase.auth().currentUser.email;
        email = email.split('@');
        email = email[0]
        db.ref("M123/" + email).once('value', (snapshot) => {
          if (snapshot.exists) {
            //console.log(snapshot.val())
            if (snapshot.val() == undefined) {
              db.ref("M456/" + email).once('value', (snapshot) => {
                if (snapshot.exists) {
                  if (snapshot.val() == undefined) {
                    this.setState({ pags: 'Guest' });
                  }
                  else {
                    this.setState({ pags: 'M456' });
                  }
                }
                else {
                  console.log("No such document!");
                }
              }).catch((error) => {
                console.log("Error getting document:", error);
              });
            }
           else {
              this.setState({ pags: 'M123' });
            }
          } else {
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
        if (this.state.pags == undefined) {
          return (
            <div className="container mx_auto">
              <br></br><br></br>
              <img src={logo} width="100" alt="Logo" />
              <h1>ระบบลงทะเบียนชุมนุม</h1>
              <h1>โรงเรียนพรหมานุสรณ์จังหวัดเพชรบุรี</h1>
              <br></br><br></br>
              <div className="spinner-border text-info"></div>
            </div>
          );
        }
        else if (this.state.pags == 'M456' && firebase.auth().currentUser.emailVerified) {
          return (
            <M456 />
          );
        }
        else if (this.state.pags == 'M123' && firebase.auth().currentUser.emailVerified) {
          return (
            <M123/>
          );
        }
        else if (this.state.pags == 'Guest'||!firebase.auth().currentUser.emailVerified) {
          return (
            <div className="container mx_auto ">
              <br></br><br></br>
              <img src={logo} width="100" alt="Logo" />
              <h1>ระบบลงทะเบียนชุมนุม</h1>
              <h1>โรงเรียนพรหมานุสรณ์จังหวัดเพชรบุรี</h1>
              <br></br><br></br><br></br>
              <h1 className="text-danger">Error : ไม่สามารถเข้าสู้ระบบได้  ({this.state.pags})</h1>
              <br></br>
              <h1 className="text-danger">กรุณาติดต่อ ผู้ดูแลระบบ หรือ ครูวาสนา เงินทอง เพื่อประสานงาน</h1>
              <Button onClick={() =>{firebase.auth().signOut();  window.location.reload()} }>กลับสู่หน้าหลัก</Button>
            </div>
          );
        }
        else {
          return (
            <div className="container mx_auto ">
              <br></br><br></br>
              <img src={logo} width="100" alt="Logo" />
              <h1>ระบบลงทะเบียนชุมนุม</h1>
              <h1>โรงเรียนพรหมานุสรณ์จังหวัดเพชรบุรี</h1>
              <br></br><br></br><br></br>
              <h1 className="text-danger">Error : ไม่มีในเงื่อนไข</h1>
              <br></br>
              <h1 className="text-danger">กรุณาติดต่อ ผู้ดูแลระบบ หรือ ครูวาสนา เงินทอง เพื่อประสานงาน</h1>
              <Button onClick={() =>{firebase.auth().signOut();  window.location.reload()}}>กลับสู่หน้าหลัก</Button>
            </div>
          );
        }
      }
    }
  }
};



export default SignInScreen;







