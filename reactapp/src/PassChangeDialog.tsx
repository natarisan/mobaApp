import ReactModal from 'react-modal';
import { useState, FormEvent, ChangeEvent, FC } from 'react';

type Props = {
    isOpen: boolean;
    ID: number;
    closePDialog: () => void;
}

export const PassChangeDialog: FC<Props> = props => {

    const { isOpen, ID, closePDialog } = props;

    const [password1, setPassword1] = useState<string>("");

    const [password2, setPassword2] = useState<string>("");

    const [alert, setAlert] = useState<string>("");

    let a = ID % 100;
    let b = ID - a;
    let sysNumber = b / 100;

    const customStyles: ReactModal.Styles = {
        // ダイアログ内のスタイル（中央に表示）
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
        // 親ウィンドウのスタイル（ちょっと暗くする）
        overlay: {
            left: '0%',
            background: 'rgba(0, 0, 0, 0.2)',
            width: '100%',
            zIndex: '10'
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password1 === "" || password2 === "") {
            setAlert("入力されていません。")
            return;
        }

        if (password1 === password2) {
            fetch('/updatePassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password1,
                    ID: ID,
                    sysNumber: sysNumber
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        closePDialog();
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        } else {
            setAlert("パスワードとパスワード(確認)が一致していません。");
        }

        setPassword1("");
        setPassword2("");
    }

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword1(e.target.value);
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword2(e.target.value);
    }


    return (
        <>
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Settings"
            >
                <form onSubmit={handleSubmit} action="/" method="post">
                    <label> 【パスワード変更画面】
                        <div>
                            <label>パスワード====⇒
                        <input type="password" autoFocus value={password1}
                                    onChange={handleChangeUsername} name="pass1"></input>
                            </label>
                        </div>
                        <div>
                            <label>パスワード(確認)⇒
                        <input type="password" autoFocus value={password2}
                                    onChange={handleChangePassword} name="pass2"></input>
                            </label>
                        </div>
                        <p>{ alert }</p>
                        <input type="submit" value="変更"></input>
                        <button onClick={closePDialog}>閉じる</button>
                    </label>
                </form>
            </ReactModal>
        </>
    );
}