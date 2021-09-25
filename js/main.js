function checkPositive(num) {
  return (num >= 0);
}

function getRandom(min, max, decimalPlaces) {

  if (!checkPositive(min) || !checkPositive(max) || !checkPositive(decimalPlaces)) {
    return 'Введено отрицательное значение, функция не может быть выполнена';
  }

  // Если значение «до» равно значению «от», выведем это значение,
  // так как других чисел в таком диапазоне быть не может
  if (min === max) {
    return min.toFixed(decimalPlaces);
  }

  // Если значение «до» меньшее, чем значение «от», выведем число, находящееся между этими значениями
  // Для этого поменяем местами min и max
  if (min > max) {
    const swaper = min;
    min = max;
    max = swaper;
  }

  return (min + Math.random() * (max - min)).toFixed(decimalPlaces);
}

getRandom();
