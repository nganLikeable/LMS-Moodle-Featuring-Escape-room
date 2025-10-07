"use client";
import { resetTimer } from "@/app/store/timerSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
export default function Complete() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { state } = useSelector((state: any) => state.timer);

  return (
    <div>
      <button
        onClick={() => {
          router.push("/escape-room"), dispatch(resetTimer());
        }}
      >
        Restart the game
      </button>
    </div>
  );
}
