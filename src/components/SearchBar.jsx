import React, { useState } from 'react';

const SearchBar = ({ onSearch, onMicrophoneClick, onProfileClick }) => {
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchText);
        }
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-center bg-white rounded-full shadow-xl border border-gray-200 pl-4 pr-2 py-3">
                    <button
                        type="submit"
                        className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Search"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    <input
                        type="text"
                        value={searchText}
                        onChange={handleInputChange}
                        placeholder="Search Parkathon"
                        className="flex-1 px-4 py-2 text-gray-700 bg-transparent border-none outline-none placeholder-gray-400"
                    />

                    <div className="flex items-center space-x-2 ml-4">
                        <button
                            type="button"
                            onClick={onMicrophoneClick}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                            style={{
                                backgroundColor: 'oklch(77.7% 0.152 181.912)',
                                '--hover-bg': 'oklch(72% 0.152 181.912)'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'oklch(72% 0.152 181.912)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'oklch(77.7% 0.152 181.912)'}
                            aria-label="Voice search"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="-5 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                            >
                                <path
                                    d="M118,333 C121.866,333 125,329.866 125,326 L125,316 C125,312.134 121.866,309 118,309 C114.134,309 111,312.134 111,316 L111,326 C111,329.866 114.134,333 118,333 L118,333 Z M129,328 L127,328 C126.089,332.007 122.282,335 118,335 C113.718,335 109.911,332.007 109,328 L107,328 C107.883,332.799 112.063,336.51 117,336.955 L117,339 L116,339 C115.448,339 115,339.448 115,340 C115,340.553 115.448,341 116,341 L120,341 C120.552,341 121,340.553 121,340 C121,339.448 120.552,339 120,339 L119,339 L119,336.955 C123.937,336.51 128.117,332.799 129,328 L129,328 Z"
                                    fill="white"
                                    transform="translate(-107, -309)"
                                />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={onProfileClick}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                            style={{
                                backgroundColor: 'oklch(95.3% 0.051 180.801)',
                                '--hover-bg': 'oklch(90% 0.051 180.801)'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'oklch(90% 0.051 180.801)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'oklch(95.3% 0.051 180.801)'}
                            aria-label="User profile"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="oklch(77.7% 0.152 181.912)"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="16" cy="9" r="7" />
                                <path d="M16,18 C8.5,18 2,23.5 2,30 C2,31.1 2.9,32 4,32 L28,32 C29.1,32 30,31.1 30,30 C30,23.5 23.5,18 16,18 Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
