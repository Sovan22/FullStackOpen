export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        if (!response.ok) {
          throw new Error('Country not found')
        }
        const data = await response.json()
        setCountry({ found: true, data: data[0] })
      } catch (error) {
        setCountry({ found: false })
      }
    }

    fetchCountry()
  }, [name])

  return country
}