// // SixNinetyNineMovies.jsx
// import React, { useEffect, useState } from 'react';
// import MovieCard from './MovieCard';
// import '../styles/SixNinetyNineMovies.css';

// const SixNinetyNineMovies = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchSixNinetyNineMovies = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&vote_count.gte=1000&vote_average.gte=6.5&with_original_language=en&with_watch_providers=8|125|337|350|384|387|8|12|13|15|31|34|39|41|43|44|47|48|50|52|56|59|68|70|72|76|80|83|87|90|92|95|99|104|106|109|110|112|113|116|118|119|123|126|131|135|138|141|145|146|152|157|163|165|169|171|172|173|176|181|182|185|187|188|195|198|199|201|202|206|207|210|212|213|215|221|222|223|227|230|231|239|243|244|251|253|257|258|260|263|268|272|274|275|278|282|287|288|296|297|300|303|306|307|311|313|316|317|322|324|329|330|334|338|343|344|346|349|352|354|355|360|362|367|371|372|375|378|380|383|386|390|391|396|398|399|400|402|404|409|410|411|412|416|421|425|427|428|432|436|442|447|450|455|457|459|463|464|466|473|475|476|478|481|482|483|487|488|489|494|495|498|500|505|506|509|510|512|517|519|521|522|524|526|528|531|532|536|537|542|546|548|549|551|558|559|562|563|567|570|575|579|583|585|586|588|590|593|598|599|601|604|605|608|615|619|622|624|630|633|634|641|646|650|656|658|663|665|673|675|676|680|681|683|687|688|691|692|696|697|700|702|706|707|710|712|714|715|716|717|719|723|725|727|729|732|733|736|737|738|739|743|746|747|748|750|751|753|754|756|760|761|762|763|765|767|768|770|772|773|775|777|779|781|783|785|788|790|791|793|795|797|798|800|801|802|803|805|809|813|814|815|818|819|821|822|824|826|827|829|830|831|833|835|837|838|840|843|844|845|846|848|849|853|855|856|857|859|862|864|866|867|868|869|870|873|874|876|878|881|882|883|884|886|887|888|889|890|891|892|893|894|896|898|899|900|901|902|903|904|905|906|907|908|909|910|911|912|913|914|915|916|917|918|919|920|921|922|923|924|925|926|927|928|929|930|931|932|933|934|935|936|937|938|939|940|941|942|943|944|945|946|947|948|949|950|951|952|953|954|955|956|957|958|959|960|961|962|963|964|965|966|967|968|969|970|971|972|973|974|975|976|977|978|979|980|981|982|983|984|985|986|987|988|989|990|991|992|993|994|995|996|997|998|999&watch_region=US&with_watch_monetization_types=flatrate`
//         );
//         const data = await response.json();

//         const currentDate = new Date();
//         const filteredMovies = data.results.filter(movie => {
//           const releaseDate = new Date(movie.release_date);
//           const yearDifference = currentDate.getFullYear() - releaseDate.getFullYear();
//           return yearDifference > 2;
//         });

//         setMovies(filteredMovies);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchSixNinetyNineMovies();
//   }, []);

//   return (
//     <div className="section-container">
//       <h2 className="section-title">$6.99 Movies</h2>
//       <div className="movie-grid">
//         {movies.map(movie => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SixNinetyNineMovies;
