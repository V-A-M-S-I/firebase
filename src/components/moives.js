import React, { useEffect, useState } from 'react';
import { db,auth,storage } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc,doc,updateDoc } from 'firebase/firestore';
import {ref,uploadBytes} from 'firebase/storage';
export default function Movies() {
    const [moviesList, setMoviesList] = useState([]); 
    const moviesCollectionRef = collection(db, "movies");
    const [updateTitle,setUpdateMoive] = useState("");
    const [fileUplode,setFileUplode] = useState(null);
    const [data, setData] = useState({
        moive: "",
        release: "",
        box: false 
    });

    const fetchData = async () => {
        try {
            const data = await getDocs(moviesCollectionRef); 
            const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setMoviesList(newData); 
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteMoive = async (id) => {
        console.log("Deleting movie with ID:", id);
        try {
            const movieDoc = doc(db, "movies", id);
            await deleteDoc(movieDoc);
            console.log("Movie deleted successfully.");
            fetchData(); // Refresh movie list after deletion
        } catch (error) {
            console.error("Error deleting movie:", error.message);
        }
    }

    const updateMoive = async(id)=>{
        try{
            const movieDoc = doc(db,"movies",id);
            await updateDoc(movieDoc, { moive: updateTitle });
        }
        catch (err){
            console.log(err)
        }
    }

    const uploadFile = async()=>{
        if(!fileUplode)return;
        const fileFolderRef = ref(storage, `projectFiles/${fileUplode[0].name}`);

        try{
            await uploadBytes(fileFolderRef,fileUplode)
        }catch (err){
            console.log(err);
        }
    
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            const newMovie = {
                name: data.movie,
                release: data.release,
                Oscar: data.box ,
                userId:auth?.currentUser?.uid
            };
    
            await addDoc(moviesCollectionRef, newMovie);
    
            setData({
                movie: "",
                release: "",
                box: false
            });
    
            fetchData();
        } catch (error) {
            console.error("Error adding movie:", error.message);
        }
    }
    
   
    

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Movie' name='movie' value={data.movie} onChange={handleChange} />
                    <input type='number' placeholder='Release' name='release' value={data.release} onChange={handleChange} />
                    <label>
                        Received as Oscar
                        <input type='checkbox' name='box' checked={data.box} onChange={handleChange} />
                    </label>
                    <button type="submit">Submit Movies</button>
                </form>
            </div>
            <div>
                {moviesList.map((movie) => (
                    <div key={movie.id}>
                        <h1>{movie.name}</h1>
                        <p>Date: {movie.release}</p>
                        <p>Oscar: {movie.Oscar}</p>
                        <button onClick={() => deleteMoive(movie.id)}>Delete</button>

                        <input type='text' value={updateTitle} onChange={(e) => setUpdateMoive(e.target.value)} />
                        <button onClick={()=>updateMoive(movie.id)}>Submit</button>

                        <input type='file' onChange={(e)=> setFileUplode(e.target.files)}/>


                        <button onClick={uploadFile}>upload</button> 
                    </div>
                ))}
            </div>
        </>
    );
}
