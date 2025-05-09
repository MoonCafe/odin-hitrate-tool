import React, { useState } from "react";
import { Input } from "./components/ui/input.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table.jsx";

const huntingData = [
  { zone: "요툰하임", name: "공허의 골짜기", level: 48 },
  { zone: "니다벨리르", name: "드베르그 부락", level: 63 },
  { zone: "알브하임", name: "공허의 평원", level: 81 },
  { zone: "무스펠하임", name: "불타버린 폐허", level: 83 },
  { zone: "무스펠하임", name: "밀회의 계곡", level: 93 },
  { zone: "무스펠하임", name: "패자의 공터", level: 97 },
  { zone: "무스펠하임", name: "역설의 땅", level: 111 },
  { zone: "무스펠하임", name: "빛의 추격로", level: 118 },
  { zone: "아스가르드", name: "아스신족 집결지", level: 121 },
  { zone: "아스가르드", name: "칼바람 언덕", level: 127 },
  { zone: "아스가르드", name: "망각의 여울 초입", level: 133 },
  { zone: "아스가르드", name: "망각의 여울 끝", level: 138 },
  { zone: "아스가르드", name: "격전의 주둔지", level: 139 },
  { zone: "니플하임", name: "흐느끼는 망자의 숲", level: 141 },
  { zone: "니플하임", name: "불사의 성역", level: 159 },
  { zone: "니플하임", name: "굽이치는 용골산맥", level: 186 },
];

const offsets = {
  "50%": -25,
  "60%": -11,
  "75%": 2,
  "80%": 5,
  "90%": 15,
  "95%": 35,
};

export default function OdinHitRateTool() {
  const [accuracy, setAccuracy] = useState(0);

  const calculateRow = (level) => {
    const results = {};
    Object.entries(offsets).forEach(([label, offset]) => {
      const required = level * 3 + offset;
      results[label] = {
        required,
        met: accuracy >= required,
        remain: Math.max(0, required - accuracy),
      };
    });
    return results;
  };

  return (
    <div className="space-y-10 max-w-screen-xl mx-auto text-sm sm:text-base px-4 sm:px-6 pt-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
        오딘 명중률 계산기
      </h1>
      <Input
        type="number"
        placeholder="명중 수치를 입력해 주세요."
        value={accuracy === 0 ? "" : accuracy}
        className="w-full sm:w-64 text-base border rounded p-2 block mx-auto sm:mx-0"
        onChange={(e) => setAccuracy(Number(e.target.value))}
      />
      <div className="overflow-x-auto">
        <Table className="table-auto w-full min-w-[768px] sm:min-w-full border-separate border-spacing-0 border border-gray-300 text-sm text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="border px-1 py-1 w-2" />
              <TableHead className="border px-1 py-1 text-center w-[4%]">지역</TableHead>
              <TableHead className="border px-1 py-1 text-center w-[6%]">사냥터</TableHead>
              <TableHead className="border px-2 py-1 text-center whitespace-nowrap w-[5%]">레벨</TableHead>
              {Object.keys(offsets).map((label) => (
                <TableHead
                  key={label}
                  className="border px-4 py-2 whitespace-nowrap text-center w-[14%]"
                >
                  {label} 도달
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {huntingData.map((d, idx) => {
              const res = calculateRow(d.level);
              return (
                <TableRow key={idx} className="odd:bg-white even:bg-gray-50">
                  <TableCell className="border px-1 py-1" />
                  <TableCell className="border px-1 py-1 whitespace-nowrap text-center">{d.zone}</TableCell>
                  <TableCell className="border px-1 py-1 whitespace-nowrap text-center text-blue-700 font-medium">{d.name}</TableCell>
                  <TableCell className="border px-2 py-1 text-center whitespace-nowrap">{d.level}</TableCell>
                  {Object.keys(offsets).map((label) => (
                    <TableCell
                      key={label}
                      className={`border px-3 py-2 whitespace-nowrap text-center ${res[label].met ? "text-green-600" : "text-red-600"}`}
                    >
                      {res[label].met
                        ? "⭕"
                        : `X (필요: ${res[label].required}, 남음: ${res[label].remain})`}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
