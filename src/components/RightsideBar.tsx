import React from 'react'

const RightsideBar = () => {
    return (
        <section className='d-flex flex-col min-2-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20' style={{
            borderColor: '#d1d5db', // border-primary-grey-200
            backgroundColor: '#000000', // bg-primary-black
            color: 'grey', // text-primary-grey-300
            borderWidth: '1px', // Example border width, adjust as needed
            borderStyle: 'solid', // Example border style, adjust as needed
            width: '7%'
        }}
        >
            <h1 className='px-5 pt-3 text-xs uppercase'>Design</h1>
        </section >
    )
}

export default RightsideBar