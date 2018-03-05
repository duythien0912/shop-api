import express from "express";
import request from "request-promise";
import { parseString } from "xml2js";

import authenticate from "../middlewares/authenticate";

const router = express.Router();
router.use(authenticate);

router.get("/search", (req, res) => {
  request
    .get(
      `https://myanimelist.net/malappinfo.php?u=Nekomata1037&status=all&type=anime&q=${
        req.query.q
      }`
    )
    .then(result =>
      parseString(result, (err, myanimelistResult) =>
        res.json({
          anime: myanimelistResult.myanimelist.anime.map(anime => ({
            seriesAnimedbId: anime.series_animedb_id[0],
            seriesTitle: anime.series_title[0],
            seriesSynonyms: anime.series_synonyms[0],
            seriesEpisodes: anime.series_episodes[0],
            seriesStatus: anime.series_status[0],
            seriesStart: anime.series_start[0],
            seriesEnd: anime.series_end[0],
            seriesImage: anime.series_image[0]
          }))
        })
      )
    );

  /* 
            anime: myanimelistResult.MyanimelistResponse.search[0].result[0].work.map(
            work => ({
              albumId: work.best_anime[0].id[0],
              id: work.best_anime[0].albumId[0]._,
              title: work.best_anime[0].title[0],
              url: [
                "http://placehold.it/600/92c952",
                "http://placehold.it/600/771796"
              ],
              thumbnailUrl: "http://placehold.it/150/92c952"
            })
          )

  res.json({
    items: [
      {
        albumId: 1,
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        url: [
          "http://placehold.it/600/92c952",
          "http://placehold.it/600/771796"
        ],
        thumbnailUrl: "http://placehold.it/150/92c952"
      },
      {
        albumId: 2,
        id: 1,
        title: "reprehenderit est deserunt velit ipsam",
        url: [
          "http://placehold.it/600/771796",
          "http://placehold.it/600/92c952"
        ],
        thumbnailUrl: "http://placehold.it/150/771796"
      }
    ]
  }); */
});

export default router;
