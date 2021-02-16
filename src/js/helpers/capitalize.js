export default function capitalize(string = '') {
  return [...string].map(
    (char, index) => index ? char.toLowerCase() : char.toUpperCase()
  ).join('');
}
