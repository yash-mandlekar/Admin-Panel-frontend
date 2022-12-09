var arr = [
  { page: 1, group: "B" },
  { page: 2, group: "A" },
  { page: 5, group: "A" },
  { page: 1, group: "A" },
  { page: 4, group: "A" },
  { page: 3, group: "A" },
  { page: 2, group: "B" },
];
// sorting with group and page
arr.sort(function (a, b) {
  if (a.group < b.group) {
    return -1;
  }
  if (a.group > b.group) {
    return 1;
  }
  if (a.page < b.page) {
    return -1;
  }
  if (a.page > b.page) {
    return 1;
  }
  return 0;
});
console.log(arr);

// var sorted arr = [
//   { page: 1, group: "A" },
//   { page: 2, group: "A" },
//   { page: 3, group: "A" },
//   { page: 4, group: "A" },
//   { page: 5, group: "A" },
//   { page: 1, group: "B" },
//   { page: 2, group: "B" },
// ];
