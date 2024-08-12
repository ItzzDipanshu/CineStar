import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",// humne ye issiliye kia qki TMDB mai saare URLs mai ye link to same hi thi...iske baad se links change hone lagi aalag aalag field ke liye

    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzc0MTRkOTUzMTdkMWM3MDJmODM0MGZjYjk3N2VjMCIsIm5iZiI6MTcyMjk0MzQ5NS4wNTMzMTksInN1YiI6IjY2YjIwNGI5Mzk3YmY0MDM4OTc1NzA1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qqi74CIh1bop9KESZrVTEIBPb6TDmbFmfhVQbqMHZwo'
      } // ye humne paste kia hai TMDB ke side mai jo node ka code aa rha tha waha se qki, jab bhi hum humari URL ko access karenge to KEY cahiye hogi and wo KEY humne headers mai store krr di hai taaki baar baar KEY ko paste na krna pade.
})

export default instance;