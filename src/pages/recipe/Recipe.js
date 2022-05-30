import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useState, useEffect } from 'react'
import { projectFirestore } from '../../firebase/config'

// styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('TsaiLabDiary').doc(id).onSnapshot(doc => {
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setIsPending(false)
        setError(`Could not find that recipe`)
      }
    })

    return () => unsub()

  }, [id])

  const handleClick = () => {
    projectFirestore.collection('TsaiLabDiary').doc(id).update({
      title: 'Something completely different'
    })
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>{recipe.cookingTime}</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          {/* <button onClick={handleClick}>Update</button> */}
          <Link to="/edit">Edit Diary</Link>
        </>
      )}
    </div>
  )
}