import { useEffect, useState } from "react"
import api from "../api/axios"

export default function useLinks(){
    const [links, setLinks] = useState([])
    const [copiedId, setCopiedId] = useState(null)

    useEffect(() => {
        async function fetchLinks(){
            try {
                const res = await api.get('api/links')
                setLinks(res.data)
            } catch (error) {
                console.error("Failed to load links:", error)
            }
        }
        fetchLinks()
    }, [])


function addLink(newLink){
    setLinks((prev) => [newLink, ...prev])

}

function copyLink(id, shortUrl){
    navigator.clipboard.writeText(shortUrl).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
}
return {links, copiedId, addLink, copyLink}
}