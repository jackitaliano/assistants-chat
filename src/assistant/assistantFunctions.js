
export function getCurrentWeather(location) {
  location = location.toLowerCase();
  if (location.includes('tokyo')) {
    return 'Good';
  } else if (location.includes('san francisco')) {
    return 'Mild';
  } else {
    return 'Cold';
  }
}

export async function callFunc(functionDetails) {
  let tmp = '';
  if(functionDetails.name == "get_weather") {
    tmp = getCurrentWeather(functionDetails.arguments);
  }

  return tmp;
}

export async function funcCalling(functionsDetails) {
  let tmp = await Promise.all(functionsDetails.map(callFunc));
  return tmp;
}
