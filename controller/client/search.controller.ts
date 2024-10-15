import { Request, Response } from "express";
// import FavoriteSong from "../../model/favorite-songs.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/converToSlug";

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
  const keyWord: string = `${req.query.keyword}`;

  let newSongs = [];
  if (keyWord) {
    const keyWordRegex = new RegExp(keyWord, "i");

    // Tạo ra slug không dấu, có thêm - ngắn cách
    const stringSlug = convertToSlug(keyWord);
    const stringSlugRegex = new RegExp(stringSlug, "i");
    const songs = await Song.find({
      $or: [{ title: keyWordRegex }, { slug: stringSlugRegex }],
    });

    for (const item of songs) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId,
        deleted: false,
      }).select("fullName");
      item["infoSinger"] = infoSinger;
    }
    newSongs = songs;
  }

  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyWord}`,
    keyWord: keyWord,
    songs: newSongs,
  });
};
