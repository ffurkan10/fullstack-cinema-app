export function splitStringIntoFive(str: string) {
  const totalLength = str.length;
  const baseSize    = Math.floor(totalLength / 5);
  const remainder   = totalLength % 5;      // Artan fazladan karakter sayısı
  const parts       = [];
  let cursor        = 0;

  for (let i = 0; i < 5; i++) {
    // İlk `remainder` parçaya birer fazla karakter ekle
    const extra = i < remainder ? 1 : 0;
    const partSize = baseSize + extra;
    parts.push(str.slice(cursor, cursor + partSize));
    cursor += partSize;
  }

  return parts;
}