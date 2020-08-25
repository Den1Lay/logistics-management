export default function replaceAll(string, target, res){
  const regular = new RegExp([target], 'g');
  return string.replace(regular, res);
}