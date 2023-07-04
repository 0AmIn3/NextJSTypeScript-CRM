export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export function getCurrentTime() {
  const currentDate = new Date();
  let hours: number | string = currentDate.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes: number | string = currentDate.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
}

export function formatDate(dateString: string , locale : any) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date: Date = new Date(dateString);
  // let a : any =  'ru'

  // if (typeof window !== "undefined") {
  //   a = localStorage.getItem("locale") || ""
  // }
  return date.toLocaleDateString(locale, options);
}

export function calculateAge(birthDate: string) {
  const birthDateObj = new Date(birthDate);
  const now = new Date();

  let age = now.getFullYear() - birthDateObj.getFullYear();

  // Проверяем, прошел ли уже день рождения в текущем году
  const hasPassedBirthday =
    now.getMonth() > birthDateObj.getMonth() ||
    (now.getMonth() === birthDateObj.getMonth() &&
      now.getDate() >= birthDateObj.getDate());

  // Уменьшаем возраст, если день рождения еще не наступил
  if (!hasPassedBirthday) {
    age--;
  }

  return age;
}
