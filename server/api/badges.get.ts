export default defineEventHandler(async () => {
  const data = await fetch('https://hastebin.cc/raw/avuqupafic').then(r => r.text())

  return data
})
