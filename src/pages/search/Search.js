import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'
import RecipeList from '../../components/RecipeList'

// styles
import './Search.css'

export default function Search() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  // const url = 'http://localhost:3001/TsaiLabDiary?q=' + query
  // // const url = 'https://console.firebase.google.com/u/0/project/tsailabdiary/firestore/data/~2FTsaiLabDiary~2F?q='+ query


  useEffect(() => {
    setIsPending(true)
    // console.log(projectFirestore.collection('TsaiLabDiary').where("title","in",[query]).length)
    const unsub = projectFirestore.collection('TsaiLabDiary')
    .where("title","in",[query])
    .onSnapshot(snapshot => {
      if (snapshot.empty) {
        setError('No recipes to load')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          // console.log(doc)
          results.push({ ...doc.data(), id: doc.id })
        })
        setData(results)
        setIsPending(false)
      }
    }, err => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()

  }, [])

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}