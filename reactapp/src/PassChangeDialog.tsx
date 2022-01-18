import ReactModal from 'react-modal';
import { useState, FormEvent, ChangeEvent, FC } from 'react';

//パスワード設定(変更)画面。

type Props = {
    isDialogOpen: boolean;
    userId: number;
    closePassDialog: () => void;
}

export const PassChangeDialog: FC<Props> = props => {

    const customStyles: ReactModal.Styles = {
        // 子ウィンドウを中央に表示
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
        // 親ウィンドウを少し暗くする
        overlay: {
            left: '0%',
            background: 'rgba(0, 0, 0, 0.2)',
            width: '100%',
            zIndex: '10'
        }
    }

    const { isDialogOpen, userId, closePassDialog } = props;

    const [password, setPassword] = useState<string>("");

    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const [alert, setAlert] = useState<string>("");

    //ユーザIDからシステム何部かを計算する。もっとよい求め方があれば改善したい。
    let temp = userId - (userId % 100);
    let sysNumber = temp / 100;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (password === "" || passwordConfirm === "") {
            setAlert("入力されていません。")
            return;
        }

        if (password === passwordConfirm) {
            fetch('/updatePassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    password: password,
                    sysNumber: sysNumber
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        closePassDialog();
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        } else {
            setAlert("パスワードとパスワード(確認)が一致していません。");
        }

        setPassword("");
        setPasswordConfirm("");

    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
    }


    return (
        <>
            <ReactModal
                isOpen={isDialogOpen}
                style={customStyles}
                contentLabel="Settings"
            >
                <form onSubmit={handleSubmit} action="/" method="post">
                    <label> 【パスワード変更画面】

                        <div>
                            <label>パスワード====⇒
                                <input type="password" autoFocus value={password}
                                    onChange={handleChangePassword} name="password"></input>
                            </label>
                        </div>

                        <div>
                            <label>パスワード(確認)⇒
                                <input type="password" autoFocus value={passwordConfirm}
                                    onChange={handleChangePasswordConfirm} name="passwordConfirm"></input>
                            </label>
                        </div>

                        <p>{alert}</p>
                        <input type="submit" value="変更"></input>
                        <button onClick={closePassDialog}>閉じる</button>

                    </label>
                </form>
            </ReactModal>
        </>
    );
}