import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";


const useFirestore = (collections) => {
    const [docs, setDocs] = useState([]);

    useEffect(()=>{
        const q = query(collection(projectFirestore, collections), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot)=>{
            setDocs(snapshot.docs.map((doc)=>({...doc.data(), id:doc.id})))
        })
        return ()=>unsub()
    },[collections])

    return {docs};
}

export default useFirestore;