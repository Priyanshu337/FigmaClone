import React from 'react'
import { CursorChatProps, CursorMode } from '../../../types/type'
import CursorSVG from '../../../public/assets/CursorSVG'
import { useUpdateMyPresence } from '../../../liveblocks.config'

const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateMyPresence({ message: e.target.value });
        setCursorState({
            mode: CursorMode.Chat,
            previousMessage: null,
            message: e.target.value,
        })
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && cursorState.mode === CursorMode.Chat) {
            setCursorState({
                mode: CursorMode.Chat,
                previousMessage: cursorState.message,
                message: ''
            })
        } else if (e.key === 'Escape') {
            setCursorState({
                mode: CursorMode.Hidden,
            })
        }
    }
    return (
        <div className="absolute top-0 left-0" style={{ transform: `translatex(${cursor.x}px) translateY(${cursor.y}px)` }}>
            {
                cursorState.mode === CursorMode.Chat && (
                    <>
                        <CursorSVG color="#000" />

                        {/* This div below is used for bubble text area for chat which is displaying when "/" is pressed */}
                        <div className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]"
                            onKeyUp={(e) => e.stopPropagation} >

                            {/* This below code is used to check wheather there is any previous message or not  */}
                            {cursorState.previousMessage && (
                                <div>
                                    {cursorState.previousMessage}
                                </div>
                            )}

                            {/* This is the input area in bubble div to type message I have used autoFOcus to start typing as soon as input area appear */}
                            <input className='z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none ' autoFocus={true}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                placeholder={cursorState.previousMessage ? '' : 'Type a message...'}
                                value={cursorState.message}
                                maxLength={50}
                            />
                        </div>
                    </>
                )}
        </div >
    )
}

export default CursorChat
