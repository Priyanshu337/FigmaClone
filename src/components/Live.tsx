import { useCallback, useEffect, useState } from "react";
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from "../../liveblocks.config"
import { CursorMode, CursorState, Reaction, ReactionEvent } from "../../types/type";
import CursorChat from "./Cursor/CursorChat";
import LiveCursor from "./Cursor/LiveCursor"
import ReactionSelector from "./Reaction/ReactionButton";
import FlyingReaction from "./Reaction/FlyingReaction";
import useInterval from "../../hooks/useInterval";

type Props = {
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

const Live = ({ canvasRef }: Props) => {
    const others = useOthers();
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;

    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden,
    });

    const [reaction, setReaction] = useState<Reaction[]>([]);

    const broadcast = useBroadcastEvent()

    useInterval(() => {
        if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
            // conccat all reaction created on mouse click
            console.log("Use interval works")
            setReaction((reactions) => reactions.concat([{
                point: { x: cursor.x, y: cursor.y },
                value: cursorState.reaction,
                timestamp: Date.now(),
            }]));
            broadcast({
                x: cursor.x,
                y: cursor.y,
                value: cursorState.reaction,
            })
        }
    }, 10);

    useEventListener((eventData) => {
        const event = eventData.event as ReactionEvent;
        setReaction((reactions) => reactions.concat([{
            point: { x: event.x, y: event.y },
            value: event.value,
            timestamp: Date.now(),
        }]));
    })

    const handlePointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault();
        if (cursor == null || cursorState.mode != CursorMode.ReactionSelector) {
            const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
            const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
            updateMyPresence({ cursor: { x, y } });
        }
    }, [])

    const handlePointerLeave = useCallback((event: React.PointerEvent) => {
        setCursorState({ mode: CursorMode.Hidden })
        updateMyPresence({ cursor: null, message: null });
    }, [])

    const handlePointerDown = useCallback((event: React.PointerEvent) => {

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
        updateMyPresence({ cursor: { x, y } });
        setCursorState((state: CursorState) => ({
            ...state,
            isPressed: cursorState.mode === CursorMode.Reaction
        }));
    }, [cursorState.mode, setCursorState])

    const handlePointerUp = useCallback((event: React.PointerEvent) => {
        setCursorState((state: CursorState) => ({
            ...state,
            isPressed: cursorState.mode === CursorMode.Reaction
        }));
    }, [cursorState.mode, setCursorState])

    const setReactions = useCallback((reaction: string) => {
        setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
    }, [])

    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === '/') {
                setCursorState({
                    mode: CursorMode.Chat,
                    message: "",
                    previousMessage: null,
                });
            }
            else if (e.key === 'Escape') {
                updateMyPresence({ message: '' })
                setCursorState({ mode: CursorMode.Hidden })
            } else if (e.key === 'e') {
                setCursorState({ mode: CursorMode.ReactionSelector })
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') {
                e.preventDefault();
            }
        };
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('keydown', onKeyDown);
        };

    }, [updateMyPresence])

    return (
        <div
            id="canvas"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="h-[100vh] w-full flex justify-center items-center text-center"
        >
            {/* Render reaction  */}

            <canvas ref={canvasRef} />

            {reaction.map((r, index) => {
                return (
                    <FlyingReaction
                        key={`${r.timestamp}-${index}`}
                        x={r.point.x}
                        y={r.point.y}
                        timestamp={r.timestamp}
                        value={r.value}
                    />)
            })}

            {/* If cursor is in chat mode, show the cursor  */}
            {cursor && (
                <CursorChat
                    cursor={cursor}
                    cursorState={cursorState}
                    setCursorState={setCursorState}
                    updateMyPresence={updateMyPresence} />
            )
            }

            {/* If cursor is in reaction selector mode, show the reaction selector */}
            {
                cursorState.mode === CursorMode.
                    ReactionSelector && (
                    <ReactionSelector
                        setReaction={setReactions}
                    />
                )}

            {/* Show the live cursor of other user  */}
            <LiveCursor others={others} />

        </div>
    )
}

export default Live

