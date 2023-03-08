import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

//guardando nuevos items
export const guardarItem = async (data) => {
    await setDoc(
        doc(firestore, "foodItems", `${Date.now()}`), data, { 
            merge: true 
    });
};