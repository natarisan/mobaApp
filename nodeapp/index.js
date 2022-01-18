const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'basic'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

app.get('/', (req, res) => {
    res.render('hello.ejs');
});

let token;
let name;

const deleteAttendanceTableRow = (no, year, month, id) => {
    connection.query(
        'delete from sys_?_?_? where id = ?',
        [no, year, month, id],
        (error, results) => {
            console.log(id);
        }
    );
}

app.post('/updateAttendanceTable', (req, res) => {

    connection.query(
        'update sys_?_?_? set travel = ? ,day1 = ?,day2 = ?,day3 = ?,day4 = ?,day5 = ?,day6 = ?,day7 = ?,day8 = ?,day9 = ?,day10 = ?,day11 = ?,day12 = ?,day13 = ?,day14 = ?,day15 = ?,day16 = ?,day17 = ?,day18 = ?,day19 = ?,day20 = ?,day21 = ?,day22 = ?,day23 = ?,day24 = ?,day25 = ?,day26 = ?,day27 = ?,day28 = ?,day29 = ?,day30 = ?,day31 = ? where id = ?;',
        [req.body.sysNumber, req.body.year, req.body.month, req.body.record[4], req.body.record[5], req.body.record[6], req.body.record[7], req.body.record[8], req.body.record[9], req.body.record[10], req.body.record[11], req.body.record[12], req.body.record[13], req.body.record[14], req.body.record[15], req.body.record[16], req.body.record[17], req.body.record[18], req.body.record[19], req.body.record[20], req.body.record[21], req.body.record[22], req.body.record[23], req.body.record[24], req.body.record[25], req.body.record[26], req.body.record[27], req.body.record[28], req.body.record[29], req.body.record[30], req.body.record[31], req.body.record[32], req.body.record[33], req.body.record[34], req.body.record[35], req.body.record[0]],
        (error, results) => {
            if (req.body.record[0] > 500 || req.body.record[0] < 0) {
                deleteAttendanceTableRow(req.body.No, req.body.year, req.body.month, req.body.record[0]);
            }
            console.log(error);
        }
    );
});

app.get('/loginJudge', (req, res) => {
    if (token === undefined) {
        console.log("no login");
    } else {
        console.log("logon");
        res.json({ id: token, name: name });
    }
});

//if文のネストなくすといいかも
app.post('/searchUserInfo', (req, res) => {
    for (let sysNumber = 1; sysNumber < 5; sysNumber++) {
        connection.query(
            `select id,name,password from pandaID_${sysNumber};`,
            (error, results) => {

                if (results == null) {
                    return;
                }
                for (let i = 0; i < results.length; i++) {
                    const plain = req.body.password;
                    const hash = results[i].password;
                    if (req.body.loginId === results[i].name) {
                        console.log("IDが一致しました");
                        if (hash === "") {
                            token = results[i].id;
                            name = results[i].name;
                            res.json({ status: 200 });
                            return;
                        }

                        bcrypt.compare(plain, hash, (error, isEqual) => {
                            if (isEqual) {
                                console.log("PASSが一致しました");
                                token = results[i].id;
                                name = results[i].name;
                                res.json({ status: 200 });
                            } else {
                                console.log("PASSが一致しませんでした")
                            }
                        })
                    } else {
                        console.log("IDが一致しませんでした");
                    }
                }
            }
        );
    }
});

app.get('/searchUserInfo', (req, res) => {
    res.json({ id: token, name: name });
})

app.post('/updatePassword', (req, res) => {
    const plain = req.body.password;
    bcrypt.hash(plain, 10, (error, hash) => {
        connection.query(
            `update pandaID_? set password = ? where id = ?`,
            [req.body.sysNumber, hash, req.body.userId],
            (error, results) => {
                res.json({ status: 200 });
                console.log("pass updated.");
            }
        )
    });

})

for (let sysNumber = 1; sysNumber < 5; sysNumber++) {
    for (let year = 2021; year < 2024; year++) {
        for (let month = 1; month < 13; month++) {

            app.get(`/getDataFromAttendanceTable_${sysNumber}_${year}_${month}`, (req, res) => {

                let tDimeArray = [];
                connection.query(
                    `select * from sys_${sysNumber}_${year}_${month};`,
                    (error, results) => {
                        console.log(error);

                        if (results != null) {

                            for (let i = 0; i < results.length; i++) {
                                tDimeArray[i] = [];

                                tDimeArray[i][0] = results[i].id;
                                tDimeArray[i][1] = results[i].name;
                                tDimeArray[i][2] = results[i].role;
                                tDimeArray[i][3] = results[i].location;
                                tDimeArray[i][4] = results[i].travel;
                                tDimeArray[i][5] = results[i].day1;
                                tDimeArray[i][6] = results[i].day2;
                                tDimeArray[i][7] = results[i].day3;
                                tDimeArray[i][8] = results[i].day4;
                                tDimeArray[i][9] = results[i].day5;
                                tDimeArray[i][10] = results[i].day6;
                                tDimeArray[i][11] = results[i].day7;
                                tDimeArray[i][12] = results[i].day8;
                                tDimeArray[i][13] = results[i].day9;
                                tDimeArray[i][14] = results[i].day10;
                                tDimeArray[i][15] = results[i].day11;
                                tDimeArray[i][16] = results[i].day12;
                                tDimeArray[i][17] = results[i].day13;
                                tDimeArray[i][18] = results[i].day14;
                                tDimeArray[i][19] = results[i].day15;
                                tDimeArray[i][20] = results[i].day16;
                                tDimeArray[i][21] = results[i].day17;
                                tDimeArray[i][22] = results[i].day18;
                                tDimeArray[i][23] = results[i].day19;
                                tDimeArray[i][24] = results[i].day20;
                                tDimeArray[i][25] = results[i].day21;
                                tDimeArray[i][26] = results[i].day22;
                                tDimeArray[i][27] = results[i].day23;
                                tDimeArray[i][28] = results[i].day24;
                                tDimeArray[i][29] = results[i].day25;
                                tDimeArray[i][30] = results[i].day26;
                                tDimeArray[i][31] = results[i].day27;
                                tDimeArray[i][32] = results[i].day28;
                                tDimeArray[i][33] = results[i].day29;
                                tDimeArray[i][34] = results[i].day30;
                                tDimeArray[i][35] = results[i].day31;
                            }

                            //console.log(tDimeArray);
                            res.json({ message: tDimeArray });
                        } else {
                            res.json({ message: [[" ", "n", "o", " ", "t", "a", "b", "l", "e", "."]] });
                        }

                    }
                );
            });

        }
    }
}

for (let sysNumber = 1; sysNumber < 5; sysNumber++) {
    for (let year = 2021; year < 2024; year++) {
        for (let month = 1; month < 13; month++) {

            app.get(`/calcAttendanceRate_${sysNumber}_${year}_${month}`, (req, res) => {

                let rateArray = [];
                for (let i = 0; i < 28; i++) {
                    rateArray[i] = [];
                }
                for (let i = 1; i < 32; i++) {

                    connection.query(
                        `select count(*) as moji0 from sys_${sysNumber}_${year}_${month} where role = '社員' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[0][i - 1] = results[0].moji0;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji1 from sys_${sysNumber}_${year}_${month} where role = '社員' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[1][i - 1] = results[0].moji1;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji2 from sys_${sysNumber}_${year}_${month} where role = '社員';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[2][i - 1] = results[0].moji2;
                                rateArray[3][i - 1] = parseInt((rateArray[0][i - 1] / rateArray[2][i - 1]) * 100);
                                if (rateArray[2][i - 1] === 0) {
                                    rateArray[3][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji4 from sys_${sysNumber}_${year}_${month} where role = '派遣' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[4][i - 1] = results[0].moji4;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji5 from sys_${sysNumber}_${year}_${month} where role = '派遣' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[5][i - 1] = results[0].moji5;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji6 from sys_${sysNumber}_${year}_${month} where role = '派遣';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[6][i - 1] = results[0].moji6;
                                rateArray[7][i - 1] = parseInt((rateArray[4][i - 1] / rateArray[6][i - 1]) * 100);
                                if (rateArray[6][i - 1] === 0) {
                                    rateArray[7][i - 1] = 0;
                                }

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji8 from sys_${sysNumber}_${year}_${month} where role = '協力会社' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[8][i - 1] = results[0].moji8;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji9 from sys_${sysNumber}_${year}_${month} where role = '協力会社' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[9][i - 1] = results[0].moji9;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji10 from sys_${sysNumber}_${year}_${month} where role = '協力会社';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[10][i - 1] = results[0].moji10;
                                rateArray[11][i - 1] = parseInt((rateArray[8][i - 1] / rateArray[10][i - 1]) * 100);
                                if (rateArray[10][i - 1] === 0) {
                                    rateArray[11][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji12 from sys_${sysNumber}_${year}_${month} where role = 'OSES' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[12][i - 1] = results[0].moji12;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji13 from sys_${sysNumber}_${year}_${month} where role = 'OSES' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[13][i - 1] = results[0].moji13;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji14 from sys_${sysNumber}_${year}_${month} where role = 'OSES';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[14][i - 1] = results[0].moji14;

                                rateArray[15][i - 1] = parseInt((rateArray[12][i - 1] / rateArray[14][i - 1]) * 100);
                                if (rateArray[14][i - 1] === 0) {
                                    rateArray[15][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji16 from sys_${sysNumber}_${year}_${month} where day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[16][i - 1] = results[0].moji16;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji17 from sys_${sysNumber}_${year}_${month} where day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[17][i - 1] = results[0].moji17;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji18 from sys_${sysNumber}_${year}_${month} where name is not null;`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[18][i - 1] = results[0].moji18;
                                rateArray[19][i - 1] = parseInt(rateArray[16][i - 1] / rateArray[18][i - 1] * 100);
                                if (rateArray[18][i - 1] === 0) {
                                    rateArray[19][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji20 from sys_${sysNumber}_${year}_${month} where location = '北陸SC' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[20][i - 1] = results[0].moji20;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji21 from sys_${sysNumber}_${year}_${month} where location = '北陸SC' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[21][i - 1] = results[0].moji21;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji22 from sys_${sysNumber}_${year}_${month} where location = '北陸SC';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[22][i - 1] = results[0].moji22;
                                rateArray[23][i - 1] = parseInt((rateArray[20][i - 1] / rateArray[22][i - 1]) * 100);
                                if (rateArray[22][i - 1] === 0) {
                                    rateArray[23][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji24 from sys_${sysNumber}_${year}_${month} where location = '蕨' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[24][i - 1] = results[0].moji24;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji25 from sys_${sysNumber}_${year}_${month} where location = '蕨' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[25][i - 1] = results[0].moji25;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji26 from sys_${sysNumber}_${year}_${month} where location = '蕨';`,
                        (error, results) => {
                            if (results != null) {
                                rateArray[26][i - 1] = results[0].moji26;
                                rateArray[27][i - 1] = parseInt((rateArray[24][i - 1] / rateArray[26][i - 1] * 100));
                                if (rateArray[26][i - 1] === 0) {
                                    rateArray[27][i - 1] = 0;
                                }
                                //console.log(rateArray);
                                if (i === 31) {
                                    console.log("発射");
                                    res.json({ message: rateArray });
                                }
                            }
                        }
                    );

                }
            });

        }
    }
}

app.listen(3001);