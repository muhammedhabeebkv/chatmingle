import { auth, firestore } from './database'
import {
	doc,
	setDoc,
	collection,
	query,
	where,
	getDocs,
} from 'firebase/firestore'

type Condition = "!=" | "<" | "<=" | "==" | ">" | ">=" | "in";

export const updateExistingData = async (collection_name: string, doc_id: string, dataList: any) => (
	await setDoc(doc(firestore, collection_name, doc_id), dataList, { merge: true })
)

export const getSpecificDataWithWhere = async (collection_name: string, value1: any, condition: Condition, value2: any) => (
	await getDocs(query(collection(firestore, collection_name), where(value1, condition, value2)))
)