export function formatDate(dateString: string) {
  const dateObj: Date = new Date(dateString);
  const year: number = dateObj.getFullYear();
  const month: string = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const day: string = ('0' + dateObj.getDate()).slice(-2);
  const formattedDate: string = `${year}-${month}-${day}`;
  return formattedDate;
}


interface SourceObject {
  [key: string]: any;
}

interface DestinationObject {
  [key: string]: any;
}

export function mapObjectData<T>(source: SourceObject, destination: DestinationObject) {
  for (const key in destination) {
    if (destination.hasOwnProperty(key) && source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }
  return destination as T;
}

export function generateRandomColor(count: number): string[] {
  let arrColor = []

  for (let i = 0; i < count; i++) {
    let hexChars = '0123456789ABCDEF';
    let color: string = '#';
    color += hexChars[Math.floor(Math.random() * 16)];
    arrColor.push(color);
  }

  return arrColor;
}
