export default () => ({
  url:
    'https://raw.githubusercontent.com/italia/covid19-opendata-vaccini/master/dati/anagrafica-vaccini-summary-latest.json',
  data: [],
  fetchDate: null,
  selectedOption: 'genders',
  options: {
    genders: ['maleGender', 'femaleGender'],
    categories: [
      'socioHealthWorkers',
      'notMedicalPersonnel',
      'other',
      'rsaGuests',
      'over80',
      'armedForces',
      'schoolStaff',
    ],
  },
  colors: {
    genders: ['pink', 'skyblue'],
    categories: ['red', 'blue', 'grey', 'yellow', 'purple', 'green', 'orange'],
  },
})
