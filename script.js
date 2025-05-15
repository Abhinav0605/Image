const accessKey ='3FUlbUbRKI7KqsA-jG7FnhV8KlUJ3QUJ-GA0gMRblAQ';
const searchForm =document.querySelector('#searchForm');
const imagesContainer=document.querySelector('.images-container');
const searchInput =document.querySelector('#searchInput');

searchForm.addEventListener('submit',async(e) =>{
    e.preventDefault();

    const query = searchInput.value.trim();
    if(!query) {
        alert('Please enter an image name');
        return;
    }


    const apiUrl=`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();


        imagesContainer.innerHTML="";

        if (data.results.length ===0) {
            imagesContainer.innerHTML = "<h2>No Images Found</h2>";
            return;
        }

       
        data.results.forEach(photo => {
            const imgElement =document.createElement('img');
            imgElement.src =photo.urls.small;
            imgElement.alt =photo.alt_description ||"Image";
            imgElement.classList.add("image-item");
            imagesContainer.appendChild(imgElement);
        });
    } catch(error) {
        console.error("Error fetching images:", error);
        imagesContainer.innerHTML = "<h2>Error fetching images</h2>";
    }
});
