import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

//guardando nuevos items
export const guardarItem = async (data) => {
    await setDoc(
        doc(firestore, "foodItems", `${Date.now()}`), data, { 
            merge: true 
    });
};

//Obtener todos los items de comida
export const ObtenerTodosFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};