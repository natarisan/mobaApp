import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Sidenav, Nav, Dropdown, Toggle } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { NewPostDialog } from './NewPostDialog';
import { Calender } from './calender';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { LoginDialog } from './LoginDialog';
//出張先、パスワード入力、状況取得(?)

//useContext
export const UserInfo = React.createContext<any>("");


export default function App() {

    let d = new Date();
    let days = [];

    const Header = styled.header`
　          height: 50px;
            top: 0px;
            background-color: #696969;
            width: 100%;
            position: relative;
        `;

    const Body = styled.body`
            background-color: #c0c0c0;
            position: relative;
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

    const Cutton = styled.button`
            position: absolute;
            top: 130px;
            left: 820px;
            z-index: 2;
            background-color: #a9a9a9;
            border-radius: 20px;
        `;

    const LogOutButton = styled.button`
            position: absolute;
            background-color: white;
            top: 8px;
            right: 650px;
        `

    const Div = styled.div`
            box-shadow: 10px 10px #cd853f;
            border-radius: 10px;
            width: 97%;
            position: relative;
            top: 10px;
            left: 25px;
        `;

    const TOGGLE = styled.div`
            position:absolute;          
            display: inline-block;
            top: 12px;
            left: -1030px;
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
            `;

    const LoginUserName = styled.p`
            position:absolute;
            margin-top: 12px;
            color: white;
            position: absolute;
            top: 1px;
            font-size: 17px;
            font-weight: bold;
            left: 1400px;
            display: inline-block;
            `;

    const Footer = styled.footer`
            background-color: #999986;
            height: 50px;
            width: 100%;
            `;

    const [expanded, setExpanded] = useState<boolean>(true);
    const [activeKey, setActiveKey] = useState('1');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isLDialogOpen, setIsLDialogOpen] = useState<boolean>(true);
    const [users, setUsers] = useState<any[][]>([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
    const [aRate, setARate] = useState<any[][]>([[], [], [], [], [], [], [], [], [], [], [], []]);

    const [year, setYear] = useState<number>(d.getFullYear());
    const [month, setMonth] = useState<number>(d.getMonth() + 1);
    const [currentSysNumber, setCurrentSysNumber] = useState<number>();
    const [userId, setUserId] = useState<number>(0);
    const [userName, setUserName] = useState<string>("No User");

    const sys01 = 1;
    const sys02 = 2;
    const sys03 = 3;
    const sys04 = 4;

    const rightClick = () => {
        setMonth(month + 1);
        if (month > 11) {
            setMonth(1);
            setYear(year + 1);
        }
    }

    const leftClick = () => {
        setMonth(month - 1);
        if (month < 2) {
            setMonth(12);
            setYear(year - 1);
        }
    }

    const getLastDay = (years: number, months: number): number => {
        return new Date(years, months, 0).getDate();
    };

    const lastDay = getLastDay(year, month);

    for (let i = 0; i < lastDay; i++) {
        let dates = i + 1;
        let e = new Date(year, month - 1, dates);
        const dayOfWeek = e.getDay();
        const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"]
        let day = dayOfWeekStr[dayOfWeek];

        days.push(month + "/" + dates + "(" + day + ")");
    }

    const openDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    }

    const closeDialog = () => {
        setIsDialogOpen(false);
    }

    const openLDialog = () => {
        setIsLDialogOpen(true);
    }

    const closeLDialog = () => {
        setIsLDialogOpen(false);
    }

    const getJsonOfUsers = () => {
        fetch(`/api_${currentSysNumber}_${year}_${month}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setUsers(data.message)
            })
    }

    useEffect(() => {

        fetch(`/api_${currentSysNumber}_${year}_${month}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setUsers(data.message)
            })

        fetch(`/loginJudge`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (data.message === 1) {
                    setIsLDialogOpen(false);
                    setUserId(data.id);
                    setUserName(data.name);
                }
            })

    }, [year, month, currentSysNumber])

    const calculateARate = () => {
        fetch(`/tableRate_${currentSysNumber}_${year}_${month}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setARate(data.message)
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
                            checkedChildren="Close"
                            unCheckedChildren="Open"
                        />
                    </TOGGLE>
                    <Button onClick={openDialog}>出勤状況入力</Button>
                    <LogOutButton onClick={openLDialog}>ログアウト</LogOutButton>
                    <SankakuRightButton onClick={rightClick}></SankakuRightButton>
                    <P>{year}/{month}</P>
                    <LoginUserName>{userName}さん</LoginUserName>
                    <SankakuLeftButton onClick={leftClick}></SankakuLeftButton>

                </Header>

                <Body>
                    <Cutton onClick={calculateARate}>出社率計算</Cutton>
                    <Routes>
                        <Route path="/sys01" element={<Div><Calender Number={lastDay} Calender={users} Year={year} Month={month} Days={days} SysNumber={sys01} ARate={aRate} /> <NewPostDialog isOpen={isDialogOpen} onClickDelete={closeDialog} onClickGetJson={getJsonOfUsers} Year={year} Month={month} Number={lastDay} Days={days} SysNumber={sys01} setCurrentSysNumber={setCurrentSysNumber} ID={userId} /></Div>} />
                        <Route path="/sys02" element={<Div><Calender Number={lastDay} Calender={users} Year={year} Month={month} Days={days} SysNumber={sys02} ARate={aRate} /> <NewPostDialog isOpen={isDialogOpen} onClickDelete={closeDialog} onClickGetJson={getJsonOfUsers} Year={year} Month={month} Number={lastDay} Days={days} SysNumber={sys02} setCurrentSysNumber={setCurrentSysNumber} ID={userId} /></Div>} />
                        <Route path="/sys03" element={<Div><Calender Number={lastDay} Calender={users} Year={year} Month={month} Days={days} SysNumber={sys03} ARate={aRate} /> <NewPostDialog isOpen={isDialogOpen} onClickDelete={closeDialog} onClickGetJson={getJsonOfUsers} Year={year} Month={month} Number={lastDay} Days={days} SysNumber={sys03} setCurrentSysNumber={setCurrentSysNumber} ID={userId} /></Div>} />
                        <Route path="/sys04" element={<Div><Calender Number={lastDay} Calender={users} Year={year} Month={month} Days={days} SysNumber={sys04} ARate={aRate} /> <NewPostDialog isOpen={isDialogOpen} onClickDelete={closeDialog} onClickGetJson={getJsonOfUsers} Year={year} Month={month} Number={lastDay} Days={days} SysNumber={sys04} setCurrentSysNumber={setCurrentSysNumber} ID={userId} /></Div>} />
                    </Routes>

                    <Sidenav
                        expanded={expanded}
                        defaultOpenKeys={['3', '4']}
                        activeKey={activeKey}
                        onSelect={setActiveKey}
                        style={expanded ? { width: 280 } : { width: 20 }}
                        appearance='default'
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
                                        <Dropdown.Item eventKey="4-5-2">AnotherAction02</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>

                    <UserInfo.Provider value={{ userName,userId,setUserId,setUserName }}>
                        <LoginDialog isOpen={isLDialogOpen} closeLDialog={closeLDialog} />
                    </UserInfo.Provider>
                    <button onClick={calculateARate}>a</button>
                </Body>

                <Footer>
                    <p>(株)OKIソフトウェア 北陸SC</p>
                </Footer>
            </BackGround>
        </BrowserRouter>
    );
}


