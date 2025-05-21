import { GifsListItem } from "../interfaces/gifs-list-item";
import { GiphyItem } from "../interfaces/giphy";

export class GifListItemMapper {

  static toGifListItem(item: GiphyItem):GifsListItem {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    };
  }

  static toGifListItemArray(items: GiphyItem[]):GifsListItem[] {
    return items.map(this.toGifListItem);
  }
}
