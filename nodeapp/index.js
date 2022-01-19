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

                let attendanceTable = []; //attendanceTable
                connection.query(
                    `select * from sys_${sysNumber}_${year}_${month};`,
                    (error, results) => {
                        console.log(error);

                        if (results != null) {

                            for (let i = 0; i < results.length; i++) {
                                attendanceTable[i] = [];

                                attendanceTable[i][0] = results[i].id;
                                attendanceTable[i][1] = results[i].name;
                                attendanceTable[i][2] = results[i].role;
                                attendanceTable[i][3] = results[i].location;
                                attendanceTable[i][4] = results[i].travel;
                                attendanceTable[i][5] = results[i].day1;
                                attendanceTable[i][6] = results[i].day2;
                                attendanceTable[i][7] = results[i].day3;
                                attendanceTable[i][8] = results[i].day4;
                                attendanceTable[i][9] = results[i].day5;
                                attendanceTable[i][10] = results[i].day6;
                                attendanceTable[i][11] = results[i].day7;
                                attendanceTable[i][12] = results[i].day8;
                                attendanceTable[i][13] = results[i].day9;
                                attendanceTable[i][14] = results[i].day10;
                                attendanceTable[i][15] = results[i].day11;
                                attendanceTable[i][16] = results[i].day12;
                                attendanceTable[i][17] = results[i].day13;
                                attendanceTable[i][18] = results[i].day14;
                                attendanceTable[i][19] = results[i].day15;
                                attendanceTable[i][20] = results[i].day16;
                                attendanceTable[i][21] = results[i].day17;
                                attendanceTable[i][22] = results[i].day18;
                                attendanceTable[i][23] = results[i].day19;
                                attendanceTable[i][24] = results[i].day20;
                                attendanceTable[i][25] = results[i].day21;
                                attendanceTable[i][26] = results[i].day22;
                                attendanceTable[i][27] = results[i].day23;
                                attendanceTable[i][28] = results[i].day24;
                                attendanceTable[i][29] = results[i].day25;
                                attendanceTable[i][30] = results[i].day26;
                                attendanceTable[i][31] = results[i].day27;
                                attendanceTable[i][32] = results[i].day28;
                                attendanceTable[i][33] = results[i].day29;
                                attendanceTable[i][34] = results[i].day30;
                                attendanceTable[i][35] = results[i].day31;
                            }

                            res.json({ message: attendanceTable });
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

                let attendanceRateTable = [];
                for (let i = 0; i < 28; i++) {
                    attendanceRateTable[i] = [];
                }
                for (let i = 1; i < 32; i++) {

                    connection.query(
                        `select count(*) as moji0 from sys_${sysNumber}_${year}_${month} where role = '社員' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[0][i - 1] = results[0].moji0;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji1 from sys_${sysNumber}_${year}_${month} where role = '社員' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[1][i - 1] = results[0].moji1;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji2 from sys_${sysNumber}_${year}_${month} where role = '社員';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[2][i - 1] = results[0].moji2;
                                attendanceRateTable[3][i - 1] = parseInt((attendanceRateTable[0][i - 1] / attendanceRateTable[2][i - 1]) * 100);
                                if (attendanceRateTable[2][i - 1] === 0) {
                                    attendanceRateTable[3][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji4 from sys_${sysNumber}_${year}_${month} where role = '派遣' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[4][i - 1] = results[0].moji4;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji5 from sys_${sysNumber}_${year}_${month} where role = '派遣' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[5][i - 1] = results[0].moji5;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji6 from sys_${sysNumber}_${year}_${month} where role = '派遣';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[6][i - 1] = results[0].moji6;
                                attendanceRateTable[7][i - 1] = parseInt((attendanceRateTable[4][i - 1] / attendanceRateTable[6][i - 1]) * 100);
                                if (attendanceRateTable[6][i - 1] === 0) {
                                    attendanceRateTable[7][i - 1] = 0;
                                }

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji8 from sys_${sysNumber}_${year}_${month} where role = '協力会社' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[8][i - 1] = results[0].moji8;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji9 from sys_${sysNumber}_${year}_${month} where role = '協力会社' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[9][i - 1] = results[0].moji9;

                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji10 from sys_${sysNumber}_${year}_${month} where role = '協力会社';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[10][i - 1] = results[0].moji10;
                                attendanceRateTable[11][i - 1] = parseInt((attendanceRateTable[8][i - 1] / attendanceRateTable[10][i - 1]) * 100);
                                if (attendanceRateTable[10][i - 1] === 0) {
                                    attendanceRateTable[11][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji12 from sys_${sysNumber}_${year}_${month} where role = 'OSES' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[12][i - 1] = results[0].moji12;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji13 from sys_${sysNumber}_${year}_${month} where role = 'OSES' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[13][i - 1] = results[0].moji13;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji14 from sys_${sysNumber}_${year}_${month} where role = 'OSES';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[14][i - 1] = results[0].moji14;

                                attendanceRateTable[15][i - 1] = parseInt((attendanceRateTable[12][i - 1] / attendanceRateTable[14][i - 1]) * 100);
                                if (attendanceRateTable[14][i - 1] === 0) {
                                    attendanceRateTable[15][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji16 from sys_${sysNumber}_${year}_${month} where day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[16][i - 1] = results[0].moji16;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji17 from sys_${sysNumber}_${year}_${month} where day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[17][i - 1] = results[0].moji17;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji18 from sys_${sysNumber}_${year}_${month} where name is not null;`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[18][i - 1] = results[0].moji18;
                                attendanceRateTable[19][i - 1] = parseInt(attendanceRateTable[16][i - 1] / attendanceRateTable[18][i - 1] * 100);
                                if (attendanceRateTable[18][i - 1] === 0) {
                                    attendanceRateTable[19][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji20 from sys_${sysNumber}_${year}_${month} where location = '北陸SC' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[20][i - 1] = results[0].moji20;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji21 from sys_${sysNumber}_${year}_${month} where location = '北陸SC' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[21][i - 1] = results[0].moji21;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji22 from sys_${sysNumber}_${year}_${month} where location = '北陸SC';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[22][i - 1] = results[0].moji22;
                                attendanceRateTable[23][i - 1] = parseInt((attendanceRateTable[20][i - 1] / attendanceRateTable[22][i - 1]) * 100);
                                if (attendanceRateTable[22][i - 1] === 0) {
                                    attendanceRateTable[23][i - 1] = 0;
                                }
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji24 from sys_${sysNumber}_${year}_${month} where location = '蕨' and day${i} = '出勤';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[24][i - 1] = results[0].moji24;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji25 from sys_${sysNumber}_${year}_${month} where location = '蕨' and day${i} = 'モバイル';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[25][i - 1] = results[0].moji25;
                            }
                        }
                    );

                    connection.query(
                        `select count(*) as moji26 from sys_${sysNumber}_${year}_${month} where location = '蕨';`,
                        (error, results) => {
                            if (results != null) {
                                attendanceRateTable[26][i - 1] = results[0].moji26;
                                attendanceRateTable[27][i - 1] = parseInt((attendanceRateTable[24][i - 1] / attendanceRateTable[26][i - 1] * 100));
                                if (attendanceRateTable[26][i - 1] === 0) {
                                    attendanceRateTable[27][i - 1] = 0;
                                }

                                if (i === 31) {
                                    console.log("発射");
                                    res.json({ message: attendanceRateTable });
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
