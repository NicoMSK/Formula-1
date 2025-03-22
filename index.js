/* у нас должно быть 3 состояния строк:
- прошедшая гонка, это у которой дата и время меньше текущей даты и времени (должна быть вычеркнута и не активна)
- текущая гонка, дата которая 
- будущие гонки
*/

// эта функция определяет тип гонки на выходе: прошедшая, текущая или будущая
// (raceDate: Date) => 'past' | 'current' | 'future'
function defineRaceType(raceDate) {
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;
  const toDay = new Date();
  const raceDay = new Date(raceDate);

  const toDayTime = toDay.getHours() * SECONDS_IN_HOUR + toDay.getMinutes() * SECONDS_IN_MINUTE;
  const raceDayTime = raceDay.getHours() * SECONDS_IN_HOUR + raceDay.getMinutes() * SECONDS_IN_MINUTE;

  toDay.setHours(0, 0, 0, 0);
  raceDay.setHours(0, 0, 0, 0);

  if (raceDay.getTime() > toDay.getTime()) {
    return "future";
  } else if (raceDay.getTime() === toDay.getTime() && raceDayTime > toDayTime) {
    return "current";
  }
  else {
    return "past";
  }
}

function addsClassRow(raceType, row) {
  if (raceType === "past") {
    row.classList.add("table__row--completed")
  } else if (raceType === "current") {
    row.classList.add("table__row--current")
  }
}

const rowsNodes = document.querySelectorAll(".table__row");
const racesDateNodes = document.querySelectorAll(".race-date");
let currentRaceFound = true;

for (let i = 0; i < racesDateNodes.length; i++) {
  const dateRace = racesDateNodes[i].dataset.raceDate;
  const typeRace = defineRaceType(dateRace);

  if (typeRace === "current") {
    currentRaceFound = false;
  }
  if (currentRaceFound && typeRace === "future") {
    addsClassRow("current", rowsNodes[i]);
    break;
  }
  addsClassRow(typeRace, rowsNodes[i]);
}
