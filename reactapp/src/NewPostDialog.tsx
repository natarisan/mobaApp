import ReactModal from 'react-modal';
import { useState,FormEvent, ChangeEvent, FC } from 'react';
import styled from 'styled-components';


type Props = {
    isOpen: boolean;
    onClickDelete: () => void;
    onClickGetJson: () => void;
    setCurrentSysNumber: any;
    Year: number;
    Month: number;
    Number: number;
    Days: any[];
    SysNumber: number;
    ID: number|undefined;
}


export const NewPostDialog: FC<Props> = props => {
    const { isOpen, onClickDelete, onClickGetJson, Year, Month, Number, Days, SysNumber, setCurrentSysNumber, ID } = props;

    const [name, setName] = useState<string>("");
    const [array, setArray] = useState<any[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",]);
    const [bool, setBool] = useState<boolean>(false);
    const buttonList = [];
    const buttonYOKOList = [];

    setCurrentSysNumber(SysNumber);

    const Button = styled.button`
            display: flex;
            justify-content: space-between;
            align-items: center;           
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
            text-align: left;
            width: 400px;
            margin-left: auto;
        `;

    const Eiv = styled.div`
            display:flex;
            
        `;

    const customStyles: ReactModal.Styles = {
        // ダイアログ内のスタイル（中央に表示）
        content: {
            top: '53%',
            left: '50%',
            right: '82.5%',
            bottom: '-39%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#f0f8ff',
        },
        // 親ウィンドウのスタイル（ちょっと暗くする）
        overlay: {
            left: '0%',
            background: 'rgba(0, 0, 0, 0.2)',
            top: '5.6%',
            zIndex: '6'
        }
    }

    const updateArray: any = (number: number, state: string) => {
        array[number] = state;
        setArray(array);
        setBool(!bool);
    }

    const vanishArray: any = (number: number) => {
        array[number] = "";
        setArray(array);
        setBool(!bool);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onClickDelete();
        array[0] = ID;
        array[1] = name;
        fetch('/api', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                No: SysNumber,
                record: array,
                year: Year,
                month: Month
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()

                } else {
                    console.warn('Something went wrong on api server! Suc! haha (: ');
                }
            })
            .catch(error => {
                console.error(error);
            })

        onClickGetJson();

        setName("");
        setArray(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",]);
    }

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    for (let i = 4; i < 20; i++) {
        buttonList.push(<Div>
            <span>{Days[i - 4]}</span>
            <b>{array[i]}</b>
            <Button onClick={() => updateArray(i, "出勤")}>出勤</Button>
            <Button onClick={() => updateArray(i, "モバイル")}>ﾓﾊﾞｲﾙ</Button>
            <Button onClick={() => updateArray(i, "出張")}>出張</Button>
            <Button onClick={() => updateArray(i, "休")}>休</Button>
            <Button onClick={() => updateArray(i, "年休")}>年休</Button>
            <Button onClick={() => vanishArray(i)}>クリア</Button>
        </Div>);
    }

    for (let i = 20; i < Number + 4; i++) {
        buttonYOKOList.push(<Div>
            <span>{Days[i - 4]}</span>
            <b>{array[i]}</b>
            <Button onClick={() => updateArray(i, "出勤")}>出勤</Button>
            <Button onClick={() => updateArray(i, "モバイル")}>ﾓﾊﾞｲﾙ</Button>
            <Button onClick={() => updateArray(i, "出張")}>出張</Button>
            <Button onClick={() => updateArray(i, "休")}>休</Button>
            <Button onClick={() => updateArray(i, "年休")}>年休</Button>
            <Button onClick={() => vanishArray(i)}>クリア</Button>
        </Div>);
    }


    return (
        <div>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => onClickDelete()}
                style={customStyles}
                contentLabel="Settings"
            >
                <h3>{Year}年{Month}月</h3>
                <h3>sysNo:{SysNumber}</h3>
                <form onSubmit={handleSubmit} action="/" method="post">
                    <label>{ID}</label>
                    <label> 出張先を入力
                        <input type="text" autoFocus value={name}
                            onChange={handleChangeUsername} name="itemName"></input>
                    </label>
                    <input type="submit" value="更新"></input>

                </form>

                <Eiv>
                    <Div>{buttonList}</Div>
                    <Div>{buttonYOKOList}</Div>
                </Eiv>
            </ReactModal>
        </div>
    );
}
