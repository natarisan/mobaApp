import React from 'react';
import EXCELJS from 'exceljs';
import styled from 'styled-components';
import { FC } from 'react';

//出勤状況と出社率を表示させための枠。紫色の部分。
//propsの順番を変えてくれると嬉しい。
type Props = {
	attendanceTable: any[][];
	attendanceRateTable: number[][];
	year: number;
	month: number;
	sysNumber: number;
	dates: string[];
	getAttendanceRate: () => void;
}


export const CalenderFrame: FC<Props> = props => {

	const { attendanceTable, year, month, dates, sysNumber, attendanceRateTable, getAttendanceRate } = props;

	let attendanceTdArray = [];
	let attendanceTableArray: any = [];
	let attendanceRateTdArray = [];
	let attendanceRateTableArray: any = [];

	const CalenderFrame = styled.div`
			padding: 5em;
			color: bkack;
			background: #d3cae8;
			border-radius:  12px
        `;

	const VioletFont = styled.p` 
			padding-left: 20px;
		`;

	const Td = styled.td`
			border: solid 1px;
		`;

	const Th = styled.th`
			border: solid 1px;
		`;

	const ExcelButton = styled.button`
			border: 1px solid #ccc;
            box-shadow: inset 1px 1px 1px #fff;
            z-index: 2;
			background-color: #e6e6fa;
			border-radius: 30px;
			margin-bottom: 5px;
			padding: 8px;
			margin-left: 10px;
		`;

	//naose
	const CalRateButton = styled.button`
            border: 1px solid #ccc;
            box-shadow: inset 1px 1px 1px #fff;
            z-index: 2;
			background-color: #e6e6fa;
			border-radius: 30px;
			margin-bottom: 5px;
			padding: 8px;
			margin-left: 10px;
        `;

	//紫枠の上側の表(出勤状況のテーブル)にデータを入れていきます。
	for (let i = 0; i < attendanceTable.length; i++) {
		for (let j = 0; j < 36; j++) {
			attendanceTdArray.push(<Td>{attendanceTable[i][j]}</Td>);
		}
		attendanceTableArray.push(<tr>{attendanceTdArray}</tr>);
		attendanceTdArray = [];
	}

	//紫枠の下側の表(出社率のテーブル)にデータを入れていきます。
	let flag = 0;

	for (let i = 0; i < attendanceRateTable.length; i++) {
		switch (i) {
			case 0:
				attendanceRateTdArray.push(<Td>社員</Td>);
				break;
			case 4:
				attendanceRateTdArray.push(<Td>派遣</Td>);
				break;
			case 8:
				attendanceRateTdArray.push(<Td>協力会社</Td>);
				break;
			case 12:
				attendanceRateTdArray.push(<Td>OSES</Td>);
				break;
			case 16:
				attendanceRateTdArray.push(<Td>部全体</Td>);
				break;
			case 20:
				attendanceRateTdArray.push(<Td>北陸SC</Td>);
				break;
			case 24:
				attendanceRateTdArray.push(<Td>蕨</Td>);
				break;
			default:
				attendanceRateTdArray.push(<Td></Td>);
		}

		flag === 0 ? attendanceRateTdArray.push(<Td>出社人数</Td>) : flag === 1 ? attendanceRateTdArray.push(<Td>モバイル人数</Td>) :
			flag === 2 ? attendanceRateTdArray.push(<Td>人数計</Td>) : flag === 3 ? attendanceRateTdArray.push(<Td>出社率(%)</Td>) : console.log('flagが異常な数値です');

		(flag >= 0 && flag < 3) ? flag++ : flag = 0;

		for (let j = 0; j < 31; j++) {
			attendanceRateTdArray.push(<Td>{attendanceRateTable[i][j]}</Td>);
		}
		attendanceRateTableArray.push(<tr>{attendanceRateTdArray}</tr>);
		attendanceRateTdArray = [];
	}

	const handlerClickDownloadButton = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		format: "xlsx"
	) => {

		e.preventDefault();

		const workbook = new EXCELJS.Workbook();
		workbook.addWorksheet(`${year}_${month}`);
		const worksheet = workbook.getWorksheet(`${year}_${month}`);

		worksheet.columns = [
			{ header: "ID", key: "id", width: 4 }, { header: "名前", key: "name", width: 10 },
			{ header: "役割", key: "role", width: 8 }, { header: "勤務地", key: "location" },
			{ header: dates[0], key: "1", width: 8 }, { header: dates[1], key: "2", width: 8 }, { header: dates[2], key: "3", width: 8 }, { header: dates[3], key: "4", width: 8 },
			{ header: dates[4], key: "5", width: 8 }, { header: dates[5], key: "6", width: 8 }, { header: dates[6], key: "7", width: 8 }, { header: dates[7], key: "8", width: 8 },
			{ header: dates[8], key: "9", width: 8 }, { header: dates[9], key: "10", width: 8 }, { header: dates[10], key: "11", width: 8 }, { header: dates[11], key: "12", width: 8 },
			{ header: dates[12], key: "13", width: 8 }, { header: dates[13], key: "14", width: 8 }, { header: dates[14], key: "15", width: 8 }, { header: dates[15], key: "16", width: 8 },
			{ header: dates[16], key: "17", width: 8 }, { header: dates[17], key: "18", width: 8 }, { header: dates[18], key: "19", width: 8 }, { header: dates[19], key: "20", width: 8 },
			{ header: dates[20], key: "21", width: 8 }, { header: dates[21], key: "22", width: 8 }, { header: dates[22], key: "23", width: 8 }, { header: dates[23], key: "24", width: 8 },
			{ header: dates[24], key: "25", width: 8 }, { header: dates[25], key: "26", width: 8 }, { header: dates[26], key: "27", width: 8 }, { header: dates[27], key: "28", width: 8 },
			{ header: dates[28], key: "29", width: 8 }, { header: dates[29], key: "30", width: 8 }, { header: dates[30], key: "31", width: 8 }
		];

		for (let i = 0; i < attendanceTable.length; i++) {
			worksheet.addRow({
				id: attendanceTable[i][0], name: attendanceTable[i][1], role: attendanceTable[i][2], location: attendanceTable[i][3],
				1: attendanceTable[i][5], 2: attendanceTable[i][6], 3: attendanceTable[i][7], 4: attendanceTable[i][8], 5: attendanceTable[i][9],
				6: attendanceTable[i][10], 7: attendanceTable[i][11], 8: attendanceTable[i][12], 9: attendanceTable[i][13], 10: attendanceTable[i][14],
				11: attendanceTable[i][15], 12: attendanceTable[i][16], 13: attendanceTable[i][17], 14: attendanceTable[i][18], 15: attendanceTable[i][19],
				16: attendanceTable[i][20], 17: attendanceTable[i][21], 18: attendanceTable[i][22], 19: attendanceTable[i][23], 20: attendanceTable[i][24],
				21: attendanceTable[i][25], 22: attendanceTable[i][26], 23: attendanceTable[i][27], 24: attendanceTable[i][28], 25: attendanceTable[i][29],
				26: attendanceTable[i][30], 27: attendanceTable[i][31], 28: attendanceTable[i][32], 29: attendanceTable[i][33], 30: attendanceTable[i][34],
				31: attendanceTable[i][35]
			});
		}

		worksheet.addRow({
			id: ""
		})

		for (let i = 0; i < attendanceRateTable.length; i++) {

			let role = "";
			let location = "";

			switch (i) {
				case 0:
					role = "社員";
					break;
				case 4:
					role = "派遣";
					break;
				case 8:
					role = "協力会社";
					break;
				case 12:
					role = "OSES";
					break;
				case 16:
					role = "部全体";
					break;
				case 20:
					role = "北陸SC";
					break;
				case 24:
					role = "蕨";
					break;
			}

			flag === 0 ? location = "出社人数" : flag === 1 ? location = "ﾓﾊﾞｲﾙ人数" :
				flag === 2 ? location = "人数計" : flag === 3 ? location = "出社率(%)" : console.log('flagが異常な数値です');

			(flag >= 0 && flag < 3) ? flag++ : flag = 0;

			worksheet.addRow({
				id: "", name: "", role: role, location: location,
				1: attendanceRateTable[i][0], 2: attendanceRateTable[i][1], 3: attendanceRateTable[i][2], 4: attendanceRateTable[i][3], 5: attendanceRateTable[i][4],
				6: attendanceRateTable[i][5], 7: attendanceRateTable[i][6], 8: attendanceRateTable[i][7], 9: attendanceRateTable[i][8], 10: attendanceRateTable[i][9],
				11: attendanceRateTable[i][10], 12: attendanceRateTable[i][11], 13: attendanceRateTable[i][12], 14: attendanceRateTable[i][13], 15: attendanceRateTable[i][14],
				16: attendanceRateTable[i][15], 17: attendanceRateTable[i][16], 18: attendanceRateTable[i][17], 19: attendanceRateTable[i][18], 20: attendanceRateTable[i][19],
				21: attendanceRateTable[i][20], 22: attendanceRateTable[i][21], 23: attendanceRateTable[i][22], 24: attendanceRateTable[i][23], 25: attendanceRateTable[i][24],
				26: attendanceRateTable[i][25], 27: attendanceRateTable[i][26], 28: attendanceRateTable[i][27], 29: attendanceRateTable[i][28], 30: attendanceRateTable[i][29],
				31: attendanceRateTable[i][30]
			});
		}

		const uint8Array =
			await workbook.xlsx.writeBuffer()
		const blob = new Blob([uint8Array], { type: "application/octet-binary" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `SYSTEM${sysNumber}_${year}_${month}.xlsx`;
		a.click();
		a.remove();
	};


	return (
		<CalenderFrame>

			<h1>SystemNo:{sysNumber}</h1>
			<CalRateButton onClick={getAttendanceRate}>出社率計算</CalRateButton>
			<ExcelButton onClick={(e) => handlerClickDownloadButton(e, "xlsx")}>データ出力(Excel形式)</ExcelButton>

			<VioletFont>
				<h4>出勤状況</h4>
				<table>
					<tr>
						<Th>ID</Th>
						<Th>NAME</Th>
						<Th>__役割__</Th>
						<Th>__勤務地__</Th>
						<Th>__出張先__</Th>
						{dates.map(day => (
							<Th>{day}</Th>
						))}
					</tr>
					{attendanceTableArray}
				</table>
				<h4>出社RATE</h4>
				<table>
					<tr>
						<Th>IDSSSHARATE</Th>
						<Th>ROLELOCATION</Th>
						{dates.map(day => (
							<Th>{day}</Th>
						))}
					</tr>
					{attendanceRateTableArray}
				</table>
			</VioletFont>

		</CalenderFrame>
	);
}