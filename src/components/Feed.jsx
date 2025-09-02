'use client'

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard.jsx"
import usePromptStore from "@/store/usePromptStore.js"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const { prompts, fetchPrompts, loading, error } = usePromptStore()

    const [searchText, setSearchText] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(null)
    const [searchedResults, setSearchedResults] = useState([])

    useEffect(() => {
        const loadData = async () => {
            await fetchPrompts()
        }
        loadData()
    }, [])

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i") // 'i' flag for case-insensitive search
        return prompts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        )
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)

        //debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value.trim())
                setSearchedResults(searchResult)
            }, 500)
        )
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName)

        const searchResult = filterPrompts(tagName)
        setSearchedResults(searchResult)
    }

    return (
        <section className="feed">
            <form className="relative flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username..."
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input"
                />
                {searchText && <img src="/assets/icons/clear.svg" alt="clear" className="absolute right-3 size-3.5 cursor-pointer" onClick={() => setSearchText("")} />}
            </form>

            {/* All Prompts */}
            {searchText ? (
                <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
            ) : (
                <PromptCardList data={prompts || []} handleTagClick={handleTagClick} />
            )}
        </section>
    )
}

export default Feed

