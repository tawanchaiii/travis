
import React, { Component } from 'react';
import Switch from "react-switch";
import DateTimePicker from 'react-datetime-picker';
// Styles
import '../App.css'; // This uses CSS modules.
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, FormGroup, Label, Input, FormFeedback, Table } from 'reactstrap';
import firebase from '../firebase';
import XLSX from 'xlsx'
const sub123_teacher = firebase.initializeApp({
    databaseURL: "https://regispromma-sub123.firebaseio.com/"
}, 'sub123_teacher');
const sub456_teacher = firebase.initializeApp({
    databaseURL: "https://regispromma-sub456.firebaseio.com/"
}, 'sub456_teacher');
const subAll_teacher = firebase.initializeApp({
    databaseURL: "https://regispromma-all.firebaseio.com/"
}, 'subAll_teacher');

class App extends Component {

    constructor() {
        super();
        this.state = {
            items_123: [],
            items_456: [],
            items_all: [],
            item_id: '',
            openSub: undefined,
            subjects: '',
            teacher: '',
            numStudents: '',
            detail: '',
            select: '',
            isOpen: false,
            modal: false,
            checked: undefined,
            page: '1',
            datest: new Date(),
            dateen: new Date(),
        }
      /*  this.handleC = this.handleC.bind(this)
        this.handleS = this.handleS.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.toggle = this.toggle.bind(this);
        this.menu_1 = this.menu_1.bind(this);
        this.menu_2 = this.menu_2.bind(this);*/
    }
    componentDidMount() {
        var db = firebase.database();
        var db_sub123 = firebase.database(sub123_teacher);
        var db_sub456 = firebase.database(sub456_teacher);
        var db_subAll = firebase.database(subAll_teacher);
        db.ref('openweb').on('value', (snapshot) => {
            var items = snapshot.val().value;
            this.setState({ checked: items });
            this.setState({ real: items });
        })
        db_sub123.ref('Sub123').on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                var Member = []
                if (items[item].Member != undefined) {
                    for (let item1 in items[item].Member) {
                        Member.push(item1)
                    }
                }
                newState.push({
                    item_id: item,
                    openSub: items[item].openSub,
                    subjects: items[item].subjects,
                    teacher: items[item].teacher,
                    detail: items[item].detail,
                    class: items[item].class,
                    max: items[item].max,
                    count: Member.length
                })
            }
            newState.sort(function (a, b) {
                var nameA = a.subjects.toUpperCase(); // ignore upper and lowercase
                var nameB = b.subjects.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                items_123: newState
            })
        })
        db_sub456.ref('Sub456').on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                var Member = []
                if (items[item].Member != undefined) {
                    for (let item1 in items[item].Member) {
                        Member.push(item1)
                    }
                }
                newState.push({
                    item_id: item,
                    openSub: items[item].openSub,
                    subjects: items[item].subjects,
                    teacher: items[item].teacher,
                    detail: items[item].detail,
                    class: items[item].class,
                    max: items[item].max,
                    count: Member.length
                })
            }
            newState.sort(function (a, b) {
                var nameA = a.subjects.toUpperCase(); // ignore upper and lowercase
                var nameB = b.subjects.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                items_456: newState
            })
        })
        db_subAll.ref('SubAll').on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                var Member = []
                if (items[item].Member != undefined) {
                    for (let item1 in items[item].Member) {
                        Member.push(item1)
                    }
                }
                newState.push({
                    item_id: item,
                    openSub: items[item].openSub,
                    subjects: items[item].subjects,
                    teacher: items[item].teacher,
                    detail: items[item].detail,
                    class: items[item].class,
                    max: items[item].max,
                    count: Member.length
                })
            }
            newState.sort(function (a, b) {
                var nameA = a.subjects.toUpperCase(); // ignore upper and lowercase
                var nameB = b.subjects.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                items_all: newState,
            })
        })
    }
    exportFile(itemId, classR, subjects) {
        var db_sub123 = firebase.database(sub123_teacher);
        var db_sub456 = firebase.database(sub456_teacher);
        var db_subAll = firebase.database(subAll_teacher);
        let users = [["เลขประจำตัว", "ชื่อ - นามสกุล", "ห้อง", "ชื่อชุมนุม"]]
        if (classR == 'ม.ต้น') {
            db_sub123.ref('Sub123/' + itemId + '/Member').once('value', snapshot => {
                //console.log(snapshot.numChildren())
                snapshot.forEach(snap => {
                    var data = snap.val()
                    users.push([data.number, data.Name, data.classRoom, subjects])
                })
            })
        }
        else if (classR == 'ม.ปลาย') {
            db_sub456.ref('Sub456/' + itemId + '/Member').once('value', snapshot => {
                //console.log(snapshot.numChildren())
                snapshot.forEach(snap => {
                    var data = snap.val()
                    users.push([data.number, data.Name, data.classRoom, subjects])
                })
            })
        }
        else if (classR == 'ทุกระดับ') {
            db_subAll.ref('SubAll/' + itemId + '/Member').once('value', snapshot => {
                //console.log(snapshot.numChildren())
                snapshot.forEach(snap => {
                    var data = snap.val()
                    users.push([data.number, data.Name, data.classRoom, subjects])
                })
            })
        }
        const wb = XLSX.utils.book_new()
        const wsAll = XLSX.utils.aoa_to_sheet(users)
        XLSX.utils.book_append_sheet(wb, wsAll, "All Users")
        XLSX.writeFile(wb, subjects + ".xlsx")
    }
    render() {
        return (
            <div className="app">
                <Navbar style={{ backgroundColor: '#ffffffd7' }} expand="md">
                    <NavbarBrand >PrommaRegis</NavbarBrand>
                    <NavItem>
                        <NavLink >Home</NavLink>
                    </NavItem>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                        </Nav>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                ยินดีต้อนรับคุณ {firebase.auth().currentUser.email}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={() => firebase.auth().signOut()}>
                                    ออกจากระบบ
                                        </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Collapse>
                </Navbar>
                <div className="text-center">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1>ระบบลงทะเบียนชุมนุม (Teacher)</h1>
                </div>
                <br></br>
                <div className="table80 mx-auto" style={{ marginTop: 40 }} >
                    <Table className="table table-bordered table-striped">
                        <thead>
                            <tr className="thead-dark">
                                <th width="20%">ชื่อชุมนุม</th>
                                <th width="31%">ชื่อครูผู้สอน</th>
                                <th width="33%">รายละเอียดเพิ่มเติม</th>
                                <th width="6%">ระดับชั้น</th>
                                <th width="5%">จำนวน</th>
                                <th width="5%">Export</th>
                            </tr>
                        </thead>
                        {
                            this.state.items_123.map((item) => {
                                if (item.count == 0) {
                                    return (
                                        <tr>
                                            <td>{item.subjects}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.detail}</td>
                                            <td>{item.class}</td>
                                            <td>{item.count}/{item.max}</td>
                                            <td><button className="btn btn-success btn-sm" disabled>CSV</button></td>
                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tr>
                                            <td>{item.subjects}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.detail}</td>
                                            <td>{item.class}</td>
                                            <td>{item.count}/{item.max}</td>
                                            <td><button className="btn btn-success btn-sm" onClick={() => this.exportFile(item.item_id, item.class, item.subjects)}>CSV</button></td>
                                        </tr>
                                    )
                                }

                            })
                        }
                        {
                            this.state.items_456.map((item) => {
                                if (item.count == 0) {
                                    return (
                                        <tr>
                                            <td>{item.subjects}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.detail}</td>
                                            <td>{item.class}</td>
                                            <td>{item.count}/{item.max}</td>
                                            <td><button className="btn btn-success btn-sm" disabled >CSV</button></td>
                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tr>
                                            <td>{item.subjects}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.detail}</td>
                                            <td>{item.class}</td>
                                            <td>{item.count}/{item.max}</td>
                                            <td><button className="btn btn-success btn-sm" onClick={() => this.exportFile(item.item_id, item.class, item.subjects)}>CSV</button></td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        {
                            this.state.items_all.map((item) => {
                                if (item.count == 0) {
                                    return (
                                        <tr>
                                            <td>{item.subjects}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.detail}</td>
                                            <td>{item.class}</td>
                                            <td>{item.count}/{item.max}</td>
                                            <td><button className="btn btn-success btn-sm" disabled >CSV</button></td>
                                        </tr>
                                    )
                                }
                                else {
                                    return (
                                        <tr>
                                            <td>{item.subjects}</td>
                                            <td>{item.teacher}</td>
                                            <td>{item.detail}</td>
                                            <td>{item.class}</td>
                                            <td>{item.count}/{item.max}</td>
                                            <td> <button className="btn btn-success btn-sm" onClick={() => this.exportFile(item.item_id, item.class, item.subjects)}>CSV</button></td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </Table>
                </div>
            </div>
        );
    }

}
export default App;
