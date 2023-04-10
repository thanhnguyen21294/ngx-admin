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

export function mapObjectData(source: SourceObject, destination: DestinationObject) {
  for (const key in destination) {
    if (destination.hasOwnProperty(key) && source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }
  return destination;
}
