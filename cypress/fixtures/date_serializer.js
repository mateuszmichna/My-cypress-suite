var options = { year: 'numeric', month: 'long', day: 'numeric' };
const date = new Date()
const today_date = new Date().toLocaleDateString("en-US", options)
const yesterday_date = new Date(date.setDate(date.getDate() - 1)).toLocaleDateString("en-US", options)

export { options, today_date, yesterday_date}