import { useState, useEffect } from 'react'

const useAssets = (assetPaths = []) => {
  const [assets, setAssets] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true)
        const loadedAssets = {}
        
        for (const path of assetPaths) {
          try {
            const asset = await import(`/public/assets/${path}`)
            loadedAssets[path] = asset.default
          } catch (assetError) {
            console.warn(`Failed to load asset: ${path}`, assetError)
          }
        }
        
        setAssets(loadedAssets)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (assetPaths.length > 0) {
      loadAssets()
    } else {
      setLoading(false)
    }
  }, [assetPaths])

  return { assets, loading, error }
}

export default useAssets
