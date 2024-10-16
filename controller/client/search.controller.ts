import { Request, Response } from "express";
// import FavoriteSong from "../../model/favorite-songs.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/converToSlug";

// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
  const type = req.params.type;
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
      });

      newSongs.push({
        id: item.id,
        title: item.title,
        avatar: item.avatar,
        like: item.like,
        slug: item.slug,
        infoSinger: {
          fullName: infoSinger.fullName,
        },
      });
    }
  }

  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        pageTitle: `Kết quả: ${keyWord}`,
        keyWord: keyWord,
        songs: newSongs,
      });
      break;
    case "suggest":
      res.json({
        code: 200,
        message: "Thành công",
        songs: newSongs,
      });
      break;
    default:
      break;
  }
};
