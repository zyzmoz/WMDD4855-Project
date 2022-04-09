const parseHttpResponse = (data) => {
  return data[Object.keys(data)[0]];
};

const topThreeSubjects = (subjects) => {
  if (!subjects) return [];
  let topThree = [];
  while (topThree.length < 3) {
    const subjectsCopy = subjects;
    const top = subjectsCopy
      .sort(
        (a, b) =>
          subjects.filter((v) => v === a).length -
          subjects.filter((v) => v === b).length
      )
      .pop();
    subjects = subjects.filter((sb) => sb !== top);
    topThree.push(top);
  }
  return topThree;
};
