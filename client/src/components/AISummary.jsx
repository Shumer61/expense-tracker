import { useState } from 'react'

function AISummary() {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getSummary = async () => {
    setLoading(true)
    setError('')
    setSummary('')

    try {
      const response = await fetch('/api/summary')
      const data = await response.json()

      if(data.summary){
        setSummary(data.summary)
      } else {
        setError('Could not get summary. Please try again.')
      }
    } catch(err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-summary">
      <div className="ai-header">
        <h2>AI Spending Insights</h2>
        <button 
          onClick={getSummary} 
          disabled={loading}
          className="ai-btn"
        >
          {loading ? 'Analysing...' : 'Get AI Summary'}
        </button>
      </div>

      {loading && (
        <div className="ai-loading">
          <p>Claude is analysing your expenses...</p>
        </div>
      )}

      {error && (
        <div className="ai-error">
          <p>{error}</p>
        </div>
      )}

      {summary && (
        <div className="ai-result">
          <p>{summary}</p>
        </div>
      )}
    </div>
  )
}

export default AISummary