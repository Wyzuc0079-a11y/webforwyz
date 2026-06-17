import LetterIndexPage from "../LetterIndexPage";
import { getCategoryBySuffix } from "../portfolioContent";

export default function TypographyListPage() {
  return <LetterIndexPage category={getCategoryBySuffix("t")!} />;
}
