import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

export function useChats(userId: string) {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", userId),
      orderBy("lastMessageAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, [userId]);

  return { chats, loading };
}
