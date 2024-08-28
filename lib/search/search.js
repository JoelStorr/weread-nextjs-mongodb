
"use server";

 export async function runBookSearch(formData) {
   
    let searchValue = formData.get('search')
    let pageIndex = 1;

   try {
     const res = await fetch(
       `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&startIndex=${pageIndex}&maxResults=10`
     );

     if (!res.ok) {
       throw new Error(`Response status ${res.status}`);
     }

     const response = await res.json();

     console.log(response);

     let temp = [];
     for (let i = 0; i < response.items.length; i++) {
       if (!response.items[i].volumeInfo.industryIdentifiers) {
         continue;
       }
       console.log(response.items[i].volumeInfo.industryIdentifiers.length);

       if (response.items[i].volumeInfo.industryIdentifiers.length === 0) {
         continue;
       }

       const bookObj = {
         id: response.items[i].id,
         title: response.items[i].volumeInfo.title,
         author: response.items[i].volumeInfo.authors,
         cover: null,
         isbn: null,
         pages: response.items[i].volumeInfo.pageCount,
       };

       if (response.items[i].volumeInfo.imageLinks) {
         bookObj["cover"] = response.items[i].volumeInfo.imageLinks.thumbnail;
       }

       console.log(response.items[i].volumeInfo.industryIdentifiers);

       if (response.items[i].volumeInfo.industryIdentifiers.length > 1) {
         if (response.items[i].volumeInfo.industryIdentifiers[1].identifier) {
           bookObj["isbn"] =
             response.items[i].volumeInfo.industryIdentifiers[1].identifier;
         }
       } else {
         if (response.items[i].volumeInfo.industryIdentifiers[0].identifier) {
           bookObj["isbn"] =
             response.items[i].volumeInfo.industryIdentifiers[0].identifier;
         }
       }
       temp.push(bookObj);
     }

     console.log(searchValue);
     return [...temp]

   } catch (error) {
     console.log(error);
   }
 }