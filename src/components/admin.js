
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
import { Row, FormGroup, Label, Input, FormFeedback, Table, Col } from 'reactstrap';
import firebase from '../firebase';
import XLSX from 'xlsx'
const sub123_admin = firebase.initializeApp({
    databaseURL: "https://regispromma-sub123.firebaseio.com/"
}, 'sub123_admin');
const sub456_admin = firebase.initializeApp({
    databaseURL: "https://regispromma-sub456.firebaseio.com/"
}, 'sub456_admin');
const subAll_admin = firebase.initializeApp({
    databaseURL: "https://regispromma-all.firebaseio.com/"
}, 'subAll_admin');

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
        this.handleC = this.handleC.bind(this)
        this.handleS = this.handleS.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.toggle = this.toggle.bind(this);
        this.menu_1 = this.menu_1.bind(this);
        this.menu_2 = this.menu_2.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    componentDidMount() {
        var db = firebase.database();
        var db_sub123 = firebase.database(sub123_admin);
        var db_sub456 = firebase.database(sub456_admin);
        var db_subAll = firebase.database(subAll_admin);
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
    onChangest = datest => this.setState({ datest })
    onChangeen = dateen => this.setState({ dateen })
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleDate(e) {
    }
    handleSubmit(e) {
        e.preventDefault();
        //var db = firebase.database();
        var db_sub123 = firebase.database(sub123_admin);
        var db_sub456 = firebase.database(sub456_admin);
        var db_subAll = firebase.database(subAll_admin);
        if (this.state.item_id != '') {
            return this.updateItem();
        }
        if (this.state.select == 1) {
            db_sub123.ref("/Sub123").push({
                openSub: true,
                subjects: this.state.subjects,
                teacher: this.state.teacher,
                max: this.state.numStudents,
                detail: this.state.detail,
                class: 'ม.ต้น'
            });
            this.setState({
                openSub: undefined,
                item_id: '',
                subjects: '',
                teacher: '',
                max: '',
                detail: '',
            })
        }
        else if (this.state.select == 2) {
            db_sub456.ref("/Sub456").push({
                openSub: true,
                subjects: this.state.subjects,
                teacher: this.state.teacher,
                max: this.state.numStudents,
                detail: this.state.detail,
                class: 'ม.ปลาย'
            });
            this.setState({
                openSub: undefined,
                item_id: '',
                subjects: '',
                teacher: '',
                max: '',
                detail: '',
            })
        }
        else if (this.state.select == 3) {
            db_subAll.ref("/SubAll").push({
                openSub: true,
                subjects: this.state.subjects,
                teacher: this.state.teacher,
                max: this.state.numStudents,
                detail: this.state.detail,
                class: 'ทุกระดับ'
            });
            this.setState({
                openSub: undefined,
                item_id: '',
                subjects: '',
                teacher: '',
                max: '',
                detail: '',
            })
        }
    }
    removeItem(itemId, classR) {
        var db_sub123 = firebase.database(sub123_admin);
        var db_sub456 = firebase.database(sub456_admin);
        var db_subAll = firebase.database(subAll_admin);
        if (classR == 'ม.ต้น') {
            db_sub123.ref('/Sub123').child(itemId).remove();
        }
        else if (classR == 'ม.ปลาย') {
            db_sub456.ref('/Sub456').child(itemId).remove();
        }
        else if (classR == 'ทุกระดับ') {
            db_subAll.ref('/SubAll').child(itemId).remove();
        }
    }
    exportFile(itemId, classR, subjects) {
        var db_sub123 = firebase.database(sub123_admin);
        var db_sub456 = firebase.database(sub456_admin);
        var db_subAll = firebase.database(subAll_admin);
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
    exportAll() {
        var db_sub123 = firebase.database(sub123_admin);
        var db_sub456 = firebase.database(sub456_admin);
        var db_subAll = firebase.database(subAll_admin);
        let users = [["เลขประจำตัว", "ชื่อ - นามสกุล", "ห้อง", "ชื่อชุมนุม"]]

        db_sub123.ref('Sub123/').once('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                var Member = []
                if (items[item].Member != undefined) {
             //       console.log(items[item].Member)
                    for (let item1 in items[item].Member) {
                        Member.push(items[item].Member[item1])
                    }
                    for (let item1 in Member) {
                        users.push([Member[item1].number, Member[item1].Name, Member[item1].classRoom, items[item].subjects])
                    }
                }
            }
        })
        db_sub456.ref('Sub456/').once('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                var Member = []
                if (items[item].Member != undefined) {
           //         console.log(items[item].Member)
                    for (let item1 in items[item].Member) {
                        Member.push(items[item].Member[item1])
                    }
                    for (let item1 in Member) {
                        users.push([Member[item1].number, Member[item1].Name, Member[item1].classRoom, items[item].subjects])
                    }
                }
            }
        })
        db_subAll.ref('SubAll/').once('value', snapshot => {
            let items = snapshot.val();
            for (let item in items) {
                var Member = []
                if (items[item].Member != undefined) {
         //           console.log(items[item].Member)
                    for (let item1 in items[item].Member) {
                        Member.push(items[item].Member[item1])
                    }
                    for (let item1 in Member) {
                        users.push([Member[item1].number, Member[item1].Name, Member[item1].classRoom, items[item].subjects])
                    }
                }
            }
        })
       // console.log(users)
        const wb = XLSX.utils.book_new()
         const wsAll = XLSX.utils.aoa_to_sheet(users)
         XLSX.utils.book_append_sheet(wb, wsAll, "All Users")
         XLSX.writeFile(wb,"รายชื่อนักเรียนทุกชุมนุม.xlsx")
    }
    handleC(checked) {
        var db = firebase.database();
        this.setState({ checked });
        this.state.real = !this.state.real;
        db.ref("/openweb").set({
            value: this.state.real
        });
    }

    handleS(itemId, classR, status) {
        var db = firebase.database();
        var db_sub123 = firebase.database(sub123_admin);
        var db_sub456 = firebase.database(sub456_admin);
        var db_subAll = firebase.database(subAll_admin);
        if (classR == 'ม.ต้น') {
            db_sub123.ref('Sub123/' + itemId).update({
                openSub: !status
            });
        }
        else if (classR == 'ม.ปลาย') {
            db_sub456.ref('Sub456/' + itemId).update({
                openSub: !status
            });
        }
        else if (classR == 'ทุกระดับ') {
            db_subAll.ref('SubAll/' + itemId).update({
                openSub: !status
            });
        }
    }
    menu_1() {
        this.state.page = '1';
        console.log(this.state.page)
        this.forceUpdate();
    }
    menu_2() {
        this.state.page = '2';
        console.log(this.state.page)
        this.forceUpdate();
    }
    render() {

        if (this.state.page == '1') {
            return (
                <div className="app">
                    <Navbar style={{ backgroundColor: '#ffffffd7' }} expand="md">
                        <NavbarBrand >PrommaRegis</NavbarBrand>
                        <NavItem>
                            <NavLink onClick={this.menu_1}>Home</NavLink>
                            <NavLink onClick={this.menu_2}>SetTime</NavLink>
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
                        <h1>ระบบลงทะเบียนชุมนุม (Admin)</h1>
                    </div>
                    <br></br><br></br>
                    <Row className="table60 mx-auto">
                        <Col xs="6" sm="4"  > <label htmlFor="material-switch" className="ml-auto">
                            <Switch
                                checked={this.state.checked}
                                onChange={this.handleC}
                                className="react-switch"
                            />
                            <p>สถานะระบบ :  <span>{this.state.checked ? 'on' : 'off'}</span></p>
                        </label ></Col>
                        <Col xs="6" sm="4">
                            <Button className='col-6 btn btn-warning ex2' onClick={this.exportAll} >Export All</Button>
                        </Col>
                        <Col xs="6" sm="4" >
                            <Button className='col-6 btn btn-success ex1' onClick={this.toggle} > เพิ่มรายชื่อชุมนุม</Button>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="app">
                        <ModalHeader>เพิ่มรายชื่อชุมนุม</ModalHeader>
                        <ModalBody>
                            <form className="was-validated" >
                                <FormGroup>
                                    <Label for="subjects">ชื่อชุมนุม</Label>
                                    <Input name="subjects" type="text" id="subjects" onChange={this.handleChange} value={this.state.subjects} required  >
                                    </Input>
                                    <FormFeedback>กรุณากรอกชื่อชุมนุม</FormFeedback>
                                    <FormFeedback valid></FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="teacher">ชื่อครูผู้สอน</Label>
                                    <Input name="teacher" type="text" id="teacher" onChange={this.handleChange} value={this.state.teacher} required  >
                                    </Input>
                                    <FormFeedback>กรุณากรอกชื่อครูผู้สอน</FormFeedback>
                                    <FormFeedback valid></FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="numStudents">จำนวนนักเรียน</Label>
                                    <Input name="numStudents" type="number" id="numStudents" onChange={this.handleChange} value={this.state.numStudents} required  >
                                    </Input>
                                    <FormFeedback>กรุณากรอกจำนวนนักเรียน</FormFeedback>
                                    <FormFeedback valid></FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="detail">รายละเอียดเพิ่มเติม</Label>
                                    <Input type="textarea" name="detail" id="detail" onChange={this.handleChange} value={this.state.detail} rows="5" >
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="detail">ระดับชั้น</Label>
                                    <Input name="select" id="select" type="select" onChange={this.handleChange} value={this.state.select} required>
                                        <option value="">กรุณาเลือกระดับชั้น</option>
                                        <option value="1">ม.ต้น</option>
                                        <option value="2">ม.ปลาย</option>
                                        <option value="3">ทุกระดับ</option>
                                    </Input>
                                    <FormFeedback>กรุณาเลือกระดับชั้น</FormFeedback>
                                    <FormFeedback valid></FormFeedback>
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleSubmit} >บันทึกข้อมูล</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <div className="table80 mx-auto" style={{ marginTop: 40 }} >
                        <Table className="table table-bordered table-striped">
                            <thead>
                                <tr className="thead-dark">
                                    <th width="10%">สถานะวิชา</th>
                                    <th width="20%">ชื่อชุมนุม</th>
                                    <th width="26%">ชื่อครูผู้สอน</th>
                                    <th width="23%">รายละเอียดเพิ่มเติม</th>
                                    <th width="6%">ระดับชั้น</th>
                                    <th width="5%">จำนวน</th>
                                    <th width="10%">Delete</th>
                                </tr>
                            </thead>
                            {
                                this.state.items_123.map((item) => {
                                    if (item.count == 0) {
                                        return (
                                            <tr>

                                                <td>
                                                    <button
                                                        className={item.openSub ? "btn btn-danger btn-sm" : "btn btn-warning btn-sm"}
                                                        onClick={() => this.handleS(item.item_id, item.class, item.openSub)} >
                                                        {item.openSub ? 'ปิดวิชานี้' : 'เปิดวิชานี้'}
                                                    </button>
                                                </td>
                                                <td>{item.subjects}</td>
                                                <td>{item.teacher}</td>
                                                <td>{item.detail}</td>
                                                <td>{item.class}</td>
                                                <td>{item.count}/{item.max}</td>
                                                <td><button className="btn btn-danger btn-sm" onClick={() => this.removeItem(item.item_id, item.class)}>Delete</button> &nbsp;
                                            <button className="btn btn-success btn-sm" disabled>CSV</button></td>
                                            </tr>
                                        )
                                    }
                                    else {
                                        return (
                                            <tr>
                                                <td>
                                                    <button
                                                        className={item.openSub ? "btn btn-danger btn-sm" : "btn btn-warning btn-sm"}
                                                        onClick={() => this.handleS(item.item_id, item.class, item.openSub)} >
                                                        {item.openSub ? 'ปิดวิชานี้' : 'เปิดวิชานี้'}
                                                    </button>
                                                </td>
                                                <td>{item.subjects}</td>
                                                <td>{item.teacher}</td>
                                                <td>{item.detail}</td>
                                                <td>{item.class}</td>
                                                <td>{item.count}/{item.max}</td>
                                                <td><button className="btn btn-danger btn-sm" disabled>Delete</button> &nbsp;
                                            <button className="btn btn-success btn-sm" onClick={() => this.exportFile(item.item_id, item.class, item.subjects)}>CSV</button></td>
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
                                                <td>
                                                    <button
                                                        className={item.openSub ? "btn btn-danger btn-sm" : "btn btn-warning btn-sm"}
                                                        onClick={() => this.handleS(item.item_id, item.class, item.openSub)} >
                                                        {item.openSub ? 'ปิดวิชานี้' : 'เปิดวิชานี้'}
                                                    </button>
                                                </td>
                                                <td>{item.subjects}</td>
                                                <td>{item.teacher}</td>
                                                <td>{item.detail}</td>
                                                <td>{item.class}</td>
                                                <td>{item.count}/{item.max}</td>
                                                <td><button className="btn btn-danger btn-sm" onClick={() => this.removeItem(item.item_id, item.class)}>Delete</button> &nbsp;
                                            <button className="btn btn-success btn-sm" disabled >CSV</button></td>
                                            </tr>
                                        )
                                    }
                                    else {
                                        return (
                                            <tr>
                                                <td>
                                                    <button
                                                        className={item.openSub ? "btn btn-danger btn-sm" : "btn btn-warning btn-sm"}
                                                        onClick={() => this.handleS(item.item_id, item.class, item.openSub)} >
                                                        {item.openSub ? 'ปิดวิชานี้' : 'เปิดวิชานี้'}
                                                    </button>
                                                </td>
                                                <td>{item.subjects}</td>
                                                <td>{item.teacher}</td>
                                                <td>{item.detail}</td>
                                                <td>{item.class}</td>
                                                <td>{item.count}/{item.max}</td>
                                                <td><button className="btn btn-danger btn-sm" disabled>Delete</button> &nbsp;
                                            <button className="btn btn-success btn-sm" onClick={() => this.exportFile(item.item_id, item.class, item.subjects)}>CSV</button></td>
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
                                                <td>
                                                    <button
                                                        className={item.openSub ? "btn btn-danger btn-sm" : "btn btn-warning btn-sm"}
                                                        onClick={() => this.handleS(item.item_id, item.class, item.openSub)} >
                                                        {item.openSub ? 'ปิดวิชานี้' : 'เปิดวิชานี้'}
                                                    </button>
                                                </td>
                                                <td>{item.subjects}</td>
                                                <td>{item.teacher}</td>
                                                <td>{item.detail}</td>
                                                <td>{item.class}</td>
                                                <td>{item.count}/{item.max}</td>
                                                <td><button className="btn btn-danger btn-sm" onClick={() => this.removeItem(item.item_id, item.class)}>Delete</button> &nbsp;
                                            <button className="btn btn-success btn-sm" disabled >CSV</button></td>
                                            </tr>
                                        )
                                    }
                                    else {
                                        return (
                                            <tr>
                                                <td>
                                                    <button
                                                        className={item.openSub ? "btn btn-danger btn-sm" : "btn btn-warning btn-sm"}
                                                        onClick={() => this.handleS(item.item_id, item.class, item.openSub)} >
                                                        {item.openSub ? 'ปิดวิชานี้' : 'เปิดวิชานี้'}
                                                    </button>
                                                </td>
                                                <td>{item.subjects}</td>
                                                <td>{item.teacher}</td>
                                                <td>{item.detail}</td>
                                                <td>{item.class}</td>
                                                <td>{item.count}/{item.max}</td>
                                                <td><button className="btn btn-danger btn-sm" disabled>Delete</button> &nbsp;
                                            <button className="btn btn-success btn-sm" onClick={() => this.exportFile(item.item_id, item.class, item.subjects)}>CSV</button></td>
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
        else {
            return (
                <div className="app">

                    <Navbar style={{ backgroundColor: '#ffffffd7' }} expand="md">
                        <NavbarBrand >PrommaRegis</NavbarBrand>
                        <NavItem>
                            <NavLink onClick={this.menu_1}>Home</NavLink>
                            <NavLink onClick={this.menu_2}>SetTime</NavLink>
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
                        <h1>ระบบลงทะเบียนชุมนุม (Admin)</h1>
                    </div>
                    <br></br> <br></br>
                    <Row>

                        <Button className='col-2 btn btn-success mx-auto ex1' onClick={this.toggle} > ตั้งเวลา </Button>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className="app">
                        <ModalHeader>ตั้งเวลา</ModalHeader>
                        <ModalBody>
                            <form className="was-validated" >
                                <FormGroup>
                                    <Label for="timestart">ตั้งค่าเวลาเปิด</Label>
                                    <DateTimePicker
                                        onChange={this.onChangest}
                                        value={this.state.datest}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="timeend">ตั้งค่าเวลาปิด</Label>
                                    <DateTimePicker
                                        onChange={this.onChangeen}
                                        value={this.state.dateen}
                                    />
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleDate} >บันทึกข้อมูล</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
    }
}
export default App;
