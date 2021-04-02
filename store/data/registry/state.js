export default () => ({
  url:
    'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.json',
  data: [],
  fetchDate: null,
  selectedOption: 'doses',
  options: {
    genders: ['maleGender', 'femaleGender'],
    stateWorkers: ['socioHealthWorkers', 'armedForces', 'schoolStaff'],
    doses: ['firstDose', 'secondDose'],
  },
  colors: {
    genders: ['pink', 'skyblue'],
    stateWorkers: ['red', 'green', 'yellow'],
    doses: ['green', 'blue'],
  },
})
