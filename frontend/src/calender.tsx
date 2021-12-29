import React from 'react';
import EXCELJS from 'exceljs';
import styled from 'styled-components';
import { useState, useEffect, useRef, FormEvent, ChangeEvent, FC } from 'react';

type Props = {
	Calender: any[][];
	Year: number;
	Month: number;
	ARate: number[][];
	Number: number;
	SysNumber: number;
	Days: any[];
}


export const Calender: FC<Props> = props => {

	const { Number, Calender, Year, Month, Days, SysNumber, ARate } = props;

	let days = [];
	let tdArray = [];
	let tableArray = [];
	let rateArray = [];
	let rateTableArray: any = [];

	for (let i = 0; i < Number; i++) {
		let dates = i + 1;
		let e = new Date(Year, Month - 1, dates);
		const dayOfWeek = e.getDay();
		const dayOfWeekStr = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fry", "Sut"]
		let day = dayOfWeekStr[dayOfWeek];
		days.push(Month + "/" + dates + "(" + day + ")");
	}

	const CalenderFrame = styled.div`
			padding: 5em ;
			color: bkack;
			background: #deb887;
			border-radius:  12px
        `;

	const Sentence = styled.p`
			padding-left: 20px;
		`;

	const Table = styled.table`
		`;

	const Td = styled.td`
			border: solid 1px;
		`;

	const Th = styled.th`
			border: solid 1px;
		`;

	for (let i = 0; i < Calender.length; i++) {
		for (let j = 0; j < 35; j++) {
			tdArray.push(<Td>{Calender[i][j]}</Td>);
		}
		tableArray.push(<tr>{tdArray}</tr>);
		tdArray = [];
	}

	let flag = 0;

	for (let i = 0; i < ARate.length; i++) {
		switch (i) {
			case 0:
				rateArray.push(<Td>社員</Td>);
				break;
			case 4:
				rateArray.push(<Td>派遣</Td>);
				break;
			case 8:
				rateArray.push(<Td>協力会社</Td>);
				break;
			case 12:
				rateArray.push(<Td>OSES</Td>);
				break;
			case 16:
				rateArray.push(<Td>部全体</Td>);
				break;
			case 20:
				rateArray.push(<Td>北陸SC</Td>);
				break;
			case 24:
				rateArray.push(<Td>蕨</Td>);
				break;
			default:
				rateArray.push(<Td></Td>);
		}

		flag === 0 ? rateArray.push(<Td>出社人数</Td>) : flag === 1 ? rateArray.push(<Td>モバイル人数</Td>) :
			flag === 2 ? rateArray.push(<Td>人数計</Td>) : flag === 3 ? rateArray.push(<Td>出社率</Td>) : console.log('flagが異常な数値です');

		(flag >= 0 && flag < 3) ? flag++ : flag = 0;

		for (let j = 0; j < 31; j++) {
			rateArray.push(<Td>{ARate[i][j]}</Td>);
		}
		rateTableArray.push(<tr>{rateArray}</tr>);
		rateArray = [];
	}

	const handlerClickDownloadButton = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		format: "xlsx"
	) => {
		e.preventDefault();

		const workbook = new EXCELJS.Workbook();
		workbook.addWorksheet(`${Year}_${Month}`);
		const worksheet = workbook.getWorksheet(`${Year}_${Month}`);

		worksheet.columns = [
			{ header: "役割", key: "role", width: 8 }, { header: "項目", key: "item" },
			{ header: Days[0], key: "1", width: 8 }, { header: Days[1], key: "2", width: 8 }, { header: Days[2], key: "3", width: 8 }, { header: Days[3], key: "4", width: 8 },
			{ header: Days[4], key: "5", width: 8 }, { header: Days[5], key: "6", width: 8 }, { header: Days[6], key: "7", width: 8 }, { header: Days[7], key: "8", width: 8 },
			{ header: Days[8], key: "9", width: 8 }, { header: Days[9], key: "10", width: 8 }, { header: Days[10], key: "11", width: 8 }, { header: Days[11], key: "12", width: 8 },
			{ header: Days[12], key: "13", width: 8 }, { header: Days[13], key: "14", width: 8 }, { header: Days[14], key: "15", width: 8 }, { header: Days[15], key: "16", width: 8 },
			{ header: Days[16], key: "17", width: 8 }, { header: Days[17], key: "18", width: 8 }, { header: Days[18], key: "19", width: 8 }, { header: Days[19], key: "20", width: 8 },
			{ header: Days[20], key: "21", width: 8 }, { header: Days[21], key: "22", width: 8 }, { header: Days[22], key: "23", width: 8 }, { header: Days[23], key: "24", width: 8 },
			{ header: Days[24], key: "25", width: 8 }, { header: Days[25], key: "26", width: 8 }, { header: Days[26], key: "27", width: 8 }, { header: Days[27], key: "28", width: 8 },
			{ header: Days[28], key: "29", width: 8 }, { header: Days[29], key: "30", width: 8 }, { header: Days[30], key: "31", width: 8 }
		];

		for (let i = 0; i < ARate.length; i++) {
			let role = "";
			let item = "";
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

			flag === 0 ? item = "出社人数" : flag === 1 ? item = "ﾓﾊﾞｲﾙ人数" :
				flag === 2 ? item = "人数計" : flag === 3 ? item = "出社率" : console.log('flagが異常な数値です');

			(flag >= 0 && flag < 3) ? flag++ : flag = 0;

			worksheet.addRow({
				role: role, item: item,
				1: ARate[i][0], 2: ARate[i][1], 3: ARate[i][2], 4: ARate[i][3], 5: ARate[i][4],
				6: ARate[i][5], 7: ARate[i][6], 8: ARate[i][7], 9: ARate[i][8], 10: ARate[i][9],
				11: ARate[i][10], 12: ARate[i][11], 13: ARate[i][12], 14: ARate[i][13], 15: ARate[i][14],
				16: ARate[i][15], 17: ARate[i][16], 18: ARate[i][17], 19: ARate[i][18], 20: ARate[i][19],
				21: ARate[i][20], 22: ARate[i][21], 23: ARate[i][22], 24: ARate[i][23], 25: ARate[i][24],
				26: ARate[i][25], 27: ARate[i][26], 28: ARate[i][27], 29: ARate[i][28], 30: ARate[i][29],
				31: ARate[i][30]
			});
		}

		const uint8Array =
			await workbook.xlsx.writeBuffer()
		const blob = new Blob([uint8Array], { type: "application/octet-binary" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `SYSTEM${SysNumber}_${Year}_${Month}.xlsx`;
		a.click();
		a.remove();
	};


	return (
		<CalenderFrame>
			<h1>SystemNo:{SysNumber}</h1>
			<Sentence>

				<h4>出勤situation</h4>
				<Table>
					<tr>
						<Th>ID</Th>
						<Th>NAME</Th>
						<Th>ROLE</Th>
						<Th>LOCATION</Th>
						{Days.map(day => (
							<Th>{day}</Th>
						))}
					</tr>
					{tableArray}
				</Table>
				<h4>出社rate</h4>
				<Table>
					<tr>
						<Th>IDSSSHARATE</Th>
						<Th>ROLELOCATION</Th>
						{Days.map(day => (
							<Th>{day}</Th>
						))}
					</tr>
					{rateTableArray}
				</Table>

				<button onClick={(e) => handlerClickDownloadButton(e, "xlsx")}>
					このデータを出力(Excel形式)
				</button>

			</Sentence>
		</CalenderFrame>
	);
}