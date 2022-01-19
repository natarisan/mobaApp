import ReactModal from 'react-modal';
import { useEffect, useState, ChangeEvent, FC, memo } from 'react';
import styled from 'styled-components';

//出勤状況登録(更新)の画面。
//propsと関数等の順番を考えてくれると嬉しい。
type Props = {
    attendanceTable: any[][];
    isDialogOpen: boolean;
    onClickCloseDialog: () => void;
    onClickGetTableData: () => void;
    setCurrentSysNumber: any;
    year: number;
    month: number;
    lastDayOfMonth: number;
    dates: string[];
    sysNumber: number;
    userId: number;
}


export const NewPostDialog: FC<Props> = memo(props => {

    const Button = styled.button`          
            padding: 1em 0.75em;
            width: 40px;
            color: #333;
            font-size: 8px;
            font-weight: 700;
            background-color: #cccccc;
            border-radius: 50vh;
            display: inline-block;
        `;

    const Div = styled.div`
            padding: 4px;
            display: inline-block;
        `;

    const BigDiv = styled.div` 
            display: flex;            
        `;

    const customStyles: ReactModal.Styles = {
        //子ウィンドウを中央に広範囲に表示
        content: {
            top: '48%',
            left: '50%',
            right: '82.5%',
            bottom: '-39%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#f0f8ff',
        },
        // 親ウィンドウを少し暗くする
        overlay: {
            left: '0%',
            background: 'rgba(0, 0, 0, 0.2)',
            top: '5.6%',
            zIndex: '6'
        }
    }

    const { attendanceTable, isDialogOpen, onClickCloseDialog, onClickGetTableData, setCurrentSysNumber, year, month, lastDayOfMonth, dates, sysNumber, userId } = props;
    const [travelTo, setTravelTo] = useState<string>("");
    const [situationArray, setSituationArray] = useState<any[]>([""]);
    const [bool, setBool] = useState<boolean>(false);
    const buttonList1 = [];
    const buttonList2 = [];
    let currentTableId: number = 0;

    setCurrentSysNumber(sysNumber);

    useEffect(() => {
        //テーブルの何行目か(currentTableId)を計算する。
        switch (sysNumber) {
            case 1:
                currentTableId = userId - 101;
                break;
            case 2:
                currentTableId = userId - 201;
                break;
            case 3:
                currentTableId = userId - 301;
                break;
            case 4:
                currentTableId = userId - 401;
                break;
        }

        if (attendanceTable[currentTableId] !== undefined) {
            setSituationArray(attendanceTable[currentTableId]);
        }

    }, [])

    const updateSituationArray: any = (index: number, state: string) => {
        situationArray[index] = state;
        setSituationArray(situationArray);
        setBool(!bool);
    }

    const vanishSituationArrayElement: any = (index: number) => {
        situationArray[index] = "";
        setSituationArray(situationArray);
        setBool(!bool);
    }

    const handleSubmit = () => {

        onClickCloseDialog();

        situationArray[0] = userId;
        situationArray[4] = travelTo;

        fetch('/updateAttendanceTable', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sysNumber: sysNumber,
                record: situationArray,
                year: year,
                month: month
            })
        })
            .catch(error => {
                console.error(error);
            })

        onClickGetTableData();

        setTravelTo("");
        setSituationArray([""]);
    }

    const handleChangeTravelTo = (e: ChangeEvent<HTMLInputElement>) => {
        setTravelTo(e.target.value);
    }

    //1日～16日のボタンを入れる。グループ分けして表示を二列に分けたかった。
    for (let i = 5; i < 21; i++) {
        buttonList1.push(<Div>
            <span>{dates[i - 5]}</span>
            <b>{situationArray[i]}</b>
            <Button onClick={() => updateSituationArray(i, "出勤")}>出勤</Button>
            <Button onClick={() => updateSituationArray(i, "モバイル")}>ﾓﾊﾞｲﾙ</Button>
            <Button onClick={() => updateSituationArray(i, "出張")}>出張</Button>
            <Button onClick={() => updateSituationArray(i, "休")}>休</Button>
            <Button onClick={() => updateSituationArray(i, "年休")}>年休</Button>
            <Button onClick={() => vanishSituationArrayElement(i)}>クリア</Button>
        </Div>);
    }

    //17日～31日のボタンを入れる。グループ分けして表示を二列に分けたかった。
    for (let i = 21; i < lastDayOfMonth + 5; i++) {
        buttonList2.push(<Div>
            <span>{dates[i - 5]}</span>
            <b>{situationArray[i]}</b>
            <Button onClick={() => updateSituationArray(i, "出勤")}>出勤</Button>
            <Button onClick={() => updateSituationArray(i, "モバイル")}>ﾓﾊﾞｲﾙ</Button>
            <Button onClick={() => updateSituationArray(i, "出張")}>出張</Button>
            <Button onClick={() => updateSituationArray(i, "休")}>休</Button>
            <Button onClick={() => updateSituationArray(i, "年休")}>年休</Button>
            <Button onClick={() => vanishSituationArrayElement(i)}>クリア</Button>
        </Div>);
    }


    return (
        <div>
            <ReactModal
                isOpen={isDialogOpen}
                onRequestClose={() => onClickCloseDialog()}
                style={customStyles}
                contentLabel="Settings"
            >
                <h3>{year}年{month}月</h3>
                <h3>sysNo:{sysNumber}</h3>
                <form onSubmit={handleSubmit} action="/" method="post">
                    <label>{userId}</label>
                    <label> 出張先を入力(30字まで)
                        <input type="text" autoFocus value={travelTo} maxLength={30} placeholder={situationArray[4]}
                            onChange={handleChangeTravelTo} name="itemName"></input>
                    </label>
                    <input type="submit" value="更新"></input>

                </form>

                <BigDiv>
                    <Div>{buttonList1}</Div>
                    <Div>{buttonList2}</Div>
                </BigDiv>
            </ReactModal>
        </div>
    );
});
