import LetterIndexPage from "../LetterIndexPage";
import { getCategoryBySuffix } from "../portfolioContent";

export default function BookDesignListPage() {
  return <LetterIndexPage category={getCategoryBySuffix("b")!} />;
}
