import Category3d from "./Category3d";
import CategoryAiArt from "./CategoryAiArt";
import CategoryAnime from "./CategoryAnime";
import CategoryArt from "./CategoryArt";
import CategoryDance from "./CategoryDance";
import CategoryDesign from "./CategoryDesign";
import CategoryFood from "./CategoryFood";
import CategoryGenArt from "./CategoryGenArt";
import CategoryGlitchArt from "./CategoryGlitchArt";
import CategoryIllustration from "./CategoryIllustration";
import CategoryMemes from "./CategoryMemes";
import CategoryMusic from "./CategoryMusic";
import CategoryPhotography from "./CategoryPhotography";
import CategoryPixelArt from "./CategoryPixelArt";
import CategorySciFi from "./CategorySciFi";
import CategorySports from "./CategorySports";
import CategoryText from "./CategoryText";

export {
  CategoryArt,
  CategorySciFi,
  CategoryFood,
  CategoryMemes,
  CategorySports,
  CategoryMusic,
  CategoryDance,
  CategoryDesign,
  CategoryPixelArt,
  CategoryAnime,
  Category3d,
  CategoryGlitchArt,
  CategoryIllustration,
  CategoryPhotography,
  CategoryAiArt,
  CategoryGenArt,
  CategoryText,
};

const size = 24;

export const categories = [
  {
    key: "generative-art",
    content: "Generative Art",
    icon: <CategoryGenArt size={size} />,
  },
  {
    key: "ai-art",
    content: "AI Art",
    icon: <CategoryAiArt size={size} />,
  },
  {
    key: "photography",
    content: "Photography",
    icon: <CategoryPhotography size={size} />,
  },
  {
    key: "illustration",
    content: "Illustration",
    icon: <CategoryIllustration size={size} />,
  },
  {
    key: "glitch-art",
    content: "Glitch Art",
    icon: <CategoryGlitchArt size={size} />,
  },
  {
    key: "3d",
    content: "3D",
    icon: <Category3d size={size} />,
  },
  {
    key: "anime",
    content: "Anime",
    icon: <CategoryAnime size={size} />,
  },
  {
    key: "pixel-art",
    content: "Pixel Art",
    icon: <CategoryPixelArt size={size} />,
  },
  {
    key: "design",
    content: "Design",
    icon: <CategoryDesign size={size} />,
  },
  {
    key: "dance",
    content: "Dance",
    icon: <CategoryDance size={size} />,
  },
  {
    key: "music",
    content: "Music",
    icon: <CategoryMusic size={size} />,
  },
  {
    key: "sports",
    content: "Sports",
    icon: <CategorySports size={size} />,
  },
  {
    key: "memes",
    content: "Memes",
    icon: <CategoryMemes size={size} />,
  },
  {
    key: "food",
    content: "Food",
    icon: <CategoryFood size={size} />,
  },
  {
    key: "sci-fi",
    content: "Sci-Fi",
    icon: <CategorySciFi size={size} />,
  },
  // Optionally, add a default category if needed
  {
    key: "art",
    content: "Art",
    icon: <CategoryArt size={size} />,
  },
];
