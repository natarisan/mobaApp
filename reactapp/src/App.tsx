import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sidenav, Nav, Dropdown, Toggle } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { NewPostDialog } from './NewPostDialog';
import { CalenderFrame } from './CalenderFrame';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { LoginDialog } from './LoginDialog';
import { PassChangeDialog } from './PassChangeDialog';


export const UserInfo = React.createContext<any>("");

export default function App() {

    let d = new Date();
    let dates = [];

    const Header = styled.header`
　          height: 50px;
            top: 0px;
            background-color: #1b2c42;
            width: 100%;
            position: relative;
        `;

    const Body = styled.body`
            background-color: #f0f8ff;
            position: relative;
            height: auto;
            min-height: 720px;
            max-height: 8000px;
            padding-bottom: 52px;
        `;

    const SankakuLeftButton = styled.button`
            color: #333;
            margin-top: 15px;
            position: absolute;
            top: 0px;
            left: 798px;
            :after {
            content: '';
            width: 6px;
            height: 6px;
            border: 0;
            border-top: solid 2px #FFF;
            border-right: solid 2px #FFF;
            position: absolute;
            top: 59%;
            left: 6px;
            margin-top: -4px;
            transform: rotate(-135deg);
            }
            :before {
            content: '';
            width: 18px;
            height: 18px;
            background: #333;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -9px;
            }
        `;

    const SankakuRightButton = styled.button`
            color: #333;
            margin-top: 15px;
            position: absolute;
            top: 0px;
            left: 890px;
            :after {
            content: '';
            width: 6px;
            height: 6px;
            border: 0;
            border-top: solid 2px #FFF;
            border-right: solid 2px #FFF;
            position: absolute;
            top: 50%;
            left: 5px;
            margin-top: -4px;
            transform: rotate(45deg);
            }
            :before {
            content: '';
            width: 18px;
            height: 18px;
            background: #333;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -9px;
            }
        `;

    const Button = styled.button`
            border: 1px solid #ccc;
            background: #f1e767;
            background: -webkit-gradient(linear, left top, left bottom, from(#fdfbfb), to(#ebedee));
            background: -webkit-linear-gradient(top, #fdfbfb 0%, #ebedee 100%);
            background: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
            -webkit-box-shadow: inset 1px 1px 1px #fff;
            box-shadow: inset 1px 1px 1px #fff;
            position: absolute;
            top: 6px;
            right: 500px;
        `;

    const LogOutButton = styled.button`
            border: 1px solid #ccc;
            background: #f1e767;
            background: -webkit-gradient(linear, left top, left bottom, from(#fdfbfb), to(#ebedee));
            background: -webkit-linear-gradient(top, #fdfbfb 0%, #ebedee 100%);
            background: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
            -webkit-box-shadow: inset 1px 1px 1px #fff;
            box-shadow: inset 1px 1px 1px #fff;
            position: absolute;
            top: 7px;
            right: 650px;
        `

    const PassChangeButton = styled.button`
            border: 1px solid #ccc;
            background: #f1e767;
            background: -webkit-gradient(linear, left top, left bottom, from(#fdfbfb), to(#ebedee));
            background: -webkit-linear-gradient(top, #fdfbfb 0%, #ebedee 100%);
            background: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
            -webkit-box-shadow: inset 1px 1px 1px #fff;
            box-shadow: inset 1px 1px 1px #fff;
            margin-top: 0.3%;
            margin-left: 42%;
        `

    const Div = styled.div`
            box-shadow: 10px 10px #708090;
            border-radius: 10px;
            width: 97%;
            position: relative;
            top: 39px;
            left: 25px;
        `;

    const TOGGLE = styled.div`
            position:absolute;          
            display: inline-block;
            top: 12px;
            left: -47%;
        `;

    const BackGround = styled.div`
            background: #2f4f4f;
            width: 125%;
        `;

    const P = styled.p`
            position:absolute;
            margin-top: 12px;
            color: white;        
            position: absolute;
            left: 827px;
            display: inline-block;
            font-weight: bold;
            `;

    const LoginUserName = styled.p`
            position:absolute;
            margin-top: 12px;
            color: white;
            position: absolute;
            top: 1px;
            font-size: 17px;
            font-weight: bold;
            left: 60%;
            display: inline-block;
            `;

    const Footer = styled.footer`
            background-color: #1b2c42;
            height: 50px;
            width: 100%;
            `;

    const [expanded, setExpanded] = useState<boolean>(true);
    const [activeKey, setActiveKey] = useState('1');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(true);
    const [isPassChangeDialogOpen, setIsPassChangeDialogOpen] = useState<boolean>(false);
    const [attendanceTable, setAttendanceTable] = useState<any[][]>([[]]);
    const [attendanceRate, setAttendanceRate] = useState<number[][]>([[], [], [], [], [], [], [], [], [], [], [], []]);

    const [year, setYear] = useState<number>(d.getFullYear());
    const [month, setMonth] = useState<number>(d.getMonth() + 1);
    const [currentSysNumber, setCurrentSysNumber] = useState<number>();
    const [userId, setUserId] = useState<number>(0);
    const [userName, setUserName] = useState<string>("No User");

    const rightButtonClick = () => {
        setMonth(month + 1);
        if (month > 11) {
            setMonth(1);
            setYear(year + 1);
        }
    }

    const leftButtonClick = () => {
        setMonth(month - 1);
        if (month < 2) {
            setMonth(12);
            setYear(year - 1);
        }
    }

    const getLastDay = (years: number, months: number): number => { //getLastDayOfMonth
        return new Date(years, months, 0).getDate();
    };

    const lastDay = getLastDay(year, month); //lastDayOfMonth

    for (let i = 0; i < lastDay; i++) {
        let day = i + 1;
        let e = new Date(year, month - 1, day);
        const dayOfWeekCount = e.getDay();
        const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"]
        let dayOfWeek = dayOfWeekStr[dayOfWeekCount];

        dates.push(month + "/" + day + "(" + dayOfWeek + ")"); //
    }

    const openDialog = () => {  //OpenNewPostDialog
        setIsDialogOpen(!isDialogOpen);
    }

    const closeDialog = () => {
        setIsDialogOpen(false);
    }

    const openLDialog = async () => {
        localStorage.setItem('L', 'LogOut');
        setIsLoginDialogOpen(true);
    }

    const closeLDialog = () => {
        setIsLoginDialogOpen(false);
    }

    const openPDialog = () => {
        setIsPassChangeDialogOpen(true);
    }

    const closePDialog = () => {
        setIsPassChangeDialogOpen(false);
    }

    const getDataFromAttendanceTable = () => {
        fetch(`/getDataFromAttendanceTable_${currentSysNumber}_${year}_${month}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setAttendanceTable(data.message)
            })
    }

    useEffect(() => {

        fetch(`/getDataFromAttendanceTable_${currentSysNumber}_${year}_${month}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setAttendanceTable(data.message)
            })



    }, [year, month, currentSysNumber])

    const getAttendanceRate = () => {
        fetch(`/calcAttendanceRate_${currentSysNumber}_${year}_${month}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setAttendanceRate(data.message)
            })
    }


    return (
        <BrowserRouter>
            <BackGround>

                <Header>
                    <TOGGLE>
                        <Toggle
                            onChange={setExpanded}
                            checked={expanded}
                            checkedChildren="Open"
                            unCheckedChildren="Closed"
                        />
                    </TOGGLE>
                    <Button onClick={openDialog}>出勤状況入力</Button>
                    <LogOutButton onClick={openLDialog}>ログアウト</LogOutButton>
                    <SankakuRightButton onClick={rightButtonClick}></SankakuRightButton>
                    <P>{year}/{month}</P>
                    <LoginUserName>{userName}さん</LoginUserName>
                    <SankakuLeftButton onClick={leftButtonClick}></SankakuLeftButton>

                </Header>

                <Body>
                    <Routes>
                        <Route path="/sys01" element={<Div><CalenderFrame getAttendanceRate={getAttendanceRate} attendanceTable={attendanceTable} year={year} month={month} dates={dates} sysNumber={1} attendanceRateTable={attendanceRate} /> <NewPostDialog isDialogOpen={isDialogOpen} onClickCloseDialog={closeDialog} onClickGetTableData={getDataFromAttendanceTable} year={year} month={month} lastDayOfMonth={lastDay} dates={dates} sysNumber={1} setCurrentSysNumber={setCurrentSysNumber} userId={userId} attendanceTable={attendanceTable} /></Div>} />
                        <Route path="/sys02" element={<Div><CalenderFrame getAttendanceRate={getAttendanceRate} attendanceTable={attendanceTable} year={year} month={month} dates={dates} sysNumber={2} attendanceRateTable={attendanceRate} /> <NewPostDialog isDialogOpen={isDialogOpen} onClickCloseDialog={closeDialog} onClickGetTableData={getDataFromAttendanceTable} year={year} month={month} lastDayOfMonth={lastDay} dates={dates} sysNumber={2} setCurrentSysNumber={setCurrentSysNumber} userId={userId} attendanceTable={attendanceTable} /></Div>} />
                        <Route path="/sys03" element={<Div><CalenderFrame getAttendanceRate={getAttendanceRate} attendanceTable={attendanceTable} year={year} month={month} dates={dates} sysNumber={3} attendanceRateTable={attendanceRate} /> <NewPostDialog isDialogOpen={isDialogOpen} onClickCloseDialog={closeDialog} onClickGetTableData={getDataFromAttendanceTable} year={year} month={month} lastDayOfMonth={lastDay} dates={dates} sysNumber={3} setCurrentSysNumber={setCurrentSysNumber} userId={userId} attendanceTable={attendanceTable} /></Div>} />
                        <Route path="/sys04" element={<Div><CalenderFrame getAttendanceRate={getAttendanceRate} attendanceTable={attendanceTable} year={year} month={month} dates={dates} sysNumber={4} attendanceRateTable={attendanceRate} /> <NewPostDialog isDialogOpen={isDialogOpen} onClickCloseDialog={closeDialog} onClickGetTableData={getDataFromAttendanceTable} year={year} month={month} lastDayOfMonth={lastDay} dates={dates} sysNumber={4} setCurrentSysNumber={setCurrentSysNumber} userId={userId} attendanceTable={attendanceTable} /></Div>} />
                    </Routes>

                    <Sidenav
                        expanded={expanded}
                        defaultOpenKeys={['3', '4']}
                        activeKey={activeKey}
                        onSelect={setActiveKey}
                        style={expanded ? { width: 280 } : { width: 20 }}
                        appearance='default'
                        className='nav-style'
                    >
                        <Sidenav.Body>
                            <Nav>
                                <Dropdown placement="leftStart" eventKey="1" title="Work schedule">
                                    <Dropdown.Item eventKey="3-1"><Link to="/sys01">System01</Link></Dropdown.Item>
                                    <Dropdown.Item eventKey="3-2"><Link to="/sys02">System02</Link></Dropdown.Item>
                                    <Dropdown.Item eventKey="3-3"><Link to="/sys03">System03</Link></Dropdown.Item>
                                    <Dropdown.Item eventKey="3-4"><Link to="/sys04">System04</Link></Dropdown.Item>
                                </Dropdown>
                                <Dropdown placement="rightStart" eventKey="2" title="Settings">
                                    <Dropdown.Item eventKey="4-1">Other</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-2">Bulletin board</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-3">About me</Dropdown.Item>
                                    <Dropdown.Menu eventKey="4-5" title="Custom Action">
                                        <Dropdown.Item eventKey="4-5-1">Another Action01</Dropdown.Item>
                                        <Dropdown.Item eventKey="4-5-2">Another Action02</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>

                    <UserInfo.Provider value={{ setUserId, setUserName }}>
                        <LoginDialog isDialogOpen={isLoginDialogOpen} closeLoginDialog={closeLDialog} />
                    </UserInfo.Provider>
                    <PassChangeDialog isDialogOpen={isPassChangeDialogOpen} userId={userId} closePassDialog={closePDialog} />
                </Body>

                <Footer>
                    <h6 className='logo'>(株)OKIソフトウェア 北陸SC</h6>
                    <PassChangeButton onClick={openPDialog}>パスワード変更</PassChangeButton>
                </Footer>
            </BackGround>
        </BrowserRouter>
    );
}