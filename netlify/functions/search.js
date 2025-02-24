exports.handler = async (event) => {
  const API_KEY = process.env.YOUTUBE_API_KEY // Obtener la API Key desde Netlify
  const query = event.queryStringParameters.q

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No query provided' })
    }
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&type=video&key=${API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)

    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}
