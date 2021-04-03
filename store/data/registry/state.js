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
    genders: ['246, 168, 255', '166, 248, 255'],
    stateWorkers: ['250, 131, 125', '26, 145, 48', '235, 232, 84'],
    doses: ['52, 235, 131', '50, 159, 237'],
  },
})
