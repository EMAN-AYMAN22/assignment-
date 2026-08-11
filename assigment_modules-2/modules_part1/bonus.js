function longestComponentPrefix(...str) {
  const strs = str;
  if (strs.length === 0) return "";
  strs.sort();
  let first = strs[0];
  let last = strs[strs.length - 1];
  for (let index = 0; index < first.length && first[index] === last[index]; index++) {
    return first.substring(0,index)
  }
  
  console.log(first);
  console.log(last);

  console.log(strs);
}
longestComponentPrefix("lara", "lamis", "ayman","eman");
