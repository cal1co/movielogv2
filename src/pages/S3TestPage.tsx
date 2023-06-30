import axios from 'axios';
import React, {useState, useEffect} from 'react'


const S3TestPage = () => {
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        getImage()
    }, [])
    const getImage = async () => {

        await axios.get('http://localhost:3000/api/auth/s3test')
        .then(res => {
            setImageUrl(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        
    }


    return (
        <div className="">
            {imageUrl && <img src={imageUrl} />}
        </div>
    )
}

export default S3TestPage