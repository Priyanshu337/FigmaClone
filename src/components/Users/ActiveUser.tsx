import { useOthers, useSelf } from "../../../liveblocks.config";
import { Avatar } from "./Avatar";
import styles from "./index.module.css";
import { generateRandomName } from "@/lib/utils";
import { useMemo } from "react";

const ActiveUser = () => {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > 3;

    const memoizedUsers = useMemo(() => {
        return (
            <div className="flex align-center justify-center gap-1 py-8">
                <div className="flex pl-3">

                    {currentUser && (
                        <Avatar name="You" otherStyles="border-[3px] border-primary-green" />
                    )}

                    {users.slice(0, 3).map(({ connectionId, info }: any) => {
                        return (
                            <Avatar key={connectionId} name={generateRandomName()} otherStyles="-ml-3" />
                        );
                    })}

                    {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}


                </div>
            </div>
        )
    }, [users.length])

    return memoizedUsers;
}
export default ActiveUser;


