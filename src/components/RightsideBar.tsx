import React from 'react'

const RightsideBar = () => {
    return (
        <section className='d-flex flex-col border-t  min-2-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20' style={{
            borderColor: '#d1d5db', // border-primary-grey-200
            backgroundColor: '#000000', // bg-primary-black
            color: '#9ca3af', // text-primary-grey-300
            borderWidth: '1px', // Example border width, adjust as needed
            borderStyle: 'solid', // Example border style, adjust as needed
        }}
        >
            <h1>Design</h1>
        </section >
    )
}

export default RightsideBar