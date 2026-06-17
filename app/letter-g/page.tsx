import LetterIndexPage from "../LetterIndexPage";
import { getCategoryBySuffix } from "../portfolioContent";

export default function GraphicListPage() {
  return <LetterIndexPage category={getCategoryBySuffix("g")!} />;
}
