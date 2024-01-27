import React, { useState } from 'react'
import { SidebarHeader } from './header'
import { Notifications } from './notifications'
import Search from './search/Search';
import { Conversations } from './conversations';
import {SearchResults} from './search';

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);
  return (
    <div className='flex0030 max-w-[40%] h-full select-none'>

        {/*Sidebar Header*/}
      <SidebarHeader />
      {/*Notifications */}
      <Notifications />

      <Search searchLength={searchResults.length} setSearchResults={setSearchResults}/>  
      {searchResults.length > 0 ? (<>
        {/* {Search Results} */}
        <SearchResults searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      </>):(
        <>
          {/* Conversation */}
          <Conversations/>
        </>
      )}

      {/* Conversation
     <Conversations/> */}
    </div>
  )
}
