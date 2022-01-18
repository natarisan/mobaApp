import ReactModal from 'react-modal';
import { useContext, useEffect, useState, ChangeEvent, FormEvent, FC } from 'react';
import { UserInfo } from './App';

//ログイン画面。

type Props = {
    isDialogOpen: boolean;
    closeLoginDialog: () => void;
}

export const LoginDialog: FC<Props> = props => {

    let { isDialogOpen, closeLoginDialog } = props;

    const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const { setUserId, setUserName } = useContext(UserInfo);
    const [loginId, setLoginId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [alert, setAlert] = useState<string>("");

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

    useEffect(() => {

        const loginState = localStorage.getItem('L');

        if (loginState === 'Login') {
            closeLoginDialog();
            //ログイン情報を保存する。サーバ処理を1秒ちょっと待つ必要がある。
            const f = async () => {
                await _sleep(1500);
                setUserId(localStorage.getItem('ID'));
                setUserName(localStorage.getItem('NAME'));
            }
            f();
        }

    }, [isDialogOpen])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loginId === "") {
            setAlert("入力されていません。");
            return;
        }

        fetch('/searchUserInfo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loginId: loginId,
                password: password
            })
        })
            .then(res => {
                if (res.status === 200) {
                    closeLoginDialog();
                    localStorage.setItem('L', 'Login');
                }
            })
            .catch(error => {
                console.error(error);
            })
        //ユーザIDと名前の情報をクライアントに反映させる。ここでもサーバ処理を１秒程度待つ必要がある。
        await _sleep(1000);

        fetch('/searchUserInfo', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setUserId(data.id);
                setUserName(data.name);
                localStorage.setItem('ID', data.id);
                localStorage.setItem('NAME', data.name);
            })

        setLoginId("");
        setPassword("");
    }

    const handleChangeLoginId = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginId(e.target.value);
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }


    return (
        <>
            <ReactModal
                isOpen={isDialogOpen}
                style={customStyles}
                contentLabel="Settings"
            >
                <form onSubmit={handleSubmit} action="/" method="post">
                    <label> 【ログイン画面】
                        <div>
                            <label>名前⇒
                                <input type="text" autoFocus value={loginId}
                                    onChange={handleChangeLoginId} name="itemName"></input>
                            </label>
                        </div>
                        <div>
                            <label>PASS⇒
                                <input type="password" autoFocus value={password}
                                    onChange={handleChangePassword} name="passName"></input>
                            </label>
                        </div>
                        <p>{alert}</p>
                        <input type="submit" value="ログイン"></input>
                    </label>
                </form>
            </ReactModal>
        </>
    );
}