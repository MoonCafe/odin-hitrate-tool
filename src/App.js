import React, { useState } from 'react';

const huntingData = [
  { zone: "우드", level: 60, name: "골짜기의 폭포", offsets: { "50%": 119, "60%": 133, "75%": 146, "90%": 159, "95%": 179 } },
  { zone: "루텐", level: 63, name: "비탄의 계곡", offsets: { "50%": 214, "60%": 228, "75%": 241, "90%": 254, "95%": 274 } },
  // ... 계속 추가
];

export default function App() {
  const [accuracy, setAccuracy] = useState(0);

  const calculateRow = (level, offsets) => {
    const result = {};
    Object.entries(offsets).forEach(([label, required]) => {
      result[label] = {
        met: accuracy >= required,
        remain: Math.max(0, required - accuracy),
      };
    });
    return result;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>오딘 명중률 계산기</h1>
      <input
        type="number"
        placeholder="현재 내 명중 수치 입력"
        value={accuracy}
        onChange={(e) => setAccuracy(Number(e.target.value))}
        style={{ marginBottom: "20px", fontSize: "16px" }}
      />
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>지역</th>
            <th>사냥터</th>
            <th>레벨</th>
            {["50%", "60%", "75%", "90%", "95%"].map(label => (
              <th key={label}>도달 여부 ({label})</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {huntingData.map((row, idx) => {
            const result = calculateRow(row.level, row.offsets);
            return (
              <tr key={idx}>
                <td>{row.zone}</td>
                <td>{row.name}</td>
                <td>{row.level}</td>
                {Object.keys(row.offsets).map(label => (
                  <td key={label}>
                    {result[label].met ? "⭕" : `❌ (${result[label].remain})`}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
