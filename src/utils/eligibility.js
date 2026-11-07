export function evaluate(s, p) {
  const rules = [
    ["Study level", p.course, p.course === s.course],
    ["Annual family income", p.income, Number(p.income) <= s.income],
    ["Academic score", p.marks, Number(p.marks) >= s.marks],
    ...(s.gender ? [["Gender", p.gender, p.gender === s.gender]] : []),
    ...(!s.states.includes("All India")
      ? [["State", p.state, s.states.includes(p.state)]]
      : []),
  ];
  return {
    rules,
    pass: rules.filter((r) => r[1] && r[2]).length,
    total: rules.length,
    fail: rules.some((r) => r[1] && !r[2]),
    unknown: rules.some((r) => !r[1]),
  };
}
