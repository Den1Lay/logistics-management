export default function replaceAll(string, target, res){
  let prevString = string.substring();
  let newString = string.substring().replace(target, res);
  while(prevString !== newString ) {
    prevString = newString.substring();
    newString = prevString.substring().replace(target, res);
  };
  return prevString; 
}