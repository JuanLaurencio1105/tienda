import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBuUmyeofK2sYOWCij0biCug8b0D2YXUkU',
  authDomain: 'tiendavr-bb887.firebaseapp.com',
  projectId: 'tiendavr-bb887',
  storageBucket: 'tiendavr-bb887.appspot.com',
  messagingSenderId: '756134309061',
  appId: '1:756134309061:web:599d6b34e6f935100bd4ac',
  measurementId: 'G-0S6HCHY2TG'
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore(app)

export {
  app,
  storage,
  db
}
// import { useEffect, useState } from 'react'
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import { getDownloadURL, listAll, ref } from 'firebase/storage'
// import { db, storage } from '@/lib/firebase'
//
// export const useProjectBySlug = ({ collectionName, projectSlug }) => {
//   const [project, setProject] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//
//   useEffect(() => {
//     setIsLoading(true)
//     getPersonalProjects()
//   }, [])
//
//   const getPersonalProjects = async () => {
//     try {
//       const q = query(collection(db, collectionName), where('slug', '==', projectSlug))
//       const querySnapshot = await getDocs(q)
//       const projectSnapshot = querySnapshot.docs.map(snap => snap.data())
//
//       // Get images of project
//       const storageRef = ref(storage, projectSlug)
//       const allImages = await listAll(storageRef)
//       const imagesPromises = allImages.items.map(async (imageRef) => await getDownloadURL(imageRef))
//       const imagesResponse = await Promise.all(imagesPromises)
//
//       const project = {
//         id: projectSnapshot[0].id,
//         title: projectSnapshot[0].title,
//         slug: projectSnapshot[0].slug,
//         description: projectSnapshot[0].description,
//         projectLink: projectSnapshot[0].project_link,
//         githubLink: projectSnapshot[0].github_link,
//         stack: projectSnapshot[0].stack,
//         images: imagesResponse
//       }
//
//       setProject(project)
//       setIsLoading(false)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }
//
//   return {
//     data: project,
//     isLoading
//   }
// }
