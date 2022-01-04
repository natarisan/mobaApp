import ReactModal from 'react-modal';
import { useState, useEffect, FormEvent, ChangeEvent, FC, useContext } from 'react';
import { UserInfo } from './App';

type Props = {
    isOpen: boolean;
    closeLDialog: () => void;
}

export const LoginDialog: FC<Props> = props => {

    let { isOpen, closeLDialog } = props;

    const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const { userId, setUserId, userName, setUserName } = useContext(UserInfo);

    const [pandaID, setPandaID] = useState<string>("");//

    const [password, setPassword] = useState<string>("");

    const [alert, setAlert] = useState<string>("");

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

    useEffect(() => {

        const loginJudge = localStorage.getItem('L');

        if (loginJudge === 'Login') {
            closeLDialog();

            const f = async () => {
                await _sleep(1500);
                setUserId(localStorage.getItem('ID'));
                setUserName(localStorage.getItem('NAME'));
            }
            f();
        }

    },[isOpen])

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (pandaID === "") {
            setAlert("入力されていません。");
            return;
        }

        fetch('/searchID', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID: pandaID,
                password: password
            })
        })
            .then(res => {
                if (res.status === 200) {
                    closeLDialog();
                    localStorage.setItem('L', 'Login');
                }
            })
            .catch(error => {
                console.error(error);
            })

        await _sleep(1000);

        fetch('/searchID', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setUserId(data.id);
                setUserName(data.name);
                localStorage.setItem('ID', data.id);
                localStorage.setItem('NAME', data.name);
            })

        setPandaID("");
        setPassword("");
    }

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setPandaID(e.target.value);
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }


    return (
        <>
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Settings"
            >
                <form onSubmit={handleSubmit} action="/" method="post">
                    <label> 【ログイン画面】
                        <div>
                        <label>名前⇒
                        <input type="text" autoFocus value={pandaID}
                                    onChange={handleChangeUsername} name="itemName"></input>
                        </label>
                        </div>
                        <div>
                        <label>PASS⇒
                        <input type="password" autoFocus value={password}
                                    onChange={handleChangePassword} name="passName"></input>
                        </label>
                        </div>
                        <p>{ alert }</p>
                        <input type="submit" value="ログイン"></input>
                    </label>
                </form>
            </ReactModal>
        </>
    );
}